import type { ItemId, Question, RegionId } from '../types';
import type { MonsterSpriteType, WorldEnemy } from '../world/worldMap';

export interface BattleBackdropSpec {
  regionId: RegionId;
  imageUrl: string;
  arenaTitle: string;
  fallbackGradient: string;
  floorTint: string;
  ambientGlow: string;
}

export const BATTLE_BACKDROPS: Record<RegionId, BattleBackdropSpec> = {
  'reino-da-toga': {
    regionId: 'reino-da-toga',
    imageUrl: '/src/assets/images/battle_bg_reino_toga_1795616815379.jpg',
    arenaTitle: 'Praça do Tribunal de Pedra',
    fallbackGradient: 'linear-gradient(180deg, #273a5e 0%, #5c7591 52%, #7d6646 54%, #57452e 100%)',
    floorTint: 'rgba(61, 44, 24, 0.45)',
    ambientGlow: 'rgba(245, 208, 108, 0.2)',
  },
  'cidadela-do-conselho': {
    regionId: 'cidadela-do-conselho',
    imageUrl: '/src/assets/images/battle_bg_cidadela_conselho_1795616757128.jpg',
    arenaTitle: 'Salão Real do Conselho de TIC',
    fallbackGradient: 'linear-gradient(180deg, #1b2847 0%, #374f7d 54%, #254073 56%, #182b52 100%)',
    floorTint: 'rgba(20, 38, 78, 0.48)',
    ambientGlow: 'rgba(96, 165, 250, 0.2)',
  },
  'porto-babel': {
    regionId: 'porto-babel',
    imageUrl: '/src/assets/images/battle_bg_porto_babel_1795616760180.jpg',
    arenaTitle: 'Cais do Farol de Porto Babel',
    fallbackGradient: 'linear-gradient(180deg, #1d5b8a 0%, #3aa3c7 52%, #9e7346 54%, #7a522d 100%)',
    floorTint: 'rgba(71, 46, 22, 0.42)',
    ambientGlow: 'rgba(45, 212, 191, 0.2)',
  },
  'floresta-do-codigo': {
    regionId: 'floresta-do-codigo',
    imageUrl: '/src/assets/images/battle_bg_floresta_codigo_1795616762952.jpg',
    arenaTitle: 'Clareira das Runas Binárias',
    fallbackGradient: 'linear-gradient(180deg, #0d2b1f 0%, #1d5239 54%, #2a592e 56%, #18361c 100%)',
    floorTint: 'rgba(13, 40, 20, 0.46)',
    ambientGlow: 'rgba(52, 211, 153, 0.22)',
  },
  'fortaleza-da-muralha': {
    regionId: 'fortaleza-da-muralha',
    imageUrl: '/src/assets/images/battle_bg_fortaleza_muralha_1795616831460.jpg',
    arenaTitle: 'Pátio da Muralha Criptográfica',
    fallbackGradient: 'linear-gradient(180deg, #161224 0%, #2b233d 54%, #2a2836 56%, #181621 100%)',
    floorTint: 'rgba(18, 15, 28, 0.55)',
    ambientGlow: 'rgba(248, 113, 113, 0.22)',
  },
  'montanhas-da-infra': {
    regionId: 'montanhas-da-infra',
    imageUrl: '/src/assets/images/battle_bg_montanhas_infra_1795616848567.jpg',
    arenaTitle: 'Terraço dos Picos da Nuvem',
    fallbackGradient: 'linear-gradient(180deg, #1b2242 0%, #444d78 54%, #4f5266 56%, #313445 100%)',
    floorTint: 'rgba(30, 32, 52, 0.48)',
    ambientGlow: 'rgba(167, 139, 250, 0.24)',
  },
};

export interface BattleFormationUnit {
  id: string;
  label: string;
  slotIndex: number;
  totalInSquad: number;
  maxHp: number;
  /** Horizontal stage coordinate in % (right side: ~64%..87%) */
  posXPercent: number;
  /** Vertical stage coordinate in % from top (standing floor: ~58%..84%) */
  posYPercent: number;
  scale: 'mob' | 'elite' | 'boss' | 'npc';
  zIndex: number;
}

export interface BattleUnitRuntimeState {
  unit: BattleFormationUnit;
  hp: number;
  maxHp: number;
  defeated: boolean;
  damageStage: 0 | 1 | 2 | 3;
  isTargeted: boolean;
}

export interface SquadRuntimeSummary {
  units: BattleUnitRuntimeState[];
  livingCount: number;
  defeatedCount: number;
  activeTargetIndex: number;
  /** Index of the unit that received the most recent hit (when correctCount > 0), or -1 */
  lastHitUnitIndex: number;
  /** Whether the most recent hit just knocked out a unit */
  lastHitWasKo: boolean;
}

const SWARM_SPRITES: ReadonlySet<MonsterSpriteType> = new Set(['goblin', 'slime', 'ghost']);
const ELITE_PAIR_SPRITES: ReadonlySet<MonsterSpriteType> = new Set(['knight', 'golem', 'hydra', 'kraken', 'dragon']);

function distributeHp(totalHp: number, count: number, favorLast = true): number[] {
  const safeTotal = Math.max(count, totalHp);
  const base = Math.floor(safeTotal / count);
  let rem = safeTotal - base * count;
  const result = new Array<number>(count).fill(base);
  if (favorLast) {
    for (let i = count - 1; i >= 0 && rem > 0; i--) {
      result[i] += 1;
      rem -= 1;
    }
  } else {
    for (let i = 0; i < count && rem > 0; i++) {
      result[i] += 1;
      rem -= 1;
    }
  }
  return result;
}

/**
 * Builds the Final Fantasy-style right-side enemy formation based on encounter type:
 * - Region Boss -> 1 imposing solo Boss
 * - NPC Academic Duel -> 1 solo Rival NPC
 * - Mini-Boss or Heavy Monster (knight, golem, dragon, hydra, kraken) -> 2 elite units (staggered pair)
 * - Standard Mob (goblin, slime, ghost) -> 3 squad units (classic FF triangle formation!)
 */
export function buildBattleFormation(enemy: WorldEnemy, totalQuestions: number): BattleFormationUnit[] {
  const safeTotal = Math.max(1, totalQuestions);

  if (enemy.isBoss) {
    return [
      {
        id: `${enemy.id}-boss`,
        label: enemy.nome,
        slotIndex: 0,
        totalInSquad: 1,
        maxHp: safeTotal,
        posXPercent: 77,
        posYPercent: 73,
        scale: 'boss',
        zIndex: 20,
      },
    ];
  }

  if (enemy.isNpcDuel) {
    return [
      {
        id: `${enemy.id}-npc`,
        label: enemy.nome,
        slotIndex: 0,
        totalInSquad: 1,
        maxHp: safeTotal,
        posXPercent: 76,
        posYPercent: 74,
        scale: 'npc',
        zIndex: 20,
      },
    ];
  }

  // Mini-Boss or Heavy Knights/Golems -> 2 units in staggered duo formation
  if (enemy.isMiniBoss || ELITE_PAIR_SPRITES.has(enemy.sprite)) {
    const count = Math.min(2, safeTotal);
    if (count === 1) {
      return [
        {
          id: `${enemy.id}-0`,
          label: enemy.nome,
          slotIndex: 0,
          totalInSquad: 1,
          maxHp: safeTotal,
          posXPercent: 76,
          posYPercent: 74,
          scale: 'elite',
          zIndex: 20,
        },
      ];
    }
    const hps = distributeHp(safeTotal, 2, true);
    const coords = [
      { x: 68, y: 69, z: 18, suffix: 'Vanguarda' },
      { x: 82, y: 80, z: 22, suffix: enemy.isMiniBoss ? 'Comandante' : 'Guardião' },
    ];
    return coords.map((pos, idx) => ({
      id: `${enemy.id}-${idx}`,
      label: `${enemy.nome} · ${pos.suffix}`,
      slotIndex: idx,
      totalInSquad: 2,
      maxHp: hps[idx],
      posXPercent: pos.x,
      posYPercent: pos.y,
      scale: 'elite' as const,
      zIndex: pos.z,
    }));
  }

  // Standard mobs (goblin, slime, ghost) -> 3 units in classic Final Fantasy staggered triangle!
  const desiredCount = SWARM_SPRITES.has(enemy.sprite) ? 3 : 2;
  const count = Math.min(desiredCount, safeTotal);
  const hps = distributeHp(safeTotal, count, true);

  const slots3 = [
    { x: 66, y: 74, z: 20, suffix: 'I' },
    { x: 78, y: 62, z: 16, suffix: 'II' },
    { x: 84, y: 81, z: 24, suffix: 'III' },
  ];
  const slots2 = [
    { x: 69, y: 70, z: 18, suffix: 'I' },
    { x: 82, y: 80, z: 22, suffix: 'II' },
  ];
  const slots = count === 3 ? slots3 : count === 2 ? slots2 : [{ x: 76, y: 74, z: 20, suffix: '' }];

  return slots.map((pos, idx) => ({
    id: `${enemy.id}-${idx}`,
    label: pos.suffix ? `${enemy.nome} ${pos.suffix}` : enemy.nome,
    slotIndex: idx,
    totalInSquad: count,
    maxHp: hps[idx],
    posXPercent: pos.x,
    posYPercent: pos.y,
    scale: 'mob' as const,
    zIndex: pos.z,
  }));
}

function calcDamageStage(hp: number, maxHp: number): 0 | 1 | 2 | 3 {
  if (maxHp <= 0 || hp <= 0) return 3;
  const ratio = hp / maxHp;
  if (ratio >= 0.99) return 0;
  if (ratio > 0.65) return 1;
  if (ratio > 0.34) return 2;
  return 3;
}

/**
 * Computes live HP, KO state, progressive damage stage, and active target across the squad.
 */
export function computeSquadStates(units: BattleFormationUnit[], correctCount: number): SquadRuntimeSummary {
  let remainingDmg = Math.max(0, correctCount);
  let lastHitUnitIndex = -1;
  let lastHitWasKo = false;

  const states: BattleUnitRuntimeState[] = units.map((unit, idx) => {
    const applied = Math.min(unit.maxHp, remainingDmg);
    if (applied > 0) {
      lastHitUnitIndex = idx;
      if (remainingDmg === applied && applied === unit.maxHp) {
        lastHitWasKo = true;
      }
    }
    remainingDmg -= applied;
    const hp = Math.max(0, unit.maxHp - applied);
    return {
      unit,
      hp,
      maxHp: unit.maxHp,
      defeated: hp <= 0,
      damageStage: calcDamageStage(hp, unit.maxHp),
      isTargeted: false,
    };
  });

  const activeTargetIndex = states.findIndex((s) => !s.defeated);
  if (activeTargetIndex >= 0) {
    states[activeTargetIndex].isTargeted = true;
  }

  const defeatedCount = states.filter((s) => s.defeated).length;
  return {
    units: states,
    livingCount: states.length - defeatedCount,
    defeatedCount,
    activeTargetIndex,
    lastHitUnitIndex,
    lastHitWasKo,
  };
}

export function getFormationSummaryLabel(enemy: WorldEnemy, units: BattleFormationUnit[]): string {
  if (enemy.isBoss) return `${enemy.nome} · Chefe de Região`;
  if (enemy.isNpcDuel) return `Duelo com ${enemy.nome}`;
  if (units.length > 1) return `${units.length}× ${enemy.nome}`;
  return enemy.nome;
}

export interface BattleSpeechPayload {
  speaker: 'enemy' | 'hero' | 'lumina';
  speakerName: string;
  text: string;
  tone: 'challenge' | 'victory' | 'ko' | 'warning' | 'hint' | 'shield' | 'block' | 'encourage';
}

/**
 * Generates dynamic, expressive in-battle speech bubbles positioned right in front of the fighters.
 */
export function buildBattleCallout(params: {
  enemy: WorldEnemy;
  question: Question;
  qIdx: number;
  squad: SquadRuntimeSummary;
  phase: 'asking' | 'correct' | 'wrong' | 'enemy-block' | 'lumina-encourage' | 'shield' | 'item';
  usedItem?: ItemId | 'foco';
}): BattleSpeechPayload {
  const { enemy, question, qIdx, squad, phase, usedItem } = params;
  const shortTopic =
    question.fichaTitulo.length > 44
      ? `${question.fichaTitulo.slice(0, 42).trim()}…`
      : question.fichaTitulo;

  if (phase === 'item' && usedItem) {
    const itemLines: Record<ItemId | 'foco', string> = {
      pocao_dica: 'Usei a Poção de Dica! Risquei alternativas erradas para você!',
      escudo_recurso: 'Escudo do Recurso ativo! O próximo erro não vai tirar seu HP!',
      lupa_fonte: 'Achei o trecho exato da apostila! Confira logo abaixo do enunciado!',
      pocao_vida: 'Poção de Vida aplicada! +40 HP recuperados para continuar firme!',
      elixir_foco: 'Elixir do Foco! Sua energia analítica voltou com tudo!',
      foco: 'Foco Analítico disparado! Uma alternativa incorreta foi eliminada!',
    };
    return {
      speaker: 'lumina',
      speakerName: 'Lumina',
      text: itemLines[usedItem],
      tone: 'hint',
    };
  }

  if (phase === 'correct') {
    if (squad.livingCount === 0) {
      return {
        speaker: 'hero',
        speakerName: 'Herói',
        text: enemy.isBoss
          ? 'Vitória decisiva! O Chefe foi dominado com maestria!'
          : enemy.isNpcDuel
            ? 'Excelente duelo! Fundamento comprovado na prática!'
            : 'Esquadrão derrotado! Rumo à aprovação no TRT4!',
        tone: 'ko',
      };
    }
    if (squad.lastHitWasKo && squad.units.length > 1) {
      return {
        speaker: 'hero',
        speakerName: 'Herói',
        text: `Acerto certeiro! Um oponente caiu — restam ${squad.livingCount}!`,
        tone: 'ko',
      };
    }
    const shouts = [
      'Golpe certeiro! Fundamento jurídico-técnico na ponta da língua!',
      'Na mosca! Essa pegadinha da banca não passou!',
      'Ataque crítico! Conhecimento sólido derruba qualquer defesa!',
    ];
    return {
      speaker: 'hero',
      speakerName: 'Herói',
      text: shouts[qIdx % shouts.length],
      tone: 'victory',
    };
  }

  if (phase === 'enemy-block') {
    const blockLines = enemy.isNpcDuel
      ? [
          'Bloqueado! Ah, você errou esse detalhe da norma — agora é minha vez!',
          'Defendi sua investida! Faltou atenção ao texto da regra!',
        ]
      : [
          'Aha! Você errou o fundamento — ataque bloqueado! Prepare-se!',
          'Bloqueado! Essa resposta errada não atravessa minha guarda!',
          'Haha! Você errou a questão! Minha defesa segurou fácil!',
        ];
    return {
      speaker: 'enemy',
      speakerName: enemy.nome,
      text: blockLines[qIdx % blockLines.length],
      tone: 'block',
    };
  }

  if (phase === 'shield') {
    return {
      speaker: 'lumina',
      speakerName: 'Lumina',
      text: 'Ufa! O Escudo do Recurso segurou o contra-ataque! Leia o "Por quê?" para fixar.',
      tone: 'shield',
    };
  }

  if (phase === 'lumina-encourage') {
    const cheers = [
      'Ah, mais sorte na próxima! Leia o "Por quê?" abaixo para nunca mais cair nessa!',
      'Preste mais atenção nesse detalhe da fonte — na próxima rodada você dá o troco!',
      'Não desanime! Errar treinando agora garante o acerto no dia da prova do TRT4!',
      'Quase lá! Dê uma olhada na citação abaixo e volte com tudo no próximo golpe!',
    ];
    return {
      speaker: 'lumina',
      speakerName: 'Lumina',
      text: cheers[qIdx % cheers.length],
      tone: 'encourage',
    };
  }

  if (phase === 'wrong') {
    const taunts = enemy.isNpcDuel
      ? [
          'Contra-ataque! Essa é uma pegadinha clássica de concurso.',
          'Minha vez! Atenção redobrada ao detalhe da norma!',
        ]
      : [
          'Tome esse contra-ataque! Caiu direitinho na pegadinha da banca!',
          'Agora é a minha vez! Receba o contra-golpe!',
        ];
    return {
      speaker: 'enemy',
      speakerName: enemy.nome,
      text: taunts[qIdx % taunts.length],
      tone: 'warning',
    };
  }

  // phase === 'asking'
  if (enemy.isBoss) {
    const bossLines = [
      `Mostre se você domina "${shortTopic}"!`,
      `Só quem conhece "${shortTopic}" vence o Chefe!`,
      `Prepare-se! Esta questão de "${shortTopic}" exige precisão de prova!`,
    ];
    return {
      speaker: 'enemy',
      speakerName: enemy.nome,
      text: bossLines[qIdx % bossLines.length],
      tone: 'challenge',
    };
  }

  if (enemy.isNpcDuel) {
    return {
      speaker: 'enemy',
      speakerName: enemy.nome,
      text: `Vamos testar seu domínio sobre "${shortTopic}"! Qual é a correta?`,
      tone: 'challenge',
    };
  }

  if (squad.units.length > 1 && squad.defeatedCount > 0) {
    return {
      speaker: 'enemy',
      speakerName: enemy.nome,
      text: `Ainda somos ${squad.livingCount}! Quero ver acertar "${shortTopic}"!`,
      tone: 'challenge',
    };
  }

  return {
    speaker: 'enemy',
    speakerName: enemy.nome,
    text:
      squad.units.length > 1
        ? `Nosso grupo bloqueia o caminho! Resolva "${shortTopic}"!`
        : `Pare aí! Responda sobre "${shortTopic}" se puder!`,
    tone: 'challenge',
  };
}
