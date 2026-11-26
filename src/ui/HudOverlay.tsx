import React, { useEffect, useRef } from 'react';
import { BookOpen, Backpack, Map as MapIcon, Pause, Volume2, VolumeX, Compass, Database, Music, Sparkles } from 'lucide-react';
import { REGIONS } from '../data/content';
import { getFichaById } from '../systems/customDatabase';
import { CLASS_INFO, xpNeededForLevel } from '../systems/gameLogic';
import type { RegionInfo, SaveState, ZonaInfo } from '../types';
import { buildWorldData, WORLD_H, WORLD_W } from '../world/worldMap';

interface HudOverlayProps {
  saveState: SaveState;
  dbVersion?: number;
  currentRegion: RegionInfo;
  currentZona: ZonaInfo | null;
  activeTrackTitle?: string;
  nearPrompt: string | null;
  trackedFichaId: string | null;
  toastMessage: string | null;
  onOpenGrimorio: () => void;
  onOpenInventory: () => void;
  onOpenMap: () => void;
  onOpenDatabase: () => void;
  onOpenFairy: () => void;
  onOpenPause: () => void;
  onToggleMute: () => void;
  onClearTracked: () => void;
  onTouchJoystick: (vx: number, vy: number) => void;
  onTouchInteract: () => void;
}

export const HudOverlay: React.FC<HudOverlayProps> = ({
  saveState,
  dbVersion = 0,
  currentRegion,
  currentZona,
  activeTrackTitle,
  nearPrompt,
  trackedFichaId,
  toastMessage,
  onOpenGrimorio,
  onOpenInventory,
  onOpenMap,
  onOpenDatabase,
  onOpenFairy,
  onOpenPause,
  onToggleMute,
  onClearTracked,
  onTouchJoystick,
  onTouchInteract,
}) => {
  const miniRef = useRef<HTMLCanvasElement | null>(null);
  const joyOriginRef = useRef<{ x: number; y: number } | null>(null);
  const xpReq = xpNeededForLevel(saveState.level);
  const trackedFicha = trackedFichaId ? getFichaById(trackedFichaId) : null;
  const dueResurgentsCount = Object.keys(saveState.spacedRep).length;

  // Draw crisp live corner minimap with fog-of-war!
  useEffect(() => {
    const c = miniRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const w = c.width;
    const h = c.height;
    ctx.fillStyle = '#0d111a';
    ctx.fillRect(0, 0, w, h);

    // Paint explored region blocks
    const explored = new Set(saveState.exploredChunks);
    for (const r of REGIONS) {
      ctx.fillStyle = `${r.accentColor}44`;
      ctx.fillRect(
        (r.bounds.x / WORLD_W) * w,
        (r.bounds.y / WORLD_H) * h,
        (r.bounds.w / WORLD_W) * w,
        (r.bounds.h / WORLD_H) * h
      );
    }

    // Fog overlay for unexplored chunks
    const cw = (4 / WORLD_W) * w;
    const ch = (4 / WORLD_H) * h;
    ctx.fillStyle = 'rgba(10, 12, 18, 0.84)';
    for (let cy = 0; cy < WORLD_H / 4; cy++) {
      for (let cx = 0; cx < WORLD_W / 4; cx++) {
        if (!explored.has(`${cx},${cy}`)) {
          ctx.fillRect(cx * cw, cy * ch, cw + 0.5, ch + 0.5);
        }
      }
    }

    // Boss dots
    const world = buildWorldData();
    for (const en of world.enemies) {
      if (!en.isBoss) continue;
      if (saveState.defeatedBosses.includes(en.id)) continue;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect((en.x / WORLD_W) * w - 2, (en.y / WORLD_H) * h - 2, 4, 4);
    }

    // Tracked NPC dot
    if (trackedFichaId) {
      const npc = world.npcs.find((n) => n.id === trackedFichaId);
      if (npc) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect((npc.x / WORLD_W) * w - 2, (npc.y / WORLD_H) * h - 2, 5, 5);
      }
    }

    // Hero marker
    ctx.fillStyle = '#fde047';
    ctx.fillRect((saveState.heroX / WORLD_W) * w - 2.5, (saveState.heroY / WORLD_H) * h - 2.5, 5, 5);
  }, [saveState.heroX, saveState.heroY, saveState.exploredChunks, saveState.defeatedBosses, trackedFichaId, dbVersion]);

  const hpPct = Math.max(0, Math.min(100, Math.round((saveState.hp / saveState.maxHp) * 100)));
  const focusPct = Math.max(0, Math.min(100, Math.round((saveState.focus / saveState.maxFocus) * 100)));
  const xpPct = Math.max(0, Math.min(100, Math.round((saveState.xp / xpReq) * 100)));

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-3 sm:p-4">
      {/* TOP PERIMETER BAR */}
      <div className="flex items-start justify-between gap-3">
        {/* Top-Left: Hero Vitality, Focus, Level & Class Cluster */}
        <div className="rpg-panel px-3.5 py-2.5 pointer-events-auto min-w-[232px] max-w-[280px]">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <span className="font-display text-sm font-bold text-[#f5e6c8] truncate">
              {CLASS_INFO[saveState.playerClass].nome}
            </span>
            <span className="font-mono-num text-xs font-bold text-[#e6b84c] shrink-0">
              NV {saveState.level}
            </span>
          </div>

          {/* HP Bar */}
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[11px] font-mono-num text-[#fca5a5] mb-0.5">
                <span>HP</span>
                <span>{Math.round(saveState.hp)}/{saveState.maxHp}</span>
              </div>
              <div className="h-2 bg-[#2b181b] border border-[#592b32] overflow-hidden">
                <div
                  className="h-full bg-[#dc2626] transition-transform duration-200 origin-left"
                  style={{ transform: `scaleX(${hpPct / 100})` }}
                />
              </div>
            </div>

            {/* Focus Mana Bar */}
            <div>
              <div className="flex justify-between text-[11px] font-mono-num text-[#7dd3fc] mb-0.5">
                <span>FOCO</span>
                <span>{Math.round(saveState.focus)}/{saveState.maxFocus}</span>
              </div>
              <div className="h-2 bg-[#142334] border border-[#24496e] overflow-hidden">
                <div
                  className="h-full bg-[#0ea5e9] transition-transform duration-200 origin-left"
                  style={{ transform: `scaleX(${focusPct / 100})` }}
                />
              </div>
            </div>

            {/* XP Bar */}
            <div>
              <div className="flex justify-between text-[11px] font-mono-num text-[#fde68a] mb-0.5">
                <span>XP</span>
                <span>{saveState.xp}/{xpReq}</span>
              </div>
              <div className="h-1.5 bg-[#2a2417] border border-[#5c4a26] overflow-hidden">
                <div
                  className="h-full bg-[#e6b84c] transition-transform duration-200 origin-left"
                  style={{ transform: `scaleX(${xpPct / 100})` }}
                />
              </div>
            </div>
          </div>

          {dueResurgentsCount > 0 && (
            <div className="mt-2 pt-1.5 border-t border-[#2c3245] text-[11px] text-[#d8b4fe] font-mono-num">
              Revisão ativa: {dueResurgentsCount} ressurgido(s)
            </div>
          )}
        </div>

        {/* Top-Center: Active Region & Zone Location Banner */}
        <div className="hidden md:flex flex-col items-center rpg-panel-warm px-5 py-2 text-center">
          <div
            className="font-display text-sm font-bold tracking-wide"
            style={{ color: currentRegion.accentColor }}
          >
            {currentRegion.nome}
          </div>
          <div className="text-xs text-[#d6cfc0]">
            {currentZona
              ? `${currentZona.nome} · Nv. sugerido ${currentZona.nivelSugerido}`
              : currentRegion.subtitulo}
          </div>
          {activeTrackTitle && (
            <div className="mt-0.5 flex items-center gap-1 text-[11px] font-mono-num text-[#a8a29e]">
              <Music className="w-3 h-3 text-[#e6b84c]" />
              <span>{saveState.settings.muted ? `${activeTrackTitle} (mudo)` : activeTrackTitle}</span>
            </div>
          )}
        </div>

        {/* Top-Right: Minimap + Compact Utility Shortcuts */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              tabIndex={-1}
              data-testid="open-fairy-btn"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenFairy();
              }}
              aria-label="Falar com a Fadinha Guia Lumina (F)"
              title="Fadinha Guia Lumina com IA (F)"
              className="rpg-panel px-2.5 py-2 flex items-center gap-1.5 text-xs font-semibold text-[#e0f2fe] border-[#38bdf8]/70 hover:border-[#fde047] cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#fde047]" />
              <span className="hidden sm:inline">Lumina</span>
              <span className="font-mono-num text-[10px] text-[#7dd3fc]">[F]</span>
            </button>

            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenGrimorio();
              }}
              aria-label="Abrir Grimório (G)"
              title="Grimório (G)"
              className="rpg-panel px-2.5 py-2 flex items-center gap-1.5 text-xs font-semibold text-[#f4efe4] hover:border-[#e6b84c] cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-[#e6b84c]" />
              <span className="hidden sm:inline">Grimório</span>
              <span className="font-mono-num text-[10px] text-[#a8a29e]">[G]</span>
            </button>

            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenInventory();
              }}
              aria-label="Abrir Inventário (I)"
              title="Inventário (I)"
              className="rpg-panel px-2.5 py-2 flex items-center gap-1.5 text-xs font-semibold text-[#f4efe4] hover:border-[#e6b84c] cursor-pointer whitespace-nowrap"
            >
              <Backpack className="w-4 h-4 text-[#38bdf8]" />
              <span className="hidden sm:inline">Bolsa</span>
              <span className="font-mono-num text-[10px] text-[#a8a29e]">[I]</span>
            </button>

            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenMap();
              }}
              aria-label="Abrir Mapa Mundial (M)"
              title="Mapa Mundial (M)"
              className="rpg-panel px-2.5 py-2 flex items-center gap-1.5 text-xs font-semibold text-[#f4efe4] hover:border-[#e6b84c] cursor-pointer whitespace-nowrap"
            >
              <MapIcon className="w-4 h-4 text-[#44b86b]" />
              <span className="hidden sm:inline">Mapa</span>
              <span className="font-mono-num text-[10px] text-[#a8a29e]">[M]</span>
            </button>

            <button
              type="button"
              tabIndex={-1}
              data-testid="open-db-btn"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenDatabase();
              }}
              aria-label="Editar Base de Estudo (B)"
              title="Adicionar Disciplinas, Temas e Perguntas (B)"
              className="rpg-panel px-2.5 py-2 flex items-center gap-1.5 text-xs font-semibold text-[#f4efe4] hover:border-[#e6b84c] cursor-pointer whitespace-nowrap"
            >
              <Database className="w-4 h-4 text-[#c084fc]" />
              <span className="hidden sm:inline">Base</span>
              <span className="font-mono-num text-[10px] text-[#a8a29e]">[B]</span>
            </button>

            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.currentTarget.blur();
                onToggleMute();
              }}
              aria-label={saveState.settings.muted ? 'Ativar som' : 'Silenciar som'}
              title="Som / Mudo"
              className="rpg-panel p-2 text-[#f4efe4] hover:border-[#e6b84c] cursor-pointer"
            >
              {saveState.settings.muted ? (
                <VolumeX className="w-4 h-4 text-[#ef4444]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#e6b84c]" />
              )}
            </button>

            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenPause();
              }}
              aria-label="Pausar jogo (Esc)"
              title="Pausa / Configurações (Esc)"
              className="rpg-panel p-2 text-[#f4efe4] hover:border-[#e6b84c] cursor-pointer"
            >
              <Pause className="w-4 h-4 text-[#f4efe4]" />
            </button>
          </div>

          {/* Clickable Corner Minimap */}
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.currentTarget.blur();
              onOpenMap();
            }}
            aria-label="Expandir minimapa"
            className="rpg-panel p-1 cursor-pointer hover:border-[#e6b84c] hidden sm:block"
          >
            <canvas
              ref={miniRef}
              width={136}
              height={136}
              className="block pixelated"
            />
          </button>
        </div>
      </div>

      {/* CENTER-TOP TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 rpg-panel-warm px-5 py-2.5 text-sm font-semibold text-[#fde68a] shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* BOTTOM PERIMETER: Tracked Quest + Nearby Action Prompt + Touch Controls */}
      <div className="flex items-end justify-between gap-4">
        {/* Bottom-Left: Tracked Connection Quest OR Touch Joystick */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {trackedFicha && (
            <div className="rpg-panel px-3.5 py-2 max-w-xs flex items-center gap-2.5 text-xs">
              <Compass className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <div className="min-w-0">
                <div className="text-[#7dd3fc] font-semibold">Missão de Conexão</div>
                <div className="text-[#f4efe4] truncate">
                  Falar com {trackedFicha.npcName} ({trackedFicha.materia})
                </div>
              </div>
              <button
                type="button"
                onClick={onClearTracked}
                aria-label="Limpar missão rastreada"
                className="text-[#9ca3af] hover:text-white px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Mobile / Touch Virtual Joystick */}
          <div
            className="sm:hidden w-28 h-28 rounded-full border-2 border-[#6e5c3e] bg-[#141721]/80 flex items-center justify-center touch-none"
            onTouchStart={(e) => {
              const t = e.touches[0];
              joyOriginRef.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchMove={(e) => {
              const t = e.touches[0];
              const o = joyOriginRef.current;
              if (!o) return;
              const dx = Math.max(-1, Math.min(1, (t.clientX - o.x) / 36));
              const dy = Math.max(-1, Math.min(1, (t.clientY - o.y) / 36));
              onTouchJoystick(dx, dy);
            }}
            onTouchEnd={() => {
              joyOriginRef.current = null;
              onTouchJoystick(0, 0);
            }}
          >
            <div className="w-10 h-10 rounded-full bg-[#d9a441]/85 border border-[#f5e6c8]" />
          </div>
        </div>

        {/* Bottom-Center: Nearby Interactable Prompt */}
        {nearPrompt && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.currentTarget.blur();
              onTouchInteract();
            }}
            className="pointer-events-auto rpg-panel-warm px-4 py-2 text-sm font-semibold text-[#f5e6c8] hover:border-[#f5d76e] cursor-pointer"
          >
            {nearPrompt}
          </button>
        )}

        {/* Bottom-Right: Mobile Touch Action Button */}
        <div className="sm:hidden pointer-events-auto">
          <button
            type="button"
            onClick={onTouchInteract}
            className="w-16 h-16 rounded-full bg-[#d9a441] border-2 border-[#f5e6c8] text-[#14110b] font-bold text-sm shadow-lg"
          >
            Ação
          </button>
        </div>
      </div>
    </div>
  );
};
