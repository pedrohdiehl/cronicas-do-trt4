import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Shield,
  Search,
  Sparkles,
  Heart,
  Zap,
  ScrollText,
  LogOut,
  Music,
  Swords,
  Backpack,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import { REGIONS } from '../data/content';
import {
  getFairyBattleDataUrl,
  getHeroBattleDataUrl,
  getMonsterPortraitDataUrl,
  getNpcPortraitDataUrl,
} from '../entities/pixelSprites';
import { getSpriteAtlasRevision, subscribeSpriteAtlas } from '../entities/spriteSheetProcessor';
import { soundEngine, type MusicTrackId } from '../systems/audio';
import {
  BATTLE_BACKDROPS,
  buildBattleCallout,
  buildBattleFormation,
  computeSquadStates,
  getFormationSummaryLabel,
  type BattleSpeechPayload,
} from '../systems/battleFormation';
import { ITEM_DEFS } from '../systems/gameLogic';
import { stripRichText } from '../systems/richText';
import { RichText } from './RichText';
import type { ItemId, Question, SaveState } from '../types';
import type { WorldEnemy } from '../world/worldMap';

interface BattleModalProps {
  enemy: WorldEnemy;
  deck: Question[];
  saveState: SaveState;
  onAnswerQuestion: (question: Question, wasCorrect: boolean, hpDelta: number, focusDelta: number) => void;
  onUseItem: (itemId: ItemId) => void;
  onSpendFocus: (amount: number) => void;
  onBattleEnd: (victory: boolean, enemy: WorldEnemy, xpEarned: number) => void;
  onFlee: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const TYPE_LABELS: Record<Question['tipo'], string> = {
  multipla_escolha: 'Múltipla Escolha',
  certo_errado: 'Certo ou Errado',
  lacuna: 'Complete a Lacuna',
  associacao: 'Associação',
  conexao: 'Conexão entre Fichas',
};

/**
 * Mostra o trecho da ficha sem a marcação do Markdown:
 * **negrito** vira negrito, `código` perde as crases e linha de tabela vira "a · b".
 */
function renderTrecho(raw: string): React.ReactNode {
  return raw.split('\n').map((line, li) => {
    let text = line.trim();
    if (text.startsWith('|')) {
      text = text
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean)
        .join(' · ');
    }
    text = text.replace(/`([^`]+)`/g, '$1');
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return (
      <React.Fragment key={li}>
        {li > 0 && <br />}
        {parts.map((p, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-bold text-white">
              {p}
            </strong>
          ) : (
            p.replace(/\*\*/g, '')
          )
        )}
      </React.Fragment>
    );
  });
}

const DAMAGE_STAGE_LABELS: Record<0 | 1 | 2 | 3, { label: string; color: string }> = {
  0: { label: 'Intacto', color: '#cbd5e1' },
  1: { label: 'Ferido', color: '#fde047' },
  2: { label: 'Abalado', color: '#fb923c' },
  3: { label: 'Crítico', color: '#f87171' },
};

interface BattleAnimEvent {
  id: number;
  kind: 'hero-hit' | 'enemy-block' | 'enemy-hit' | 'shield-block' | 'hero-heal' | 'lumina-cast';
  label: string;
  targetUnitIdx?: number;
  wasKo?: boolean;
}

type WrongChoreoBeat = 'idle' | 'enemy-block' | 'enemy-counter' | 'lumina-encourage';

export const BattleModal: React.FC<BattleModalProps> = ({
  enemy,
  deck,
  saveState,
  onAnswerQuestion,
  onUseItem,
  onSpendFocus,
  onBattleEnd,
  onFlee,
}) => {
  const disableShake = saveState.settings.disableShake;
  const [introActive, setIntroActive] = useState(!disableShake);
  const [backdropFailed, setBackdropFailed] = useState(false);

  const [qIdx, setQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  // Depois de responder, o enunciado encolhe; clicar nele mostra o texto inteiro de novo.
  const [enunciadoAberto, setEnunciadoAberto] = useState(false);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [shieldActive, setShieldActive] = useState(false);
  const [lupaRevealed, setLupaRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [shieldBlockedLast, setShieldBlockedLast] = useState(false);
  const [menuTab, setMenuTab] = useState<'fight' | 'items'>('fight');
  const [hoveredOpt, setHoveredOpt] = useState<number | null>(null);
  const [itemCallout, setItemCallout] = useState<BattleSpeechPayload | null>(null);

  // Wing-flap animation frame for hovering fairy Lumina
  const [fairyFrame, setFairyFrame] = useState(0);
  const [animEvent, setAnimEvent] = useState<BattleAnimEvent | null>(null);
  const [wrongBeat, setWrongBeat] = useState<WrongChoreoBeat>('idle');
  const [atlasRev, setAtlasRev] = useState(() => getSpriteAtlasRevision());
  const choreoTimersRef = useRef<number[]>([]);
  const pendingWrongAnswerRef = useRef<{ apply: () => void; hpDelta: number } | null>(null);

  const flushPendingWrongAnswer = (): number => {
    const pending = pendingWrongAnswerRef.current;
    if (!pending) return 0;
    pendingWrongAnswerRef.current = null;
    pending.apply();
    return pending.hpDelta;
  };

  const clearChoreoTimers = () => {
    for (const tid of choreoTimersRef.current) {
      window.clearTimeout(tid);
    }
    choreoTimersRef.current = [];
  };

  useEffect(() => () => {
    clearChoreoTimers();
    flushPendingWrongAnswer();
  }, []);
  useEffect(() => subscribeSpriteAtlas(() => setAtlasRev(getSpriteAtlasRevision())), []);

  useEffect(() => {
    if (!introActive) return;
    const t = window.setTimeout(() => setIntroActive(false), 660);
    return () => window.clearTimeout(t);
  }, [introActive]);

  useEffect(() => {
    const iv = window.setInterval(() => setFairyFrame((f) => (f + 1) & 1), 300);
    return () => window.clearInterval(iv);
  }, []);

  const totalQuestions = Math.max(1, deck.length);
  const currentQ = deck[qIdx] || deck[0];

  // Build Final Fantasy squad formation (3 goblins/slimes, 2 knights/mini-boss, 1 boss or rival NPC)
  const formation = useMemo(
    () => buildBattleFormation(enemy, totalQuestions),
    [enemy, totalQuestions]
  );

  const squad = useMemo(
    () => computeSquadStates(formation, correctCount),
    [formation, correctCount]
  );

  const formationLabel = useMemo(
    () => getFormationSummaryLabel(enemy, formation),
    [enemy, formation]
  );

  const backdrop = BATTLE_BACKDROPS[enemy.regiaoId] || BATTLE_BACKDROPS['reino-da-toga'];
  const regionInfo = useMemo(
    () => REGIONS.find((r) => r.id === enemy.regiaoId) || REGIONS[0],
    [enemy.regiaoId]
  );

  const activeTrackId: MusicTrackId = enemy.isBoss
    ? 'boss'
    : enemy.isMiniBoss
      ? 'miniboss'
      : enemy.isNpcDuel
        ? 'npc-duel'
        : 'battle';
  const trackMeta = soundEngine.getTrackMeta(activeTrackId);

  const capeColor = useMemo(
    () => REGIONS.find((r) => r.cosmeticReward.id === saveState.equippedCosmetic)?.cosmeticReward.color || null,
    [saveState.equippedCosmetic]
  );

  const heroPose: 'idle' | 'attack' | 'hurt' =
    animEvent?.kind === 'hero-hit' || animEvent?.kind === 'enemy-block'
      ? 'attack'
      : animEvent?.kind === 'enemy-hit'
        ? 'hurt'
        : 'idle';

  const heroBattleUrl = useMemo(
    () => getHeroBattleDataUrl(saveState.playerClass, capeColor, heroPose),
    [saveState.playerClass, capeColor, heroPose, atlasRev]
  );

  const fairyExcited =
    animEvent?.kind === 'hero-hit' ||
    animEvent?.kind === 'lumina-cast' ||
    animEvent?.kind === 'hero-heal' ||
    animEvent?.kind === 'shield-block' ||
    wrongBeat === 'lumina-encourage' ||
    (selectedIdx !== null && currentQ && selectedIdx === currentQ.correta);

  const fairyBattleUrl = useMemo(
    () => getFairyBattleDataUrl(fairyFrame, Boolean(fairyExcited)),
    [fairyFrame, fairyExcited, atlasRev]
  );

  // Pre-render opponent sprites per damage stage (0..3) so every squad unit displays its own live condition!
  const opponentSpritesByStage = useMemo(() => {
    const stages: Record<0 | 1 | 2 | 3, string> = { 0: '', 1: '', 2: '', 3: '' };
    ([0, 1, 2, 3] as const).forEach((st) => {
      if (enemy.isNpcDuel && enemy.npcDuelFicha) {
        stages[st] = getNpcPortraitDataUrl(
          enemy.npcDuelFicha.npcRole,
          enemy.npcDuelFicha.npcSeed,
          st,
          enemy.npcDuelFicha.npcName
        );
      } else {
        stages[st] = getMonsterPortraitDataUrl(
          enemy.sprite,
          Boolean(enemy.isResurgent),
          enemy.isBoss || enemy.isMiniBoss,
          st
        );
      }
    });
    return stages;
  }, [
    enemy.isNpcDuel,
    enemy.npcDuelFicha,
    enemy.sprite,
    enemy.isResurgent,
    enemy.isBoss,
    enemy.isMiniBoss,
    atlasRev,
  ]);

  // Overall boss/total HP ratio for status bar
  const totalMaxHp = totalQuestions;
  const totalHp = Math.max(0, totalMaxHp - correctCount);
  const overallRatio = totalHp / totalMaxHp;
  const overallDamageStage: 0 | 1 | 2 | 3 =
    overallRatio >= 0.99 ? 0 : overallRatio > 0.65 ? 1 : overallRatio > 0.34 ? 2 : 3;

  useEffect(() => {
    clearChoreoTimers();
    setSelectedIdx(null);
    setEnunciadoAberto(false);
    setEliminated([]);
    setLupaRevealed(false);
    setShieldBlockedLast(false);
    setItemCallout(null);
    setWrongBeat('idle');
    setAnimEvent(null);
    setMenuTab('fight');
    setHoveredOpt(null);
  }, [qIdx]);

  const scheduleChoreo = (fn: () => void, delayMs: number) => {
    const tid = window.setTimeout(() => {
      choreoTimersRef.current = choreoTimersRef.current.filter((id) => id !== tid);
      fn();
    }, delayMs);
    choreoTimersRef.current.push(tid);
  };

  const triggerAnim = (payload: Omit<BattleAnimEvent, 'id'>, durationMs = 880) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setAnimEvent({ ...payload, id });
    scheduleChoreo(() => {
      setAnimEvent((cur) => (cur && cur.id === id ? null : cur));
    }, durationMs);
  };

  const handleSelectOption = (idx: number) => {
    if (introActive || selectedIdx !== null || eliminated.includes(idx) || !currentQ) return;
    clearChoreoTimers();
    setSelectedIdx(idx);
    setItemCallout(null);
    setMenuTab('fight');
    const isRight = idx === currentQ.correta;

    if (isRight) {
      setWrongBeat('idle');
      soundEngine.playMonsterHit();
      const targetIdx = squad.activeTargetIndex >= 0 ? squad.activeTargetIndex : 0;
      const nextSquad = computeSquadStates(formation, correctCount + 1);
      const knockedOut = Boolean(nextSquad.units[targetIdx]?.defeated);
      setCorrectCount((c) => c + 1);
      const dmgDisplay = enemy.isBoss ? 145 : enemy.isNpcDuel ? 95 : knockedOut ? 130 : 105;
      triggerAnim(
        {
          kind: 'hero-hit',
          label: knockedOut && formation.length > 1 ? `-${dmgDisplay} · KO!` : `-${dmgDisplay} HP!`,
          targetUnitIdx: targetIdx,
          wasKo: knockedOut,
        },
        950
      );
      onAnswerQuestion(currentQ, true, 0, 6);
    } else {
      // 3-Beat JRPG Wrong-Answer Choreography:
      // Beat 1 (0ms – 1150ms): Hero attacks -> Enemy BLOCKS with shield + boast speech bubble -> Hero returns cleanly (HP still intact!)
      // Beat 2 (1150ms – 2150ms): Enemy counterattacks Hero -> Hero takes damage right on impact (or Escudo blocks it!)
      // Beat 3 (2150ms+): Fairy Lumina glows and shows an encouraging speech bubble!
      const attackerIdx = squad.activeTargetIndex >= 0 ? squad.activeTargetIndex : 0;
      const hadShield = shieldActive;
      const dmg = enemy.isBoss ? 22 : enemy.isMiniBoss ? 18 : enemy.isNpcDuel ? 12 : 14;
      const qRef = currentQ;

      pendingWrongAnswerRef.current = {
        hpDelta: hadShield ? 0 : -dmg,
        apply: () => {
          if (hadShield) {
            setShieldActive(false);
            setShieldBlockedLast(true);
            onAnswerQuestion(qRef, false, 0, 0);
          } else {
            onAnswerQuestion(qRef, false, -dmg, 0);
          }
        },
      };

      // Beat 1: Hero attacks, Enemy raises guard & blocks!
      setWrongBeat('enemy-block');
      soundEngine.playShieldBlock();
      const blockId = Date.now() + 1;
      setAnimEvent({
        id: blockId,
        kind: 'enemy-block',
        label: 'BLOQUEADO!',
        targetUnitIdx: attackerIdx,
      });

      // Beat 2: Hero is back in original position -> Enemy counterattacks & deals damage!
      scheduleChoreo(() => {
        flushPendingWrongAnswer();
        setWrongBeat('enemy-counter');
        const counterId = Date.now() + 2;
        if (hadShield) {
          soundEngine.playShieldBlock();
          setAnimEvent({
            id: counterId,
            kind: 'shield-block',
            label: 'ESCUDO!',
            targetUnitIdx: attackerIdx,
          });
        } else {
          soundEngine.playWrong();
          setAnimEvent({
            id: counterId,
            kind: 'enemy-hit',
            label: `-${dmg} HP`,
            targetUnitIdx: attackerIdx,
          });
        }
      }, 1150);

      // Beat 3: Fairy Lumina encourages the player!
      scheduleChoreo(() => {
        setAnimEvent(null);
        setWrongBeat('lumina-encourage');
      }, 2150);
    }
  };

  const handleFleeSafe = () => {
    clearChoreoTimers();
    flushPendingWrongAnswer();
    onFlee();
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    clearChoreoTimers();
    const pendingHpDelta = flushPendingWrongAnswer();
    const effectiveHp = saveState.hp + pendingHpDelta;
    if (effectiveHp <= 0) {
      onBattleEnd(false, enemy, correctCount * 15);
      return;
    }
    if (qIdx + 1 >= totalQuestions) {
      const needed = Math.ceil(totalQuestions * (enemy.isBoss ? 0.65 : 0.6));
      const victory = correctCount >= needed;
      const baseXp = enemy.isBoss
        ? 180
        : enemy.isMiniBoss
          ? 110
          : enemy.isNpcDuel
            ? 85
            : enemy.isResurgent
              ? 75
              : 55;
      onBattleEnd(victory, enemy, victory ? baseXp + correctCount * 12 : correctCount * 15);
    } else {
      setQIdx((i) => i + 1);
    }
  };

  const announceItemUse = (usedItem: ItemId | 'foco', animKind: 'lumina-cast' | 'hero-heal', label: string) => {
    if (!currentQ) return;
    setItemCallout(
      buildBattleCallout({
        enemy,
        question: currentQ,
        qIdx,
        squad,
        phase: 'item',
        usedItem,
      })
    );
    triggerAnim({ kind: animKind, label }, 850);
    setMenuTab('fight');
  };

  const handleUseHintPotion = () => {
    if (selectedIdx !== null || !currentQ || saveState.inventory.pocao_dica <= 0) return;
    const wrongs = currentQ.alternativas
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correta && !eliminated.includes(i));
    if (wrongs.length === 0) return;
    const toRemove = wrongs.slice(
      0,
      Math.min(2, Math.max(1, wrongs.length - (currentQ.alternativas.length <= 2 ? 1 : 0)))
    );
    if (toRemove.length === 0) return;
    setEliminated((prev) => [...prev, ...toRemove]);
    onUseItem('pocao_dica');
    soundEngine.playItemPickup();
    announceItemUse('pocao_dica', 'lumina-cast', 'DICA!');
  };

  const handleUseFocusSkill = () => {
    if (selectedIdx !== null || !currentQ || saveState.focus < 20) return;
    const wrongs = currentQ.alternativas
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correta && !eliminated.includes(i));
    if (wrongs.length === 0 || currentQ.alternativas.length <= 2) return;
    setEliminated((prev) => [...prev, wrongs[0]]);
    onSpendFocus(20);
    soundEngine.playItemPickup();
    announceItemUse('foco', 'lumina-cast', 'FOCO!');
  };

  const handleUseShield = () => {
    if (shieldActive || saveState.inventory.escudo_recurso <= 0) return;
    setShieldActive(true);
    onUseItem('escudo_recurso');
    soundEngine.playItemPickup();
    announceItemUse('escudo_recurso', 'lumina-cast', 'ESCUDO!');
  };

  const handleUseLupa = () => {
    if (lupaRevealed || saveState.inventory.lupa_fonte <= 0) return;
    setLupaRevealed(true);
    onUseItem('lupa_fonte');
    soundEngine.playItemPickup();
    announceItemUse('lupa_fonte', 'lumina-cast', 'FONTE!');
  };

  const handleUseHeal = () => {
    if (saveState.inventory.pocao_vida <= 0 || saveState.hp >= saveState.maxHp) return;
    onUseItem('pocao_vida');
    soundEngine.playItemPickup();
    announceItemUse('pocao_vida', 'hero-heal', '+40 HP!');
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (introActive) {
        setIntroActive(false);
        return;
      }
      const k = e.key.toLowerCase();
      if (selectedIdx === null && currentQ) {
        if (k === 'tab' || k === 'i') {
          e.preventDefault();
          setMenuTab((t) => (t === 'fight' ? 'items' : 'fight'));
          return;
        }
        if (menuTab === 'fight') {
          const numIdx = ['1', '2', '3', '4', '5'].indexOf(k);
          const letIdx = ['a', 'b', 'c', 'd', 'e'].indexOf(k);
          const target = numIdx >= 0 ? numIdx : letIdx;
          if (target >= 0 && target < currentQ.alternativas.length) {
            e.preventDefault();
            handleSelectOption(target);
          }
        }
      } else if (selectedIdx !== null && (k === 'enter' || k === ' ' || k === 'e')) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!currentQ) return null;

  const isAnswered = selectedIdx !== null;
  const wasRight = selectedIdx === currentQ.correta;
  const hasExplanations =
    Array.isArray(currentQ.explicacoes) && currentQ.explicacoes.length === currentQ.alternativas.length;
  const prova = currentQ.prova;
  const outroTribunal = prova?.escopo === 'paralelo' ? prova.trt : null;

  // Dynamic speech bubble shown directly in front of the Hero/Lumina or Opponent!
  const activeSpeech: BattleSpeechPayload = useMemo(() => {
    if (itemCallout && !isAnswered) return itemCallout;
    let phase: 'asking' | 'correct' | 'wrong' | 'enemy-block' | 'lumina-encourage' | 'shield' = 'asking';
    if (isAnswered) {
      if (wasRight) {
        phase = 'correct';
      } else if (wrongBeat === 'enemy-block') {
        phase = 'enemy-block';
      } else if (wrongBeat === 'enemy-counter') {
        phase = shieldBlockedLast ? 'shield' : 'wrong';
      } else {
        phase = shieldBlockedLast ? 'shield' : 'lumina-encourage';
      }
    }
    return buildBattleCallout({
      enemy,
      question: currentQ,
      qIdx,
      squad,
      phase,
    });
  }, [itemCallout, isAnswered, enemy, currentQ, qIdx, squad, wasRight, wrongBeat, shieldBlockedLast]);

  const questionOriginLabel = prova
    ? `Prova real FCC · ${prova.label}`
    : currentQ.isRealExam
    ? `Prova real · ${currentQ.banca || 'FCC'}${currentQ.ano ? ` ${currentQ.ano}` : ''}${currentQ.orgao ? ` · ${currentQ.orgao}` : ''}`
    : currentQ.origem === 'autoral'
      ? 'Questão autoral'
      : enemy.isBoss || enemy.isMiniBoss || currentQ.isBossStyle
      ? 'Questão estilo FCC'
      : enemy.isNpcDuel
        ? 'Duelo Acadêmico'
        : TYPE_LABELS[currentQ.tipo];

  const totalItemsAvailable =
    saveState.inventory.pocao_dica +
    saveState.inventory.escudo_recurso +
    saveState.inventory.lupa_fonte +
    saveState.inventory.pocao_vida;

  // Use 2-column grid on desktop when options are short enough to read effortlessly side-by-side
  const maxAltLen = Math.max(...currentQ.alternativas.map((a) => a.length));
  const useTwoColAlts = maxAltLen <= 76 && currentQ.alternativas.length >= 4;

  const encounterBannerTitle = enemy.isBoss
    ? 'CHEFE DE REGIÃO!'
    : enemy.isMiniBoss
      ? 'GUARDIÃO DA ZONA!'
      : enemy.isNpcDuel
        ? 'DUELO ACADÊMICO!'
        : 'ENCONTRO DE BATALHA!';

  return (
    <div
      data-testid="ff-battle-screen"
      data-region={enemy.regiaoId}
      data-formation-count={formation.length}
      className={`fixed inset-0 z-40 flex flex-col bg-[#060913] overflow-hidden ${
        !disableShake && animEvent?.kind === 'enemy-hit' ? 'animate-battle-shake' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Batalha contra ${formationLabel}`}
    >
      {/* CLASSIC JRPG BATTLE TRANSITION (Flash + Horizontal Shutters + Encounter Banner) */}
      {introActive && (
        <div
          data-testid="battle-intro-transition"
          onClick={() => setIntroActive(false)}
          className="fixed inset-0 z-50 pointer-events-auto cursor-pointer overflow-hidden"
        >
          <div className="animate-battle-flash absolute inset-0 bg-[#fff7d6]" />
          <div className="animate-shutter-top absolute top-0 inset-x-0 h-1/2 bg-[#050712] border-b-2 border-[#e6b84c]" />
          <div className="animate-shutter-bottom absolute bottom-0 inset-x-0 h-1/2 bg-[#050712] border-t-2 border-[#e6b84c]" />
          <div className="animate-battle-banner absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div className="font-mono-num text-xs sm:text-sm tracking-[0.22em] text-[#fde047] font-bold">
              {encounterBannerTitle}
            </div>
            <div className="mt-1 font-display text-2xl sm:text-4xl font-bold text-[#f8f3e6] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
              {formationLabel}
            </div>
            <div className="mt-1 text-xs sm:text-sm text-[#cbd5e1]">{backdrop.arenaTitle}</div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOP HALF: FULL-SCREEN FINAL FANTASY SIDE-VIEW ARENA STAGE             */}
      {/* ===================================================================== */}
      <div
        data-testid="ff-battle-stage"
        className="relative flex-1 min-h-[250px] sm:min-h-[300px] overflow-hidden select-none"
        style={{ background: backdrop.fallbackGradient }}
      >
        {/* Regional Bespoke 16-bit SNES Battle Backdrop */}
        {!backdropFailed && (
          <img
            src={backdrop.imageUrl}
            alt={`Cenário de batalha: ${backdrop.arenaTitle}`}
            referrerPolicy="no-referrer"
            onError={() => setBackdropFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
        )}

        {/* Measured Atmospheric Vignette Scrim (top HUD readability + grounded stage floor depth) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,10,24,0.62) 0%, rgba(6,10,24,0.12) 22%, rgba(6,10,24,0.02) 66%, rgba(6,10,24,0.56) 100%)',
          }}
        />

        {/* TOP PERIMETER BATTLE BAR (clean unboxed text, zero pill clutter) */}
        <div className="relative z-30 flex items-center justify-between gap-3 px-4 py-2.5 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs sm:text-sm text-[#f4efe4] min-w-0">
            <span className="font-display font-bold text-[#fde68a] truncate">{regionInfo.nome}</span>
            <span aria-hidden="true" className="text-[#94a3b8]">·</span>
            <span className="font-semibold text-[#f8fafc] truncate">{formationLabel}</span>
            <span aria-hidden="true" className="hidden md:inline text-[#94a3b8]">·</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono-num text-[#cbd5e1]">
              <Music className="w-3.5 h-3.5 text-[#f5d76e]" />
              {trackMeta.title}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono-num text-xs sm:text-sm font-bold text-[#fef08a] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Rodada {qIdx + 1}/{totalQuestions}
            </span>
            <button
              type="button"
              onClick={handleFleeSafe}
              aria-label="Fugir da batalha"
              className="px-2.5 py-1 bg-[#0b1024]/85 hover:bg-[#1c2852] border border-[#cbd5e1]/60 text-xs font-semibold text-[#f1f5f9] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              Recuar
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* DYNAMIC CHARACTER SPEECH BUBBLE (in front of Hero/Lumina or Foe!) */}
        {/* ================================================================= */}
        <div
          key={`${activeSpeech.speaker}-${activeSpeech.tone}-${qIdx}-${isAnswered ? 'ans' : 'ask'}-${activeSpeech.text.slice(0, 12)}`}
          data-testid="battle-speech-bubble"
          data-speaker={activeSpeech.speaker}
          data-tone={activeSpeech.tone}
          className={`animate-bubble-pop absolute z-30 top-[14%] sm:top-[15%] max-w-[78%] sm:max-w-[44%] md:max-w-[38%] pointer-events-none ${
            activeSpeech.speaker === 'enemy'
              ? 'right-[5%] sm:right-[22%] md:right-[26%]'
              : activeSpeech.speaker === 'lumina'
                ? 'left-[4%] sm:left-[14%] md:left-[16%]'
                : 'left-[5%] sm:left-[22%] md:left-[24%]'
          }`}
        >
          <div
            className={`relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg border-2 shadow-[0_8px_24px_rgba(0,0,0,0.7)] ${
              activeSpeech.tone === 'ko' || activeSpeech.tone === 'victory'
                ? 'bg-[#fefce8] border-[#ca8a04] text-[#1c1917]'
                : activeSpeech.tone === 'hint' || activeSpeech.tone === 'encourage'
                  ? 'bg-[#ecfeff] border-[#0891b2] text-[#083344]'
                  : activeSpeech.tone === 'shield'
                    ? 'bg-[#eff6ff] border-[#2563eb] text-[#172554]'
                    : activeSpeech.tone === 'block'
                      ? 'bg-[#fff7ed] border-[#ea580c] text-[#431407]'
                      : activeSpeech.tone === 'warning'
                        ? 'bg-[#fef2f2] border-[#dc2626] text-[#450a0a]'
                        : 'bg-[#fdfbf5] border-[#475569] text-[#0f172a]'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide opacity-85 mb-0.5">
              {(activeSpeech.tone === 'ko' || activeSpeech.tone === 'victory') && (
                <Trophy className="w-3.5 h-3.5 text-[#ca8a04]" />
              )}
              {(activeSpeech.tone === 'hint' || activeSpeech.tone === 'encourage') && (
                <Sparkles className="w-3.5 h-3.5 text-[#0891b2]" />
              )}
              {activeSpeech.tone === 'shield' && <Shield className="w-3.5 h-3.5 text-[#2563eb]" />}
              {activeSpeech.tone === 'block' && <Shield className="w-3.5 h-3.5 text-[#ea580c]" />}
              <span>{activeSpeech.speakerName}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold leading-snug">{activeSpeech.text}</p>

            {/* Speech Bubble Pointer Tail toward the speaking character */}
            <div
              aria-hidden="true"
              className={`absolute -bottom-2.5 w-4 h-4 rotate-45 border-r-2 border-b-2 ${
                activeSpeech.speaker === 'enemy' ? 'right-7' : 'left-7'
              } ${
                activeSpeech.tone === 'ko' || activeSpeech.tone === 'victory'
                  ? 'bg-[#fefce8] border-[#ca8a04]'
                  : activeSpeech.tone === 'hint' || activeSpeech.tone === 'encourage'
                    ? 'bg-[#ecfeff] border-[#0891b2]'
                    : activeSpeech.tone === 'shield'
                      ? 'bg-[#eff6ff] border-[#2563eb]'
                      : activeSpeech.tone === 'block'
                        ? 'bg-[#fff7ed] border-[#ea580c]'
                        : activeSpeech.tone === 'warning'
                          ? 'bg-[#fef2f2] border-[#dc2626]'
                          : 'bg-[#fdfbf5] border-[#475569]'
              }`}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* LEFT SIDE: HERO + FLYING FAIRY COMPANION LUMINA                   */}
        {/* ================================================================= */}
        {/* Flying Fairy Lumina hovering right behind/above Hero's shoulder */}
        <div
          data-testid="battle-fairy-lumina"
          className="absolute z-20 left-[13%] sm:left-[15%] md:left-[16%] top-[56%] sm:top-[53%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="animate-fairy-hover relative flex flex-col items-center">
            <div
              className={`absolute inset-0 rounded-full blur-md transition-opacity ${
                animEvent?.kind === 'lumina-cast' || fairyExcited
                  ? 'bg-[#38bdf8]/55 opacity-100 scale-125'
                  : 'bg-[#fde047]/30 opacity-80'
              }`}
            />
            <img
              src={fairyBattleUrl}
              alt="Fadinha Lumina"
              className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]"
            />
            <span className="mt-0.5 text-[10px] font-bold text-[#e0f2fe] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Lumina
            </span>
          </div>
        </div>

        {/* Protagonist Hero standing firmly on left arena floor */}
        <div
          data-testid="battle-hero-unit"
          className="absolute z-20 left-[21%] sm:left-[22%] md:left-[22%] top-[74%] sm:top-[73%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Grounded shadow ellipse */}
            <div
              aria-hidden="true"
              className="absolute bottom-1 w-20 sm:w-28 h-4 sm:h-5 rounded-full bg-black/55 blur-[2px]"
            />

            {/* Active Shield Protective Barrier */}
            {shieldActive && (
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-full border-2 border-[#38bdf8] bg-[#38bdf8]/15 shadow-[0_0_20px_rgba(56,189,248,0.45)]"
              />
            )}

            <div
              className={`relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center ${
                animEvent?.kind === 'hero-hit'
                  ? 'animate-hero-lunge'
                  : animEvent?.kind === 'enemy-block'
                    ? 'animate-hero-attack-blocked'
                    : animEvent?.kind === 'enemy-hit'
                      ? 'animate-hit-flash'
                      : 'animate-idle-bob'
              }`}
            >
              <img
                src={heroBattleUrl}
                alt="Seu Herói"
                className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]"
              />
            </div>

            {/* Hero Floating Damage / Shield / Heal Feedback */}
            {animEvent &&
              (animEvent.kind === 'enemy-hit' ||
                animEvent.kind === 'shield-block' ||
                animEvent.kind === 'hero-heal' ||
                animEvent.kind === 'lumina-cast') && (
                <div
                  key={animEvent.id}
                  className={`animate-damage-float absolute -top-5 left-1/2 -translate-x-1/2 font-mono-num text-sm sm:text-base font-extrabold px-2.5 py-0.5 bg-black/90 border whitespace-nowrap ${
                    animEvent.kind === 'shield-block'
                      ? 'text-[#38bdf8] border-[#38bdf8]'
                      : animEvent.kind === 'hero-heal'
                        ? 'text-[#4ade80] border-[#4ade80]'
                        : animEvent.kind === 'lumina-cast'
                          ? 'text-[#fde047] border-[#facc15]'
                          : 'text-[#fca5a5] border-[#ef4444]'
                  }`}
                >
                  {animEvent.label}
                </div>
              )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT SIDE: ENEMY SQUAD (3 Mobs / 2 Knights / 1 Boss / 1 NPC)     */}
        {/* ================================================================= */}
        {squad.units.map((uState, idx) => {
          const { unit } = uState;
          const isBeingHit = animEvent?.kind === 'hero-hit' && animEvent.targetUnitIdx === idx;
          const isBlocking = animEvent?.kind === 'enemy-block' && animEvent.targetUnitIdx === idx;
          const isLunging =
            (animEvent?.kind === 'enemy-hit' || animEvent?.kind === 'shield-block') &&
            animEvent.targetUnitIdx === idx;
          const isPlayingKo = isBeingHit && Boolean(animEvent?.wasKo);

          // Once defeated AND KO transition finishes, hide cleanly from stage
          if (uState.defeated && !isPlayingKo) {
            return null;
          }

          const sizeClass =
            unit.scale === 'boss'
              ? 'w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52'
              : unit.scale === 'npc'
                ? 'w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36'
                : unit.scale === 'elite'
                  ? 'w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36'
                  : 'w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32';

          const shadowClass =
            unit.scale === 'boss'
              ? 'w-28 sm:w-40 h-5 sm:h-6'
              : unit.scale === 'elite' || unit.scale === 'npc'
                ? 'w-20 sm:w-28 h-4 sm:h-5'
                : 'w-16 sm:w-24 h-3.5 sm:h-4';

          const animClass = isPlayingKo
            ? 'animate-enemy-ko'
            : isBeingHit
              ? 'animate-monster-hit'
              : isBlocking
                ? 'animate-enemy-guard'
                : isLunging
                  ? 'animate-enemy-lunge'
                  : uState.damageStage === 3
                    ? 'animate-critical-wobble'
                    : 'animate-idle-bob';

          return (
            <div
              key={unit.id}
              data-testid={idx === 0 || uState.isTargeted ? 'enemy-battle-sprite' : `enemy-squad-unit-${idx}`}
              data-squad-unit="true"
              data-damage-stage={uState.damageStage}
              style={{
                left: `${unit.posXPercent}%`,
                top: `${unit.posYPercent}%`,
                zIndex: unit.zIndex,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative flex flex-col items-center">
                {/* Active Target Golden Chevron Indicator (Classic Final Fantasy!) */}
                {uState.isTargeted && !isAnswered && formation.length > 1 && (
                  <div
                    aria-hidden="true"
                    className="animate-target-bob -mb-1 text-[#fde047] font-extrabold text-sm sm:text-base drop-shadow-[0_2px_2px_rgba(0,0,0,1)] [text-shadow:0_0_6px_rgba(0,0,0,0.95)]"
                  >
                    ▼
                  </div>
                )}

                {/* Grounded Elliptical Shadow */}
                <div
                  aria-hidden="true"
                  className={`absolute bottom-4 rounded-full bg-black/55 blur-[2px] ${shadowClass}`}
                />

                {/* Animated Enemy Sprite (mirrored horizontally so monsters face LEFT toward the Hero!) */}
                <div
                  className={`relative flex items-center justify-center ${sizeClass} ${animClass}`}
                  style={
                    animClass === 'animate-idle-bob'
                      ? { animationDelay: `${unit.slotIndex * 230}ms` }
                      : undefined
                  }
                >
                  <img
                    src={opponentSpritesByStage[uState.damageStage]}
                    alt={unit.label}
                    className={`w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.78)] ${
                      enemy.isNpcDuel ? '' : '-scale-x-100'
                    }`}
                  />
                </div>

                {/* Compact Per-Unit HP Pips beneath the unit */}
                {!isPlayingKo && (
                  <div className="mt-0.5 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded-sm border border-white/15">
                    {Array.from({ length: uState.maxHp }).map((_, pipIdx) => (
                      <span
                        key={pipIdx}
                        className={`block h-1.5 rounded-[1px] ${
                          uState.maxHp > 5 ? 'w-2' : 'w-3'
                        } ${pipIdx < uState.hp ? 'bg-[#ef4444]' : 'bg-[#334155]'}`}
                      />
                    ))}
                  </div>
                )}

                {/* Enemy Guard Shield Burst & "BLOQUEADO!" Callout on Wrong Answer Beat 1 */}
                {isBlocking && animEvent && (
                  <>
                    <svg
                      key={`block-${animEvent.id}`}
                      data-testid="enemy-block-shield"
                      viewBox="0 0 88 88"
                      className="animate-block-shield absolute -left-5 inset-y-0 w-[92%] h-[92%] my-auto pointer-events-none drop-shadow-[0_0_12px_rgba(251,146,60,0.85)]"
                    >
                      <path
                        d="M44 8 L74 20 V44 C74 63 59 75 44 82 C29 75 14 63 14 44 V20 Z"
                        fill="rgba(251, 146, 60, 0.28)"
                        stroke="#fde047"
                        strokeWidth="4.5"
                      />
                      <path
                        d="M44 16 L66 25 V44 C66 58 55 68 44 74 C33 68 22 58 22 44 V25 Z"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <path d="M26 30 L62 56 M62 30 L26 56" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                    <div
                      key={`blk-lbl-${animEvent.id}`}
                      className="animate-damage-float absolute -top-6 left-1/2 -translate-x-1/2 font-mono-num text-sm sm:text-base font-extrabold px-2.5 py-0.5 bg-[#431407]/95 text-[#fed7aa] border border-[#fb923c] whitespace-nowrap"
                    >
                      {animEvent.label}
                    </div>
                  </>
                )}

                {/* Sword Slash & Floating Damage Popup directly over struck enemy */}
                {isBeingHit && animEvent && (
                  <>
                    <svg
                      key={`slash-${animEvent.id}`}
                      viewBox="0 0 80 80"
                      className="animate-slash-burst absolute inset-0 w-full h-full pointer-events-none"
                    >
                      <path
                        d="M12 68 L68 12"
                        stroke="#fef08a"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 64 L64 16"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="40" cy="40" r="15" fill="none" stroke="#f59e0b" strokeWidth="3" />
                    </svg>
                    <div
                      key={`dmg-${animEvent.id}`}
                      className="animate-damage-float absolute -top-5 left-1/2 -translate-x-1/2 font-mono-num text-sm sm:text-base font-extrabold px-2.5 py-0.5 bg-[#450a0a]/95 text-[#fde047] border border-[#f59e0b] whitespace-nowrap"
                    >
                      {animEvent.label}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* BOTTOM HALF: CLASSIC FINAL FANTASY SNES COMMAND & QUESTION MENU       */}
      {/* ===================================================================== */}
      <div
        data-testid="ff-battle-menu"
        className="shrink-0 bg-[#070b1a] border-t-2 border-[#e7dec8]/85 p-2 sm:p-3 max-h-[52vh] sm:max-h-[48vh] flex flex-col"
      >
        <div className="max-w-[1380px] w-full mx-auto flex flex-col md:flex-row gap-2 sm:gap-3 min-h-0 flex-1">
          {/* LEFT FF WINDOW: PARTY STATUS + COMMAND SELECTOR */}
          <div className="ff-window md:w-64 lg:w-72 shrink-0 p-2.5 sm:p-3 flex flex-col justify-between gap-2">
            {/* Hero & Opponent Status Readout */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-display font-bold text-[#fef3c7] truncate">
                  Herói · Nv.{saveState.level}
                </span>
                {shieldActive && (
                  <span className="font-mono-num text-[11px] font-bold text-[#38bdf8]">
                    Escudo Ativo
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 font-mono-num text-[11px]">
                {/* Hero HP */}
                <div>
                  <div className="flex justify-between text-[#fecaca]">
                    <span>HP</span>
                    <span>
                      {Math.round(saveState.hp)}/{saveState.maxHp}
                    </span>
                  </div>
                  <div className="h-2 bg-[#1c1024] border border-[#f87171]/60 mt-0.5">
                    <div
                      className="h-full bg-[#ef4444] transition-transform duration-200 origin-left"
                      style={{ transform: `scaleX(${Math.max(0, saveState.hp / saveState.maxHp)})` }}
                    />
                  </div>
                </div>

                {/* Hero Foco */}
                <div>
                  <div className="flex justify-between text-[#bae6fd]">
                    <span>Foco</span>
                    <span>
                      {Math.round(saveState.focus)}/{saveState.maxFocus}
                    </span>
                  </div>
                  <div className="h-2 bg-[#0e1b33] border border-[#38bdf8]/60 mt-0.5">
                    <div
                      className="h-full bg-[#38bdf8] transition-transform duration-200 origin-left"
                      style={{ transform: `scaleX(${Math.max(0, saveState.focus / saveState.maxFocus)})` }}
                    />
                  </div>
                </div>
              </div>

              {/* Squad / Boss Integrity Summary */}
              <div className="pt-1.5 border-t border-white/15 flex items-center justify-between gap-2 text-[11px] font-mono-num">
                <span className="text-[#e2e8f0] truncate">
                  {formation.length > 1
                    ? `Oponentes: ${squad.livingCount}/${formation.length}`
                    : enemy.nome}
                </span>
                <span
                  data-testid="enemy-damage-stage"
                  style={{ color: DAMAGE_STAGE_LABELS[overallDamageStage].color }}
                  className="shrink-0 font-bold"
                >
                  {DAMAGE_STAGE_LABELS[overallDamageStage].label}
                </span>
              </div>
            </div>

            {/* Classic Final Fantasy Command Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-1.5 pt-1.5 border-t border-white/15">
              <button
                type="button"
                onClick={() => setMenuTab('fight')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  menuTab === 'fight'
                    ? 'bg-[#2a3f8f] text-[#fef08a] border border-[#fde047]/80'
                    : 'bg-black/25 text-[#e2e8f0] hover:bg-[#1e3070] border border-transparent'
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 text-[#fde047] ${
                    menuTab === 'fight' ? 'animate-ff-cursor opacity-100' : 'opacity-30'
                  }`}
                />
                <Swords className="w-3.5 h-3.5 shrink-0" />
                <span>Responder</span>
              </button>

              <button
                type="button"
                disabled={isAnswered}
                onClick={() => setMenuTab((t) => (t === 'items' ? 'fight' : 'items'))}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs sm:text-sm font-bold flex items-center justify-between gap-1.5 transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap ${
                  menuTab === 'items'
                    ? 'bg-[#2a3f8f] text-[#fef08a] border border-[#fde047]/80'
                    : 'bg-black/25 text-[#e2e8f0] hover:bg-[#1e3070] border border-transparent'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 text-[#fde047] ${
                      menuTab === 'items' ? 'animate-ff-cursor opacity-100' : 'opacity-30'
                    }`}
                  />
                  <Backpack className="w-3.5 h-3.5 shrink-0" />
                  <span>Itens</span>
                </span>
                <span className="font-mono-num text-[11px] text-[#bae6fd]">{totalItemsAvailable}</span>
              </button>

              <button
                type="button"
                onClick={handleFleeSafe}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs sm:text-sm font-semibold text-[#cbd5e1] bg-black/20 hover:bg-[#3a1d28] hover:text-[#fecaca] border border-transparent flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0 ml-1" />
                <span>Recuar</span>
              </button>
            </div>
          </div>

          {/* RIGHT FF WINDOW: QUESTION + ALTERNATIVES OR ITEMS SUB-DECK */}
          <div className="ff-window flex-1 min-w-0 p-3 sm:p-4 overflow-y-auto flex flex-col gap-2.5">
            {menuTab === 'items' && !isAnswered ? (
              <div data-testid="ff-items-panel" className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/15">
                  <div className="font-display text-sm sm:text-base font-bold text-[#fef08a]">
                    Bolsa de Batalha & Habilidades de Foco
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuTab('fight')}
                    className="px-3 py-1 bg-[#24377d] hover:bg-[#3148a3] border border-[#e7dec8]/70 text-xs font-bold text-[#f8fafc] rounded cursor-pointer whitespace-nowrap"
                  >
                    Voltar à Questão
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={saveState.inventory.pocao_dica <= 0 || currentQ.alternativas.length <= 2}
                    onClick={handleUseHintPotion}
                    className="text-left p-2.5 rounded bg-[#0c1638] hover:bg-[#192b66] disabled:opacity-40 border border-[#38bdf8]/55 flex items-start gap-2.5 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#e0f2fe]">
                        <span>Poção de Dica</span>
                        <span className="font-mono-num text-[#7dd3fc]">×{saveState.inventory.pocao_dica}</span>
                      </div>
                      <p className="text-xs text-[#cbd5e1] mt-0.5">{ITEM_DEFS.pocao_dica.descricao}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={saveState.inventory.escudo_recurso <= 0 || shieldActive}
                    onClick={handleUseShield}
                    className="text-left p-2.5 rounded bg-[#0c1638] hover:bg-[#192b66] disabled:opacity-40 border border-[#f59e0b]/55 flex items-start gap-2.5 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Shield className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#fef3c7]">
                        <span>Escudo do Recurso</span>
                        <span className="font-mono-num text-[#fde047]">×{saveState.inventory.escudo_recurso}</span>
                      </div>
                      <p className="text-xs text-[#cbd5e1] mt-0.5">{ITEM_DEFS.escudo_recurso.descricao}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={saveState.inventory.lupa_fonte <= 0 || lupaRevealed}
                    onClick={handleUseLupa}
                    className="text-left p-2.5 rounded bg-[#0c1638] hover:bg-[#192b66] disabled:opacity-40 border border-[#a78bfa]/55 flex items-start gap-2.5 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Search className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#ede9fe]">
                        <span>Lupa da Fonte</span>
                        <span className="font-mono-num text-[#c4b5fd]">×{saveState.inventory.lupa_fonte}</span>
                      </div>
                      <p className="text-xs text-[#cbd5e1] mt-0.5">{ITEM_DEFS.lupa_fonte.descricao}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={saveState.inventory.pocao_vida <= 0 || saveState.hp >= saveState.maxHp}
                    onClick={handleUseHeal}
                    className="text-left p-2.5 rounded bg-[#0c1638] hover:bg-[#192b66] disabled:opacity-40 border border-[#ef4444]/55 flex items-start gap-2.5 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Heart className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#fee2e2]">
                        <span>Poção de Vida (+40 HP)</span>
                        <span className="font-mono-num text-[#fca5a5]">×{saveState.inventory.pocao_vida}</span>
                      </div>
                      <p className="text-xs text-[#cbd5e1] mt-0.5">{ITEM_DEFS.pocao_vida.descricao}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={saveState.focus < 20 || currentQ.alternativas.length <= 2}
                    onClick={handleUseFocusSkill}
                    className="sm:col-span-2 text-left p-2.5 rounded bg-[#0c1d33] hover:bg-[#143354] disabled:opacity-40 border border-[#34d399]/55 flex items-start gap-2.5 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Zap className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#d1fae5]">
                        <span>Foco Analítico</span>
                        <span className="font-mono-num text-[#6ee7b7]">Custo: 20 Foco</span>
                      </div>
                      <p className="text-xs text-[#cbd5e1] mt-0.5">
                        Usa 20 pontos de Foco para eliminar 1 alternativa incorreta nesta rodada.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Quiet 1-line Question Metadata (Zero Pills, deduplicated!) */}
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-xs text-[#cbd5e1]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-[#fde047]">{questionOriginLabel}</span>
                    {questionOriginLabel !== TYPE_LABELS[currentQ.tipo] && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{TYPE_LABELS[currentQ.tipo]}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-num">Dificuldade {currentQ.dificuldade}/3</span>
                  </div>
                  <span className="font-mono-num text-[#94a3b8]">Ficha [[{currentQ.fichaId}]]</span>
                </div>

                {outroTribunal !== null && (
                  <div className="px-3 py-1.5 rounded border border-[#f59e0b]/70 bg-[#3a2508]/80 text-xs text-[#fde68a]">
                    <strong>Atenção:</strong> esta questão cobra a regra do TRT-{outroTribunal}, não a do TRT-4. Serve de
                    treino; a regra que vale para a sua prova está na ficha.
                  </div>
                )}

                {/* Question Enunciado (questões reais trazem <u>, <mark> e quebras de linha do original) */}
                <div
                  onClick={isAnswered ? () => setEnunciadoAberto((v) => !v) : undefined}
                  title={isAnswered ? (enunciadoAberto ? 'Clique para encolher' : 'Clique para ver o enunciado inteiro') : undefined}
                  className={`text-sm sm:text-[15px] leading-snug sm:leading-relaxed text-[#f8fafc] font-medium bg-[#080d24]/75 border border-[#4c62a8]/60 rounded px-3.5 whitespace-pre-line break-words ${
                    isAnswered ? `py-2 cursor-pointer ${enunciadoAberto ? '' : 'line-clamp-2'}` : 'py-2.5 lg:text-base'
                  }`}
                >
                  <RichText text={currentQ.enunciado} />
                </div>

                {/* Optional Lupa da Fonte excerpt */}
                {lupaRevealed && !isAnswered && (
                  <div className="px-3.5 py-2 bg-[#1c1640] border border-[#a78bfa] rounded text-xs sm:text-sm text-[#ede9fe]">
                    <span className="font-bold text-[#c4b5fd]">
                      {prova ? `Lupa · ficha ligada a esta questão (${currentQ.fichaTitulo}): ` : `Lupa da Fonte (${currentQ.fichaTitulo}): `}
                    </span>
                    <span>&ldquo;{renderTrecho(currentQ.trechoFonte)}&rdquo;</span>
                  </div>
                )}

                {/* Final Fantasy Command Alternatives (full grid while answering; compact recap when answered so Por quê? & CTA never clip!) */}
                {!isAnswered ? (
                  <div className={`grid gap-2 ${useTwoColAlts ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {currentQ.alternativas.map((alt, idx) => {
                      const isEliminated = eliminated.includes(idx);
                      const isHover = hoveredOpt === idx && !isEliminated;

                      const btnStyle = isEliminated
                        ? 'bg-[#090e24]/60 border-[#242e52] text-[#64748b] line-through opacity-50 cursor-not-allowed'
                        : 'bg-[#0e183d]/90 border-[#4b63ad]/75 text-[#f8fafc] hover:border-[#fde047] hover:bg-[#1c2e6b] cursor-pointer';

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isEliminated}
                          onClick={() => handleSelectOption(idx)}
                          onMouseEnter={() => setHoveredOpt(idx)}
                          onMouseLeave={() => setHoveredOpt((h) => (h === idx ? null : h))}
                          className={`w-full text-left px-3 py-2 sm:py-2.5 rounded border-2 transition-colors flex items-start gap-2.5 text-sm sm:text-[15px] leading-snug ${btnStyle}`}
                        >
                          <span className="flex items-center gap-1 shrink-0 mt-0.5">
                            <ChevronRight
                              className={`w-3.5 h-3.5 text-[#fde047] transition-opacity ${
                                isHover ? 'opacity-100 animate-ff-cursor' : 'opacity-0'
                              }`}
                            />
                            <span className="font-mono-num font-bold text-xs px-1.5 py-0.5 bg-[#070c1f] border border-[#647cc4] text-[#fde047]">
                              {LETTERS[idx]}
                            </span>
                          </span>
                          <span className="flex-1 whitespace-pre-line break-words">
                            <RichText text={alt} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <div
                      className={`flex-1 min-w-[200px] px-3 py-1.5 rounded border flex items-center gap-2 ${
                        wasRight
                          ? 'bg-[#0f3324] border-[#22c55e] text-[#dcfce7]'
                          : 'bg-[#3d141c] border-[#ef4444] text-[#fee2e2]'
                      }`}
                    >
                      <span className="font-mono-num font-bold text-xs px-1.5 py-0.5 bg-black/45 text-[#fde047]">
                        {LETTERS[selectedIdx ?? 0]}
                      </span>
                      <span className="truncate">
                        <strong>Sua resposta:</strong> {stripRichText(currentQ.alternativas[selectedIdx ?? 0])}
                      </span>
                    </div>
                    {!wasRight && (
                      <div className="flex-1 min-w-[200px] px-3 py-1.5 rounded border bg-[#0f3324] border-[#22c55e] text-[#dcfce7] flex items-center gap-2">
                        <span className="font-mono-num font-bold text-xs px-1.5 py-0.5 bg-black/45 text-[#4ade80]">
                          {LETTERS[currentQ.correta]}
                        </span>
                        <span className="truncate">
                          <strong>Correta:</strong> {stripRichText(currentQ.alternativas[currentQ.correta])}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Grounded "Por quê?" Answer Explanation & Next Turn CTA */}
                {isAnswered && (
                  <div
                    data-testid="porque-panel"
                    className={`p-3 rounded border-2 space-y-2 ${
                      wasRight ? 'bg-[#0c291d] border-[#22c55e]' : 'bg-[#2e1219] border-[#ef4444]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-display text-sm sm:text-base font-bold flex items-center gap-2 text-[#f8fafc]">
                        <ScrollText className="w-4 h-4 text-[#fde047]" />
                        <span>
                          {prova
                            ? wasRight
                              ? 'Resposta correta!'
                              : shieldBlockedLast
                                ? 'Dano anulado pelo Escudo!'
                                : 'Resposta incorreta.'
                            : wasRight
                              ? 'Resposta correta! Por quê?'
                              : shieldBlockedLast
                                ? 'Dano anulado pelo Escudo! Por quê?'
                                : hasExplanations
                                  ? 'Resposta incorreta — veja por quê:'
                                  : 'Resposta incorreta — confira a fonte:'}
                        </span>
                      </div>
                      <span className="font-mono-num text-xs text-[#fde68a]">
                        {currentQ.fichaTitulo} ([[{currentQ.fichaId}]])
                      </span>
                    </div>

                    {prova && (
                      <div data-testid="gabarito-oficial" className="space-y-1 text-xs sm:text-sm leading-relaxed text-[#f1ece1]">
                        <p>
                          <strong className="text-[#4ade80]">Gabarito oficial da FCC: {LETTERS[currentQ.correta]}</strong>
                          <span className="text-[#cbd5e1]">
                            {' '}
                            · {prova.label} · questão {prova.numero}
                          </span>
                        </p>
                        {outroTribunal !== null && (
                          <p className="text-[#fde68a]">
                            Lembrete: a regra cobrada aqui é a do TRT-{outroTribunal}. Confira a do TRT-4 na ficha.
                          </p>
                        )}
                      </div>
                    )}

                    {hasExplanations && selectedIdx !== null && (
                      <div data-testid="explicacoes" className="space-y-1 text-xs sm:text-sm leading-relaxed">
                        {!wasRight && (
                          <p className="text-[#fecaca]">
                            <strong className="text-[#fca5a5]">Sua resposta ({LETTERS[selectedIdx]}):</strong>{' '}
                            {currentQ.explicacoes![selectedIdx]}
                          </p>
                        )}
                        <p className="text-[#d1fae5]">
                          <strong className="text-[#4ade80]">
                            {wasRight ? 'Isso mesmo' : `Correta (${LETTERS[currentQ.correta]})`}:
                          </strong>{' '}
                          {currentQ.explicacoes![currentQ.correta]}
                        </p>
                      </div>
                    )}

                    <blockquote className="px-3 py-2 bg-black/45 border border-white/15 rounded text-xs sm:text-sm leading-relaxed text-[#f1ece1]">
                      {prova ? (
                        <span className="font-bold text-[#fde68a]">Para revisar, a ficha ligada a esta questão: </span>
                      ) : (
                        hasExplanations && <span className="font-bold text-[#fde68a]">Na ficha: </span>
                      )}
                      &ldquo;{renderTrecho(currentQ.trechoFonte)}&rdquo;
                    </blockquote>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {!wasRight ? (
                        <span className="text-xs text-[#e9d5ff]">
                          Revisão espaçada ativada: esta questão voltará até você acertar 2× seguidas.
                        </span>
                      ) : (
                        <span className="text-xs text-[#bbf7d0]">
                          {squad.livingCount === 0
                            ? 'Todos os oponentes foram vencidos!'
                            : formation.length > 1
                              ? `Restam ${squad.livingCount} de ${formation.length} oponentes no campo.`
                              : `Progresso da batalha: ${correctCount}/${totalQuestions} acertos.`}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-5 py-2 bg-[#e6b84c] hover:bg-[#f2ca63] text-[#14110b] font-bold text-sm rounded cursor-pointer whitespace-nowrap shadow-md"
                      >
                        {qIdx + 1 >= totalQuestions || saveState.hp <= 0
                          ? 'Finalizar Batalha [Enter]'
                          : 'Próxima Rodada [Enter]'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
