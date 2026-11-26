import type { Ficha } from '../types';
import type { MonsterSpriteType } from '../world/worldMap';

export type NpcRoleKey = Ficha['npcRole'];

export const GENERATED_SHEETS = {
  hero: '/src/assets/images/hero_spritesheet_1795608642429.jpg',
  npcsPets: '/src/assets/images/npcs_pets_spritesheet_1795608641815.jpg',
  npcsFemale: '/src/assets/images/npcs_female_spritesheet_1795613624052.jpg',
  monsters: '/src/assets/images/monsters_spritesheet_1795608646424.jpg',
  townProps: '/src/assets/images/town_props_spritesheet_1795608647330.jpg',
  terrain: '/src/assets/images/terrain_tileset_1795608649943.jpg',
  fairy: '/src/assets/images/fairy_spritesheet_1795610048541.jpg',
} as const;

export const CUSTOM_HERO_SHEET_KEY = 'cronicas_trt4_custom_hero_sheet_v1';

export interface CustomHeroSheetConfig {
  dataUrl: string;
  rows: number;
  cols: number;
  rowOrder: ('down' | 'up' | 'left' | 'right')[];
}

export interface CutoutBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  empty: boolean;
}

export type PropSpriteKey =
  | 'house_red'
  | 'house_blue'
  | 'house_emerald'
  | 'house_gold'
  | 'fountain'
  | 'town_tree'
  | 'rune_tree'
  | 'flower_bed'
  | 'server_rack'
  | 'crystal_shrine'
  | 'torch_post'
  | 'chest';

export type TerrainTileKey =
  | 'grass_toga'
  | 'flower_grass'
  | 'cobble_road'
  | 'dirt_path'
  | 'tribunal_floor'
  | 'castle_floor'
  | 'blue_carpet'
  | 'forest_grass'
  | 'data_river'
  | 'wood_bridge'
  | 'fortress_floor'
  | 'mountain_stone'
  | 'cable_floor'
  | 'port_sand'
  | 'wood_pier'
  | 'ocean_water';

export interface SpriteAtlas {
  ready: boolean;
  revision: number;
  heroWalk: Record<'down' | 'up' | 'left' | 'right', HTMLCanvasElement[]>;
  heroBattle: HTMLCanvasElement;
  fairy: {
    right: HTMLCanvasElement[];
    left: HTMLCanvasElement[];
    portrait: HTMLCanvasElement;
    celebrate: HTMLCanvasElement;
  };
  npcs: Record<NpcRoleKey, HTMLCanvasElement>;
  npcsMale: Record<NpcRoleKey, HTMLCanvasElement>;
  npcsFemale: Record<NpcRoleKey, HTMLCanvasElement>;
  femaleScholarAlt: HTMLCanvasElement;
  pets: Record<
    'golden' | 'spotted' | 'brown' | 'husky' | 'ginger',
    { right: HTMLCanvasElement; left: HTMLCanvasElement }
  >;
  monsters: Record<MonsterSpriteType, HTMLCanvasElement>;
  props: Record<PropSpriteKey, HTMLCanvasElement>;
  terrain: Record<TerrainTileKey, HTMLCanvasElement>;
}

/**
 * Pure pixel-buffer chroma-key background remover + anti-halo despiller + tight bounding-box detector.
 * Works with any solid background color (defaults to auto-detecting from cell corners, optimized for #FF00FF magenta).
 */
export function removeChromaKeyFromImageData(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  forcedKeyRgb?: [number, number, number]
): CutoutBounds {
  // Sample 4 corners to detect the solid chroma-key background color automatically
  let keyR = 255;
  let keyG = 0;
  let keyB = 255;
  if (forcedKeyRgb) {
    [keyR, keyG, keyB] = forcedKeyRgb;
  } else {
    const corners = [
      0,
      (w - 1) * 4,
      (h - 1) * w * 4,
      ((h - 1) * w + (w - 1)) * 4,
    ];
    let sr = 0;
    let sg = 0;
    let sb = 0;
    let count = 0;
    for (const idx of corners) {
      if (idx >= 0 && idx + 3 < data.length && data[idx + 3] > 200) {
        sr += data[idx];
        sg += data[idx + 1];
        sb += data[idx + 2];
        count++;
      }
    }
    if (count > 0) {
      keyR = Math.round(sr / count);
      keyG = Math.round(sg / count);
      keyB = Math.round(sb / count);
    }
  }

  const isMagentaKey = keyR > 190 && keyB > 190 && keyG < 80;
  const visited = new Uint8Array(w * h);
  const removed = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const isOuterBg = (idx4: number): boolean => {
    const a = data[idx4 + 3];
    if (a < 20) return true;
    const r = data[idx4];
    const g = data[idx4 + 1];
    const b = data[idx4 + 2];
    const dr = r - keyR;
    const dg = g - keyG;
    const db = b - keyB;
    const distSq = dr * dr + dg * dg + db * db;
    if (distSq <= 118 * 118) return true;
    if (isMagentaKey && r > 140 && b > 140 && g < Math.min(r, b) - 42) return true;
    return false;
  };

  const isStrictInteriorBg = (idx4: number): boolean => {
    const a = data[idx4 + 3];
    if (a < 20) return true;
    const r = data[idx4];
    const g = data[idx4 + 1];
    const b = data[idx4 + 2];
    const dr = r - keyR;
    const dg = g - keyG;
    const db = b - keyB;
    if (dr * dr + dg * dg + db * db <= 64 * 64) return true;
    if (isMagentaKey && r > 195 && b > 195 && g < 76) return true;
    return false;
  };

  const enqueue = (px: number, py: number) => {
    const p = py * w + px;
    if (visited[p]) return;
    if (!isOuterBg(p * 4)) return;
    visited[p] = 1;
    removed[p] = 1;
    queue[tail++] = p;
  };

  // Seed flood-fill from all 4 cell borders
  for (let x = 0; x < w; x++) {
    enqueue(x, 0);
    enqueue(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    enqueue(0, y);
    enqueue(w - 1, y);
  }

  // Pass 1a: BFS flood-fill outer background
  while (head < tail) {
    const p = queue[head++];
    const px = p % w;
    const py = (p - px) / w;
    if (px > 0) enqueue(px - 1, py);
    if (px < w - 1) enqueue(px + 1, py);
    if (py > 0) enqueue(px, py - 1);
    if (py < h - 1) enqueue(px, py + 1);
  }

  // Pass 1b: Remove enclosed pure chroma-key pockets (between legs, under arms, inside arches)
  for (let p = 0; p < w * h; p++) {
    if (!removed[p] && isStrictInteriorBg(p * 4)) {
      removed[p] = 1;
    }
  }

  for (let p = 0; p < w * h; p++) {
    if (removed[p]) {
      data[p * 4 + 3] = 0;
    }
  }

  // Pass 2: Anti-halo edge cleanup & despill on pixels touching transparent background
  const edgeCut = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (removed[p]) continue;
      let touchesBg = false;
      for (let dy = -1; dy <= 1 && !touchesBg; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= w) continue;
          if (removed[ny * w + nx]) {
            touchesBg = true;
            break;
          }
        }
      }
      if (!touchesBg) continue;

      const idx4 = p * 4;
      const r = data[idx4];
      const g = data[idx4 + 1];
      const b = data[idx4 + 2];
      const dr = r - keyR;
      const dg = g - keyG;
      const db = b - keyB;
      const distSq = dr * dr + dg * dg + db * db;

      if (isMagentaKey) {
        const spill = r + b - 2 * g;
        if (spill > 150 || distSq < 130 * 130) {
          edgeCut[p] = 1;
        } else if (r > g + 26 && b > g + 26) {
          // Despill pink fringe cleanly into dark pixel outline
          const avg = Math.min(r, b, g + 14);
          data[idx4] = Math.max(0, Math.round(avg * 0.75));
          data[idx4 + 1] = Math.max(0, Math.round(g * 0.85));
          data[idx4 + 2] = Math.max(0, Math.round(avg * 0.75));
        }
      } else if (distSq < 95 * 95) {
        edgeCut[p] = 1;
      }
    }
  }

  for (let p = 0; p < w * h; p++) {
    if (edgeCut[p]) {
      data[p * 4 + 3] = 0;
    }
  }

  // Pass 3: Compute tight bounding box of remaining opaque pixels
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return { minX: 0, minY: 0, maxX: w - 1, maxY: h - 1, empty: true };
  }
  return { minX, minY, maxX, maxY, empty: false };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

/**
 * Extracts a normalized sub-rectangle from a sprite sheet, removes its chroma-key background,
 * tight-crops the character, and renders it bottom-center aligned onto a clean target canvas!
 */
export function extractCutoutSprite(
  img: HTMLImageElement,
  nx: number,
  ny: number,
  nw: number,
  nh: number,
  targetW: number,
  targetH: number,
  opts: {
    flipX?: boolean;
    padRatio?: number;
    anchor?: 'bottom' | 'center';
    tintHueShift?: 'husky';
    forcedKeyRgb?: [number, number, number];
  } = {}
): HTMLCanvasElement {
  const sx = Math.max(0, Math.floor(img.width * nx));
  const sy = Math.max(0, Math.floor(img.height * ny));
  const sw = Math.max(1, Math.min(img.width - sx, Math.ceil(img.width * nw)));
  const sh = Math.max(1, Math.min(img.height - sy, Math.ceil(img.height * nh)));

  const [work, wctx] = makeCanvas(sw, sh);
  wctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  const imgData = wctx.getImageData(0, 0, sw, sh);
  const bounds = removeChromaKeyFromImageData(imgData.data, sw, sh, opts.forcedKeyRgb);

  if (opts.tintHueShift === 'husky') {
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 20) continue;
      // Shift warm brown tones into cool silver-blue husky coat
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const lum = Math.round(r * 0.35 + g * 0.45 + b * 0.2);
      d[i] = Math.min(255, Math.round(lum * 0.92 + 12));
      d[i + 1] = Math.min(255, Math.round(lum * 0.98 + 16));
      d[i + 2] = Math.min(255, Math.round(lum * 1.12 + 24));
    }
  }
  wctx.putImageData(imgData, 0, 0);

  const [out, octx] = makeCanvas(targetW, targetH);
  if (bounds.empty) return out;

  const cropW = bounds.maxX - bounds.minX + 1;
  const cropH = bounds.maxY - bounds.minY + 1;
  const pad = opts.padRatio ?? 0.05;
  const availW = targetW * (1 - pad * 2);
  const availH = targetH * (1 - pad * 2);
  const scale = Math.min(availW / cropW, availH / cropH);
  const drawW = Math.max(1, Math.round(cropW * scale));
  const drawH = Math.max(1, Math.round(cropH * scale));
  const dx = Math.round((targetW - drawW) / 2);
  const dy =
    opts.anchor === 'center'
      ? Math.round((targetH - drawH) / 2)
      : Math.round(targetH - drawH - targetH * pad);

  octx.save();
  octx.imageSmoothingEnabled = true;
  octx.imageSmoothingQuality = 'high';
  if (opts.flipX) {
    octx.translate(targetW, 0);
    octx.scale(-1, 1);
    octx.drawImage(work, bounds.minX, bounds.minY, cropW, cropH, targetW - dx - drawW, dy, drawW, drawH);
  } else {
    octx.drawImage(work, bounds.minX, bounds.minY, cropW, cropH, dx, dy, drawW, drawH);
  }
  octx.restore();
  return out;
}

/**
 * Removes directional vignette / sun-gradient drift across a square ground tile
 * while preserving 100% of the crisp grass-blade / pebble / stone pixel detail,
 * so repeated tiles blend seamlessly with zero checkerboard edges.
 */
function equalizeTerrainTile(canvas: HTMLCanvasElement, strength = 0.88): void {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;

  const rowR = new Float32Array(h);
  const rowG = new Float32Array(h);
  const rowB = new Float32Array(h);
  const colR = new Float32Array(w);
  const colG = new Float32Array(w);
  const colB = new Float32Array(w);
  let meanR = 0;
  let meanG = 0;
  let meanB = 0;
  const n = w * h;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      rowR[y] += r;
      rowG[y] += g;
      rowB[y] += b;
      colR[x] += r;
      colG[x] += g;
      colB[x] += b;
      meanR += r;
      meanG += g;
      meanB += b;
    }
  }
  meanR /= n;
  meanG /= n;
  meanB /= n;
  for (let y = 0; y < h; y++) {
    rowR[y] /= w;
    rowG[y] /= w;
    rowB[y] /= w;
  }
  for (let x = 0; x < w; x++) {
    colR[x] /= h;
    colG[x] /= h;
    colB[x] /= h;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const dr = (rowR[y] - meanR + (colR[x] - meanR)) * strength;
      const dg = (rowG[y] - meanG + (colG[x] - meanG)) * strength;
      const db = (rowB[y] - meanB + (colB[x] - meanB)) * strength;
      d[i] = Math.max(0, Math.min(255, Math.round(d[i] - dr)));
      d[i + 1] = Math.max(0, Math.min(255, Math.round(d[i + 1] - dg)));
      d[i + 2] = Math.max(0, Math.min(255, Math.round(d[i + 2] - db)));
    }
  }
  ctx.putImageData(img, 0, 0);
}

/**
 * Extracts a seamless ground terrain tile from the 4x4 terrain tileset,
 * with optional inner crop inset and seamless lighting equalization.
 */
function extractTerrainTile(
  img: HTMLImageElement,
  col: number,
  row: number,
  inset = 0.03,
  targetSize = 48,
  equalizeStrength = 0.85
): HTMLCanvasElement {
  const cellW = img.width / 4;
  const cellH = img.height / 4;
  const sx = Math.floor((col + inset) * cellW);
  const sy = Math.floor((row + inset) * cellH);
  const sw = Math.max(1, Math.floor((1 - inset * 2) * cellW));
  const sh = Math.max(1, Math.floor((1 - inset * 2) * cellH));

  const [out, octx] = makeCanvas(targetSize, targetSize);
  octx.imageSmoothingEnabled = true;
  octx.imageSmoothingQuality = 'high';
  octx.drawImage(img, sx, sy, sw, sh, 0, 0, targetSize, targetSize);
  if (equalizeStrength > 0) {
    equalizeTerrainTile(out, equalizeStrength);
  }
  return out;
}

let currentAtlas: SpriteAtlas | null = null;
let loadingPromise: Promise<SpriteAtlas | null> | null = null;
let atlasRev = 0;
const atlasListeners = new Set<() => void>();

export function getSpriteAtlas(): SpriteAtlas | null {
  return currentAtlas;
}

export function getSpriteAtlasRevision(): number {
  return atlasRev;
}

export function subscribeSpriteAtlas(cb: () => void): () => void {
  atlasListeners.add(cb);
  return () => {
    atlasListeners.delete(cb);
  };
}

function notifyAtlasReady() {
  atlasRev++;
  if (currentAtlas) currentAtlas.revision = atlasRev;
  for (const cb of atlasListeners) cb();
}

export function loadCustomHeroSheetConfig(): CustomHeroSheetConfig | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(CUSTOM_HERO_SHEET_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CustomHeroSheetConfig>;
    if (!parsed || typeof parsed.dataUrl !== 'string' || !parsed.rows || !parsed.cols) return null;
    return {
      dataUrl: parsed.dataUrl,
      rows: Math.max(1, Math.min(8, Math.round(parsed.rows))),
      cols: Math.max(1, Math.min(12, Math.round(parsed.cols))),
      rowOrder:
        Array.isArray(parsed.rowOrder) && parsed.rowOrder.length >= 4
          ? (parsed.rowOrder.slice(0, 4) as ('down' | 'up' | 'left' | 'right')[])
          : ['down', 'up', 'left', 'right'],
    };
  } catch {
    return null;
  }
}

export async function sliceCustomHeroSheet(
  cfg: CustomHeroSheetConfig
): Promise<Record<'down' | 'up' | 'left' | 'right', HTMLCanvasElement[]>> {
  const img = await loadImage(cfg.dataUrl);
  const out: Record<'down' | 'up' | 'left' | 'right', HTMLCanvasElement[]> = {
    down: [],
    up: [],
    left: [],
    right: [],
  };
  const cellW = 1 / cfg.cols;
  const cellH = 1 / cfg.rows;
  const maxFrames = Math.min(4, cfg.cols);

  for (let r = 0; r < Math.min(4, cfg.rows); r++) {
    const dir = cfg.rowOrder[r] || (['down', 'up', 'left', 'right'][r] as 'down' | 'up' | 'left' | 'right');
    const frames: HTMLCanvasElement[] = [];
    for (let c = 0; c < maxFrames; c++) {
      frames.push(extractCutoutSprite(img, c * cellW, r * cellH, cellW, cellH, 64, 64, { padRatio: 0.04 }));
    }
    out[dir] = frames;
  }
  // Fallback if fewer than 4 rows provided
  if (out.up.length === 0) out.up = out.down;
  if (out.left.length === 0) out.left = out.down;
  if (out.right.length === 0) {
    out.right = out.left.map((c) => {
      const [m, ctx] = makeCanvas(c.width, c.height);
      ctx.translate(c.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(c, 0, 0);
      return m;
    });
  }
  return out;
}

export async function saveCustomHeroSheet(cfg: CustomHeroSheetConfig | null): Promise<void> {
  if (typeof window === 'undefined' || !window.localStorage) return;
  if (!cfg) {
    window.localStorage.removeItem(CUSTOM_HERO_SHEET_KEY);
    // Rebuild default hero walk frames
    if (currentAtlas) {
      const heroImg = await loadImage(GENERATED_SHEETS.hero);
      currentAtlas.heroWalk = buildDefaultHeroWalk(heroImg);
      notifyAtlasReady();
    }
    return;
  }
  window.localStorage.setItem(CUSTOM_HERO_SHEET_KEY, JSON.stringify(cfg));
  const customWalk = await sliceCustomHeroSheet(cfg);
  if (currentAtlas) {
    currentAtlas.heroWalk = customWalk;
    notifyAtlasReady();
  }
}

function buildDefaultHeroWalk(
  heroImg: HTMLImageElement
): Record<'down' | 'up' | 'left' | 'right', HTMLCanvasElement[]> {
  // Generated hero_spritesheet is a super-clean 4 rows x 6 cols grid!
  const cw = 1 / 6;
  const ch = 1 / 4;
  const sliceHero = (col: number, row: number, flipX = false) =>
    extractCutoutSprite(heroImg, col * cw, row * ch, cw, ch, 64, 64, {
      flipX,
      padRatio: 0.04,
      anchor: 'bottom',
      forcedKeyRgb: [255, 0, 255],
    });

  // Row 0 = walking DOWN (6 frames); Row 1 = walking UP (6 frames)
  const down = [sliceHero(0, 0), sliceHero(1, 0), sliceHero(2, 0), sliceHero(4, 0)];
  const up = [sliceHero(0, 1), sliceHero(1, 1), sliceHero(2, 1), sliceHero(4, 1)];
  // Verified from hero_spritesheet: cells (0,3), (1,3), (0,2), (3,2) have face on LEFT and red cape trailing RIGHT!
  const left = [sliceHero(0, 3, false), sliceHero(1, 3, false), sliceHero(0, 2, false), sliceHero(3, 2, false)];
  // Mirror horizontally so face points RIGHT and red cape trails LEFT when walking RIGHT!
  const right = [sliceHero(0, 3, true), sliceHero(1, 3, true), sliceHero(0, 2, true), sliceHero(3, 2, true)];
  return { down, up, left, right };
}

/**
 * Loads and chroma-keys all 6 Nano Banana sprite sheets once per browser session.
 * Safe to call repeatedly; returns cached Promise.
 */
export function ensureSpriteAtlasLoaded(): Promise<SpriteAtlas | null> {
  if (typeof window === 'undefined' || typeof Image === 'undefined') {
    return Promise.resolve(null);
  }
  if (currentAtlas?.ready) return Promise.resolve(currentAtlas);
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const [heroImg, npcsPetsImg, npcsFemaleImg, monstersImg, propsImg, terrainImg, fairyImg] = await Promise.all([
        loadImage(GENERATED_SHEETS.hero),
        loadImage(GENERATED_SHEETS.npcsPets),
        loadImage(GENERATED_SHEETS.npcsFemale),
        loadImage(GENERATED_SHEETS.monsters),
        loadImage(GENERATED_SHEETS.townProps),
        loadImage(GENERATED_SHEETS.terrain),
        loadImage(GENERATED_SHEETS.fairy),
      ]);

      const customCfg = loadCustomHeroSheetConfig();
      let heroWalk = buildDefaultHeroWalk(heroImg);
      if (customCfg) {
        try {
          heroWalk = await sliceCustomHeroSheet(customCfg);
        } catch {
          // fallback to built-in Nano Banana hero sheet
        }
      }

      // 2a. Male NPCs + Hero Battle Knight + Town Pets (exact 3 rows x 4 cols)
      const npcCellW = 1 / 4;
      const npcCellH = 1 / 3;
      const sliceNpcPet = (col: number, row: number, size = 64, opts?: Parameters<typeof extractCutoutSprite>[7]) =>
        extractCutoutSprite(npcsPetsImg, col * npcCellW, row * npcCellH, npcCellW, npcCellH, size, size, {
          padRatio: 0.04,
          anchor: 'bottom',
          forcedKeyRgb: [255, 0, 255],
          ...opts,
        });

      const maleJudge = sliceNpcPet(0, 0, 68);
      const femaleScholarAlt = sliceNpcPet(1, 0, 68); // Blonde scholar from npcsPets sheet
      const maleSmith = sliceNpcPet(2, 0, 68);
      const maleEngineer = sliceNpcPet(3, 0, 68);
      const armoredGuard = sliceNpcPet(0, 1, 68); // Closed-helmet knight (gender-neutral armor)
      const maleCaptain = sliceNpcPet(1, 1, 68);
      const maleSage = sliceNpcPet(2, 1, 68);

      const npcsMale: Record<NpcRoleKey, HTMLCanvasElement> = {
        juiz: maleJudge,
        bibliotecaria: maleJudge, // Male scholars/counselors never get the blonde female scholar sprite!
        ferreiro: maleSmith,
        engenheiro: maleEngineer,
        guarda: armoredGuard,
        capitao: maleCaptain,
        mago: maleSage,
        sabio: maleSage,
      };

      // 2b. Dedicated Female Human NPCs (exact 2 rows x 3 cols Nano Banana sheet)
      const femW = 1 / 3;
      const femH = 1 / 2;
      const sliceFemaleNpc = (col: number, row: number, size = 68) =>
        extractCutoutSprite(npcsFemaleImg, col * femW, row * femH, femW, femH, size, size, {
          padRatio: 0.04,
          anchor: 'bottom',
          forcedKeyRgb: [255, 0, 255],
        });

      const femaleSage = sliceFemaleNpc(0, 1, 68);
      const npcsFemale: Record<NpcRoleKey, HTMLCanvasElement> = {
        juiz: sliceFemaleNpc(0, 0, 68),
        ferreiro: sliceFemaleNpc(1, 0, 68),
        capitao: sliceFemaleNpc(2, 0, 68),
        sabio: femaleSage,
        mago: femaleSage,
        engenheiro: sliceFemaleNpc(1, 1, 68),
        bibliotecaria: sliceFemaleNpc(2, 1, 68),
        guarda: armoredGuard, // Full-plate knight is fine for armored guards
      };

      const npcs = npcsMale;

      const heroBattle = sliceNpcPet(3, 1, 112, { anchor: 'center' });

      const pets: SpriteAtlas['pets'] = {
        golden: { right: sliceNpcPet(0, 2, 56), left: sliceNpcPet(0, 2, 56, { flipX: true }) },
        spotted: { right: sliceNpcPet(1, 2, 56), left: sliceNpcPet(1, 2, 56, { flipX: true }) },
        brown: { right: sliceNpcPet(2, 2, 56), left: sliceNpcPet(2, 2, 56, { flipX: true }) },
        husky: {
          right: sliceNpcPet(2, 2, 56, { tintHueShift: 'husky' }),
          left: sliceNpcPet(2, 2, 56, { flipX: true, tintHueShift: 'husky' }),
        },
        ginger: { right: sliceNpcPet(3, 2, 56), left: sliceNpcPet(3, 2, 56, { flipX: true }) },
      };

      // 3. Monsters & Bosses (exact custom crop rects verified visually!)
      const sliceMonster = (nx: number, ny: number, nw: number, nh: number, size: number) =>
        extractCutoutSprite(monstersImg, nx, ny, nw, nh, size, size, {
          padRatio: 0.04,
          anchor: 'bottom',
          forcedKeyRgb: [255, 0, 255],
        });

      const monsters: Record<MonsterSpriteType, HTMLCanvasElement> = {
        goblin: sliceMonster(0.0, 0.0, 0.25, 0.32, 84),
        slime: sliceMonster(0.25, 0.0, 0.25, 0.32, 84),
        ghost: sliceMonster(0.5, 0.0, 0.25, 0.32, 84),
        knight: sliceMonster(0.75, 0.0, 0.25, 0.32, 88),
        // Bottom-row epic bosses (Golem & Dragon cropped cleanly to single full-body boss!)
        golem: sliceMonster(0.0, 0.56, 0.25, 0.44, 112),
        hydra: sliceMonster(0.25, 0.34, 0.25, 0.66, 112),
        kraken: sliceMonster(0.5, 0.37, 0.25, 0.63, 112),
        dragon: sliceMonster(0.75, 0.565, 0.25, 0.435, 112),
      };

      // 4. Town Buildings & Themed Props (exact 3 rows x 4 cols)
      const propW = 1 / 4;
      const propH = 1 / 3;
      const sliceProp = (col: number, row: number, tw: number, th: number, anchor: 'bottom' | 'center' = 'bottom') =>
        extractCutoutSprite(propsImg, col * propW, row * propH, propW, propH, tw, th, {
          padRatio: 0.02,
          anchor,
          forcedKeyRgb: [255, 0, 255],
        });

      const props: Record<PropSpriteKey, HTMLCanvasElement> = {
        house_red: sliceProp(0, 0, 192, 168),
        house_blue: sliceProp(1, 0, 192, 168),
        house_emerald: sliceProp(2, 0, 192, 168),
        house_gold: sliceProp(3, 0, 224, 176),
        fountain: sliceProp(0, 1, 112, 112, 'center'),
        town_tree: sliceProp(1, 1, 72, 72),
        rune_tree: sliceProp(2, 1, 72, 72),
        flower_bed: sliceProp(3, 1, 56, 56),
        server_rack: sliceProp(0, 2, 64, 72),
        crystal_shrine: sliceProp(1, 2, 64, 72),
        torch_post: sliceProp(2, 2, 56, 68),
        chest: sliceProp(3, 2, 56, 56, 'center'),
      };

      // 5. Seamless 16-bit SNES Ground Terrain Tileset (4x4 grid with smart inner crop where needed)
      const terrain: Record<TerrainTileKey, HTMLCanvasElement> = {
        grass_toga: extractTerrainTile(terrainImg, 0, 0, 0.24, 48, 0.94),
        flower_grass: extractTerrainTile(terrainImg, 1, 0, 0.14, 48, 0.85),
        cobble_road: extractTerrainTile(terrainImg, 2, 0, 0.04, 48, 0.45),
        dirt_path: extractTerrainTile(terrainImg, 3, 0, 0.22, 48, 0.88),
        tribunal_floor: extractTerrainTile(terrainImg, 0, 1, 0.04, 48, 0.25),
        castle_floor: extractTerrainTile(terrainImg, 1, 1, 0.04, 48, 0.35),
        blue_carpet: extractTerrainTile(terrainImg, 2, 1, 0.16, 48, 0.45),
        forest_grass: extractTerrainTile(terrainImg, 3, 1, 0.22, 48, 0.9),
        data_river: extractTerrainTile(terrainImg, 0, 2, 0.24, 48, 0.65),
        wood_bridge: extractTerrainTile(terrainImg, 1, 2, 0.04, 48, 0.3),
        fortress_floor: extractTerrainTile(terrainImg, 2, 2, 0.04, 48, 0.45),
        mountain_stone: extractTerrainTile(terrainImg, 3, 2, 0.24, 48, 0.85),
        cable_floor: extractTerrainTile(terrainImg, 0, 3, 0.04, 48, 0.35),
        port_sand: extractTerrainTile(terrainImg, 1, 3, 0.08, 48, 0.85),
        wood_pier: extractTerrainTile(terrainImg, 2, 3, 0.04, 48, 0.3),
        ocean_water: extractTerrainTile(terrainImg, 3, 3, 0.06, 48, 0.7),
      };

      // 6. Nano Banana Flying Guide Fairy Companion (2x2 grid: Row 0 = facing right wings up/down, Row 1 = portrait & celebrate)
      const sliceFairy = (col: number, row: number, flipX = false, size = 64) =>
        extractCutoutSprite(fairyImg, col * 0.5, row * 0.5, 0.5, 0.5, size, size, {
          flipX,
          padRatio: 0.06,
          anchor: 'center',
          forcedKeyRgb: [255, 0, 255],
        });
      const fairy = {
        right: [sliceFairy(0, 0, false, 64), sliceFairy(1, 0, false, 64)],
        left: [sliceFairy(0, 0, true, 64), sliceFairy(1, 0, true, 64)],
        portrait: sliceFairy(0, 1, false, 112),
        celebrate: sliceFairy(1, 1, false, 112),
      };

      currentAtlas = {
        ready: true,
        revision: atlasRev + 1,
        heroWalk,
        heroBattle,
        fairy,
        npcs,
        npcsMale,
        npcsFemale,
        femaleScholarAlt,
        pets,
        monsters,
        props,
        terrain,
      };
      notifyAtlasReady();
      return currentAtlas;
    } catch (err) {
      console.warn('[SpriteAtlas] Fallback to procedural sprites:', err);
      return null;
    }
  })();

  return loadingPromise;
}
