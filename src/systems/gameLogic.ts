import { PONTES, REGIONS } from '../data/content';
import { getAllFichas, getAllQuestions, getAllZonas, getFichaById } from './customDatabase';
import type {
  CargoScope,
  Ficha,
  InventoryItemDef,
  ItemId,
  PlayerClass,
  PonteQuest,
  Question,
  RegionId,
  SaveState,
} from '../types';

export const ITEM_DEFS: Record<ItemId, InventoryItemDef> = {
  pocao_dica: {
    id: 'pocao_dica',
    nome: 'Poção de Dica',
    descricao: 'Elimina 2 alternativas erradas em questões de múltipla escolha.',
    cor: '#38bdf8',
    usoEmBatalha: true,
  },
  escudo_recurso: {
    id: 'escudo_recurso',
    nome: 'Escudo do Recurso',
    descricao: 'Anula o dano de 1 erro durante a batalha atual.',
    cor: '#f59e0b',
    usoEmBatalha: true,
  },
  lupa_fonte: {
    id: 'lupa_fonte',
    nome: 'Lupa da Fonte',
    descricao: 'Revela o trecho original da ficha do MD antes de responder.',
    cor: '#a78bfa',
    usoEmBatalha: true,
  },
  pocao_vida: {
    id: 'pocao_vida',
    nome: 'Poção de Vitalidade',
    descricao: 'Restaura +40 de HP fora ou dentro de batalha.',
    cor: '#ef4444',
    usoEmBatalha: true,
  },
  elixir_foco: {
    id: 'elixir_foco',
    nome: 'Elixir do Foco',
    descricao: 'Restaura +35 de Mana do Foco para usar habilidades especiais.',
    cor: '#34d399',
    usoEmBatalha: true,
  },
};

export const CLASS_INFO: Record<
  PlayerClass,
  {
    nome: string;
    subtitulo: string;
    cargoLabel: string;
    descricao: string;
    accent: string;
  }
> = {
  tecnico: {
    nome: 'Guardião Técnico',
    subtitulo: 'Técnico Judiciário — TI',
    cargoLabel: 'Fichas 🟢 + 🔵',
    descricao: 'Foco em desenvolvimento PDPJ-Br, testes JUnit, cloud/nuvem, segurança e legislação.',
    accent: '#38bdf8',
  },
  analista: {
    nome: 'Arcanista Analista',
    subtitulo: 'Analista Judiciário — TI',
    cargoLabel: 'Fichas 🟢 + 🟣',
    descricao: 'Foco em Banco de Dados, SO, Redes, PMBOK/ITIL/COBIT, IA/LLMs e legislação.',
    accent: '#a78bfa',
  },
  dupla: {
    nome: 'Lenda Dupla',
    subtitulo: 'Técnico + Analista TI',
    cargoLabel: 'Todas as fichas (🟢 + 🔵 + 🟣)',
    descricao: 'Jornada completa pelos dois cargos do edital do TRT da 4ª Região.',
    accent: '#e6b84c',
  },
};

/**
 * Checks whether a cargo scope is included for a given player class.
 * Guardião Técnico -> ambos (🟢) + tecnico (🔵)
 * Arcanista Analista -> ambos (🟢) + analista (🟣)
 * Lenda Dupla -> all
 */
export function isCargoAllowed(cargo: CargoScope, playerClass: PlayerClass): boolean {
  if (playerClass === 'dupla') return true;
  if (cargo === 'ambos') return true;
  return cargo === playerClass;
}

export function getFichasForClass(playerClass: PlayerClass): Ficha[] {
  return getAllFichas().filter((f) => isCargoAllowed(f.cargo, playerClass));
}

export function getQuestionsForClass(
  playerClass: PlayerClass,
  customExamQuestions: Question[] = []
): Question[] {
  return getAllQuestions(customExamQuestions).filter((q) => isCargoAllowed(q.cargo, playerClass));
}

export function xpNeededForLevel(level: number): number {
  return Math.round(100 + (level - 1) * 65 + Math.pow(level - 1, 1.35) * 20);
}

export function applyXpGain(state: SaveState, xpGain: number): {
  xp: number;
  level: number;
  maxHp: number;
  hp: number;
  maxFocus: number;
  focus: number;
  leveledUp: boolean;
} {
  let xp = state.xp + xpGain;
  let level = state.level;
  let maxHp = state.maxHp;
  let hp = state.hp;
  let maxFocus = state.maxFocus;
  let focus = state.focus;
  let leveledUp = false;

  while (xp >= xpNeededForLevel(level)) {
    xp -= xpNeededForLevel(level);
    level += 1;
    leveledUp = true;
    maxHp += 15;
    hp = maxHp;
    maxFocus += 10;
    focus = maxFocus;
  }

  return { xp, level, maxHp, hp, maxFocus, focus, leveledUp };
}

export type FichaStatus = 'nao_vista' | 'estudada' | 'dominada';

export function getFichaStatus(
  fichaId: string,
  state: SaveState,
  allQuestions: Question[] = getAllQuestions(state.customExamQuestions)
): FichaStatus {
  const qs = allQuestions.filter((q) => q.fichaId === fichaId);
  const correctSet = new Set(state.correctQuestionIds);
  if (qs.length > 0 && qs.every((q) => correctSet.has(q.id))) {
    return 'dominada';
  }
  if (state.studiedFichas.includes(fichaId)) {
    return 'estudada';
  }
  return 'nao_vista';
}

export interface MasterySummary {
  total: number;
  estudadas: number;
  dominadas: number;
  percentEstudadas: number;
  percentDominadas: number;
}

export function computeMastery(
  fichas: Ficha[],
  state: SaveState,
  allQuestions: Question[] = getAllQuestions(state.customExamQuestions)
): MasterySummary {
  let estudadas = 0;
  let dominadas = 0;
  for (const f of fichas) {
    const st = getFichaStatus(f.id, state, allQuestions);
    if (st === 'dominada') {
      dominadas += 1;
      estudadas += 1;
    } else if (st === 'estudada') {
      estudadas += 1;
    }
  }
  const total = fichas.length;
  return {
    total,
    estudadas,
    dominadas,
    percentEstudadas: total > 0 ? Math.round((estudadas / total) * 100) : 0,
    percentDominadas: total > 0 ? Math.round((dominadas / total) * 100) : 0,
  };
}

export function computeMasteryByMateria(state: SaveState) {
  const allowedFichas = getFichasForClass(state.playerClass);
  const allQs = getQuestionsForClass(state.playerClass, state.customExamQuestions);
  return getAllZonas().map((zona) => {
    const zFichas = allowedFichas.filter((f) => f.zonaId === zona.id);
    return {
      zona,
      ...computeMastery(zFichas, state, allQs),
    };
  });
}

export function computeMasteryByCargo(state: SaveState) {
  const allQs = getAllQuestions(state.customExamQuestions);
  const tecnicoFichas = getFichasForClass('tecnico');
  const analistaFichas = getFichasForClass('analista');
  return {
    tecnico: computeMastery(tecnicoFichas, state, allQs),
    analista: computeMastery(analistaFichas, state, allQs),
  };
}

/**
 * Spaced Repetition Engine:
 * - Wrong answer schedules the question as a "Ressurgido" enemy after a cooldown (25s in-game for snappy study loop)
 * - Resets consecutiveCorrect to 0
 * - Answering correctly increments consecutiveCorrect; reaching 2 consecutive correct answers clears it!
 */
export const SPACED_REP_COOLDOWN_MS = 25_000;

export function recordQuestionOutcome(
  state: SaveState,
  question: Question,
  wasCorrect: boolean,
  nowMs: number = Date.now()
): SaveState {
  const correctSet = new Set(state.correctQuestionIds);
  const wrongSet = new Set(state.wrongQuestionIds);
  const spacedRep = { ...state.spacedRep };

  if (wasCorrect) {
    correctSet.add(question.id);
    const existing = spacedRep[question.id];
    if (existing) {
      const nextStreak = existing.consecutiveCorrect + 1;
      if (nextStreak >= 2) {
        delete spacedRep[question.id];
        wrongSet.delete(question.id);
      } else {
        spacedRep[question.id] = {
          ...existing,
          consecutiveCorrect: nextStreak,
          dueAfterTimestamp: nowMs + SPACED_REP_COOLDOWN_MS,
        };
      }
    }
  } else {
    wrongSet.add(question.id);
    const existing = spacedRep[question.id];
    spacedRep[question.id] = {
      questionId: question.id,
      fichaId: question.fichaId,
      zonaId: question.zonaId,
      consecutiveCorrect: 0,
      dueAfterTimestamp: nowMs + SPACED_REP_COOLDOWN_MS,
      wrongCount: (existing?.wrongCount || 0) + 1,
    };
  }

  return {
    ...state,
    correctQuestionIds: Array.from(correctSet),
    wrongQuestionIds: Array.from(wrongSet),
    spacedRep,
    stats: {
      ...state.stats,
      totalAnswered: state.stats.totalAnswered + 1,
      totalCorrect: state.stats.totalCorrect + (wasCorrect ? 1 : 0),
    },
  };
}

export function getDueSpacedRepQuestions(
  state: SaveState,
  nowMs: number = Date.now()
): Question[] {
  const allQs = getQuestionsForClass(state.playerClass, state.customExamQuestions);
  const qMap = new Map(allQs.map((q) => [q.id, q]));
  const due: Question[] = [];
  for (const entry of Object.values(state.spacedRep)) {
    if (entry.dueAfterTimestamp <= nowMs) {
      const q = qMap.get(entry.questionId);
      if (q) due.push(q);
    }
  }
  return due;
}

/**
 * Picks questions for a battle:
 * - Monster: 3 questions from that zone (preferring unanswered / due spaced rep)
 * - Ressurgido: 2-3 due spaced-repetition questions
 * - Mini-Boss (zone): 6 FCC-style / real-exam questions from that zone
 * - Region Boss: 8-10 FCC-style / real-exam questions mixing fichas across the region
 */
export function buildBattleDeck(
  mode: 'monster' | 'resurgent' | 'miniboss' | 'boss' | 'npc-duel',
  scopeId: string,
  state: SaveState,
  seed: number = Date.now()
): Question[] {
  const allQs = getQuestionsForClass(state.playerClass, state.customExamQuestions);
  const correctSet = new Set(state.correctQuestionIds);

  const shuffle = <T,>(arr: T[]): T[] => {
    const out = [...arr];
    let s = (seed >>> 0) || 1;
    for (let i = out.length - 1; i > 0; i--) {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      const j = s % (i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  if (mode === 'npc-duel') {
    const npcFicha = getFichaById(scopeId);
    const directQs = allQs.filter((q) => q.fichaId === scopeId);
    const connectedIds = new Set(npcFicha?.conexoes || []);
    const connectedQs = allQs.filter((q) => connectedIds.has(q.fichaId));
    const zonaQs = npcFicha ? allQs.filter((q) => q.zonaId === npcFicha.zonaId && q.fichaId !== scopeId) : [];
    const combined = [...shuffle(directQs), ...shuffle(connectedQs), ...shuffle(zonaQs), ...shuffle(allQs)];
    const unique: Question[] = [];
    const seen = new Set<string>();
    for (const q of combined) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        unique.push(q);
      }
      if (unique.length >= 4) break;
    }
    return unique;
  }

  if (mode === 'resurgent') {
    const due = getDueSpacedRepQuestions(state, Date.now() + SPACED_REP_COOLDOWN_MS);
    const pool = due.length > 0 ? due : allQs.filter((q) => state.wrongQuestionIds.includes(q.id));
    if (pool.length > 0) return shuffle(pool).slice(0, 3);
    return shuffle(allQs).slice(0, 3);
  }

  if (mode === 'monster') {
    const zoneQs = allQs.filter((q) => q.zonaId === scopeId && !q.isBossStyle);
    const fallbackZoneQs = allQs.filter((q) => q.zonaId === scopeId);
    const pool = zoneQs.length >= 3 ? zoneQs : fallbackZoneQs.length > 0 ? fallbackZoneQs : allQs;
    const unseen = shuffle(pool.filter((q) => !correctSet.has(q.id)));
    const seen = shuffle(pool.filter((q) => correctSet.has(q.id)));
    return [...unseen, ...seen].slice(0, 3);
  }

  if (mode === 'miniboss') {
    const realQs = allQs.filter((q) => q.isRealExam && (q.zonaId === scopeId || q.regiaoId === scopeId));
    const fccQs = allQs.filter((q) => q.zonaId === scopeId && q.isBossStyle);
    const otherZoneQs = allQs.filter((q) => q.zonaId === scopeId && !q.isBossStyle && q.alternativas.length >= 4);
    const fallbackAll = allQs.filter((q) => q.isBossStyle);
    const combined = [...shuffle(realQs), ...shuffle(fccQs), ...shuffle(otherZoneQs), ...shuffle(fallbackAll)];
    const unique: Question[] = [];
    const ids = new Set<string>();
    for (const q of combined) {
      if (!ids.has(q.id)) {
        ids.add(q.id);
        unique.push(q);
      }
      if (unique.length >= 6) break;
    }
    return unique;
  }

  // Region Boss: 8 questions mixing fichas across the region (prioritizing real exam questions, then FCC boss style)
  const regionReal = allQs.filter((q) => q.isRealExam && q.regiaoId === scopeId);
  const anyReal = allQs.filter((q) => q.isRealExam && q.regiaoId !== scopeId);
  const regionBoss = allQs.filter((q) => q.regiaoId === scopeId && q.isBossStyle);
  const regionOther = allQs.filter((q) => q.regiaoId === scopeId && !q.isBossStyle && q.alternativas.length >= 4);
  const combined = [...shuffle(regionReal), ...shuffle(regionBoss), ...shuffle(regionOther), ...shuffle(anyReal)];
  const unique: Question[] = [];
  const ids = new Set<string>();
  for (const q of combined) {
    if (!ids.has(q.id)) {
      ids.add(q.id);
      unique.push(q);
    }
    if (unique.length >= 8) break;
  }
  return unique;
}

/**
 * Checks which Ponte quests are newly completed based on collectedScrolls.
 */
export function getNewlyCompletedPontes(state: SaveState): PonteQuest[] {
  const scrollSet = new Set(state.collectedScrolls);
  const doneSet = new Set(state.completedPontes);
  return PONTES.filter(
    (p) => !doneSet.has(p.id) && p.fichaIds.length > 0 && p.fichaIds.every((fid) => scrollSet.has(fid))
  );
}

/**
 * Validates and parses user-imported JSON of real exam questions.
 * Accepts an array of Question-like objects with optional banca, ano, orgao, cargo.
 */
export function parseImportedRealExamJson(rawJson: string): {
  ok: true;
  questions: Question[];
} | {
  ok: false;
  error: string;
} {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { ok: false, error: 'JSON inválido. Verifique vírgulas, chaves e aspas.' };
  }

  const list = Array.isArray(parsed) ? parsed : (parsed as { questions?: unknown })?.questions;
  if (!Array.isArray(list) || list.length === 0) {
    return { ok: false, error: 'O JSON deve conter um array não vazio de questões.' };
  }

  const validQuestions: Question[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i] as Record<string, unknown>;
    if (!item || typeof item !== 'object') {
      return { ok: false, error: `Item ${i + 1} não é um objeto válido.` };
    }
    const enunciado = String(item.enunciado || '').trim();
    const alternativas = Array.isArray(item.alternativas)
      ? item.alternativas.map((a) => String(a).trim()).filter(Boolean)
      : [];
    const correta = Number(item.correta);
    const trechoFonte = String(item.trechoFonte || '').trim();
    const fichaId = String(item.fichaId || 'lgpd').trim();

    if (!enunciado || alternativas.length < 2 || Number.isNaN(correta) || correta < 0 || correta >= alternativas.length) {
      return {
        ok: false,
        error: `Questão ${i + 1} incompleta: informe enunciado, alternativas (mín. 2) e índice "correta" válido.`,
      };
    }
    if (enunciado.includes('⚠️') || trechoFonte.includes('⚠️')) {
      return { ok: false, error: `Questão ${i + 1} contém aviso ⚠️, que não pode virar pergunta.` };
    }

    const refFicha = getFichaById(fichaId);
    const allZonas = getAllZonas();
    const cargoRaw = String(item.cargo || '').toLowerCase();
    let cargoScope: CargoScope = refFicha?.cargo || 'ambos';
    if (cargoRaw.includes('técnico') || cargoRaw.includes('tecnico')) cargoScope = 'tecnico';
    else if (cargoRaw.includes('analista')) cargoScope = 'analista';
    else if (cargoRaw === 'ambos') cargoScope = 'ambos';

    validQuestions.push({
      id: String(item.id || `real-${Date.now()}-${i}`),
      fichaId: refFicha ? refFicha.id : fichaId,
      fichaTitulo: refFicha ? refFicha.titulo : String(item.fichaTitulo || fichaId),
      zonaId: refFicha ? refFicha.zonaId : String(item.zonaId || allZonas[0].id),
      regiaoId: (refFicha?.regiaoId || item.regiaoId || REGIONS[0].id) as RegionId,
      cargo: cargoScope,
      tipo: (item.tipo as Question['tipo']) || (alternativas.length === 2 ? 'certo_errado' : 'multipla_escolha'),
      enunciado,
      alternativas,
      correta,
      trechoFonte: trechoFonte || refFicha?.oQueE || 'Questão de prova real importada pelo estudante.',
      dificuldade: ([1, 2, 3].includes(Number(item.dificuldade)) ? Number(item.dificuldade) : 3) as 1 | 2 | 3,
      isBossStyle: true,
      isRealExam: true,
      banca: item.banca ? String(item.banca) : 'FCC',
      ano: item.ano ? Number(item.ano) : undefined,
      orgao: item.orgao ? String(item.orgao) : 'TRT',
      cargoProva: item.cargo ? String(item.cargo) : undefined,
    });
  }

  return { ok: true, questions: validQuestions };
}

/**
 * Generates dialogue bubbles (3-5 short bubbles) strictly from the ficha's MD fields.
 */
export interface DialogueBubble {
  speaker: string;
  tag: string;
  text: string;
  isOracle?: boolean;
  connections?: Ficha[];
}

export function buildNpcDialogue(ficha: Ficha, playerClass: PlayerClass): DialogueBubble[] {
  const bubbles: DialogueBubble[] = [];

  // Bubble 1: Apresentação + "O que é"
  const oQueClean = ficha.oQueE.replace(/^(O que é|Definição oficial|Definição|O que são)[^:]*:\s*/i, '');
  const resumo = oQueClean.length > 260 ? `${oQueClean.slice(0, 255).trim()}…` : oQueClean;
  bubbles.push({
    speaker: ficha.npcName,
    tag: `Aula · ${ficha.materia}`,
    text: `Saudações, viajante! Eu guardo a ficha "${ficha.titulo}". Em resumo: ${resumo}`,
  });

  // Bubble 2: Ponto-chave extra (if available)
  const extraFact = ficha.fatosChave.find((f) => f !== ficha.oQueE && f.length >= 24);
  if (extraFact) {
    bubbles.push({
      speaker: ficha.npcName,
      tag: 'Ponto-chave da Ficha',
      text: extraFact.length > 280 ? `${extraFact.slice(0, 275).trim()}…` : extraFact,
    });
  }

  // Bubble 3: Exemplo prático
  if (ficha.exemploPratico) {
    const exClean = ficha.exemploPratico.replace(/^(Exemplo prático|Exemplo|Exemplos|Na prática)[^:]*:\s*/i, '');
    bubbles.push({
      speaker: ficha.npcName,
      tag: 'Exemplo Prático',
      text: exClean.length > 280 ? `${exClean.slice(0, 275).trim()}…` : exClean,
    });
  }

  // Bubble 4: Conexões [[id]]
  const validConns = ficha.conexoes
    .map((id) => getFichaById(id))
    .filter((f): f is Ficha => f !== undefined && isCargoAllowed(f.cargo, playerClass));
  if (validConns.length > 0) {
    const listStr = validConns
      .slice(0, 4)
      .map((c) => `${c.npcName} (${c.titulo.slice(0, 32)})`)
      .join(' · ');
    bubbles.push({
      speaker: ficha.npcName,
      tag: 'Isso se conecta com…',
      text: `Leve este Pergaminho de Conexão! Este tema liga-se diretamente a: ${listStr}.`,
      connections: validConns.slice(0, 5),
    });
  }

  // Bubble 5: Aviso do Oráculo (⚠️), se houver
  if (ficha.avisosOraculo.length > 0) {
    bubbles.push({
      speaker: 'Oráculo das Fontes',
      tag: 'Aviso do Oráculo (Incerteza — não cai em pergunta)',
      text: ficha.avisosOraculo.join(' | '),
      isOracle: true,
    });
  }

  return bubbles;
}
