import type { Ficha, PlayerClass } from '../types';
import { MonsterSpriteType, TILE_PX, TileType, type WorldBuilding, type WorldCritter } from '../world/worldMap';
import { detectNpcGender } from './npcGender';
import {
  ensureSpriteAtlasLoaded,
  getSpriteAtlas,
  subscribeSpriteAtlas,
  type TerrainTileKey,
} from './spriteSheetProcessor';

/**
 * Hybrid High-Def SNES 16-bit Sprite & Tile Renderer:
 * Serves chroma-keyed Nano Banana sprite sheets (hero walk frames, NPC archetypes,
 * pets, monsters/bosses, town cottages/palace, fountain, seamless terrain tiles)
 * with instant procedural fallback during initial image decode.
 */

const spriteCache = new Map<string, HTMLCanvasElement>();
const dataUrlCache = new Map<string, string>();

subscribeSpriteAtlas(() => {
  spriteCache.clear();
  dataUrlCache.clear();
});

// Kick off Nano Banana sprite sheet loading immediately in browser environments
if (typeof window !== 'undefined') {
  void ensureSpriteAtlasLoaded();
}

const TILE_TO_ATLAS_TERRAIN: Partial<Record<TileType, TerrainTileKey>> = {
  [TileType.GrassToga]: 'grass_toga',
  [TileType.FlowerGrass]: 'flower_grass',
  [TileType.CobbleRoad]: 'cobble_road',
  [TileType.DirtPath]: 'dirt_path',
  [TileType.TribunalFloor]: 'tribunal_floor',
  [TileType.CastleFloor]: 'castle_floor',
  [TileType.BlueCarpet]: 'blue_carpet',
  [TileType.ForestGrass]: 'forest_grass',
  [TileType.DataRiver]: 'data_river',
  [TileType.WoodBridge]: 'wood_bridge',
  [TileType.FortressFloor]: 'fortress_floor',
  [TileType.MountainStone]: 'mountain_stone',
  [TileType.CableFloor]: 'cable_floor',
  [TileType.PortSand]: 'port_sand',
  [TileType.WoodPier]: 'wood_pier',
  [TileType.OceanWater]: 'ocean_water',
};

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export function getBuildingSprite(style: WorldBuilding['style']): HTMLCanvasElement | null {
  const atlas = getSpriteAtlas();
  if (!atlas?.ready) return null;
  return atlas.props[style] || null;
}

export function getFountainSprite(): HTMLCanvasElement | null {
  const atlas = getSpriteAtlas();
  if (!atlas?.ready) return null;
  return atlas.props.fountain || null;
}

export function getFairySprite(dir: 'left' | 'right' | 'front', frame: number): HTMLCanvasElement {
  const f = frame & 1;
  const atlas = getSpriteAtlas();
  const key = `fairy_${dir}_${f}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  if (atlas?.ready && atlas.fairy) {
    const src = dir === 'front' ? atlas.fairy.portrait : atlas.fairy[dir][f] || atlas.fairy.right[0];
    if (src) {
      spriteCache.set(key, src);
      return src;
    }
  }

  // Fallback cute glowing pixel fairy while sheet loads
  const [c, ctx] = makeCanvas(16, 16);
  px(ctx, 2, 4 + f, 5, 5, '#7dd3fc');
  px(ctx, 9, 4 + f, 5, 5, '#7dd3fc');
  px(ctx, 6, 4, 4, 4, '#fde047');
  px(ctx, 6, 8, 4, 5, '#f59e0b');
  px(ctx, 7, 5, 1, 1, '#0f172a');
  px(ctx, 9, 5, 1, 1, '#0f172a');
  spriteCache.set(key, c);
  return c;
}

export function getFairyPortraitDataUrl(mood: 'front' | 'happy' = 'happy'): string {
  const atlas = getSpriteAtlas();
  const key = `fairy_portrait_${mood}_a${atlas?.revision || 0}`;
  const cached = dataUrlCache.get(key);
  if (cached) return cached;

  if (atlas?.ready && atlas.fairy) {
    const src = mood === 'happy' ? atlas.fairy.celebrate : atlas.fairy.portrait;
    if (src) {
      const url = src.toDataURL();
      dataUrlCache.set(key, url);
      return url;
    }
  }

  const sp = getFairySprite('front', 0);
  const url = sp.toDataURL();
  dataUrlCache.set(key, url);
  return url;
}

export function getFairyBattleDataUrl(frame: number, excited = false): string {
  const f = frame & 1;
  const atlas = getSpriteAtlas();
  const key = `fairy_battle_${f}_${excited ? 'exc' : 'fly'}_a${atlas?.revision || 0}`;
  const cached = dataUrlCache.get(key);
  if (cached) return cached;

  if (atlas?.ready && atlas.fairy) {
    const src = excited
      ? atlas.fairy.celebrate || atlas.fairy.right[0]
      : atlas.fairy.right[f] || atlas.fairy.right[0];
    if (src) {
      const url = src.toDataURL();
      dataUrlCache.set(key, url);
      return url;
    }
  }

  const sp = getFairySprite('right', f);
  const url = sp.toDataURL();
  dataUrlCache.set(key, url);
  return url;
}

/**
 * Returns crisp Nano Banana 16-bit SNES terrain tiles (and cutout props over true biome ground!)
 * when the sprite atlas is loaded, falling back seamlessly to 16x16 procedural tiles.
 */
export function getTileSprite(tile: TileType, variant: number, baseGroundTile?: TileType): HTMLCanvasElement {
  const v = variant & 3;
  const atlas = getSpriteAtlas();
  const baseKeySuffix = baseGroundTile !== undefined ? `_b${baseGroundTile}` : '';
  const key = `tile_${tile}_${v}${baseKeySuffix}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  if (atlas?.ready) {
    const terrainKey = TILE_TO_ATLAS_TERRAIN[tile];
    if (terrainKey && atlas.terrain[terrainKey]) {
      spriteCache.set(key, atlas.terrain[terrainKey]);
      return atlas.terrain[terrainKey];
    }

    const resolveBaseTerrain = (fallback: TerrainTileKey): HTMLCanvasElement => {
      const requested = baseGroundTile !== undefined ? TILE_TO_ATLAS_TERRAIN[baseGroundTile] : undefined;
      return (requested && atlas.terrain[requested]) || atlas.terrain[fallback];
    };

    // Cutout SNES props composited cleanly onto the ACTUAL surrounding biome ground texture!
    const propMap: Partial<Record<TileType, { defaultBase: TerrainTileKey; prop: keyof typeof atlas.props }>> = {
      [TileType.TownTree]: { defaultBase: 'grass_toga', prop: 'town_tree' },
      [TileType.RuneTree]: { defaultBase: 'forest_grass', prop: 'rune_tree' },
      [TileType.FlowerBed]: { defaultBase: 'grass_toga', prop: 'flower_bed' },
      [TileType.ServerRack]: { defaultBase: 'cable_floor', prop: 'server_rack' },
      [TileType.CrystalShrine]: { defaultBase: 'mountain_stone', prop: 'crystal_shrine' },
      [TileType.TorchPost]: { defaultBase: 'cobble_road', prop: 'torch_post' },
    };
    const propEntry = propMap[tile];
    if (propEntry && atlas.props[propEntry.prop]) {
      const [c, ctx] = makeCanvas(48, 48);
      ctx.drawImage(resolveBaseTerrain(propEntry.defaultBase), 0, 0, 48, 48);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(atlas.props[propEntry.prop], 0, 0, 48, 48);
      spriteCache.set(key, c);
      return c;
    }

    // Lush SNES leafy hedge row composited over true surrounding biome floor (grass, castle stone, tribunal marble, etc.)
    if (tile === TileType.HedgeWall && atlas.props.town_tree) {
      const [c, ctx] = makeCanvas(48, 48);
      ctx.drawImage(resolveBaseTerrain('grass_toga'), 0, 0, 48, 48);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const tree = atlas.props.town_tree;
      ctx.fillStyle = 'rgba(10, 20, 12, 0.28)';
      ctx.beginPath();
      ctx.ellipse(24, 41, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.drawImage(tree, 0, 0, tree.width, Math.floor(tree.height * 0.68), 2, 6, 44, 36);
      spriteCache.set(key, c);
      return c;
    }

    // HD 48x48 WoodFence composited over true biome ground
    if (tile === TileType.WoodFence) {
      const [c, ctx] = makeCanvas(48, 48);
      ctx.drawImage(resolveBaseTerrain('grass_toga'), 0, 0, 48, 48);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(0, 41, 48, 5);
      // Horizontal rails
      ctx.fillStyle = '#5c381c';
      ctx.fillRect(0, 19, 48, 8);
      ctx.fillRect(0, 31, 48, 8);
      ctx.fillStyle = '#9c683d';
      ctx.fillRect(0, 20, 48, 5);
      ctx.fillRect(0, 32, 48, 5);
      // Fence posts
      for (const pxPos of [5, 33]) {
        ctx.fillStyle = '#4a2b14';
        ctx.fillRect(pxPos, 11, 10, 33);
        ctx.fillStyle = '#855331';
        ctx.fillRect(pxPos + 1, 13, 8, 29);
        ctx.fillStyle = '#bd8653';
        ctx.fillRect(pxPos + 1, 12, 8, 3);
      }
      spriteCache.set(key, c);
      return c;
    }

    // HD 48x48 Harbor Crate composited cleanly over sand, pier, or cobble
    if (tile === TileType.CrateDeck) {
      const [c, ctx] = makeCanvas(48, 48);
      ctx.drawImage(resolveBaseTerrain('port_sand'), 0, 0, 48, 48);
      ctx.fillStyle = 'rgba(0,0,0,0.32)';
      ctx.fillRect(7, 39, 36, 6);
      ctx.fillStyle = '#4f2f16';
      ctx.fillRect(6, 9, 36, 33);
      ctx.fillStyle = '#9c683d';
      ctx.fillRect(9, 12, 30, 27);
      ctx.fillStyle = '#ba8352';
      ctx.fillRect(9, 12, 30, 5);
      ctx.fillStyle = '#5c381c';
      ctx.fillRect(9, 24, 30, 3);
      ctx.fillRect(22, 12, 4, 27);
      // Diagonal wood brace
      ctx.strokeStyle = '#6b4222';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(11, 36);
      ctx.lineTo(37, 14);
      ctx.stroke();
      spriteCache.set(key, c);
      return c;
    }

    // HD 48x48 Alpine MountainPeak composited over mountain_stone / cable_floor
    if (tile === TileType.MountainPeak) {
      const [c, ctx] = makeCanvas(48, 48);
      ctx.drawImage(resolveBaseTerrain('mountain_stone'), 0, 0, 48, 48);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.beginPath();
      ctx.ellipse(24, 43, 21, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Shaded rocky peak
      ctx.fillStyle = '#3b4257';
      ctx.beginPath();
      ctx.moveTo(24, 3);
      ctx.lineTo(45, 42);
      ctx.lineTo(3, 42);
      ctx.closePath();
      ctx.fill();
      // Lit left ridge
      ctx.fillStyle = '#646e87';
      ctx.beginPath();
      ctx.moveTo(24, 3);
      ctx.lineTo(24, 42);
      ctx.lineTo(3, 42);
      ctx.closePath();
      ctx.fill();
      // Snow cap
      ctx.fillStyle = '#e2edf8';
      ctx.beginPath();
      ctx.moveTo(24, 3);
      ctx.lineTo(32, 18);
      ctx.lineTo(27, 15);
      ctx.lineTo(24, 20);
      ctx.lineTo(20, 15);
      ctx.lineTo(15, 19);
      ctx.closePath();
      ctx.fill();
      spriteCache.set(key, c);
      return c;
    }

    // Building footprint base ground under full multi-tile Nano Banana building overlay matches true biome ground!
    if (
      tile === TileType.RoofRed ||
      tile === TileType.RoofBlue ||
      tile === TileType.RoofEmerald ||
      tile === TileType.RoofGold ||
      tile === TileType.RoofSlate ||
      tile === TileType.HouseWall ||
      tile === TileType.HouseDoor ||
      tile === TileType.StonePillar
    ) {
      const ground = resolveBaseTerrain('cobble_road');
      spriteCache.set(key, ground);
      return ground;
    }
    if (tile === TileType.FountainWater) {
      const ground = resolveBaseTerrain('tribunal_floor');
      spriteCache.set(key, ground);
      return ground;
    }
  }

  const [c, ctx] = makeCanvas(TILE_PX, TILE_PX);

  switch (tile) {
    case TileType.GrassToga:
      px(ctx, 0, 0, 16, 16, '#658a4b');
      px(ctx, (v * 3 + 2) % 13, (v * 5 + 3) % 13, 2, 1, '#7ea65e');
      px(ctx, (v * 7 + 5) % 13, (v * 3 + 9) % 13, 2, 1, '#54753d');
      if (v === 1) px(ctx, 4, 11, 1, 2, '#92bc6f');
      break;

    case TileType.FlowerGrass:
      px(ctx, 0, 0, 16, 16, '#658a4b');
      px(ctx, 3, 5, 2, 2, '#f6d55c');
      px(ctx, 4, 6, 1, 1, '#fff6cc');
      px(ctx, 10, 10, 2, 2, v % 2 === 0 ? '#f08a5d' : '#ff6b6b');
      px(ctx, 11, 11, 1, 1, '#ffe8d6');
      px(ctx, 3, 12, 1, 2, '#4d6b38');
      break;

    case TileType.DirtPath:
      px(ctx, 0, 0, 16, 16, '#b89464');
      px(ctx, 1, 2, 5, 4, '#c7a473');
      px(ctx, 9, 8, 5, 5, '#c4a06e');
      px(ctx, (v * 3 + 2) % 13, (v * 4 + 11) % 13, 2, 1, '#9c7a4e');
      px(ctx, (v * 5 + 7) % 13, (v * 2 + 3) % 13, 1, 1, '#d9ba89');
      break;

    case TileType.CobbleRoad:
      px(ctx, 0, 0, 16, 16, '#968a76');
      px(ctx, 1, 1, 6, 5, '#b0a38d');
      px(ctx, 8, 1, 7, 5, '#a69983');
      px(ctx, 1, 8, 8, 6, '#a69983');
      px(ctx, 10, 8, 5, 6, '#b3a690');
      px(ctx, 0, 7, 16, 1, '#736857');
      px(ctx, 7, 0, 1, 7, '#736857');
      px(ctx, 9, 8, 1, 8, '#736857');
      break;

    case TileType.TribunalFloor:
      px(ctx, 0, 0, 16, 16, '#cfc4ad');
      px(ctx, 1, 1, 14, 14, '#e0d6c2');
      px(ctx, 0, 0, 16, 1, '#aba088');
      px(ctx, 0, 0, 1, 16, '#aba088');
      if (v === 0) px(ctx, 7, 7, 2, 2, '#cfa952');
      break;

    case TileType.StoneWall:
      px(ctx, 0, 0, 16, 16, '#393f4d');
      px(ctx, 0, 0, 16, 6, '#565e70');
      px(ctx, 1, 1, 6, 4, '#6b7488');
      px(ctx, 9, 1, 6, 4, '#636c80');
      px(ctx, 1, 8, 14, 6, '#484f60');
      px(ctx, 0, 6, 16, 2, '#282d38');
      break;

    case TileType.CastleFloor:
      px(ctx, 0, 0, 16, 16, '#6e7a91');
      px(ctx, 1, 1, 6, 6, '#7e8ba3');
      px(ctx, 9, 9, 6, 6, '#7e8ba3');
      px(ctx, 0, 8, 16, 1, '#586276');
      px(ctx, 8, 0, 1, 16, '#586276');
      break;

    case TileType.BlueCarpet:
      px(ctx, 0, 0, 16, 16, '#274d8a');
      px(ctx, 1, 0, 1, 16, '#e2b857');
      px(ctx, 14, 0, 1, 16, '#e2b857');
      px(ctx, 4, 4, 8, 8, '#3260ab');
      px(ctx, 6, 6, 4, 4, '#274d8a');
      break;

    case TileType.ForestGrass:
      px(ctx, 0, 0, 16, 16, '#2f593b');
      px(ctx, (v * 4 + 1) % 14, (v * 3 + 2) % 14, 2, 2, '#3d704a');
      px(ctx, (v * 5 + 8) % 14, (v * 7 + 6) % 14, 1, 2, '#24472e');
      break;

    case TileType.TownTree:
      px(ctx, 0, 0, 16, 16, '#658a4b');
      px(ctx, 4, 13, 8, 2, 'rgba(0,0,0,0.28)');
      px(ctx, 6, 10, 4, 5, '#6b4226');
      px(ctx, 7, 10, 2, 4, '#855331');
      px(ctx, 2, 3, 12, 8, '#265c33');
      px(ctx, 3, 1, 10, 8, '#388047');
      px(ctx, 4, 2, 8, 5, '#52a35c');
      px(ctx, 5, 3, 3, 2, '#7bc474');
      if (v === 2) {
        px(ctx, 10, 5, 2, 2, '#f9a8d4'); // subtle spring blossom!
        px(ctx, 5, 7, 2, 1, '#fde047');
      }
      break;

    case TileType.RuneTree:
      px(ctx, 0, 0, 16, 16, '#2f593b');
      px(ctx, 6, 10, 4, 6, '#5c3b28');
      px(ctx, 7, 11, 2, 4, '#744b33');
      px(ctx, 2, 2, 12, 9, '#1b472d');
      px(ctx, 3, 1, 10, 8, '#286640');
      px(ctx, 4, 2, 8, 5, '#358554');
      px(ctx, 7, 4, 2, 1, '#5ef2b6');
      px(ctx, 7, 6, 2, 1, '#5ef2b6');
      px(ctx, 6, 5, 1, 1, '#5ef2b6');
      px(ctx, 9, 5, 1, 1, '#5ef2b6');
      break;

    case TileType.HedgeWall:
      px(ctx, 0, 0, 16, 16, '#658a4b');
      px(ctx, 1, 3, 14, 11, '#224d2c');
      px(ctx, 2, 2, 12, 9, '#316e3d');
      px(ctx, 3, 3, 10, 5, '#469151');
      px(ctx, 4, 5, 2, 1, '#f472b6');
      px(ctx, 10, 6, 2, 1, '#fde047');
      break;

    case TileType.WoodFence:
      px(ctx, 0, 0, 16, 16, '#658a4b');
      px(ctx, 2, 5, 3, 10, '#6e4526');
      px(ctx, 11, 5, 3, 10, '#6e4526');
      px(ctx, 0, 7, 16, 2, '#9c683d');
      px(ctx, 0, 11, 16, 2, '#8c5b34');
      px(ctx, 2, 5, 3, 1, '#b87f4d');
      px(ctx, 11, 5, 3, 1, '#b87f4d');
      break;

    case TileType.FountainWater:
      // Stone rim + sparkling turquoise SNES fountain basin
      px(ctx, 0, 0, 16, 16, '#b5ac9a');
      px(ctx, 1, 1, 14, 14, '#d9d1c1');
      px(ctx, 2, 2, 12, 12, '#2890c4');
      px(ctx, 3, 3, 10, 10, '#44b5eb');
      px(ctx, 4 + (v % 3), 5, 4, 1, '#c4f1ff');
      px(ctx, 6, 8 + (v % 2), 4, 1, '#ffffff');
      px(ctx, 7, 4, 2, 2, '#e0f7ff');
      break;

    case TileType.FlowerBed:
      px(ctx, 0, 0, 16, 16, '#cfc4ad');
      px(ctx, 1, 3, 14, 11, '#7a5230');
      px(ctx, 2, 4, 12, 9, '#4c6e37');
      px(ctx, 3, 5, 3, 3, '#f43f5e');
      px(ctx, 4, 6, 1, 1, '#fef08a');
      px(ctx, 9, 5, 3, 3, '#f59e0b');
      px(ctx, 10, 6, 1, 1, '#fffbeb');
      px(ctx, 6, 9, 3, 3, '#a855f7');
      px(ctx, 7, 10, 1, 1, '#f3e8ff');
      break;

    case TileType.RoofRed:
    case TileType.RoofBlue:
    case TileType.RoofEmerald:
    case TileType.RoofGold:
    case TileType.RoofSlate: {
      const palettes: Record<number, [string, string, string]> = {
        [TileType.RoofRed]: ['#8f2d2b', '#b53f3c', '#6b1e1d'],
        [TileType.RoofBlue]: ['#254b7d', '#3466a8', '#193357'],
        [TileType.RoofEmerald]: ['#1f6348', '#2d8562', '#144230'],
        [TileType.RoofGold]: ['#a17424', '#cc9833', '#735016'],
        [TileType.RoofSlate]: ['#383d52', '#4c536e', '#242836'],
      };
      const [base, hi, shadow] = palettes[tile];
      px(ctx, 0, 0, 16, 16, base);
      for (let py = 0; py < 16; py += 4) {
        px(ctx, 0, py, 16, 1, hi);
        px(ctx, 0, py + 3, 16, 1, shadow);
        const shift = (py / 4) % 2 === 0 ? 0 : 4;
        px(ctx, (shift + 3) % 16, py, 1, 4, shadow);
        px(ctx, (shift + 11) % 16, py, 1, 4, shadow);
      }
      break;
    }

    case TileType.HouseWall:
      px(ctx, 0, 0, 16, 16, '#d9ccb2');
      px(ctx, 0, 0, 16, 2, '#6b4c30'); // timber eave
      px(ctx, 0, 14, 16, 2, '#8a7e68'); // stone foundation
      px(ctx, 0, 0, 1, 16, '#7a593a'); // beam
      px(ctx, 15, 0, 1, 16, '#7a593a');
      // Warm leaded SNES cottage window
      px(ctx, 4, 4, 8, 7, '#5c3c24');
      px(ctx, 5, 5, 6, 5, '#f7cf68'); // cozy interior light!
      px(ctx, 7, 5, 2, 5, '#5c3c24');
      px(ctx, 5, 7, 6, 1, '#5c3c24');
      break;

    case TileType.HouseDoor:
      px(ctx, 0, 0, 16, 16, '#d9ccb2');
      px(ctx, 0, 0, 16, 2, '#6b4c30');
      px(ctx, 3, 3, 10, 13, '#4f311b');
      px(ctx, 4, 4, 8, 12, '#7d4e2a');
      px(ctx, 5, 5, 6, 10, '#6b4222');
      px(ctx, 10, 9, 1, 2, '#f5d76e'); // brass doorknob
      break;

    case TileType.StonePillar:
      px(ctx, 0, 0, 16, 16, '#cfc4ad');
      px(ctx, 2, 1, 12, 3, '#ece5d5');
      px(ctx, 4, 4, 8, 9, '#ded5c1');
      px(ctx, 6, 4, 1, 9, '#b5aa94');
      px(ctx, 9, 4, 1, 9, '#b5aa94');
      px(ctx, 2, 13, 12, 3, '#b8ae99');
      break;

    case TileType.ServerRack:
      px(ctx, 0, 0, 16, 16, '#484f63');
      px(ctx, 2, 1, 12, 14, '#1b2030');
      px(ctx, 3, 2, 10, 12, '#262d42');
      px(ctx, 4, 4, 8, 1, '#121622');
      px(ctx, 4, 7, 8, 1, '#121622');
      px(ctx, 4, 10, 8, 1, '#121622');
      // Blinking server LEDs
      px(ctx, 4, 3, 2, 1, v % 2 === 0 ? '#4ade80' : '#38bdf8');
      px(ctx, 7, 3, 1, 1, '#38bdf8');
      px(ctx, 4, 6, 2, 1, '#38bdf8');
      px(ctx, 10, 6, 1, 1, v === 1 ? '#f59e0b' : '#4ade80');
      px(ctx, 4, 9, 2, 1, '#a78bfa');
      break;

    case TileType.CrystalShrine:
      px(ctx, 0, 0, 16, 16, '#454b5e');
      px(ctx, 3, 11, 10, 4, '#6e768f');
      px(ctx, 5, 3, 6, 9, '#22d3ee');
      px(ctx, 6, 1, 4, 3, '#a5f3fc');
      px(ctx, 6, 4, 2, 6, '#ecfeff');
      px(ctx, 9, 5, 2, 5, '#0891b2');
      break;

    case TileType.CrateDeck:
      px(ctx, 0, 0, 16, 16, '#c7b07b');
      px(ctx, 2, 3, 12, 11, '#6b4222');
      px(ctx, 3, 4, 10, 9, '#9c683d');
      px(ctx, 3, 8, 10, 1, '#5e381c');
      px(ctx, 7, 4, 2, 9, '#5e381c');
      px(ctx, 4, 5, 2, 2, '#c28b59');
      break;

    case TileType.TorchPost:
      px(ctx, 0, 0, 16, 16, '#968a76');
      px(ctx, 6, 13, 4, 2, 'rgba(0,0,0,0.3)');
      px(ctx, 7, 6, 2, 8, '#3b322c');
      px(ctx, 5, 5, 6, 2, '#5c4d35');
      px(ctx, 6, 2, 4, 3, '#f59e0b');
      px(ctx, 7, 1, 2, 3, '#fef08a');
      break;

    case TileType.DataRiver:
      px(ctx, 0, 0, 16, 16, '#1f6e9c');
      px(ctx, (v * 4) % 12, 3, 4, 1, '#56c2f5');
      px(ctx, (v * 4 + 6) % 12, 10, 5, 1, '#8be0ff');
      px(ctx, (v * 3 + 2) % 13, 14, 3, 1, '#19587d');
      break;

    case TileType.WoodBridge:
      px(ctx, 0, 0, 16, 16, '#7a5230');
      for (let py = 0; py < 16; py += 4) {
        px(ctx, 1, py, 14, 3, '#9c6b3f');
        px(ctx, 0, py + 3, 16, 1, '#52341c');
      }
      px(ctx, 0, 0, 1, 16, '#4a2e18');
      px(ctx, 15, 0, 1, 16, '#4a2e18');
      break;

    case TileType.FortressFloor:
      px(ctx, 0, 0, 16, 16, '#3d3748');
      px(ctx, 1, 1, 14, 14, '#474054');
      px(ctx, 0, 15, 16, 1, '#2b2633');
      px(ctx, 15, 0, 1, 16, '#2b2633');
      break;

    case TileType.FortressWall:
      px(ctx, 0, 0, 16, 16, '#231f2b');
      px(ctx, 1, 1, 6, 6, '#332d40');
      px(ctx, 9, 1, 6, 6, '#2d2838');
      px(ctx, 0, 8, 16, 2, '#16131c');
      px(ctx, 2, 11, 12, 4, '#3a3347');
      px(ctx, 7, 3, 2, 2, '#d9534f');
      break;

    case TileType.PadlockGate:
      px(ctx, 0, 0, 16, 16, '#574e66');
      px(ctx, 1, 0, 2, 16, '#231f2b');
      px(ctx, 13, 0, 2, 16, '#231f2b');
      px(ctx, 6, 6, 4, 4, '#e6b84c');
      px(ctx, 7, 4, 2, 2, '#e6b84c');
      px(ctx, 7, 7, 2, 2, '#231f2b');
      break;

    case TileType.MountainStone:
      px(ctx, 0, 0, 16, 16, '#5f6578');
      px(ctx, (v * 3 + 2) % 12, (v * 5 + 2) % 12, 3, 2, '#757c91');
      px(ctx, (v * 5 + 7) % 12, (v * 3 + 8) % 12, 2, 2, '#4d5263');
      break;

    case TileType.MountainPeak:
      px(ctx, 0, 0, 16, 16, '#4d5263');
      px(ctx, 2, 6, 12, 10, '#3a3f4f');
      px(ctx, 4, 3, 8, 7, '#646b80');
      px(ctx, 6, 1, 4, 4, '#dbe6f5');
      px(ctx, 5, 4, 6, 2, '#b8c8de');
      break;

    case TileType.CableFloor:
      px(ctx, 0, 0, 16, 16, '#5f6578');
      px(ctx, 0, 7, 16, 2, '#34394a');
      px(ctx, 0, 7, 16, 1, '#9b6ee6');
      px(ctx, 7, 0, 2, 16, '#34394a');
      px(ctx, 7, 0, 1, 16, '#53d3d1');
      break;

    case TileType.PortSand:
      px(ctx, 0, 0, 16, 16, '#c7b07b');
      px(ctx, (v * 4 + 2) % 13, (v * 5 + 3) % 13, 2, 1, '#d9c48f');
      px(ctx, (v * 3 + 9) % 13, (v * 4 + 9) % 13, 2, 1, '#b39b66');
      break;

    case TileType.WoodPier:
      px(ctx, 0, 0, 16, 16, '#875c36');
      for (let x = 0; x < 16; x += 4) {
        px(ctx, x, 0, 3, 16, '#a37145');
        px(ctx, x + 3, 0, 1, 16, '#5e3d21');
      }
      break;

    case TileType.OceanWater:
      px(ctx, 0, 0, 16, 16, '#1a5882');
      px(ctx, (v * 3 + 1) % 11, 4, 5, 1, '#3b8bbd');
      px(ctx, (v * 4 + 5) % 11, 11, 4, 1, '#5fb2e0');
      break;

    case TileType.ShipDeck:
      px(ctx, 0, 0, 16, 16, '#6e4326');
      px(ctx, 1, 1, 14, 14, '#8c5834');
      px(ctx, 0, 0, 16, 2, '#4a2a15');
      px(ctx, 6, 4, 4, 8, '#f0e6d2');
      break;

    case TileType.BossDais:
      px(ctx, 0, 0, 16, 16, '#4a3d52');
      px(ctx, 1, 1, 14, 14, '#604e6b');
      px(ctx, 2, 2, 12, 12, '#3d3145');
      px(ctx, 6, 6, 4, 4, '#e6b84c');
      break;

    default:
      px(ctx, 0, 0, 16, 16, '#556b49');
  }

  spriteCache.set(key, c);
  return c;
}

/**
 * Cute 16x16 animated SNES RPG Dogs & Cats (Cachorrinhos!) with wagging tail & trot bounce!
 */
export function getCritterSprite(
  kind: WorldCritter['kind'],
  variant: WorldCritter['variant'],
  dir: 'left' | 'right',
  frame: number
): HTMLCanvasElement {
  const f = frame & 1;
  const atlas = getSpriteAtlas();
  const key = `critter_${kind}_${variant}_${dir}_${f}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  if (atlas?.ready) {
    const petKey = kind === 'cat' ? 'ginger' : variant;
    const base = atlas.pets[petKey]?.[dir] || atlas.pets.golden[dir];
    if (base) {
      const [c, ctx] = makeCanvas(56, 56);
      // Soft ground shadow + cute lively trot hop on frame 1
      ctx.fillStyle = 'rgba(0,0,0,0.32)';
      ctx.beginPath();
      ctx.ellipse(28, 51, 16, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(base, 0, f === 1 ? -3 : 0, 56, 56);
      spriteCache.set(key, c);
      return c;
    }
  }

  const [c, ctx] = makeCanvas(16, 16);
  const flip = dir === 'left';
  const fx = (x: number, w: number) => (flip ? 16 - x - w : x);

  const palettes: Record<WorldCritter['variant'], { body: string; ear: string; belly: string; collar: string }> = {
    golden: { body: '#e6b35a', ear: '#bd8531', belly: '#f7dfaa', collar: '#ef4444' },
    spotted: { body: '#f1ece1', ear: '#332d29', belly: '#ffffff', collar: '#38bdf8' },
    brown: { body: '#8c5834', ear: '#5c361c', belly: '#c48f62', collar: '#f5d76e' },
    husky: { body: '#94a3b8', ear: '#334155', belly: '#f8fafc', collar: '#38bdf8' },
    ginger: { body: '#ea8c38', ear: '#c26217', belly: '#fde6bd', collar: '#a855f7' },
  };
  const pal = palettes[variant] || palettes.golden;
  const bob = f === 1 ? -1 : 0;

  // Ground shadow
  px(ctx, 3, 13, 10, 2, 'rgba(0,0,0,0.32)');

  // Wagging tail!
  px(ctx, fx(2, 2), (f === 0 ? 7 : 6) + bob, 2, 2, pal.ear);
  px(ctx, fx(1, 2), (f === 0 ? 6 : 5) + bob, 1, 2, pal.body);

  // Body
  px(ctx, fx(4, 7), 8 + bob, 7, 4, pal.body);
  px(ctx, fx(5, 4), 10 + bob, 4, 2, pal.belly);
  if (variant === 'spotted') {
    px(ctx, fx(6, 2), 9 + bob, 2, 2, pal.ear);
  }

  // Collar
  px(ctx, fx(9, 2), 8 + bob, 2, 2, pal.collar);

  // Legs (trotting!)
  px(ctx, fx(4, 2), 12 + (f === 0 ? 0 : -1), 2, 2, pal.ear);
  px(ctx, fx(9, 2), 12 + (f === 1 ? 0 : -1), 2, 2, pal.ear);

  // Head & Ears
  px(ctx, fx(9, 5), 5 + bob, 5, 4, pal.body);
  if (kind === 'dog') {
    px(ctx, fx(9, 2), 5 + bob, 2, 3, pal.ear); // floppy cute dog ear!
    px(ctx, fx(13, 2), 7 + bob, 2, 2, pal.belly); // snout
    px(ctx, fx(14, 1), 7 + bob, 1, 1, '#1e1b18'); // cute black nose
  } else {
    px(ctx, fx(9, 1), 4 + bob, 1, 2, pal.ear); // pointy cat ears
    px(ctx, fx(12, 1), 4 + bob, 1, 2, pal.ear);
  }
  // Bright eye
  px(ctx, fx(12, 1), 6 + bob, 1, 1, '#141721');

  spriteCache.set(key, c);
  return c;
}

/**
 * Hero 16x16 sprite with 4 directions x 4 walk frames + optional cosmetic cape color!
 */
export function getHeroSprite(
  dir: 'down' | 'up' | 'left' | 'right',
  frame: number,
  playerClass: PlayerClass,
  capeColor: string | null
): HTMLCanvasElement {
  const f = frame & 3;
  const atlas = getSpriteAtlas();
  const key = `hero_${dir}_${f}_${playerClass}_${capeColor || 'default'}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  if (atlas?.ready && atlas.heroWalk[dir]?.length > 0) {
    const frames = atlas.heroWalk[dir];
    const base = frames[f % frames.length];
    const [c, ctx] = makeCanvas(64, 64);
    ctx.fillStyle = 'rgba(0,0,0,0.36)';
    ctx.beginPath();
    ctx.ellipse(32, 59, 15, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    if (capeColor) {
      // Subtle aura ring for unlocked region cosmetic!
      ctx.strokeStyle = capeColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.ellipse(32, 58, 18, 6, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(base, 0, 0, 64, 64);
    spriteCache.set(key, c);
    return c;
  }

  const [c, ctx] = makeCanvas(16, 16);

  const tunic =
    playerClass === 'tecnico'
      ? '#2b7cc9'
      : playerClass === 'analista'
        ? '#7a49c9'
        : '#c98e2b';
  const trim = '#f5d76e';
  const cape = capeColor || (playerClass === 'tecnico' ? '#1c4d82' : playerClass === 'analista' ? '#4a2685' : '#8c2d3b');
  const skin = '#f4cba3';
  const hair = '#3b2417';
  const boot = '#291c16';

  px(ctx, 4, 14, 8, 2, 'rgba(0,0,0,0.35)');

  const bob = f === 1 || f === 3 ? -1 : 0;
  const legLeftOffset = f === 1 ? -1 : f === 3 ? 1 : 0;
  const legRightOffset = f === 1 ? 1 : f === 3 ? -1 : 0;

  if (dir === 'up') {
    px(ctx, 4, 7 + bob, 8, 6, cape);
    px(ctx, 5, 7 + bob, 6, 1, trim);
  } else {
    px(ctx, 3, 7 + bob, 10, 5, cape);
  }

  px(ctx, 5, 7 + bob, 6, 5, tunic);
  px(ctx, 5, 10 + bob, 6, 1, trim);

  px(ctx, 5, 12 + Math.min(0, legLeftOffset), 2, 3, boot);
  px(ctx, 9, 12 + Math.min(0, legRightOffset), 2, 3, boot);

  if (dir === 'left') {
    px(ctx, 4, 8 + bob, 2, 3, skin);
  } else if (dir === 'right') {
    px(ctx, 10, 8 + bob, 2, 3, skin);
  } else {
    px(ctx, 4, 8 + bob + (f === 1 ? 1 : 0), 1, 3, skin);
    px(ctx, 11, 8 + bob + (f === 3 ? 1 : 0), 1, 3, skin);
  }

  px(ctx, 5, 2 + bob, 6, 5, skin);
  px(ctx, 4, 1 + bob, 8, 2, hair);
  px(ctx, 4, 2 + bob, 1, 3, hair);
  px(ctx, 11, 2 + bob, 1, 3, hair);
  px(ctx, 5, 1 + bob, 6, 1, trim);

  if (dir === 'down') {
    px(ctx, 6, 4 + bob, 1, 2, '#141721');
    px(ctx, 9, 4 + bob, 1, 2, '#141721');
  } else if (dir === 'left') {
    px(ctx, 5, 4 + bob, 1, 2, '#141721');
  } else if (dir === 'right') {
    px(ctx, 10, 4 + bob, 1, 2, '#141721');
  }

  spriteCache.set(key, c);
  return c;
}

/**
 * Generates a crisp Battle-Stage Hero sprite dataURL (with drawn sword / staff!)
 */
export function getHeroBattleDataUrl(
  playerClass: PlayerClass,
  capeColor: string | null,
  pose: 'idle' | 'attack' | 'hurt' = 'idle'
): string {
  const atlas = getSpriteAtlas();
  const key = `hero_battle_${playerClass}_${capeColor || 'default'}_${pose}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached.toDataURL();

  if (atlas?.ready && atlas.heroBattle) {
    const [c, ctx] = makeCanvas(112, 112);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(atlas.heroBattle, pose === 'attack' ? 10 : pose === 'hurt' ? -6 : 0, 0, 112, 112);
    if (pose === 'attack') {
      // Golden sword energy arc!
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(88, 46, 20, -Math.PI * 0.55, Math.PI * 0.35);
      ctx.stroke();
    } else if (pose === 'hurt') {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.32)';
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillRect(0, 0, 112, 112);
      ctx.globalCompositeOperation = 'source-over';
    }
    spriteCache.set(key, c);
    return c.toDataURL();
  }

  const [c, ctx] = makeCanvas(96, 96);
  ctx.imageSmoothingEnabled = false;
  const base = getHeroSprite('right', pose === 'attack' ? 1 : 0, playerClass, capeColor);
  ctx.drawImage(base, pose === 'attack' ? 16 : 8, 12, 72, 72);

  // Draw glowing weapon for the battle stance!
  if (pose === 'attack') {
    px(ctx, 74, 24, 14, 6, '#fde047');
    px(ctx, 78, 18, 10, 20, '#fef9c3');
    px(ctx, 68, 46, 16, 6, '#e2e8f0');
  } else if (pose === 'idle') {
    px(ctx, 70, 34, 6, 26, '#e2e8f0');
    px(ctx, 66, 54, 14, 4, '#e6b84c');
  } else {
    // Hurt stars
    px(ctx, 26, 8, 8, 8, '#ef4444');
    px(ctx, 54, 10, 6, 6, '#fca5a5');
  }

  spriteCache.set(key, c);
  return c.toDataURL();
}

/**
 * NPC pixel-art sprite tailored strictly by gender (female vs male human sheets), role, and deterministic seed.
 */
export function getNpcSprite(
  role: Ficha['npcRole'],
  seed: number,
  idleFrame: number,
  npcName?: string
): HTMLCanvasElement {
  const f = idleFrame & 1;
  const gender = detectNpcGender(npcName);
  const atlas = getSpriteAtlas();
  const key = `npc_${gender}_${role}_${seed % 12}_${f}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  if (atlas?.ready) {
    const roleSet = gender === 'female' ? atlas.npcsFemale : atlas.npcsMale;
    let rawSprite = roleSet?.[role] || atlas.npcs[role];
    if (gender === 'female' && role === 'bibliotecaria' && seed % 2 === 1 && atlas.femaleScholarAlt) {
      rawSprite = atlas.femaleScholarAlt;
    }
    if (rawSprite) {
      const [c, ctx] = makeCanvas(68, 68);
      ctx.fillStyle = 'rgba(0,0,0,0.34)';
      ctx.beginPath();
      ctx.ellipse(34, 63, 16, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(rawSprite, 0, f === 1 ? -1.5 : 0, 68, 68);
      spriteCache.set(key, c);
      return c;
    }
  }

  const [c, ctx] = makeCanvas(16, 16);
  const skins = ['#f4cba3', '#e0a97b', '#a86f49', '#f7d8bc'];
  const hairs = ['#2d1e17', '#6b4226', '#d4a94a', '#cfd4dc', '#4a235a'];
  const robes: Record<Ficha['npcRole'], string> = {
    juiz: '#1f2433',
    bibliotecaria: '#8f3d5c',
    mago: '#3d52a8',
    ferreiro: '#8c4e2a',
    guarda: '#4b5563',
    engenheiro: '#2b7a6c',
    capitao: '#225d8a',
    sabio: '#6c4996',
  };

  const skin = skins[seed % skins.length];
  const hair = hairs[(seed >>> 2) % hairs.length];
  const robe = robes[role] || '#3d52a8';
  const bob = f === 1 ? -1 : 0;

  px(ctx, 4, 14, 8, 2, 'rgba(0,0,0,0.32)');
  px(ctx, 4, 7 + bob, 8, 6, robe);
  px(ctx, 5, 13, 2, 2, '#221c18');
  px(ctx, 9, 13, 2, 2, '#221c18');

  if (role === 'juiz') {
    px(ctx, 7, 7 + bob, 2, 4, '#f4efe4');
  } else if (role === 'mago' || role === 'sabio') {
    px(ctx, 12, 4 + bob, 1, 10, '#8f6234');
    px(ctx, 12, 3 + bob, 2, 2, '#5ef2b6');
  } else if (role === 'guarda') {
    px(ctx, 12, 6 + bob, 2, 6, '#9ca3af');
  } else if (role === 'bibliotecaria') {
    px(ctx, 11, 8 + bob, 3, 4, '#d9a441');
  } else if (role === 'capitao') {
    px(ctx, 3, 1 + bob, 10, 2, '#1b263b');
    px(ctx, 7, 0 + bob, 2, 1, '#e6b84c');
  }

  px(ctx, 5, 2 + bob, 6, 5, skin);
  if (role !== 'capitao') {
    px(ctx, 4, 1 + bob, 8, 2, hair);
    px(ctx, 4, 2 + bob, 1, 2, hair);
    px(ctx, 11, 2 + bob, 1, 2, hair);
  }
  px(ctx, 6, 4 + bob, 1, 2, '#141721');
  px(ctx, 9, 4 + bob, 1, 2, '#141721');

  spriteCache.set(key, c);
  return c;
}

export function getNpcPortraitDataUrl(
  role: Ficha['npcRole'],
  seed: number,
  damageStage: 0 | 1 | 2 | 3 = 0,
  npcName?: string
): string {
  const gender = detectNpcGender(npcName);
  const atlas = getSpriteAtlas();
  const key = `portrait_npc_${gender}_${role}_${seed % 12}_dmg${damageStage}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached.toDataURL();

  const [c, ctx] = makeCanvas(112, 112);
  ctx.imageSmoothingEnabled = Boolean(atlas?.ready);
  const base = getNpcSprite(role, seed, damageStage >= 2 ? 1 : 0, npcName);
  ctx.drawImage(base, 8, 12 + (damageStage >= 2 ? 5 : 0), 96, 96);

  if (damageStage >= 2) {
    ctx.fillStyle = damageStage === 3 ? 'rgba(220, 38, 38, 0.28)' : 'rgba(245, 158, 11, 0.16)';
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillRect(0, 0, 112, 112);
    ctx.globalCompositeOperation = 'source-over';
  }
  if (damageStage >= 1) {
    // Sweat drop / intense duel focus!
    px(ctx, 84, 20, 7, 12, '#38bdf8');
    px(ctx, 86, 17, 3, 3, '#e0f2fe');
  }
  if (damageStage >= 2) {
    // Sparks & duel pressure lines
    px(ctx, 14, 20, 12, 4, '#fde047');
    px(ctx, 18, 16, 4, 12, '#fde047');
    ctx.fillStyle = 'rgba(203, 213, 225, 0.72)';
    ctx.beginPath();
    ctx.arc(24, 38, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  if (damageStage >= 3) {
    // Orbiting dizzy golden stars!
    px(ctx, 26, 6, 9, 9, '#fde047');
    px(ctx, 52, 2, 9, 9, '#f59e0b');
    px(ctx, 78, 8, 9, 9, '#fde047');
  }

  spriteCache.set(key, c);
  return c.toDataURL();
}

/**
 * Monster & Boss pixel-art sprites with 4 PROGRESSIVE DAMAGE STAGES (0=intact, 1=scuffed, 2=cracked/smoking, 3=critical/dizzy!)
 */
export function getMonsterSprite(
  type: MonsterSpriteType,
  frame: number,
  isResurgent = false,
  isBoss = false,
  damageStage: 0 | 1 | 2 | 3 = 0
): HTMLCanvasElement {
  const f = frame & 1;
  const atlas = getSpriteAtlas();
  const key = `mob_${type}_${f}_${isResurgent ? 'res' : 'norm'}_${isBoss ? 'boss' : 'std'}_dmg${damageStage}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  if (atlas?.ready && atlas.monsters[type]) {
    const size = isBoss ? 112 : 84;
    const [c, ctx] = makeCanvas(size, size);
    const crouch = damageStage >= 2 ? 5 : 0;
    const bob = (f === 1 ? -3 : 0) + crouch;

    ctx.fillStyle = 'rgba(0,0,0,0.36)';
    ctx.beginPath();
    ctx.ellipse(size / 2, size - 5, size * 0.34, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(atlas.monsters[type], 0, bob, size, size);

    if (isResurgent) {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.38)';
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'source-over';
    } else if (damageStage === 3) {
      ctx.fillStyle = 'rgba(220, 38, 38, 0.34)';
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'source-over';
    } else if (damageStage === 2) {
      ctx.fillStyle = 'rgba(234, 88, 12, 0.18)';
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'source-over';
    }

    // Progressive 4-stage visual damage details layered crisply over the Nano Banana monster!
    if (damageStage >= 1) {
      // Battle slash scuff + sweat drop
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(size * 0.28, size * 0.42);
      ctx.lineTo(size * 0.48, size * 0.54);
      ctx.stroke();
      px(ctx, Math.round(size * 0.78), Math.round(size * 0.2), 6, 11, '#38bdf8');
      px(ctx, Math.round(size * 0.8), Math.round(size * 0.17), 2, 3, '#e0f2fe');
    }
    if (damageStage >= 2) {
      // Jagged cracks + rising smoke puffs
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(size * 0.56, size * 0.34);
      ctx.lineTo(size * 0.64, size * 0.48);
      ctx.lineTo(size * 0.52, size * 0.58);
      ctx.stroke();
      ctx.fillStyle = 'rgba(203, 213, 225, 0.75)';
      ctx.beginPath();
      ctx.arc(size * 0.22, size * 0.2, 6, 0, Math.PI * 2);
      ctx.arc(size * 0.78, size * 0.14, 7, 0, Math.PI * 2);
      ctx.fill();
    }
    if (damageStage >= 3) {
      // Critical orbiting golden dizzy stars!
      px(ctx, Math.round(size * 0.24), 4, 8, 8, '#fde047');
      px(ctx, Math.round(size * 0.48), 1, 8, 8, '#f59e0b');
      px(ctx, Math.round(size * 0.7), 5, 8, 8, '#fde047');
    }

    spriteCache.set(key, c);
    return c;
  }

  const [c, ctx] = makeCanvas(16, 16);
  const crouch = damageStage >= 2 ? 1 : 0;
  const bob = (f === 1 ? -1 : 0) + crouch;

  px(ctx, 3, 14, 10, 2, 'rgba(0,0,0,0.38)');

  const tint = (normal: string, resurgent: string) => {
    if (damageStage === 3) return '#991b1b';
    return isResurgent ? resurgent : normal;
  };

  switch (type) {
    case 'goblin':
      px(ctx, 3, 5 + bob, 10, 7, tint('#58a346', '#5a2d82'));
      px(ctx, 1, 5 + bob, 2, 2, tint('#72c25b', '#7f42b5'));
      px(ctx, 13, 5 + bob, 2, 2, tint('#72c25b', '#7f42b5'));
      px(ctx, 5, 7 + bob, 2, 2, damageStage >= 2 ? '#ffffff' : '#ffe066');
      px(ctx, 9, 7 + bob, 2, 2, damageStage >= 2 ? '#ffffff' : '#ffe066');
      px(ctx, 6, 10 + bob, 4, 1, '#1a1d24');
      px(ctx, 5, 12, 2, 2, '#4a3020');
      px(ctx, 9, 12, 2, 2, '#4a3020');
      break;

    case 'slime':
      px(ctx, 3, 7 + bob, 10, 6, tint('#2ec4b6', '#8338ec'));
      px(ctx, 4, 5 + bob, 8, 2, tint('#48e5d6', '#a855f7'));
      px(ctx, 2, 9 + bob, 12, 4, tint('#22a397', '#6b21a8'));
      px(ctx, 5, 8 + bob, 2, 2, '#0f172a');
      px(ctx, 9, 8 + bob, 2, 2, '#0f172a');
      px(ctx, 5, 6 + bob, 2, 1, '#ffffff');
      break;

    case 'ghost':
      px(ctx, 4, 3 + bob, 8, 9, tint('#c5d1eb', '#7e22ce'));
      px(ctx, 3, 5 + bob, 10, 7, tint('#9fb3db', '#581c87'));
      px(ctx, 3, 12 + bob, 2, 2, tint('#9fb3db', '#581c87'));
      px(ctx, 7, 12 + bob, 2, 2, tint('#9fb3db', '#581c87'));
      px(ctx, 11, 12 + bob, 2, 2, tint('#9fb3db', '#581c87'));
      px(ctx, 5, 6 + bob, 2, 2, '#ef4444');
      px(ctx, 9, 6 + bob, 2, 2, '#ef4444');
      break;

    case 'dragon':
      px(ctx, 1, 5 + bob, 3, 5, tint('#991b1b', '#4c1d95'));
      px(ctx, 12, 5 + bob, 3, 5, tint('#991b1b', '#4c1d95'));
      px(ctx, 4, 4 + bob, 8, 8, tint('#dc2626', '#6d28d9'));
      px(ctx, 5, 2 + bob, 2, 2, '#f59e0b');
      px(ctx, 9, 2 + bob, 2, 2, '#f59e0b');
      px(ctx, 5, 6 + bob, 2, 2, '#fde047');
      px(ctx, 9, 6 + bob, 2, 2, '#fde047');
      px(ctx, 6, 9 + bob, 4, 2, '#fb923c');
      break;

    case 'golem':
      px(ctx, 3, 3 + bob, 10, 10, tint('#64748b', '#4c1d95'));
      px(ctx, 2, 6 + bob, 12, 5, tint('#475569', '#3b0764'));
      px(ctx, 5, 5 + bob, 2, 2, damageStage >= 2 ? '#ef4444' : '#38bdf8');
      px(ctx, 9, 5 + bob, 2, 2, damageStage >= 2 ? '#ef4444' : '#38bdf8');
      px(ctx, 4, 13, 3, 2, '#334155');
      px(ctx, 9, 13, 3, 2, '#334155');
      break;

    case 'hydra':
      px(ctx, 4, 7 + bob, 8, 6, tint('#15803d', '#581c87'));
      px(ctx, 2, 3 + bob, 3, 5, tint('#22c55e', '#7e22ce'));
      px(ctx, 6, 2 + bob, 4, 6, tint('#16a34a', '#6b21a8'));
      px(ctx, 11, 3 + bob, 3, 5, tint('#22c55e', '#7e22ce'));
      px(ctx, 3, 4 + bob, 1, 1, '#fde047');
      px(ctx, 7, 3 + bob, 2, 1, '#fde047');
      px(ctx, 12, 4 + bob, 1, 1, '#fde047');
      break;

    case 'kraken':
      px(ctx, 4, 3 + bob, 8, 7, tint('#0e7490', '#5b21b6'));
      px(ctx, 5, 5 + bob, 2, 2, '#fde047');
      px(ctx, 9, 5 + bob, 2, 2, '#fde047');
      px(ctx, 2, 10 + bob, 2, 4, tint('#06b6d4', '#7c3aed'));
      px(ctx, 5, 10 + bob, 2, 4, tint('#06b6d4', '#7c3aed'));
      px(ctx, 9, 10 + bob, 2, 4, tint('#06b6d4', '#7c3aed'));
      px(ctx, 12, 10 + bob, 2, 4, tint('#06b6d4', '#7c3aed'));
      break;

    case 'knight':
      px(ctx, 4, 2 + bob, 8, 5, tint('#94a3b8', '#4c1d95'));
      px(ctx, 6, 1 + bob, 4, 1, '#ef4444');
      px(ctx, 5, 4 + bob, 6, 1, '#0f172a');
      px(ctx, 4, 7 + bob, 8, 6, tint('#475569', '#2e1065'));
      px(ctx, 12, 4 + bob, 2, 8, '#e2e8f0');
      px(ctx, 6, 8 + bob, 4, 3, '#e6b84c');
      break;
  }

  if (isBoss) {
    px(ctx, 4, Math.max(0, 0 + crouch), 8, 2, '#f5d76e');
    px(ctx, 4, Math.max(0, 0 + crouch), 2, 1, '#ef4444');
    px(ctx, 10, Math.max(0, 0 + crouch), 2, 1, '#ef4444');
  }

  // PROGRESSIVE VISUAL DAMAGE DETAILS!
  if (damageStage >= 1) {
    // Battle scuff + white bandage/scratch mark + sweat drop
    px(ctx, 4, 8 + bob, 3, 1, '#1e1b24');
    px(ctx, 5, 9 + bob, 2, 1, '#fef08a');
    px(ctx, 13, 3 + bob, 1, 2, '#38bdf8');
  }
  if (damageStage >= 2) {
    // Deep cracks / scorch marks + rising smoke pixel puffs
    px(ctx, 9, 7 + bob, 1, 4, '#0f172a');
    px(ctx, 10, 9 + bob, 2, 1, '#0f172a');
    px(ctx, 6, 6 + bob, 1, 3, '#ef4444');
    px(ctx, 2, 2, 2, 2, 'rgba(203, 213, 225, 0.75)');
    px(ctx, 13, 1, 2, 2, 'rgba(148, 163, 184, 0.75)');
  }
  if (damageStage >= 3) {
    // Critical state: heavily fractured + orbiting dizzy stars + red warning sparks!
    px(ctx, 3, 1, 2, 2, '#fde047');
    px(ctx, 7, 0, 2, 2, '#f59e0b');
    px(ctx, 11, 1, 2, 2, '#fde047');
    px(ctx, 5, 7 + bob, 2, 1, '#0f172a'); // X-like dizzy eyes
    px(ctx, 9, 7 + bob, 2, 1, '#0f172a');
    px(ctx, 4, 11 + bob, 8, 1, '#fca5a5');
  }

  spriteCache.set(key, c);
  return c;
}

export function getMonsterPortraitDataUrl(
  type: MonsterSpriteType,
  isResurgent = false,
  isBoss = false,
  damageStage: 0 | 1 | 2 | 3 = 0
): string {
  const atlas = getSpriteAtlas();
  const key = `portrait_mob_${type}_${isResurgent ? 'res' : 'norm'}_${isBoss ? 'boss' : 'std'}_dmg${damageStage}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached.toDataURL();

  const [c, ctx] = makeCanvas(112, 112);
  ctx.imageSmoothingEnabled = Boolean(atlas?.ready);
  const base = getMonsterSprite(type, damageStage >= 2 ? 1 : 0, isResurgent, isBoss, damageStage);
  ctx.drawImage(base, 4, 4, 104, 104);
  spriteCache.set(key, c);
  return c.toDataURL();
}

function drawOpenedChest56(ctx: CanvasRenderingContext2D, royal: boolean): void {
  const outline = '#1b0f0a';
  const woodLight = royal ? '#6a4b8a' : '#96572e';
  const woodMid = royal ? '#533870' : '#7b4523';
  const woodDark = royal ? '#3e2757' : '#593017';
  const woodDeep = royal ? '#28183b' : '#3a1f10';
  const cavityDark = '#150c08';
  const goldBright = '#fae06b';
  const goldMid = '#e2ab2d';
  const goldDark = '#9d6612';

  // 1. Soft grounded floor shadow beneath the chest box
  ctx.fillStyle = 'rgba(0, 0, 0, 0.34)';
  ctx.beginPath();
  ctx.ellipse(29, 46, 21, 7.5, -0.18, 0, Math.PI * 2);
  ctx.fill();

  // Helper to draw filled + outlined polygons cleanly
  const poly = (pts: [number, number][], fill: string, stroke?: string, lw = 1.5) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  // 2. Swung-open arched hinged lid (resting open behind the back-right edge)
  // Outer arched lid silhouette
  ctx.beginPath();
  ctx.moveTo(21, 20);
  ctx.quadraticCurveTo(21, 8, 28, 4);
  ctx.lineTo(50, 12);
  ctx.quadraticCurveTo(54, 15, 51, 24);
  ctx.lineTo(48, 30);
  ctx.closePath();
  ctx.fillStyle = woodMid;
  ctx.fill();
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Top curved outer wood bevel of the open lid
  ctx.beginPath();
  ctx.moveTo(23, 13);
  ctx.quadraticCurveTo(25, 6, 29, 5);
  ctx.lineTo(49, 13);
  ctx.quadraticCurveTo(46, 15, 44, 18);
  ctx.lineTo(23, 13);
  ctx.closePath();
  ctx.fillStyle = woodLight;
  ctx.fill();

  // Dark recessed underside of the open arched lid (visible hollow curve)
  poly(
    [
      [23, 19],
      [26, 9],
      [48, 17],
      [46, 28],
    ],
    woodDeep
  );
  poly(
    [
      [25, 19],
      [27.5, 11.5],
      [46, 18.5],
      [44.5, 27],
    ],
    '#27140c'
  );

  // Subtle curved wood plank ribs inside the open lid
  ctx.strokeStyle = '#190d07';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(26, 14);
  ctx.lineTo(46, 21.5);
  ctx.moveTo(25, 17);
  ctx.lineTo(45, 24.5);
  ctx.stroke();

  // Golden metal trim straps across the open lid (matching the closed chest's iconic double gold bands!)
  poly(
    [
      [28, 5],
      [32, 6.5],
      [29, 21.5],
      [25, 20],
    ],
    goldMid,
    outline,
    1
  );
  poly(
    [
      [40, 9.5],
      [44, 11],
      [41, 26.5],
      [37, 25],
    ],
    goldMid,
    outline,
    1
  );
  // Gold front lip highlight along the open lid edge
  ctx.strokeStyle = goldBright;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(26, 8);
  ctx.lineTo(49, 16.5);
  ctx.stroke();

  // 3. Open chest box mouth — deep dark empty interior cavity!
  poly(
    [
      [7, 29],
      [22, 19],
      [49, 30],
      [34, 40],
    ],
    cavityDark,
    outline,
    2
  );

  // Inner back-left & back-right wooden walls inside the empty cavity for unmistakable 3D depth
  poly(
    [
      [10, 29],
      [22, 21],
      [22, 29],
      [14, 34],
    ],
    woodDeep
  );
  poly(
    [
      [22, 21],
      [46, 30.5],
      [38, 35.5],
      [22, 29],
    ],
    '#28150d'
  );
  // Tiny dark floor of empty chest
  poly(
    [
      [14, 34],
      [22, 29],
      [38, 35.5],
      [33, 38.5],
    ],
    cavityDark
  );

  // Crisp golden rim framing the open mouth of the box
  ctx.strokeStyle = goldMid;
  ctx.lineWidth = 2.2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(8, 29);
  ctx.lineTo(22, 19.5);
  ctx.lineTo(48, 30);
  ctx.lineTo(34, 39.5);
  ctx.closePath();
  ctx.stroke();

  // Bright gold specular glint along front rim
  ctx.strokeStyle = goldBright;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(9, 29.5);
  ctx.lineTo(34, 39.5);
  ctx.lineTo(47.5, 30.5);
  ctx.stroke();

  // Two dark-gold iron hinges connecting lid to back rim
  poly(
    [
      [26, 20],
      [30, 21.5],
      [29, 24],
      [25, 22.5],
    ],
    goldDark,
    outline,
    1
  );
  poly(
    [
      [39, 25],
      [43, 26.5],
      [42, 29],
      [38, 27.5],
    ],
    goldDark,
    outline,
    1
  );

  // 4. Front-left wooden wall of chest box
  poly(
    [
      [7, 29],
      [34, 40],
      [34, 52],
      [7, 41],
    ],
    woodMid,
    outline,
    2
  );

  // Vertical plank grooves on front-left wall
  ctx.strokeStyle = woodDeep;
  ctx.lineWidth = 1.2;
  for (const t of [0.24, 0.5, 0.76]) {
    const px0 = 7 + (34 - 7) * t;
    const py0 = 29 + (40 - 29) * t;
    ctx.beginPath();
    ctx.moveTo(px0, py0 + 2);
    ctx.lineTo(px0, py0 + 10);
    ctx.stroke();
  }

  // Gold horizontal & corner metal frame bands on front-left wall
  poly(
    [
      [7, 29],
      [34, 40],
      [34, 43],
      [7, 32],
    ],
    goldMid,
    outline,
    1
  );
  poly(
    [
      [7, 38.5],
      [34, 49.5],
      [34, 52],
      [7, 41],
    ],
    goldDark,
    outline,
    1
  );
  // Left & center-front gold corner posts
  poly(
    [
      [7, 29],
      [10.5, 30.5],
      [10.5, 42.5],
      [7, 41],
    ],
    goldMid,
    outline,
    1
  );
  poly(
    [
      [30.5, 38.5],
      [34, 40],
      [34, 52],
      [30.5, 50.5],
    ],
    goldBright,
    outline,
    1
  );

  // Unlocked golden keyhole lock plate centered on front-left wall
  poly(
    [
      [17.5, 33.5],
      [23.5, 36],
      [23.5, 43.5],
      [17.5, 41],
    ],
    goldBright,
    outline,
    1.2
  );
  ctx.fillStyle = outline;
  ctx.beginPath();
  ctx.arc(20.5, 38, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(19.9, 38.4, 1.2, 2.4);

  // 5. Shaded right-side wooden wall of chest box
  poly(
    [
      [34, 40],
      [49, 30],
      [49, 42],
      [34, 52],
    ],
    woodDark,
    outline,
    2
  );

  // Vertical plank grooves on right-side wall
  ctx.strokeStyle = '#2b150b';
  ctx.lineWidth = 1.2;
  for (const t of [0.33, 0.66]) {
    const px0 = 34 + (49 - 34) * t;
    const py0 = 40 + (30 - 40) * t;
    ctx.beginPath();
    ctx.moveTo(px0, py0 + 2);
    ctx.lineTo(px0, py0 + 10);
    ctx.stroke();
  }

  // Gold top, bottom & corner bands on shaded right-side wall
  poly(
    [
      [34, 40],
      [49, 30],
      [49, 33],
      [34, 43],
    ],
    goldDark,
    outline,
    1
  );
  poly(
    [
      [34, 49.5],
      [49, 39.5],
      [49, 42],
      [34, 52],
    ],
    '#7a4e0d',
    outline,
    1
  );
  poly(
    [
      [46, 32],
      [49, 30],
      [49, 42],
      [46, 44],
    ],
    goldDark,
    outline,
    1
  );
}

export function getChestSprite(opened: boolean, locked: boolean): HTMLCanvasElement {
  const atlas = getSpriteAtlas();
  const key = `chest_${opened ? 'open_v2' : 'closed'}_${locked ? 'l' : 'u'}_a${atlas?.revision || 0}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  // Opened chests ALWAYS render a solid, opaque open empty chest (never a faded transparent closed chest!)
  if (opened) {
    const [c, ctx] = makeCanvas(56, 56);
    ctx.imageSmoothingEnabled = false;
    drawOpenedChest56(ctx, locked);
    spriteCache.set(key, c);
    return c;
  }

  if (atlas?.ready && atlas.props.chest) {
    const [c, ctx] = makeCanvas(56, 56);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(atlas.props.chest, 0, 0, 56, 56);
    if (locked) {
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(4, 4, 48, 48);
    }
    spriteCache.set(key, c);
    return c;
  }

  const [c, ctx] = makeCanvas(16, 16);
  px(ctx, 2, 13, 12, 2, 'rgba(0,0,0,0.35)');
  const wood = locked ? '#4a3561' : '#8a5228';
  const trim = locked ? '#f5d76e' : '#c99738';
  px(ctx, 2, 6, 12, 8, wood);
  px(ctx, 2, 6, 12, 2, trim);
  px(ctx, 2, 12, 12, 2, trim);
  px(ctx, 7, 8, 2, 3, '#ffe066');
  spriteCache.set(key, c);
  return c;
}

export function getSignSprite(): HTMLCanvasElement {
  const key = 'signpost';
  const cached = spriteCache.get(key);
  if (cached) return cached;

  const [c, ctx] = makeCanvas(16, 16);
  px(ctx, 5, 14, 6, 2, 'rgba(0,0,0,0.3)');
  px(ctx, 7, 9, 2, 6, '#5c3c24');
  px(ctx, 2, 3, 12, 7, '#9c6b3f');
  px(ctx, 2, 3, 12, 1, '#c48f5a');
  px(ctx, 4, 5, 8, 1, '#3b2416');
  px(ctx, 4, 7, 6, 1, '#3b2416');
  spriteCache.set(key, c);
  return c;
}
