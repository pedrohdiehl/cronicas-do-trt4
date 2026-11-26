import React, { useEffect, useRef } from 'react';
import { REGIONS } from '../data/content';
import {
  getBuildingSprite,
  getChestSprite,
  getCritterSprite,
  getFairySprite,
  getFountainSprite,
  getHeroSprite,
  getMonsterSprite,
  getNpcSprite,
  getSignSprite,
  getTileSprite,
} from '../entities/pixelSprites';
import { getSpriteAtlas, subscribeSpriteAtlas } from '../entities/spriteSheetProcessor';
import { soundEngine } from '../systems/audio';
import { getDatabaseRevision, getFichaById } from '../systems/customDatabase';
import { getDueSpacedRepQuestions } from '../systems/gameLogic';
import type { Ficha, PlayerClass, RegionInfo, SaveState, ZonaInfo } from '../types';
import {
  buildWorldData,
  findPathAStar,
  getActiveEnemiesForClass,
  getActiveNpcsForClass,
  getBaseGroundForTile,
  getRegionAt,
  getZonaAt,
  isSolidTile,
  RENDER_TILE,
  TILE_PX,
  TileType,
  WORLD_H,
  WORLD_W,
  WorldBuilding,
  WorldChest,
  WorldCritter,
  WorldEnemy,
  WorldNpc,
  WorldSign,
} from './worldMap';

export interface GameCanvasApi {
  teleportTo: (tx: number, ty: number) => void;
  triggerInteract: () => void;
  triggerBurst: (color: string, count?: number, shake?: number) => void;
  setJoystickVector: (vx: number, vy: number) => void;
}

interface GameCanvasProps {
  phase: 'title' | 'playing' | 'paused' | 'gameover';
  modalOpen: boolean;
  saveState: SaveState;
  trackedFichaId: string | null;
  dbVersion: number;
  apiRef: React.MutableRefObject<GameCanvasApi | null>;
  onHeroPosUpdate: (x: number, y: number, dir: SaveState['heroDir'], newChunks: string[]) => void;
  onLocationChange: (region: RegionInfo, zona: ZonaInfo | null) => void;
  onInteractNpc: (ficha: Ficha) => void;
  onInteractEnemy: (enemy: WorldEnemy) => void;
  onInteractChest: (chest: WorldChest) => void;
  onInteractSign: (sign: WorldSign) => void;
  onInteractCritter: (critter: WorldCritter) => void;
  onInteractBuilding: (building: WorldBuilding) => void;
  onInteractFairy: () => void;
  onNearPromptChange: (prompt: string | null) => void;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

type PendingTarget =
  | { kind: 'npc'; npc: WorldNpc }
  | { kind: 'enemy'; enemy: WorldEnemy }
  | { kind: 'chest'; chest: WorldChest }
  | { kind: 'sign'; sign: WorldSign }
  | { kind: 'critter'; critter: WorldCritter }
  | { kind: 'building'; building: WorldBuilding }
  | null;

const PARTICLE_POOL_SIZE = 140;
const CHUNK_TILES = 16;

export const GameCanvas: React.FC<GameCanvasProps> = ({
  phase,
  modalOpen,
  saveState,
  trackedFichaId,
  dbVersion,
  apiRef,
  onHeroPosUpdate,
  onLocationChange,
  onInteractNpc,
  onInteractEnemy,
  onInteractChest,
  onInteractSign,
  onInteractCritter,
  onInteractBuilding,
  onInteractFairy,
  onNearPromptChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const propsRef = useRef({
    phase,
    modalOpen,
    saveState,
    trackedFichaId,
    dbVersion,
    onHeroPosUpdate,
    onLocationChange,
    onInteractNpc,
    onInteractEnemy,
    onInteractChest,
    onInteractSign,
    onInteractCritter,
    onInteractBuilding,
    onInteractFairy,
    onNearPromptChange,
  });
  propsRef.current = {
    phase,
    modalOpen,
    saveState,
    trackedFichaId,
    dbVersion,
    onHeroPosUpdate,
    onLocationChange,
    onInteractNpc,
    onInteractEnemy,
    onInteractChest,
    onInteractSign,
    onInteractCritter,
    onInteractBuilding,
    onInteractFairy,
    onNearPromptChange,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let world = buildWorldData();
    let loadedRevision = getDatabaseRevision();
    let liveEnemies: WorldEnemy[] = world.enemies.map((e) => ({ ...e }));
    let liveCritters: WorldCritter[] = world.critters.map((c) => ({ ...c }));

    // Offscreen 16x16-tile terrain chunk cache (~4-6 drawImage calls/frame!)
    const terrainChunkCache = new Map<string, HTMLCanvasElement>();
    const unsubscribeAtlas = subscribeSpriteAtlas(() => {
      terrainChunkCache.clear();
    });
    const getTerrainChunk = (cx: number, cy: number): HTMLCanvasElement => {
      const atlasReady = Boolean(getSpriteAtlas()?.ready);
      const key = `${atlasReady ? 'hd' : 'px'}:${cx},${cy}`;
      const existing = terrainChunkCache.get(key);
      if (existing) return existing;

      const chunkTilePx = atlasReady ? RENDER_TILE : TILE_PX;
      const off = document.createElement('canvas');
      off.width = CHUNK_TILES * chunkTilePx;
      off.height = CHUNK_TILES * chunkTilePx;
      const octx = off.getContext('2d')!;
      octx.imageSmoothingEnabled = atlasReady;
      if (atlasReady) octx.imageSmoothingQuality = 'high';

      const startX = cx * CHUNK_TILES;
      const startY = cy * CHUNK_TILES;
      for (let ly = 0; ly < CHUNK_TILES; ly++) {
        const ty = startY + ly;
        if (ty >= WORLD_H) break;
        for (let lx = 0; lx < CHUNK_TILES; lx++) {
          const tx = startX + lx;
          if (tx >= WORLD_W) break;
          const t = world.tiles[ty * WORLD_W + tx] as TileType;
          const variant = (tx * 7 + ty * 13) & 3;
          const baseGround = getBaseGroundForTile(world.tiles, tx, ty);
          octx.drawImage(
            getTileSprite(t, variant, baseGround),
            lx * chunkTilePx,
            ly * chunkTilePx,
            chunkTilePx,
            chunkTilePx
          );
        }
      }
      terrainChunkCache.set(key, off);
      return off;
    };

    let cachedClass: PlayerClass | null = null;
    let cachedActiveNpcs: WorldNpc[] = [];
    let cachedActiveEnemyIds = new Set<string>();
    let cachedSpacedKey = '';
    let cachedResurgents: WorldEnemy[] = [];

    const ensureWorldAndClassCache = (cls: PlayerClass) => {
      const curRev = getDatabaseRevision();
      if (curRev !== loadedRevision) {
        loadedRevision = curRev;
        world = buildWorldData();
        liveEnemies = world.enemies.map((e) => ({ ...e }));
        liveCritters = world.critters.map((c) => ({ ...c }));
        terrainChunkCache.clear();
        cachedClass = null;
        cachedSpacedKey = '';
      }
      if (cachedClass === cls) return;
      cachedClass = cls;
      cachedActiveNpcs = getActiveNpcsForClass(world, cls);
      cachedActiveEnemyIds = new Set(getActiveEnemiesForClass(world, cls).map((e) => e.id));
    };

    const hero = {
      x: propsRef.current.saveState.heroX,
      y: propsRef.current.saveState.heroY,
      dir: propsRef.current.saveState.heroDir,
      walkDist: 0,
      stepSoundAccum: 0,
      moving: false,
    };

    const fairy = {
      x: hero.x - 0.85,
      y: hero.y - 0.45,
      dir: 'right' as 'left' | 'right',
      sparkleAccum: 0,
    };

    const cam = {
      x: hero.x * RENDER_TILE,
      y: hero.y * RENDER_TILE,
      shakeTrauma: 0,
    };

    let pathQueue: { x: number; y: number }[] = [];
    let pendingTarget: PendingTarget = null;
    let clickMarker: { x: number; y: number; ttl: number } | null = null;
    let joyVec = { x: 0, y: 0 };
    let battleGraceTimer = 0;

    const particles: Particle[] = Array.from({ length: PARTICLE_POOL_SIZE }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      size: 4,
      color: '#f5d76e',
    }));
    let particleCursor = 0;

    const spawnParticles = (wx: number, wy: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        const p = particles[particleCursor];
        particleCursor = (particleCursor + 1) % PARTICLE_POOL_SIZE;
        const ang = Math.random() * Math.PI * 2;
        const spd = 24 + Math.random() * 75;
        p.active = true;
        p.x = wx;
        p.y = wy;
        p.vx = Math.cos(ang) * spd;
        p.vy = Math.sin(ang) * spd - 16;
        p.maxLife = 0.35 + Math.random() * 0.4;
        p.life = p.maxLife;
        p.size = 3 + Math.floor(Math.random() * 4);
        p.color = color;
      }
    };

    const keysHeld = new Set<string>();
    const clearInputs = () => {
      keysHeld.clear();
      joyVec = { x: 0, y: 0 };
    };

    const refreshResurgents = (st: SaveState, nowMs: number) => {
      const spEntries = Object.values(st.spacedRep);
      const dueCount = spEntries.filter((e) => e.dueAfterTimestamp <= nowMs).length;
      const key = `${st.playerClass}:${dueCount}:${spEntries.length}:${loadedRevision}`;
      if (key === cachedSpacedKey) return cachedResurgents;
      cachedSpacedKey = key;

      if (dueCount === 0) {
        cachedResurgents = [];
        return cachedResurgents;
      }
      const due = getDueSpacedRepQuestions(st, nowMs);
      const out: WorldEnemy[] = [];
      const maxShow = Math.min(3, due.length);
      for (let i = 0; i < maxShow; i++) {
        const q = due[i];
        const f = getFichaById(q.fichaId);
        const angle = i * 2.1 + 0.7;
        const rx = Math.max(6, Math.min(WORLD_W - 6, Math.round(hero.x + Math.cos(angle) * 6)));
        const ry = Math.max(6, Math.min(WORLD_H - 6, Math.round(hero.y + Math.sin(angle) * 6)));
        if (!isSolidTile(world.tiles[ry * WORLD_W + rx] as TileType)) {
          out.push({
            id: `resurgent-${q.id}`,
            nome: `Ressurgido · ${f ? f.titulo.slice(0, 26) : q.fichaId}`,
            subtitulo: 'Revisão Espaçada (acerte 2× seguidas)',
            zonaId: q.zonaId,
            regiaoId: q.regiaoId,
            sprite: 'ghost',
            behavior: 'orbit',
            homeX: rx,
            homeY: ry,
            x: rx,
            y: ry,
            vx: 0,
            vy: 0,
            isBoss: false,
            isMiniBoss: false,
            isResurgent: true,
            resurgentQuestionId: q.id,
            level: st.level,
            patrolPhase: i,
          });
        }
      }
      cachedResurgents = out;
      return cachedResurgents;
    };

    const findNearestInteractable = (): PendingTarget => {
      const state = propsRef.current.saveState;
      ensureWorldAndClassCache(state.playerClass);
      const defeated = new Set([...state.defeatedEnemies, ...state.defeatedBosses]);
      const resurgents = cachedResurgents;

      let best: PendingTarget = null;
      let bestDist = 2.1;

      for (const npc of cachedActiveNpcs) {
        const d = Math.hypot(npc.x - hero.x, npc.y - hero.y);
        if (d < bestDist) {
          bestDist = d;
          best = { kind: 'npc', npc };
        }
      }
      for (const crit of liveCritters) {
        const d = Math.hypot(crit.x - hero.x, crit.y - hero.y);
        if (d < bestDist) {
          bestDist = d;
          best = { kind: 'critter', critter: crit };
        }
      }
      for (const chest of world.chests) {
        if (state.openedChests.includes(chest.id)) continue;
        const d = Math.hypot(chest.x - hero.x, chest.y - hero.y);
        if (d < bestDist) {
          bestDist = d;
          best = { kind: 'chest', chest };
        }
      }
      for (const sign of world.signs) {
        const d = Math.hypot(sign.x - hero.x, sign.y - hero.y);
        if (d < bestDist) {
          bestDist = d;
          best = { kind: 'sign', sign };
        }
      }
      for (const b of world.buildings) {
        if (!b.label) continue;
        const d = Math.hypot(b.doorX - hero.x, b.doorY + 1 - hero.y);
        if (d < Math.min(bestDist, 1.85)) {
          bestDist = d;
          best = { kind: 'building', building: b };
        }
      }
      for (const e of [...liveEnemies, ...resurgents]) {
        if (!e.isResurgent && (!cachedActiveEnemyIds.has(e.id) || defeated.has(e.id))) continue;
        const d = Math.hypot(e.x - hero.x, e.y - hero.y);
        if (d < bestDist + (e.isBoss ? 0.8 : 0.2)) {
          bestDist = d;
          best = { kind: 'enemy', enemy: e };
        }
      }
      return best;
    };

    const executeTarget = (target: PendingTarget) => {
      if (!target) return;
      clearInputs();
      pathQueue = [];
      pendingTarget = null;
      if (target.kind === 'npc') {
        soundEngine.playDialogOpen();
        propsRef.current.onInteractNpc(target.npc.ficha);
      } else if (target.kind === 'critter') {
        soundEngine.playDogBark();
        spawnParticles((target.critter.x + 0.5) * RENDER_TILE, (target.critter.y + 0.2) * RENDER_TILE, '#f472b6', 14);
        propsRef.current.onInteractCritter(target.critter);
      } else if (target.kind === 'chest') {
        spawnParticles((target.chest.x + 0.5) * RENDER_TILE, (target.chest.y + 0.5) * RENDER_TILE, '#f5d76e', 18);
        propsRef.current.onInteractChest(target.chest);
      } else if (target.kind === 'sign') {
        soundEngine.playDialogOpen();
        propsRef.current.onInteractSign(target.sign);
      } else if (target.kind === 'building') {
        soundEngine.playDialogOpen();
        propsRef.current.onInteractBuilding(target.building);
      } else if (target.kind === 'enemy') {
        battleGraceTimer = 1.6;
        propsRef.current.onInteractEnemy(target.enemy);
      }
    };

    apiRef.current = {
      teleportTo: (tx: number, ty: number) => {
        hero.x = tx;
        hero.y = ty;
        cam.x = tx * RENDER_TILE;
        cam.y = ty * RENDER_TILE;
        pathQueue = [];
        pendingTarget = null;
        const cBaseX = Math.floor(tx / 4);
        const cBaseY = Math.floor(ty / 4);
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            exploredSet.add(`${cBaseX + dx},${cBaseY + dy}`);
          }
        }
        lastRegionId = null;
        lastZonaId = null;
        spawnParticles((tx + 0.5) * RENDER_TILE, (ty + 0.5) * RENDER_TILE, '#5ef2b6', 22);
      },
      triggerInteract: () => {
        if (propsRef.current.phase !== 'playing' || propsRef.current.modalOpen) return;
        const nearest = findNearestInteractable();
        if (nearest) executeTarget(nearest);
      },
      triggerBurst: (color: string, count = 20, shake = 0) => {
        spawnParticles((hero.x + 0.5) * RENDER_TILE, (hero.y + 0.5) * RENDER_TILE, color, count);
        if (shake > 0 && !propsRef.current.saveState.settings.disableShake) {
          cam.shakeTrauma = Math.min(1, cam.shakeTrauma + shake);
        }
      },
      setJoystickVector: (vx: number, vy: number) => {
        joyVec = { x: vx, y: vy };
        if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
          pathQueue = [];
          pendingTarget = null;
        }
      },
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (propsRef.current.phase !== 'playing' || propsRef.current.modalOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault();
        keysHeld.add(k);
        pathQueue = [];
        pendingTarget = null;
      } else if (k === 'e' || k === 'enter' || k === ' ') {
        e.preventDefault();
        const nearest = findNearestInteractable();
        if (nearest) executeTarget(nearest);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysHeld.delete(e.key.toLowerCase());
    };

    const onPointerDown = (e: PointerEvent) => {
      if (propsRef.current.phase !== 'playing' || propsRef.current.modalOpen) return;
      if (e.button !== 0) return;

      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const wx = (sx - rect.width / 2 + cam.x) / RENDER_TILE;
      const wy = (sy - rect.height / 2 + cam.y) / RENDER_TILE;
      const tx = Math.floor(wx);
      const ty = Math.floor(wy);

      if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return;

      // Clicking directly on the flying Fairy companion Lumina opens her AI helper panel!
      if (Math.hypot(fairy.x + 0.5 - wx, fairy.y + 0.5 - wy) < 0.85) {
        soundEngine.playDialogOpen();
        propsRef.current.onInteractFairy();
        return;
      }

      const state = propsRef.current.saveState;
      ensureWorldAndClassCache(state.playerClass);
      const defeated = new Set([...state.defeatedEnemies, ...state.defeatedBosses]);
      const resurgents = cachedResurgents;

      let clickedTarget: PendingTarget = null;
      for (const npc of cachedActiveNpcs) {
        if (Math.hypot(npc.x + 0.5 - wx, npc.y + 0.5 - wy) < 0.95) {
          clickedTarget = { kind: 'npc', npc };
          break;
        }
      }
      if (!clickedTarget) {
        for (const crit of liveCritters) {
          if (Math.hypot(crit.x + 0.5 - wx, crit.y + 0.5 - wy) < 0.95) {
            clickedTarget = { kind: 'critter', critter: crit };
            break;
          }
        }
      }
      if (!clickedTarget) {
        for (const en of [...liveEnemies, ...resurgents]) {
          if (!en.isResurgent && (!cachedActiveEnemyIds.has(en.id) || defeated.has(en.id))) continue;
          const hitRadius = en.isBoss ? 1.45 : en.isMiniBoss ? 1.15 : 0.95;
          if (Math.hypot(en.x + 0.5 - wx, en.y + 0.5 - wy) < hitRadius) {
            clickedTarget = { kind: 'enemy', enemy: en };
            break;
          }
        }
      }
      if (!clickedTarget) {
        for (const chest of world.chests) {
          if (state.openedChests.includes(chest.id)) continue;
          if (Math.hypot(chest.x + 0.5 - wx, chest.y + 0.5 - wy) < 0.95) {
            clickedTarget = { kind: 'chest', chest };
            break;
          }
        }
      }
      if (!clickedTarget) {
        for (const sign of world.signs) {
          if (Math.hypot(sign.x + 0.5 - wx, sign.y + 0.5 - wy) < 0.95) {
            clickedTarget = { kind: 'sign', sign };
            break;
          }
        }
      }
      if (!clickedTarget) {
        for (const b of world.buildings) {
          if (!b.label) continue;
          if (wx >= b.x - 0.15 && wx <= b.x + b.w + 0.15 && wy >= b.y - 0.3 && wy <= b.y + b.h + 0.25) {
            clickedTarget = { kind: 'building', building: b };
            break;
          }
        }
      }

      if (clickedTarget) {
        const tgtPos =
          clickedTarget.kind === 'npc'
            ? { x: clickedTarget.npc.x, y: clickedTarget.npc.y }
            : clickedTarget.kind === 'critter'
              ? { x: clickedTarget.critter.x, y: clickedTarget.critter.y }
              : clickedTarget.kind === 'enemy'
                ? { x: clickedTarget.enemy.x, y: clickedTarget.enemy.y }
                : clickedTarget.kind === 'chest'
                  ? { x: clickedTarget.chest.x, y: clickedTarget.chest.y }
                  : clickedTarget.kind === 'building'
                    ? { x: clickedTarget.building.doorX, y: clickedTarget.building.doorY + 1 }
                    : { x: clickedTarget.sign.x, y: clickedTarget.sign.y };

        if (Math.hypot(tgtPos.x - hero.x, tgtPos.y - hero.y) <= 2.1) {
          executeTarget(clickedTarget);
          return;
        }
        pendingTarget = clickedTarget;
        pathQueue = findPathAStar(world.tiles, hero.x, hero.y, tgtPos.x, tgtPos.y);
        clickMarker = { x: tgtPos.x, y: tgtPos.y, ttl: 0.7 };
      } else {
        pendingTarget = null;
        pathQueue = findPathAStar(world.tiles, hero.x, hero.y, tx, ty);
        clickMarker = { x: tx, y: ty, ttl: 0.6 };
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', clearInputs);
    document.addEventListener('visibilitychange', clearInputs);
    canvas.addEventListener('pointerdown', onPointerDown);

    let lastRegionId: string | null = null;
    let lastZonaId: string | null = null;
    let lastPrompt: string | null = null;
    let posSyncAccum = 0;
    let promptCheckAccum = 0;
    let animClock = 0;
    let prevTime = performance.now();
    let rafId = 0;

    const exploredSet = new Set<string>(propsRef.current.saveState.exploredChunks);

    const canWalk = (nx: number, ny: number): boolean => {
      const margin = 0.24;
      const points = [
        [nx + margin, ny + margin],
        [nx + 1 - margin, ny + margin],
        [nx + margin, ny + 1 - margin],
        [nx + 1 - margin, ny + 1 - margin],
      ];
      for (const [px, py] of points) {
        const tx = Math.floor(px);
        const ty = Math.floor(py);
        if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return false;
        if (isSolidTile(world.tiles[ty * WORLD_W + tx] as TileType)) return false;
      }
      return true;
    };

    // Pre-collect animated fountain tiles for sparkling spray particles
    const fountainCoords = [
      { x: 29, y: 18 },
      { x: 28, y: 54 },
      { x: 80, y: 35 },
      { x: 31, y: 97 },
      { x: 98, y: 109 },
      { x: 135, y: 109 },
      { x: 126, y: 35 },
    ];

    const tick = (now: number) => {
      const rawDt = (now - prevTime) / 1000;
      prevTime = now;
      const dt = Math.min(Math.max(rawDt, 0), 0.05);
      animClock += dt;

      const { phase: curPhase, modalOpen: isModal, saveState: st, trackedFichaId: tracked } = propsRef.current;
      ensureWorldAndClassCache(st.playerClass);

      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      if (Math.hypot(st.heroX - hero.x, st.heroY - hero.y) > 8 && curPhase === 'playing') {
        hero.x = st.heroX;
        hero.y = st.heroY;
        cam.x = hero.x * RENDER_TILE;
        cam.y = hero.y * RENDER_TILE;
      }

      // Animate friendly town dogs & cats gently even on title screen!
      for (const crit of liveCritters) {
        const nextX = crit.homeX + Math.sin(animClock * 0.75 + crit.phase) * 1.9;
        const nextY = crit.homeY + Math.cos(animClock * 0.52 + crit.phase) * 1.1;
        if (!isSolidTile(world.tiles[Math.round(nextY) * WORLD_W + Math.round(nextX)] as TileType)) {
          if (nextX < crit.x - 0.002) crit.dir = 'left';
          else if (nextX > crit.x + 0.002) crit.dir = 'right';
          crit.x = nextX;
          crit.y = nextY;
        }
      }

      // 1. UPDATE SIMULATION
      if (curPhase === 'title') {
        // Showcase the vibrant SNES town squares, fountains, cottages & puppy Pipoca on the right side!
        const tourWaypoints = [
          { x: 25, y: 19 }, // Reino da Toga: Palácio, Fountain, cottages & Pipoca
          { x: 77, y: 33 }, // Cidadela do Conselho: Blue Carpet & Guild halls
          { x: 125, y: 34 }, // Porto Babel: Harbor houses, piers & ships
          { x: 30, y: 96 }, // Floresta do Código: Rune trees, fountain & cottages
          { x: 96, y: 105 }, // Fortaleza da Muralha: Cofre da LGPD
          { x: 132, y: 102 }, // Montanhas da Infra: Server racks & Neural temple
        ];
        const segDur = 8;
        const totalDur = tourWaypoints.length * segDur;
        const t = (animClock % totalDur) / segDur;
        const idxA = Math.floor(t) % tourWaypoints.length;
        const idxB = (idxA + 1) % tourWaypoints.length;
        const frac = t - Math.floor(t);
        const smooth = frac * frac * (3 - 2 * frac);
        const tx = tourWaypoints[idxA].x + (tourWaypoints[idxB].x - tourWaypoints[idxA].x) * smooth;
        const ty = tourWaypoints[idxA].y + (tourWaypoints[idxB].y - tourWaypoints[idxA].y) * smooth;
        cam.x = tx * RENDER_TILE;
        cam.y = ty * RENDER_TILE;
      } else if (curPhase === 'playing' && !isModal) {
        if (battleGraceTimer > 0) battleGraceTimer -= dt;
        refreshResurgents(st, Date.now());

        let ix = joyVec.x;
        let iy = joyVec.y;
        if (keysHeld.has('w') || keysHeld.has('arrowup')) iy -= 1;
        if (keysHeld.has('s') || keysHeld.has('arrowdown')) iy += 1;
        if (keysHeld.has('a') || keysHeld.has('arrowleft')) ix -= 1;
        if (keysHeld.has('d') || keysHeld.has('arrowright')) ix += 1;

        const speed = 6.2;
        hero.moving = false;

        if (Math.abs(ix) > 0.05 || Math.abs(iy) > 0.05) {
          const len = Math.hypot(ix, iy);
          const dx = (ix / len) * speed * dt;
          const dy = (iy / len) * speed * dt;
          if (Math.abs(dx) >= Math.abs(dy)) {
            hero.dir = dx < 0 ? 'left' : 'right';
          } else {
            hero.dir = dy < 0 ? 'up' : 'down';
          }
          if (canWalk(hero.x + dx, hero.y)) hero.x += dx;
          if (canWalk(hero.x, hero.y + dy)) hero.y += dy;
          hero.moving = true;
          hero.walkDist += Math.hypot(dx, dy);
        } else if (pathQueue.length > 0) {
          const next = pathQueue[0];
          const dx = next.x - hero.x;
          const dy = next.y - hero.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.14) {
            hero.x = next.x;
            hero.y = next.y;
            pathQueue.shift();
            if (pathQueue.length === 0 && pendingTarget) {
              executeTarget(pendingTarget);
            }
          } else {
            const step = Math.min(dist, speed * dt);
            const mx = (dx / dist) * step;
            const my = (dy / dist) * step;
            if (Math.abs(mx) >= Math.abs(my)) {
              hero.dir = mx < 0 ? 'left' : 'right';
            } else {
              hero.dir = my < 0 ? 'up' : 'down';
            }
            if (canWalk(hero.x + mx, hero.y + my)) {
              hero.x += mx;
              hero.y += my;
              hero.moving = true;
              hero.walkDist += step;
            } else {
              pathQueue = [];
              pendingTarget = null;
            }
          }
        } else if (pendingTarget) {
          const tgt = pendingTarget;
          const tx =
            tgt.kind === 'npc'
              ? tgt.npc.x
              : tgt.kind === 'critter'
                ? tgt.critter.x
                : tgt.kind === 'enemy'
                  ? tgt.enemy.x
                  : tgt.kind === 'chest'
                    ? tgt.chest.x
                    : tgt.kind === 'building'
                      ? tgt.building.doorX
                      : tgt.sign.x;
          const ty =
            tgt.kind === 'npc'
              ? tgt.npc.y
              : tgt.kind === 'critter'
                ? tgt.critter.y
                : tgt.kind === 'enemy'
                  ? tgt.enemy.y
                  : tgt.kind === 'chest'
                    ? tgt.chest.y
                    : tgt.kind === 'building'
                      ? tgt.building.doorY + 1
                      : tgt.sign.y;
          if (Math.hypot(tx - hero.x, ty - hero.y) <= 2.1) {
            executeTarget(tgt);
          } else {
            pendingTarget = null;
          }
        }

        if (hero.moving) {
          hero.stepSoundAccum += dt * speed;
          if (hero.stepSoundAccum >= 1.75) {
            hero.stepSoundAccum = 0;
            soundEngine.playStep();
            spawnParticles((hero.x + 0.5) * RENDER_TILE, (hero.y + 0.9) * RENDER_TILE, '#c8bea8', 2);
          }
        }

        const targetCamX = (hero.x + 0.5) * RENDER_TILE;
        const targetCamY = (hero.y + 0.5) * RENDER_TILE;
        const damp = 1 - Math.exp(-9 * dt);
        cam.x += (targetCamX - cam.x) * damp;
        cam.y += (targetCamY - cam.y) * damp;

        // Smoothly orbit Lumina the flying guide fairy behind the Hero's shoulder!
        const shoulderOffX = hero.dir === 'right' ? -0.82 : hero.dir === 'left' ? 0.82 : -0.78;
        const fairyTargetX = hero.x + shoulderOffX;
        const fairyTargetY = hero.y - 0.45 + Math.sin(animClock * 4.4) * 0.16;
        const fairyDist = Math.hypot(fairyTargetX - fairy.x, fairyTargetY - fairy.y);
        if (fairyDist > 8) {
          // Teleport snap after fast travel
          fairy.x = fairyTargetX;
          fairy.y = fairyTargetY;
        } else {
          const fairyDamp = 1 - Math.exp(-6.5 * dt);
          const fdx = (fairyTargetX - fairy.x) * fairyDamp;
          const fdy = (fairyTargetY - fairy.y) * fairyDamp;
          fairy.x += fdx;
          fairy.y += fdy;
          if (Math.abs(fdx) > 0.015) {
            fairy.dir = fdx < 0 ? 'left' : 'right';
          } else if (hero.dir === 'left' || hero.dir === 'right') {
            fairy.dir = hero.dir;
          }
        }
        fairy.sparkleAccum += dt;
        if (fairy.sparkleAccum >= 0.34) {
          fairy.sparkleAccum = 0;
          spawnParticles(
            (fairy.x + 0.5) * RENDER_TILE,
            (fairy.y + 0.5) * RENDER_TILE,
            Math.random() < 0.5 ? '#fde047' : '#7dd3fc',
            1
          );
        }

        const halfW = width / 2;
        const halfH = height / 2;
        cam.x = Math.max(halfW, Math.min(WORLD_W * RENDER_TILE - halfW, cam.x));
        cam.y = Math.max(halfH, Math.min(WORLD_H * RENDER_TILE - halfH, cam.y));

        const defeated = new Set([...st.defeatedEnemies, ...st.defeatedBosses]);
        for (const en of liveEnemies) {
          if (!cachedActiveEnemyIds.has(en.id) || defeated.has(en.id)) continue;
          const distHero = Math.hypot(en.x - hero.x, en.y - hero.y);
          if (distHero > 24) continue;

          if (en.isBoss || en.isMiniBoss) {
            en.x = en.homeX + Math.sin(animClock * 1.1 + en.patrolPhase) * 0.45;
            en.y = en.homeY;
          } else if (en.behavior === 'patrol') {
            const targetX = en.homeX + Math.sin(animClock * 0.9 + en.patrolPhase) * 2.2;
            if (!isSolidTile(world.tiles[Math.round(en.y) * WORLD_W + Math.round(targetX)] as TileType)) {
              en.x = targetX;
            }
          } else if (en.behavior === 'orbit') {
            const tx = en.homeX + Math.cos(animClock * 1.05 + en.patrolPhase) * 1.7;
            const ty = en.homeY + Math.sin(animClock * 1.05 + en.patrolPhase) * 1.3;
            if (!isSolidTile(world.tiles[Math.round(ty) * WORLD_W + Math.round(tx)] as TileType)) {
              en.x = tx;
              en.y = ty;
            }
          } else if (en.behavior === 'stalker') {
            const distHome = Math.hypot(en.x - en.homeX, en.y - en.homeY);
            if (distHero < 4.5 && distHome < 5.0) {
              const step = 1.85 * dt;
              const nx = en.x + ((hero.x - en.x) / Math.max(0.1, distHero)) * step;
              const ny = en.y + ((hero.y - en.y) / Math.max(0.1, distHero)) * step;
              if (!isSolidTile(world.tiles[Math.round(ny) * WORLD_W + Math.round(nx)] as TileType)) {
                en.x = nx;
                en.y = ny;
              }
            } else if (distHome > 0.2) {
              const step = 1.4 * dt;
              en.x += ((en.homeX - en.x) / distHome) * step;
              en.y += ((en.homeY - en.y) / distHome) * step;
            }
          }

          if (!en.isBoss && !en.isMiniBoss && battleGraceTimer <= 0 && distHero < 0.72) {
            battleGraceTimer = 2.0;
            executeTarget({ kind: 'enemy', enemy: en });
            break;
          }
        }

        const hcx = Math.floor(hero.x / 4);
        const hcy = Math.floor(hero.y / 4);
        const newChunks: string[] = [];
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const key = `${hcx + dx},${hcy + dy}`;
            if (!exploredSet.has(key)) {
              exploredSet.add(key);
              newChunks.push(key);
            }
          }
        }

        promptCheckAccum += dt;
        if (promptCheckAccum >= 0.12) {
          promptCheckAccum = 0;
          const curRegion = getRegionAt(hero.x, hero.y);
          const curZona = getZonaAt(hero.x, hero.y);
          if (curRegion.id !== lastRegionId || (curZona?.id || null) !== lastZonaId) {
            lastRegionId = curRegion.id;
            lastZonaId = curZona?.id || null;
            propsRef.current.onLocationChange(curRegion, curZona);
          }

          const near = findNearestInteractable();
          let prompt: string | null = null;
          if (near?.kind === 'npc')
            prompt = `[E] Falar / Duelar com ${near.npc.ficha.npcName} · ${near.npc.ficha.titulo.slice(0, 30)}`;
          else if (near?.kind === 'critter')
            prompt = `[E] Fazer carinho em ${near.critter.name} (${near.critter.kind === 'dog' ? 'cachorrinho' : 'gatinha'})`;
          else if (near?.kind === 'chest') prompt = `[E] Abrir ${near.chest.label}`;
          else if (near?.kind === 'sign') prompt = `[E] Ler placa · ${near.sign.title}`;
          else if (near?.kind === 'building') prompt = `[E] Entrar em ${near.building.label}`;
          else if (near?.kind === 'enemy') prompt = `[E] Desafiar ${near.enemy.nome}`;
          if (prompt !== lastPrompt) {
            lastPrompt = prompt;
            propsRef.current.onNearPromptChange(prompt);
          }
        }

        posSyncAccum += dt;
        if (newChunks.length > 0 || (hero.moving && posSyncAccum >= 0.6)) {
          posSyncAccum = 0;
          propsRef.current.onHeroPosUpdate(hero.x, hero.y, hero.dir, newChunks);
        }
      }

      if (cam.shakeTrauma > 0) cam.shakeTrauma = Math.max(0, cam.shakeTrauma - dt * 2.4);
      if (clickMarker) {
        clickMarker.ttl -= dt;
        if (clickMarker.ttl <= 0) clickMarker = null;
      }
      for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
        const p = particles[i];
        if (!p.active) continue;
        p.life -= dt;
        if (p.life <= 0) {
          p.active = false;
        } else {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 85 * dt;
        }
      }

      if (curPhase !== 'title' && isModal) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // 2. RENDER PIXEL-ART SNES WORLD
      const shakeMag = st.settings.disableShake ? 0 : cam.shakeTrauma * cam.shakeTrauma * 12;
      const shakeX = shakeMag > 0.1 ? (Math.random() - 0.5) * 2 * shakeMag : 0;
      const shakeY = shakeMag > 0.1 ? (Math.random() - 0.5) * 2 * shakeMag : 0;

      const viewLeft = cam.x - width / 2 + shakeX;
      const viewTop = cam.y - height / 2 + shakeY;

      ctx.fillStyle = '#0d111a';
      ctx.fillRect(0, 0, width, height);

      const minTx = Math.max(0, Math.floor(viewLeft / RENDER_TILE) - 1);
      const maxTx = Math.min(WORLD_W - 1, Math.ceil((viewLeft + width) / RENDER_TILE) + 1);
      const minTy = Math.max(0, Math.floor(viewTop / RENDER_TILE) - 1);
      const maxTy = Math.min(WORLD_H - 1, Math.ceil((viewTop + height) / RENDER_TILE) + 1);

      const chunkRenderSize = CHUNK_TILES * RENDER_TILE;
      const minChunkX = Math.max(0, Math.floor(minTx / CHUNK_TILES));
      const maxChunkX = Math.min(Math.floor((WORLD_W - 1) / CHUNK_TILES), Math.floor(maxTx / CHUNK_TILES));
      const minChunkY = Math.max(0, Math.floor(minTy / CHUNK_TILES));
      const maxChunkY = Math.min(Math.floor((WORLD_H - 1) / CHUNK_TILES), Math.floor(maxTy / CHUNK_TILES));

      const atlasReady = Boolean(getSpriteAtlas()?.ready);
      ctx.imageSmoothingEnabled = atlasReady;
      if (atlasReady) ctx.imageSmoothingQuality = 'high';
      for (let cy = minChunkY; cy <= maxChunkY; cy++) {
        for (let cx = minChunkX; cx <= maxChunkX; cx++) {
          const ch = getTerrainChunk(cx, cy);
          ctx.drawImage(
            ch,
            Math.floor(cx * chunkRenderSize - viewLeft),
            Math.floor(cy * chunkRenderSize - viewTop),
            chunkRenderSize,
            chunkRenderSize
          );
        }
      }

      // Nano Banana High-Detail RPG Town Buildings & Fountains (drawn cleanly over footprints!)
      if (atlasReady) {
        for (const b of world.buildings) {
          if (b.x + b.w < minTx - 2 || b.x > maxTx + 2 || b.y + b.h < minTy - 2 || b.y > maxTy + 2) continue;
          const bSprite = getBuildingSprite(b.style);
          if (!bSprite) continue;
          const bx = Math.floor(b.x * RENDER_TILE - viewLeft) - 10;
          const by = Math.floor(b.y * RENDER_TILE - viewTop) - 18;
          const bw = b.w * RENDER_TILE + 20;
          const bh = b.h * RENDER_TILE + 24;
          ctx.drawImage(bSprite, bx, by, bw, bh);

          // Warm golden doorway mat shimmer so players immediately recognize enterable doors!
          if (curPhase !== 'title' && b.label) {
            const dcx = Math.floor((b.doorX + 0.5) * RENDER_TILE - viewLeft);
            const dcy = Math.floor((b.doorY + 1.05) * RENDER_TILE - viewTop);
            const glowAlpha = 0.22 + Math.sin(animClock * 3.5 + b.x) * 0.1;
            const dGrad = ctx.createRadialGradient(dcx, dcy, 2, dcx, dcy, 20);
            dGrad.addColorStop(0, `rgba(253, 224, 71, ${glowAlpha + 0.18})`);
            dGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
            ctx.fillStyle = dGrad;
            ctx.beginPath();
            ctx.ellipse(dcx, dcy, 20, 9, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        const fountainSprite = getFountainSprite();
        if (fountainSprite) {
          for (const ft of world.fountains) {
            if (ft.x + 2 < minTx - 2 || ft.x > maxTx + 2 || ft.y + 2 < minTy - 2 || ft.y > maxTy + 2) continue;
            const fx = Math.floor(ft.x * RENDER_TILE - viewLeft) - 8;
            const fy = Math.floor(ft.y * RENDER_TILE - viewTop) - 12;
            ctx.drawImage(fountainSprite, fx, fy, 2 * RENDER_TILE + 16, 2 * RENDER_TILE + 16);
          }
        }
      }

      // Animated Sparkling Fountain Water Jets!
      for (const f of fountainCoords) {
        if (f.x < minTx - 2 || f.x > maxTx + 2 || f.y < minTy - 2 || f.y > maxTy + 2) continue;
        const fx = Math.floor(f.x * RENDER_TILE - viewLeft);
        const fy = Math.floor(f.y * RENDER_TILE - viewTop);
        const pulse = Math.sin(animClock * 6) * 3;
        ctx.fillStyle = 'rgba(224, 247, 255, 0.85)';
        ctx.fillRect(fx - 4, fy - 16 + pulse, 8, 12);
        ctx.fillStyle = 'rgba(125, 211, 252, 0.72)';
        ctx.fillRect(fx - 12, fy - 8 - pulse * 0.5, 6, 4);
        ctx.fillRect(fx + 6, fy - 8 + pulse * 0.5, 6, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx - 2, fy - 20 + pulse, 4, 4);
      }

      // Building Landmark Plaques (only during play so title screen stays super clean!)
      if (curPhase !== 'title') {
        ctx.font = '700 11px "Cinzel", Georgia, serif';
        ctx.textAlign = 'center';
        for (const lm of world.landmarks) {
          if (lm.x < minTx - 3 || lm.x > maxTx + 3 || lm.y < minTy - 2 || lm.y > maxTy + 2) continue;
          const lx = Math.floor(lm.x * RENDER_TILE - viewLeft);
          const ly = Math.floor(lm.y * RENDER_TILE - viewTop);
          const tw = ctx.measureText(lm.text).width + 14;
          ctx.fillStyle = 'rgba(24, 19, 14, 0.84)';
          ctx.fillRect(lx - tw / 2, ly - 14, tw, 17);
          ctx.strokeStyle = '#9c7840';
          ctx.lineWidth = 1;
          ctx.strokeRect(lx - tw / 2, ly - 14, tw, 17);
          ctx.fillStyle = '#f5e6c8';
          ctx.fillText(lm.text, lx, ly - 2);
        }
      }

      // Draw A* path breadcrumbs & click ring
      if (curPhase === 'playing' && pathQueue.length > 0) {
        ctx.fillStyle = 'rgba(245, 215, 110, 0.65)';
        for (const step of pathQueue) {
          const px = step.x * RENDER_TILE + RENDER_TILE / 2 - viewLeft;
          const py = step.y * RENDER_TILE + RENDER_TILE / 2 - viewTop;
          ctx.fillRect(px - 3, py - 3, 6, 6);
        }
      }
      if (clickMarker) {
        const cx = (clickMarker.x + 0.5) * RENDER_TILE - viewLeft;
        const cy = (clickMarker.y + 0.5) * RENDER_TILE - viewTop;
        ctx.strokeStyle = `rgba(245, 215, 110, ${Math.min(1, clickMarker.ttl * 2)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 12 + (0.7 - clickMarker.ttl) * 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Zone Signposts
      const signSprite = getSignSprite();
      for (const s of world.signs) {
        if (s.x < minTx - 1 || s.x > maxTx + 1 || s.y < minTy - 1 || s.y > maxTy + 1) continue;
        const sx = Math.floor(s.x * RENDER_TILE - viewLeft);
        const sy = Math.floor(s.y * RENDER_TILE - viewTop);
        ctx.drawImage(signSprite, sx, sy, RENDER_TILE, RENDER_TILE);

        if (curPhase !== 'title') {
          const label = `${s.title} · Nv.${s.level}`;
          ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
          const tw = ctx.measureText(label).width + 14;
          ctx.fillStyle = 'rgba(22, 18, 14, 0.9)';
          ctx.fillRect(sx + RENDER_TILE / 2 - tw / 2, sy - 20, tw, 18);
          ctx.strokeStyle = '#9c7840';
          ctx.lineWidth = 1;
          ctx.strokeRect(sx + RENDER_TILE / 2 - tw / 2, sy - 20, tw, 18);
          ctx.fillStyle = '#f5e6c8';
          ctx.textAlign = 'center';
          ctx.fillText(label, sx + RENDER_TILE / 2, sy - 7);
        }
      }

      // Draw Treasure Chests
      for (const ch of world.chests) {
        if (ch.x < minTx - 1 || ch.x > maxTx + 1 || ch.y < minTy - 1 || ch.y > maxTy + 1) continue;
        const opened = st.openedChests.includes(ch.id);
        const locked = Boolean(ch.requiresKey && !st.regionKeys.includes(ch.requiresKey));
        const sp = getChestSprite(opened, Boolean(ch.requiresKey));
        const sx = Math.floor(ch.x * RENDER_TILE - viewLeft);
        const sy = Math.floor(ch.y * RENDER_TILE - viewTop);
        ctx.drawImage(sp, sx, sy, RENDER_TILE, RENDER_TILE);
        if (curPhase !== 'title' && !opened && locked) {
          ctx.fillStyle = '#f5d76e';
          ctx.font = '700 10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText('CHAVE', sx + RENDER_TILE / 2, sy - 4);
        }
      }

      // Draw Cute Town Dogs & Cats (Cachorrinhos!)
      const critterFrame = Math.floor(animClock * 4.2) & 1;
      const critterSize = atlasReady ? 52 : RENDER_TILE - 8;
      for (const crit of liveCritters) {
        if (crit.x < minTx - 2 || crit.x > maxTx + 2 || crit.y < minTy - 2 || crit.y > maxTy + 2) continue;
        const sx = Math.floor(crit.x * RENDER_TILE - viewLeft);
        const sy = Math.floor(crit.y * RENDER_TILE - viewTop);
        const sp = getCritterSprite(crit.kind, crit.variant, crit.dir, critterFrame);
        if (atlasReady) {
          const dx = Math.round(sx + (RENDER_TILE - critterSize) / 2);
          const dy = Math.round(sy + RENDER_TILE - critterSize + 6);
          ctx.drawImage(sp, dx, dy, critterSize, critterSize);
        } else {
          ctx.drawImage(sp, sx + 4, sy + 6, critterSize, critterSize);
        }
        if (curPhase !== 'title' && Math.hypot(crit.x - hero.x, crit.y - hero.y) < 6) {
          ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
          const lbl = `${crit.name} ♥`;
          const tw = ctx.measureText(lbl).width + 10;
          ctx.fillStyle = 'rgba(38, 22, 34, 0.85)';
          ctx.fillRect(sx + RENDER_TILE / 2 - tw / 2, sy + RENDER_TILE + 2, tw, 14);
          ctx.fillStyle = '#fbcfe8';
          ctx.textAlign = 'center';
          ctx.fillText(lbl, sx + RENDER_TILE / 2, sy + RENDER_TILE + 12);
        }
      }

      // Draw active NPCs
      const studiedSet = new Set(st.studiedFichas);
      const duelWinsSet = new Set(st.duelWins || []);
      const idleFrame = Math.floor(animClock * 2.2) & 1;
      const npcSize = atlasReady ? 64 : RENDER_TILE;
      const badgeLift = atlasReady ? 14 : 0;

      for (const npc of cachedActiveNpcs) {
        if (npc.x < minTx - 2 || npc.x > maxTx + 2 || npc.y < minTy - 2 || npc.y > maxTy + 2) continue;
        const sx = Math.floor(npc.x * RENDER_TILE - viewLeft);
        const sy = Math.floor(npc.y * RENDER_TILE - viewTop);
        const sp = getNpcSprite(npc.ficha.npcRole, npc.ficha.npcSeed, idleFrame, npc.ficha.npcName);
        if (atlasReady) {
          const dx = Math.round(sx + (RENDER_TILE - npcSize) / 2);
          const dy = Math.round(sy + RENDER_TILE - npcSize + 4);
          ctx.drawImage(sp, dx, dy, npcSize, npcSize);
        } else {
          ctx.drawImage(sp, sx, sy, RENDER_TILE, RENDER_TILE);
        }

        const isStudied = studiedSet.has(npc.id);
        const isDuelWon = duelWinsSet.has(npc.id);
        const isTracked = tracked === npc.id;
        const bobY = Math.sin(animClock * 4 + npc.ficha.npcSeed) * 2.5 - badgeLift;

        if (isTracked) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(sx + 18, sy - 16 + bobY, 12, 12);
          ctx.fillStyle = '#09101d';
          ctx.font = '700 10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText('★', sx + 24, sy - 6 + bobY);
        } else if (!isStudied) {
          ctx.fillStyle = npc.isDuelMaster ? '#f59e0b' : '#e6b84c';
          ctx.fillRect(sx + 18, sy - 14 + bobY, 12, 12);
          ctx.fillStyle = '#1b160d';
          ctx.font = '700 10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(npc.isDuelMaster ? '⚔' : '!', sx + 24, sy - 4 + bobY);
        } else {
          ctx.fillStyle = isDuelWon ? '#a855f7' : '#22c55e';
          ctx.fillRect(sx + 18, sy - 12 - badgeLift, 12, 11);
          ctx.fillStyle = '#ffffff';
          ctx.font = '700 9px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(isDuelWon ? '★' : '✓', sx + 24, sy - 3 - badgeLift);
        }

        if (curPhase !== 'title' && Math.hypot(npc.x - hero.x, npc.y - hero.y) < 6) {
          ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
          const shortLbl = npc.isDuelMaster ? `⚔ ${npc.ficha.npcName}` : npc.ficha.npcName;
          const tw = ctx.measureText(shortLbl).width + 10;
          ctx.fillStyle = 'rgba(14, 17, 24, 0.86)';
          ctx.fillRect(sx + RENDER_TILE / 2 - tw / 2, sy + RENDER_TILE + 3, tw, 15);
          ctx.fillStyle = npc.isDuelMaster ? '#fde68a' : '#f4efe4';
          ctx.textAlign = 'center';
          ctx.fillText(shortLbl, sx + RENDER_TILE / 2, sy + RENDER_TILE + 14);
        }
      }

      // Draw active Enemies, Mini-Bosses, Bosses, and Ressurgidos
      const defeated = new Set([...st.defeatedEnemies, ...st.defeatedBosses]);
      const mobFrame = Math.floor(animClock * 3.2) & 1;

      for (const en of [...liveEnemies, ...(curPhase === 'playing' ? cachedResurgents : [])]) {
        if (!en.isResurgent && (!cachedActiveEnemyIds.has(en.id) || defeated.has(en.id))) continue;
        if (en.x < minTx - 3 || en.x > maxTx + 3 || en.y < minTy - 3 || en.y > maxTy + 3) continue;
        const sizeMult = atlasReady
          ? en.isBoss
            ? 2.15
            : en.isMiniBoss
              ? 1.7
              : 1.35
          : en.isBoss
            ? 1.85
            : en.isMiniBoss
              ? 1.45
              : 1.0;
        const drawSize = Math.round(RENDER_TILE * sizeMult);
        const sx = Math.floor((en.x + 0.5) * RENDER_TILE - drawSize / 2 - viewLeft);
        const sy = atlasReady
          ? Math.floor((en.y + 1) * RENDER_TILE - drawSize + 6 - viewTop)
          : Math.floor((en.y + 0.5) * RENDER_TILE - drawSize / 2 - viewTop);

        if (en.isBoss || en.isMiniBoss || en.isResurgent) {
          ctx.fillStyle = en.isResurgent
            ? 'rgba(147, 51, 234, 0.28)'
            : en.isBoss
              ? 'rgba(220, 38, 38, 0.25)'
              : 'rgba(245, 158, 11, 0.24)';
          ctx.beginPath();
          ctx.arc(sx + drawSize / 2, sy + drawSize * 0.78, drawSize * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }

        const sp = getMonsterSprite(en.sprite, mobFrame, Boolean(en.isResurgent), en.isBoss || en.isMiniBoss, 0);
        ctx.drawImage(sp, sx, sy, drawSize, drawSize);

        if (
          curPhase !== 'title' &&
          (en.isBoss || en.isMiniBoss || en.isResurgent || Math.hypot(en.x - hero.x, en.y - hero.y) < 6)
        ) {
          ctx.font = en.isBoss ? '700 12px "Cinzel", serif' : '600 11px "Plus Jakarta Sans", sans-serif';
          const lbl = en.isBoss ? `BOSS · ${en.nome}` : en.isMiniBoss ? `MINI-BOSS · ${en.nome}` : en.nome;
          const tw = ctx.measureText(lbl).width + 12;
          ctx.fillStyle = en.isResurgent
            ? 'rgba(59, 7, 100, 0.92)'
            : en.isBoss
              ? 'rgba(127, 29, 29, 0.92)'
              : 'rgba(20, 18, 28, 0.9)';
          ctx.fillRect(sx + drawSize / 2 - tw / 2, sy - 18, tw, 17);
          ctx.fillStyle = en.isBoss ? '#fde047' : en.isResurgent ? '#e9d5ff' : '#fca5a5';
          ctx.textAlign = 'center';
          ctx.fillText(lbl, sx + drawSize / 2, sy - 5);
        }
      }

      // Draw Hero
      if (curPhase !== 'title') {
        const capeReward = REGIONS.find((r) => r.cosmeticReward.id === st.equippedCosmetic)?.cosmeticReward.color || null;
        const walkFrame = hero.moving ? Math.floor(hero.walkDist * 4.5) & 3 : 0;
        const heroSprite = getHeroSprite(hero.dir, walkFrame, st.playerClass, capeReward);
        const hx = Math.floor(hero.x * RENDER_TILE - viewLeft);
        const hy = Math.floor(hero.y * RENDER_TILE - viewTop);
        if (atlasReady) {
          const heroSize = 66;
          const dx = Math.round(hx + (RENDER_TILE - heroSize) / 2);
          const dy = Math.round(hy + RENDER_TILE - heroSize + 4);
          ctx.drawImage(heroSprite, dx, dy, heroSize, heroSize);
        } else {
          ctx.drawImage(heroSprite, hx, hy, RENDER_TILE, RENDER_TILE);
        }

        if (tracked) {
          const targetNpc = cachedActiveNpcs.find((n) => n.id === tracked);
          if (targetNpc) {
            const ang = Math.atan2(targetNpc.y - hero.y, targetNpc.x - hero.x);
            const ax = hx + RENDER_TILE / 2 + Math.cos(ang) * 38;
            const ay = hy + RENDER_TILE / 2 + Math.sin(ang) * 38;
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(ax, ay, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#09101d';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Draw Lumina, the glowing Nano Banana Guide Fairy Companion floating beside the Hero!
        const fx = Math.floor(fairy.x * RENDER_TILE - viewLeft);
        const fy = Math.floor(fairy.y * RENDER_TILE - viewTop);
        const fairyFrame = Math.floor(animClock * 7.5) & 1;
        const fairySprite = getFairySprite(fairy.dir, fairyFrame);
        const fairySize = atlasReady ? 46 : 30;
        const fcx = fx + RENDER_TILE / 2;
        const fcy = fy + RENDER_TILE / 2;
        const auraGrad = ctx.createRadialGradient(fcx, fcy, 4, fcx, fcy, 26);
        auraGrad.addColorStop(0, 'rgba(186, 230, 253, 0.42)');
        auraGrad.addColorStop(0.55, 'rgba(253, 224, 71, 0.18)');
        auraGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(fcx, fcy, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.drawImage(
          fairySprite,
          Math.round(fcx - fairySize / 2),
          Math.round(fcy - fairySize / 2),
          fairySize,
          fairySize
        );
      }

      // Floating clouds in Montanhas da Infra
      if (cam.x > 112 * RENDER_TILE && cam.y > 78 * RENDER_TILE) {
        ctx.fillStyle = 'rgba(226, 232, 240, 0.16)';
        for (let i = 0; i < 6; i++) {
          const cx = ((animClock * 18 + i * 260) % (width + 240)) - 120;
          const cy = 80 + i * 130;
          ctx.fillRect(cx, cy, 110, 26);
          ctx.fillRect(cx + 20, cy - 14, 70, 14);
        }
      }

      // Particles
      for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
        const p = particles[i];
        if (!p.active) continue;
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - viewLeft, p.y - viewTop, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      // Seamless Fog-of-war over unexplored 4x4 chunks during gameplay
      if (curPhase !== 'title') {
        const minCx = Math.floor(minTx / 4);
        const maxCx = Math.ceil(maxTx / 4);
        const minCy = Math.floor(minTy / 4);
        const maxCy = Math.ceil(maxTy / 4);
        ctx.fillStyle = 'rgba(10, 13, 22, 0.72)';
        for (let cy = minCy; cy <= maxCy; cy++) {
          for (let cx = minCx; cx <= maxCx; cx++) {
            if (!exploredSet.has(`${cx},${cy}`)) {
              const x0 = Math.floor(cx * 4 * RENDER_TILE - viewLeft);
              const y0 = Math.floor(cy * 4 * RENDER_TILE - viewTop);
              const x1 = Math.floor((cx + 1) * 4 * RENDER_TILE - viewLeft);
              const y1 = Math.floor((cy + 1) * 4 * RENDER_TILE - viewTop);
              ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribeAtlas();
      ro.disconnect();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', clearInputs);
      document.removeEventListener('visibilitychange', clearInputs);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, [apiRef]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" data-testid="game-canvas-container">
      <canvas
        ref={canvasRef}
        data-testid="game-canvas"
        className="block w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
};
