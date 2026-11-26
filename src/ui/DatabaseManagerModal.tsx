import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Database,
  FileText,
  FolderPlus,
  HelpCircle,
  Plus,
  Trash2,
  Download,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { REGIONS } from '../data/content';
import {
  GENERATED_SHEETS,
  getSpriteAtlas,
  loadCustomHeroSheetConfig,
  saveCustomHeroSheet,
  sliceCustomHeroSheet,
  subscribeSpriteAtlas,
  type CustomHeroSheetConfig,
} from '../entities/spriteSheetProcessor';
import {
  createCustomFicha,
  createCustomZona,
  exportCustomDatabaseJson,
  getAllFichas,
  getAllZonas,
  importCustomDatabaseJson,
  loadCustomDatabase,
  parseMarkdownToCustomEntries,
  saveCustomDatabase,
} from '../systems/customDatabase';
import type { CargoScope, Question, RegionId } from '../types';
import { invalidateWorldCache } from '../world/worldMap';

interface DatabaseManagerModalProps {
  onDatabaseUpdated: (message: string) => void;
  onClose: () => void;
}

const SAMPLE_MD = `---
materia: Direito Administrativo — Licitações
cai_em: [tecnico, analista]
---

## [[lei-14133]] 🟢 Nova Lei de Licitações (Lei nº 14.133/2021)
- **O que é:** marco geral de licitações e contratos administrativos no Brasil, substituindo a Lei 8.666/1993.
- **Exemplo prático:** contratação de servidores ou licenças de software pelo TRT4 mediante pregão eletrônico.
- **Conexões:** [[res-cnj-400-2021]] · [[pdtic-trt4]]
- **Fontes:** [Lei 14.133/2021 – Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm)
`;

export const DatabaseManagerModal: React.FC<DatabaseManagerModalProps> = ({
  onDatabaseUpdated,
  onClose,
}) => {
  const [tab, setTab] = useState<'markdown' | 'disciplina' | 'tema' | 'pergunta' | 'sprites' | 'backup'>('markdown');
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  // Tab 5: Sprites / Fichas (Nano Banana sheets + Custom Hero Sprite Sheet uploader)
  const [savedHeroSheet, setSavedHeroSheet] = useState<CustomHeroSheetConfig | null>(() => loadCustomHeroSheetConfig());
  const [sheetDataUrl, setSheetDataUrl] = useState<string>(savedHeroSheet?.dataUrl || '');
  const [sheetRows, setSheetRows] = useState<number>(savedHeroSheet?.rows || 4);
  const [sheetCols, setSheetCols] = useState<number>(savedHeroSheet?.cols || 4);
  const [previewWalk, setPreviewWalk] = useState<Record<'down' | 'up' | 'left' | 'right', HTMLCanvasElement[]> | null>(null);
  const [atlasReadyState, setAtlasReadyState] = useState(() => Boolean(getSpriteAtlas()?.ready));
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return subscribeSpriteAtlas(() => {
      setAtlasReadyState(Boolean(getSpriteAtlas()?.ready));
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!sheetDataUrl) {
      setPreviewWalk(null);
      return;
    }
    sliceCustomHeroSheet({
      dataUrl: sheetDataUrl,
      rows: sheetRows,
      cols: sheetCols,
      rowOrder: ['down', 'up', 'left', 'right'],
    })
      .then((walk) => {
        if (!cancelled) setPreviewWalk(walk);
      })
      .catch(() => {
        if (!cancelled) setPreviewWalk(null);
      });
    return () => {
      cancelled = true;
    };
  }, [sheetDataUrl, sheetRows, sheetCols]);

  // Animated 4-direction sprite preview loop inside Sprites tab
  useEffect(() => {
    if (tab !== 'sprites') return;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dirs: ('down' | 'up' | 'left' | 'right')[] = ['down', 'up', 'left', 'right'];
    const labels = ['Frente ↓', 'Costas ↑', 'Esquerda ←', 'Direita →'];
    let rafId = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = Math.max(0, (now - start) / 1000);
      const walkSource = previewWalk || getSpriteAtlas()?.heroWalk || null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Checkerboard transparency background so user clearly sees the clean cutout!
      const cell = 12;
      for (let y = 0; y < canvas.height; y += cell) {
        for (let x = 0; x < canvas.width; x += cell) {
          ctx.fillStyle = ((x / cell + y / cell) & 1) === 0 ? '#1b2030' : '#252c40';
          ctx.fillRect(x, y, cell, cell);
        }
      }

      if (walkSource) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        dirs.forEach((dir, idx) => {
          const frames = walkSource[dir];
          if (!frames || frames.length === 0) return;
          const frameIdx = Math.floor(elapsed * 5) % frames.length;
          const frame = frames[frameIdx];
          if (!frame) return;
          const slotW = canvas.width / 4;
          const sx = Math.round(idx * slotW + (slotW - 84) / 2);
          ctx.drawImage(frame, sx, 14, 84, 84);
          ctx.fillStyle = 'rgba(15, 18, 26, 0.85)';
          ctx.fillRect(idx * slotW + 8, 102, slotW - 16, 18);
          ctx.fillStyle = '#fde68a';
          ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(labels[idx], idx * slotW + slotW / 2, 115);
        });
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [tab, previewWalk, atlasReadyState]);

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

  const customDb = useMemo(() => loadCustomDatabase(), [refreshTick]);
  const allZonas = useMemo(() => getAllZonas(), [refreshTick]);
  const allFichas = useMemo(() => getAllFichas(), [refreshTick]);

  // Tab 1: Import Markdown (.md)
  const [mdRegion, setMdRegion] = useState<RegionId>('reino-da-toga');
  const [mdExistingZona, setMdExistingZona] = useState<string>('');
  const [mdText, setMdText] = useState('');

  // Tab 2: New Disciplina (Zona)
  const [zonaNome, setZonaNome] = useState('');
  const [zonaRegiao, setZonaRegiao] = useState<RegionId>('reino-da-toga');
  const [zonaCargo, setZonaCargo] = useState<CargoScope>('ambos');
  const [zonaNivel, setZonaNivel] = useState(2);
  const [zonaMiniBoss, setZonaMiniBoss] = useState('');

  // Tab 3: New Tema / Ficha (NPC)
  const [fichaZonaId, setFichaZonaId] = useState<string>(allZonas[0]?.id || '');
  const [fichaTitulo, setFichaTitulo] = useState('');
  const [fichaCargo, setFichaCargo] = useState<CargoScope>('ambos');
  const [fichaNpcName, setFichaNpcName] = useState('');
  const [fichaOque, setFichaOque] = useState('');
  const [fichaExemplo, setFichaExemplo] = useState('');
  const [fichaAviso, setFichaAviso] = useState('');
  const [fichaConexoes, setFichaConexoes] = useState('');
  const [fichaFonteUrl, setFichaFonteUrl] = useState('');

  // Tab 4: New Question
  const [qFichaId, setQFichaId] = useState<string>(allFichas[0]?.id || '');
  const [qTipo, setQTipo] = useState<'multipla_escolha' | 'certo_errado'>('multipla_escolha');
  const [qEnunciado, setQEnunciado] = useState('');
  const [qAlts, setQAlts] = useState<string[]>(['', '', '', '', '']);
  const [qCorreta, setQCorreta] = useState(0);
  const [qTrecho, setQTrecho] = useState('');
  const [qIsRealExam, setQIsRealExam] = useState(false);
  const [qBanca, setQBanca] = useState('FCC');
  const [qAno, setQAno] = useState('2025');
  const [qOrgao, setQOrgao] = useState('TRT4');

  // Tab 5: Backup JSON
  const [jsonInput, setJsonInput] = useState('');

  const commitDb = (next: ReturnType<typeof loadCustomDatabase>, msg: string) => {
    saveCustomDatabase(next);
    invalidateWorldCache();
    setRefreshTick((t) => t + 1);
    setFeedback({ kind: 'ok', text: msg });
    onDatabaseUpdated(msg);
  };

  const handleLoadMdFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMdText(String(reader.result || ''));
      setFeedback({ kind: 'ok', text: `Arquivo "${file.name}" carregado! Revise e clique em Importar.` });
    };
    reader.readAsText(file, 'utf-8');
  };

  const handleImportMarkdown = () => {
    const parsed = parseMarkdownToCustomEntries(mdText, mdRegion, mdExistingZona || undefined);
    if (!parsed.ok) {
      setFeedback({ kind: 'err', text: parsed.error });
      return;
    }
    const cur = loadCustomDatabase();
    const nextZonas = parsed.zona
      ? [...cur.zonas.filter((z) => z.id !== parsed.zona!.id), parsed.zona]
      : cur.zonas;
    const newFichaIds = new Set(parsed.fichas.map((f) => f.id));
    const nextFichas = [...cur.fichas.filter((f) => !newFichaIds.has(f.id)), ...parsed.fichas];
    const newQIds = new Set(parsed.questions.map((q) => q.id));
    const nextQuestions = [...cur.questions.filter((q) => !newQIds.has(q.id)), ...parsed.questions];

    commitDb(
      { version: 1, zonas: nextZonas, fichas: nextFichas, questions: nextQuestions },
      `Markdown importado! ${parsed.zona ? `Nova disciplina "${parsed.zona.nome}" + ` : ''}${parsed.fichas.length} NPC(s) e ${parsed.questions.length} pergunta(s) adicionados ao mundo!`
    );
    setMdText('');
  };

  const handleAddZona = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zonaNome.trim()) {
      setFeedback({ kind: 'err', text: 'Informe o nome da nova disciplina.' });
      return;
    }
    const z = createCustomZona({
      nome: zonaNome,
      regiaoId: zonaRegiao,
      cargo: zonaCargo,
      nivelSugerido: zonaNivel,
      miniBossName: zonaMiniBoss,
    });
    const cur = loadCustomDatabase();
    commitDb(
      { ...cur, zonas: [...cur.zonas.filter((x) => x.id !== z.id), z] },
      `Nova disciplina "${z.nome}" criada na região selecionada! Agora você pode adicionar temas/NPCs nela.`
    );
    setFichaZonaId(z.id);
    setZonaNome('');
    setZonaMiniBoss('');
  };

  const handleAddFicha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fichaTitulo.trim() || !fichaOque.trim()) {
      setFeedback({ kind: 'err', text: 'Preencha pelo menos o Título do Tema e "O que é".' });
      return;
    }
    const conexoesList = fichaConexoes
      .split(/[,\s;·]+/)
      .map((s) => s.replace(/[\[\]]/g, '').trim().toLowerCase())
      .filter(Boolean);

    const { ficha, questions } = createCustomFicha({
      titulo: fichaTitulo,
      zonaId: fichaZonaId || allZonas[0].id,
      cargo: fichaCargo,
      npcName: fichaNpcName,
      oQueE: fichaOque,
      exemploPratico: fichaExemplo,
      avisoOraculo: fichaAviso,
      conexoes: conexoesList,
      fonteUrl: fichaFonteUrl,
    });

    const cur = loadCustomDatabase();
    commitDb(
      {
        ...cur,
        fichas: [...cur.fichas.filter((f) => f.id !== ficha.id), ficha],
        questions: [...cur.questions.filter((q) => q.fichaId !== ficha.id), ...questions],
      },
      `Tema "${ficha.titulo}" salvo! NPC ${ficha.npcName} e ${questions.length} perguntas já estão ativos no mapa e no Grimório.`
    );
    setFichaTitulo('');
    setFichaNpcName('');
    setFichaOque('');
    setFichaExemplo('');
    setFichaAviso('');
    setFichaConexoes('');
    setFichaFonteUrl('');
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const refFicha = allFichas.find((f) => f.id === qFichaId) || allFichas[0];
    if (!qEnunciado.trim() || !qTrecho.trim()) {
      setFeedback({ kind: 'err', text: 'Informe o enunciado e o trecho literal para o balão "📜 Por quê?".' });
      return;
    }
    if (qEnunciado.includes('⚠️') || qTrecho.includes('⚠️')) {
      setFeedback({ kind: 'err', text: 'Linhas com ⚠️ são Avisos do Oráculo e não podem virar perguntas.' });
      return;
    }
    const alternativas =
      qTipo === 'certo_errado'
        ? ['Certo', 'Errado']
        : qAlts.map((a) => a.trim()).filter(Boolean);
    if (alternativas.length < 2 || qCorreta < 0 || qCorreta >= alternativas.length) {
      setFeedback({ kind: 'err', text: 'Preencha pelo menos 2 alternativas e selecione a resposta correta.' });
      return;
    }

    const q: Question = {
      id: `custom-manual-${Date.now()}`,
      fichaId: refFicha.id,
      fichaTitulo: refFicha.titulo,
      zonaId: refFicha.zonaId,
      regiaoId: refFicha.regiaoId,
      cargo: refFicha.cargo,
      tipo: qTipo,
      enunciado: qEnunciado.trim(),
      alternativas,
      correta: qCorreta,
      trechoFonte: qTrecho.trim(),
      dificuldade: 2,
      isBossStyle: true,
      isRealExam: qIsRealExam,
      banca: qIsRealExam ? qBanca.trim() || 'FCC' : undefined,
      ano: qIsRealExam && Number(qAno) ? Number(qAno) : undefined,
      orgao: qIsRealExam ? qOrgao.trim() || 'TRT4' : undefined,
    };

    const cur = loadCustomDatabase();
    commitDb(
      { ...cur, questions: [...cur.questions, q] },
      `Pergunta adicionada à ficha "${refFicha.titulo}"! Ela já entra nos duelos, monstros e bosses.`
    );
    setQEnunciado('');
    setQAlts(['', '', '', '', '']);
    setQTrecho('');
    setQCorreta(0);
  };

  const handleDownloadDbJson = () => {
    const blob = new Blob([exportCustomDatabaseJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cronicas-trt4-base-customizada-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback({ kind: 'ok', text: 'Pacote JSON da base customizada baixado com sucesso!' });
  };

  const handleImportDbJson = () => {
    const res = importCustomDatabaseJson(jsonInput);
    if (!res.ok) {
      setFeedback({ kind: 'err', text: res.error });
      return;
    }
    invalidateWorldCache();
    setRefreshTick((t) => t + 1);
    const msg = `Base atualizada: +${res.addedZonas} disciplina(s), +${res.addedFichas} tema(s), +${res.addedQuestions} pergunta(s)!`;
    setFeedback({ kind: 'ok', text: msg });
    onDatabaseUpdated(msg);
    setJsonInput('');
  };

  const handleClearCustomDb = () => {
    commitDb(
      { version: 1, zonas: [], fichas: [], questions: [] },
      'Itens customizados removidos. A base original dos 14 MDs permanece intacta.'
    );
  };

  const handleUploadHeroSheet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSheetDataUrl(String(reader.result || ''));
      setFeedback({
        kind: 'ok',
        text: `Ficha "${file.name}" recortada automaticamente! Confira a prévia animada abaixo e clique em Aplicar.`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleApplyHeroSheet = async () => {
    if (!sheetDataUrl) {
      setFeedback({ kind: 'err', text: 'Envie uma imagem de ficha de personagem (.png ou .jpg) primeiro.' });
      return;
    }
    const cfg: CustomHeroSheetConfig = {
      dataUrl: sheetDataUrl,
      rows: sheetRows,
      cols: sheetCols,
      rowOrder: ['down', 'up', 'left', 'right'],
    };
    try {
      await saveCustomHeroSheet(cfg);
      setSavedHeroSheet(cfg);
      const msg = 'Nova ficha de personagem aplicada com recorte automático de fundo!';
      setFeedback({ kind: 'ok', text: msg });
      onDatabaseUpdated(msg);
    } catch {
      setFeedback({ kind: 'err', text: 'Não foi possível salvar a imagem (tente um arquivo menor que 1,5 MB).' });
    }
  };

  const handleRestoreDefaultHero = async () => {
    await saveCustomHeroSheet(null);
    setSavedHeroSheet(null);
    setSheetDataUrl('');
    const msg = 'Herói restaurado para a ficha oficial Nano Banana!';
    setFeedback({ kind: 'ok', text: msg });
    onDatabaseUpdated(msg);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/82"
      role="dialog"
      aria-modal="true"
      aria-label="Gerenciador de Base de Dados de Estudo"
    >
      <div className="rpg-panel w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#3a352c] bg-[#141721] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-[#e6b84c]" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#f4efe4]">
                Editor &amp; Atualizador da Base de Dados
              </h2>
              <div className="text-xs font-mono-num text-[#cbd5e1]">
                Base ativa: {allZonas.length} disciplinas · {allFichas.length} temas/NPCs · Customizados: +{customDb.zonas.length} disc / +{customDb.fichas.length} temas / +{customDb.questions.length} questões
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar gerenciador de base"
            className="p-2 bg-[#23283a] hover:bg-[#313850] text-[#f4efe4] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-2.5 flex flex-wrap gap-1.5 border-b border-[#2a2f40] bg-[#131620]">
          {[
            { id: 'markdown', label: 'Importar Markdown (.md)', icon: FileText },
            { id: 'disciplina', label: '+ Nova Disciplina', icon: FolderPlus },
            { id: 'tema', label: '+ Novo Tema (NPC)', icon: Plus },
            { id: 'pergunta', label: '+ Nova Pergunta', icon: HelpCircle },
            { id: 'sprites', label: 'Sprites / Fichas (Nano Banana)', icon: ImageIcon },
            { id: 'backup', label: `Exportar / Pacote JSON (${customDb.zonas.length + customDb.fichas.length + customDb.questions.length})`, icon: Download },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                data-testid={`tab-${t.id}`}
                onClick={() => {
                  setTab(t.id as typeof tab);
                  setFeedback(null);
                }}
                className={`px-3 py-2 text-xs font-semibold border-b-2 inline-flex items-center gap-1.5 cursor-pointer ${
                  tab === t.id
                    ? 'border-[#e6b84c] text-[#f5d76e] bg-[#1c2130]'
                    : 'border-transparent text-[#94a3b8] hover:text-[#f4efe4]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {feedback && (
            <div
              data-testid="db-feedback"
              className={`p-3.5 border text-sm flex items-start gap-2.5 ${
                feedback.kind === 'ok'
                  ? 'bg-[#12261d] border-[#22c55e] text-[#bbf7d0]'
                  : 'bg-[#33161b] border-[#ef4444] text-[#fecaca]'
              }`}
            >
              {feedback.kind === 'ok' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* TAB 1: IMPORT MARKDOWN (.md) DIRECTLY IN BROWSER */}
          {tab === 'markdown' && (
            <div className="space-y-4">
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                Envie um arquivo <code className="text-[#fde68a]">.md</code> (no mesmo formato das suas fichas com <code className="text-[#fde68a]">## [[id]] 🟢 Título</code>) ou cole o texto abaixo. O jogo cria automaticamente a disciplina, posiciona os novos NPCs no mapa e gera 3 perguntas fundamentadas por ficha!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Região do Mapa onde inserir:</span>
                  <select
                    value={mdRegion}
                    onChange={(e) => setMdRegion(e.target.value as RegionId)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    {REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nome} ({r.subtitulo})
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Disciplina de destino (opcional):</span>
                  <select
                    value={mdExistingZona}
                    onChange={(e) => setMdExistingZona(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    <option value="">Criar nova disciplina automaticamente (do frontmatter)</option>
                    {allZonas.map((z) => (
                      <option key={z.id} value={z.id}>
                        Adicionar em: {z.nome}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="px-4 py-2 bg-[#23283a] hover:bg-[#303752] border border-[#6e5c3e] text-xs font-semibold text-[#f4efe4] inline-flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4 text-[#38bdf8]" />
                  Escolher arquivo .md do computador
                  <input type="file" accept=".md,.txt,text/markdown" onChange={handleLoadMdFile} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={() => setMdText(SAMPLE_MD)}
                  className="px-3.5 py-2 bg-[#1a2030] hover:bg-[#252d42] border border-[#3b4259] text-xs text-[#fde68a] cursor-pointer"
                >
                  Carregar exemplo de Markdown
                </button>
              </div>

              <textarea
                rows={10}
                value={mdText}
                onChange={(e) => setMdText(e.target.value)}
                placeholder={SAMPLE_MD}
                className="w-full p-3 bg-[#0f121a] border border-[#3a4056] font-mono text-xs text-[#f4efe4] leading-relaxed"
              />

              <button
                type="button"
                data-testid="import-md-submit"
                onClick={handleImportMarkdown}
                className="px-6 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer"
              >
                Importar Markdown e Atualizar o Mundo
              </button>
            </div>
          )}

          {/* TAB 2: ADD NEW DISCIPLINA (ZONA) */}
          {tab === 'disciplina' && (
            <form onSubmit={handleAddZona} className="space-y-4 max-w-2xl">
              <p className="text-sm text-[#cbd5e1]">
                Adicione uma nova matéria do edital ao mapa aberto. Ela receberá placa de entrada, Mini-Boss próprio, entrada no Fast Travel e barra de domínio no Grimório.
              </p>
              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#e6b84c]">Nome da Disciplina *</span>
                <input
                  type="text"
                  value={zonaNome}
                  onChange={(e) => setZonaNome(e.target.value)}
                  placeholder="Ex.: Direito Administrativo — Lei 14.133/2021"
                  className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Região Temática</span>
                  <select
                    value={zonaRegiao}
                    onChange={(e) => setZonaRegiao(e.target.value as RegionId)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    {REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Cargo</span>
                  <select
                    value={zonaCargo}
                    onChange={(e) => setZonaCargo(e.target.value as CargoScope)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    <option value="ambos">🟢 Ambos (Técnico + Analista)</option>
                    <option value="tecnico">🔵 Só Técnico TI</option>
                    <option value="analista">🟣 Só Analista TI</option>
                  </select>
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Nível Sugerido</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={zonaNivel}
                    onChange={(e) => setZonaNivel(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  />
                </label>
              </div>

              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#e6b84c]">Nome do Mini-Boss da Disciplina (opcional)</span>
                <input
                  type="text"
                  value={zonaMiniBoss}
                  onChange={(e) => setZonaMiniBoss(e.target.value)}
                  placeholder="Ex.: Titã da Licitação"
                  className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                />
              </label>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer"
              >
                Criar Disciplina no Mundo
              </button>
            </form>
          )}

          {/* TAB 3: ADD NEW TEMA / FICHA (NPC) */}
          {tab === 'tema' && (
            <form onSubmit={handleAddFicha} className="space-y-3.5 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Disciplina (Zona) *</span>
                  <select
                    value={fichaZonaId}
                    onChange={(e) => setFichaZonaId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    {allZonas.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Cargo</span>
                  <select
                    value={fichaCargo}
                    onChange={(e) => setFichaCargo(e.target.value as CargoScope)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    <option value="ambos">🟢 Ambos os cargos</option>
                    <option value="tecnico">🔵 Só Técnico TI</option>
                    <option value="analista">🟣 Só Analista TI</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="sm:col-span-2 block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Título do Tema / Ficha *</span>
                  <input
                    type="text"
                    value={fichaTitulo}
                    onChange={(e) => setFichaTitulo(e.target.value)}
                    placeholder="Ex.: Pregão Eletrônico na Lei 14.133/2021"
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  />
                </label>
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Nome do NPC (opcional)</span>
                  <input
                    type="text"
                    value={fichaNpcName}
                    onChange={(e) => setFichaNpcName(e.target.value)}
                    placeholder="Ex.: Pregoeira Júlia"
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  />
                </label>
              </div>

              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#e6b84c]">O que é (definição oficial — vira aula e perguntas) *</span>
                <textarea
                  rows={3}
                  value={fichaOque}
                  onChange={(e) => setFichaOque(e.target.value)}
                  placeholder="Explique o conceito de forma fiel à sua fonte de estudo..."
                  className="w-full p-2.5 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                />
              </label>

              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#e6b84c]">Exemplo prático (opcional)</span>
                <textarea
                  rows={2}
                  value={fichaExemplo}
                  onChange={(e) => setFichaExemplo(e.target.value)}
                  placeholder="Como esse tema aparece na prática do TRT4 ou na prova da FCC..."
                  className="w-full p-2.5 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Conexões [[id]] (separadas por vírgula)</span>
                  <input
                    type="text"
                    value={fichaConexoes}
                    onChange={(e) => setFichaConexoes(e.target.value)}
                    placeholder="Ex.: lgpd, pdtic-trt4"
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  />
                </label>
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Link da Fonte Oficial (opcional)</span>
                  <input
                    type="url"
                    value={fichaFonteUrl}
                    onChange={(e) => setFichaFonteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  />
                </label>
              </div>

              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#fbbf24]">Aviso do Oráculo ⚠️ (incerteza — NUNCA vira pergunta)</span>
                <input
                  type="text"
                  value={fichaAviso}
                  onChange={(e) => setFichaAviso(e.target.value)}
                  placeholder="Opcional: anote aqui algo que ainda precisa confirmar na banca/edital."
                  className="w-full px-3 py-2 bg-[#0f121a] border border-[#78350f] text-sm text-[#fde68a]"
                />
              </label>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer"
              >
                Salvar Tema, Criar NPC e Gerar 3 Perguntas
              </button>
            </form>
          )}

          {/* TAB 4: ADD NEW QUESTION */}
          {tab === 'pergunta' && (
            <form onSubmit={handleAddQuestion} className="space-y-3.5 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Ficha / Tema de Origem *</span>
                  <select
                    value={qFichaId}
                    onChange={(e) => setQFichaId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    {allFichas.map((f) => (
                      <option key={f.id} value={f.id}>
                        [{f.materia}] {f.titulo.slice(0, 56)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="font-semibold text-[#e6b84c]">Tipo da Pergunta</span>
                  <select
                    value={qTipo}
                    onChange={(e) => {
                      setQTipo(e.target.value as 'multipla_escolha' | 'certo_errado');
                      setQCorreta(0);
                    }}
                    className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                  >
                    <option value="multipla_escolha">Múltipla Escolha (A–E estilo FCC)</option>
                    <option value="certo_errado">Certo ou Errado</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#e6b84c]">Enunciado da Pergunta *</span>
                <textarea
                  rows={3}
                  value={qEnunciado}
                  onChange={(e) => setQEnunciado(e.target.value)}
                  placeholder="Digite o enunciado da questão..."
                  className="w-full p-2.5 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                />
              </label>

              {qTipo === 'multipla_escolha' ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#e6b84c]">
                    Alternativas (marque a bolinha da alternativa correta):
                  </div>
                  {['A', 'B', 'C', 'D', 'E'].map((letter, idx) => (
                    <div key={letter} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={qCorreta === idx}
                        onChange={() => setQCorreta(idx)}
                        className="accent-[#d9a441] w-4 h-4"
                      />
                      <span className="font-mono-num text-xs font-bold text-[#f5d76e] w-5">{letter})</span>
                      <input
                        type="text"
                        value={qAlts[idx]}
                        onChange={(e) => {
                          const next = [...qAlts];
                          next[idx] = e.target.value;
                          setQAlts(next);
                        }}
                        placeholder={`Alternativa ${letter}`}
                        className="flex-1 px-3 py-1.5 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-4 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ceOpt"
                      checked={qCorreta === 0}
                      onChange={() => setQCorreta(0)}
                      className="accent-[#d9a441]"
                    />
                    Gabarito: Certo
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ceOpt"
                      checked={qCorreta === 1}
                      onChange={() => setQCorreta(1)}
                      className="accent-[#d9a441]"
                    />
                    Gabarito: Errado
                  </label>
                </div>
              )}

              <label className="block space-y-1 text-xs">
                <span className="font-semibold text-[#e6b84c]">
                  Trecho literal da fonte (exibido no balão &ldquo;📜 Por quê?&rdquo;) *
                </span>
                <textarea
                  rows={2}
                  value={qTrecho}
                  onChange={(e) => setQTrecho(e.target.value)}
                  placeholder="Cole o trecho exato da lei, resolução ou ficha que justifica a resposta..."
                  className="w-full p-2.5 bg-[#0f121a] border border-[#3a4056] text-sm text-[#f4efe4]"
                />
              </label>

              <div className="p-3 bg-[#121622] border border-[#2c3245] space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#fde68a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={qIsRealExam}
                    onChange={(e) => setQIsRealExam(e.target.checked)}
                    className="accent-[#d9a441]"
                  />
                  Marcar como &ldquo;Questão de prova real&rdquo; (exibe banca, ano e órgão nos Bosses)
                </label>
                {qIsRealExam && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <input
                      type="text"
                      value={qBanca}
                      onChange={(e) => setQBanca(e.target.value)}
                      placeholder="Banca (FCC)"
                      className="px-2.5 py-1.5 bg-[#0f121a] border border-[#3a4056] text-xs text-[#f4efe4]"
                    />
                    <input
                      type="text"
                      value={qAno}
                      onChange={(e) => setQAno(e.target.value)}
                      placeholder="Ano (2025)"
                      className="px-2.5 py-1.5 bg-[#0f121a] border border-[#3a4056] text-xs text-[#f4efe4]"
                    />
                    <input
                      type="text"
                      value={qOrgao}
                      onChange={(e) => setQOrgao(e.target.value)}
                      placeholder="Órgão (TRT4)"
                      className="px-2.5 py-1.5 bg-[#0f121a] border border-[#3a4056] text-xs text-[#f4efe4]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer"
              >
                Adicionar Pergunta ao Banco
              </button>
            </form>
          )}

          {/* TAB 5: SPRITES / FICHAS DE PERSONAGEM (NANO BANANA + CHROMA-KEY AUTOMÁTICO) */}
          {tab === 'sprites' && (
            <div className="space-y-5">
              <div className="p-4 bg-[#121622] border border-[#3a4056] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-display text-base font-bold text-[#f5d76e]">
                    Motor de Recorte Automático &amp; Animação (Nano Banana)
                  </div>
                  <span className="text-xs font-mono-num px-2.5 py-0.5 bg-[#12261d] border border-[#22c55e]/60 text-[#86efac]">
                    {atlasReadyState ? '7 Fichas Nano Banana Ativas' : 'Carregando Fichas...'}
                  </span>
                </div>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  Todos os personagens, NPCs, cachorrinhos, monstros, chefes, construções de cidade e terrenos são fatiados em tempo real a partir de fichas ilustradas pelo Nano Banana, com remoção automática de fundo (chroma-key + anti-halo) e alinhamento pelos pés.
                </p>
              </div>

              {/* Live Animated Cutout Preview */}
              <div className="p-4 bg-[#141721] border border-[#6e5c3e] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#e6b84c]">
                    Prévia Animada do Herói (Fundo Recortado em Tempo Real)
                  </div>
                  <div className="text-xs text-[#94a3b8]">
                    {sheetDataUrl
                      ? 'Exibindo sua ficha enviada (não aplicada ainda)'
                      : savedHeroSheet
                        ? 'Ficha customizada ativa'
                        : 'Ficha oficial Nano Banana ativa'}
                  </div>
                </div>
                <canvas
                  ref={previewCanvasRef}
                  width={480}
                  height={128}
                  data-testid="sprite-preview-canvas"
                  className="w-full max-w-lg h-32 border border-[#3a4056] mx-auto block"
                />

                {/* Upload Custom Character Sprite Sheet */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#2a2f40]">
                  <label className="block space-y-1 text-xs sm:col-span-1">
                    <span className="font-semibold text-[#e6b84c]">Enviar Nova Ficha (.PNG / .JPG):</span>
                    <label className="w-full px-3 py-2 bg-[#23283a] hover:bg-[#313850] border border-[#6e5c3e] text-xs font-semibold text-[#f4efe4] inline-flex items-center justify-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-[#38bdf8]" />
                      Escolher Ficha
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleUploadHeroSheet}
                        className="hidden"
                      />
                    </label>
                  </label>

                  <label className="block space-y-1 text-xs">
                    <span className="font-semibold text-[#e6b84c]">Linhas (↓ ↑ ← →):</span>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={sheetRows}
                      onChange={(e) => setSheetRows(Math.max(1, Math.min(8, Number(e.target.value) || 4)))}
                      className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm font-mono-num text-[#f4efe4]"
                    />
                  </label>

                  <label className="block space-y-1 text-xs">
                    <span className="font-semibold text-[#e6b84c]">Colunas (Quadros por linha):</span>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={sheetCols}
                      onChange={(e) => setSheetCols(Math.max(1, Math.min(12, Number(e.target.value) || 4)))}
                      className="w-full px-3 py-2 bg-[#0f121a] border border-[#3a4056] text-sm font-mono-num text-[#f4efe4]"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    type="button"
                    disabled={!sheetDataUrl}
                    onClick={handleApplyHeroSheet}
                    className="px-5 py-2 bg-[#d9a441] hover:bg-[#e8b652] disabled:opacity-40 text-[#14110b] font-bold text-sm cursor-pointer disabled:cursor-not-allowed"
                  >
                    Aplicar Ficha no Herói
                  </button>
                  {(savedHeroSheet || sheetDataUrl) && (
                    <button
                      type="button"
                      onClick={handleRestoreDefaultHero}
                      className="px-4 py-2 bg-[#23283a] hover:bg-[#313850] border border-[#6e5c3e] text-sm font-semibold text-[#f4efe4] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-[#fde68a]" />
                      Restaurar Herói Nano Banana
                    </button>
                  )}
                </div>
              </div>

              {/* Built-in 7 Nano Banana Sheets Gallery */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#a8a29e]">
                  7 Fichas Ilustradas Integradas ao Jogo:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5">
                  {[
                    { label: 'Herói (4×6)', src: GENERATED_SHEETS.hero },
                    { label: 'Fadinha Lumina', src: GENERATED_SHEETS.fairy },
                    { label: 'NPCs Masc. & Pets', src: GENERATED_SHEETS.npcsPets },
                    { label: 'NPCs Femininas', src: GENERATED_SHEETS.npcsFemale },
                    { label: 'Monstros & Bosses', src: GENERATED_SHEETS.monsters },
                    { label: 'Casas & Fontes', src: GENERATED_SHEETS.townProps },
                    { label: 'Terrenos (4×4)', src: GENERATED_SHEETS.terrain },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0f121a] border border-[#2d3345] p-1.5 space-y-1">
                      <img
                        src={item.src}
                        alt={item.label}
                        referrerPolicy="no-referrer"
                        className="w-full aspect-square object-cover border border-[#23283a]"
                      />
                      <div className="text-[11px] font-semibold text-[#e5e0d5] text-center truncate">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP / IMPORT JSON PACKAGE + MANAGE CUSTOM ITEMS */}
          {tab === 'backup' && (
            <div className="space-y-4">
              <p className="text-sm text-[#cbd5e1]">
                Todas as disciplinas, temas e perguntas que você adicionar ficam salvas automaticamente no navegador. Você pode exportar um pacote <code className="text-[#fde68a]">.json</code> para backup ou importar em outro computador.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDownloadDbJson}
                  className="px-4 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Exportar Base Customizada (.JSON)
                </button>
                {(customDb.zonas.length > 0 || customDb.fichas.length > 0 || customDb.questions.length > 0) && (
                  <button
                    type="button"
                    onClick={handleClearCustomDb}
                    className="px-4 py-2.5 bg-[#33161b] hover:bg-[#471f26] border border-[#ef4444]/60 text-sm font-semibold text-[#fecaca] inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar Apenas Itens Customizados
                  </button>
                )}
              </div>

              <div className="space-y-2 pt-3 border-t border-[#2d3345]">
                <label className="block text-xs font-semibold text-[#e6b84c]">
                  Importar Pacote JSON da Base (mescla sem apagar o que já existe):
                </label>
                <textarea
                  rows={6}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"version": 1, "zonas": [...], "fichas": [...], "questions": [...]}'
                  className="w-full p-3 bg-[#0f121a] border border-[#3a4056] font-mono text-xs text-[#f4efe4]"
                />
                <button
                  type="button"
                  onClick={handleImportDbJson}
                  className="px-5 py-2 bg-[#23283a] hover:bg-[#313952] border border-[#6e5c3e] text-sm font-semibold text-[#f4efe4] inline-flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#38bdf8]" />
                  Importar Pacote JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
