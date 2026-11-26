import type { PlayerClass, SaveState } from '../types';
import { getAllQuestions } from './customDatabase';

const STORAGE_KEY = 'cronicas_trt4_save_v1';

/**
 * Tira da revisão espaçada as questões que não existem mais no jogo
 * (por exemplo, geradas que foram trocadas por questões autorais).
 * Sem isso, elas virariam Inimigos Ressurgidos impossíveis de vencer.
 */
export function pruneOrphanQuestionRefs(state: SaveState): SaveState {
  const known = new Set(getAllQuestions(state.customExamQuestions).map((q) => q.id));
  const entries = Object.entries(state.spacedRep || {});
  const kept = entries.filter(([id]) => known.has(id));
  const wrong = state.wrongQuestionIds.filter((id) => known.has(id));
  if (kept.length === entries.length && wrong.length === state.wrongQuestionIds.length) return state;
  return { ...state, spacedRep: Object.fromEntries(kept), wrongQuestionIds: wrong };
}

export function createInitialSaveState(playerClass: PlayerClass = 'dupla'): SaveState {
  return {
    version: 1,
    playerClass,
    heroX: 29,
    heroY: 22,
    heroDir: 'down',
    hp: 100,
    maxHp: 100,
    focus: 60,
    maxFocus: 60,
    xp: 0,
    level: 1,
    studiedFichas: [],
    correctQuestionIds: [],
    wrongQuestionIds: [],
    spacedRep: {},
    collectedScrolls: [],
    completedPontes: [],
    defeatedEnemies: [],
    defeatedBosses: [],
    openedChests: [],
    regionKeys: [],
    unlockedCosmetics: [],
    equippedCosmetic: null,
    inventory: {
      pocao_dica: 3,
      escudo_recurso: 2,
      lupa_fonte: 3,
      pocao_vida: 3,
      elixir_foco: 2,
    },
    exploredChunks: (() => {
      const list: string[] = [];
      for (let cy = 2; cy <= 7; cy++) {
        for (let cx = 3; cx <= 10; cx++) {
          list.push(`${cx},${cy}`);
        }
      }
      return list;
    })(),
    customExamQuestions: [],
    duelWins: [],
    settings: {
      volume: 0.45,
      muted: false,
      highContrast: false,
      disableShake: false,
    },
    stats: {
      totalAnswered: 0,
      totalCorrect: 0,
      npcsTalked: 0,
      bossesDefeated: 0,
    },
  };
}

export function loadSaveState(): SaveState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SaveState>;
    if (!parsed || typeof parsed !== 'object' || !parsed.playerClass) return null;
    const base = createInitialSaveState(parsed.playerClass);
    return pruneOrphanQuestionRefs({
      ...base,
      ...parsed,
      inventory: { ...base.inventory, ...(parsed.inventory || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) },
      stats: { ...base.stats, ...(parsed.stats || {}) },
    });
  } catch {
    return null;
  }
}

export function persistSaveState(state: SaveState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors gracefully
  }
}

export function clearSaveState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function exportSaveJson(state: SaveState): string {
  return JSON.stringify(state, null, 2);
}

export function parseImportedSaveJson(raw: string): { ok: true; state: SaveState } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(raw) as Partial<SaveState>;
    if (!parsed || typeof parsed !== 'object' || !['tecnico', 'analista', 'dupla'].includes(String(parsed.playerClass))) {
      return { ok: false, error: 'Arquivo de progresso inválido (classe do personagem ausente).' };
    }
    const base = createInitialSaveState(parsed.playerClass as PlayerClass);
    const merged: SaveState = {
      ...base,
      ...parsed,
      inventory: { ...base.inventory, ...(parsed.inventory || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) },
      stats: { ...base.stats, ...(parsed.stats || {}) },
    };
    return { ok: true, state: pruneOrphanQuestionRefs(merged) };
  } catch {
    return { ok: false, error: 'Não foi possível ler o JSON do progresso.' };
  }
}
