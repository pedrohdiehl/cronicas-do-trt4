import React, { useState } from 'react';
import { Volume2, VolumeX, Download, Upload, FileJson, RotateCcw, Home, X, Check, Music, Play, Square, Database, Sparkles, BookOpen } from 'lucide-react';
import { SOUNDTRACK_CATALOG, soundEngine, type MusicTrackId } from '../systems/audio';
import { CLASS_INFO, parseImportedRealExamJson } from '../systems/gameLogic';
import { exportSaveJson, parseImportedSaveJson } from '../systems/save';
import type { PlayerClass, Question, SaveState } from '../types';

interface PauseSettingsModalProps {
  saveState: SaveState;
  onResume: () => void;
  onUpdateSettings: (patch: Partial<SaveState['settings']>) => void;
  onChangeClass: (cls: PlayerClass) => void;
  onImportSave: (nextState: SaveState) => void;
  onImportRealExamQuestions: (questions: Question[]) => void;
  onOpenDatabase: () => void;
  onOpenTutorial: () => void;
  onOpenFairy: () => void;
  onRestartNew: () => void;
  onReturnTitle: () => void;
}

const EXAM_JSON_PLACEHOLDER = `[
  {
    "id": "fcc-trt-2024-01",
    "fichaId": "lgpd",
    "enunciado": "Enunciado da questão real de prova...",
    "alternativas": ["Alt A", "Alt B", "Alt C", "Alt D", "Alt E"],
    "correta": 0,
    "trechoFonte": "Trecho da ficha ou justificativa oficial.",
    "banca": "FCC",
    "ano": 2024,
    "orgao": "TRT4",
    "cargo": "Analista TI"
  }
]`;

export const PauseSettingsModal: React.FC<PauseSettingsModalProps> = ({
  saveState,
  onResume,
  onUpdateSettings,
  onChangeClass,
  onImportSave,
  onImportRealExamQuestions,
  onOpenDatabase,
  onOpenTutorial,
  onOpenFairy,
  onRestartNew,
  onReturnTitle,
}) => {
  const [section, setSection] = useState<'geral' | 'trilhas' | 'save' | 'provas'>('geral');
  const [previewTrack, setPreviewTrack] = useState<MusicTrackId | null>(null);
  const [saveJsonInput, setSaveJsonInput] = useState('');
  const [examJsonInput, setExamJsonInput] = useState('');
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const handleDownloadSave = () => {
    const content = exportSaveJson(saveState);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cronicas-trt4-progresso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback({ kind: 'ok', text: 'Arquivo de progresso JSON baixado com sucesso.' });
  };

  const handleApplySaveJson = () => {
    if (!saveJsonInput.trim()) {
      setFeedback({ kind: 'err', text: 'Cole o JSON do progresso antes de importar.' });
      return;
    }
    const res = parseImportedSaveJson(saveJsonInput);
    if (!res.ok) {
      setFeedback({ kind: 'err', text: res.error });
      return;
    }
    onImportSave(res.state);
    setSaveJsonInput('');
    setFeedback({ kind: 'ok', text: 'Progresso restaurado com sucesso!' });
  };

  const handleApplyExamJson = () => {
    if (!examJsonInput.trim()) {
      setFeedback({ kind: 'err', text: 'Cole o JSON das questões reais antes de importar.' });
      return;
    }
    const res = parseImportedRealExamJson(examJsonInput);
    if (!res.ok) {
      setFeedback({ kind: 'err', text: res.error });
      return;
    }
    onImportRealExamQuestions(res.questions);
    setExamJsonInput('');
    setFeedback({
      kind: 'ok',
      text: `${res.questions.length} questão(ões) de prova real importada(s)! Elas agora aparecem nos Bosses como "Questão de prova real".`,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de Pausa e Configurações"
    >
      <div className="rpg-panel w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-[#3a352c] flex items-center justify-between bg-[#141721]">
          <div>
            <h2 className="font-display text-xl font-bold text-[#f4efe4]">Jogo Pausado</h2>
            <div className="text-xs font-mono-num text-[#cbd5e1]">
              Nível {saveState.level} · {saveState.studiedFichas.length} fichas estudadas · {saveState.stats.totalCorrect}/{saveState.stats.totalAnswered} acertos
            </div>
          </div>
          <button
            type="button"
            onClick={onResume}
            aria-label="Retomar jogo"
            className="p-2 bg-[#23283a] hover:bg-[#323a52] text-[#f4efe4] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="px-5 pt-3 flex flex-wrap gap-2 border-b border-[#2a2f40] bg-[#131620]">
          {[
            { id: 'geral', label: 'Geral e Acessibilidade' },
            { id: 'trilhas', label: `Trilhas SNES (${SOUNDTRACK_CATALOG.length})` },
            { id: 'save', label: 'Exportar / Importar Save' },
            { id: 'provas', label: `Questões Reais (${saveState.customExamQuestions.length})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSection(t.id as typeof section);
                setFeedback(null);
              }}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 cursor-pointer ${
                section === t.id
                  ? 'border-[#e6b84c] text-[#f5d76e]'
                  : 'border-transparent text-[#94a3b8] hover:text-[#f4efe4]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {feedback && (
            <div
              className={`p-3 text-sm border ${
                feedback.kind === 'ok'
                  ? 'bg-[#12261d] border-[#22c55e] text-[#bbf7d0]'
                  : 'bg-[#33161b] border-[#ef4444] text-[#fecaca]'
              }`}
            >
              {feedback.text}
            </div>
          )}

          {section === 'geral' && (
            <>
              {/* Audio Controls */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#e6b84c]">
                  Áudio (Web Audio API)
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#131722] border border-[#2d3345]">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ muted: !saveState.settings.muted })}
                    className="px-3 py-1.5 bg-[#23283a] hover:bg-[#313850] text-xs font-semibold text-[#f4efe4] flex items-center gap-1.5 cursor-pointer"
                  >
                    {saveState.settings.muted ? <VolumeX className="w-4 h-4 text-[#ef4444]" /> : <Volume2 className="w-4 h-4 text-[#e6b84c]" />}
                    {saveState.settings.muted ? 'Mudo' : 'Som Ativo'}
                  </button>
                  <label className="flex-1 flex items-center gap-3 text-xs text-[#cbd5e1]">
                    <span>Volume</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={saveState.settings.volume}
                      onChange={(e) => onUpdateSettings({ volume: Number(e.target.value), muted: false })}
                      className="flex-1 accent-[#d9a441]"
                    />
                    <span className="font-mono-num w-9 text-right">
                      {Math.round(saveState.settings.volume * 100)}%
                    </span>
                  </label>
                </div>
              </div>

              {/* Accessibility */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#e6b84c]">
                  Acessibilidade
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="p-3 bg-[#131722] border border-[#2d3345] flex items-center justify-between gap-2 text-sm cursor-pointer">
                    <span>Modo Alto Contraste</span>
                    <input
                      type="checkbox"
                      checked={saveState.settings.highContrast}
                      onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
                      className="w-4 h-4 accent-[#d9a441]"
                    />
                  </label>
                  <label className="p-3 bg-[#131722] border border-[#2d3345] flex items-center justify-between gap-2 text-sm cursor-pointer">
                    <span>Desligar Screen Shake</span>
                    <input
                      type="checkbox"
                      checked={saveState.settings.disableShake}
                      onChange={(e) => onUpdateSettings({ disableShake: e.target.checked })}
                      className="w-4 h-4 accent-[#d9a441]"
                    />
                  </label>
                </div>
              </div>

              {/* Switch Class Live */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#e6b84c]">
                  Trocar Classe (Filtro de Cargo)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['tecnico', 'analista', 'dupla'] as PlayerClass[]).map((cls) => {
                    const active = saveState.playerClass === cls;
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => onChangeClass(cls)}
                        className={`p-3 text-left border text-xs cursor-pointer ${
                          active
                            ? 'bg-[#252c40] border-[#e6b84c] text-[#fde68a]'
                            : 'bg-[#131722] border-[#2d3345] text-[#cbd5e1] hover:border-[#6e5c3e]'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{CLASS_INFO[cls].nome}</span>
                          {active && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="text-[11px] text-[#94a3b8] mt-0.5">{CLASS_INFO[cls].cargoLabel}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Tutorial & Lumina AI Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onOpenTutorial}
                  className="p-3 bg-[#142033] hover:bg-[#1b2c47] border border-[#38bdf8]/60 text-left flex items-center gap-2.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#7dd3fc] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#e0f2fe]">Rever Tutorial do Jogo</div>
                    <div className="text-[11px] text-[#94a3b8]">Objetivo, Grimório, Bolsa e itens</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={onOpenFairy}
                  className="p-3 bg-[#1a2236] hover:bg-[#232f4a] border border-[#e6b84c]/60 text-left flex items-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#fde047] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#fde68a]">Falar com Lumina (IA)</div>
                    <div className="text-[11px] text-[#94a3b8]">Tirar dúvidas sobre o jogo ou edital</div>
                  </div>
                </button>
              </div>

              {/* Quick Database Editor Shortcut */}
              <div className="p-3.5 bg-[#171b29] border border-[#4c3e75] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#e9d5ff] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#c084fc]" />
                    Atualizar Base de Estudo (Disciplinas, Temas e Perguntas)
                  </div>
                  <div className="text-xs text-[#cbd5e1] mt-0.5">
                    Importe arquivos Markdown (.md), crie novas zonas no mapa ou cadastre perguntas extras.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenDatabase}
                  className="px-4 py-2 bg-[#7e22ce] hover:bg-[#9333ea] text-white font-semibold text-xs cursor-pointer"
                >
                  Abrir Editor da Base
                </button>
              </div>
            </>
          )}

          {section === 'trilhas' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-[#cbd5e1]">
                  Jukebox das trilhas do jogo: faixas com áudio HD gravado tocam automaticamente, enquanto as demais usam o sintetizador 16-bit SNES.
                </p>
                {previewTrack && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.stopMusic();
                      setPreviewTrack(null);
                    }}
                    className="px-3 py-1.5 bg-[#33161b] hover:bg-[#492027] border border-[#ef4444]/60 text-xs font-semibold text-[#fecaca] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5" />
                    Parar Prévia
                  </button>
                )}
              </div>

              {(['regiao', 'combate'] as const).map((cat) => (
                <div key={cat} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#e6b84c]">
                    {cat === 'regiao' ? 'Temas das Regiões & Abertura' : 'Temas de Combate, Duelos com NPC & Bosses'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SOUNDTRACK_CATALOG.filter((tr) => tr.category === cat).map((tr) => {
                      const playing = previewTrack === tr.id;
                      return (
                        <button
                          key={tr.id}
                          type="button"
                          onClick={() => {
                            if (saveState.settings.muted) {
                              onUpdateSettings({ muted: false });
                            }
                            if (playing) {
                              soundEngine.stopMusic();
                              setPreviewTrack(null);
                            } else {
                              soundEngine.configure(saveState.settings.volume, false);
                              soundEngine.startMusic(tr.id);
                              setPreviewTrack(tr.id);
                            }
                          }}
                          className={`p-3 text-left border flex items-center justify-between gap-2 cursor-pointer ${
                            playing
                              ? 'bg-[#252c40] border-[#e6b84c] text-[#fde68a]'
                              : 'bg-[#131722] border-[#2d3345] text-[#f4efe4] hover:border-[#6e5c3e]'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold flex items-center gap-1.5 truncate">
                              <Music className="w-3.5 h-3.5 text-[#e6b84c] shrink-0" />
                              <span className="truncate">{tr.title}</span>
                            </div>
                            <div className="text-[11px] text-[#94a3b8] truncate mt-0.5">
                              <span className={tr.audioUrl ? 'text-[#fde047] font-semibold' : 'text-[#94a3b8]'}>
                                {tr.audioUrl ? 'Áudio HD' : 'SNES Synth'}
                              </span>
                              {' · '}
                              {tr.subtitle}
                            </div>
                          </div>
                          <span className="shrink-0 p-1.5 bg-[#1b2030] border border-[#3a4056] text-[#e6b84c]">
                            {playing ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'save' && (
            <div className="space-y-4">
              <p className="text-sm text-[#cbd5e1]">
                Seu progresso é salvo automaticamente no navegador (<code className="text-[#fde68a]">localStorage</code>). Use os botões abaixo para fazer backup ou restaurar em outro dispositivo.
              </p>
              <button
                type="button"
                onClick={handleDownloadSave}
                className="px-4 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Exportar Progresso (.JSON)
              </button>

              <div className="space-y-2 pt-3 border-t border-[#2d3345]">
                <label htmlFor="import-save-json" className="block text-xs font-semibold text-[#e6b84c]">
                  Importar Progresso (cole o JSON abaixo):
                </label>
                <textarea
                  id="import-save-json"
                  rows={5}
                  value={saveJsonInput}
                  onChange={(e) => setSaveJsonInput(e.target.value)}
                  placeholder='{"version": 1, "playerClass": "dupla", ...}'
                  className="w-full p-3 bg-[#0f121a] border border-[#3a4056] font-mono text-xs text-[#f4efe4]"
                />
                <button
                  type="button"
                  onClick={handleApplySaveJson}
                  className="px-4 py-2 bg-[#23283a] hover:bg-[#313952] border border-[#6e5c3e] text-sm font-semibold text-[#f4efe4] inline-flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#38bdf8]" />
                  Restaurar Progresso JSON
                </button>
              </div>
            </div>
          )}

          {section === 'provas' && (
            <div className="space-y-3">
              <p className="text-sm text-[#cbd5e1]">
                Importe questões reais de provas anteriores (formato JSON com campos <code className="text-[#fde68a]">banca, ano, orgao, cargo</code>). Elas entrarão automaticamente nos Bosses com o selo <strong>"Questão de prova real"</strong>.
              </p>
              <label htmlFor="import-exam-json" className="block text-xs font-semibold text-[#e6b84c]">
                JSON de Questões Reais:
              </label>
              <textarea
                id="import-exam-json"
                rows={8}
                value={examJsonInput}
                onChange={(e) => setExamJsonInput(e.target.value)}
                placeholder={EXAM_JSON_PLACEHOLDER}
                className="w-full p-3 bg-[#0f121a] border border-[#3a4056] font-mono text-xs text-[#f4efe4]"
              />
              <button
                type="button"
                onClick={handleApplyExamJson}
                className="px-4 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <FileJson className="w-4 h-4" />
                Importar Questões Reais para os Bosses
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[#3a352c] bg-[#141721] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReturnTitle}
              className="px-3.5 py-2 bg-[#23283a] hover:bg-[#30374f] text-xs font-semibold text-[#cbd5e1] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              Tela Inicial
            </button>
            <button
              type="button"
              onClick={onRestartNew}
              className="px-3.5 py-2 bg-[#2f181c] hover:bg-[#422026] text-xs font-semibold text-[#fca5a5] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar Save
            </button>
          </div>
          <button
            type="button"
            onClick={onResume}
            className="px-6 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer"
          >
            Retomar Aventura [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
