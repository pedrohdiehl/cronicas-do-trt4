import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, Send, Compass, BookOpen, X, Loader2, AlertCircle } from 'lucide-react';
import { getFairyPortraitDataUrl } from '../entities/pixelSprites';
import { getSpriteAtlasRevision, subscribeSpriteAtlas } from '../entities/spriteSheetProcessor';
import { getAllFichas } from '../systems/customDatabase';
import { parseInlineTokens } from '../systems/fichaMarkdown';
import { CLASS_INFO, getFichasForClass } from '../systems/gameLogic';
import type { Ficha, RegionInfo, SaveState, ZonaInfo } from '../types';
import { buildWorldData } from '../world/worldMap';
import { RenderInlineTokens } from './FichaApostilaView';

interface FairyCompanionModalProps {
  saveState: SaveState;
  currentRegion: RegionInfo;
  currentZona: ZonaInfo | null;
  onTrackNpc: (fichaId: string) => void;
  onOpenTutorial: () => void;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

const QUICK_PROMPTS = [
  'Para onde devo ir agora?',
  'Como funciona o Grimório?',
  'Para que serve cada item da Bolsa?',
  'Qual é o objetivo do jogo?',
  'Me explique a ficha mais próxima!',
];

function findMatchingFichas(question: string, allowedFichas: Ficha[], nearestFicha: Ficha | null): Ficha[] {
  const clean = question
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const tokens = clean
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !['como', 'qual', 'para', 'onde', 'que', 'uma', 'com', 'dos', 'das', 'por', 'ficha', 'sobre', 'jogo'].includes(w));

  const scored: { ficha: Ficha; score: number }[] = [];
  for (const f of allowedFichas) {
    const hay = `${f.id} ${f.titulo} ${f.materia} ${f.oQueE}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    let score = 0;
    for (const tok of tokens) {
      if (f.id.toLowerCase().includes(tok)) score += 6;
      if (f.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(tok)) score += 4;
      if (hay.includes(tok)) score += 1;
    }
    if (score > 0) scored.push({ ficha: f, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const picked = scored.slice(0, 3).map((s) => s.ficha);
  if (nearestFicha && !picked.some((p) => p.id === nearestFicha.id)) {
    picked.unshift(nearestFicha);
  }
  return picked.slice(0, 4);
}

export const FairyCompanionModal: React.FC<FairyCompanionModalProps> = ({
  saveState,
  currentRegion,
  currentZona,
  onTrackNpc,
  onOpenTutorial,
  onClose,
}) => {
  const [atlasRev, setAtlasRev] = useState(() => getSpriteAtlasRevision());
  useEffect(() => subscribeSpriteAtlas(() => setAtlasRev(getSpriteAtlasRevision())), []);

  const fairyPortrait = useMemo(() => getFairyPortraitDataUrl('happy'), [atlasRev]);

  const allowedFichas = useMemo(
    () => getFichasForClass(saveState.playerClass),
    [saveState.playerClass]
  );

  // Compute nearest unstudied NPC so Lumina gives concrete, grounded next-step advice!
  const nearestUnstudiedNpc = useMemo(() => {
    const world = buildWorldData();
    const studied = new Set(saveState.studiedFichas);
    const allowedIds = new Set(allowedFichas.map((f) => f.id));
    let best: { ficha: Ficha; dist: number } | null = null;
    for (const npc of world.npcs) {
      if (!allowedIds.has(npc.id) || studied.has(npc.id)) continue;
      const dist = Math.hypot(npc.x - saveState.heroX, npc.y - saveState.heroY);
      if (!best || dist < best.dist) {
        best = { ficha: npc.ficha, dist };
      }
    }
    return best?.ficha || allowedFichas[0] || getAllFichas()[0] || null;
  }, [allowedFichas, saveState.studiedFichas, saveState.heroX, saveState.heroY]);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      text: nearestUnstudiedNpc
        ? `Oi! Eu sou a Lumina ✨ Você está em ${currentRegion.nome}${currentZona ? ` (${currentZona.nome})` : ''}. Seu próximo passo sugerido é conversar com ${nearestUnstudiedNpc.npcName} sobre "${nearestUnstudiedNpc.titulo}"! Escolha uma dúvida rápida abaixo ou me pergunte qualquer coisa sobre o jogo ou o edital TRT4.`
        : `Oi! Eu sou a Lumina ✨ Você já estudou todas as fichas da sua classe! Pergunte qualquer coisa para revisar para a prova de 31/01/2027.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const sendQuestion = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text };
    const nextHistory = messages
      .filter((m) => !m.isError && m.id !== 'welcome')
      .slice(-8)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const matched = findMatchingFichas(text, allowedFichas, nearestUnstudiedNpc);
      const response = await fetch('/api/fairy-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextHistory,
          context: {
            playerClass: CLASS_INFO[saveState.playerClass].nome,
            level: saveState.level,
            hp: Math.round(saveState.hp),
            maxHp: saveState.maxHp,
            focus: Math.round(saveState.focus),
            maxFocus: saveState.maxFocus,
            regionName: currentRegion.nome,
            zoneName: currentZona?.nome || currentRegion.subtitulo,
            studiedCount: saveState.studiedFichas.length,
            totalFichas: allowedFichas.length,
            bossesDefeated: saveState.defeatedBosses.length,
            spacedRepCount: Object.keys(saveState.spacedRep).length,
            inventory: saveState.inventory,
            nextRecommendedNpc: nearestUnstudiedNpc
              ? `${nearestUnstudiedNpc.npcName} — ${nearestUnstudiedNpc.titulo} (${nearestUnstudiedNpc.materia}, [[${nearestUnstudiedNpc.id}]])`
              : 'Todas estudadas',
            matchedFichas: matched.map((f) => ({
              id: f.id,
              titulo: f.titulo,
              materia: f.materia,
              oQueE: f.oQueE,
              exemploPratico: f.exemploPratico,
              avisosOraculo: f.avisosOraculo,
            })),
          },
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'model',
            text: data.error || 'Não consegui responder agora. Tente novamente em instantes.',
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: `m-${Date.now()}`, role: 'model', text: data.reply! },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'model',
          text: 'Sem conexão com o servidor da Lumina no momento. Verifique se o app está ativo e tente novamente.',
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75"
      role="dialog"
      aria-modal="true"
      aria-label="Fadinha Guia Lumina com IA"
      data-testid="fairy-modal"
    >
      <div className="rpg-panel w-full max-w-2xl h-[84vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 border-b border-[#3a352c] bg-[#131826] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 shrink-0 border-2 border-[#38bdf8] bg-[#0e1424] flex items-center justify-center p-1">
              <img
                src={fairyPortrait}
                alt="Fadinha Lumina"
                className="w-full h-full object-contain animate-idle-bob"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-mono-num text-[#7dd3fc]">
                <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                <span>Companheira Guia · IA Integrada</span>
              </div>
              <h2 className="font-display text-lg font-bold text-[#f5e6c8] truncate">
                Lumina — Sua Fadinha de Estudos
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTutorial();
              }}
              className="px-3 py-1.5 bg-[#1e263b] hover:bg-[#2a3654] border border-[#6e5c3e] text-xs font-semibold text-[#fde68a] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tutorial
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar conversa com Lumina"
              className="p-2 bg-[#23283a] hover:bg-[#323a52] text-[#f4efe4] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Next-Step Tracker Strip */}
        {nearestUnstudiedNpc && (
          <div className="px-4 sm:px-5 py-2.5 bg-[#11192b] border-b border-[#24324f] flex items-center justify-between gap-3 text-xs">
            <div className="text-[#cbd5e1] min-w-0 flex-1 truncate">
              <span className="text-[#7dd3fc] font-semibold">Próxima aula sugerida: </span>
              <span className="text-[#f4efe4] font-semibold">{nearestUnstudiedNpc.npcName}</span>
              <span className="text-[#94a3b8]"> · {nearestUnstudiedNpc.titulo}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onTrackNpc(nearestUnstudiedNpc.id);
                onClose();
              }}
              className="px-3 py-1 bg-[#1b2d4a] hover:bg-[#243e66] border border-[#38bdf8]/60 text-[#e0f2fe] font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              Guiar no Mapa
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#0f131d]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#2a2315] border border-[#b58a3c] text-[#fef3c7] whitespace-pre-wrap'
                    : m.isError
                      ? 'bg-[#33161b] border border-[#ef4444] text-[#fecaca]'
                      : 'bg-[#171d2e] border border-[#324063] text-[#f1ece1] space-y-1.5'
                }`}
              >
                {m.isError && (
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-[#fca5a5]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Aviso da Lumina</span>
                  </div>
                )}
                {m.role === 'user' || m.isError ? (
                  m.text
                ) : (
                  m.text.split('\n').map((line, lIdx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={lIdx} className="h-1" />;
                    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);
                    if (bulletMatch) {
                      return (
                        <div key={lIdx} className="pl-4 relative">
                          <span aria-hidden="true" className="absolute left-0.5 text-[#7dd3fc]">
                            •
                          </span>
                          <RenderInlineTokens
                            tokens={parseInlineTokens(bulletMatch[1])}
                            isPaper={false}
                            onSelectFichaId={(fid) => {
                              onTrackNpc(fid);
                              onClose();
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <p key={lIdx} className="my-0">
                        <RenderInlineTokens
                          tokens={parseInlineTokens(trimmed)}
                          isPaper={false}
                          onSelectFichaId={(fid) => {
                            onTrackNpc(fid);
                            onClose();
                          }}
                        />
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-[#171d2e] border border-[#38bdf8]/50 text-xs text-[#7dd3fc] inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Lumina está consultando suas fichas e o mapa...
              </div>
            </div>
          )}
          <div ref={scrollEndRef} />
        </div>

        {/* Quick Question Chips + Input Bar */}
        <div className="p-3.5 sm:p-4 border-t border-[#3a352c] bg-[#141721] space-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                type="button"
                disabled={loading}
                onClick={() => sendQuestion(q)}
                className="px-2.5 py-1 bg-[#1b2234] hover:bg-[#25304a] disabled:opacity-40 border border-[#3b4766] text-xs text-[#e0f2fe] cursor-pointer disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendQuestion(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              data-testid="fairy-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte à Lumina sobre o jogo, itens, Grimório ou matérias do TRT4..."
              maxLength={800}
              className="flex-1 px-3.5 py-2.5 bg-[#0f121a] border border-[#3d4661] focus:border-[#38bdf8] focus:outline-none text-sm text-[#f4efe4] placeholder:text-[#64748b]"
            />
            <button
              type="submit"
              data-testid="fairy-chat-send"
              disabled={loading || !input.trim()}
              aria-label="Enviar pergunta para Lumina"
              className="px-4 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] disabled:opacity-40 text-[#14110b] font-bold text-sm inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
