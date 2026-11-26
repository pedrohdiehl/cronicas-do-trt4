/**
 * Core data types for Crônicas do TRT4.
 * All study content is strictly parsed from the user's Markdown files.
 */

export type CargoScope = 'ambos' | 'tecnico' | 'analista';

export type PlayerClass = 'tecnico' | 'analista' | 'dupla';

export type RegionId =
  | 'reino-da-toga'
  | 'cidadela-do-conselho'
  | 'floresta-do-codigo'
  | 'fortaleza-da-muralha'
  | 'montanhas-da-infra'
  | 'porto-babel';

export interface SourceLink {
  label: string;
  url: string;
}

export interface TablePair {
  term: string;
  definition: string;
  rawRow: string;
}

export interface Ficha {
  id: string;
  aliasIds: string[];
  titulo: string;
  zonaId: string;
  regiaoId: RegionId;
  materia: string;
  cargo: CargoScope;
  npcName: string;
  npcRole: 'mago' | 'bibliotecaria' | 'ferreiro' | 'guarda' | 'juiz' | 'engenheiro' | 'capitao' | 'sabio';
  npcSeed: number;
  oQueE: string;
  exemploPratico: string;
  fatosChave: string[];
  conexoes: string[];
  avisosOraculo: string[];
  fontes: SourceLink[];
  tablePairs: TablePair[];
  textoCompleto: string;
}

export interface ZonaInfo {
  id: string;
  arquivo: string;
  nome: string;
  materia: string;
  regiaoId: RegionId;
  caiEm: string[];
  peso: string;
  nivelSugerido: number;
  miniBossName: string;
  miniBossTitle: string;
  miniBossSprite: 'goblin' | 'slime' | 'dragon' | 'ghost' | 'golem' | 'hydra' | 'kraken' | 'knight';
  bounds: { x: number; y: number; w: number; h: number };
  signTile: { x: number; y: number };
}

export interface RegionInfo {
  id: RegionId;
  nome: string;
  subtitulo: string;
  bioma: string;
  nivelSugerido: number;
  accentColor: string;
  groundPrimary: string;
  groundSecondary: string;
  bossName: string;
  bossTitle: string;
  bossSprite: 'dragon' | 'hydra' | 'golem' | 'ghost' | 'kraken' | 'knight';
  bounds: { x: number; y: number; w: number; h: number };
  keyName: string;
  cosmeticReward: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
}

export interface PonteQuest {
  id: string;
  nome: string;
  descricao: string;
  fichaIds: string[];
  recompensaXp: number;
  recompensaItem: ItemId;
}

export type QuestionType =
  | 'multipla_escolha'
  | 'certo_errado'
  | 'lacuna'
  | 'associacao'
  | 'conexao';

export interface Question {
  id: string;
  fichaId: string;
  fichaTitulo: string;
  zonaId: string;
  regiaoId: RegionId;
  cargo: CargoScope;
  tipo: QuestionType;
  enunciado: string;
  alternativas: string[];
  correta: number;
  trechoFonte: string;
  dificuldade: 1 | 2 | 3;
  isBossStyle?: boolean;
  isRealExam?: boolean;
  banca?: string;
  ano?: number;
  orgao?: string;
  cargoProva?: string;
  /** 'autoral' = escrita à mão em conteudo/questoes/ e conferida contra a ficha. Ausente = gerada automaticamente. */
  origem?: 'autoral';
  /** Uma explicação por alternativa, na mesma ordem de `alternativas`. */
  explicacoes?: string[];
  /**
   * Questão real de prova, vinda de conteudo/provas/questoes.json (texto e gabarito oficiais).
   * O enunciado e as alternativas podem ter <u>, <mark>, <sup>, <br> e <p>; o resto é texto.
   * Nessas questões, `trechoFonte` é a ficha ligada (para revisar), não a justificativa do gabarito.
   */
  prova?: ProvaInfo;
}

export interface ProvaInfo {
  /** Chave da prova no banco, como "TRT4-2022-TJ". */
  id: string;
  /** "TRT-4 · 2022 · Técnico Judiciário – TI" */
  label: string;
  /** Número da questão na prova. */
  numero: number;
  trt: number;
  /** Cargo da prova de origem (o cargo da questão no jogo segue o da ficha no edital do TRT-4). */
  nivel: 'tec' | 'ana';
  /** 'paralelo' = regra de outro TRT (Regimento, Código de Ética): só treino, nunca chefe. */
  escopo: 'edital' | 'paralelo';
  /** Id da questão no QConcursos. */
  qid: string;
  /** Ligação com a ficha feita automaticamente (assunto + palavras-chave) ou à mão. */
  outrasFichas: string[];
}

export type ItemId =
  | 'pocao_dica'
  | 'escudo_recurso'
  | 'lupa_fonte'
  | 'pocao_vida'
  | 'elixir_foco';

export interface InventoryItemDef {
  id: ItemId;
  nome: string;
  descricao: string;
  cor: string;
  usoEmBatalha: boolean;
}

export interface SpacedRepEntry {
  questionId: string;
  fichaId: string;
  zonaId: string;
  consecutiveCorrect: number;
  dueAfterTimestamp: number;
  wrongCount: number;
}

export interface SaveState {
  version: number;
  playerClass: PlayerClass;
  heroX: number; // in tile coordinates (float)
  heroY: number;
  heroDir: 'down' | 'up' | 'left' | 'right';
  hp: number;
  maxHp: number;
  focus: number;
  maxFocus: number;
  xp: number;
  level: number;
  studiedFichas: string[];
  correctQuestionIds: string[];
  wrongQuestionIds: string[];
  spacedRep: Record<string, SpacedRepEntry>;
  collectedScrolls: string[]; // fichaIds of Pergaminho de Conexão
  completedPontes: string[];
  defeatedEnemies: string[];
  defeatedBosses: string[];
  openedChests: string[];
  regionKeys: RegionId[];
  unlockedCosmetics: string[];
  equippedCosmetic: string | null;
  inventory: Record<ItemId, number>;
  exploredChunks: string[]; // "cx,cy" where chunk is 4x4 tiles
  customExamQuestions: Question[];
  duelWins?: string[]; // fichaIds defeated in NPC academic duels
  spentStudyPoints?: number; // Study points spent in building shops
  claimedBuildingSecrets?: string[]; // Building IDs whose secret quests were claimed
  settings: {
    volume: number;
    muted: boolean;
    highContrast: boolean;
    disableShake: boolean;
  };
  stats: {
    totalAnswered: number;
    totalCorrect: number;
    npcsTalked: number;
    bossesDefeated: number;
  };
}

export interface CustomDatabaseStore {
  version: number;
  zonas: ZonaInfo[];
  fichas: Ficha[];
  questions: Question[];
}

