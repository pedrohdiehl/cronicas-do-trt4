import { useCallback, useEffect, useRef, useState } from 'react';
import { REGIONS, REGION_BY_ID } from './data/content';
import { SOUNDTRACK_CATALOG, soundEngine, type MusicTrackId } from './systems/audio';
import {
  buildBuildingChallengeDeck,
  evaluateBuildingSecret,
  getAvailableStudyPoints,
  getBuildingInteriorSpec,
  type BuildingInteriorSpec,
} from './systems/buildings';
import { getDatabaseRevision, getFichaById, subscribeDatabaseChanges } from './systems/customDatabase';
import {
  applyXpGain,
  buildBattleDeck,
  getNewlyCompletedPontes,
  ITEM_DEFS,
  recordQuestionOutcome,
} from './systems/gameLogic';
import {
  clearSaveState,
  createInitialSaveState,
  loadSaveState,
  persistSaveState,
} from './systems/save';
import type { Ficha, ItemId, PlayerClass, Question, RegionInfo, SaveState, ZonaInfo } from './types';
import { BattleModal } from './ui/BattleModal';
import { BuildingInteriorModal } from './ui/BuildingInteriorModal';
import { DatabaseManagerModal } from './ui/DatabaseManagerModal';
import { DialogueModal } from './ui/DialogueModal';
import { FairyCompanionModal } from './ui/FairyCompanionModal';
import { GrimorioModal } from './ui/GrimorioModal';
import { HudOverlay } from './ui/HudOverlay';
import { InventoryModal } from './ui/InventoryModal';
import { PauseSettingsModal } from './ui/PauseSettingsModal';
import { TitleScreen } from './ui/TitleScreen';
import { hasSeenTutorial, TutorialModal } from './ui/TutorialModal';
import { WorldMapModal } from './ui/WorldMapModal';
import { GameCanvas, type GameCanvasApi } from './world/GameCanvas';
import {
  buildWorldData,
  getRegionAt,
  getRegionFountainRespawn,
  getZonaAt,
  isSolidTile,
  TileType,
  type WorldBuilding,
  type WorldChest,
  type WorldCritter,
  type WorldEnemy,
  type WorldSign,
} from './world/worldMap';

type GamePhase = 'title' | 'playing' | 'paused' | 'gameover';
type ActiveOverlay =
  | 'none'
  | 'dialogue'
  | 'battle'
  | 'grimorio'
  | 'inventory'
  | 'map'
  | 'sign'
  | 'victory_modal'
  | 'database'
  | 'tutorial'
  | 'fairy'
  | 'building';

export default function App() {
  const existingSave = loadSaveState();
  const autostart =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('autostart') === '1';

  const [phase, setPhase] = useState<GamePhase>(autostart ? 'playing' : 'title');
  const [selectedClass, setSelectedClass] = useState<PlayerClass>(existingSave?.playerClass || 'dupla');
  const [saveState, setSaveState] = useState<SaveState>(() => existingSave || createInitialSaveState('dupla'));
  const [hasExistingSave, setHasExistingSave] = useState<boolean>(Boolean(existingSave));

  const [overlay, setOverlay] = useState<ActiveOverlay>('none');
  const [activeFicha, setActiveFicha] = useState<Ficha | null>(null);
  const [activeBattle, setActiveBattle] = useState<{
    enemy: WorldEnemy;
    deck: Question[];
    buildingRewardItem?: ItemId;
  } | null>(null);
  const [activeSign, setActiveSign] = useState<WorldSign | null>(null);
  const [activeBuildingSpec, setActiveBuildingSpec] = useState<BuildingInteriorSpec | null>(null);
  const [victorySummary, setVictorySummary] = useState<{
    title: string;
    subtitle: string;
    xpEarned: number;
    rewardText: string;
    defeat?: boolean;
    respawnPos?: { x: number; y: number };
    respawnRegion?: RegionInfo;
  } | null>(null);

  const [currentRegion, setCurrentRegion] = useState<RegionInfo>(() =>
    getRegionAt(saveState.heroX, saveState.heroY)
  );
  const [currentZona, setCurrentZona] = useState<ZonaInfo | null>(() =>
    getZonaAt(saveState.heroX, saveState.heroY)
  );
  const [nearPrompt, setNearPrompt] = useState<string | null>(null);
  const [trackedFichaId, setTrackedFichaId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dbVersion, setDbVersion] = useState<number>(() => getDatabaseRevision());

  // Subscribe to custom database edits (new disciplinas, temas, perguntas)
  useEffect(() => {
    return subscribeDatabaseChanges(() => {
      setDbVersion(getDatabaseRevision());
    });
  }, []);

  const canvasApiRef = useRef<GameCanvasApi | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 3600);
  }, []);

  // Mirror state machine to document.body.dataset.state & highContrast class
  useEffect(() => {
    document.body.dataset.state = phase;
  }, [phase]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', saveState.settings.highContrast);
  }, [saveState.settings.highContrast]);

  // Configure sound engine & auto-save on state change
  useEffect(() => {
    soundEngine.configure(saveState.settings.volume, saveState.settings.muted);
    if (phase !== 'title') {
      persistSaveState(saveState);
      setHasExistingSave(true);
    }
  }, [saveState, phase]);

  // Compute active soundtrack for current state (6 regions + 4 combat/duel/boss tracks)
  const activeTrackId: MusicTrackId =
    overlay === 'battle' && activeBattle
      ? activeBattle.enemy.isBoss
        ? 'boss'
        : activeBattle.enemy.isMiniBoss
          ? 'miniboss'
          : activeBattle.enemy.isNpcDuel
            ? 'npc-duel'
            : 'battle'
      : currentRegion.id;
  const activeTrackTitle = SOUNDTRACK_CATALOG.find((t) => t.id === activeTrackId)?.title || currentRegion.nome;

  // Adaptive title, region, battle, NPC duel, mini-boss & boss music
  useEffect(() => {
    if (phase === 'paused' || phase === 'gameover' || saveState.settings.muted) {
      soundEngine.stopMusic();
      return;
    }
    if (phase === 'title') {
      soundEngine.startMusic('title');
      return;
    }
    soundEngine.startMusic(activeTrackId);
  }, [phase, activeTrackId, saveState.settings.muted]);

  // Global keyboard shortcuts during play: I, G, M, Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phase === 'title') return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const k = e.key.toLowerCase();
      if (k === 'escape') {
        e.preventDefault();
        if (phase === 'paused') {
          setPhase('playing');
        } else if (overlay !== 'none' && overlay !== 'battle') {
          setOverlay('none');
          setActiveFicha(null);
          setActiveSign(null);
          setActiveBuildingSpec(null);
        } else if (overlay === 'none' && phase === 'playing') {
          setPhase('paused');
        }
        return;
      }

      if (phase !== 'playing') return;
      if (overlay === 'battle' || overlay === 'dialogue') return;

      if (k === 'g') {
        e.preventDefault();
        setOverlay((o) => (o === 'grimorio' ? 'none' : 'grimorio'));
      } else if (k === 'i') {
        e.preventDefault();
        setOverlay((o) => (o === 'inventory' ? 'none' : 'inventory'));
      } else if (k === 'm') {
        e.preventDefault();
        setOverlay((o) => (o === 'map' ? 'none' : 'map'));
      } else if (k === 'b') {
        e.preventDefault();
        setOverlay((o) => (o === 'database' ? 'none' : 'database'));
      } else if (k === 'f') {
        e.preventDefault();
        setOverlay((o) => (o === 'fairy' ? 'none' : 'fairy'));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, overlay]);

  const handleStartNew = useCallback((cls: PlayerClass) => {
    const fresh = createInitialSaveState(cls);
    setSelectedClass(cls);
    setSaveState(fresh);
    persistSaveState(fresh);
    setHasExistingSave(true);
    const shouldShowTutorial = !hasSeenTutorial();
    setOverlay(shouldShowTutorial ? 'tutorial' : 'none');
    setPhase('playing');
    document.body.dataset.state = 'playing';
    (document.activeElement as HTMLElement | null)?.blur?.();
    soundEngine.playDialogOpen();
    soundEngine.startMusic('reino-da-toga');
    canvasApiRef.current?.teleportTo(fresh.heroX, fresh.heroY);
    if (!shouldShowTutorial) {
      showToast('Bem-vindo ao Reino da Toga! Aperte [F] para falar com a fadinha Lumina.');
    }
  }, [showToast]);

  const handleContinue = useCallback(() => {
    setOverlay('none');
    setPhase('playing');
    document.body.dataset.state = 'playing';
    (document.activeElement as HTMLElement | null)?.blur?.();
    soundEngine.playDialogOpen();
    soundEngine.startMusic(currentRegion.id);
    canvasApiRef.current?.teleportTo(saveState.heroX, saveState.heroY);
  }, [currentRegion.id, saveState.heroX, saveState.heroY]);

  const handleHeroPosUpdate = useCallback(
    (x: number, y: number, dir: SaveState['heroDir'], newChunks: string[]) => {
      setSaveState((prev) => ({
        ...prev,
        heroX: Number(x.toFixed(2)),
        heroY: Number(y.toFixed(2)),
        heroDir: dir,
        exploredChunks:
          newChunks.length > 0 ? Array.from(new Set([...prev.exploredChunks, ...newChunks])) : prev.exploredChunks,
      }));
    },
    []
  );

  const handleLocationChange = useCallback((region: RegionInfo, zona: ZonaInfo | null) => {
    setCurrentRegion(region);
    setCurrentZona(zona);
  }, []);

  const handleInteractNpc = useCallback((ficha: Ficha) => {
    setActiveFicha(ficha);
    setOverlay('dialogue');
  }, []);

  const handleCompleteNpcDialogue = useCallback(
    (ficha: Ficha) => {
      setOverlay('none');
      setActiveFicha(null);
      if (trackedFichaId === ficha.id) setTrackedFichaId(null);

      setSaveState((prev) => {
        const alreadyStudied = prev.studiedFichas.includes(ficha.id);
        const studiedFichas = alreadyStudied ? prev.studiedFichas : [...prev.studiedFichas, ficha.id];
        const collectedScrolls = prev.collectedScrolls.includes(ficha.id)
          ? prev.collectedScrolls
          : [...prev.collectedScrolls, ficha.id];

        const xpBonus = alreadyStudied ? 10 : 35;
        const lv = applyXpGain(prev, xpBonus);

        let nextState: SaveState = {
          ...prev,
          ...lv,
          studiedFichas,
          collectedScrolls,
          stats: {
            ...prev.stats,
            npcsTalked: prev.stats.npcsTalked + 1,
          },
        };

        // Check if any Ponte special quest just completed!
        const newPontes = getNewlyCompletedPontes(nextState);
        if (newPontes.length > 0) {
          let totalPonteXp = 0;
          const inv = { ...nextState.inventory };
          const doneIds = [...nextState.completedPontes];
          for (const p of newPontes) {
            doneIds.push(p.id);
            totalPonteXp += p.recompensaXp;
            inv[p.recompensaItem] = (inv[p.recompensaItem] || 0) + 1;
          }
          const lv2 = applyXpGain(nextState, totalPonteXp);
          nextState = {
            ...nextState,
            ...lv2,
            inventory: inv,
            completedPontes: doneIds,
          };
          soundEngine.playLevelUp();
          canvasApiRef.current?.triggerBurst('#5ef2b6', 32, 0.25);
          showToast(`Ponte concluída: ${newPontes[0].nome}! +${totalPonteXp} XP e item bônus!`);
        } else if (lv.leveledUp) {
          soundEngine.playLevelUp();
          canvasApiRef.current?.triggerBurst('#fde047', 28, 0.2);
          showToast(`Subiu para o Nível ${lv.level}! HP e Foco restaurados!`);
        } else if (!alreadyStudied) {
          soundEngine.playItemPickup();
          canvasApiRef.current?.triggerBurst('#e6b84c', 16, 0);
          showToast(`Ficha estudada (+35 XP) · Pergaminho de Conexão recebido!`);
        }

        return nextState;
      });
    },
    [showToast, trackedFichaId]
  );

  const handleStartNpcDuel = useCallback(
    (ficha: Ficha) => {
      const deck = buildBattleDeck('npc-duel', ficha.id, saveState);
      const duelEnemy: WorldEnemy = {
        id: `npc-duel-${ficha.id}`,
        x: saveState.heroX,
        y: saveState.heroY,
        homeX: saveState.heroX,
        homeY: saveState.heroY,
        vx: 0,
        vy: 0,
        sprite: 'knight',
        behavior: 'patrol',
        patrolPhase: 0,
        zonaId: ficha.zonaId,
        regiaoId: ficha.regiaoId,
        nome: ficha.npcName,
        subtitulo: `Duelo Acadêmico · ${ficha.materia}`,
        isBoss: false,
        isMiniBoss: false,
        isNpcDuel: true,
        npcDuelFicha: ficha,
        level: Math.max(1, saveState.level),
      };
      soundEngine.playBattleStart('npc-duel');
      setActiveFicha(null);
      setActiveBattle({ enemy: duelEnemy, deck });
      setOverlay('battle');
    },
    [saveState]
  );

  const handleInteractEnemy = useCallback(
    (enemy: WorldEnemy) => {
      const mode = enemy.isResurgent
        ? 'resurgent'
        : enemy.isBoss
          ? 'boss'
          : enemy.isMiniBoss
            ? 'miniboss'
            : 'monster';
      const scopeId = enemy.isBoss ? enemy.regiaoId : enemy.zonaId;
      const deck = buildBattleDeck(mode, scopeId, saveState);
      soundEngine.playBattleStart(enemy.isBoss ? 'boss' : enemy.isMiniBoss ? 'miniboss' : 'monster');
      setActiveBattle({ enemy, deck });
      setOverlay('battle');
    },
    [saveState]
  );

  const handleAnswerQuestion = useCallback(
    (question: Question, wasCorrect: boolean, hpDelta: number, focusDelta: number) => {
      if (!wasCorrect && hpDelta < 0) {
        canvasApiRef.current?.triggerBurst('#ef4444', 18, 0.45);
      } else if (wasCorrect) {
        canvasApiRef.current?.triggerBurst('#4ade80', 14, 0);
      }
      setSaveState((prev) => {
        const updated = recordQuestionOutcome(prev, question, wasCorrect);
        return {
          ...updated,
          hp: Math.max(0, Math.min(updated.maxHp, updated.hp + hpDelta)),
          focus: Math.max(0, Math.min(updated.maxFocus, updated.focus + focusDelta)),
        };
      });
    },
    []
  );

  const handleSpendFocus = useCallback((amount: number) => {
    setSaveState((prev) => ({
      ...prev,
      focus: Math.max(0, prev.focus - amount),
    }));
  }, []);

  const handleUseBattleItem = useCallback((itemId: ItemId) => {
    setSaveState((prev) => {
      const cur = prev.inventory[itemId] || 0;
      if (cur <= 0) return prev;
      const inv = { ...prev.inventory, [itemId]: cur - 1 };
      let hp = prev.hp;
      let focus = prev.focus;
      if (itemId === 'pocao_vida') hp = Math.min(prev.maxHp, hp + 40);
      if (itemId === 'elixir_foco') focus = Math.min(prev.maxFocus, focus + 35);
      return { ...prev, inventory: inv, hp, focus };
    });
  }, []);

  const handleBattleEnd = useCallback(
    (victory: boolean, enemy: WorldEnemy, xpEarned: number) => {
      setActiveBattle(null);
      if (!victory) {
        const deathRegionId = enemy.regiaoId || currentRegion.id;
        const respawn = getRegionFountainRespawn(deathRegionId);
        setOverlay('victory_modal');
        setVictorySummary({
          title: 'Derrota em Batalha',
          subtitle: `${enemy.nome} venceu este duelo, mas você ganhou experiência com os erros.`,
          xpEarned,
          rewardText: `Você foi restaurado na fonte central de ${respawn.region.nome}. As questões erradas voltarão na revisão espaçada!`,
          defeat: true,
          respawnPos: { x: respawn.x, y: respawn.y },
          respawnRegion: respawn.region,
        });
        setPhase('gameover');
        setCurrentRegion(respawn.region);
        setSaveState((prev) => {
          const lv = applyXpGain(prev, xpEarned);
          return {
            ...prev,
            ...lv,
            hp: lv.maxHp,
            focus: lv.maxFocus,
            heroX: respawn.x,
            heroY: respawn.y,
          };
        });
        return;
      }

      // Victory!
      let rewardText = `+${xpEarned} XP conquistados!`;
      setSaveState((prev) => {
        const lv = applyXpGain(prev, xpEarned);
        const defeatedEnemies =
          !enemy.isBoss &&
          !enemy.isMiniBoss &&
          !enemy.isResurgent &&
          !enemy.isNpcDuel &&
          !prev.defeatedEnemies.includes(enemy.id)
            ? [...prev.defeatedEnemies, enemy.id]
            : prev.defeatedEnemies;
        const defeatedBosses =
          (enemy.isBoss || enemy.isMiniBoss) && !prev.defeatedBosses.includes(enemy.id)
            ? [...prev.defeatedBosses, enemy.id]
            : prev.defeatedBosses;
        let regionKeys = prev.regionKeys;
        const inv = { ...prev.inventory };
        let duelWins = prev.duelWins || [];
        let studiedFichas = prev.studiedFichas;
        let collectedScrolls = prev.collectedScrolls;

        if (enemy.id.startsWith('building-challenge-')) {
          const rewardId: ItemId = activeBattle?.buildingRewardItem || 'pocao_dica';
          inv[rewardId] = (inv[rewardId] || 0) + 1;
          rewardText = `Desafio do prédio vencido! +${xpEarned} XP e +1× ${ITEM_DEFS[rewardId].nome}.`;
        } else if (enemy.isNpcDuel && enemy.npcDuelFicha) {
          const fid = enemy.npcDuelFicha.id;
          const firstWin = !duelWins.includes(fid);
          if (firstWin) {
            duelWins = [...duelWins, fid];
            inv.pocao_dica = (inv.pocao_dica || 0) + 1;
            rewardText = `Duelo vencido contra ${enemy.nome}! +1 Poção de Dica e ficha marcada como estudada.`;
          } else {
            rewardText = `Vitória em revanche contra ${enemy.nome}! +${xpEarned} XP.`;
          }
          if (!studiedFichas.includes(fid)) studiedFichas = [...studiedFichas, fid];
          if (!collectedScrolls.includes(fid)) collectedScrolls = [...collectedScrolls, fid];
        } else if (enemy.isBoss) {
          const reg = REGION_BY_ID[enemy.regiaoId];
          if (reg && !regionKeys.includes(reg.id)) {
            regionKeys = [...regionKeys, reg.id];
            rewardText = `Você obteve a ${reg.keyName}! Use-a no Baú Real de ${reg.nome}.`;
          }
          inv.pocao_dica = (inv.pocao_dica || 0) + 1;
          inv.escudo_recurso = (inv.escudo_recurso || 0) + 1;
        } else if (enemy.isMiniBoss) {
          inv.lupa_fonte = (inv.lupa_fonte || 0) + 1;
          rewardText = 'Mini-Boss derrotado! Você ganhou +1 Lupa da Fonte.';
        }

        if (lv.leveledUp) {
          soundEngine.playLevelUp();
        } else {
          soundEngine.playItemPickup();
        }

        return {
          ...prev,
          ...lv,
          defeatedEnemies,
          defeatedBosses,
          duelWins,
          studiedFichas,
          collectedScrolls,
          regionKeys,
          inventory: inv,
          stats: {
            ...prev.stats,
            bossesDefeated: prev.stats.bossesDefeated + (enemy.isBoss || enemy.isMiniBoss ? 1 : 0),
          },
        };
      });

      canvasApiRef.current?.triggerBurst('#fde047', 30, 0.25);
      if (enemy.isBoss || enemy.isMiniBoss || enemy.isNpcDuel || enemy.id.startsWith('building-challenge-')) {
        setVictorySummary({
          title: enemy.id.startsWith('building-challenge-')
            ? `Desafio Concluído · ${enemy.nome}!`
            : enemy.isNpcDuel
              ? `Duelo Vencido contra ${enemy.nome}!`
              : `Vitória sobre ${enemy.nome}!`,
          subtitle: enemy.subtitulo,
          xpEarned,
          rewardText,
        });
        setOverlay('victory_modal');
      } else {
        setOverlay('none');
        showToast(`Vitória sobre ${enemy.nome}! +${xpEarned} XP`);
      }
    },
    [activeBattle?.buildingRewardItem, currentRegion.id, showToast]
  );

  const handleInteractChest = useCallback(
    (chest: WorldChest) => {
      if (saveState.openedChests.includes(chest.id)) return;
      if (chest.requiresKey && !saveState.regionKeys.includes(chest.requiresKey)) {
        const reg = REGION_BY_ID[chest.requiresKey];
        soundEngine.playWrong();
        showToast(`Baú trancado! Derrote o Boss de ${reg?.nome || 'região'} para obter a ${reg?.keyName || 'chave'}.`);
        return;
      }

      soundEngine.playItemPickup();
      setSaveState((prev) => {
        const openedChests = [...prev.openedChests, chest.id];
        if (chest.rewardCosmeticId) {
          const unlockedCosmetics = prev.unlockedCosmetics.includes(chest.rewardCosmeticId)
            ? prev.unlockedCosmetics
            : [...prev.unlockedCosmetics, chest.rewardCosmeticId];
          const reg = REGIONS.find((r) => r.cosmeticReward.id === chest.rewardCosmeticId);
          showToast(`Baú Real aberto! Cosmético desbloqueado: ${reg?.cosmeticReward.name || chest.rewardCosmeticId}!`);
          return {
            ...prev,
            openedChests,
            unlockedCosmetics,
            equippedCosmetic: chest.rewardCosmeticId,
          };
        }
        const item = chest.rewardItem || 'pocao_dica';
        const qty = chest.rewardQty || 1;
        showToast(`Baú aberto! +${qty}× ${ITEM_DEFS[item].nome}`);
        return {
          ...prev,
          openedChests,
          inventory: {
            ...prev.inventory,
            [item]: (prev.inventory[item] || 0) + qty,
          },
        };
      });
    },
    [saveState.openedChests, saveState.regionKeys, showToast]
  );

  const handleInteractSign = useCallback((sign: WorldSign) => {
    setActiveSign(sign);
    setOverlay('sign');
  }, []);

  const handleInteractCritter = useCallback(
    (crit: WorldCritter) => {
      canvasApiRef.current?.triggerBurst('#fb7185', 14, 0);
      showToast(crit.barkLine);
    },
    [showToast]
  );

  const handleInteractBuilding = useCallback((building: WorldBuilding) => {
    const spec = getBuildingInteriorSpec(building.label);
    if (!spec) return;
    setActiveBuildingSpec(spec);
    setOverlay('building');
  }, []);

  const handleBuildingRest = useCallback(() => {
    soundEngine.playLevelUp();
    canvasApiRef.current?.triggerBurst('#4ade80', 22, 0);
    setSaveState((prev) => ({
      ...prev,
      hp: prev.maxHp,
      focus: prev.maxFocus,
    }));
    showToast('Energia 100% restaurada! HP e Foco no máximo.');
  }, [showToast]);

  const handleBuildingBuyItem = useCallback(
    (itemId: ItemId, cost: number) => {
      setSaveState((prev) => {
        const available = getAvailableStudyPoints(prev);
        if (available < cost) return prev;
        soundEngine.playItemPickup();
        showToast(`Comprou 1× ${ITEM_DEFS[itemId].nome} (-${cost} Pontos de Estudo)!`);
        return {
          ...prev,
          spentStudyPoints: (prev.spentStudyPoints || 0) + cost,
          inventory: {
            ...prev.inventory,
            [itemId]: (prev.inventory[itemId] || 0) + 1,
          },
        };
      });
    },
    [showToast]
  );

  const handleBuildingClaimSecret = useCallback(
    (spec: BuildingInteriorSpec) => {
      if (!spec.secretQuest) return;
      setSaveState((prev) => {
        const check = evaluateBuildingSecret(spec, prev);
        if (!check.ready || check.claimed) return prev;
        const lv = applyXpGain(prev, spec.secretQuest!.rewardXp);
        const inv = { ...prev.inventory };
        for (const ri of spec.secretQuest!.rewardItems) {
          inv[ri.itemId] = (inv[ri.itemId] || 0) + ri.qty;
        }
        soundEngine.playLevelUp();
        canvasApiRef.current?.triggerBurst('#c084fc', 32, 0.2);
        showToast(
          `Missão secreta "${spec.secretQuest!.title}" concluída! +${spec.secretQuest!.rewardXp} XP e itens raros!`
        );
        return {
          ...prev,
          ...lv,
          inventory: inv,
          claimedBuildingSecrets: [...(prev.claimedBuildingSecrets || []), spec.id],
        };
      });
    },
    [showToast]
  );

  const handleBuildingStartChallenge = useCallback(
    (spec: BuildingInteriorSpec) => {
      const deck = buildBuildingChallengeDeck(spec, saveState);
      if (deck.length === 0) {
        showToast('Nenhuma questão disponível nesta disciplina para a classe atual.');
        return;
      }
      const challengeEnemy: WorldEnemy = {
        id: `building-challenge-${spec.id}`,
        x: saveState.heroX,
        y: saveState.heroY,
        homeX: saveState.heroX,
        homeY: saveState.heroY,
        vx: 0,
        vy: 0,
        sprite: 'knight',
        behavior: 'patrol',
        patrolPhase: 0,
        zonaId: spec.zonaId,
        regiaoId: spec.regiaoId,
        nome: spec.hostName,
        subtitulo: `Desafio Relâmpago · ${spec.label}`,
        isBoss: false,
        isMiniBoss: false,
        isNpcDuel: true,
        npcDuelFicha: {
          id: `host-${spec.id}`,
          aliasIds: [],
          titulo: spec.label,
          materia: spec.label,
          zonaId: spec.zonaId,
          regiaoId: spec.regiaoId,
          cargo: 'ambos',
          npcName: spec.hostName,
          npcRole: spec.hostRole,
          npcSeed: 0,
          oQueE: spec.greeting,
          exemploPratico: spec.studyTip,
          fatosChave: [],
          avisosOraculo: [],
          conexoes: [],
          fontes: [],
          tablePairs: [],
          textoCompleto: spec.greeting,
        },
        level: Math.max(1, saveState.level),
      };
      soundEngine.playBattleStart('npc-duel');
      setActiveBuildingSpec(null);
      setActiveBattle({
        enemy: challengeEnemy,
        deck,
        buildingRewardItem: spec.challengeRewardItem || 'pocao_dica',
      });
      setOverlay('battle');
    },
    [saveState, showToast]
  );

  const handleTrackNpc = useCallback(
    (fichaId: string) => {
      const f = getFichaById(fichaId);
      setTrackedFichaId(fichaId);
      if (f) {
        const world = buildWorldData();
        const npc = world.npcs.find((n) => n.id === fichaId);
        if (npc) {
          showToast(`Rastreando ${f.npcName} em ${f.materia} (siga a bússola azul).`);
        }
      }
    },
    [showToast]
  );

  const handleFastTravel = useCallback(
    (rawTx: number, rawTy: number, label: string) => {
      const world = buildWorldData();
      let tx = Math.max(2, Math.min(157, Math.round(rawTx)));
      let ty = Math.max(2, Math.min(157, Math.round(rawTy)));
      if (isSolidTile(world.tiles[ty * 160 + tx] as TileType)) {
        outer: for (let r = 1; r <= 6; r++) {
          for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
              const nx = tx + dx;
              const ny = ty + dy;
              if (nx >= 2 && ny >= 2 && nx < 158 && ny < 158 && !isSolidTile(world.tiles[ny * 160 + nx] as TileType)) {
                tx = nx;
                ty = ny;
                break outer;
              }
            }
          }
        }
      }
      const cBaseX = Math.floor(tx / 4);
      const cBaseY = Math.floor(ty / 4);
      const revealChunks: string[] = [];
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          revealChunks.push(`${cBaseX + dx},${cBaseY + dy}`);
        }
      }
      setSaveState((prev) => ({
        ...prev,
        heroX: tx,
        heroY: ty,
        exploredChunks: Array.from(new Set([...prev.exploredChunks, ...revealChunks])),
      }));
      setCurrentRegion(getRegionAt(tx, ty));
      setCurrentZona(getZonaAt(tx, ty));
      canvasApiRef.current?.teleportTo(tx, ty);
      soundEngine.playDialogOpen();
      showToast(`Viajou para ${label}`);
    },
    [showToast]
  );

  const modalOpen = phase !== 'playing' || overlay !== 'none';

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0e1118]">
      {/* Isolated 60fps 2D Pixel-Art Canvas (always mounted, scenic tour in title!) */}
      <GameCanvas
        phase={phase}
        modalOpen={modalOpen}
        saveState={saveState}
        dbVersion={dbVersion}
        trackedFichaId={trackedFichaId}
        apiRef={canvasApiRef}
        onHeroPosUpdate={handleHeroPosUpdate}
        onLocationChange={handleLocationChange}
        onInteractNpc={handleInteractNpc}
        onInteractEnemy={handleInteractEnemy}
        onInteractChest={handleInteractChest}
        onInteractSign={handleInteractSign}
        onInteractCritter={handleInteractCritter}
        onInteractBuilding={handleInteractBuilding}
        onInteractFairy={() => setOverlay('fairy')}
        onNearPromptChange={setNearPrompt}
      />

      {/* TITLE SCREEN */}
      {phase === 'title' && (
        <TitleScreen
          selectedClass={selectedClass}
          hasExistingSave={hasExistingSave}
          dbVersion={dbVersion}
          modalBlocking={overlay === 'database' || overlay === 'tutorial'}
          onSelectClass={setSelectedClass}
          onStartNew={handleStartNew}
          onContinue={handleContinue}
          onOpenDatabase={() => setOverlay('database')}
          onOpenTutorial={() => setOverlay('tutorial')}
        />
      )}

      {/* IN-GAME HUD */}
      {phase !== 'title' && (
        <HudOverlay
          saveState={saveState}
          dbVersion={dbVersion}
          currentRegion={currentRegion}
          currentZona={currentZona}
          activeTrackTitle={activeTrackTitle}
          nearPrompt={overlay === 'none' ? nearPrompt : null}
          trackedFichaId={trackedFichaId}
          toastMessage={toastMessage}
          onOpenGrimorio={() => setOverlay('grimorio')}
          onOpenInventory={() => setOverlay('inventory')}
          onOpenMap={() => setOverlay('map')}
          onOpenDatabase={() => setOverlay('database')}
          onOpenFairy={() => setOverlay('fairy')}
          onOpenPause={() => setPhase('paused')}
          onToggleMute={() =>
            setSaveState((prev) => ({
              ...prev,
              settings: { ...prev.settings, muted: !prev.settings.muted },
            }))
          }
          onClearTracked={() => setTrackedFichaId(null)}
          onTouchJoystick={(vx, vy) => canvasApiRef.current?.setJoystickVector(vx, vy)}
          onTouchInteract={() => canvasApiRef.current?.triggerInteract()}
        />
      )}

      {/* NPC LESSON DIALOGUE */}
      {overlay === 'dialogue' && activeFicha && (
        <DialogueModal
          ficha={activeFicha}
          playerClass={saveState.playerClass}
          alreadyStudied={saveState.studiedFichas.includes(activeFicha.id)}
          onComplete={handleCompleteNpcDialogue}
          onStartDuel={handleStartNpcDuel}
          onTrackConnection={(targetId) => {
            handleTrackNpc(targetId);
          }}
          onClose={() => {
            setOverlay('none');
            setActiveFicha(null);
          }}
        />
      )}

      {/* TURN-BASED BATTLE */}
      {overlay === 'battle' && activeBattle && (
        <BattleModal
          enemy={activeBattle.enemy}
          deck={activeBattle.deck}
          saveState={saveState}
          onAnswerQuestion={handleAnswerQuestion}
          onUseItem={handleUseBattleItem}
          onSpendFocus={handleSpendFocus}
          onBattleEnd={handleBattleEnd}
          onFlee={() => {
            setActiveBattle(null);
            setOverlay('none');
            showToast('Você recuou da batalha.');
          }}
        />
      )}

      {/* GRIMÓRIO (CODEX) */}
      {overlay === 'grimorio' && (
        <GrimorioModal
          saveState={saveState}
          dbVersion={dbVersion}
          onTrackNpc={handleTrackNpc}
          onClose={() => setOverlay('none')}
        />
      )}

      {/* INVENTÁRIO */}
      {overlay === 'inventory' && (
        <InventoryModal
          saveState={saveState}
          onUseFieldItem={(id) => {
            handleUseBattleItem(id);
            soundEngine.playItemPickup();
            showToast(`Usou ${ITEM_DEFS[id].nome}!`);
          }}
          onEquipCosmetic={(cosmeticId) =>
            setSaveState((prev) => ({ ...prev, equippedCosmetic: cosmeticId }))
          }
          onClose={() => setOverlay('none')}
        />
      )}

      {/* WORLD MAP */}
      {overlay === 'map' && (
        <WorldMapModal
          saveState={saveState}
          dbVersion={dbVersion}
          onFastTravel={handleFastTravel}
          onClose={() => setOverlay('none')}
        />
      )}

      {/* DATABASE MANAGER (Add Disciplinas, Temas/NPCs, Perguntas, Import Markdown/JSON) */}
      {overlay === 'database' && (
        <DatabaseManagerModal
          onDatabaseUpdated={(msg) => {
            setDbVersion(getDatabaseRevision());
            showToast(msg);
          }}
          onClose={() => setOverlay('none')}
        />
      )}

      {/* INTERACTIVE GUIDED TUTORIAL LED BY LUMINA */}
      {overlay === 'tutorial' && (
        <TutorialModal
          onFinish={() => {
            setOverlay('none');
            if (phase === 'playing') {
              showToast('Lumina está voando ao seu lado! Aperte [F] ou clique nela quando tiver dúvidas.');
            }
          }}
          onOpenFairy={phase === 'playing' ? () => setOverlay('fairy') : undefined}
        />
      )}

      {/* LUMINA AI FAIRY COMPANION MODAL */}
      {overlay === 'fairy' && (
        <FairyCompanionModal
          saveState={saveState}
          currentRegion={currentRegion}
          currentZona={currentZona}
          onTrackNpc={handleTrackNpc}
          onOpenTutorial={() => setOverlay('tutorial')}
          onClose={() => setOverlay('none')}
        />
      )}

      {/* ENTERABLE BUILDING INTERIOR MODAL (28 Named Buildings across 6 Regions!) */}
      {overlay === 'building' && activeBuildingSpec && (
        <BuildingInteriorModal
          spec={activeBuildingSpec}
          saveState={saveState}
          onRest={handleBuildingRest}
          onBuyItem={handleBuildingBuyItem}
          onStartChallenge={handleBuildingStartChallenge}
          onClaimSecret={handleBuildingClaimSecret}
          onTrackNpc={handleTrackNpc}
          onClose={() => {
            setActiveBuildingSpec(null);
            setOverlay('none');
          }}
        />
      )}

      {/* ZONE SIGNPOST MODAL */}
      {overlay === 'sign' && activeSign && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-label={`Placa de ${activeSign.title}`}
        >
          <div className="rpg-panel-warm max-w-md w-full p-6 space-y-4 text-center">
            <div className="text-xs font-mono-num text-[#e6b84c]">
              PLACA DA ZONA · NÍVEL SUGERIDO {activeSign.level}
            </div>
            <h2 className="font-display text-2xl font-bold text-[#f5e6c8]">{activeSign.title}</h2>
            <p className="text-sm text-[#cbd5e1]">
              Matéria do edital ({activeSign.subtitle}). Fale com os NPCs para estudar as fichas e desafie os monstros e o Mini-Boss da zona!
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveSign(null);
                setOverlay('none');
              }}
              className="px-6 py-2.5 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-sm cursor-pointer"
            >
              Continuar Exploração
            </button>
          </div>
        </div>
      )}

      {/* BOSS VICTORY / DEFEAT MODAL */}
      {overlay === 'victory_modal' && victorySummary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          role="dialog"
          aria-modal="true"
          aria-label={victorySummary.title}
        >
          <div className="rpg-panel-warm max-w-lg w-full p-6 space-y-4 text-center">
            <h2
              className={`font-display text-2xl font-bold ${
                victorySummary.defeat ? 'text-[#fca5a5]' : 'text-[#fde047]'
              }`}
            >
              {victorySummary.title}
            </h2>
            <p className="text-sm text-[#cbd5e1]">{victorySummary.subtitle}</p>
            <div className="p-3.5 bg-[#12151f] border border-[#3a3f54] font-mono-num text-sm text-[#fde68a]">
              +{victorySummary.xpEarned} XP · {victorySummary.rewardText}
            </div>
            <button
              type="button"
              data-start="true"
              onClick={() => {
                const targetRespawn = victorySummary.respawnPos;
                const targetRegion = victorySummary.respawnRegion;
                const wasDefeat = victorySummary.defeat;
                setVictorySummary(null);
                setOverlay('none');
                setPhase('playing');
                if (wasDefeat && targetRespawn) {
                  if (targetRegion) setCurrentRegion(targetRegion);
                  canvasApiRef.current?.teleportTo(targetRespawn.x, targetRespawn.y);
                }
              }}
              className="px-7 py-3 bg-[#d9a441] hover:bg-[#e8b652] text-[#14110b] font-bold text-base cursor-pointer"
            >
              {victorySummary.defeat ? 'Levantar e Continuar' : 'Prosseguir Aventura'}
            </button>
          </div>
        </div>
      )}

      {/* PAUSE & SETTINGS MODAL */}
      {phase === 'paused' && (
        <PauseSettingsModal
          saveState={saveState}
          onResume={() => setPhase('playing')}
          onUpdateSettings={(patch) =>
            setSaveState((prev) => ({
              ...prev,
              settings: { ...prev.settings, ...patch },
            }))
          }
          onChangeClass={(cls) => {
            setSelectedClass(cls);
            setSaveState((prev) => ({ ...prev, playerClass: cls }));
            showToast(`Classe alterada! NPCs, perguntas e bosses atualizados.`);
          }}
          onImportSave={(nextState) => {
            setSaveState(nextState);
            persistSaveState(nextState);
            setSelectedClass(nextState.playerClass);
            canvasApiRef.current?.teleportTo(nextState.heroX, nextState.heroY);
          }}
          onImportRealExamQuestions={(qs) => {
            setSaveState((prev) => ({
              ...prev,
              customExamQuestions: [...prev.customExamQuestions, ...qs],
            }));
          }}
          onOpenDatabase={() => {
            setPhase('playing');
            setOverlay('database');
          }}
          onOpenTutorial={() => {
            setPhase('playing');
            setOverlay('tutorial');
          }}
          onOpenFairy={() => {
            setPhase('playing');
            setOverlay('fairy');
          }}
          onRestartNew={() => {
            clearSaveState();
            handleStartNew(selectedClass);
          }}
          onReturnTitle={() => {
            setOverlay('none');
            setPhase('title');
          }}
        />
      )}
    </div>
  );
}
