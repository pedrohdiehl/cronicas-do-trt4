import fs from 'node:fs';
import path from 'node:path';
import type {
  CargoScope,
  Ficha,
  PonteQuest,
  Question,
  RegionId,
  RegionInfo,
  SourceLink,
  TablePair,
  ZonaInfo,
} from '../src/types';

const MD_DIR = path.resolve(process.cwd(), 'public/assets/aistudio');

// 160x160 world layout divided cleanly into 6 distinct kingdoms connected by roads:
// Row 0 (y: 4..78):
//   - Reino da Toga: x 4..54, y 4..78 (50x74)
//   - Cidadela do Conselho: x 56..106, y 4..78 (50x74)
//   - Porto Babel: x 108..156, y 4..78 (48x74)
// Row 1 (y: 82..156):
//   - Floresta do Código: x 4..80, y 82..156 (76x74) -- largest (5 zones!)
//   - Fortaleza da Muralha: x 82..114, y 82..156 (32x74)
//   - Montanhas da Infra: x 116..156, y 82..156 (40x74)

export const REGIONS: RegionInfo[] = [
  {
    id: 'reino-da-toga',
    nome: 'Reino da Toga',
    subtitulo: 'Legislação e Direitos Humanos',
    bioma: 'Cidade medieval, tribunal de pedra e praça central',
    nivelSugerido: 1,
    accentColor: '#d9a441',
    groundPrimary: '#7d8a68',
    groundSecondary: '#8b9974',
    bossName: 'Arqui-Magistrado do Pleno',
    bossTitle: 'Guardião da Toga e dos Tratados',
    bossSprite: 'knight',
    bounds: { x: 4, y: 4, w: 50, h: 74 },
    keyName: 'Chave da Toga Dourada',
    cosmeticReward: {
      id: 'manto-toga',
      name: 'Manto da Toga Real',
      description: 'Capa dourada dos guardiões do Tribunal de Pedra.',
      color: '#e6b84c',
    },
  },
  {
    id: 'cidadela-do-conselho',
    nome: 'Cidadela do Conselho',
    subtitulo: 'Normativos PDPJ-Br, Governança TRT4 e Gestão de TI',
    bioma: 'Castelo administrativo, salões de mármore e estandartes',
    nivelSugerido: 3,
    accentColor: '#4c93d9',
    groundPrimary: '#6d778a',
    groundSecondary: '#7a8599',
    bossName: 'Chanceler do Comitê Supremo',
    bossTitle: 'Senhor dos Normativos e da Governança',
    bossSprite: 'golem',
    bounds: { x: 56, y: 4, w: 50, h: 74 },
    keyName: 'Chave do Selo do Conselho',
    cosmeticReward: {
      id: 'capa-conselho',
      name: 'Manto Azul do Conselho',
      description: 'Manto cerimonial com brasão do Comitê de TIC.',
      color: '#4c93d9',
    },
  },
  {
    id: 'porto-babel',
    nome: 'Porto Babel',
    subtitulo: 'Inglês Técnico de TI',
    bioma: 'Porto marítimo, cais de madeira, navios e placas em inglês',
    nivelSugerido: 4,
    accentColor: '#2fb5a8',
    groundPrimary: '#c7b07b',
    groundSecondary: '#d4be8a',
    bossName: 'Capitão False Cognate',
    bossTitle: 'Lorde dos Mares Técnicos',
    bossSprite: 'kraken',
    bounds: { x: 108, y: 4, w: 48, h: 74 },
    keyName: 'Chave do Farol de Babel',
    cosmeticReward: {
      id: 'capa-navegador',
      name: 'Manto do Navegador Poliglota',
      description: 'Capa turquesa forjada no cais de Porto Babel.',
      color: '#2fb5a8',
    },
  },
  {
    id: 'floresta-do-codigo',
    nome: 'Floresta do Código',
    subtitulo: 'Eng. de Software, Stack PDPJ, DevOps, Programação e BD',
    bioma: 'Árvores com runas brilhantes e rios de dados cristalinos',
    nivelSugerido: 5,
    accentColor: '#44b86b',
    groundPrimary: '#3c6e47',
    groundSecondary: '#457c52',
    bossName: 'Hidra do Monólito Legado',
    bossTitle: 'Soberana dos Bugs e Deadlocks',
    bossSprite: 'hydra',
    bounds: { x: 4, y: 82, w: 76, h: 74 },
    keyName: 'Chave Rúnica do Código',
    cosmeticReward: {
      id: 'capa-runica',
      name: 'Manto Esmeralda das Runas',
      description: 'Capa tecida com fibra de código limpo.',
      color: '#44b86b',
    },
  },
  {
    id: 'fortaleza-da-muralha',
    nome: 'Fortaleza da Muralha',
    subtitulo: 'Segurança da Informação, LGPD e Criptografia',
    bioma: 'Muralhas negras, torres de vigia e portões com cadeados',
    nivelSugerido: 7,
    accentColor: '#d9534f',
    groundPrimary: '#4d4759',
    groundSecondary: '#595266',
    bossName: 'Espectro do Zero-Day',
    bossTitle: 'Fantasma do Ransomware e da Invasão',
    bossSprite: 'ghost',
    bounds: { x: 82, y: 82, w: 32, h: 74 },
    keyName: 'Chave Criptográfica Mestra',
    cosmeticReward: {
      id: 'capa-muralha',
      name: 'Manto Escarlate da Muralha',
      description: 'Capa reforçada com selo Zero Trust e TLS 1.3.',
      color: '#d9534f',
    },
  },
  {
    id: 'montanhas-da-infra',
    nome: 'Montanhas da Infra',
    subtitulo: 'Sistemas Operacionais, Redes, IA e Nuvem',
    bioma: 'Picos gelados, torres de cabos e nuvens flutuantes',
    nivelSugerido: 9,
    accentColor: '#9b6ee6',
    groundPrimary: '#6a6f82',
    groundSecondary: '#7a8096',
    bossName: 'Dragão do Deadlock em Nuvem',
    bossTitle: 'Titã dos Picos e Pacotes',
    bossSprite: 'dragon',
    bounds: { x: 116, y: 82, w: 40, h: 74 },
    keyName: 'Chave dos Picos da Nuvem',
    cosmeticReward: {
      id: 'capa-nuvem',
      name: 'Manto Violeta das Nuvens',
      description: 'Capa etérea dos arquitetos de infraestrutura e IA.',
      color: '#9b6ee6',
    },
  },
];

interface ZoneConfig {
  id: string;
  filePrefix: string;
  nome: string;
  regiaoId: RegionId;
  nivelSugerido: number;
  miniBossName: string;
  miniBossTitle: string;
  miniBossSprite: ZonaInfo['miniBossSprite'];
  bounds: { x: number; y: number; w: number; h: number };
}

const ZONE_CONFIGS: ZoneConfig[] = [
  // Region 1: Reino da Toga (x: 4..54, y: 4..78)
  {
    id: '01-nocoes-de-legislacao',
    filePrefix: '01-nocoes-de-legislacao',
    nome: 'Noções de Legislação',
    regiaoId: 'reino-da-toga',
    nivelSugerido: 1,
    miniBossName: 'Golem do Regimento',
    miniBossTitle: 'Guardião da Legislação TRT4',
    miniBossSprite: 'golem',
    bounds: { x: 6, y: 6, w: 46, h: 28 },
  },
  {
    id: '02-nocoes-de-direitos-humanos',
    filePrefix: '02-nocoes-de-direitos-humanos',
    nome: 'Noções de Direitos Humanos',
    regiaoId: 'reino-da-toga',
    nivelSugerido: 2,
    miniBossName: 'Cavaleiro dos Tratados',
    miniBossTitle: 'Sentinela das Convenções',
    miniBossSprite: 'knight',
    bounds: { x: 6, y: 36, w: 46, h: 40 },
  },
  // Region 2: Cidadela do Conselho (x: 56..106, y: 4..78)
  {
    id: '03-normativos-pdpj-e-governanca-trt4',
    filePrefix: '03-normativos-pdpj-e-governanca-trt4',
    nome: 'Normativos PDPJ-Br e Governança TRT4',
    regiaoId: 'cidadela-do-conselho',
    nivelSugerido: 3,
    miniBossName: 'Guardião das Portarias',
    miniBossTitle: 'Auditor da PDPJ-Br',
    miniBossSprite: 'knight',
    bounds: { x: 58, y: 6, w: 46, h: 42 },
  },
  {
    id: '12-governanca-e-gestao-de-ti',
    filePrefix: '12-governanca-e-gestao-de-ti',
    nome: 'Gestão e Governança de TI',
    regiaoId: 'cidadela-do-conselho',
    nivelSugerido: 4,
    miniBossName: 'Arconte do COBIT',
    miniBossTitle: 'Mestre de PMBOK, ITIL e COBIT',
    miniBossSprite: 'golem',
    bounds: { x: 58, y: 50, w: 46, h: 26 },
  },
  // Region 6: Porto Babel (x: 108..156, y: 4..78)
  {
    id: '14-ingles-tecnico',
    filePrefix: '14-ingles-tecnico',
    nome: 'Inglês Técnico',
    regiaoId: 'porto-babel',
    nivelSugerido: 4,
    miniBossName: 'Corsário do Vocabulário',
    miniBossTitle: 'Pirata dos Falsos Cognatos',
    miniBossSprite: 'kraken',
    bounds: { x: 110, y: 10, w: 44, h: 64 },
  },
  // Region 3: Floresta do Código (x: 4..80, y: 82..156) — 5 zones!
  {
    id: '04-engenharia-de-software',
    filePrefix: '04-engenharia-de-software',
    nome: 'Engenharia de Software',
    regiaoId: 'floresta-do-codigo',
    nivelSugerido: 5,
    miniBossName: 'Bug-Goblin do Sprint',
    miniBossTitle: 'Sabotador de Requisitos e UML',
    miniBossSprite: 'goblin',
    bounds: { x: 6, y: 84, w: 36, h: 24 },
  },
  {
    id: '05-arquitetura-pdpj-stack',
    filePrefix: '05-arquitetura-pdpj-stack',
    nome: 'Arquitetura PDPJ-Br (Stack)',
    regiaoId: 'floresta-do-codigo',
    nivelSugerido: 6,
    miniBossName: 'Slime do Microsserviço',
    miniBossTitle: 'Devourer de REST e Filas',
    miniBossSprite: 'slime',
    bounds: { x: 44, y: 84, w: 34, h: 24 },
  },
  {
    id: '07-devops',
    filePrefix: '07-devops',
    nome: 'DevOps e DevSecOps',
    regiaoId: 'floresta-do-codigo',
    nivelSugerido: 6,
    miniBossName: 'Goblin do Merge Quebrado',
    miniBossTitle: 'Terror das Pipelines CI/CD',
    miniBossSprite: 'goblin',
    bounds: { x: 6, y: 110, w: 36, h: 22 },
  },
  {
    id: '08-programacao-e-desenvolvimento-web',
    filePrefix: '08-programacao-e-desenvolvimento-web',
    nome: 'Programação e Web',
    regiaoId: 'floresta-do-codigo',
    nivelSugerido: 6,
    miniBossName: 'Espectro da Exceção Não Tratada',
    miniBossTitle: 'Assombração do NullPointer',
    miniBossSprite: 'ghost',
    bounds: { x: 44, y: 110, w: 34, h: 22 },
  },
  {
    id: '09-banco-de-dados',
    filePrefix: '09-banco-de-dados',
    nome: 'Banco de Dados',
    regiaoId: 'floresta-do-codigo',
    nivelSugerido: 7,
    miniBossName: 'Slime de SQL Injection',
    miniBossTitle: 'Anomalia das Formas Normais',
    miniBossSprite: 'slime',
    bounds: { x: 6, y: 134, w: 72, h: 20 },
  },
  // Region 4: Fortaleza da Muralha (x: 82..114, y: 82..156)
  {
    id: '06-seguranca-da-informacao',
    filePrefix: '06-seguranca-da-informacao',
    nome: 'Segurança da Informação',
    regiaoId: 'fortaleza-da-muralha',
    nivelSugerido: 7,
    miniBossName: 'Fantasma do Ransomware',
    miniBossTitle: 'Invasor da Muralha e da LGPD',
    miniBossSprite: 'ghost',
    bounds: { x: 84, y: 86, w: 28, h: 66 },
  },
  // Region 5: Montanhas da Infra (x: 116..156, y: 82..156) — 3 zones!
  {
    id: '10-sistemas-operacionais',
    filePrefix: '10-sistemas-operacionais',
    nome: 'Sistemas Operacionais',
    regiaoId: 'montanhas-da-infra',
    nivelSugerido: 8,
    miniBossName: 'Dragão do Deadlock',
    miniBossTitle: 'Fera das 4 Condições de Coffman',
    miniBossSprite: 'dragon',
    bounds: { x: 118, y: 84, w: 36, h: 24 },
  },
  {
    id: '11-redes-e-servicos',
    filePrefix: '11-redes-e-servicos',
    nome: 'Redes e Serviços',
    regiaoId: 'montanhas-da-infra',
    nivelSugerido: 9,
    miniBossName: 'Hidra dos Pacotes Perdidos',
    miniBossTitle: 'Tempestade das 7 Camadas OSI',
    miniBossSprite: 'hydra',
    bounds: { x: 118, y: 110, w: 36, h: 24 },
  },
  {
    id: '13-ia-e-nuvem',
    filePrefix: '13-ia-e-nuvem',
    nome: 'IA e Computação em Nuvem',
    regiaoId: 'montanhas-da-infra',
    nivelSugerido: 10,
    miniBossName: 'Golem da Alucinação em Nuvem',
    miniBossTitle: 'Colosso dos Transformers e FaaS',
    miniBossSprite: 'golem',
    bounds: { x: 118, y: 136, w: 36, h: 18 },
  },
];

// Deterministic hash for stable names/seeds
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const NPC_FIRST_NAMES: Record<RegionId, string[]> = {
  'reino-da-toga': [
    'Magistrada Beatriz', 'Escrivão Antônio', 'Juiz Valério', 'Conselheira Clara',
    'Ouvidora Helena', 'Desembargador Lúcio', 'Procuradora Sofia', 'Oficial Rodrigo',
    'Relatora Lívia', 'Jurista Mateus', 'Tabeliã Aurora', 'Tribuno Caio',
    'Mediadora Laura', 'Pregoeiro Miguel', 'Curadora Elisa', 'Sábia Virgínia',
  ],
  'cidadela-do-conselho': [
    'Chanceler Renato', 'Diretora Camila', 'Auditora Renata', 'Gestor Henrique',
    'Coordenadora Patrícia', 'Secretário Otávio', 'Inspetora Diana', 'Conselheiro Marcos',
  ],
  'floresta-do-codigo': [
    'Mago Ada', 'Ferreira Turing', 'Druida Grace', 'Arquiteta Barbara',
    'Escriba Dijkstra', 'Guardiã Liskov', 'Alquimista Linus', 'Engenheira Margaret',
    'Runista Fowler', 'Mestra Codd', 'Artífice Gosling', 'Oráculo Knuth',
    'Tecelã Hamilton', 'Sábio Gamma', 'Maga Hopper', 'Construtor Brooks',
  ],
  'fortaleza-da-muralha': [
    'Sentinela Alice', 'Guarda Bob', 'Criptógrafa Diffie', 'Vigia Rivest',
    'Capitã Shamir', 'Protetor Merkle', 'Muralhista Kerckhoffs', 'Defensora Whitfield',
  ],
  'montanhas-da-infra': [
    'Alpinista Tanenbaum', 'Engenheiro Cerf', 'Vigia Radia', 'Guia Kurose',
    'Mestre Coffman', 'Sábia Stallings', 'Explorador Shannon', 'Guardiã Hopper',
    'Escultor Hinton', 'Arquiteta Vaswani',
  ],
  'porto-babel': [
    'Capitã Evelyn', 'Timoneiro Arthur', 'Tradutora Beatriz', 'Navegador Oliver',
  ],
};

const ROLE_BY_REGION: Record<RegionId, Ficha['npcRole'][]> = {
  'reino-da-toga': ['juiz', 'bibliotecaria', 'sabio'],
  'cidadela-do-conselho': ['juiz', 'guarda', 'bibliotecaria'],
  'floresta-do-codigo': ['mago', 'ferreiro', 'engenheiro'],
  'fortaleza-da-muralha': ['guarda', 'ferreiro', 'mago'],
  'montanhas-da-infra': ['engenheiro', 'sabio', 'mago'],
  'porto-babel': ['capitao', 'bibliotecaria', 'sabio'],
};

function cleanMdInline(text: string): string {
  return text
    .replace(/\[\[([a-z0-9-]+)\]\]/gi, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return { meta, body: m[2] };
}

function detectCargoFromHeading(heading: string, frontmatterCaiEm: string): CargoScope {
  const firstEmojiMatch = heading.match(/(🟢|🔵|🟣)/);
  if (firstEmojiMatch) {
    if (firstEmojiMatch[1] === '🟢') return 'ambos';
    if (firstEmojiMatch[1] === '🔵') return 'tecnico';
    if (firstEmojiMatch[1] === '🟣') return 'analista';
  }
  const lower = frontmatterCaiEm.toLowerCase();
  const hasTec = lower.includes('técnico') || lower.includes('tecnico');
  const hasAna = lower.includes('analista');
  if (hasTec && hasAna) return 'ambos';
  if (hasTec) return 'tecnico';
  if (hasAna) return 'analista';
  return 'ambos';
}

function extractLinks(text: string): SourceLink[] {
  const links: SourceLink[] = [];
  const seen = new Set<string>();
  const rx = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(text)) !== null) {
    const url = m[2].trim();
    if (!seen.has(url)) {
      seen.add(url);
      links.push({ label: m[1].trim(), url });
    }
  }
  return links;
}

function extractConnections(text: string, ownIds: string[]): string[] {
  const ids = new Set<string>();
  const rx = /\[\[([a-z0-9-]+)\]\]/gi;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(text)) !== null) {
    const id = m[1].trim();
    if (!ownIds.includes(id)) {
      ids.add(id);
    }
  }
  return Array.from(ids);
}

function parseBulletBody(rawBody: string, ownIds: string[]) {
  const lines = rawBody.split(/\r?\n/);
  const avisosOraculo: string[] = [];
  const safeLines: string[] = [];

  for (const line of lines) {
    if (line.includes('⚠️')) {
      const cleaned = cleanMdInline(line.replace(/^\s*[-*]\s*/, '').replace(/⚠️\s*/g, ''));
      if (cleaned) avisosOraculo.push(cleaned);
    } else {
      safeLines.push(line);
    }
  }

  let oQueE = '';
  let exemploPratico = '';
  const fatosChave: string[] = [];
  const tablePairs: TablePair[] = [];

  // Parse markdown tables (excluding lines with ⚠️)
  let inTable = false;
  let tableHeaders: string[] = [];
  for (let i = 0; i < safeLines.length; i++) {
    const line = safeLines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      if (!inTable) {
        inTable = true;
        tableHeaders = cells.map(cleanMdInline);
      } else if (cells.every((c) => /^[-:\s]+$/.test(c))) {
        continue;
      } else {
        // Skip rows that themselves start with [[id]] (they are parsed as separate table fichas)
        if (/^\[\[/.test(cells[0])) continue;
        const term = cleanMdInline(cells[0] || '');
        const rest = cells
          .slice(1)
          .map((c, idx) => {
            const cleaned = cleanMdInline(c);
            const hdr = tableHeaders[idx + 1];
            return hdr && cleaned && cleaned !== '—' ? `${hdr}: ${cleaned}` : cleaned;
          })
          .filter((s) => s && s !== '—')
          .join(' · ');
        if (term && rest && term.length >= 2 && rest.length >= 5) {
          tablePairs.push({
            term,
            definition: rest,
            rawRow: cleanMdInline(cells.filter((c) => c && c !== '—').join(' — ')),
          });
        }
      }
    } else {
      inTable = false;
      tableHeaders = [];
    }
  }

  // Parse bullets and paragraphs (strictly from safeLines, no ⚠️!)
  let insideCodeBlock = false;
  for (const rawLine of safeLines) {
    const trimmed = rawLine.trim();
    if (trimmed.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock;
      continue;
    }
    if (insideCodeBlock) continue;
    if (!trimmed || trimmed.startsWith('|') || trimmed.startsWith('---') || trimmed.startsWith('>')) continue;
    if (trimmed.startsWith('###')) {
      // Subheading inside a ficha (like Scrum, Kanban, XP inside [[ageis]])
      const sub = cleanMdInline(trimmed.replace(/^#+\s*/, ''));
      if (sub) fatosChave.push(`Subtópico: ${sub}`);
      continue;
    }

    const bullet = trimmed.replace(/^[-*]\s+/, '');
    if (/^\*\*Fontes?:?\*\*/i.test(bullet) || /^Fontes?:/i.test(bullet)) continue;
    if (/^\*\*Conexões.*?\*\*/i.test(bullet)) continue;

    if (/^\*\*(O que é|Definição oficial|Definição|O que são|Por que está aqui)[^*]*\*\*/i.test(bullet)) {
      const cleaned = cleanMdInline(bullet);
      if (!oQueE) oQueE = cleaned;
      fatosChave.push(cleaned);
    } else if (/^\*\*(Exemplo prático|Exemplo|Exemplos|Na prática)[^*]*\*\*/i.test(bullet)) {
      const cleaned = cleanMdInline(bullet);
      if (!exemploPratico) exemploPratico = cleaned;
      else fatosChave.push(cleaned);
    } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const cleaned = cleanMdInline(bullet);
      if (cleaned.length >= 16) {
        fatosChave.push(cleaned);
      }
    }
  }

  // Fallback for oQueE if no explicit "**O que é:**" bullet existed
  if (!oQueE && fatosChave.length > 0) {
    oQueE = fatosChave[0];
  }
  if (!oQueE && tablePairs.length > 0) {
    oQueE = tablePairs.slice(0, 2).map((p) => `${p.term}: ${p.definition}`).join(' | ');
  }

  const fontes = extractLinks(rawBody);
  const conexoes = extractConnections(safeLines.join('\n'), ownIds);

  return {
    oQueE,
    exemploPratico,
    fatosChave,
    conexoes,
    avisosOraculo,
    fontes,
    tablePairs,
  };
}

function parseAllMarkdownFiles(): {
  zonas: ZonaInfo[];
  fichas: Ficha[];
  aliasMap: Record<string, string>;
  report: {
    parsedFiles: number;
    mergedMultiIdHeadings: { primary: string; aliases: string[]; titulo: string }[];
    tableRowFichas: string[];
    skippedFichas: { id: string; reason: string }[];
  };
} {
  const files = fs.readdirSync(MD_DIR).filter((f) => f.endsWith('.md')).sort();
  const zonas: ZonaInfo[] = [];
  const fichas: Ficha[] = [];
  const aliasMap: Record<string, string> = {};
  const mergedMultiIdHeadings: { primary: string; aliases: string[]; titulo: string }[] = [];
  const tableRowFichas: string[] = [];
  const skippedFichas: { id: string; reason: string }[] = [];

  const usedNpcNames = new Set<string>();
  const regionNpcCounter: Record<string, number> = {};

  function assignNpc(regiaoId: RegionId, fichaId: string): {
    npcName: string;
    npcRole: Ficha['npcRole'];
    npcSeed: number;
  } {
    const idx = regionNpcCounter[regiaoId] || 0;
    regionNpcCounter[regiaoId] = idx + 1;
    const pool = NPC_FIRST_NAMES[regiaoId];
    const baseName = pool[idx % pool.length];
    const suffix = idx >= pool.length ? ` ${['II', 'III', 'IV'][Math.floor(idx / pool.length) - 1] || idx}` : '';
    let npcName = `${baseName}${suffix}`;
    if (usedNpcNames.has(npcName)) {
      npcName = `${baseName} #${idx + 1}`;
    }
    usedNpcNames.add(npcName);
    const roles = ROLE_BY_REGION[regiaoId];
    const seed = hashStr(fichaId);
    return {
      npcName,
      npcRole: roles[seed % roles.length],
      npcSeed: seed,
    };
  }

  for (const cfg of ZONE_CONFIGS) {
    const fileName = files.find((f) => f.startsWith(cfg.filePrefix));
    if (!fileName) {
      throw new Error(`Markdown file not found for prefix: ${cfg.filePrefix}`);
    }
    const raw = fs.readFileSync(path.join(MD_DIR, fileName), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const materia = meta.materia || cfg.nome;
    const caiEmRaw = meta.cai_em || '[Técnico TI, Analista TI]';
    const caiEm = caiEmRaw
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const zona: ZonaInfo = {
      id: cfg.id,
      arquivo: fileName,
      nome: cfg.nome,
      materia,
      regiaoId: cfg.regiaoId,
      caiEm,
      peso: meta.peso || 'Conhecimentos Específicos',
      nivelSugerido: cfg.nivelSugerido,
      miniBossName: cfg.miniBossName,
      miniBossTitle: cfg.miniBossTitle,
      miniBossSprite: cfg.miniBossSprite,
      bounds: cfg.bounds,
      signTile: {
        x: cfg.bounds.x + Math.floor(cfg.bounds.w / 2),
        y: cfg.bounds.y + 1,
      },
    };
    zonas.push(zona);

    const lines = body.split(/\r?\n/);

    // First pass: identify heading sections with [[id]] AND tables whose rows start with | [[id]] |
    interface RawSection {
      headingLine: string;
      level: number;
      startLine: number;
      endLine: number;
      ids: string[];
    }

    const headingSections: RawSection[] = [];
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(#{2,4})\s+(.*)$/);
      if (m) {
        const level = m[1].length;
        const text = m[2];
        // Close previous section if equal or higher level
        if (headingSections.length > 0 && headingSections[headingSections.length - 1].endLine === -1) {
          const prev = headingSections[headingSections.length - 1];
          if (level <= prev.level || /\[\[[a-z0-9-]+\]\]/i.test(text)) {
            prev.endLine = i;
          }
        }
        const idMatches = Array.from(text.matchAll(/\[\[([a-z0-9-]+)\]\]/gi)).map((x) => x[1]);
        if (idMatches.length > 0) {
          headingSections.push({
            headingLine: text,
            level,
            startLine: i + 1,
            endLine: -1,
            ids: idMatches,
          });
        }
      }
    }
    if (headingSections.length > 0 && headingSections[headingSections.length - 1].endLine === -1) {
      headingSections[headingSections.length - 1].endLine = lines.length;
    }

    // Track line indices consumed by heading sections
    const consumedLines = new Set<number>();
    for (const sec of headingSections) {
      for (let i = sec.startLine - 1; i < sec.endLine; i++) consumedLines.add(i);
    }

    // Create fichas for each heading section
    for (const sec of headingSections) {
      const primaryId = sec.ids[0];
      const aliasIds = sec.ids.slice(1);
      const secBody = lines.slice(sec.startLine, sec.endLine).join('\n').trim();
      const tituloClean = sec.headingLine
        .replace(/\[\[[a-z0-9-]+\]\]/gi, '')
        .replace(/(🟢|🔵|🟣)\s*\/\s*(🟢|🔵|🟣)/g, '')
        .replace(/(🟢|🔵|🟣)/g, '')
        .replace(/Ponto de partida\s*\([^)]*\):\s*/i, '')
        .replace(/^\s*(\+\s*)+/, '')
        .replace(/\s*\+\s*/g, ' + ')
        .replace(/^\s*\+\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();

      const cargo = detectCargoFromHeading(sec.headingLine, caiEmRaw);
      const parsed = parseBulletBody(secBody, sec.ids);
      const npc = assignNpc(cfg.regiaoId, primaryId);

      // Register aliases (note: if 'h2' already exists or will exist as its own ficha in file 09, keep primary mapping clean)
      aliasMap[primaryId] = primaryId;
      for (const al of aliasIds) {
        if (!aliasMap[al]) aliasMap[al] = primaryId;
      }
      if (aliasIds.length > 0) {
        mergedMultiIdHeadings.push({ primary: primaryId, aliases: aliasIds, titulo: tituloClean });
      }

      fichas.push({
        id: primaryId,
        aliasIds,
        titulo: tituloClean,
        zonaId: cfg.id,
        regiaoId: cfg.regiaoId,
        materia: cfg.nome,
        cargo,
        ...npc,
        oQueE: parsed.oQueE || tituloClean,
        exemploPratico: parsed.exemploPratico,
        fatosChave: parsed.fatosChave,
        conexoes: parsed.conexoes,
        avisosOraculo: parsed.avisosOraculo,
        fontes: parsed.fontes,
        tablePairs: parsed.tablePairs,
        textoCompleto: secBody,
      });
    }

    // Second pass: table-row fichas (`| [[id]] | ... |`) outside heading sections!
    // In file 02 (Direitos Humanos), Bloco 2 & Bloco 3 have tables where each row starts with | [[id]] |
    let currentTableHeaders: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (consumedLines.has(i)) continue;
      const line = lines[i].trim();
      if (!line.startsWith('|') || !line.endsWith('|')) {
        continue;
      }
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      if (cells.every((c) => /^[-:\s]+$/.test(c))) continue;

      const idMatch = cells[0].match(/^\[\[([a-z0-9-]+)\]\]$/i);
      if (!idMatch) {
        // Probably the header row
        currentTableHeaders = cells.map(cleanMdInline);
        continue;
      }

      const id = idMatch[1];
      const instrumento = cleanMdInline(cells[1] || id);
      const adocao = cleanMdInline(cells[2] || '');
      const brasil = cleanMdInline(cells[3] || '');
      const ideia = cleanMdInline(cells[4] || '');

      // Look ahead after the table block for extra bullets/sources/warnings mentioning this treaty
      let tableEnd = i + 1;
      while (tableEnd < lines.length && lines[tableEnd].trim().startsWith('|')) {
        tableEnd++;
      }
      let nextHeading = tableEnd;
      while (nextHeading < lines.length && !/^#{2,4}\s/.test(lines[nextHeading])) {
        nextHeading++;
      }
      const trailingLines = lines.slice(tableEnd, nextHeading);
      const trailingText = trailingLines.join('\n');
      const trailingLinks = extractLinks(trailingText);
      const extraFacts: string[] = [];
      const extraWarnings: string[] = [];
      const extraConnections: string[] = [];

      const keyword = id.toUpperCase();
      for (const tl of trailingLines) {
        const cleanTl = cleanMdInline(tl.replace(/^\s*[-*]\s*/, ''));
        if (tl.includes('⚠️')) {
          if (
            tl.toLowerCase().includes(instrumento.toLowerCase().slice(0, 14)) ||
            (id === 'patrimonio-mundial' && tl.toLowerCase().includes('patrimônio'))
          ) {
            extraWarnings.push(cleanTl.replace(/⚠️\s*/g, ''));
          }
          continue;
        }
        if (
          tl.toUpperCase().includes(keyword) ||
          (id === 'tpi' && tl.includes('Estatuto de Roma')) ||
          (id === 'cdpd' && tl.includes('CDPD')) ||
          (id === 'pidcp' && tl.includes('PIDCP')) ||
          (id === 'pidesc' && tl.includes('PIDESC')) ||
          (id === 'cedaw' && tl.includes('CEDAW'))
        ) {
          if (!/^\*\*Fontes/i.test(tl.trim().replace(/^[-*]\s*/, '')) && !/^\*\*Conexões/i.test(tl.trim().replace(/^[-*]\s*/, ''))) {
            extraFacts.push(cleanTl);
          }
        }
        if (tl.includes(`[[${id}]]`)) {
          for (const c of extractConnections(tl, [id])) {
            if (!extraConnections.includes(c)) extraConnections.push(c);
          }
        }
      }

      const col2Name = currentTableHeaders[2] || 'Adoção';
      const col3Name = currentTableHeaders[3] || 'Brasil';
      const oQueE = `${instrumento}: ${ideia}. ${col2Name}: ${adocao}. No Brasil: ${brasil}.`;
      const fatosChave = [
        `${instrumento} — ${ideia}`,
        `${instrumento} — ${col2Name}: ${adocao}`,
        `${instrumento} — Promulgação/Status no Brasil: ${brasil}`,
        ...extraFacts,
      ];

      const npc = assignNpc(cfg.regiaoId, id);
      aliasMap[id] = id;
      tableRowFichas.push(id);

      // Relevant links for this treaty
      const ownLinks = trailingLinks.filter((l) => {
        const lbl = l.label.toLowerCase();
        return (
          lbl.includes(id) ||
          (brasil && brasil.match(/\d[\d.]+/) && lbl.includes(brasil.match(/\d[\d.]+/)![0])) ||
          lbl.includes('cnj')
        );
      });

      const rawTableText = [
        `| ${currentTableHeaders.join(' | ')} |`,
        line,
        ...extraFacts.map((f) => `- ${f}`),
        ...extraWarnings.map((w) => `- ⚠️ ${w}`),
      ].join('\n');

      fichas.push({
        id,
        aliasIds: [],
        titulo: instrumento,
        zonaId: cfg.id,
        regiaoId: cfg.regiaoId,
        materia: cfg.nome,
        cargo: 'ambos',
        ...npc,
        oQueE,
        exemploPratico: extraFacts[0] || `Instrumento internacional adotado em ${adocao} (${brasil}).`,
        fatosChave,
        conexoes: extraConnections,
        avisosOraculo: extraWarnings,
        fontes: ownLinks.length > 0 ? ownLinks : trailingLinks.slice(0, 2),
        tablePairs: [
          { term: instrumento, definition: ideia, rawRow: `${instrumento} (${adocao} · ${brasil}) — ${ideia}` },
          { term: `${instrumento} (Brasil)`, definition: brasil, rawRow: `${instrumento} — Brasil: ${brasil}` },
          { term: `${instrumento} (${col2Name})`, definition: adocao, rawRow: `${instrumento} — ${col2Name}: ${adocao}` },
        ],
        textoCompleto: rawTableText,
      });
    }
  }

  // Ensure every primary ficha id overrides aliasMap to point to itself (e.g., h2 has its own ficha in file 09)
  for (const f of fichas) {
    aliasMap[f.id] = f.id;
  }

  // Normalize all connections using aliasMap, keeping only valid existing ficha IDs and deduplicating
  const validIds = new Set(fichas.map((f) => f.id));
  for (const f of fichas) {
    const resolved = new Set<string>();
    for (const c of f.conexoes) {
      const target = aliasMap[c] || c;
      if (target !== f.id && validIds.has(target)) {
        resolved.add(target);
      }
    }
    f.conexoes = Array.from(resolved);
  }

  // Also make connections bidirectional gently for graph richness? Wait — keep original directional links,
  // and if a ficha has 0 outgoing connections, check if other fichas explicitly reference it via [[id]].
  for (const f of fichas) {
    if (f.conexoes.length === 0) {
      const incoming = fichas
        .filter((other) => other.id !== f.id && other.conexoes.includes(f.id))
        .map((other) => other.id);
      if (incoming.length > 0) {
        f.conexoes = incoming.slice(0, 4);
      }
    }
  }

  return {
    zonas,
    fichas,
    aliasMap,
    report: {
      parsedFiles: files.length,
      mergedMultiIdHeadings,
      tableRowFichas,
      skippedFichas,
    },
  };
}

// Deterministic shuffle using seed
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function truncateClean(s: string, maxLen: number): string {
  const cleaned = s.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return cleaned;
  const cut = cleaned.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\-–]+$/, '')}…`;
}

function makeShortTitle(titulo: string): string {
  return truncateClean(titulo.replace(/\s*\(lembrete\)/i, ''), 64);
}

function pickDistractors(
  correct: string,
  candidates: string[],
  count: number,
  seed: number
): string[] {
  const normCorrect = correct.toLowerCase().trim();
  const unique: string[] = [];
  const seen = new Set<string>([normCorrect]);
  for (const c of seededShuffle(candidates, seed)) {
    const clean = c.trim();
    const norm = clean.toLowerCase();
    if (!clean || clean.length < 2 || seen.has(norm)) continue;
    // Avoid near-duplicates
    if (norm.includes(normCorrect) || normCorrect.includes(norm)) continue;
    seen.add(norm);
    unique.push(clean);
    if (unique.length >= count) break;
  }
  return unique;
}

function extractBoldTerms(rawMd: string): { term: string; line: string }[] {
  const out: { term: string; line: string }[] = [];
  for (const rawLine of rawMd.split(/\r?\n/)) {
    if (rawLine.includes('⚠️')) continue;
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('```') || /^\*\*Fontes|^\*\*Conexões/i.test(trimmed.replace(/^[-*]\s*/, ''))) {
      continue;
    }
    const cleanLine = cleanMdInline(trimmed.replace(/^[-*]\s*/, ''));
    if (cleanLine.length < 24) continue;
    const rx = /\*\*([^*]{3,42})\*\*/g;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(rawLine)) !== null) {
      const term = cleanMdInline(m[1]).replace(/:$/, '').trim();
      if (
        term.length >= 3 &&
        term.length <= 40 &&
        !/^(O que é|Exemplo prático|Exemplo|Conexões|Fontes|Fonte|Definição|Ideia central|Pontos-chave|Estrutura|Detalhes|Cuidado|Atenção|Resumo|Por que está aqui)$/i.test(term) &&
        cleanLine.includes(term)
      ) {
        out.push({ term, line: cleanLine });
      }
    }
  }
  return out;
}

function buildQuestions(fichas: Ficha[]): Question[] {
  const questions: Question[] = [];
  const fichaById = new Map(fichas.map((f) => [f.id, f]));

  // Pre-collect pools per zone and per region strictly from the MDs (ZERO invented text!)
  const zoneFichas = new Map<string, Ficha[]>();
  const regionFichas = new Map<RegionId, Ficha[]>();
  for (const f of fichas) {
    if (!zoneFichas.has(f.zonaId)) zoneFichas.set(f.zonaId, []);
    zoneFichas.get(f.zonaId)!.push(f);
    if (!regionFichas.has(f.regiaoId)) regionFichas.set(f.regiaoId, []);
    regionFichas.get(f.regiaoId)!.push(f);
  }

  // Pool of bold terms per zone/region/all for lacuna distractors
  const fichaBoldTerms = new Map<string, { term: string; line: string }[]>();
  for (const f of fichas) {
    fichaBoldTerms.set(f.id, extractBoldTerms(f.textoCompleto));
  }

  function getPeerFichas(f: Ficha): Ficha[] {
    const sameZone = (zoneFichas.get(f.zonaId) || []).filter((x) => x.id !== f.id);
    const sameRegion = (regionFichas.get(f.regiaoId) || []).filter((x) => x.id !== f.id && x.zonaId !== f.zonaId);
    const others = fichas.filter((x) => x.regiaoId !== f.regiaoId);
    return [...sameZone, ...sameRegion, ...others];
  }

  let qCounter = 1;
  const nextId = (prefix: string) => `${prefix}-${String(qCounter++).padStart(4, '0')}`;

  for (const f of fichas) {
    const peers = getPeerFichas(f);
    const seed = hashStr(f.id);
    const shortTitle = makeShortTitle(f.titulo);
    const fichaQuestionsStart = questions.length;

    // ------------------------------------------------------------------
    // TYPE 1: Múltipla escolha (5 alternativas A–E) — Definição / "O que é"
    // ------------------------------------------------------------------
    {
      const defSource = f.oQueE || f.fatosChave[0] || f.titulo;
      const defClean = truncateClean(
        defSource.replace(/^(O que é|Definição oficial|Definição|O que são|Por que está aqui)[^:]*:\s*/i, ''),
        165
      );
      const distractorPool = peers.map((p) =>
        truncateClean(
          (p.oQueE || p.fatosChave[0] || p.titulo).replace(
            /^(O que é|Definição oficial|Definição|O que são|Por que está aqui)[^:]*:\s*/i,
            ''
          ),
          165
        )
      );
      const distractors = pickDistractors(defClean, distractorPool, 4, seed + 11);
      if (distractors.length === 4) {
        const allAlts = seededShuffle([defClean, ...distractors], seed + 13);
        const correta = allAlts.indexOf(defClean);
        questions.push({
          id: nextId('q-mc'),
          fichaId: f.id,
          fichaTitulo: f.titulo,
          zonaId: f.zonaId,
          regiaoId: f.regiaoId,
          cargo: f.cargo,
          tipo: 'multipla_escolha',
          enunciado: `Em ${f.materia}, qual alternativa descreve corretamente "${shortTitle}"?`,
          alternativas: allAlts,
          correta,
          trechoFonte: defSource,
          dificuldade: 1,
        });
      }
    }

    // ------------------------------------------------------------------
    // TYPE 2: Lacuna (completar termo/número/data exato do MD)
    // ------------------------------------------------------------------
    {
      const bolds = fichaBoldTerms.get(f.id) || [];
      let createdLacuna = false;
      for (const b of bolds) {
        const idx = b.line.indexOf(b.term);
        if (idx === -1) continue;
        // Avoid blanking out the ficha title itself if it makes the stem unanswerable
        if (b.line.length < 32) continue;
        const blanked = `${b.line.slice(0, idx)}________${b.line.slice(idx + b.term.length)}`;
        const peerTerms = peers.flatMap((p) => (fichaBoldTerms.get(p.id) || []).map((x) => x.term));
        // Add peer table terms as fallback real terms from MDs
        const peerTableTerms = peers.flatMap((p) => p.tablePairs.map((tp) => tp.term));
        const distractors = pickDistractors(b.term, [...peerTerms, ...peerTableTerms], 4, seed + 23);
        if (distractors.length === 4) {
          const allAlts = seededShuffle([b.term, ...distractors], seed + 29);
          questions.push({
            id: nextId('q-lac'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'lacuna',
            enunciado: `Complete a lacuna conforme a ficha "${shortTitle}": "${truncateClean(blanked, 220)}"`,
            alternativas: allAlts,
            correta: allAlts.indexOf(b.term),
            trechoFonte: b.line,
            dificuldade: 2,
          });
          createdLacuna = true;
          break;
        }
      }

      // If table-row treaty ficha (e.g. Direitos Humanos) had no bold terms, blank out Brazil decree or adoption year!
      if (!createdLacuna && f.tablePairs.length >= 2) {
        const pair = f.tablePairs.find((tp) => tp.term.includes('(Brasil)') || tp.term.includes('(Adoção)')) || f.tablePairs[0];
        const peerDefs = peers.flatMap((p) => p.tablePairs.map((tp) => tp.definition));
        const distractors = pickDistractors(pair.definition, peerDefs, 4, seed + 31);
        if (distractors.length === 4) {
          const allAlts = seededShuffle([pair.definition, ...distractors], seed + 37);
          questions.push({
            id: nextId('q-lac'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'lacuna',
            enunciado: `Complete a lacuna sobre ${pair.term}: "________".`,
            alternativas: allAlts,
            correta: allAlts.indexOf(pair.definition),
            trechoFonte: pair.rawRow,
            dificuldade: 2,
          });
        }
      }
    }

    // ------------------------------------------------------------------
    // TYPE 3: Associação (termo ↔ definição, tirada das tabelas ou bullets)
    // ------------------------------------------------------------------
    {
      if (f.tablePairs.length > 0) {
        const pair = f.tablePairs[0];
        const defClean = truncateClean(pair.definition, 150);
        const peerDefs = [
          ...f.tablePairs.slice(1).map((tp) => truncateClean(tp.definition, 150)),
          ...peers.flatMap((p) => p.tablePairs.map((tp) => truncateClean(tp.definition, 150))),
          ...peers.map((p) => truncateClean(p.oQueE, 150)),
        ];
        const distractors = pickDistractors(defClean, peerDefs, 4, seed + 41);
        if (distractors.length === 4) {
          const allAlts = seededShuffle([defClean, ...distractors], seed + 43);
          questions.push({
            id: nextId('q-ass'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'associacao',
            enunciado: `Associação (${shortTitle}): qual descrição corresponde corretamente a "${pair.term}"?`,
            alternativas: allAlts,
            correta: allAlts.indexOf(defClean),
            trechoFonte: pair.rawRow,
            dificuldade: 2,
          });
        }
      } else {
        // Use a specific key fact or practical example and ask which ficha/concept it identifies
        const fact = f.fatosChave.find((x) => x !== f.oQueE && x.length >= 28) || f.exemploPratico || f.oQueE;
        const factClean = truncateClean(fact, 185);
        const peerTitles = peers.map((p) => makeShortTitle(p.titulo));
        const distractors = pickDistractors(shortTitle, peerTitles, 4, seed + 47);
        if (distractors.length === 4) {
          const allAlts = seededShuffle([shortTitle, ...distractors], seed + 53);
          questions.push({
            id: nextId('q-ass'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'associacao',
            enunciado: `Associe o trecho abaixo ao tópico correspondente de ${f.materia}: "${factClean}"`,
            alternativas: allAlts,
            correta: allAlts.indexOf(shortTitle),
            trechoFonte: fact,
            dificuldade: 2,
          });
        }
      }
    }

    // ------------------------------------------------------------------
    // TYPE 4: Certo / Errado
    // ------------------------------------------------------------------
    {
      const makeTrue = seed % 2 === 0;
      const factSource =
        f.fatosChave.find((x, i) => i > 0 && x.length >= 25 && x.length <= 220) ||
        f.oQueE ||
        f.fatosChave[0];
      if (factSource) {
        if (makeTrue) {
          questions.push({
            id: nextId('q-ce'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'certo_errado',
            enunciado: `Julgue o item sobre "${shortTitle}": ${truncateClean(factSource, 220)}`,
            alternativas: ['Certo', 'Errado'],
            correta: 0,
            trechoFonte: factSource,
            dificuldade: 1,
          });
        } else {
          // Pick a real fact from a DIFFERENT peer ficha and attribute it wrongly to THIS ficha!
          const peer = peers.find((p) => p.oQueE && p.oQueE !== f.oQueE && p.id !== f.id);
          if (peer) {
            const wrongStatement = truncateClean(
              peer.oQueE.replace(/^(O que é|Definição oficial|Definição|O que são)[^:]*:\s*/i, ''),
              190
            );
            questions.push({
              id: nextId('q-ce'),
              fichaId: f.id,
              fichaTitulo: f.titulo,
              zonaId: f.zonaId,
              regiaoId: f.regiaoId,
              cargo: f.cargo,
              tipo: 'certo_errado',
              enunciado: `Julgue o item: A definição de "${shortTitle}" corresponde a: "${wrongStatement}"`,
              alternativas: ['Certo', 'Errado'],
              correta: 1,
              trechoFonte: `${f.oQueE} (A afirmação trocada refere-se a ${makeShortTitle(peer.titulo)}.)`,
              dificuldade: 2,
            });
          }
        }
      }
    }

    // ------------------------------------------------------------------
    // TYPE 5: Conexão ("Qual se conecta?" via [[id]])
    // ------------------------------------------------------------------
    if (f.conexoes.length > 0) {
      const targetId = f.conexoes[seed % f.conexoes.length];
      const targetFicha = fichaById.get(targetId);
      if (targetFicha) {
        const targetTitle = makeShortTitle(targetFicha.titulo);
        const nonConnectedPeers = peers
          .filter((p) => !f.conexoes.includes(p.id) && p.id !== f.id)
          .map((p) => makeShortTitle(p.titulo));
        const distractors = pickDistractors(targetTitle, nonConnectedPeers, 4, seed + 61);
        if (distractors.length === 4) {
          const allAlts = seededShuffle([targetTitle, ...distractors], seed + 67);
          const connNames = f.conexoes
            .map((cid) => fichaById.get(cid)?.titulo || cid)
            .slice(0, 5)
            .join(' · ');
          questions.push({
            id: nextId('q-con'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'conexao',
            enunciado: `Qual das fichas abaixo possui conexão direta apontada na ficha "${shortTitle}"?`,
            alternativas: allAlts,
            correta: allAlts.indexOf(targetTitle),
            trechoFonte: `Conexões de ${shortTitle}: ${connNames}.`,
            dificuldade: 2,
          });
        }
      }
    }

    // ------------------------------------------------------------------
    // TYPE 6: Boss-style "Questão estilo FCC" (dificuldade 3, 5 alternativas A–E)
    // Richer scenario / detail check strictly from the ficha text
    // ------------------------------------------------------------------
    {
      const extraFact =
        f.fatosChave.find((x) => x !== f.oQueE && /\d|art\.|decreto|lei|resolução|rfc|iso|níveis|port|padrão/i.test(x)) ||
        f.fatosChave[f.fatosChave.length - 1] ||
        f.oQueE;
      if (extraFact) {
        const correctOpt = truncateClean(extraFact, 165);
        const peerFacts = peers.flatMap((p) =>
          p.fatosChave.filter((x) => x.length >= 24).slice(0, 3).map((x) => truncateClean(x, 165))
        );
        const distractors = pickDistractors(correctOpt, peerFacts, 4, seed + 79);
        if (distractors.length === 4) {
          const allAlts = seededShuffle([correctOpt, ...distractors], seed + 83);
          questions.push({
            id: nextId('q-fcc'),
            fichaId: f.id,
            fichaTitulo: f.titulo,
            zonaId: f.zonaId,
            regiaoId: f.regiaoId,
            cargo: f.cargo,
            tipo: 'multipla_escolha',
            enunciado: `Em estudo preparatório para o TRT da 4ª Região (${f.materia}), considerando especificamente o conteúdo de "${shortTitle}", assinale a alternativa CORRETA:`,
            alternativas: allAlts,
            correta: allAlts.indexOf(correctOpt),
            trechoFonte: extraFact,
            dificuldade: 3,
            isBossStyle: true,
          });
        }
      }
    }

    // Guarantee AT LEAST 3 questions per ficha
    const countForFicha = questions.length - fichaQuestionsStart;
    if (countForFicha < 3) {
      // Add extra Certo/Errado or association from remaining facts
      const fallbackFact = f.oQueE || f.titulo;
      questions.push({
        id: nextId('q-fb'),
        fichaId: f.id,
        fichaTitulo: f.titulo,
        zonaId: f.zonaId,
        regiaoId: f.regiaoId,
        cargo: f.cargo,
        tipo: 'certo_errado',
        enunciado: `Julgue a afirmação sobre "${shortTitle}": ${truncateClean(fallbackFact, 220)}`,
        alternativas: ['Certo', 'Errado'],
        correta: 0,
        trechoFonte: fallbackFact,
        dificuldade: 1,
      });
    }
  }

  // Final strict safety assertion: ZERO ⚠️ anywhere in questions!
  for (const q of questions) {
    if (q.enunciado.includes('⚠️') || q.trechoFonte.includes('⚠️') || q.alternativas.some((a) => a.includes('⚠️'))) {
      throw new Error(`CRITICAL: Warning symbol ⚠️ leaked into question ${q.id} (${q.fichaId})`);
    }
  }

  return questions;
}

function buildPontes(fichas: Ficha[]): PonteQuest[] {
  const valid = new Set(fichas.map((f) => f.id));
  const candidates: PonteQuest[] = [
    {
      id: 'ponte-privacidade-etica',
      nome: 'Ponte da Ética e Privacidade',
      descricao: 'Una os pergaminhos que ligam o Código de Conduta do TRT4, a LGPD, a ISO 27701 e a PDPJ-Br.',
      fichaIds: ['codigo-conduta-trt4', 'lgpd', 'iso-27701', 'res-cnj-335-2020'],
      recompensaXp: 250,
      recompensaItem: 'lupa_fonte',
    },
    {
      id: 'ponte-arquitetura-pdpj',
      nome: 'Ponte da Arquitetura PDPJ-Br',
      descricao: 'Conecte a Resolução CNJ 335/2020, Microsserviços, Spring Boot, Keycloak/OAuth2 e Contêineres.',
      fichaIds: ['res-cnj-335-2020', 'microsservicos', 'spring-boot', 'keycloak-sso', 'docker'],
      recompensaXp: 320,
      recompensaItem: 'escudo_recurso',
    },
    {
      id: 'ponte-ciberseguranca',
      nome: 'Ponte da Muralha Cibernética',
      descricao: 'Reúna os pergaminhos da ENSEC-PJ (Res. 396), ISO 27001, OWASP Top 10:2025 e TLS.',
      fichaIds: ['res-cnj-396-2021', 'iso-27001', 'owasp', 'tls'],
      recompensaXp: 280,
      recompensaItem: 'pocao_dica',
    },
    {
      id: 'ponte-governanca-gestao',
      nome: 'Ponte da Governança Estratégica',
      descricao: 'Interligue a Política de Sustentabilidade (Res. 400), o PDTIC do TRT4, o COBIT 2019 e o PMBOK 8.',
      fichaIds: ['res-cnj-400-2021', 'pdtic-trt4', 'cobit', 'pmbok'],
      recompensaXp: 280,
      recompensaItem: 'elixir_foco',
    },
    {
      id: 'ponte-dados-infra',
      nome: 'Ponte dos Dados e da Infraestrutura',
      descricao: 'Conecte Transações ACID, Deadlock, Monitoramento (Zabbix/Prometheus/ELK) e Nuvem (NIST).',
      fichaIds: ['transacoes', 'deadlock', 'monitoramento', 'nuvem'],
      recompensaXp: 300,
      recompensaItem: 'escudo_recurso',
    },
    {
      id: 'ponte-babel-global',
      nome: 'Ponte de Porto Babel',
      descricao: 'Una o Vocabulário de Inglês Técnico aos conceitos que ele traduz: API REST, CI/CD, LGPD e Ágeis.',
      fichaIds: ['ingles-vocabulario', 'api-rest', 'ci-cd', 'ageis'],
      recompensaXp: 240,
      recompensaItem: 'pocao_dica',
    },
  ];
  return candidates.map((p) => ({
    ...p,
    fichaIds: p.fichaIds.filter((id) => valid.has(id)),
  }));
}

function main() {
  const { zonas, fichas, aliasMap, report } = parseAllMarkdownFiles();
  const questions = buildQuestions(fichas);
  const pontes = buildPontes(fichas);

  // Verify every ficha has >= 3 questions
  const qByFicha = new Map<string, number>();
  for (const q of questions) {
    qByFicha.set(q.fichaId, (qByFicha.get(q.fichaId) || 0) + 1);
  }
  const underThree = fichas.filter((f) => (qByFicha.get(f.id) || 0) < 3);

  fs.mkdirSync(path.resolve(process.cwd(), 'src/data'), { recursive: true });

  const contentTs = `// AUTO-GENERATED from /public/assets/aistudio/*.md — DO NOT INVENT CONTENT
// Source of truth: 14 Markdown files provided by the user.
import type { Ficha, PonteQuest, RegionInfo, ZonaInfo } from '../types';

export const REGIONS: RegionInfo[] = ${JSON.stringify(REGIONS, null, 2)};

export const ZONAS: ZonaInfo[] = ${JSON.stringify(zonas, null, 2)};

export const FICHAS: Ficha[] = ${JSON.stringify(fichas, null, 2)};

export const FICHA_ALIAS_MAP: Record<string, string> = ${JSON.stringify(aliasMap, null, 2)};

export const PONTES: PonteQuest[] = ${JSON.stringify(pontes, null, 2)};

export const FICHA_BY_ID: Record<string, Ficha> = Object.fromEntries(
  FICHAS.map((f) => [f.id, f])
);

export const ZONA_BY_ID: Record<string, ZonaInfo> = Object.fromEntries(
  ZONAS.map((z) => [z.id, z])
);

export const REGION_BY_ID: Record<string, RegionInfo> = Object.fromEntries(
  REGIONS.map((r) => [r.id, r])
);
`;

  const questionsTs = `// AUTO-GENERATED from /public/assets/aistudio/*.md — STRICTLY GROUNDED, ZERO ⚠️ QUESTIONS
import type { Question } from '../types';

export const QUESTIONS: Question[] = ${JSON.stringify(questions, null, 2)};
`;

  fs.writeFileSync(path.resolve(process.cwd(), 'src/data/content.ts'), contentTs, 'utf8');
  fs.writeFileSync(path.resolve(process.cwd(), 'src/data/questions.ts'), questionsTs, 'utf8');

  const cargoCounts = {
    ambos: fichas.filter((f) => f.cargo === 'ambos').length,
    tecnico: fichas.filter((f) => f.cargo === 'tecnico').length,
    analista: fichas.filter((f) => f.cargo === 'analista').length,
  };

  const qTypeCounts: Record<string, number> = {};
  for (const q of questions) {
    qTypeCounts[q.tipo] = (qTypeCounts[q.tipo] || 0) + 1;
  }

  console.log('=== GENERATION SUMMARY ===');
  console.log(`Files parsed: ${report.parsedFiles}`);
  console.log(`Regions: ${REGIONS.length}`);
  console.log(`Zones: ${zonas.length}`);
  console.log(`Fichas (NPCs): ${fichas.length} (ambos=${cargoCounts.ambos}, tecnico=${cargoCounts.tecnico}, analista=${cargoCounts.analista})`);
  console.log(`Table-row fichas: ${report.tableRowFichas.length} (${report.tableRowFichas.join(', ')})`);
  console.log(`Merged multi-ID headings: ${report.mergedMultiIdHeadings.length}`);
  for (const m of report.mergedMultiIdHeadings) {
    console.log(`  - ${m.primary} + [${m.aliases.join(', ')}] -> "${m.titulo}"`);
  }
  console.log(`Questions generated: ${questions.length}`, qTypeCounts);
  console.log(`Boss-style (FCC) questions: ${questions.filter((q) => q.isBossStyle).length}`);
  console.log(`Fichas with < 3 questions: ${underThree.length}`, underThree.map((f) => f.id));
  console.log(`Fichas with ⚠️ Oracle warnings: ${fichas.filter((f) => f.avisosOraculo.length > 0).length}`);
  console.log(`Bosses total: ${zonas.length} mini-bosses + ${REGIONS.length} region bosses = ${zonas.length + REGIONS.length}`);
}

main();
