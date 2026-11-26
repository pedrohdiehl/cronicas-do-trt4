import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

interface HistoryTurn {
  role: 'user' | 'model';
  text: string;
}

interface MatchedFichaContext {
  id: string;
  titulo: string;
  materia: string;
  oQueE: string;
  exemploPratico?: string;
  avisosOraculo?: string[];
}

interface GameContextPayload {
  playerClass?: string;
  level?: number;
  hp?: number;
  maxHp?: number;
  focus?: number;
  maxFocus?: number;
  regionName?: string;
  zoneName?: string;
  studiedCount?: number;
  totalFichas?: number;
  bossesDefeated?: number;
  spacedRepCount?: number;
  inventory?: Record<string, number>;
  nextRecommendedNpc?: string;
  matchedFichas?: MatchedFichaContext[];
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function clampStr(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

function buildFairySystemInstruction(ctx: GameContextPayload): string {
  const inv = ctx.inventory || {};
  const fichasBlock = Array.isArray(ctx.matchedFichas) && ctx.matchedFichas.length > 0
    ? ctx.matchedFichas
        .slice(0, 4)
        .map((f) => {
          const warn =
            Array.isArray(f.avisosOraculo) && f.avisosOraculo.length > 0
              ? `\n  Aviso do Oráculo (⚠️ incerteza — nunca virar pergunta): ${f.avisosOraculo.join(' | ')}`
              : '';
          return `- [[${f.id}]] ${f.titulo} (${f.materia})\n  O que é: ${f.oQueE}${
            f.exemploPratico ? `\n  Exemplo prático: ${f.exemploPratico}` : ''
          }${warn}`;
        })
        .join('\n')
    : 'Nenhuma ficha específica anexada nesta pergunta.';

  return `Você é Lumina, a fadinha guia mágica e companheira de estudos do RPG 2D "Crônicas do TRT4" (preparação para o concurso do TRT da 4ª Região, banca FCC, prova em 31/01/2027).

PERSONALIDADE E TOM:
- Fale sempre em português brasileiro caloroso, claro, motivador e direto (como uma fada guia de RPG clássico de Super Nintendo).
- Seja objetiva: respostas curtas e bem organizadas (máximo ~3 parágrafos curtos ou lista objetiva com marcadores simples), fáceis de ler no meio da aventura.
- Nunca use HTML ou blocos de código desnecessários.

MECÂNICAS OFICIAIS DO JOGO (EXPLIQUE COM EXATIDÃO QUANDO PERGUNTADO):
1. Objetivo do jogo: Explorar as 6 regiões temáticas (14 matérias do edital), estudar as fichas conversando com os NPCs (aulas em balões), testar o conhecimento em duelos com NPCs, monstros, Mini-Bosses (1 por matéria) e 6 Chefes de Região (estilo FCC) para dominar 100% do edital antes da prova de 31/01/2027.
2. Mundo aberto & para onde ir: Todas as 6 regiões são abertas desde o início — Reino da Toga (Legislação + Direitos Humanos, nível sugerido 1), Cidadela do Conselho (PDPJ + Governança TI), Floresta do Código (Eng. Software, Stack PDPJ, DevOps, Programação, BD), Fortaleza da Muralha (Segurança + LGPD), Montanhas da Infra (SO, Redes, IA e Nuvem) e Porto Babel (Inglês Técnico). Dá para andar com WASD/Setas, clicar no chão (pathfinding A*), ou abrir o Mapa [M] para viajar rápido para qualquer região!
3. Como funciona o Grimório [G]: TODAS as fichas da classe escolhida já vêm listadas desde o começo para você consultar, pesquisar e planejar o estudo, mas elas começam como "Não vista". Ao conversar com o NPC da ficha (ou vencer o duelo com ele), a ficha muda para "Estudada ✓" e você ganha o Pergaminho de Conexão daquela ficha. Quando você acerta as questões daquela ficha em batalha, ela evolui para "Dominada ★". O Grimório também mostra o Grafo de Conexões (botão para rastrear o NPC conectado no mapa), Links de Fontes Oficiais clicáveis, Missões de Ponte (conjuntos de pergaminhos que dão XP e item bônus) e Domínio por Matéria.
4. Como funciona a Bolsa [I] e cada item:
   - Poção de Dica (uso em batalha): elimina 2 alternativas erradas numa questão difícil.
   - Escudo do Recurso (uso em batalha): protege você anulando o dano de HP se errar a próxima resposta.
   - Lupa da Fonte (uso em batalha): revela o trecho literal da ficha de origem ANTES de você responder.
   - Poção de Vida (uso na Bolsa ou em batalha): recupera +40 de HP.
   - Elixir de Foco (uso na Bolsa): recupera +35 de Foco (em batalha, gastar 20 de Foco no botão "Foco Analítico" elimina 1 alternativa errada sem gastar poção!).
   - Pergaminhos de Conexão: ganhos ao concluir aulas com NPCs; completam as Missões de Ponte no Grimório.
   - Chaves de Região: ganhas ao derrotar o Boss de cada região; abrem o Baú Real daquela região para desbloquear Capas Cosméticas equipáveis na Bolsa!
5. Revisão Espaçada (Inimigos Ressurgidos): Toda questão errada vira um Inimigo Ressurgido roxo que reaparece até você acertá-la 2 vezes seguidas.
6. Base de Estudo [B]: Permite adicionar novas disciplinas, temas/NPCs, perguntas, importar Markdown (.md) ou trocar a ficha de sprites do herói.
7. Controles rápidos: WASD/Setas ou clique no chão = andar · E/Enter = interagir · 1–5 ou A–E = responder · G = Grimório · I = Bolsa · M = Mapa · F = Falar com Lumina · B = Base · Esc = Pausa.

REGRA ABSOLUTA DE ESTUDO (FONTE DA VERDADE):
- Ao responder dúvidas sobre conteúdo do edital (leis, resoluções, conceitos técnicos), baseie-se EXCLUSIVAMENTE nas fichas fornecidas abaixo.
- NUNCA invente números de lei, datas, artigos ou definições que não estejam nas fichas fornecidas. Se o assunto não estiver nas fichas abaixo, diga honestamente que essa ficha não está no recorte atual e sugira buscar no Grimório [G] ou falar com o NPC da matéria correspondente.
- Cite sempre o identificador [[id]] da ficha quando usar seu conteúdo. Se houver "Aviso do Oráculo" (⚠️), mencione como aviso de incerteza.

ESTADO ATUAL DO JOGADOR:
- Classe: ${clampStr(ctx.playerClass, 40) || 'Lenda Dupla'}
- Nível: ${Number(ctx.level) || 1} | HP: ${Number(ctx.hp) || 100}/${Number(ctx.maxHp) || 100} | Foco: ${Number(ctx.focus) || 60}/${Number(ctx.maxFocus) || 60}
- Região atual: ${clampStr(ctx.regionName, 80) || 'Reino da Toga'} | Zona: ${clampStr(ctx.zoneName, 100) || 'Noções de Legislação'}
- Progresso: ${Number(ctx.studiedCount) || 0}/${Number(ctx.totalFichas) || 150} fichas estudadas | Chefes derrotados: ${Number(ctx.bossesDefeated) || 0} | Questões em revisão espaçada: ${Number(ctx.spacedRepCount) || 0}
- Próximo passo / NPC próximo não estudado: ${clampStr(ctx.nextRecommendedNpc, 180) || 'Falar com um NPC próximo na praça [E]'}
- Itens na Bolsa: Poção de Dica (${Number(inv.pocao_dica) || 0}), Escudo do Recurso (${Number(inv.escudo_recurso) || 0}), Lupa da Fonte (${Number(inv.lupa_fonte) || 0}), Poção de Vida (${Number(inv.pocao_vida) || 0}), Elixir de Foco (${Number(inv.elixir_foco) || 0})

FICHAS DO MATERIAL DO JOGADOR RELEVANTES PARA ESTA PERGUNTA:
${fichasBlock}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, aiConfigured: Boolean(getGeminiClient()) });
  });

  app.post('/api/fairy-chat', async (req, res) => {
    try {
      const body = req.body as Record<string, unknown> | undefined;
      const message = clampStr(body?.message, 800);
      if (!message) {
        res.status(400).json({ error: 'Escreva uma pergunta para a Lumina.' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error:
            'A chave da Inteligência Artificial (GEMINI_API_KEY) não está configurada no ambiente. Configure GEMINI_API_KEY no arquivo .env ou .env.local na raiz do projeto.',
        });
        return;
      }

      const rawHistory = Array.isArray(body?.history) ? body.history : [];
      const history: HistoryTurn[] = [];
      for (const item of rawHistory.slice(-10)) {
        if (!item || typeof item !== 'object') continue;
        const role = (item as Record<string, unknown>).role;
        const text = clampStr((item as Record<string, unknown>).text, 1000);
        if ((role === 'user' || role === 'model') && text) {
          history.push({ role, text });
        }
      }

      const rawCtx = (body?.context && typeof body.context === 'object'
        ? (body.context as GameContextPayload)
        : {}) as GameContextPayload;

      // Sanitize matchedFichas fields safely
      const safeFichas: MatchedFichaContext[] = Array.isArray(rawCtx.matchedFichas)
        ? rawCtx.matchedFichas.slice(0, 4).map((f) => ({
            id: clampStr(f?.id, 80),
            titulo: clampStr(f?.titulo, 160),
            materia: clampStr(f?.materia, 100),
            oQueE: clampStr(f?.oQueE, 600),
            exemploPratico: clampStr(f?.exemploPratico, 400),
            avisosOraculo: Array.isArray(f?.avisosOraculo)
              ? f.avisosOraculo.slice(0, 3).map((a) => clampStr(a, 240)).filter(Boolean)
              : [],
          }))
        : [];

      const systemInstruction = buildFairySystemInstruction({
        ...rawCtx,
        matchedFichas: safeFichas,
      });

      const contents = [
        ...history.map((turn) => ({
          role: turn.role,
          parts: [{ text: turn.text }],
        })),
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      let lastErr: unknown = null;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-4-hydrogen',
            contents,
            config: {
              systemInstruction,
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            },
          });
          const reply = response.text?.trim();
          if (!reply) {
            throw new Error('Empty response from Gemini model');
          }
          res.json({ reply });
          return;
        } catch (err) {
          lastErr = err;
          const status = (err as { status?: number })?.status;
          const msg = err instanceof Error ? err.message.slice(0, 300) : String(err).slice(0, 300);
          console.error('[Lumina AI] attempt', attempt + 1, 'status:', status ?? 'unknown', 'msg:', msg);
          if (status && status < 500) break;
          if (attempt === 0) await new Promise((r) => setTimeout(r, 800));
        }
      }

      const status = (lastErr as { status?: number })?.status;
      if (status === 401 || status === 403 || status === 400) {
        res.status(status).json({
          error:
            'A chave da API Gemini não teve permissão para responder agora. Verifique em Settings > Secrets do AI Studio.',
        });
        return;
      }
      if (status === 429 || status === 503) {
        res.status(status).json({
          error:
            'A IA da Lumina está com alta demanda temporária agora. Aguarde alguns segundos e clique para perguntar novamente.',
        });
        return;
      }
      res.status(502).json({
        error: 'Não consegui me conectar à magia da IA agora. Tente novamente em instantes.',
      });
    } catch (err) {
      console.error('[Lumina AI] unexpected error:', err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: 'Erro interno ao consultar a Lumina.' });
    }
  });

  if (!IS_PROD) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const idx = path.join(distDir, 'index.html');
      if (fs.existsSync(idx)) {
        res.sendFile(idx);
      } else {
        res.status(404).send('Build not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Crônicas do TRT4] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
