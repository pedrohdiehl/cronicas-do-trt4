import React, { useEffect } from 'react';
import { Database, Sparkles } from 'lucide-react';
import { CLASS_INFO, getFichasForClass, getQuestionsForClass } from '../systems/gameLogic';
import type { PlayerClass } from '../types';

interface TitleScreenProps {
  selectedClass: PlayerClass;
  hasExistingSave: boolean;
  dbVersion?: number;
  modalBlocking?: boolean;
  onSelectClass: (cls: PlayerClass) => void;
  onStartNew: (cls: PlayerClass) => void;
  onContinue: () => void;
  onOpenDatabase: () => void;
  onOpenTutorial: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  selectedClass,
  hasExistingSave,
  dbVersion = 0,
  modalBlocking = false,
  onSelectClass,
  onStartNew,
  onContinue,
  onOpenDatabase,
  onOpenTutorial,
}) => {
  // Bind Enter / Space in 'title' state to trigger Start immediately (unless DB modal is open)
  useEffect(() => {
    if (modalBlocking) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (hasExistingSave) onContinue();
        else onStartNew(selectedClass);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasExistingSave, onContinue, onStartNew, selectedClass, modalBlocking]);

  // Keep dbVersion referenced so lint & renders refresh live counts cleanly
  void dbVersion;

  const classes: PlayerClass[] = ['tecnico', 'analista', 'dupla'];

  return (
    <div
      className="fixed inset-0 z-20 flex flex-col justify-between p-6 md:p-10"
      style={{
        background:
          'linear-gradient(90deg, rgba(11,14,22,0.92) 0%, rgba(11,14,22,0.82) 52%, rgba(11,14,22,0.34) 100%)',
      }}
    >
      {/* Left/Center Main Stage over 40% dark negative space, letting live world tour shine on the right */}
      <div className="my-auto max-w-2xl space-y-6">
        {/* Custom Inline SVG Fantasy Crest & Title Lockup */}
        <div className="space-y-2">
          <svg
            viewBox="0 0 540 96"
            className="w-full max-w-[500px] h-auto"
            role="img"
            aria-label="Crônicas do TRT4"
          >
            {/* Medieval Gold Crest Shield */}
            <g transform="translate(6, 8)">
              <path
                d="M36 4 L66 16 V44 C66 64 52 76 36 82 C20 76 6 64 6 44 V16 Z"
                fill="#1d2233"
                stroke="#e6b84c"
                strokeWidth="3.5"
              />
              <path
                d="M36 12 L58 21 V43 C58 58 47 68 36 73 C25 68 14 58 14 43 V21 Z"
                fill="#27324f"
                stroke="#9c7840"
                strokeWidth="1.5"
              />
              {/* Balance of Justice + Code Rune */}
              <path d="M36 24 V56 M24 34 H48 M24 34 L19 46 H29 Z M48 34 L43 46 H53 Z" stroke="#f5d76e" strokeWidth="2.4" fill="none" />
              <rect x="31" y="56" width="10" height="4" fill="#f5d76e" />
            </g>
            {/* Title Lockup */}
            <text
              x="92"
              y="48"
              fill="#f5e6c8"
              fontFamily="Cinzel, Georgia, serif"
              fontSize="37"
              fontWeight="800"
              letterSpacing="1.5"
            >
              CRÔNICAS DO TRT4
            </text>
            <line x1="92" y1="60" x2="495" y2="60" stroke="#c89d4c" strokeWidth="2" />
            <text
              x="92"
              y="81"
              fill="#cbd5e1"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="14"
              fontWeight="600"
              letterSpacing="0.8"
            >
              RPG 2D DE ESTUDO · BANCA FCC · PROVA 31/01/2027
            </text>
          </svg>
        </div>

        {/* Class Selector — filters all NPCs, questions, Grimório & Bosses */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#d4c8b0]">
            Escolha sua classe para filtrar o conteúdo do edital:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {classes.map((cls) => {
              const info = CLASS_INFO[cls];
              const active = selectedClass === cls;
              const nFichas = getFichasForClass(cls).length;
              const nQuestoes = getQuestionsForClass(cls).length;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => onSelectClass(cls)}
                  aria-pressed={active}
                  className={`text-left p-4 transition-transform duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#f5d76e] ${
                    active
                      ? 'bg-[#23283a] border-2 border-[#e6b84c] -translate-y-0.5'
                      : 'bg-[#151822]/95 border border-[#3a352c] hover:border-[#8a6c3b]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display text-base font-bold text-[#f4efe4]">
                      {info.nome}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#cbd5e1] mb-2">{info.subtitulo}</div>
                  <div className="text-xs text-[#a8a29e] leading-relaxed mb-3">
                    {info.descricao}
                  </div>
                  <div className="font-mono-num text-xs text-[#e6b84c] pt-2 border-t border-[#2e3345]">
                    {nFichas} fichas · {nQuestoes} questões
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Action CTAs (<= 3 actions total) */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {hasExistingSave ? (
            <>
              <button
                type="button"
                data-start="true"
                onClick={onContinue}
                className="px-7 py-3.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-base tracking-wide cursor-pointer transition-colors whitespace-nowrap"
              >
                Continuar Jornada
              </button>
              <button
                type="button"
                onClick={() => onStartNew(selectedClass)}
                className="px-5 py-3.5 bg-[#1e2333] hover:bg-[#2a3147] border border-[#6e5c3e] text-[#f4efe4] font-semibold text-sm cursor-pointer transition-colors whitespace-nowrap"
              >
                Novo Jogo ({CLASS_INFO[selectedClass].nome})
              </button>
            </>
          ) : (
            <button
              type="button"
              data-start="true"
              onClick={() => onStartNew(selectedClass)}
              className="px-8 py-3.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-base tracking-wide cursor-pointer transition-colors whitespace-nowrap"
            >
              Iniciar Aventura
            </button>
          )}
          <button
            type="button"
            onClick={onOpenTutorial}
            data-testid="title-tutorial-btn"
            className="px-4 py-3.5 bg-[#142238] hover:bg-[#1c3152] border border-[#38bdf8]/70 text-[#e0f2fe] font-semibold text-sm cursor-pointer transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#fde047]" />
            Como Jogar
          </button>
          <button
            type="button"
            onClick={onOpenDatabase}
            className="px-4 py-3.5 bg-[#1a1728] hover:bg-[#27203d] border border-[#7c5cc4]/70 text-[#e9d5ff] font-semibold text-sm cursor-pointer transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Database className="w-4 h-4 text-[#c084fc]" />
            Base de Estudo
          </button>
        </div>
      </div>

      {/* Single Flat Control-Hint Line in Bottom Safe Margin */}
      <div className="text-xs sm:text-sm text-[#cbd5e1]/90 font-mono-num tracking-tight">
        WASD ou Setas: Andar · Clique no chão: Ir até lá · E: Interagir · F: Fadinha IA · G: Grimório · I: Bolsa · M: Mapa · Esc: Pausa
      </div>
    </div>
  );
};
