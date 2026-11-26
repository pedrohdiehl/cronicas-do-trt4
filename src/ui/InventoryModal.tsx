import React from 'react';
import { Backpack, Key, Sparkles, Shield, Search, Heart, Zap, Scroll, X } from 'lucide-react';
import { REGIONS } from '../data/content';
import { ITEM_DEFS } from '../systems/gameLogic';
import type { ItemId, SaveState } from '../types';

interface InventoryModalProps {
  saveState: SaveState;
  onUseFieldItem: (itemId: 'pocao_vida' | 'elixir_foco') => void;
  onEquipCosmetic: (cosmeticId: string | null) => void;
  onClose: () => void;
}

const ITEM_ICONS: Record<ItemId, React.ReactNode> = {
  pocao_dica: <Sparkles className="w-5 h-5 text-[#38bdf8]" />,
  escudo_recurso: <Shield className="w-5 h-5 text-[#f59e0b]" />,
  lupa_fonte: <Search className="w-5 h-5 text-[#a78bfa]" />,
  pocao_vida: <Heart className="w-5 h-5 text-[#ef4444]" />,
  elixir_foco: <Zap className="w-5 h-5 text-[#34d399]" />,
};

export const InventoryModal: React.FC<InventoryModalProps> = ({
  saveState,
  onUseFieldItem,
  onEquipCosmetic,
  onClose,
}) => {
  const itemIds: ItemId[] = ['pocao_dica', 'escudo_recurso', 'lupa_fonte', 'pocao_vida', 'elixir_foco'];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="Inventário do Herói"
    >
      <div className="rpg-panel w-full max-w-4xl max-h-[86vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-[#3a352c] flex items-center justify-between bg-[#141721]">
          <div className="flex items-center gap-3">
            <Backpack className="w-6 h-6 text-[#38bdf8]" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#f4efe4]">Bolsa de Estudos</h2>
              <div className="text-xs font-mono-num text-[#cbd5e1]">
                Pergaminhos de Conexão: {saveState.collectedScrolls.length} · Chaves de Região: {saveState.regionKeys.length}/{REGIONS.length}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar Inventário"
            className="p-2 bg-[#23283a] hover:bg-[#323a52] text-[#f4efe4] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Consumables */}
          <section className="space-y-3">
            <h3 className="font-display text-sm font-bold text-[#e6b84c] uppercase tracking-wider">
              Poções e Relíquias
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {itemIds.map((id) => {
                const def = ITEM_DEFS[id];
                const qty = saveState.inventory[id] || 0;
                const canUseNow =
                  (id === 'pocao_vida' && qty > 0 && saveState.hp < saveState.maxHp) ||
                  (id === 'elixir_foco' && qty > 0 && saveState.focus < saveState.maxFocus);

                return (
                  <div
                    key={id}
                    className="p-3.5 bg-[#131722] border border-[#31384d] flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-[#1b2030] border border-[#3d455e] shrink-0">
                        {ITEM_ICONS[id]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#f4efe4] flex items-center gap-2">
                          <span>{def.nome}</span>
                          <span className="font-mono-num text-xs text-[#f5d76e]">×{qty}</span>
                        </div>
                        <p className="text-xs text-[#a8a29e] mt-0.5">{def.descricao}</p>
                      </div>
                    </div>
                    {(id === 'pocao_vida' || id === 'elixir_foco') && (
                      <button
                        type="button"
                        disabled={!canUseNow}
                        onClick={() => onUseFieldItem(id)}
                        className="px-3 py-1.5 bg-[#d9a441] hover:bg-[#e8b652] disabled:opacity-35 text-[#14110b] text-xs font-bold cursor-pointer disabled:cursor-not-allowed shrink-0"
                      >
                        Usar
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Pergaminhos de Conexão Summary Card */}
              <div className="p-3.5 bg-[#131722] border border-[#31384d] flex items-start gap-3">
                <div className="p-2.5 bg-[#1b2030] border border-[#3d455e] shrink-0">
                  <Scroll className="w-5 h-5 text-[#e6b84c]" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#f4efe4] flex items-center gap-2">
                    <span>Pergaminho de Conexão</span>
                    <span className="font-mono-num text-xs text-[#f5d76e]">×{saveState.collectedScrolls.length}</span>
                  </div>
                  <p className="text-xs text-[#a8a29e] mt-0.5">
                    Recebidos ao concluir aulas com NPCs. Complete conjuntos no Grimório para concluir Pontes!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Region Keys & Cosmetic Capes */}
          <section className="space-y-3">
            <h3 className="font-display text-sm font-bold text-[#e6b84c] uppercase tracking-wider">
              Chaves de Região e Cosméticos (Mantos do Herói)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {REGIONS.map((r) => {
                const hasKey = saveState.regionKeys.includes(r.id);
                const hasCosmetic = saveState.unlockedCosmetics.includes(r.cosmeticReward.id);
                const equipped = saveState.equippedCosmetic === r.cosmeticReward.id;
                return (
                  <div
                    key={r.id}
                    className="p-3.5 bg-[#131722] border border-[#31384d] space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold" style={{ color: r.accentColor }}>
                        {r.nome}
                      </span>
                      <span className="font-mono-num flex items-center gap-1 text-[#cbd5e1]">
                        <Key className="w-3.5 h-3.5 text-[#f5d76e]" />
                        {hasKey ? 'Chave obtida' : 'Sem chave'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-5 h-5 border border-white/30 shrink-0"
                        style={{ backgroundColor: r.cosmeticReward.color }}
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#f4efe4] truncate">
                          {r.cosmeticReward.name}
                        </div>
                        <div className="text-[11px] text-[#94a3b8]">
                          {hasCosmetic ? 'Desbloqueado no Baú Real' : 'Derrote o Boss e abra o Baú Real'}
                        </div>
                      </div>
                    </div>
                    {hasCosmetic && (
                      <button
                        type="button"
                        onClick={() => onEquipCosmetic(equipped ? null : r.cosmeticReward.id)}
                        className={`w-full py-1.5 text-xs font-bold cursor-pointer ${
                          equipped
                            ? 'bg-[#262c3f] border border-[#e6b84c] text-[#f5d76e]'
                            : 'bg-[#d9a441] text-[#14110b]'
                        }`}
                      >
                        {equipped ? 'Equipado (Remover)' : 'Equipar Manto'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
