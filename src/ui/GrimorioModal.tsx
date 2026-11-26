import React, { useMemo, useState } from 'react';
import { BookOpen, Compass, Link2, CheckCircle2, Search, X } from 'lucide-react';
import { PONTES } from '../data/content';
import { getAllZonas, getFichaById } from '../systems/customDatabase';
import {
  computeMasteryByCargo,
  computeMasteryByMateria,
  getFichasForClass,
  getFichaStatus,
  getQuestionsForClass,
  getRealExamProgress,
  ITEM_DEFS,
} from '../systems/gameLogic';
import type { Ficha, SaveState } from '../types';
import { FichaApostilaView } from './FichaApostilaView';

interface GrimorioModalProps {
  saveState: SaveState;
  dbVersion?: number;
  onTrackNpc: (fichaId: string) => void;
  onClose: () => void;
}

export const GrimorioModal: React.FC<GrimorioModalProps> = ({
  saveState,
  dbVersion = 0,
  onTrackNpc,
  onClose,
}) => {
  const [tab, setTab] = useState<'fichas' | 'pontes' | 'dominio'>('fichas');
  const [selectedZona, setSelectedZona] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'nao_vista' | 'estudada' | 'dominada'>('all');
  const [query, setQuery] = useState('');

  const allZonas = useMemo(() => getAllZonas(), [dbVersion]);
  const allowedFichas = useMemo(
    () => getFichasForClass(saveState.playerClass),
    [saveState.playerClass, dbVersion]
  );
  const allQuestions = useMemo(
    () => getQuestionsForClass(saveState.playerClass, saveState.customExamQuestions),
    [saveState.playerClass, saveState.customExamQuestions, dbVersion]
  );

  const [selectedId, setSelectedId] = useState<string>(allowedFichas[0]?.id || '');

  const filteredFichas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allowedFichas.filter((f) => {
      if (selectedZona !== 'all' && f.zonaId !== selectedZona) return false;
      const st = getFichaStatus(f.id, saveState, allQuestions);
      if (statusFilter !== 'all' && st !== statusFilter) return false;
      if (q && !f.titulo.toLowerCase().includes(q) && !f.id.toLowerCase().includes(q) && !f.materia.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [allowedFichas, selectedZona, statusFilter, query, saveState, allQuestions]);

  const activeFicha: Ficha | undefined = getFichaById(selectedId) || filteredFichas[0] || allowedFichas[0];
  const masteryMateria = useMemo(() => computeMasteryByMateria(saveState), [saveState, dbVersion]);
  const masteryCargo = useMemo(() => computeMasteryByCargo(saveState), [saveState, dbVersion]);

  const activeConnections = useMemo(() => {
    if (!activeFicha) return [];
    return activeFicha.conexoes
      .map((cid) => getFichaById(cid))
      .filter((x): x is Ficha => Boolean(x));
  }, [activeFicha, dbVersion]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="Grimório de Estudo"
    >
      <div className="rpg-panel w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#3a352c] flex flex-wrap items-center justify-between gap-3 bg-[#141721]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#e6b84c]" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#f4efe4]">Grimório do Concurso</h2>
              <div className="text-xs font-mono-num text-[#cbd5e1]">
                Técnico TI: {masteryCargo.tecnico.percentDominadas}% dominado ({masteryCargo.tecnico.estudadas}/{masteryCargo.tecnico.total} estudadas)
                {' · '}
                Analista TI: {masteryCargo.analista.percentDominadas}% dominado ({masteryCargo.analista.estudadas}/{masteryCargo.analista.total} estudadas)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#0f121a] p-1 border border-[#2f3547]">
              {(['fichas', 'pontes', 'dominio'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    tab === t ? 'bg-[#d9a441] text-[#14110b]' : 'text-[#cbd5e1] hover:text-white'
                  }`}
                >
                  {t === 'fichas' ? 'Fichas & Grafo' : t === 'pontes' ? 'Missões de Ponte' : 'Domínio por Matéria'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar Grimório"
              className="p-2 bg-[#23283a] hover:bg-[#323a52] text-[#f4efe4] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clear progression legend explaining how Grimório works */}
        <div className="px-5 py-2 bg-[#101420] border-b border-[#262c3e] text-xs text-[#cbd5e1] flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong className="text-[#f5d76e]">Como funciona:</strong> todas as fichas do seu edital já ficam disponíveis para consulta e busca; ao falar com o NPC (ou vencer seu duelo) ela vira <strong className="text-[#7dd3fc]">Estudada ✓</strong> (+ Pergaminho), e ao acertar suas questões vira <strong className="text-[#86efac]">Dominada ★</strong>. As questões reais de prova da FCC têm contagem à parte, dentro de cada ficha.
          </span>
        </div>

        {/* TAB 1: FICHAS + MINI-GRAPH */}
        {tab === 'fichas' && (
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12">
            {/* Left Sidebar: Search, Filters & Ficha List */}
            <div className="md:col-span-4 border-r border-[#2d3242] flex flex-col min-h-0 bg-[#12151e]">
              <div className="p-3 space-y-2 border-b border-[#2d3242]">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar ficha ou [[id]]..."
                    aria-label="Buscar ficha"
                    className="w-full pl-9 pr-3 py-2 bg-[#1a1e2b] border border-[#3a4056] text-sm text-[#f4efe4] placeholder:text-[#64748b] focus:outline-none focus:border-[#e6b84c]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedZona}
                    onChange={(e) => setSelectedZona(e.target.value)}
                    aria-label="Filtrar por matéria"
                    className="bg-[#1a1e2b] border border-[#3a4056] text-xs text-[#f4efe4] p-2"
                  >
                    <option value="all">Todas as Matérias</option>
                    {allZonas.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.nome}
                      </option>
                    ))}
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                    aria-label="Filtrar por status"
                    className="bg-[#1a1e2b] border border-[#3a4056] text-xs text-[#f4efe4] p-2"
                  >
                    <option value="all">Todos os Status</option>
                    <option value="nao_vista">Não vista</option>
                    <option value="estudada">Estudada</option>
                    <option value="dominada">Dominada</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#222736]">
                {filteredFichas.map((f) => {
                  const st = getFichaStatus(f.id, saveState, allQuestions);
                  const active = activeFicha?.id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedId(f.id)}
                      className={`w-full text-left px-3.5 py-3 transition-colors cursor-pointer ${
                        active ? 'bg-[#262c3f]' : 'hover:bg-[#1a1e2c]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono-num">
                        <span className="text-[#94a3b8] truncate">{f.materia}</span>
                        <span
                          className={
                            st === 'dominada'
                              ? 'text-[#4ade80] font-bold'
                              : st === 'estudada'
                                ? 'text-[#f5d76e]'
                                : 'text-[#64748b]'
                          }
                        >
                          {st === 'dominada' ? 'Dominada' : st === 'estudada' ? 'Estudada' : 'Não vista'}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#f4efe4] mt-0.5 line-clamp-1">
                        {f.titulo}
                      </div>
                    </button>
                  );
                })}
                {filteredFichas.length === 0 && (
                  <div className="p-6 text-center text-sm text-[#94a3b8]">
                    Nenhuma ficha encontrada com esse filtro.
                  </div>
                )}
              </div>
            </div>

            {/* Right Pane: Clean Apostila Study Reader + Interactive SVG Connection Graph */}
            <div className="md:col-span-8 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#0f121a]">
              {activeFicha ? (
                <>
                  <FichaApostilaView
                    ficha={activeFicha}
                    showHeader
                    onOpenConnectedFicha={(cid) => setSelectedId(cid)}
                    onTrackNpc={(fid) => {
                      onTrackNpc(fid);
                      onClose();
                    }}
                  />

                  {/* Questões reais de prova (FCC) ligadas a esta ficha: contagem própria, fora do Dominada ★ */}
                  {(() => {
                    const real = getRealExamProgress(activeFicha.id, saveState, allQuestions);
                    if (real.total === 0) return null;
                    return (
                      <div
                        data-testid="provas-reais"
                        className="p-3 bg-[#14201a] border border-[#2f6b47] rounded-[4px] text-xs sm:text-sm text-[#d1fae5] space-y-1"
                      >
                        <div className="font-semibold text-[#86efac]">
                          Questões de prova da FCC: você acertou {real.acertadas} de {real.total}
                        </div>
                        <div className="text-[#a7c4b5]">
                          Aparecem no duelo com o NPC desta ficha, no mini-boss e no chefe da região. Têm contagem
                          própria e não entram no Dominada ★.
                        </div>
                      </div>
                    );
                  })()}

                  {/* Interactive SVG Mini-Graph of [[id]] Connections */}
                  {activeConnections.length > 0 && (
                    <div className="p-4 bg-[#121622] border border-[#2d3345] rounded-[4px] space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-semibold text-[#7dd3fc] flex items-center gap-1.5">
                          <Link2 className="w-4 h-4" />
                          Mapa Visual de Conexões (clique em um nó para abrir a ficha)
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onTrackNpc(activeFicha.id);
                            onClose();
                          }}
                          className="px-3 py-1 bg-[#1c2d42] hover:bg-[#253c59] border border-[#38bdf8]/60 text-xs font-semibold text-[#e0f2fe] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
                          Rastrear NPC no Mapa
                        </button>
                      </div>
                      <svg viewBox="0 0 640 160" className="w-full h-40">
                        {activeConnections.slice(0, 6).map((conn, idx, arr) => {
                          const angle = ((idx / Math.max(1, arr.length)) * Math.PI * 1.4) - Math.PI * 0.7;
                          const cx = 320 + Math.cos(angle) * 215;
                          const cy = 80 + Math.sin(angle) * 54;
                          return (
                            <g
                              key={conn.id}
                              onClick={() => setSelectedId(conn.id)}
                              className="cursor-pointer"
                            >
                              <line x1="320" y1="80" x2={cx} y2={cy} stroke="#4b5a78" strokeWidth="2" />
                              <rect
                                x={cx - 72}
                                y={cy - 14}
                                width="144"
                                height="28"
                                rx="4"
                                fill="#1b2436"
                                stroke="#38bdf8"
                                strokeWidth="1.5"
                              />
                              <text
                                x={cx}
                                y={cy + 4}
                                textAnchor="middle"
                                fill="#e0f2fe"
                                fontSize="11"
                                fontFamily="Plus Jakarta Sans, sans-serif"
                              >
                                {conn.id.length > 20 ? `${conn.id.slice(0, 19)}…` : conn.id}
                              </text>
                            </g>
                          );
                        })}
                        <rect
                          x="240"
                          y="62"
                          width="160"
                          height="36"
                          rx="5"
                          fill="#2e2412"
                          stroke="#e6b84c"
                          strokeWidth="2"
                        />
                        <text
                          x="320"
                          y="84"
                          textAnchor="middle"
                          fill="#fde68a"
                          fontSize="12"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {activeFicha.id.slice(0, 18)}
                        </text>
                      </svg>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* TAB 2: PONTES (SPECIAL BRIDGE QUESTS) */}
        {tab === 'pontes' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <p className="text-sm text-[#cbd5e1]">
              Converse com os NPCs ligados por [[conexões]] para coletar seus Pergaminhos de Conexão. Ao completar uma Ponte, você recebe XP e itens raros automaticamente!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PONTES.map((p) => {
                const done = saveState.completedPontes.includes(p.id);
                const collected = p.fichaIds.filter((id) => saveState.collectedScrolls.includes(id)).length;
                return (
                  <div
                    key={p.id}
                    className={`p-4 border ${
                      done ? 'bg-[#12261d] border-[#22c55e]' : 'bg-[#131722] border-[#383e54]'
                    } space-y-3`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-base font-bold text-[#f5e6c8]">{p.nome}</h3>
                        <p className="text-xs text-[#cbd5e1] mt-1">{p.descricao}</p>
                      </div>
                      {done && <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0" />}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {p.fichaIds.map((fid) => {
                        const f = getFichaById(fid);
                        const has = saveState.collectedScrolls.includes(fid);
                        return (
                          <button
                            key={fid}
                            type="button"
                            onClick={() => {
                              onTrackNpc(fid);
                              onClose();
                            }}
                            className={`px-2.5 py-1 text-xs border cursor-pointer ${
                              has
                                ? 'bg-[#173626] border-[#22c55e] text-[#bbf7d0]'
                                : 'bg-[#1c2130] border-[#475569] text-[#cbd5e1] hover:border-[#38bdf8]'
                            }`}
                          >
                            {has ? '✓ ' : '○ '}
                            {f ? f.titulo.slice(0, 26) : fid}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-xs font-mono-num text-[#e6b84c] pt-2 border-t border-[#282e40]">
                      Progresso: {collected}/{p.fichaIds.length} pergaminhos · Recompensa: +{p.recompensaXp} XP + {ITEM_DEFS[p.recompensaItem].nome}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MASTERY BY MATÉRIA & CARGO */}
        {tab === 'dominio' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#141926] border border-[#38bdf8]/40">
                <div className="text-xs font-semibold text-[#7dd3fc]">Cargo · Técnico Judiciário — TI</div>
                <div className="font-mono-num text-2xl font-bold text-[#f4efe4] mt-1">
                  {masteryCargo.tecnico.percentDominadas}% dominado
                </div>
                <div className="text-xs text-[#94a3b8] mt-1">
                  {masteryCargo.tecnico.estudadas} estudadas · {masteryCargo.tecnico.dominadas} dominadas de {masteryCargo.tecnico.total} fichas
                </div>
              </div>
              <div className="p-4 bg-[#141926] border border-[#a78bfa]/40">
                <div className="text-xs font-semibold text-[#c4b5fd]">Cargo · Analista Judiciário — TI</div>
                <div className="font-mono-num text-2xl font-bold text-[#f4efe4] mt-1">
                  {masteryCargo.analista.percentDominadas}% dominado
                </div>
                <div className="text-xs text-[#94a3b8] mt-1">
                  {masteryCargo.analista.estudadas} estudadas · {masteryCargo.analista.dominadas} dominadas de {masteryCargo.analista.total} fichas
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#f5e6c8]">
                Domínio por Matéria (Classe atual)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {masteryMateria.map((m) => (
                  <div key={m.zona.id} className="p-3.5 bg-[#131722] border border-[#2d3345] space-y-2">
                    <div className="flex justify-between gap-2 text-sm">
                      <span className="font-semibold text-[#f4efe4] truncate">{m.zona.nome}</span>
                      <span className="font-mono-num text-xs text-[#e6b84c] shrink-0">
                        {m.total > 0 ? `${m.percentEstudadas}% est. · ${m.percentDominadas}% dom.` : 'Fora do cargo'}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1f2433] overflow-hidden">
                      <div
                        className="h-full bg-[#44b86b]"
                        style={{ width: `${m.percentEstudadas}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
