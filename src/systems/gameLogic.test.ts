import test from 'node:test';
import assert from 'node:assert/strict';
import { FICHAS, PONTES, REGIONS, ZONAS } from '../data/content';
import { QUESTIONS } from '../data/questions';
import {
  applyXpGain,
  buildBattleDeck,
  buildNpcDialogue,
  getFichasForClass,
  getNewlyCompletedPontes,
  getQuestionsForClass,
  parseImportedRealExamJson,
  recordQuestionOutcome,
  SPACED_REP_COOLDOWN_MS,
} from './gameLogic';
import { createInitialSaveState } from './save';
import {
  buildWorldData,
  findPathAStar,
  getActiveNpcsForClass,
  isSolidTile,
  TileType,
  WORLD_H,
  WORLD_W,
} from '../world/worldMap';

test('all 14 Markdown materias became zones across 6 regions and all fichas became NPCs', () => {
  assert.equal(REGIONS.length, 6);
  assert.equal(ZONAS.length, 14);
  assert.ok(FICHAS.length >= 140, `Expected >= 140 fichas, got ${FICHAS.length}`);

  const world = buildWorldData();
  assert.equal(world.npcs.length, FICHAS.length);
  assert.equal(WORLD_W, 160);
  assert.equal(WORLD_H, 160);
  assert.equal(world.tiles.length, 160 * 160);

  // Every NPC sits on a walkable tile
  for (const npc of world.npcs) {
    const t = world.tiles[npc.y * WORLD_W + npc.x] as TileType;
    assert.equal(isSolidTile(t), false, `NPC ${npc.id} at (${npc.x},${npc.y}) is on solid tile ${t}`);
  }
});

test('every ficha has at least 3 grounded questions and ZERO ⚠️ warnings leaked into questions', () => {
  const counts = new Map<string, number>();
  for (const q of QUESTIONS) {
    assert.ok(q.fichaId && q.fichaId.length > 0, `Question ${q.id} missing fichaId`);
    assert.ok(q.trechoFonte && q.trechoFonte.length > 5, `Question ${q.id} missing trechoFonte`);
    assert.equal(q.enunciado.includes('⚠️'), false, `Question ${q.id} leaked ⚠️ in enunciado`);
    assert.equal(q.trechoFonte.includes('⚠️'), false, `Question ${q.id} leaked ⚠️ in trechoFonte`);
    for (const alt of q.alternativas) {
      assert.equal(alt.includes('⚠️'), false, `Question ${q.id} leaked ⚠️ in alternativa`);
    }
    assert.ok(q.correta >= 0 && q.correta < q.alternativas.length, `Invalid correta index on ${q.id}`);
    counts.set(q.fichaId, (counts.get(q.fichaId) || 0) + 1);
  }

  for (const f of FICHAS) {
    const c = counts.get(f.id) || 0;
    assert.ok(c >= 3, `Ficha ${f.id} only has ${c} questions (min 3 required)`);
  }
});

test('class filter changes active NPCs, questions, and boss decks', () => {
  const tecFichas = getFichasForClass('tecnico');
  const anaFichas = getFichasForClass('analista');
  const dupFichas = getFichasForClass('dupla');

  assert.equal(dupFichas.length, FICHAS.length);
  assert.ok(tecFichas.length < dupFichas.length);
  assert.ok(anaFichas.length < dupFichas.length);
  assert.equal(tecFichas.some((f) => f.cargo === 'analista'), false);
  assert.equal(anaFichas.some((f) => f.cargo === 'tecnico'), false);

  const world = buildWorldData();
  assert.equal(getActiveNpcsForClass(world, 'tecnico').length, tecFichas.length);
  assert.equal(getActiveNpcsForClass(world, 'analista').length, anaFichas.length);

  const tecQs = getQuestionsForClass('tecnico');
  const anaQs = getQuestionsForClass('analista');
  assert.equal(tecQs.some((q) => q.cargo === 'analista'), false);
  assert.equal(anaQs.some((q) => q.cargo === 'tecnico'), false);
});

test('spaced repetition requires 2 consecutive correct answers after a mistake', () => {
  let state = createInitialSaveState('dupla');
  const q = QUESTIONS[0];
  const t0 = 1_000_000;

  // Wrong answer schedules spaced repetition
  state = recordQuestionOutcome(state, q, false, t0);
  assert.ok(state.spacedRep[q.id]);
  assert.equal(state.spacedRep[q.id].consecutiveCorrect, 0);

  // First correct answer increments streak to 1 (still tracked)
  state = recordQuestionOutcome(state, q, true, t0 + SPACED_REP_COOLDOWN_MS + 100);
  assert.ok(state.spacedRep[q.id]);
  assert.equal(state.spacedRep[q.id].consecutiveCorrect, 1);

  // Second consecutive correct answer clears it!
  state = recordQuestionOutcome(state, q, true, t0 + SPACED_REP_COOLDOWN_MS * 2 + 200);
  assert.equal(state.spacedRep[q.id], undefined);
});

test('A* pathfinding routes around solid obstacles cleanly', () => {
  const world = buildWorldData();
  const path = findPathAStar(world.tiles, 29, 20, 35, 25);
  assert.ok(path.length > 0, 'Expected non-empty path from spawn plaza');
  for (const step of path) {
    const t = world.tiles[step.y * WORLD_W + step.x] as TileType;
    assert.equal(isSolidTile(t), false, `Path stepped on solid tile at (${step.x},${step.y})`);
  }
});

test('importing real exam JSON validates schema and injects questions into boss deck', () => {
  const sampleJson = JSON.stringify([
    {
      id: 'fcc-real-1',
      fichaId: 'lgpd',
      enunciado: 'Nos termos da Lei nº 13.709/2018 (LGPD), o encarregado pelo tratamento de dados pessoais atua como canal de comunicação entre:',
      alternativas: [
        'o controlador, os titulares dos dados e a ANPD.',
        'apenas o operador e o Poder Judiciário.',
        'exclusivamente o Ministério Público e os servidores.',
        'somente o titular e o fabricante de software.',
        'os provedores de nuvem e o TCU.',
      ],
      correta: 0,
      trechoFonte: 'Encarregado (DPO): canal de comunicação entre controlador, titulares e a ANPD.',
      banca: 'FCC',
      ano: 2024,
      orgao: 'TRT4',
      cargo: 'Ambos',
    },
  ]);

  const res = parseImportedRealExamJson(sampleJson);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.questions[0].isRealExam, true);
    const state = {
      ...createInitialSaveState('dupla'),
      customExamQuestions: res.questions,
    };
    const deck = buildBattleDeck('boss', 'fortaleza-da-muralha', state, 42);
    assert.ok(deck.some((q) => q.id === 'fcc-real-1' && q.isRealExam === true));
  }
});

test('NPC dialogue includes Oracle warning when ficha has ⚠️ and XP leveling works', () => {
  const warningFicha = FICHAS.find((f) => f.avisosOraculo.length > 0)!;
  assert.ok(warningFicha);
  const bubbles = buildNpcDialogue(warningFicha, 'dupla');
  assert.ok(bubbles.some((b) => b.isOracle === true));

  const s = createInitialSaveState('dupla');
  const leveled = applyXpGain(s, 500);
  assert.ok(leveled.level > 1);
  assert.equal(leveled.leveledUp, true);

  // Ponte quest completion check
  const p = PONTES[0];
  const withScrolls = { ...s, collectedScrolls: [...p.fichaIds] };
  const newly = getNewlyCompletedPontes(withScrolls);
  assert.ok(newly.some((x) => x.id === p.id));
});

test('SNES world has thematic buildings, fountains, roaming dogs/cats, and walkable spawn/critters/signs', () => {
  const world = buildWorldData();
  const spawnTile = world.tiles[22 * WORLD_W + 29] as TileType;
  assert.equal(isSolidTile(spawnTile), false, `Hero spawn (29,22) must be walkable, got ${spawnTile}`);

  assert.ok(world.critters.length >= 6, `Expected >= 6 roaming pets, got ${world.critters.length}`);
  assert.ok(world.critters.some((c) => c.kind === 'dog'), 'Expected at least one dog critter');
  assert.ok(world.landmarks.length >= 10, `Expected >= 10 thematic town landmarks, got ${world.landmarks.length}`);

  for (const crit of world.critters) {
    const t = world.tiles[Math.round(crit.homeY) * WORLD_W + Math.round(crit.homeX)] as TileType;
    assert.equal(isSolidTile(t), false, `Critter ${crit.name} home (${crit.homeX},${crit.homeY}) is on solid tile ${t}`);
  }
  for (const sign of world.signs) {
    const t = world.tiles[sign.y * WORLD_W + sign.x] as TileType;
    assert.equal(isSolidTile(t), false, `Sign ${sign.zonaId} at (${sign.x},${sign.y}) is on solid tile ${t}`);
  }
});

test('NPC duel builds a focused 4-question deck prioritizing the NPC ficha', () => {
  const state = createInitialSaveState('dupla');
  const firstFicha = FICHAS[0];
  const deck = buildBattleDeck('npc-duel', firstFicha.id, state, 99);
  assert.equal(deck.length, 4);
  assert.ok(
    deck.some((q) => q.fichaId === firstFicha.id),
    'NPC duel deck must contain questions from the dueled NPC ficha'
  );
});

test('free SNES soundtrack catalog defines distinct tracks for all 6 regions plus combat, NPC duel, mini-boss and boss, and maps uploaded Suno MP3 files', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { SOUNDTRACK_CATALOG, CUSTOM_AUDIO_TRACKS, getTrackAudioUrl } = await import('./audio');
  const ids = new Set(SOUNDTRACK_CATALOG.map((t) => t.id));
  for (const r of REGIONS) {
    assert.ok(ids.has(r.id), `Missing region soundtrack for ${r.id}`);
  }
  for (const combatTrack of ['title', 'battle', 'npc-duel', 'miniboss', 'boss'] as const) {
    assert.ok(ids.has(combatTrack), `Missing soundtrack for ${combatTrack}`);
  }

  // Verify the 5 uploaded Suno MP3 tracks exist on disk and are wired to their exact track IDs
  const uploadedIds = ['title', 'reino-da-toga', 'cidadela-do-conselho', 'porto-babel', 'battle'] as const;
  for (const id of uploadedIds) {
    const url = getTrackAudioUrl(id);
    assert.ok(url && url.startsWith('/assets/aistudio/') && url.endsWith('.mp3'), `Expected MP3 URL for ${id}`);
    assert.equal(CUSTOM_AUDIO_TRACKS[id], url);
    const diskPath = path.resolve(process.cwd(), 'public', url.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Audio file missing on disk: ${diskPath}`);
    const meta = SOUNDTRACK_CATALOG.find((t) => t.id === id);
    assert.equal(meta?.audioUrl, url);
  }

  // Pending tracks gracefully return null (using built-in SNES synthesizer fallback)
  assert.equal(getTrackAudioUrl('floresta-do-codigo'), null);
  assert.equal(getTrackAudioUrl('boss'), null);
});

test('custom Markdown importer parses new disciplinas/fichas, creates >= 3 questions, and never turns ⚠️ into questions', async () => {
  const { parseMarkdownToCustomEntries } = await import('./customDatabase');
  const md = `---
materia: Direito Administrativo — Licitações
cai_em: [tecnico, analista]
---

## [[teste-lei-14133]] 🟢 Nova Lei de Licitações (Lei nº 14.133/2021)
- **O que é:** norma geral de licitações e contratos administrativos para a Administração Pública direta, autárquica e fundacional.
- **Exemplo prático:** aquisição de servidores e storage para o TRT4 via pregão eletrônico.
- **Conexões:** [[lgpd]]
- **Fontes:** [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm)
- ⚠️ Verificar decreto regulamentador específico publicado após 2025.
`;

  const res = parseMarkdownToCustomEntries(md, 'reino-da-toga');
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.ok(res.zona, 'Expected new disciplina/zona to be created');
    assert.equal(res.fichas.length, 1);
    assert.equal(res.fichas[0].avisosOraculo.length, 1);
    assert.ok(res.questions.length >= 3, `Expected >= 3 generated questions, got ${res.questions.length}`);
    for (const q of res.questions) {
      assert.equal(q.enunciado.includes('⚠️'), false);
      assert.equal(q.trechoFonte.includes('⚠️'), false);
    }
  }
});

test('Nano Banana chroma-key processor removes magenta background, despills halos, and detects tight bounds', async () => {
  const { removeChromaKeyFromImageData } = await import('../entities/spriteSheetProcessor');
  // Create a 6x6 synthetic RGBA sprite on #FF00FF magenta with a 2x2 gold knight square in the center (2..3, 2..3)
  const w = 6;
  const h = 6;
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const isSprite = x >= 2 && x <= 3 && y >= 2 && y <= 3;
      if (isSprite) {
        data[i] = 220;
        data[i + 1] = 175;
        data[i + 2] = 60;
        data[i + 3] = 255;
      } else {
        // Pure magenta chroma key
        data[i] = 255;
        data[i + 1] = 0;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }
  }
  // Add a noisy JPEG magenta fringe pixel at (1, 2)
  const fringeIdx = (2 * w + 1) * 4;
  data[fringeIdx] = 235;
  data[fringeIdx + 1] = 24;
  data[fringeIdx + 2] = 232;
  data[fringeIdx + 3] = 255;

  const bounds = removeChromaKeyFromImageData(data, w, h, [255, 0, 255]);
  assert.equal(bounds.empty, false);
  assert.equal(bounds.minX, 2);
  assert.equal(bounds.minY, 2);
  assert.equal(bounds.maxX, 3);
  assert.equal(bounds.maxY, 3);

  // Corner & fringe pixels must be fully transparent (alpha === 0)
  assert.equal(data[3], 0);
  assert.equal(data[fringeIdx + 3], 0);
  // Center sprite pixel remains opaque
  const centerIdx = (2 * w + 2) * 4;
  assert.equal(data[centerIdx + 3], 255);

  // World map records SNES buildings & fountains for Nano Banana architectural sprite rendering
  const world = buildWorldData();
  assert.ok(world.buildings.length >= 15, `Expected >= 15 world buildings, got ${world.buildings.length}`);
  assert.ok(world.fountains.length >= 6, `Expected >= 6 world fountains, got ${world.fountains.length}`);
});

test('fichaMarkdown parses all 150 fichas into structured Apostila sections with zero stray ** markers', async () => {
  const { parseFichaApostila, parseInlineTokens, inlineTokensToPlainText } = await import('./fichaMarkdown');

  for (const f of FICHAS) {
    const doc = parseFichaApostila(f.textoCompleto);
    assert.ok(doc.sections.length >= 1, `Ficha ${f.id} produced 0 apostila sections`);
    for (const sec of doc.sections) {
      for (const blk of sec.blocks) {
        if (blk.type === 'paragraph' || blk.type === 'blockquote') {
          const plain = inlineTokensToPlainText(blk.tokens);
          assert.equal(plain.includes('**'), false, `Ficha ${f.id} left raw ** in paragraph: ${plain}`);
        }
        if (blk.type === 'list') {
          for (const item of blk.items) {
            const plain = inlineTokensToPlainText(item.tokens);
            assert.equal(plain.includes('**'), false, `Ficha ${f.id} left raw ** in list item: ${plain}`);
          }
        }
      }
    }
  }

  // Verify Código de Conduta (nested bullets, lead, example, connections, sources, oracle warning)
  const conduta = FICHAS.find((f) => f.id === 'codigo-conduta-trt4')!;
  const condutaDoc = parseFichaApostila(conduta.textoCompleto);
  assert.equal(condutaDoc.sections[0].kind, 'lead');
  assert.ok(condutaDoc.sections.some((s) => s.kind === 'example'));
  assert.ok(condutaDoc.sections.some((s) => s.kind === 'connections'));
  assert.ok(condutaDoc.inlineSources.length >= 2);
  assert.ok(condutaDoc.inlineOracleWarnings.length >= 1);

  // Verify Regimento Interno (8-row Markdown table)
  const regimento = FICHAS.find((f) => f.id === 'regimento-trt4')!;
  const regDoc = parseFichaApostila(regimento.textoCompleto);
  const tableBlock = regDoc.sections.flatMap((s) => s.blocks).find((b) => b.type === 'table');
  assert.ok(tableBlock && tableBlock.type === 'table');
  assert.equal(tableBlock.headers.length, 4);
  assert.ok(tableBlock.rows.length >= 8);

  // Verify Carta da ONU (2-row pipe table without --- separator)
  const carta = FICHAS.find((f) => f.id === 'carta-onu')!;
  const cartaDoc = parseFichaApostila(carta.textoCompleto);
  const cartaTable = cartaDoc.sections.flatMap((s) => s.blocks).find((b) => b.type === 'table');
  assert.ok(cartaTable && cartaTable.type === 'table');
  assert.equal(cartaTable.rows.length, 1);

  // Verify GitLab CI (indented yaml code block)
  const gitlab = FICHAS.find((f) => f.id === 'gitlab-ci')!;
  const gitlabDoc = parseFichaApostila(gitlab.textoCompleto);
  const codeBlock = gitlabDoc.sections.flatMap((s) => s.blocks).find((b) => b.type === 'code');
  assert.ok(codeBlock && codeBlock.type === 'code');
  assert.equal(codeBlock.language, 'yaml');
  assert.ok(codeBlock.code.includes('stages:'));

  // Reject unsafe javascript: URLs in markdown links
  const unsafeTokens = parseInlineTokens('Veja [clique](javascript:alert(1)) e [seguro](https://trt4.jus.br)');
  assert.equal(unsafeTokens.some((t) => t.type === 'link' && t.url.startsWith('javascript:')), false);
  assert.equal(unsafeTokens.some((t) => t.type === 'link' && t.url === 'https://trt4.jus.br'), true);
});

test('detectNpcGender strictly matches female vs male human NPC names across all 150 fichas and 28 building hosts', async () => {
  const { detectNpcGender } = await import('../entities/npcGender');
  const { BUILDING_INTERIORS } = await import('./buildings');

  // Specific reported cases & edge cases
  assert.equal(detectNpcGender('Tradutora Beatriz'), 'female');
  assert.equal(detectNpcGender('Magistrada Beatriz'), 'female');
  assert.equal(detectNpcGender('Mago Ada'), 'female');
  assert.equal(detectNpcGender('Vigia Radia'), 'female');
  assert.equal(detectNpcGender('Sentinela Alice'), 'female');
  assert.equal(detectNpcGender('Ferreira Turing'), 'female');
  assert.equal(detectNpcGender('Sábia Stallings'), 'female');
  assert.equal(detectNpcGender('Mestra Codd'), 'female');
  assert.equal(detectNpcGender('Capitã Evelyn'), 'female');

  assert.equal(detectNpcGender('Chanceler Renato'), 'male');
  assert.equal(detectNpcGender('Desembargador Lúcio'), 'male');
  assert.equal(detectNpcGender('Conselheiro Marcos'), 'male');
  assert.equal(detectNpcGender('Jurista Mateus'), 'male');
  assert.equal(detectNpcGender('Tribuno Caio'), 'male');
  assert.equal(detectNpcGender('Juiz Valério'), 'male');
  assert.equal(detectNpcGender('Timoneiro Arthur'), 'male');

  // Verify Tradutora Beatriz exists in FICHAS and resolves to female
  const beatrizFichas = FICHAS.filter((f) => f.npcName.includes('Beatriz'));
  assert.ok(beatrizFichas.length >= 1, 'Expected Beatriz NPC(s) in FICHAS');
  for (const f of beatrizFichas) {
    assert.equal(detectNpcGender(f.npcName), 'female', `Expected ${f.npcName} to be female`);
  }

  // Every building host resolves cleanly
  for (const spec of Object.values(BUILDING_INTERIORS)) {
    const g = detectNpcGender(spec.hostName);
    assert.ok(g === 'female' || g === 'male');
  }
});

test('getBaseGroundForTile blends props with their surrounding biome instead of green grass on sand or blue tiles', async () => {
  const { getBaseGroundForTile } = await import('../world/worldMap');
  const world = buildWorldData();

  // RFC Shipyard at (129, 50, w=6, h=4) has FlowerBed at (128, 53) on Porto Babel sand!
  assert.equal(world.tiles[53 * WORLD_W + 128], TileType.FlowerBed);
  assert.equal(getBaseGroundForTile(world.tiles, 128, 53), TileType.PortSand);

  // Porto Babel trees along x=111 on sand must inherit PortSand (NOT GrassToga!)
  assert.equal(world.tiles[24 * WORLD_W + 111], TileType.TownTree);
  assert.equal(getBaseGroundForTile(world.tiles, 111, 24), TileType.PortSand);

  // Cidadela do Conselho hedges & flowerbeds on CastleFloor must inherit CastleFloor
  assert.equal(world.tiles[12 * WORLD_W + 59], TileType.HedgeWall);
  assert.equal(getBaseGroundForTile(world.tiles, 59, 12), TileType.CastleFloor);
  assert.equal(world.tiles[13 * WORLD_W + 103], TileType.FlowerBed);
  assert.equal(getBaseGroundForTile(world.tiles, 103, 13), TileType.CastleFloor);

  // Montanhas da Infra CrystalShrine & ServerRack must inherit MountainStone or CableFloor (NEVER ForestGrass!)
  assert.equal(world.tiles[132 * WORLD_W + 129], TileType.CrystalShrine);
  const shrineBase = getBaseGroundForTile(world.tiles, 129, 132);
  assert.ok(
    shrineBase === TileType.CableFloor || shrineBase === TileType.MountainStone,
    `Expected CableFloor/MountainStone under Montanhas CrystalShrine, got ${shrineBase}`
  );
});

test('all 28 named buildings have interior specs, walkable front doorsteps, and valid interactive decks/quests', async () => {
  const {
    buildBuildingChallengeDeck,
    evaluateBuildingSecret,
    getAvailableStudyPoints,
    getBuildingInteriorSpec,
  } = await import('./buildings');
  const world = buildWorldData();
  const state = createInitialSaveState('dupla');

  const namedBuildings = world.buildings.filter((b) => Boolean(b.label));
  assert.equal(namedBuildings.length, 28, `Expected 28 named buildings, got ${namedBuildings.length}`);
  assert.ok(getAvailableStudyPoints(state) >= 30, 'Expected welcome study points stipend');

  for (const b of namedBuildings) {
    const spec = getBuildingInteriorSpec(b.label);
    assert.ok(spec, `Missing BuildingInteriorSpec for "${b.label}" (id=${b.id})`);

    // Doorstep directly south of door must be walkable and unobstructed by NPCs!
    const doorstepTile = world.tiles[(b.doorY + 1) * WORLD_W + b.doorX] as TileType;
    assert.equal(
      isSolidTile(doorstepTile),
      false,
      `Doorstep (${b.doorX},${b.doorY + 1}) for "${b.label}" is solid tile ${doorstepTile}`
    );

    if (spec.fnType === 'challenge') {
      const deck = buildBuildingChallengeDeck(spec, state);
      assert.equal(deck.length, 3, `Challenge building "${b.label}" should generate 3 questions`);
    }
    if (spec.fnType === 'secret') {
      const prog = evaluateBuildingSecret(spec, state);
      assert.ok(prog.target >= 1);
      assert.equal(prog.claimed, false);
    }
  }
});

test('Final Fantasy battle formations spawn 3 mobs, 2 knights/minibosses, 1 solo boss, 1 NPC rival, and have backdrops for all 6 regions', async () => {
  const {
    BATTLE_BACKDROPS,
    buildBattleCallout,
    buildBattleFormation,
    computeSquadStates,
    getFormationSummaryLabel,
  } = await import('./battleFormation');
  const world = buildWorldData();

  // All 6 regions have bespoke battle backdrops
  for (const r of REGIONS) {
    const bg = BATTLE_BACKDROPS[r.id];
    assert.ok(bg, `Missing battle backdrop for ${r.id}`);
    assert.ok(bg.imageUrl.startsWith('/src/assets/images/battle_bg_'), `Invalid backdrop URL for ${r.id}`);
  }

  // Standard goblin/slime spawns 3 squad units
  const goblin = world.enemies.find((e) => !e.isBoss && !e.isMiniBoss && e.sprite === 'goblin')!;
  assert.ok(goblin);
  const goblinSquad = buildBattleFormation(goblin, 3);
  assert.equal(goblinSquad.length, 3);
  assert.equal(getFormationSummaryLabel(goblin, goblinSquad).startsWith('3× '), true);

  // Answering 1, 2, 3 questions knocks out goblins sequentially
  const s0 = computeSquadStates(goblinSquad, 0);
  assert.equal(s0.livingCount, 3);
  assert.equal(s0.activeTargetIndex, 0);

  const s1 = computeSquadStates(goblinSquad, 1);
  assert.equal(s1.livingCount, 2);
  assert.equal(s1.units[0].defeated, true);
  assert.equal(s1.activeTargetIndex, 1);
  assert.equal(s1.lastHitWasKo, true);

  const s3 = computeSquadStates(goblinSquad, 3);
  assert.equal(s3.livingCount, 0);
  assert.equal(s3.activeTargetIndex, -1);

  // Heavy knight / mini-boss spawns 2 elite units
  const knight = world.enemies.find((e) => !e.isBoss && e.sprite === 'knight')!;
  assert.ok(knight);
  const knightSquad = buildBattleFormation(knight, 4);
  assert.equal(knightSquad.length, 2);
  assert.equal(knightSquad[0].maxHp + knightSquad[1].maxHp, 4);

  // Region Boss spawns 1 solo giant boss
  const boss = world.enemies.find((e) => e.isBoss)!;
  assert.ok(boss);
  const bossSquad = buildBattleFormation(boss, 6);
  assert.equal(bossSquad.length, 1);
  assert.equal(bossSquad[0].scale, 'boss');
  assert.equal(bossSquad[0].maxHp, 6);

  // NPC duel spawns 1 solo rival
  const npcDuel = { ...goblin, isNpcDuel: true, nome: 'Tradutora Beatriz' };
  const npcSquad = buildBattleFormation(npcDuel, 4);
  assert.equal(npcSquad.length, 1);
  assert.equal(npcSquad[0].scale, 'npc');

  // Speech bubble callout works for asking, correct, wrong, shield, and item
  const q = QUESTIONS[0];
  const askBubble = buildBattleCallout({ enemy: goblin, question: q, qIdx: 0, squad: s0, phase: 'asking' });
  assert.equal(askBubble.speaker, 'enemy');
  assert.ok(askBubble.text.length > 5);

  const winBubble = buildBattleCallout({ enemy: goblin, question: q, qIdx: 0, squad: s1, phase: 'correct' });
  assert.equal(winBubble.speaker, 'hero');
  assert.equal(winBubble.tone, 'ko');

  const itemBubble = buildBattleCallout({
    enemy: goblin,
    question: q,
    qIdx: 0,
    squad: s0,
    phase: 'item',
    usedItem: 'pocao_dica',
  });
  assert.equal(itemBubble.speaker, 'lumina');
  assert.equal(itemBubble.tone, 'hint');

  const blockBubble = buildBattleCallout({
    enemy: goblin,
    question: q,
    qIdx: 0,
    squad: s0,
    phase: 'enemy-block',
  });
  assert.equal(blockBubble.speaker, 'enemy');
  assert.equal(blockBubble.tone, 'block');
  assert.ok(blockBubble.text.length > 5);

  const encourageBubble = buildBattleCallout({
    enemy: goblin,
    question: q,
    qIdx: 0,
    squad: s0,
    phase: 'lumina-encourage',
  });
  assert.equal(encourageBubble.speaker, 'lumina');
  assert.equal(encourageBubble.tone, 'encourage');
  assert.ok(encourageBubble.text.length > 5);
});

test('every region has its own central fountain and a walkable, unobstructed defeat respawn spot beside it', async () => {
  const { buildWorldData, getRegionAt, getRegionFountainRespawn, isSolidTile, TileType, WORLD_W } = await import(
    '../world/worldMap'
  );
  const world = buildWorldData();

  for (const region of REGIONS) {
    const respawn = getRegionFountainRespawn(region.id);
    assert.equal(respawn.region.id, region.id, `Respawn region mismatch for ${region.id}`);
    assert.equal(
      getRegionAt(respawn.x, respawn.y).id,
      region.id,
      `Respawn (${respawn.x},${respawn.y}) must lie inside ${region.id}`
    );

    const tile = world.tiles[respawn.y * WORLD_W + respawn.x] as typeof TileType[keyof typeof TileType];
    assert.equal(isSolidTile(tile), false, `Respawn tile (${respawn.x},${respawn.y}) in ${region.id} must be walkable`);

    // Must have the central fountain stamped right nearby (within 5 tiles)
    const hasFountain = world.fountains.some(
      (f) => f.x === respawn.fountainX && f.y === respawn.fountainY && Math.hypot(f.x - respawn.x, f.y - respawn.y) <= 6
    );
    assert.ok(hasFountain, `Central fountain missing near respawn in ${region.id}`);

    // No enemy should stand directly on top of the restoration spot
    const overlappingEnemy = world.enemies.find((e) => e.x === respawn.x && e.y === respawn.y);
    assert.equal(overlappingEnemy, undefined, `Enemy overlapped respawn spot in ${region.id}`);
  }
});



