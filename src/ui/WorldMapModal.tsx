import React, { useEffect, useMemo, useRef } from 'react';
import { Map as MapIcon, Navigation, X } from 'lucide-react';
import { REGIONS } from '../data/content';
import { getAllZonas } from '../systems/customDatabase';
import type { SaveState } from '../types';
import { buildWorldData, TileType, WORLD_H, WORLD_W } from '../world/worldMap';

interface WorldMapModalProps {
  saveState: SaveState;
  dbVersion?: number;
  onFastTravel: (tx: number, ty: number, label: string) => void;
  onClose: () => void;
}

const TILE_MINI_COLOR: Partial<Record<TileType, string>> = {
  [TileType.GrassToga]: '#6e8c54',
  [TileType.FlowerGrass]: '#7fa060',
  [TileType.CobbleRoad]: '#b0a288',
  [TileType.DirtPath]: '#c49d68',
  [TileType.TribunalFloor]: '#d9d0bc',
  [TileType.StoneWall]: '#393f4d',
  [TileType.CastleFloor]: '#69748a',
  [TileType.BlueCarpet]: '#2b59a3',
  [TileType.ForestGrass]: '#2f593b',
  [TileType.RuneTree]: '#1e4a2f',
  [TileType.DataRiver]: '#2986b8',
  [TileType.WoodBridge]: '#9c6b3f',
  [TileType.FortressFloor]: '#474054',
  [TileType.FortressWall]: '#201c29',
  [TileType.PadlockGate]: '#d9a441',
  [TileType.MountainStone]: '#6b7285',
  [TileType.MountainPeak]: '#cbd5e1',
  [TileType.CableFloor]: '#7c5cbf',
  [TileType.PortSand]: '#c7b07b',
  [TileType.WoodPier]: '#875c36',
  [TileType.OceanWater]: '#1a5882',
  [TileType.ShipDeck]: '#6e4326',
  [TileType.BossDais]: '#b91c1c',
  [TileType.HedgeWall]: '#2d6338',
  [TileType.WoodFence]: '#8b5e34',
  [TileType.TownTree]: '#35733e',
  [TileType.FountainWater]: '#38bdf8',
  [TileType.FlowerBed]: '#db7093',
  [TileType.RoofRed]: '#b84237',
  [TileType.RoofBlue]: '#346199',
  [TileType.RoofEmerald]: '#297a58',
  [TileType.RoofGold]: '#c99732',
  [TileType.RoofSlate]: '#475569',
  [TileType.HouseWall]: '#dfd5be',
  [TileType.HouseDoor]: '#6b4423',
  [TileType.StonePillar]: '#cbd5e1',
  [TileType.ServerRack]: '#1e293b',
  [TileType.CrystalShrine]: '#38bdf8',
  [TileType.CrateDeck]: '#9c6e3b',
  [TileType.TorchPost]: '#f59e0b',
};

export const WorldMapModal: React.FC<WorldMapModalProps> = ({
  saveState,
  dbVersion = 0,
  onFastTravel,
  onClose,
}) => {
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const allZonas = useMemo(() => getAllZonas(), [dbVersion]);

  useEffect(() => {
    const c = mapCanvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const world = buildWorldData();
    const scale = 3; // 480x480
    ctx.fillStyle = '#0d111a';
    ctx.fillRect(0, 0, WORLD_W * scale, WORLD_H * scale);

    // Draw terrain
    for (let y = 0; y < WORLD_H; y++) {
      for (let x = 0; x < WORLD_W; x++) {
        const t = world.tiles[y * WORLD_W + x] as TileType;
        ctx.fillStyle = TILE_MINI_COLOR[t] || '#4b5563';
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }

    // Fog-of-war veil (semi-transparent so player still sees general kingdom geography!)
    const explored = new Set(saveState.exploredChunks);
    ctx.fillStyle = 'rgba(10, 13, 20, 0.58)';
    for (let cy = 0; cy < WORLD_H / 4; cy++) {
      for (let cx = 0; cx < WORLD_W / 4; cx++) {
        if (!explored.has(`${cx},${cy}`)) {
          ctx.fillRect(cx * 4 * scale, cy * 4 * scale, 4 * scale, 4 * scale);
        }
      }
    }

    // Region borders and names
    ctx.font = '700 12px "Cinzel", serif';
    ctx.textAlign = 'center';
    for (const r of REGIONS) {
      ctx.strokeStyle = r.accentColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(
        r.bounds.x * scale,
        r.bounds.y * scale,
        r.bounds.w * scale,
        r.bounds.h * scale
      );
      const cx = (r.bounds.x + r.bounds.w / 2) * scale;
      const cy = (r.bounds.y + 6) * scale;
      ctx.fillStyle = 'rgba(12, 15, 22, 0.85)';
      ctx.fillRect(cx - 72, cy - 12, 144, 17);
      ctx.fillStyle = r.accentColor;
      ctx.fillText(r.nome, cx, cy + 1);
    }

    // Region Bosses
    for (const en of world.enemies) {
      if (!en.isBoss) continue;
      const beaten = saveState.defeatedBosses.includes(en.id);
      ctx.fillStyle = beaten ? '#4ade80' : '#ef4444';
      ctx.beginPath();
      ctx.arc(en.x * scale, en.y * scale, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Hero Marker
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(saveState.heroX * scale, saveState.heroY * scale, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#14110b';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [saveState.exploredChunks, saveState.heroX, saveState.heroY, saveState.defeatedBosses, dbVersion]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="Mapa Mundial"
    >
      <div className="rpg-panel w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-[#3a352c] flex items-center justify-between bg-[#141721]">
          <div className="flex items-center gap-3">
            <MapIcon className="w-6 h-6 text-[#44b86b]" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#f4efe4]">Mapa do Mundo Aberto (160×160)</h2>
              <div className="text-xs text-[#cbd5e1]">
                Todas as 6 regiões e {allZonas.length} matérias estão abertas desde o início — caminhe ou clique em uma zona para viajar!
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar Mapa"
            className="p-2 bg-[#23283a] hover:bg-[#323a52] text-[#f4efe4] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          <div className="lg:col-span-7 p-4 flex flex-col items-center justify-center bg-[#0d111a] overflow-auto">
            <canvas
              ref={mapCanvasRef}
              width={WORLD_W * 3}
              height={WORLD_H * 3}
              className="max-w-full h-auto border-2 border-[#6e5c3e] pixelated"
            />
            <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-mono-num text-[#cbd5e1]">
              <span>Amarelo: Você</span>
              <span>·</span>
              <span>Vermelho: Boss da Região</span>
              <span>·</span>
              <span>Verde: Boss derrotado</span>
            </div>
          </div>

          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#2d3242] overflow-y-auto p-4 space-y-4">
            <h3 className="font-display text-sm font-bold text-[#e6b84c] uppercase tracking-wider">
              Viagem Rápida para Placas das Matérias
            </h3>
            {REGIONS.map((r) => {
              const rZonas = allZonas.filter((z) => z.regiaoId === r.id);
              return (
                <div key={r.id} className="space-y-1.5">
                  <div className="text-xs font-bold flex items-center justify-between" style={{ color: r.accentColor }}>
                    <span>{r.nome}</span>
                    <span className="font-mono-num text-[#94a3b8]">Nv. sugerido {r.nivelSugerido}</span>
                  </div>
                  <div className="space-y-1">
                    {rZonas.map((z) => (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => {
                          onFastTravel(z.signTile.x, z.signTile.y + 2, z.nome);
                          onClose();
                        }}
                        className="w-full text-left px-3 py-2 bg-[#161a26] hover:bg-[#23293b] border border-[#2d3448] hover:border-[#e6b84c] flex items-center justify-between gap-2 text-xs text-[#f4efe4] cursor-pointer"
                      >
                        <span className="truncate font-medium">{z.nome}</span>
                        <span className="flex items-center gap-1 text-[#7dd3fc] shrink-0 font-mono-num">
                          <Navigation className="w-3 h-3" />
                          Nv.{z.nivelSugerido}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
