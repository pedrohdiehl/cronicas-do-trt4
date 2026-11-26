import { REGIONS } from '../data/content';
import { slugifyBuildingLabel } from '../systems/buildings';
import { getAllFichas, getAllZonas, getDatabaseRevision } from '../systems/customDatabase';
import { isCargoAllowed } from '../systems/gameLogic';
import type { Ficha, ItemId, PlayerClass, RegionId, RegionInfo, ZonaInfo } from '../types';

export const WORLD_W = 160;
export const WORLD_H = 160;
export const TILE_PX = 16;
export const TILE_SCALE = 3;
export const RENDER_TILE = TILE_PX * TILE_SCALE; // 48px

export const enum TileType {
  GrassToga = 0,
  CobbleRoad = 1,
  TribunalFloor = 2,
  StoneWall = 3,
  CastleFloor = 4,
  BlueCarpet = 5,
  ForestGrass = 6,
  RuneTree = 7,
  DataRiver = 8,
  WoodBridge = 9,
  FortressFloor = 10,
  FortressWall = 11,
  PadlockGate = 12,
  MountainStone = 13,
  MountainPeak = 14,
  CableFloor = 15,
  PortSand = 16,
  WoodPier = 17,
  OceanWater = 18,
  ShipDeck = 19,
  BossDais = 20,
  FlowerGrass = 21,
  // New SNES Town & Thematic Architecture tiles (Chrono Trigger / FFVI style)
  DirtPath = 22,
  HedgeWall = 23,
  WoodFence = 24,
  TownTree = 25,
  FountainWater = 26,
  FlowerBed = 27,
  RoofRed = 28,
  RoofBlue = 29,
  RoofEmerald = 30,
  RoofGold = 31,
  RoofSlate = 32,
  HouseWall = 33,
  HouseDoor = 34,
  StonePillar = 35,
  ServerRack = 36,
  CrystalShrine = 37,
  CrateDeck = 38,
  TorchPost = 39,
}

export function isSolidTile(t: TileType): boolean {
  return (
    t === TileType.StoneWall ||
    t === TileType.RuneTree ||
    t === TileType.DataRiver ||
    t === TileType.FortressWall ||
    t === TileType.MountainPeak ||
    t === TileType.OceanWater ||
    t === TileType.ShipDeck ||
    t === TileType.HedgeWall ||
    t === TileType.WoodFence ||
    t === TileType.TownTree ||
    t === TileType.FountainWater ||
    t === TileType.RoofRed ||
    t === TileType.RoofBlue ||
    t === TileType.RoofEmerald ||
    t === TileType.RoofGold ||
    t === TileType.RoofSlate ||
    t === TileType.HouseWall ||
    t === TileType.HouseDoor ||
    t === TileType.StonePillar ||
    t === TileType.ServerRack ||
    t === TileType.CrystalShrine ||
    t === TileType.CrateDeck ||
    t === TileType.TorchPost
  );
}

export interface WorldNpc {
  id: string; // ficha.id
  ficha: Ficha;
  x: number;
  y: number;
  isDuelMaster?: boolean; // Featured NPC duelist with special crossed-swords badge
}

export type MonsterSpriteType =
  | 'goblin'
  | 'slime'
  | 'dragon'
  | 'ghost'
  | 'golem'
  | 'hydra'
  | 'kraken'
  | 'knight';

export interface WorldEnemy {
  id: string;
  nome: string;
  subtitulo: string;
  zonaId: string;
  regiaoId: RegionId;
  sprite: MonsterSpriteType;
  behavior: 'patrol' | 'orbit' | 'stalker';
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isBoss: boolean;
  isMiniBoss: boolean;
  isResurgent?: boolean;
  isNpcDuel?: boolean;
  npcDuelFicha?: Ficha;
  resurgentQuestionId?: string;
  level: number;
  patrolPhase: number;
}

export interface WorldChest {
  id: string;
  x: number;
  y: number;
  zonaId: string;
  regiaoId: RegionId;
  requiresKey?: RegionId;
  rewardItem?: ItemId;
  rewardQty?: number;
  rewardCosmeticId?: string;
  label: string;
}

export interface WorldSign {
  id: string;
  x: number;
  y: number;
  zonaId: string;
  regiaoId: RegionId;
  title: string;
  subtitle: string;
  level: number;
}

export interface WorldLandmarkLabel {
  x: number;
  y: number;
  text: string;
  regiaoId: RegionId;
}

export interface WorldCritter {
  id: string;
  name: string;
  kind: 'dog' | 'cat';
  variant: 'golden' | 'spotted' | 'brown' | 'husky' | 'ginger';
  regiaoId: RegionId;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  dir: 'left' | 'right';
  phase: number;
  barkLine: string;
}

export interface WorldBuilding {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  doorX: number;
  doorY: number;
  style: 'house_red' | 'house_blue' | 'house_emerald' | 'house_gold';
  regiaoId: RegionId;
  label?: string;
}

export interface WorldFountain {
  x: number;
  y: number;
}

export interface WorldData {
  revision: number;
  tiles: Uint8Array; // WORLD_W * WORLD_H
  npcs: WorldNpc[];
  enemies: WorldEnemy[];
  chests: WorldChest[];
  signs: WorldSign[];
  critters: WorldCritter[];
  landmarks: WorldLandmarkLabel[];
  buildings: WorldBuilding[];
  fountains: WorldFountain[];
}

function hash2(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263) ^ 0x5bf03635;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return Math.abs(h ^ (h >>> 16));
}

export interface RegionFountainRespawn {
  x: number;
  y: number;
  fountainX: number;
  fountainY: number;
  region: RegionInfo;
}

/**
 * Central plaza fountain & walkable restoration tile right in front of it for every one of the 6 regions.
 */
export const REGION_CENTRAL_FOUNTAINS: Record<
  RegionId,
  { fx: number; fy: number; respawnX: number; respawnY: number; plazaTile: TileType }
> = {
  'reino-da-toga': { fx: 28, fy: 17, respawnX: 29, respawnY: 22, plazaTile: TileType.TribunalFloor },
  'cidadela-do-conselho': { fx: 79, fy: 34, respawnX: 80, respawnY: 38, plazaTile: TileType.TribunalFloor },
  'floresta-do-codigo': { fx: 30, fy: 96, respawnX: 31, respawnY: 100, plazaTile: TileType.CobbleRoad },
  'fortaleza-da-muralha': { fx: 97, fy: 108, respawnX: 98, respawnY: 112, plazaTile: TileType.FortressFloor },
  'montanhas-da-infra': { fx: 134, fy: 108, respawnX: 135, respawnY: 112, plazaTile: TileType.CableFloor },
  'porto-babel': { fx: 125, fy: 34, respawnX: 126, respawnY: 38, plazaTile: TileType.CobbleRoad },
};

export function getRegionFountainRespawn(regionId: RegionId): RegionFountainRespawn {
  const region = REGIONS.find((r) => r.id === regionId) || REGIONS[0];
  const spec = REGION_CENTRAL_FOUNTAINS[region.id] || REGION_CENTRAL_FOUNTAINS['reino-da-toga'];
  const world = buildWorldData();

  const isFree = (tx: number, ty: number) => {
    if (tx < 2 || ty < 2 || tx >= WORLD_W - 2 || ty >= WORLD_H - 2) return false;
    return !isSolidTile(world.tiles[ty * WORLD_W + tx] as TileType);
  };

  if (isFree(spec.respawnX, spec.respawnY)) {
    return { x: spec.respawnX, y: spec.respawnY, fountainX: spec.fx, fountainY: spec.fy, region };
  }

  // Fallback spiral around the fountain plaza if ever blocked
  for (let r = 1; r <= 6; r++) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const tx = spec.respawnX + dx;
        const ty = spec.respawnY + dy;
        if (isFree(tx, ty)) {
          return { x: tx, y: ty, fountainX: spec.fx, fountainY: spec.fy, region };
        }
      }
    }
  }
  return { x: spec.respawnX, y: spec.respawnY, fountainX: spec.fx, fountainY: spec.fy, region };
}

export function getRegionAt(x: number, y: number): RegionInfo {
  for (const r of REGIONS) {
    if (
      x >= r.bounds.x - 2 &&
      x <= r.bounds.x + r.bounds.w + 2 &&
      y >= r.bounds.y - 2 &&
      y <= r.bounds.y + r.bounds.h + 2
    ) {
      return r;
    }
  }
  return REGIONS[0];
}

export function getZonaAt(x: number, y: number): ZonaInfo | null {
  const allZonas = getAllZonas();
  // Prefer custom zones if hero stands inside them, then base zones
  for (let i = allZonas.length - 1; i >= 0; i--) {
    const z = allZonas[i];
    if (
      x >= z.bounds.x &&
      x < z.bounds.x + z.bounds.w &&
      y >= z.bounds.y &&
      y < z.bounds.y + z.bounds.h
    ) {
      return z;
    }
  }
  return null;
}

const LAND_GROUND_TILES = new Set<TileType>([
  TileType.GrassToga,
  TileType.FlowerGrass,
  TileType.CobbleRoad,
  TileType.DirtPath,
  TileType.TribunalFloor,
  TileType.CastleFloor,
  TileType.BlueCarpet,
  TileType.ForestGrass,
  TileType.FortressFloor,
  TileType.MountainStone,
  TileType.CableFloor,
  TileType.PortSand,
  TileType.WoodPier,
  TileType.WoodBridge,
]);

/**
 * Determines the natural ground tile directly beneath a prop or building tile
 * by voting among surrounding walkable land tiles (radius 1, then radius 2),
 * falling back cleanly to the native biome ground for that coordinate.
 */
export function getBaseGroundForTile(tiles: Uint8Array, tx: number, ty: number): TileType {
  const self = tiles[ty * WORLD_W + tx] as TileType;
  if (LAND_GROUND_TILES.has(self)) return self;

  for (const radius of [1, 2]) {
    const counts = new Map<TileType, number>();
    let bestTile: TileType | null = null;
    let bestScore = -1;

    for (let dy = -radius; dy <= radius; dy++) {
      const ny = ty + dy;
      if (ny < 0 || ny >= WORLD_H) continue;
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = tx + dx;
        if (nx < 0 || nx >= WORLD_W) continue;
        const nt = tiles[ny * WORLD_W + nx] as TileType;
        if (!LAND_GROUND_TILES.has(nt)) continue;
        // Favor orthogonal neighbors slightly for crisp borders
        const weight = dx === 0 || dy === 0 ? 2 : 1;
        const nextScore = (counts.get(nt) || 0) + weight;
        counts.set(nt, nextScore);
        if (nextScore > bestScore) {
          bestScore = nextScore;
          bestTile = nt;
        }
      }
    }
    if (bestTile !== null) return bestTile;
  }

  // Fallback to native biome ground for this region
  const reg = getRegionAt(tx, ty);
  switch (reg.id) {
    case 'porto-babel':
      return TileType.PortSand;
    case 'cidadela-do-conselho':
      return TileType.CastleFloor;
    case 'floresta-do-codigo':
      return TileType.ForestGrass;
    case 'fortaleza-da-muralha':
      return TileType.FortressFloor;
    case 'montanhas-da-infra':
      return TileType.MountainStone;
    default:
      return TileType.GrassToga;
  }
}

const MONSTER_THEMES: Record<RegionId, { nome: string; sprite: MonsterSpriteType }[]> = {
  'reino-da-toga': [
    { nome: 'Duende da Súmula', sprite: 'goblin' },
    { nome: 'Golem do Quórum', sprite: 'golem' },
    { nome: 'Sentinela do Decreto', sprite: 'knight' },
  ],
  'cidadela-do-conselho': [
    { nome: 'Autômato da Portaria', sprite: 'golem' },
    { nome: 'Cavaleiro do SLA', sprite: 'knight' },
    { nome: 'Bug-Goblin do Backlog', sprite: 'goblin' },
  ],
  'floresta-do-codigo': [
    { nome: 'Bug-Goblin do Código', sprite: 'goblin' },
    { nome: 'Slime de SQL Injection', sprite: 'slime' },
    { nome: 'Hidra da Dependência', sprite: 'hydra' },
  ],
  'fortaleza-da-muralha': [
    { nome: 'Fantasma do Ransomware', sprite: 'ghost' },
    { nome: 'Slime de Phishing', sprite: 'slime' },
    { nome: 'Espectro do Spoofing', sprite: 'ghost' },
  ],
  'montanhas-da-infra': [
    { nome: 'Dragão do Deadlock', sprite: 'dragon' },
    { nome: 'Golem da Alucinação', sprite: 'golem' },
    { nome: 'Hidra do Pacote Perdido', sprite: 'hydra' },
  ],
  'porto-babel': [
    { nome: 'Kraken do False Cognate', sprite: 'kraken' },
    { nome: 'Corsário do Phrasal Verb', sprite: 'goblin' },
    { nome: 'Slime do Jargão', sprite: 'slime' },
  ],
};

let cachedWorld: WorldData | null = null;

export function invalidateWorldCache(): void {
  cachedWorld = null;
}

export function buildWorldData(): WorldData {
  const rev = getDatabaseRevision();
  if (cachedWorld && cachedWorld.revision === rev) return cachedWorld;

  const ZONAS = getAllZonas();
  const FICHAS = getAllFichas();

  const tiles = new Uint8Array(WORLD_W * WORLD_H);
  const landmarks: WorldLandmarkLabel[] = [];
  const buildings: WorldBuilding[] = [];
  const fountains: WorldFountain[] = [];

  const setTile = (x: number, y: number, t: TileType) => {
    if (x >= 0 && y >= 0 && x < WORLD_W && y < WORLD_H) {
      tiles[y * WORLD_W + x] = t;
    }
  };
  const getTile = (x: number, y: number): TileType => {
    if (x < 0 || y < 0 || x >= WORLD_W || y >= WORLD_H) return TileType.StoneWall;
    return tiles[y * WORLD_W + x] as TileType;
  };
  const fillRect = (x: number, y: number, w: number, h: number, t: TileType) => {
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        setTile(xx, yy, t);
      }
    }
  };

  /**
   * Stamps a cozy SNES RPG building (pitched roof + timber/stone walls + front door + porch + optional label).
   * Guarantees a clean walkable 1-tile street perimeter around the house!
   */
  const stampHouse = (
    x: number,
    y: number,
    w: number,
    h: number,
    roof: TileType,
    regiaoId: RegionId,
    label?: string,
    yardTile: TileType = TileType.CobbleRoad,
    pillars = false
  ) => {
    // Porch / front walkway
    for (let xx = x - 1; xx <= x + w; xx++) {
      setTile(xx, y + h, yardTile);
      setTile(xx, y + h + 1, yardTile);
    }
    const roofH = Math.max(2, Math.floor(h * 0.55));
    fillRect(x, y, w, roofH, roof);
    fillRect(x, y + roofH, w, h - roofH, TileType.HouseWall);
    // Centered arched door
    const doorX = x + Math.floor(w / 2);
    setTile(doorX, y + h - 1, TileType.HouseDoor);
    if (pillars && w >= 5) {
      setTile(x, y + h - 1, TileType.StonePillar);
      setTile(x + w - 1, y + h - 1, TileType.StonePillar);
    }
    // Cozy side flowers or torches
    if (x - 1 >= 4) setTile(x - 1, y + h - 1, TileType.FlowerBed);
    if (x + w < WORLD_W - 4) setTile(x + w, y + h - 1, TileType.TorchPost);
    if (label) {
      landmarks.push({ x: x + w / 2, y: y - 0.35, text: label, regiaoId });
    }
    const style: WorldBuilding['style'] =
      roof === TileType.RoofGold
        ? 'house_gold'
        : roof === TileType.RoofBlue || roof === TileType.RoofSlate
          ? 'house_blue'
          : roof === TileType.RoofEmerald
            ? 'house_emerald'
            : 'house_red';
    const doorY = y + h - 1;
    const id = label ? slugifyBuildingLabel(label) : `building-${x}-${y}`;
    buildings.push({ id, x, y, w, h, doorX, doorY, style, regiaoId, label });
  };

  /**
   * Stamps a 2x2 animated SNES Town Fountain surrounded by a paved plaza ring.
   */
  const stampFountain = (cx: number, cy: number, plazaTile: TileType) => {
    fillRect(cx - 2, cy - 2, 6, 6, plazaTile);
    setTile(cx, cy, TileType.FountainWater);
    setTile(cx + 1, cy, TileType.FountainWater);
    setTile(cx, cy + 1, TileType.FountainWater);
    setTile(cx + 1, cy + 1, TileType.FountainWater);
    // Corner flowers / lamps around fountain
    setTile(cx - 2, cy - 2, TileType.FlowerBed);
    setTile(cx + 3, cy - 2, TileType.FlowerBed);
    setTile(cx - 2, cy + 3, TileType.TorchPost);
    setTile(cx + 3, cy + 3, TileType.TorchPost);
    if (!fountains.some((f) => f.x === cx && f.y === cy)) {
      fountains.push({ x: cx, y: cy });
    }
  };

  /**
   * Paints an organic winding village path (sine-curved so the world feels handcrafted like Chrono Trigger!)
   */
  const carveWindingPath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tile: TileType = TileType.DirtPath,
    amp = 1.6
  ) => {
    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 2 + 1;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const wave = Math.sin(t * Math.PI * 2) * amp;
      const isHoriz = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
      const px = Math.round(x1 + (x2 - x1) * t + (isHoriz ? 0 : wave));
      const py = Math.round(y1 + (y2 - y1) * t + (isHoriz ? wave : 0));
      for (let dy = -1; dy <= 0; dy++) {
        for (let dx = -1; dx <= 0; dx++) {
          const cur = getTile(px + dx, py + dy);
          if (cur === TileType.DataRiver || cur === TileType.OceanWater) {
            setTile(px + dx, py + dy, TileType.WoodBridge);
          } else if (cur === TileType.FortressWall) {
            setTile(px + dx, py + dy, TileType.PadlockGate);
          } else if (!isSolidTile(cur) || cur === TileType.TownTree || cur === TileType.RuneTree || cur === TileType.HedgeWall) {
            setTile(px + dx, py + dy, tile);
          }
        }
      }
    }
  };

  // =========================================================================
  // 1. PAINT BASE BIOMES WITH ORGANIC CURVED BORDERS (Not rigid rectangles!)
  // =========================================================================
  for (let y = 0; y < WORLD_H; y++) {
    for (let x = 0; x < WORLD_W; x++) {
      if (x < 3 || y < 3 || x >= WORLD_W - 3 || y >= WORLD_H - 3) {
        setTile(x, y, x > 106 && y < 80 ? TileType.OceanWater : TileType.StoneWall);
        continue;
      }

      const h = hash2(x, y);
      const northSouthWave = 80 + Math.round(Math.sin(x * 0.14) * 2.5);
      const togaConselhoWave = 55 + Math.round(Math.cos(y * 0.16) * 2);
      const conselhoPortoWave = 107 + Math.round(Math.sin(y * 0.15) * 2);
      const coastWave = 145 + Math.round(Math.sin(y * 0.22) * 2.5);

      if (y < northSouthWave) {
        if (x < togaConselhoWave) {
          // Reino da Toga — Sunny meadow & village hills
          setTile(x, y, h % 10 === 0 ? TileType.FlowerGrass : TileType.GrassToga);
        } else if (x < conselhoPortoWave) {
          // Cidadela do Conselho — Marble courtyards & royal gardens
          setTile(x, y, TileType.CastleFloor);
        } else {
          // Porto Babel — Coastal harbor & animated sea
          if (x >= coastWave) {
            setTile(x, y, TileType.OceanWater);
          } else {
            setTile(x, y, TileType.PortSand);
          }
        }
      } else {
        const florestaMuralhaWave = 81 + Math.round(Math.sin(y * 0.18) * 1.5);
        const muralhaMontanhaWave = 115 + Math.round(Math.cos(y * 0.14) * 2);
        if (x < florestaMuralhaWave) {
          // Floresta do Código — Enchanted developer forest
          setTile(x, y, TileType.ForestGrass);
        } else if (x < muralhaMontanhaWave) {
          // Fortaleza da Muralha — Obsidian security citadel
          setTile(x, y, TileType.FortressFloor);
        } else {
          // Montanhas da Infra — Alpine server plateau
          setTile(x, y, h % 8 === 0 ? TileType.CableFloor : TileType.MountainStone);
        }
      }
    }
  }

  // =========================================================================
  // 2. NATURAL BORDER GROVES, RIVERS, HILLS & TOWN VILLAGES PER REGION!
  // =========================================================================

  // --- A. REINO DA TOGA (Legislação + Direitos Humanos): Medieval SNES Town ---
  // Organic tree groves framing the village outskirts (like Chrono Trigger Truce!)
  for (let y = 5; y <= 76; y++) {
    for (let x = 5; x <= 53; x++) {
      const curTile = getTile(x, y);
      if (curTile !== TileType.GrassToga && curTile !== TileType.FlowerGrass) continue;
      const distCenter = Math.hypot(x - 29, y - 22);
      const distSouthPlaza = Math.hypot(x - 28, y - 56);
      if (distCenter > 15 && distSouthPlaza > 14 && hash2(x, y) % 11 === 0) {
        setTile(x, y, TileType.TownTree);
      }
    }
  }
  // Northern Village Square (Tribunal Plaza around hero spawn 29,22)
  fillRect(21, 16, 17, 13, TileType.TribunalFloor);
  // Decorative hedges bordering the square with generous entrances
  for (let x = 21; x <= 37; x++) {
    if (Math.abs(x - 29) > 2) setTile(x, 28, TileType.HedgeWall);
  }
  // Central bubbling Fountain right north of hero spawn!
  stampFountain(28, 17, TileType.TribunalFloor);

  // Thematic Buildings in Reino da Toga:
  stampHouse(25, 9, 9, 5, TileType.RoofGold, 'reino-da-toga', 'Palácio do TRT4', TileType.TribunalFloor, true);
  stampHouse(13, 15, 6, 4, TileType.RoofRed, 'reino-da-toga', 'Cartório & Conduta', TileType.CobbleRoad);
  stampHouse(40, 15, 6, 4, TileType.RoofBlue, 'reino-da-toga', 'Biblioteca Jurídica', TileType.CobbleRoad);
  stampHouse(12, 26, 5, 4, TileType.RoofRed, 'reino-da-toga', 'Casa da Ouvidoria', TileType.DirtPath);
  stampHouse(42, 26, 5, 4, TileType.RoofEmerald, 'reino-da-toga', 'Estação PLS Sustentável', TileType.DirtPath);

  // Southern District: Jardim dos Direitos Humanos (Memorial Plaza + Houses + Fountain)
  fillRect(19, 49, 19, 13, TileType.TribunalFloor);
  stampFountain(27, 53, TileType.TribunalFloor);
  stampHouse(12, 46, 6, 4, TileType.RoofBlue, 'reino-da-toga', 'Casa dos Tratados', TileType.DirtPath, true);
  stampHouse(40, 46, 6, 4, TileType.RoofGold, 'reino-da-toga', 'Memorial da ONU', TileType.DirtPath, true);
  stampHouse(14, 64, 5, 4, TileType.RoofRed, 'reino-da-toga', 'Abrigo Cidadão', TileType.DirtPath);
  // Decorative wooden garden fences
  for (let x = 20; x <= 25; x++) setTile(x, 48, TileType.WoodFence);
  for (let x = 32; x <= 37; x++) setTile(x, 48, TileType.WoodFence);

  // --- B. CIDADELA DO CONSELHO (Normativos PDPJ + Governança TI: PMBOK/ITIL/COBIT) ---
  // Royal carpet grand avenues + palace courtyard
  fillRect(73, 28, 16, 16, TileType.TribunalFloor);
  for (let y = 10; y <= 72; y++) {
    setTile(80, y, TileType.BlueCarpet);
    setTile(81, y, TileType.BlueCarpet);
  }
  for (let x = 60; x <= 102; x++) {
    setTile(x, 35, TileType.BlueCarpet);
  }
  stampFountain(79, 34, TileType.TribunalFloor);
  // Thematic Governance & PDPJ Guild Buildings
  stampHouse(76, 11, 9, 5, TileType.RoofBlue, 'cidadela-do-conselho', 'Salão do Conselho CNJ', TileType.CastleFloor, true);
  stampHouse(61, 18, 6, 4, TileType.RoofGold, 'cidadela-do-conselho', 'Guilda PMBOK', TileType.CastleFloor);
  stampHouse(94, 18, 6, 4, TileType.RoofBlue, 'cidadela-do-conselho', 'Torre COBIT', TileType.CastleFloor);
  stampHouse(61, 52, 6, 4, TileType.RoofEmerald, 'cidadela-do-conselho', 'Central ITIL v4', TileType.CastleFloor);
  stampHouse(94, 52, 6, 4, TileType.RoofSlate, 'cidadela-do-conselho', 'Escritório PDTIC TRT4', TileType.CastleFloor);
  // Ornamental castle gardens
  for (let y = 12; y <= 70; y += 8) {
    setTile(59, y, TileType.HedgeWall);
    setTile(103, y, TileType.HedgeWall);
    setTile(59, y + 1, TileType.FlowerBed);
    setTile(103, y + 1, TileType.FlowerBed);
  }

  // --- C. FLORESTA DO CÓDIGO (Eng. Software, Stack PDPJ, DevOps, Programação, BD) ---
  // Organic shimmering Data River meandering across the forest!
  for (let x = 5; x <= 79; x++) {
    const ry = 112 + Math.round(Math.sin(x * 0.18) * 2.5);
    setTile(x, ry, TileType.DataRiver);
    setTile(x, ry + 1, TileType.DataRiver);
    setTile(x, ry + 2, TileType.DataRiver);
  }
  // Lush clusters of glowing Rune Trees framing forest clearings!
  for (let y = 84; y <= 154; y++) {
    for (let x = 5; x <= 79; x++) {
      if (getTile(x, y) === TileType.ForestGrass && hash2(x, y) % 9 === 0) {
        if (Math.abs(x - 29) > 3 && Math.abs(x - 60) > 3 && Math.abs(y - 120) > 4) {
          setTile(x, y, TileType.RuneTree);
        }
      }
    }
  }
  // Coder Village & Thematic Tech Buildings!
  stampHouse(12, 88, 6, 4, TileType.RoofEmerald, 'floresta-do-codigo', 'Oficina Eng. Software', TileType.DirtPath);
  stampHouse(48, 88, 7, 4, TileType.RoofBlue, 'floresta-do-codigo', 'Estúdio Stack PDPJ', TileType.DirtPath);
  stampHouse(12, 127, 6, 4, TileType.RoofSlate, 'floresta-do-codigo', 'Forja DevOps CI/CD', TileType.DirtPath);
  stampHouse(38, 127, 6, 4, TileType.RoofRed, 'floresta-do-codigo', 'Taverna Java & Web', TileType.DirtPath);
  stampHouse(62, 127, 7, 4, TileType.RoofGold, 'floresta-do-codigo', 'Catedral SQL & Dados', TileType.CobbleRoad, true);
  // Glowing Database Crystal Shrines beside Catedral SQL
  setTile(60, 130, TileType.CrystalShrine);
  setTile(70, 130, TileType.CrystalShrine);
  // Forest Fountain clearing
  stampFountain(30, 96, TileType.CobbleRoad);

  // --- D. FORTALEZA DA MURALHA (Segurança da Informação & LGPD) ---
  for (let x = 83; x <= 113; x++) {
    setTile(x, 84, TileType.FortressWall);
    setTile(x, 153, TileType.FortressWall);
  }
  for (let y = 84; y <= 153; y++) {
    setTile(83, y, TileType.FortressWall);
    setTile(113, y, TileType.FortressWall);
  }
  // Watchtower corners & lit braziers
  fillRect(83, 84, 3, 3, TileType.FortressWall);
  fillRect(111, 84, 3, 3, TileType.FortressWall);
  fillRect(83, 151, 3, 3, TileType.FortressWall);
  fillRect(111, 151, 3, 3, TileType.FortressWall);
  // Thematic Security Buildings inside the Citadel
  stampHouse(94, 92, 8, 5, TileType.RoofSlate, 'fortaleza-da-muralha', 'Cofre da LGPD', TileType.FortressFloor, true);
  stampHouse(87, 127, 6, 4, TileType.RoofRed, 'fortaleza-da-muralha', 'Torre Criptografia', TileType.FortressFloor);
  stampHouse(103, 127, 6, 4, TileType.RoofBlue, 'fortaleza-da-muralha', 'SOC & Firewall', TileType.FortressFloor);
  stampFountain(97, 108, TileType.FortressFloor);
  setTile(92, 96, TileType.TorchPost);
  setTile(103, 96, TileType.TorchPost);

  // --- E. MONTANHAS DA INFRA (Sistemas Operacionais, Redes, IA e Nuvem) ---
  for (let y = 84; y <= 154; y++) {
    for (let x = 118; x <= 155; x++) {
      if ((x === 118 || x === 155 || y === 154) && hash2(x, y) % 3 !== 0) {
        setTile(x, y, TileType.MountainPeak);
      } else if (hash2(x, y) % 14 === 0 && Math.abs(x - 135) > 4 && Math.abs(y - 120) > 4) {
        setTile(x, y, TileType.MountainPeak);
      }
    }
  }
  // Thematic Datacenter, Network & AI Neural Shrines!
  stampHouse(123, 90, 6, 4, TileType.RoofSlate, 'montanhas-da-infra', 'Bastion Linux & SO', TileType.CableFloor);
  stampHouse(141, 90, 6, 4, TileType.RoofBlue, 'montanhas-da-infra', 'Antena de Redes TCP/IP', TileType.CableFloor);
  stampHouse(131, 127, 8, 5, TileType.RoofGold, 'montanhas-da-infra', 'Templo IA & Nuvem', TileType.CableFloor, true);
  // Blinking Server Racks & Neural Crystals!
  for (const [sx, sy] of [
    [121, 93],
    [130, 93],
    [139, 93],
    [148, 93],
    [128, 130],
    [141, 130],
  ]) {
    setTile(sx, sy, TileType.ServerRack);
  }
  setTile(129, 132, TileType.CrystalShrine);
  setTile(140, 132, TileType.CrystalShrine);
  stampFountain(134, 108, TileType.CableFloor);

  // --- F. PORTO BABEL (Inglês Técnico): Sunny SNES Harbor Town ---
  // Wooden piers & moored tall ships along eastern ocean
  for (const pierY of [18, 38, 58]) {
    for (let x = 140; x <= 150; x++) {
      setTile(x, pierY, TileType.WoodPier);
      setTile(x, pierY + 1, TileType.WoodPier);
    }
    // Docked ship beside pier
    for (let sy = pierY - 3; sy <= pierY - 1; sy++) {
      for (let sx = 148; sx <= 153; sx++) {
        setTile(sx, sy, TileType.ShipDeck);
      }
    }
    setTile(141, pierY - 1, TileType.CrateDeck);
    setTile(143, pierY + 2, TileType.CrateDeck);
  }
  // Coastal Town Houses & Seaside Fountain
  stampFountain(125, 34, TileType.CobbleRoad);
  stampHouse(115, 14, 6, 4, TileType.RoofBlue, 'porto-babel', 'Lighthouse & Docs', TileType.PortSand);
  stampHouse(128, 14, 6, 4, TileType.RoofRed, 'porto-babel', 'Babel Harbor Inn', TileType.PortSand);
  stampHouse(115, 50, 6, 4, TileType.RoofGold, 'porto-babel', 'Customs & Vocabulary', TileType.PortSand);
  stampHouse(129, 50, 6, 4, TileType.RoofEmerald, 'porto-babel', 'RFC Shipyard', TileType.PortSand);
  // Palm/town trees & crates
  for (let y = 10; y <= 68; y += 7) {
    setTile(111, y, TileType.TownTree);
    setTile(138, y, TileType.CrateDeck);
  }

  // =========================================================================
  // 3. ORGANIC WINDING ROADS & GRAND AVENUES CONNECTING ALL 6 REGIONS!
  // =========================================================================
  const carveRoadH = (x1: number, x2: number, y: number) => {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      for (let dy = -1; dy <= 1; dy++) {
        const cur = getTile(x, y + dy);
        if (cur === TileType.DataRiver || cur === TileType.OceanWater) {
          setTile(x, y + dy, TileType.WoodBridge);
        } else if (cur === TileType.FortressWall) {
          setTile(x, y + dy, TileType.PadlockGate);
        } else if (cur !== TileType.FountainWater && cur !== TileType.HouseWall && cur !== TileType.HouseDoor && cur !== TileType.RoofRed && cur !== TileType.RoofBlue && cur !== TileType.RoofEmerald && cur !== TileType.RoofGold && cur !== TileType.RoofSlate) {
          setTile(x, y + dy, TileType.CobbleRoad);
        }
      }
    }
  };
  const carveRoadV = (y1: number, y2: number, x: number) => {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cur = getTile(x + dx, y);
        if (cur === TileType.DataRiver || cur === TileType.OceanWater) {
          setTile(x + dx, y, TileType.WoodBridge);
        } else if (cur === TileType.FortressWall) {
          setTile(x + dx, y, TileType.PadlockGate);
        } else if (cur !== TileType.FountainWater && cur !== TileType.HouseWall && cur !== TileType.HouseDoor && cur !== TileType.RoofRed && cur !== TileType.RoofBlue && cur !== TileType.RoofEmerald && cur !== TileType.RoofGold && cur !== TileType.RoofSlate) {
          setTile(x + dx, y, TileType.CobbleRoad);
        }
      }
    }
  };

  // Main connecting arteries (always unobstructed for smooth A* pathfinding!)
  carveRoadH(10, 141, 35); // Northern highway: Toga <-> Conselho <-> Porto Babel
  carveRoadH(10, 150, 80); // Central continental boulevard
  carveRoadH(10, 148, 120); // Southern highway: Floresta <-> Muralha <-> Montanhas
  carveRoadV(15, 150, 29); // West avenue: Toga <-> Floresta
  carveRoadV(17, 150, 81); // Central avenue: Conselho <-> Muralha
  carveRoadV(84, 150, 98); // Muralha interior avenue
  carveRoadV(19, 150, 134); // East avenue: Porto Babel <-> Montanhas
  carveRoadV(82, 148, 60); // Floresta east sub-avenue

  // Re-ensure all 6 regional central plaza fountains stay crisp & un-overwritten by avenues
  for (const spec of Object.values(REGION_CENTRAL_FOUNTAINS)) {
    stampFountain(spec.fx, spec.fy, spec.plazaTile);
  }

  // Cozy winding dirt trails linking cottages to plazas (Chrono Trigger town charm!)
  carveWindingPath(16, 20, 26, 22, TileType.DirtPath, 1.2);
  carveWindingPath(33, 22, 43, 20, TileType.DirtPath, 1.2);
  carveWindingPath(16, 51, 27, 55, TileType.DirtPath, 1.4);
  carveWindingPath(31, 55, 43, 51, TileType.DirtPath, 1.4);
  carveWindingPath(15, 93, 29, 98, TileType.DirtPath, 1.5);
  carveWindingPath(33, 98, 52, 93, TileType.DirtPath, 1.5);
  carveWindingPath(118, 20, 126, 34, TileType.DirtPath, 1.3);
  carveWindingPath(127, 36, 140, 38, TileType.DirtPath, 1.0);

  // Guarantee hero spawn (29, 22) and EVERY region's central fountain restoration spot are 100% walkable
  for (let y = 20; y <= 25; y++) {
    for (let x = 26; x <= 32; x++) {
      if (isSolidTile(getTile(x, y))) {
        setTile(x, y, TileType.TribunalFloor);
      }
    }
  }
  for (const spec of Object.values(REGION_CENTRAL_FOUNTAINS)) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const tx = spec.respawnX + dx;
        const ty = spec.respawnY + dy;
        const cur = getTile(tx, ty);
        if (cur !== TileType.FountainWater && isSolidTile(cur)) {
          setTile(tx, ty, spec.plazaTile);
        }
      }
    }
  }

  // =========================================================================
  // 4. ENTITY PLACEMENT (Zero overlaps, 100% walkable tiles!)
  // =========================================================================
  const occupied = new Set<string>();
  occupied.add('29,22'); // Hero spawn right in front of the Tribunal Fountain!
  occupied.add('29,21');
  occupied.add('29,23');
  occupied.add('29,20');
  // Keep every region's central fountain respawn spot completely free of NPCs/enemies/chests
  for (const spec of Object.values(REGION_CENTRAL_FOUNTAINS)) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        occupied.add(`${spec.respawnX + dx},${spec.respawnY + dy}`);
      }
    }
  }
  // Keep every named building's doorstep clear so players can always walk right up to enter!
  for (const b of buildings) {
    occupied.add(`${b.doorX},${b.doorY + 1}`);
  }

  const claimFreeTile = (
    prefX: number,
    prefY: number,
    bounds: { x: number; y: number; w: number; h: number }
  ): { x: number; y: number } => {
    for (let r = 0; r <= 18; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const tx = Math.max(bounds.x + 1, Math.min(bounds.x + bounds.w - 2, Math.round(prefX + dx)));
          const ty = Math.max(bounds.y + 1, Math.min(bounds.y + bounds.h - 2, Math.round(prefY + dy)));
          const key = `${tx},${ty}`;
          if (!occupied.has(key) && !isSolidTile(getTile(tx, ty))) {
            occupied.add(key);
            return { x: tx, y: ty };
          }
        }
      }
    }
    const fx = Math.max(5, Math.min(WORLD_W - 6, Math.round(prefX)));
    const fy = Math.max(5, Math.min(WORLD_H - 6, Math.round(prefY)));
    if (isSolidTile(getTile(fx, fy))) setTile(fx, fy, TileType.CobbleRoad);
    occupied.add(`${fx},${fy}`);
    return { x: fx, y: fy };
  };

  // 5. Place Zone Entrance Signposts
  const signs: WorldSign[] = [];
  for (const z of ZONAS) {
    const prefX = z.id === '01-nocoes-de-legislacao' ? 25 : z.signTile.x;
    const prefY = z.id === '01-nocoes-de-legislacao' ? 21 : z.signTile.y + 1;
    const pos = claimFreeTile(prefX, prefY, z.bounds);
    signs.push({
      id: `sign-${z.id}`,
      x: pos.x,
      y: pos.y,
      zonaId: z.id,
      regiaoId: z.regiaoId,
      title: z.nome,
      subtitle: z.caiEm.join(' · '),
      level: z.nivelSugerido,
    });
  }

  // 6. Place ALL NPCs (built-in + custom!) neatly in their Zones
  const npcs: WorldNpc[] = [];
  for (const z of ZONAS) {
    const zFichas = FICHAS.filter((f) => f.zonaId === z.id);
    const cols = Math.max(2, Math.ceil(Math.sqrt(zFichas.length * (z.bounds.w / Math.max(10, z.bounds.h)))));
    const rows = Math.max(1, Math.ceil(zFichas.length / cols));
    const padX = 3;
    const padY = 4;
    const innerW = Math.max(4, z.bounds.w - padX * 2);
    const innerH = Math.max(4, z.bounds.h - padY * 2 - 3);

    zFichas.forEach((ficha, idx) => {
      let px: number;
      let py: number;
      if (z.id === '01-nocoes-de-legislacao' && idx === 0) {
        // Right beside hero & fountain on the main square!
        px = 32;
        py = 21;
      } else if (z.id === '01-nocoes-de-legislacao' && idx === 1) {
        px = 24;
        py = 24;
      } else if (z.id === '01-nocoes-de-legislacao' && idx === 2) {
        px = 34;
        py = 24;
      } else {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        px = z.bounds.x + padX + (cols > 1 ? (col / (cols - 1)) * innerW : innerW / 2);
        py = z.bounds.y + padY + (rows > 1 ? (row / (rows - 1)) * innerH : innerH / 2);
      }
      const pos = claimFreeTile(px, py, z.bounds);
      // Every 4th NPC (plus idx 0 & idx 1 of each zone) is a featured "Mestre de Duelo"!
      const isDuelMaster = idx === 0 || idx % 4 === 0;
      npcs.push({ id: ficha.id, ficha, x: pos.x, y: pos.y, isDuelMaster });
    });
  }

  // 7. Place Zone Monsters + Zone Mini-Bosses + 6 Region Bosses
  const enemies: WorldEnemy[] = [];
  const behaviors: WorldEnemy['behavior'][] = ['patrol', 'orbit', 'stalker'];

  for (const z of ZONAS) {
    const themes = MONSTER_THEMES[z.regiaoId];
    const monsterCount = z.bounds.w * z.bounds.h > 900 ? 3 : 2;
    for (let i = 0; i < monsterCount; i++) {
      const th = themes[(i + hash2(z.bounds.x, z.bounds.y)) % themes.length];
      let mx = z.bounds.x + 5 + ((i + 1) * (z.bounds.w - 10)) / (monsterCount + 1);
      let my = z.bounds.y + z.bounds.h - 5 - (i % 2) * 3;
      if (z.id === '01-nocoes-de-legislacao' && i === 0) {
        // Visible just outside the southern hedge of the starting town square!
        mx = 35;
        my = 29;
      }
      const pos = claimFreeTile(mx, my, z.bounds);
      enemies.push({
        id: `mob-${z.id}-${i}`,
        nome: th.nome,
        subtitulo: `Desafio · ${z.nome}`,
        zonaId: z.id,
        regiaoId: z.regiaoId,
        sprite: th.sprite,
        behavior: behaviors[i % behaviors.length],
        homeX: pos.x,
        homeY: pos.y,
        x: pos.x,
        y: pos.y,
        vx: 0,
        vy: 0,
        isBoss: false,
        isMiniBoss: false,
        level: z.nivelSugerido,
        patrolPhase: i * 2.1,
      });
    }

    // Zone Mini-Boss
    const mbPos = claimFreeTile(z.bounds.x + z.bounds.w - 5, z.bounds.y + z.bounds.h - 4, z.bounds);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!isSolidTile(getTile(mbPos.x + dx, mbPos.y + dy))) {
          setTile(mbPos.x + dx, mbPos.y + dy, TileType.BossDais);
        }
      }
    }
    enemies.push({
      id: `miniboss-${z.id}`,
      nome: z.miniBossName,
      subtitulo: `Mini-Boss · ${z.nome}`,
      zonaId: z.id,
      regiaoId: z.regiaoId,
      sprite: z.miniBossSprite,
      behavior: 'orbit',
      homeX: mbPos.x,
      homeY: mbPos.y,
      x: mbPos.x,
      y: mbPos.y,
      vx: 0,
      vy: 0,
      isBoss: false,
      isMiniBoss: true,
      level: z.nivelSugerido + 1,
      patrolPhase: 0,
    });
  }

  // 6 Region Final Bosses
  for (const r of REGIONS) {
    const rbX = r.bounds.x + Math.floor(r.bounds.w * 0.5);
    const rbY = r.bounds.y + r.bounds.h - 4;
    const rbPos = claimFreeTile(rbX, rbY, r.bounds);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!isSolidTile(getTile(rbPos.x + dx, rbPos.y + dy))) {
          setTile(rbPos.x + dx, rbPos.y + dy, TileType.BossDais);
        }
      }
    }
    const primaryZona = ZONAS.find((z) => z.regiaoId === r.id) || ZONAS[0];
    enemies.push({
      id: `boss-${r.id}`,
      nome: r.bossName,
      subtitulo: `BOSS DA REGIÃO · ${r.nome}`,
      zonaId: primaryZona.id,
      regiaoId: r.id,
      sprite: r.bossSprite,
      behavior: 'patrol',
      homeX: rbPos.x,
      homeY: rbPos.y,
      x: rbPos.x,
      y: rbPos.y,
      vx: 0,
      vy: 0,
      isBoss: true,
      isMiniBoss: false,
      level: r.nivelSugerido + 2,
      patrolPhase: 0,
    });
  }

  // 8. Place Treasure Chests (2 per zone + 1 locked Key Vault per region)
  const chests: WorldChest[] = [];
  const lootPool: ItemId[] = ['pocao_dica', 'escudo_recurso', 'lupa_fonte', 'pocao_vida', 'elixir_foco'];
  ZONAS.forEach((z, zIdx) => {
    for (let i = 0; i < 2; i++) {
      let cx = z.bounds.x + 4 + i * (z.bounds.w - 9);
      let cy = z.bounds.y + 4 + ((zIdx + i) % 3) * 3;
      if (z.id === '01-nocoes-de-legislacao' && i === 0) {
        cx = 20;
        cy = 21;
      }
      const pos = claimFreeTile(cx, cy, z.bounds);
      const rewardItem = lootPool[(zIdx * 2 + i) % lootPool.length];
      chests.push({
        id: `chest-${z.id}-${i}`,
        x: pos.x,
        y: pos.y,
        zonaId: z.id,
        regiaoId: z.regiaoId,
        rewardItem,
        rewardQty: i === 0 ? 2 : 1,
        label: `Baú de ${z.nome}`,
      });
    }
  });

  for (const r of REGIONS) {
    const primaryZona = ZONAS.find((z) => z.regiaoId === r.id) || ZONAS[0];
    const pos = claimFreeTile(r.bounds.x + 7, r.bounds.y + 7, r.bounds);
    chests.push({
      id: `vault-${r.id}`,
      x: pos.x,
      y: pos.y,
      zonaId: primaryZona.id,
      regiaoId: r.id,
      requiresKey: r.id,
      rewardCosmeticId: r.cosmeticReward.id,
      label: `Baú Real · ${r.cosmeticReward.name}`,
    });
  }

  // 9. Place Adorable SNES RPG Town Dogs & Cats (Cachorrinhos!) across every world!
  const critterSpecs: Omit<WorldCritter, 'x' | 'y' | 'dir' | 'phase'>[] = [
    {
      id: 'dog-pipoca',
      name: 'Pipoca',
      kind: 'dog',
      variant: 'golden',
      regiaoId: 'reino-da-toga',
      homeX: 27,
      homeY: 22,
      barkLine: 'Pipoca: Au! Au! ♥ Bem-vindo à Praça do Tribunal! Fale com os NPCs ou desafie-os para um Duelo!',
    },
    {
      id: 'dog-bolinha',
      name: 'Bolinha',
      kind: 'dog',
      variant: 'spotted',
      regiaoId: 'reino-da-toga',
      homeX: 31,
      homeY: 25,
      barkLine: 'Bolinha: *abana o rabinho* Au! A fonte da praça dá sorte para gabaritar Legislação!',
    },
    {
      id: 'cat-sula',
      name: 'Súmula',
      kind: 'cat',
      variant: 'ginger',
      regiaoId: 'reino-da-toga',
      homeX: 29,
      homeY: 57,
      barkLine: 'Súmula (gatinha): Miau~ No Jardim dos Direitos Humanos há 15 tratados históricos para estudar!',
    },
    {
      id: 'dog-barao',
      name: 'Barão',
      kind: 'dog',
      variant: 'brown',
      regiaoId: 'cidadela-do-conselho',
      homeX: 78,
      homeY: 38,
      barkLine: 'Barão: Au! Aqui na Cidadela do Conselho, PMBOK, ITIL e COBIT governam o castelo!',
    },
    {
      id: 'dog-pixel',
      name: 'Pixel',
      kind: 'dog',
      variant: 'spotted',
      regiaoId: 'floresta-do-codigo',
      homeX: 28,
      homeY: 100,
      barkLine: 'Pixel: Au! Au! Cuidado com os Slimes de SQL Injection perto da ponte do Rio de Dados!',
    },
    {
      id: 'dog-firewall',
      name: 'Firewall',
      kind: 'dog',
      variant: 'brown',
      regiaoId: 'fortaleza-da-muralha',
      homeX: 96,
      homeY: 112,
      barkLine: 'Firewall (cão-guarda): Au! Eu protejo o Cofre da LGPD contra Fantasmas de Ransomware!',
    },
    {
      id: 'dog-kernel',
      name: 'Kernel',
      kind: 'dog',
      variant: 'husky',
      regiaoId: 'montanhas-da-infra',
      homeX: 133,
      homeY: 102,
      barkLine: 'Kernel (husky): Auuu! Nas Montanhas da Infra moram os servidores Linux, Redes e IA!',
    },
    {
      id: 'dog-byte',
      name: 'Byte',
      kind: 'dog',
      variant: 'golden',
      regiaoId: 'porto-babel',
      homeX: 127,
      homeY: 38,
      barkLine: 'Byte (cão marinheiro): Woof! Woof! ♥ Welcome to Porto Babel — pratique Inglês Técnico nas docas!',
    },
  ];

  const critters: WorldCritter[] = critterSpecs.map((spec, i) => {
    const reg = REGIONS.find((r) => r.id === spec.regiaoId) || REGIONS[0];
    const pos = claimFreeTile(spec.homeX, spec.homeY, reg.bounds);
    return {
      ...spec,
      homeX: pos.x,
      homeY: pos.y,
      x: pos.x,
      y: pos.y,
      dir: i % 2 === 0 ? 'right' : 'left',
      phase: i * 1.7,
    };
  });

  cachedWorld = { revision: rev, tiles, npcs, enemies, chests, signs, critters, landmarks, buildings, fountains };
  return cachedWorld;
}

export function getActiveNpcsForClass(world: WorldData, playerClass: PlayerClass): WorldNpc[] {
  return world.npcs.filter((n) => isCargoAllowed(n.ficha.cargo, playerClass));
}

export function getActiveEnemiesForClass(world: WorldData, playerClass: PlayerClass): WorldEnemy[] {
  const validZones = new Set(
    getAllFichas()
      .filter((f) => isCargoAllowed(f.cargo, playerClass))
      .map((f) => f.zonaId)
  );
  return world.enemies.filter((e) => e.isBoss || validZones.has(e.zonaId));
}

/**
 * Bounded A* pathfinding on the 160x160 tile grid, avoiding houses, fountains, fences, trees & walls.
 */
export function findPathAStar(
  tiles: Uint8Array,
  startX: number,
  startY: number,
  goalX: number,
  goalY: number,
  maxIterations = 1400
): { x: number; y: number }[] {
  const sx = Math.max(0, Math.min(WORLD_W - 1, Math.round(startX)));
  const sy = Math.max(0, Math.min(WORLD_H - 1, Math.round(startY)));
  let gx = Math.max(0, Math.min(WORLD_W - 1, Math.round(goalX)));
  let gy = Math.max(0, Math.min(WORLD_H - 1, Math.round(goalY)));

  const walkable = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < WORLD_W && y < WORLD_H && !isSolidTile(tiles[y * WORLD_W + x] as TileType);

  if (!walkable(gx, gy)) {
    let bestDist = Infinity;
    let found = false;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (walkable(gx + dx, gy + dy)) {
          const d = Math.hypot(gx + dx - sx, gy + dy - sy);
          if (d < bestDist) {
            bestDist = d;
            gx = gx + dx;
            gy = gy + dy;
            found = true;
          }
        }
      }
    }
    if (!found) return [];
  }

  if (sx === gx && sy === gy) return [];

  const idx = (x: number, y: number) => y * WORLD_W + x;
  const gScore = new Map<number, number>();
  const cameFrom = new Map<number, number>();
  const closed = new Set<number>();

  interface Node {
    x: number;
    y: number;
    k: number;
    f: number;
  }

  const startKey = idx(sx, sy);
  const goalKey = idx(gx, gy);
  gScore.set(startKey, 0);
  const open: Node[] = [{ x: sx, y: sy, k: startKey, f: Math.abs(gx - sx) + Math.abs(gy - sy) }];

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let closestNode: Node = open[0];
  let closestH = Math.abs(gx - sx) + Math.abs(gy - sy);
  let iter = 0;

  while (open.length > 0 && iter < maxIterations) {
    iter++;
    let bestIdx = 0;
    for (let i = 1; i < open.length; i++) {
      if (open[i].f < open[bestIdx].f) bestIdx = i;
    }
    const cur = open.splice(bestIdx, 1)[0];
    if (cur.k === goalKey) {
      closestNode = cur;
      break;
    }
    if (closed.has(cur.k)) continue;
    closed.add(cur.k);

    const hCur = Math.abs(gx - cur.x) + Math.abs(gy - cur.y);
    if (hCur < closestH) {
      closestH = hCur;
      closestNode = cur;
    }

    const curG = gScore.get(cur.k) ?? 0;
    for (const [dx, dy] of dirs) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      if (!walkable(nx, ny)) continue;
      const nk = idx(nx, ny);
      if (closed.has(nk)) continue;
      const tentativeG = curG + 1;
      if (tentativeG < (gScore.get(nk) ?? Infinity)) {
        cameFrom.set(nk, cur.k);
        gScore.set(nk, tentativeG);
        open.push({
          x: nx,
          y: ny,
          k: nk,
          f: tentativeG + Math.abs(gx - nx) + Math.abs(gy - ny),
        });
      }
    }
  }

  const path: { x: number; y: number }[] = [];
  let k: number | undefined = closestNode.k;
  while (k !== undefined && k !== startKey) {
    path.push({ x: k % WORLD_W, y: Math.floor(k / WORLD_W) });
    k = cameFrom.get(k);
  }
  path.reverse();
  return path;
}
