import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Compass, AlertTriangle, ArrowLeft, Swords } from 'lucide-react';
import { getNpcPortraitDataUrl } from '../entities/pixelSprites';
import { getSpriteAtlasRevision, subscribeSpriteAtlas } from '../entities/spriteSheetProcessor';
import { soundEngine } from '../systems/audio';
import { getFichaById } from '../systems/customDatabase';
import { buildNpcDialogue } from '../systems/gameLogic';
import type { Ficha, PlayerClass } from '../types';
import { FichaApostilaView } from './FichaApostilaView';

interface DialogueModalProps {
  ficha: Ficha;
  playerClass: PlayerClass;
  alreadyStudied: boolean;
  onComplete: (ficha: Ficha) => void;
  onStartDuel: (ficha: Ficha) => void;
  onTrackConnection: (targetFichaId: string) => void;
  onClose: () => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({
  ficha,
  playerClass,
  alreadyStudied,
  onComplete,
  onStartDuel,
  onTrackConnection,
  onClose,
}) => {
  const [atlasRev, setAtlasRev] = useState(() => getSpriteAtlasRevision());
  useEffect(() => subscribeSpriteAtlas(() => setAtlasRev(getSpriteAtlasRevision())), []);

  const bubbles = useMemo(() => buildNpcDialogue(ficha, playerClass), [ficha, playerClass]);
  const portraitUrl = useMemo(
    () => getNpcPortraitDataUrl(ficha.npcRole, ficha.npcSeed, 0, ficha.npcName),
    [ficha.npcRole, ficha.npcSeed, ficha.npcName, atlasRev]
  );

  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [showFullFicha, setShowFullFicha] = useState(false);
  const [previewFichaId, setPreviewFichaId] = useState<string | null>(null);

  const displayedFicha: Ficha = useMemo(() => {
    if (!previewFichaId) return ficha;
    return getFichaById(previewFichaId) || ficha;
  }, [previewFichaId, ficha]);

  const current = bubbles[bubbleIdx] || bubbles[0];
  const isFinishedTyping = visibleChars >= current.text.length;
  const isLastBubble = bubbleIdx >= bubbles.length - 1;

  // Typewriter animation
  useEffect(() => {
    setVisibleChars(0);
  }, [bubbleIdx, ficha.id]);

  useEffect(() => {
    if (visibleChars >= current.text.length) return;
    const timer = window.setTimeout(() => {
      setVisibleChars((c) => Math.min(current.text.length, c + 3));
      if (visibleChars % 9 === 0) soundEngine.playTypeBlip();
    }, 18);
    return () => clearTimeout(timer);
  }, [visibleChars, current.text.length]);

  const handleAdvance = () => {
    if (showFullFicha) return;
    if (!isFinishedTyping) {
      setVisibleChars(current.text.length);
      return;
    }
    if (!isLastBubble) {
      setBubbleIdx((i) => i + 1);
      soundEngine.playDialogOpen();
    } else {
      onComplete(ficha);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (showFullFicha) setShowFullFicha(false);
        else onClose();
      } else if (e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ') {
        if (!showFullFicha) {
          e.preventDefault();
          handleAdvance();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center p-4 sm:p-6 bg-black/55"
      role="dialog"
      aria-modal="true"
      aria-label={`Diálogo com ${ficha.npcName}`}
    >
      {showFullFicha ? (
        <div
          className="rpg-panel w-full max-w-4xl h-[88vh] flex flex-col my-auto overflow-hidden"
          data-testid="dialogue-full-ficha-modal"
        >
          <div className="px-5 py-3.5 border-b border-[#3a352c] bg-[#141721] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              {previewFichaId && previewFichaId !== ficha.id ? (
                <button
                  type="button"
                  onClick={() => setPreviewFichaId(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1b273b] hover:bg-[#243652] border border-[#38bdf8]/50 text-xs font-semibold text-[#e0f2fe] cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar à ficha de {ficha.npcName}
                </button>
              ) : (
                <div className="text-xs text-[#cbd5e1] truncate">
                  <span className="text-[#e6b84c] font-semibold">{ficha.materia}</span>
                  <span className="mx-1.5 text-[#64748b]">·</span>
                  <span>Aula de {ficha.npcName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setPreviewFichaId(null);
                  setShowFullFicha(false);
                }}
                className="px-3.5 py-2 bg-[#262b3d] hover:bg-[#323952] text-xs sm:text-sm font-semibold text-[#f4efe4] cursor-pointer"
              >
                Voltar ao Diálogo
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0f121a]">
            <FichaApostilaView
              ficha={displayedFicha}
              showHeader
              onOpenConnectedFicha={(targetId) => setPreviewFichaId(targetId)}
              onTrackNpc={
                previewFichaId && previewFichaId !== ficha.id
                  ? (targetId) => {
                      onTrackConnection(targetId);
                    }
                  : undefined
              }
            />
          </div>
        </div>
      ) : (
        <div
          className={`w-full max-w-4xl p-5 sm:p-6 ${
            current.isOracle ? 'bg-[#241b12] border-2 border-[#d97706]' : 'rpg-panel-warm'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
            {/* Pixel Art NPC Portrait */}
            <div className="shrink-0 flex sm:flex-col items-center gap-3">
              <div className="w-24 h-24 border-2 border-[#8a6c3b] bg-[#141721] overflow-hidden flex items-center justify-center p-1">
                <img
                  src={portraitUrl}
                  alt={`Retrato de ${ficha.npcName}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs font-mono-num text-[#a8a29e]">
                {bubbleIdx + 1} / {bubbles.length}
              </div>
            </div>

            {/* Speech Bubble Body */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="font-display text-lg font-bold text-[#f5d76e]">
                    {current.speaker}
                  </span>
                  <span className="mx-2 text-[#6e5c3e]">·</span>
                  <span className="text-xs font-semibold text-[#cbd5e1]">{current.tag}</span>
                </div>
                <span className="text-xs font-mono-num text-[#a8a29e]">
                  [[{ficha.id}]]
                </span>
              </div>

              {/* Typewriter Dialogue Text (>= 16px readable!) */}
              <div
                onClick={handleAdvance}
                className="min-h-[84px] text-base sm:text-lg leading-relaxed text-[#f7f3ea] cursor-pointer"
              >
                {current.isOracle && (
                  <AlertTriangle className="inline w-5 h-5 mr-2 text-[#f59e0b] -mt-1" />
                )}
                {current.text.slice(0, visibleChars)}
                {!isFinishedTyping && <span className="inline-block w-2 h-4 bg-[#e6b84c] ml-1 align-middle" />}
              </div>

              {/* Connection Quest Buttons when on the "Isso se conecta com..." bubble */}
              {current.connections && current.connections.length > 0 && isFinishedTyping && (
                <div className="pt-2 border-t border-[#3a3226] space-y-1.5">
                  <div className="text-xs font-semibold text-[#7dd3fc]">
                    Clique para rastrear a missão de conexão no mapa:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.connections.map((conn) => (
                      <button
                        key={conn.id}
                        type="button"
                        onClick={() => onTrackConnection(conn.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1b273b] hover:bg-[#243652] border border-[#38bdf8]/50 text-xs font-semibold text-[#e0f2fe] cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
                        Falar com {conn.npcName} ({conn.titulo.slice(0, 26)})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#3a3226]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFullFicha(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#23283a] hover:bg-[#2f364f] border border-[#5c4d35] text-sm font-semibold text-[#f4efe4] cursor-pointer whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-[#e6b84c]" />
                    Ver ficha completa
                  </button>
                  <button
                    type="button"
                    data-testid="start-npc-duel-btn"
                    onClick={() => onStartDuel(ficha)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#361c24] hover:bg-[#4d2732] border border-[#f59e0b]/70 text-sm font-semibold text-[#fde68a] cursor-pointer whitespace-nowrap"
                  >
                    <Swords className="w-4 h-4 text-[#f59e0b]" />
                    Duelar com {ficha.npcName}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 text-sm text-[#a8a29e] hover:text-[#f4efe4] cursor-pointer"
                  >
                    Fechar (Esc)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdvance}
                  className="px-5 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer whitespace-nowrap"
                >
                  {!isFinishedTyping
                    ? 'Acelerar [E]'
                    : isLastBubble
                      ? alreadyStudied
                        ? 'Concluir Revisão [E]'
                        : 'Concluir Aula + Pergaminho [E]'
                      : 'Continuar [E]'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
