import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Backpack,
  Compass,
  Sparkles,
  Swords,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Shield,
  Search,
  Heart,
  Zap,
  Key,
} from 'lucide-react';
import { getFairyPortraitDataUrl } from '../entities/pixelSprites';
import { getSpriteAtlasRevision, subscribeSpriteAtlas } from '../entities/spriteSheetProcessor';

export const TUTORIAL_SEEN_KEY = 'cronicas_trt4_tutorial_seen_v1';

export function hasSeenTutorial(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return true;
  return window.localStorage.getItem(TUTORIAL_SEEN_KEY) === '1';
}

export function markTutorialSeen(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
}

interface TutorialModalProps {
  onFinish: () => void;
  onOpenFairy?: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onFinish, onOpenFairy }) => {
  const [step, setStep] = useState(0);
  const [atlasRev, setAtlasRev] = useState(() => getSpriteAtlasRevision());

  useEffect(() => subscribeSpriteAtlas(() => setAtlasRev(getSpriteAtlasRevision())), []);

  const fairyHappyUrl = useMemo(() => getFairyPortraitDataUrl('happy'), [atlasRev]);
  const fairyFrontUrl = useMemo(() => getFairyPortraitDataUrl('front'), [atlasRev]);

  const totalSteps = 5;

  const handleComplete = () => {
    markTutorialSeen();
    onFinish();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleComplete();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (step < totalSteps - 1) setStep((s) => s + 1);
        else handleComplete();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (step > 0) setStep((s) => s - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const stepHeaders = [
    {
      title: '1. Bem-vindo & Objetivo do Jogo',
      badge: 'Sua Jornada até 31/01/2027',
      icon: <Swords className="w-5 h-5 text-[#f5d76e]" />,
      mood: 'happy' as const,
      greeting: 'Olá! Eu sou a Lumina, sua fadinha guia em Crônicas do TRT4!',
    },
    {
      title: '2. Para Onde Ir & Controles',
      badge: 'Mundo Aberto em 6 Regiões',
      icon: <Compass className="w-5 h-5 text-[#38bdf8]" />,
      mood: 'front' as const,
      greeting: 'O mapa inteiro já está aberto — vou te mostrar por onde começar!',
    },
    {
      title: '3. Como Funciona o Grimório [G]',
      badge: 'Seu Caderno Vivo de Estudo',
      icon: <BookOpen className="w-5 h-5 text-[#e6b84c]" />,
      mood: 'front' as const,
      greeting: 'O Grimório já lista todas as fichas do edital e acompanha seu domínio!',
    },
    {
      title: '4. Bolsa [I] e Para Que Serve Cada Item',
      badge: 'Poções, Foco e Baús Reais',
      icon: <Backpack className="w-5 h-5 text-[#34d399]" />,
      mood: 'happy' as const,
      greeting: 'Estes itens salvam sua vida nas batalhas mais difíceis da banca FCC!',
    },
    {
      title: '5. Fale Comigo a Qualquer Hora [F]',
      badge: 'Fadinha Guia com IA Integrada',
      icon: <Sparkles className="w-5 h-5 text-[#fde047]" />,
      mood: 'happy' as const,
      greeting: 'Eu voo sempre ao seu lado! Pode me perguntar qualquer coisa durante o jogo.',
    },
  ];

  const current = stepHeaders[step];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/82 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Tutorial do Jogo com a Fadinha Lumina"
      data-testid="tutorial-modal"
    >
      <div className="rpg-panel w-full max-w-3xl my-auto flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Banner with Lumina Portrait */}
        <div className="px-5 py-4 border-b border-[#3a352c] bg-[#141824] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-16 h-16 shrink-0 border-2 border-[#e6b84c] bg-[#111522] flex items-center justify-center p-1">
              <img
                src={current.mood === 'happy' ? fairyHappyUrl : fairyFrontUrl}
                alt="Fadinha Lumina"
                className="w-full h-full object-contain animate-idle-bob"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono-num text-[#7dd3fc]">
                {current.icon}
                <span>{current.badge}</span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#f5e6c8] mt-0.5">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#fde68a] italic mt-0.5">
                &ldquo;{current.greeting}&rdquo;
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleComplete}
            aria-label="Pular tutorial"
            className="p-2 bg-[#23283a] hover:bg-[#323a52] text-[#cbd5e1] hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="px-5 py-2 bg-[#10131d] border-b border-[#262c3f] flex items-center gap-2">
          {stepHeaders.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setStep(idx)}
              className={`flex-1 h-2 transition-colors cursor-pointer ${
                idx === step
                  ? 'bg-[#e6b84c]'
                  : idx < step
                    ? 'bg-[#22c55e]'
                    : 'bg-[#283044] hover:bg-[#3a4561]'
              }`}
              aria-label={`Ir para passo ${idx + 1}`}
            />
          ))}
          <span className="font-mono-num text-xs text-[#a8a29e] ml-2">
            {step + 1}/{totalSteps}
          </span>
        </div>

        {/* Step Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm sm:text-base text-[#e5e0d5] leading-relaxed">
          {step === 0 && (
            <div className="space-y-4">
              <p>
                Em <strong className="text-[#f5d76e]">Crônicas do TRT4</strong>, cada matéria do seu edital (Técnico e Analista Judiciário — TI) virou uma região viva de RPG baseada <strong>exclusivamente</strong> nos seus 14 arquivos de resumo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-[#121622] border border-[#323a52] space-y-1">
                  <div className="font-display font-bold text-[#fde68a]">1. Estude com NPCs</div>
                  <p className="text-[#cbd5e1]">
                    Cada ficha é um personagem (juiz, bibliotecária, engenheiro…). Conversar com eles ensina o resumo, dá XP e libera o <strong>Pergaminho de Conexão</strong>.
                  </p>
                </div>
                <div className="p-3.5 bg-[#121622] border border-[#323a52] space-y-1">
                  <div className="font-display font-bold text-[#7dd3fc]">2. Teste em Batalha</div>
                  <p className="text-[#cbd5e1]">
                    Enfrente monstros, <strong>duele com NPCs</strong>, derrote os Mini-Bosses de cada matéria e os <strong>6 Chefes de Região</strong> (questões estilo FCC).
                  </p>
                </div>
                <div className="p-3.5 bg-[#121622] border border-[#323a52] space-y-1">
                  <div className="font-display font-bold text-[#86efac]">3. Revise até Dominar</div>
                  <p className="text-[#cbd5e1]">
                    Toda resposta mostra o trecho literal em <strong>&ldquo;📜 Por quê?&rdquo;</strong>. Errou? A questão volta como <em>Inimigo Ressurgido</em> até você acertar 2× seguidas!
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <p>
                Você começa na <strong>Praça do Reino da Toga</strong> (Noções de Legislação — Nível sugerido 1). Olhe em volta:
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="p-3 bg-[#121622] border border-[#2f374f] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f5d76e] shrink-0 mt-0.5" />
                  <span>
                    <strong>Primeiro passo sugerido:</strong> ande até um NPC com ponto de exclamação <strong className="text-[#f5d76e]">[!]</strong> ou espadas <strong className="text-[#f59e0b]">[⚔]</strong> (como a Magistrada Beatriz ou o Escrivão Antônio) e aperte <strong>E</strong> (ou clique nele) para assistir à aula e duelar!
                  </span>
                </li>
                <li className="p-3 bg-[#121622] border border-[#2f374f] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>
                    <strong>Movimento livre:</strong> use <strong>WASD</strong> ou as <strong>Setas</strong> para andar, ou <strong>clique em qualquer ponto do chão</strong> para o herói ir automaticamente desviando de obstáculos.
                  </span>
                </li>
                <li className="p-3 bg-[#121622] border border-[#2f374f] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span>
                    <strong>Viagem rápida no Mapa [M]:</strong> todas as 6 regiões (Toga, Cidadela, Floresta do Código, Fortaleza da Muralha, Montanhas da Infra e Porto Babel) estão abertas desde o início — clique em qualquer região no <strong>Mapa [M]</strong> para viajar na hora!
                  </span>
                </li>
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#1b2234] border border-[#e6b84c]/70 text-sm text-[#fef3c7]">
                <strong>Dúvida comum: o Grimório já vem completo ou vai se preenchendo?</strong>
                <p className="mt-1 text-[#f4efe4]">
                  <strong>Os dois!</strong> Todas as fichas da sua classe já aparecem listadas desde o começo para você pesquisar e planejar o estudo, mas o <strong>status de domínio</strong> de cada ficha vai evoluindo conforme você joga:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-[#121622] border border-[#3a4056]">
                  <div className="font-bold text-[#94a3b8]">1. Não vista</div>
                  <p className="text-[#cbd5e1] mt-1">
                    Você já pode ler o resumo e clicar em <strong>&ldquo;Rastrear NPC no Mapa&rdquo;</strong> para a bússola azul te levar até a aula dela.
                  </p>
                </div>
                <div className="p-3.5 bg-[#121622] border border-[#38bdf8]/60">
                  <div className="font-bold text-[#7dd3fc]">2. Estudada ✓</div>
                  <p className="text-[#cbd5e1] mt-1">
                    Fica marcada assim que você conclui o diálogo com o NPC (ou vence o duelo dele), liberando o <strong>Pergaminho de Conexão</strong>!
                  </p>
                </div>
                <div className="p-3.5 bg-[#121622] border border-[#22c55e]/60">
                  <div className="font-bold text-[#86efac]">3. Dominada ★</div>
                  <p className="text-[#cbd5e1] mt-1">
                    Conquistada quando você estuda a ficha e acerta as questões dela nas batalhas — sobe sua barra de <strong>Domínio por Matéria</strong>!
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#cbd5e1]">
                No Grimório você também encontra os <strong>links clicáveis das fontes oficiais</strong>, o <strong>Grafo de Conexões</strong> entre temas e as <strong>Missões de Ponte</strong> (reúna os pergaminhos ligados para ganhar XP e itens bônus!).
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm">
                A <strong>Bolsa [I]</strong> guarda suas poções, pergaminhos, chaves de chefes e capas cosméticas. Você ganha itens abrindo <strong>baús pelo mapa</strong>, concluindo <strong>Missões de Ponte</strong> e derrotando <strong>NPCs / Chefes</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                <div className="p-3 bg-[#121622] border border-[#31384d] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#e0f2fe]">Poção de Dica</strong> (em batalha): elimina <strong>2 alternativas erradas</strong> da questão atual.
                  </div>
                </div>
                <div className="p-3 bg-[#121622] border border-[#31384d] flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fef3c7]">Escudo do Recurso</strong> (em batalha): anula o dano de HP se você errar a próxima resposta.
                  </div>
                </div>
                <div className="p-3 bg-[#121622] border border-[#31384d] flex items-start gap-2.5">
                  <Search className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#ede9fe]">Lupa da Fonte</strong> (em batalha): mostra o <strong>trecho literal da ficha</strong> antes de responder!
                  </div>
                </div>
                <div className="p-3 bg-[#121622] border border-[#31384d] flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fee2e2]">Poção de Vida</strong> (Bolsa ou batalha): recupera <strong>+40 HP</strong>.
                  </div>
                </div>
                <div className="p-3 bg-[#121622] border border-[#31384d] flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#d1fae5]">Elixir de Foco</strong> (Bolsa): recupera <strong>+35 Foco</strong>. Em batalha, 20 de Foco eliminam 1 alternativa errada!
                  </div>
                </div>
                <div className="p-3 bg-[#121622] border border-[#31384d] flex items-start gap-2.5">
                  <Key className="w-4 h-4 text-[#f5d76e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fde68a]">Chaves &amp; Baús Reais</strong>: cada Chefe de Região entrega uma Chave para abrir o Baú Real e equipar uma capa!
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p>
                Eu vou voar pertinho de você durante toda a jornada! Sempre que bater uma dúvida — sobre <strong>para onde ir</strong>, <strong>como funciona uma mecânica</strong> ou <strong>algum conceito das suas fichas do TRT4</strong> — basta:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3.5 bg-[#12192b] border border-[#38bdf8]/60 space-y-1">
                  <div className="font-bold text-[#7dd3fc]">Como me chamar</div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]">
                    Aperte a tecla <strong>[F]</strong>, clique no botão <strong>Lumina [F]</strong> lá em cima ou <strong>clique diretamente em mim</strong> voando ao lado do herói!
                  </p>
                </div>
                <div className="p-3.5 bg-[#12192b] border border-[#e6b84c]/60 space-y-1">
                  <div className="font-bold text-[#fde68a]">O que eu sei responder</div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]">
                    Sou conectada à Inteligência Artificial (Gemini) e consulto <strong>o seu progresso real e as suas fichas</strong> para te orientar sem inventar nada fora do edital.
                  </p>
                </div>
              </div>
              {onOpenFairy && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      markTutorialSeen();
                      onFinish();
                      onOpenFairy();
                    }}
                    className="px-4 py-2 bg-[#1a2842] hover:bg-[#23375a] border border-[#38bdf8]/70 text-xs sm:text-sm font-semibold text-[#e0f2fe] inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#fde047]" />
                    Abrir conversa com a Lumina agora
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="px-5 py-3.5 border-t border-[#3a352c] bg-[#141721] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="px-3.5 py-2 bg-[#23283a] hover:bg-[#313850] disabled:opacity-35 text-xs sm:text-sm font-semibold text-[#f4efe4] inline-flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>
            <button
              type="button"
              onClick={handleComplete}
              className="px-3 py-2 text-xs text-[#94a3b8] hover:text-[#f4efe4] cursor-pointer"
            >
              Pular Tutorial
            </button>
          </div>

          {step < totalSteps - 1 ? (
            <button
              type="button"
              data-testid="tutorial-next-btn"
              onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
              className="px-5 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              data-testid="tutorial-finish-btn"
              onClick={handleComplete}
              className="px-6 py-2.5 bg-[#22c55e] hover:bg-[#4ade80] text-[#082012] font-bold text-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              Começar a Aventura!
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
