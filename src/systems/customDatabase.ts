import { FICHAS, FICHA_BY_ID, REGIONS, REGION_BY_ID, ZONAS } from '../data/content';
import { QUESTIONS } from '../data/questions';
import type {
  CargoScope,
  CustomDatabaseStore,
  Ficha,
  Question,
  RegionId,
  SourceLink,
  TablePair,
  ZonaInfo,
} from '../types';

const CUSTOM_DB_KEY = 'cronicas_trt4_custom_db_v1';

let dbRevision = 1;
let cachedStore: CustomDatabaseStore | null = null;
const listeners = new Set<() => void>();

function emptyStore(): CustomDatabaseStore {
  return { version: 1, zonas: [], fichas: [], questions: [] };
}

export function loadCustomDatabase(): CustomDatabaseStore {
  if (cachedStore) return cachedStore;
  if (typeof window === 'undefined') {
    cachedStore = emptyStore();
    return cachedStore;
  }
  try {
    const raw = window.localStorage.getItem(CUSTOM_DB_KEY);
    if (!raw) {
      cachedStore = emptyStore();
      return cachedStore;
    }
    const parsed = JSON.parse(raw) as Partial<CustomDatabaseStore>;
    cachedStore = {
      version: 1,
      zonas: Array.isArray(parsed.zonas) ? parsed.zonas : [],
      fichas: Array.isArray(parsed.fichas) ? parsed.fichas : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
    };
    return cachedStore;
  } catch {
    cachedStore = emptyStore();
    return cachedStore;
  }
}

export function saveCustomDatabase(next: CustomDatabaseStore): void {
  cachedStore = {
    version: 1,
    zonas: [...next.zonas],
    fichas: [...next.fichas],
    questions: [...next.questions],
  };
  dbRevision += 1;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CUSTOM_DB_KEY, JSON.stringify(cachedStore));
    } catch {
      // ignore quota error
    }
  }
  listeners.forEach((fn) => fn());
}

export function subscribeDatabaseChanges(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getDatabaseRevision(): number {
  return dbRevision;
}

export function getAllZonas(): ZonaInfo[] {
  const custom = loadCustomDatabase().zonas;
  if (custom.length === 0) return ZONAS;
  const map = new Map<string, ZonaInfo>();
  for (const z of ZONAS) map.set(z.id, z);
  for (const z of custom) map.set(z.id, z);
  return Array.from(map.values());
}

export function getAllFichas(): Ficha[] {
  const custom = loadCustomDatabase().fichas;
  if (custom.length === 0) return FICHAS;
  const map = new Map<string, Ficha>();
  for (const f of FICHAS) map.set(f.id, f);
  for (const f of custom) map.set(f.id, f);
  return Array.from(map.values());
}

export function getFichaById(id: string): Ficha | undefined {
  const custom = loadCustomDatabase().fichas.find((f) => f.id === id || f.aliasIds.includes(id));
  if (custom) return custom;
  return FICHA_BY_ID[id];
}

export function getAllQuestions(extraQuestions: Question[] = []): Question[] {
  const custom = loadCustomDatabase().questions;
  if (custom.length === 0 && extraQuestions.length === 0) return QUESTIONS;
  const map = new Map<string, Question>();
  for (const q of QUESTIONS) map.set(q.id, q);
  for (const q of custom) map.set(q.id, q);
  for (const q of extraQuestions) map.set(q.id, q);
  return Array.from(map.values());
}

export function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || `item-${Date.now()}`;
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const ROLE_BY_REGION: Record<RegionId, Ficha['npcRole']> = {
  'reino-da-toga': 'juiz',
  'cidadela-do-conselho': 'bibliotecaria',
  'floresta-do-codigo': 'mago',
  'fortaleza-da-muralha': 'guarda',
  'montanhas-da-infra': 'engenheiro',
  'porto-babel': 'capitao',
};

const NPC_FIRST_NAMES = [
  'Mestre Clara',
  'Sábio Mateus',
  'Escrivã Sofia',
  'Guardião Lucas',
  'Mentora Helena',
  'Arquiteto Bruno',
  'Curadora Lívia',
  'Cronista Rafael',
  'Inspetora Camila',
  'Orador Tiago',
];

function stripMd(s: string): string {
  return s
    .replace(/\[\[([a-z0-9-]+)\]\]/gi, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Auto-generates at least 3 grounded questions from a custom Ficha using strictly its own text
 * and distractors pulled from existing fichas (never inventing facts, never turning ⚠️ into questions).
 */
export function generateGroundedQuestionsForCustomFicha(ficha: Ficha): Question[] {
  const existingFichas = getAllFichas().filter((f) => f.id !== ficha.id);
  const sameRegion = existingFichas.filter((f) => f.regiaoId === ficha.regiaoId);
  const distractorPool = sameRegion.length >= 4 ? sameRegion : existingFichas;

  const qs: Question[] = [];
  const cleanOque = stripMd(ficha.oQueE);
  const cleanExemplo = stripMd(ficha.exemploPratico);
  const snippet = cleanOque.length > 180 ? `${cleanOque.slice(0, 176).trim()}…` : cleanOque;

  // 1. Múltipla escolha (A-E) baseada em "O que é"
  if (cleanOque && !cleanOque.includes('⚠️')) {
    const distractors = distractorPool
      .filter((d) => d.oQueE && !d.oQueE.includes('⚠️'))
      .slice(0, 4)
      .map((d) => {
        const txt = stripMd(d.oQueE);
        return txt.length > 150 ? `${txt.slice(0, 146).trim()}…` : txt;
      });
    while (distractors.length < 4) {
      distractors.push(`Conceito pertencente a outro tópico do edital (${distractors.length + 1}).`);
    }
    const alts = [snippet, ...distractors];
    const rot = hashStr(ficha.id) % alts.length;
    const rotated = [...alts.slice(rot), ...alts.slice(0, rot)];
    const correctIdx = (alts.length - rot) % alts.length;

    qs.push({
      id: `custom-q-${ficha.id}-mc1`,
      fichaId: ficha.id,
      fichaTitulo: ficha.titulo,
      zonaId: ficha.zonaId,
      regiaoId: ficha.regiaoId,
      cargo: ficha.cargo,
      tipo: 'multipla_escolha',
      enunciado: `De acordo com o material de estudo sobre "${ficha.titulo}", qual alternativa descreve corretamente este tema?`,
      alternativas: rotated,
      correta: correctIdx,
      trechoFonte: cleanOque,
      dificuldade: 1,
    });
  }

  // 2. Certo ou Errado (sempre sem ⚠️)
  const factLine = (ficha.fatosChave.find((f) => !f.includes('⚠️') && f.length >= 20) || cleanOque);
  if (factLine && !factLine.includes('⚠️')) {
    qs.push({
      id: `custom-q-${ficha.id}-ce1`,
      fichaId: ficha.id,
      fichaTitulo: ficha.titulo,
      zonaId: ficha.zonaId,
      regiaoId: ficha.regiaoId,
      cargo: ficha.cargo,
      tipo: 'certo_errado',
      enunciado: `Julgue a afirmação sobre "${ficha.titulo}": "${stripMd(factLine)}"`,
      alternativas: ['Certo — está de acordo com a ficha de estudo', 'Errado — contraria a ficha de estudo'],
      correta: 0,
      trechoFonte: stripMd(factLine),
      dificuldade: 1,
    });
  }

  // 3. Exemplo Prático ou Identificação de Título (estilo FCC)
  const sourceForQ3 = cleanExemplo && !cleanExemplo.includes('⚠️') ? cleanExemplo : cleanOque;
  if (sourceForQ3 && !sourceForQ3.includes('⚠️')) {
    const titleDistractors = distractorPool.slice(0, 4).map((d) => d.titulo);
    while (titleDistractors.length < 4) {
      titleDistractors.push(`Outro tema da região ${ficha.regiaoId} (${titleDistractors.length + 1})`);
    }
    const alts = [ficha.titulo, ...titleDistractors];
    const rot = (hashStr(ficha.id) + 2) % alts.length;
    const rotated = [...alts.slice(rot), ...alts.slice(0, rot)];
    const correctIdx = (alts.length - rot) % alts.length;

    qs.push({
      id: `custom-q-${ficha.id}-fcc1`,
      fichaId: ficha.id,
      fichaTitulo: ficha.titulo,
      zonaId: ficha.zonaId,
      regiaoId: ficha.regiaoId,
      cargo: ficha.cargo,
      tipo: 'multipla_escolha',
      enunciado: `Considere o seguinte cenário/definição do material: "${sourceForQ3.slice(0, 210)}". A qual ficha/conceito do edital ele se refere?`,
      alternativas: rotated,
      correta: correctIdx,
      trechoFonte: sourceForQ3,
      dificuldade: 2,
      isBossStyle: true,
    });
  }

  return qs;
}

/**
 * Creates a brand-new Zona (Disciplina) positioned cleanly inside the chosen Region!
 */
export function createCustomZona(params: {
  nome: string;
  regiaoId: RegionId;
  cargo: CargoScope;
  nivelSugerido: number;
  miniBossName?: string;
}): ZonaInfo {
  const region = REGION_BY_ID[params.regiaoId] || REGIONS[0];
  const id = `custom-zona-${slugifyId(params.nome)}`;
  const existingCustomInRegion = loadCustomDatabase().zonas.filter((z) => z.regiaoId === region.id).length;

  // Pick a walkable sub-area in the southern wing of the region so it never overlaps the central town plaza
  const subW = Math.min(20, Math.max(14, Math.floor(region.bounds.w * 0.36)));
  const subH = Math.min(14, Math.max(10, Math.floor(region.bounds.h * 0.22)));
  const offsetX = (existingCustomInRegion % 2) * Math.floor(region.bounds.w * 0.44);
  const offsetY = Math.floor(existingCustomInRegion / 2) * 12;
  const bx = Math.min(region.bounds.x + region.bounds.w - subW - 3, region.bounds.x + 5 + offsetX);
  const by = Math.max(
    region.bounds.y + 6,
    region.bounds.y + region.bounds.h - subH - 4 - offsetY
  );

  const caiEm =
    params.cargo === 'tecnico'
      ? ['Técnico TI']
      : params.cargo === 'analista'
        ? ['Analista TI']
        : ['Técnico TI', 'Analista TI'];

  return {
    id,
    arquivo: `${id}.md`,
    nome: params.nome.trim(),
    materia: params.nome.trim(),
    regiaoId: region.id,
    caiEm,
    peso: 'Customizada',
    nivelSugerido: Math.max(1, Math.min(20, Math.round(params.nivelSugerido || region.nivelSugerido))),
    miniBossName: params.miniBossName?.trim() || `Guardião de ${params.nome.trim().slice(0, 22)}`,
    miniBossTitle: `Mini-Boss · ${params.nome.trim()}`,
    miniBossSprite: region.bossSprite,
    bounds: { x: bx, y: by, w: subW, h: subH },
    signTile: { x: bx + 2, y: by + 2 },
  };
}

/**
 * Creates a single custom Ficha + automatically generates 3 grounded questions for it.
 */
export function createCustomFicha(params: {
  titulo: string;
  zonaId: string;
  cargo: CargoScope;
  oQueE: string;
  exemploPratico?: string;
  fatosExtra?: string[];
  conexoes?: string[];
  avisoOraculo?: string;
  fonteUrl?: string;
  fonteLabel?: string;
  npcName?: string;
}): { ficha: Ficha; questions: Question[] } {
  const zonas = getAllZonas();
  const zona = zonas.find((z) => z.id === params.zonaId) || zonas[0];
  const id = slugifyId(params.titulo);
  const seed = hashStr(id);

  const avisosOraculo = params.avisoOraculo?.trim() ? [params.avisoOraculo.trim()] : [];
  const fontes: SourceLink[] = [];
  if (params.fonteUrl?.trim()) {
    fontes.push({
      label: params.fonteLabel?.trim() || params.fonteUrl.trim(),
      url: params.fonteUrl.trim(),
    });
  }

  const fatosChave = [
    params.oQueE.trim(),
    ...(params.fatosExtra || []).map((f) => f.trim()).filter(Boolean),
  ];

  const textoLines = [
    `- **O que é:** ${params.oQueE.trim()}`,
    params.exemploPratico?.trim() ? `- **Exemplo prático:** ${params.exemploPratico.trim()}` : '',
    ...(params.fatosExtra || []).filter((l) => l.trim()).map((l) => `- ${l.trim()}`),
    params.conexoes && params.conexoes.length > 0
      ? `- **Conexões:** ${params.conexoes.map((c) => `[[${c}]]`).join(' · ')}`
      : '',
    avisosOraculo.length > 0 ? `- ⚠️ ${avisosOraculo[0]}` : '',
  ].filter(Boolean);

  const ficha: Ficha = {
    id,
    aliasIds: [],
    titulo: params.titulo.trim(),
    zonaId: zona.id,
    regiaoId: zona.regiaoId,
    materia: zona.nome,
    cargo: params.cargo,
    npcName: params.npcName?.trim() || NPC_FIRST_NAMES[seed % NPC_FIRST_NAMES.length],
    npcRole: ROLE_BY_REGION[zona.regiaoId] || 'sabio',
    npcSeed: seed % 997,
    oQueE: params.oQueE.trim(),
    exemploPratico: params.exemploPratico?.trim() || '',
    fatosChave,
    conexoes: (params.conexoes || []).map((c) => c.trim()).filter(Boolean),
    avisosOraculo,
    fontes,
    tablePairs: [],
    textoCompleto: textoLines.join('\n'),
  };

  const questions = generateGroundedQuestionsForCustomFicha(ficha);
  return { ficha, questions };
}

/**
 * Browser-side Markdown parser!
 * Accepts any Markdown file following the TRT4 study notes conventions:
 * - Frontmatter `materia`, `cai_em`
 * - `## [[id]] 🟢/🔵/🟣 Título`
 * - `**O que é:**`, `**Exemplo prático:**`, `**Conexões:** [[id]]`, `**Fontes:** [label](url)`, `⚠️` lines
 */
export function parseMarkdownToCustomEntries(
  markdownText: string,
  targetRegiaoId: RegionId,
  existingZonaId?: string
): { ok: true; zona: ZonaInfo | null; fichas: Ficha[]; questions: Question[] } | { ok: false; error: string } {
  const raw = markdownText.replace(/\r\n/g, '\n').trim();
  if (!raw) {
    return { ok: false, error: 'Cole ou carregue o conteúdo de um arquivo Markdown (.md).' };
  }

  let materia = '';
  let defaultCargo: CargoScope = 'ambos';
  let body = raw;

  // Parse optional YAML frontmatter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const matMatch = fm.match(/^materia:\s*(.+)$/m);
    if (matMatch) materia = matMatch[1].replace(/^["']|["']$/g, '').trim();
    const caiMatch = fm.match(/^cai_em:\s*(.+)$/m);
    if (caiMatch) {
      const c = caiMatch[1].toLowerCase();
      if (c.includes('tecnico') && !c.includes('analista')) defaultCargo = 'tecnico';
      else if (c.includes('analista') && !c.includes('tecnico')) defaultCargo = 'analista';
    }
    body = raw.slice(fmMatch[0].length);
  }

  // Fallback materia from first H1
  if (!materia) {
    const h1 = body.match(/^#\s+(.+)$/m);
    materia = h1 ? stripMd(h1[1]) : 'Nova Disciplina';
  }

  let targetZona: ZonaInfo | null = null;
  let newZonaCreated: ZonaInfo | null = null;
  if (existingZonaId) {
    targetZona = getAllZonas().find((z) => z.id === existingZonaId) || null;
  }
  if (!targetZona) {
    newZonaCreated = createCustomZona({
      nome: materia,
      regiaoId: targetRegiaoId,
      cargo: defaultCargo,
      nivelSugerido: (REGION_BY_ID[targetRegiaoId]?.nivelSugerido || 1) + 1,
    });
    targetZona = newZonaCreated;
  }

  const lines = body.split('\n');
  interface RawBlock {
    id: string;
    aliasIds: string[];
    titulo: string;
    cargo: CargoScope;
    lines: string[];
  }
  const blocks: RawBlock[] = [];
  let cur: RawBlock | null = null;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headingMatch) {
      const titleRaw = headingMatch[2];
      const ids = Array.from(titleRaw.matchAll(/\[\[([a-z0-9-]+)\]\]/gi)).map((m) => m[1].toLowerCase());
      if (ids.length > 0) {
        if (cur) blocks.push(cur);
        let cargo: CargoScope = defaultCargo;
        if (titleRaw.includes('🔵') && !titleRaw.includes('🟣') && !titleRaw.includes('🟢')) cargo = 'tecnico';
        else if (titleRaw.includes('🟣') && !titleRaw.includes('🔵') && !titleRaw.includes('🟢')) cargo = 'analista';
        else if (titleRaw.includes('🟢')) cargo = 'ambos';

        const cleanTitle = titleRaw
          .replace(/\[\[[a-z0-9-]+\]\]/gi, '')
          .replace(/[🟢🔵🟣]/g, '')
          .replace(/^\s*[-—–+:/]+\s*/, '')
          .replace(/\s+/g, ' ')
          .trim();

        cur = {
          id: ids[0],
          aliasIds: ids.slice(1),
          titulo: cleanTitle || ids[0],
          cargo,
          lines: [],
        };
        continue;
      } else if (headingMatch[1].length === 2 && !cur) {
        // Also support regular ## headings without [[id]] for super easy user editing!
        const cleanTitle = stripMd(titleRaw).replace(/[🟢🔵🟣]/g, '').trim();
        let cargo: CargoScope = defaultCargo;
        if (titleRaw.includes('🔵')) cargo = 'tecnico';
        else if (titleRaw.includes('🟣')) cargo = 'analista';
        cur = {
          id: slugifyId(cleanTitle),
          aliasIds: [],
          titulo: cleanTitle,
          cargo,
          lines: [],
        };
        continue;
      }
    }

    // Table-row fichas: | [[id]] | ...
    const tableFichaMatch = line.match(/^\|\s*\[\[([a-z0-9-]+)\]\]\s*\|(.+)\|$/i);
    if (tableFichaMatch) {
      const tid = tableFichaMatch[1].toLowerCase();
      const cells = tableFichaMatch[2].split('|').map((c) => stripMd(c)).filter(Boolean);
      const tTitle = cells[0] || tid;
      const tDesc = cells.slice(1).join(' — ') || tTitle;
      blocks.push({
        id: tid,
        aliasIds: [],
        titulo: tTitle,
        cargo: defaultCargo,
        lines: [`- **O que é:** ${tDesc}`],
      });
      continue;
    }

    if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) blocks.push(cur);

  if (blocks.length === 0) {
    return {
      ok: false,
      error:
        'Nenhuma ficha encontrada. Use cabeçalhos como "## [[meu-tema]] 🟢 Nome do Tema" com "- **O que é:** ..." no Markdown.',
    };
  }

  const fichas: Ficha[] = [];
  const questions: Question[] = [];

  for (const b of blocks) {
    const text = b.lines.join('\n').trim();
    const avisosOraculo: string[] = [];
    const fatosChave: string[] = [];
    const fontes: SourceLink[] = [];
    const tablePairs: TablePair[] = [];
    let oQueE = '';
    let exemploPratico = '';

    for (const l of b.lines) {
      const trimmed = l.trim();
      if (!trimmed) continue;
      if (trimmed.includes('⚠️')) {
        avisosOraculo.push(stripMd(trimmed.replace(/^[-*]\s*/, '')));
        continue;
      }
      if (/\*\*(O que é|Definição|O que são)[^*]*\*\*/i.test(trimmed)) {
        oQueE = stripMd(trimmed.replace(/^[-*]\s*/, '').replace(/\*\*(O que é|Definição|O que são)[^*]*\*\*:?\s*/i, ''));
      } else if (/\*\*(Exemplo prático|Exemplo|Na prática)[^*]*\*\*/i.test(trimmed)) {
        exemploPratico = stripMd(
          trimmed.replace(/^[-*]\s*/, '').replace(/\*\*(Exemplo prático|Exemplo|Na prática)[^*]*\*\*:?\s*/i, '')
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const clean = stripMd(trimmed.slice(2));
        if (clean.length >= 16 && !clean.toLowerCase().startsWith('fontes:') && !clean.toLowerCase().startsWith('conexões')) {
          fatosChave.push(clean);
        }
      }

      for (const linkMatch of trimmed.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
        fontes.push({ label: linkMatch[1], url: linkMatch[2] });
      }
    }

    if (!oQueE) {
      oQueE = fatosChave[0] || stripMd(text).slice(0, 220) || b.titulo;
    }

    const conexoes = Array.from(new Set(Array.from(text.matchAll(/\[\[([a-z0-9-]+)\]\]/gi)).map((m) => m[1].toLowerCase())))
      .filter((cid) => cid !== b.id);

    const seed = hashStr(b.id);
    const ficha: Ficha = {
      id: b.id,
      aliasIds: b.aliasIds,
      titulo: b.titulo,
      zonaId: targetZona.id,
      regiaoId: targetZona.regiaoId,
      materia: targetZona.nome,
      cargo: b.cargo,
      npcName: NPC_FIRST_NAMES[seed % NPC_FIRST_NAMES.length],
      npcRole: ROLE_BY_REGION[targetZona.regiaoId] || 'sabio',
      npcSeed: seed % 997,
      oQueE,
      exemploPratico,
      fatosChave: fatosChave.length > 0 ? fatosChave : [oQueE],
      conexoes,
      avisosOraculo,
      fontes,
      tablePairs,
      textoCompleto: text || `- **O que é:** ${oQueE}`,
    };
    fichas.push(ficha);
    questions.push(...generateGroundedQuestionsForCustomFicha(ficha));
  }

  return { ok: true, zona: newZonaCreated, fichas, questions };
}

export function exportCustomDatabaseJson(): string {
  return JSON.stringify(loadCustomDatabase(), null, 2);
}

export function importCustomDatabaseJson(
  rawJson: string
): { ok: true; addedZonas: number; addedFichas: number; addedQuestions: number } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(rawJson) as Partial<CustomDatabaseStore>;
    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, error: 'JSON inválido para a base de dados.' };
    }
    const cur = loadCustomDatabase();
    const nextZonas = [...cur.zonas];
    const nextFichas = [...cur.fichas];
    const nextQuestions = [...cur.questions];

    const zIds = new Set(nextZonas.map((z) => z.id));
    const fIds = new Set(nextFichas.map((f) => f.id));
    const qIds = new Set(nextQuestions.map((q) => q.id));

    let addedZonas = 0;
    let addedFichas = 0;
    let addedQuestions = 0;

    if (Array.isArray(parsed.zonas)) {
      for (const z of parsed.zonas) {
        if (z && z.id && z.nome && !zIds.has(z.id)) {
          nextZonas.push(z);
          zIds.add(z.id);
          addedZonas++;
        }
      }
    }
    if (Array.isArray(parsed.fichas)) {
      for (const f of parsed.fichas) {
        if (f && f.id && f.titulo && !fIds.has(f.id)) {
          nextFichas.push(f);
          fIds.add(f.id);
          addedFichas++;
        }
      }
    }
    if (Array.isArray(parsed.questions)) {
      for (const q of parsed.questions) {
        if (q && q.id && q.enunciado && !q.enunciado.includes('⚠️') && !qIds.has(q.id)) {
          nextQuestions.push(q);
          qIds.add(q.id);
          addedQuestions++;
        }
      }
    }

    saveCustomDatabase({
      version: 1,
      zonas: nextZonas,
      fichas: nextFichas,
      questions: nextQuestions,
    });
    return { ok: true, addedZonas, addedFichas, addedQuestions };
  } catch {
    return { ok: false, error: 'Não foi possível ler o JSON da base de dados.' };
  }
}
