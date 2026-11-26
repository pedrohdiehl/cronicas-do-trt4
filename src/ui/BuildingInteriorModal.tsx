import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Coins,
  Compass,
  DoorOpen,
  Flame,
  Gift,
  Heart,
  Lock,
  Shield,
  ShoppingBag,
  Sparkles,
  Swords,
  X,
  Zap,
} from 'lucide-react';
import { getNpcPortraitDataUrl } from '../entities/pixelSprites';
import { getSpriteAtlasRevision, subscribeSpriteAtlas } from '../entities/spriteSheetProcessor';
import {
  evaluateBuildingSecret,
  getAvailableStudyPoints,
  getBuildingFichasForGuide,
  type BuildingInteriorSpec,
  type InteriorTheme,
} from '../systems/buildings';
import { getFichaById } from '../systems/customDatabase';
import { ITEM_DEFS } from '../systems/gameLogic';
import type { Ficha, ItemId, SaveState } from '../types';
import { FichaApostilaView } from './FichaApostilaView';

interface BuildingInteriorModalProps {
  spec: BuildingInteriorSpec;
  saveState: SaveState;
  onRest: () => void;
  onBuyItem: (itemId: ItemId, cost: number) => void;
  onStartChallenge: (spec: BuildingInteriorSpec) => void;
  onClaimSecret: (spec: BuildingInteriorSpec) => void;
  onTrackNpc: (fichaId: string) => void;
  onClose: () => void;
}

const THEME_STYLES: Record<
  InteriorTheme,
  {
    wallGradient: string;
    floorColor: string;
    accent: string;
    badgeLabel: string;
    decorNote: string;
  }
> = {
  court: {
    wallGradient: 'linear-gradient(180deg, #1b2238 0%, #2b3554 68%, #473726 68%, #34271b 100%)',
    floorColor: '#6b5336',
    accent: '#e6b84c',
    badgeLabel: 'Salão Institucional · TRT4',
    decorNote: 'Colunas de mármore, brasão dourado e tribuna oficial',
  },
  library: {
    wallGradient: 'linear-gradient(180deg, #241914 0%, #3d281d 68%, #523b26 68%, #3d2c1c 100%)',
    floorColor: '#61462d',
    accent: '#f5d76e',
    badgeLabel: 'Acervo & Apostilas',
    decorNote: 'Estantes de madeira nobre iluminadas por lamparinas',
  },
  tavern: {
    wallGradient: 'linear-gradient(180deg, #291a14 0%, #472c1e 68%, #593b27 68%, #402a1b 100%)',
    floorColor: '#69472c',
    accent: '#fb923c',
    badgeLabel: 'Refúgio & Descanso',
    decorNote: 'Lareira acesa, chá quente e descanso completo',
  },
  forge: {
    wallGradient: 'linear-gradient(180deg, #1f1b24 0%, #362830 68%, #423532 68%, #2e2524 100%)',
    floorColor: '#4c3e3c',
    accent: '#f59e0b',
    badgeLabel: 'Oficina & Suprimentos',
    decorNote: 'Bancada de ferramentas, frascos e poções táticas',
  },
  vault: {
    wallGradient: 'linear-gradient(180deg, #151226 0%, #261e42 68%, #2d293d 68%, #1d1a29 100%)',
    floorColor: '#3a344d',
    accent: '#a78bfa',
    badgeLabel: 'Cofre & Auditoria',
    decorNote: 'Arcos de pedra rúnica, selos cifrados e relíquias',
  },
  datacenter: {
    wallGradient: 'linear-gradient(180deg, #0e1a2b 0%, #162c47 68%, #233042 68%, #182230 100%)',
    floorColor: '#2c3a4f',
    accent: '#38bdf8',
    badgeLabel: 'Centro Técnico & Infra',
    decorNote: 'Racks ativos, fibra ótica luminosa e terminais',
  },
  harbor: {
    wallGradient: 'linear-gradient(180deg, #132c42 0%, #1f4c6e 68%, #5c4329 68%, #42301d 100%)',
    floorColor: '#6e5030',
    accent: '#38bdf8',
    badgeLabel: 'Cais de Porto Babel',
    decorNote: 'Janelas para o mar, cartas náuticas e documentação RFC',
  },
};

const FN_TITLES: Record<BuildingInteriorSpec['fnType'], string> = {
  rest: 'Ponto de Descanso (Cura 100%)',
  shop: 'Loja de Suprimentos (Pontos de Estudo)',
  challenge: 'Desafio Relâmpago (3 Questões)',
  guide: 'Central de Apostilas & Dicas',
  secret: 'Missão Secreta do Prédio',
};

export const BuildingInteriorModal: React.FC<BuildingInteriorModalProps> = ({
  spec,
  saveState,
  onRest,
  onBuyItem,
  onStartChallenge,
  onClaimSecret,
  onTrackNpc,
  onClose,
}) => {
  const [atlasRev, setAtlasRev] = useState(() => getSpriteAtlasRevision());
  const [restedNow, setRestedNow] = useState(false);
  const [readingFichaId, setReadingFichaId] = useState<string | null>(null);

  useEffect(() => subscribeSpriteAtlas(() => setAtlasRev(getSpriteAtlasRevision())), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (readingFichaId) setReadingFichaId(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, readingFichaId]);

  const theme = THEME_STYLES[spec.interiorTheme] || THEME_STYLES.court;
  const hostPortraitUrl = useMemo(
    () => getNpcPortraitDataUrl(spec.hostRole, 0, 0, spec.hostName),
    [spec.hostRole, spec.hostName, atlasRev]
  );

  const studyPoints = useMemo(() => getAvailableStudyPoints(saveState), [saveState]);
  const guideFichas = useMemo(
    () => (spec.fnType === 'guide' ? getBuildingFichasForGuide(spec, saveState) : []),
    [spec, saveState]
  );
  const secretProgress = useMemo(
    () => (spec.fnType === 'secret' ? evaluateBuildingSecret(spec, saveState) : null),
    [spec, saveState]
  );
  const readingFicha: Ficha | null = useMemo(
    () => (readingFichaId ? getFichaById(readingFichaId) || null : null),
    [readingFichaId]
  );

  const studiedSet = useMemo(() => new Set(saveState.studiedFichas), [saveState.studiedFichas]);
  const duelWinsSet = useMemo(() => new Set(saveState.duelWins || []), [saveState.duelWins]);
  const needsRest = saveState.hp < saveState.maxHp || saveState.focus < saveState.maxFocus;

  // Inline Apostila reader mode when inspecting a ficha inside a Guide building
  if (readingFicha) {
    return (
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-5 bg-black/78"
        role="dialog"
        aria-modal="true"
        aria-label={`Apostila em ${spec.label}`}
      >
        <div className="rpg-panel w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#3a352c] bg-[#141721] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setReadingFichaId(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1b273b] hover:bg-[#243652] border border-[#38bdf8]/50 text-xs font-semibold text-[#e0f2fe] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para {spec.label}
            </button>
            <button
              type="button"
              onClick={() => {
                onTrackNpc(readingFicha.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#23283a] hover:bg-[#313850] border border-[#6e5c3e] text-xs font-semibold text-[#fde68a] cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              Rastrear {readingFicha.npcName} no Mapa
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0f121a]">
            <FichaApostilaView
              ficha={readingFicha}
              showHeader
              onOpenConnectedFicha={(targetId) => setReadingFichaId(targetId)}
              onTrackNpc={(targetId) => {
                onTrackNpc(targetId);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-5 bg-black/78"
      role="dialog"
      aria-modal="true"
      aria-label={`Interior de ${spec.label}`}
      data-testid="building-interior-modal"
    >
      <div className="rpg-panel w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* TOP SNES ARCHITECTURAL INTERIOR SCENE BANNER */}
        <div
          className="relative px-5 py-4 border-b-2 border-[#6e5c3e] overflow-hidden shrink-0"
          style={{ background: theme.wallGradient }}
        >
          {/* Decorative SNES interior architectural beams & windows */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-black/35" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-black/25 border-t border-white/10" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-2 border-[#c89d4c] bg-[#121622]/90 flex items-center justify-center p-1 shadow-lg">
                <img
                  src={hostPortraitUrl}
                  alt={`Anfitrião ${spec.hostName}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-num uppercase tracking-wide">
                  <span
                    className="px-2 py-0.5 bg-black/60 border"
                    style={{ borderColor: theme.accent, color: theme.accent }}
                  >
                    {theme.badgeLabel}
                  </span>
                  <span className="px-2 py-0.5 bg-black/55 border border-white/15 text-[#e5e0d5]">
                    {FN_TITLES[spec.fnType]}
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f7f3ea] mt-1 truncate">
                  {spec.label}
                </h2>
                <div className="text-xs sm:text-sm text-[#fde68a] font-medium">
                  {spec.hostName} <span className="text-[#94a3b8]">· {spec.hostTitle}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Sair do prédio"
              data-testid="building-close-btn"
              className="px-3 py-2 bg-[#141721]/90 hover:bg-[#23283a] border border-[#6e5c3e] text-xs font-semibold text-[#f4efe4] inline-flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <DoorOpen className="w-4 h-4 text-[#e6b84c]" />
              Sair
              <X className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
        </div>

        {/* INTERIOR CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#12151f]">
          {/* Host Speech Bubble + Grounded Study Tip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 p-4 bg-[#1a1f2e] border border-[#4a3e2b] space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#e6b84c]">
                {spec.hostName} diz:
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#f4efe4]">{spec.greeting}</p>
            </div>
            <div className="p-4 bg-[#172133] border border-[#38bdf8]/40 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#7dd3fc] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Dica de Prova FCC
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#e0f2fe]">{spec.studyTip}</p>
            </div>
          </div>

          {/* === 1. REST / HEAL FUNCTION === */}
          {spec.fnType === 'rest' && (
            <div className="p-5 bg-[#1a1c26] border-2 border-[#c89d4c]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="font-display text-lg font-bold text-[#fde68a] flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#fb923c]" />
                  Descanso Completo Gratuito
                </div>
                <p className="text-sm text-[#cbd5e1]">
                  Recupere 100% da sua Vida (HP) e Mana do Foco antes de explorar novas zonas ou enfrentar chefes.
                </p>
                <div className="flex flex-wrap gap-4 font-mono-num text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[#fca5a5]">
                    <Heart className="w-4 h-4 text-[#ef4444]" />
                    HP Atual: {Math.round(saveState.hp)} / {saveState.maxHp}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#7dd3fc]">
                    <Zap className="w-4 h-4 text-[#38bdf8]" />
                    Foco Atual: {Math.round(saveState.focus)} / {saveState.maxFocus}
                  </span>
                </div>
              </div>
              <button
                type="button"
                data-testid="building-rest-btn"
                onClick={() => {
                  onRest();
                  setRestedNow(true);
                }}
                className="px-6 py-3 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer shrink-0 whitespace-nowrap"
              >
                {restedNow || !needsRest ? '✓ Energia 100% Restaurada!' : 'Descansar & Restaurar 100%'}
              </button>
            </div>
          )}

          {/* === 2. STUDY POINTS SHOP FUNCTION === */}
          {spec.fnType === 'shop' && spec.shopOffers && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2c3347]">
                <div className="font-display text-lg font-bold text-[#f5d76e] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#e6b84c]" />
                  Balcão de Suprimentos de Estudo
                </div>
                <div
                  data-testid="building-study-points"
                  className="px-3 py-1.5 bg-[#1e2618] border border-[#4ade80]/60 font-mono-num text-sm font-bold text-[#bbf7d0] inline-flex items-center gap-1.5"
                >
                  <Coins className="w-4 h-4 text-[#fde047]" />
                  {studyPoints} Pontos de Estudo
                </div>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Seus Pontos de Estudo vêm das fichas estudadas e questões acertadas — gastar aqui nunca reduz seu XP nem seu Nível!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spec.shopOffers.map((offer) => {
                  const def = ITEM_DEFS[offer.itemId];
                  const owned = saveState.inventory[offer.itemId] || 0;
                  const canAfford = studyPoints >= offer.cost;
                  return (
                    <div
                      key={offer.itemId}
                      className="p-3.5 bg-[#191e2c] border border-[#343c52] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#f4efe4]">{def.nome}</span>
                          <span className="text-[11px] font-mono-num text-[#94a3b8]">
                            (Na bolsa: {owned})
                          </span>
                        </div>
                        <div className="text-xs text-[#cbd5e1]">{offer.note}</div>
                      </div>
                      <button
                        type="button"
                        disabled={!canAfford}
                        data-testid={`shop-buy-${offer.itemId}`}
                        onClick={() => onBuyItem(offer.itemId, offer.cost)}
                        className="px-3.5 py-2 bg-[#d9a441] hover:bg-[#e8b652] disabled:opacity-40 text-[#14110b] font-bold text-xs font-mono-num cursor-pointer disabled:cursor-not-allowed shrink-0"
                      >
                        {offer.cost} pts
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === 3. LIGHTNING CHALLENGE FUNCTION === */}
          {spec.fnType === 'challenge' && (
            <div className="p-5 bg-[#24161e] border-2 border-[#f59e0b]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="font-display text-lg font-bold text-[#fde68a] flex items-center gap-2">
                  <Swords className="w-5 h-5 text-[#f59e0b]" />
                  Desafio Relâmpago de {spec.label}
                </div>
                <p className="text-sm text-[#e5e0d5]">
                  Enfrente 3 questões rápidas extraídas exclusivamente das fichas desta disciplina. Cada resposta exibe o balão &ldquo;📜 Por quê?&rdquo; com a fonte literal!
                </p>
                <div className="text-xs font-mono-num text-[#86efac]">
                  Recompensa por vitória: +90 XP garantidos + 1×{' '}
                  {ITEM_DEFS[spec.challengeRewardItem || 'pocao_dica'].nome}
                </div>
              </div>
              <button
                type="button"
                data-testid="building-challenge-btn"
                onClick={() => onStartChallenge(spec)}
                className="px-6 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#14110b] font-bold text-sm inline-flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Swords className="w-4 h-4" />
                Iniciar Desafio (3 Questões)
              </button>
            </div>
          )}

          {/* === 4. TACTICAL GUIDE & DIRECT APOSTILA LIBRARY === */}
          {spec.fnType === 'guide' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2c3347]">
                <div className="font-display text-lg font-bold text-[#f5d76e] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#e6b84c]" />
                  Acervo de Apostilas da Disciplina ({guideFichas.length} fichas)
                </div>
                <div className="text-xs font-mono-num text-[#86efac]">
                  Estudadas: {guideFichas.filter((f) => studiedSet.has(f.id)).length} / {guideFichas.length}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {guideFichas.map((f) => {
                  const isStudied = studiedSet.has(f.id);
                  const isMastered = duelWinsSet.has(f.id);
                  return (
                    <div
                      key={f.id}
                      className="p-3 bg-[#191e2c] border border-[#31394f] flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-xs font-mono-num">
                          <span className={isMastered ? 'text-[#c084fc]' : isStudied ? 'text-[#4ade80]' : 'text-[#94a3b8]'}>
                            {isMastered ? '★ Dominada' : isStudied ? '✓ Estudada' : '○ Não vista'}
                          </span>
                          <span className="text-[#64748b]">·</span>
                          <span className="text-[#cbd5e1] truncate">{f.npcName}</span>
                        </div>
                        <div className="text-sm font-semibold text-[#f4efe4] truncate mt-0.5">{f.titulo}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setReadingFichaId(f.id)}
                          className="px-2.5 py-1.5 bg-[#252d42] hover:bg-[#323d59] border border-[#5c4d35] text-xs font-semibold text-[#fde68a] cursor-pointer"
                        >
                          Ler
                        </button>
                        <button
                          type="button"
                          title={`Rastrear ${f.npcName} no mapa`}
                          onClick={() => {
                            onTrackNpc(f.id);
                            onClose();
                          }}
                          className="p-1.5 bg-[#17283d] hover:bg-[#1f3754] border border-[#38bdf8]/50 text-[#7dd3fc] cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === 5. SECRET QUEST VAULT FUNCTION === */}
          {spec.fnType === 'secret' && spec.secretQuest && secretProgress && (
            <div className="p-5 bg-[#1b1629] border-2 border-[#a78bfa]/70 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-display text-lg font-bold text-[#e9d5ff] flex items-center gap-2">
                    {secretProgress.claimed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
                    ) : secretProgress.ready ? (
                      <Gift className="w-5 h-5 text-[#fde047]" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#a78bfa]" />
                    )}
                    Missão Secreta: {spec.secretQuest.title}
                  </div>
                  <p className="text-sm text-[#ddd6fe]">{spec.secretQuest.description}</p>
                </div>
                <div className="font-mono-num text-sm font-bold px-3 py-1 bg-black/50 border border-[#a78bfa]/60 text-[#fde68a]">
                  {secretProgress.current} / {secretProgress.target}
                </div>
              </div>

              <div className="h-3 bg-[#0f0c1a] border border-[#4c1d95]">
                <div
                  className="h-full bg-[#a855f7] transition-all duration-300"
                  style={{ width: `${Math.min(100, (secretProgress.current / secretProgress.target) * 100)}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono-num text-[#bbf7d0] flex flex-wrap items-center gap-2">
                  <Shield className="w-4 h-4 text-[#4ade80]" />
                  <span>
                    Recompensa: +{spec.secretQuest.rewardXp} XP +{' '}
                    {spec.secretQuest.rewardItems
                      .map((ri) => `${ri.qty}× ${ITEM_DEFS[ri.itemId].nome}`)
                      .join(' · ')}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!secretProgress.ready}
                  data-testid="building-claim-secret-btn"
                  onClick={() => onClaimSecret(spec)}
                  className="px-5 py-2.5 bg-[#a855f7] hover:bg-[#c084fc] disabled:opacity-40 text-white font-bold text-sm cursor-pointer disabled:cursor-not-allowed"
                >
                  {secretProgress.claimed
                    ? '✓ Recompensa Resgatada'
                    : secretProgress.ready
                      ? 'Resgatar Recompensa Secreta!'
                      : 'Continue Estudando para Desbloquear'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
