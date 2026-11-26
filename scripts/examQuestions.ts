/**
 * Questões reais de prova (FCC, TRTs 2011–2025), de conteudo/provas/questoes.json.
 *
 * O banco é montado fora do jogo (pasta "Concurso TRT-4 TI/03-banco-de-questoes"):
 * enunciado e alternativas copiados sem alteração, gabarito oficial conferido contra os PDFs da FCC.
 * Cada questão traz `ids`, os mesmos [[id]] das fichas; o primeiro é o principal.
 *
 * Aqui só filtramos e convertemos. Nada do texto é mudado.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Ficha, ProvaInfo, Question } from '../src/types';

export const EXAM_BANK_FILE = path.resolve(process.cwd(), 'conteudo/provas/questoes.json');

interface RawExamQuestion {
  prova: string;
  trt: number;
  ano: number;
  nivel: 'tec' | 'ana';
  n: number;
  qid: string;
  ids: string[];
  escopo: string;
  assunto?: string;
  enunciado: string | null;
  alternativas: [string, string][];
  gabarito: string;
  figura: boolean;
}

interface RawBank {
  gerado_em: string;
  provas: Record<string, string>;
  questoes: RawExamQuestion[];
}

export interface ExamResult {
  questions: Question[];
  geradoEm: string | null;
  total: number;
  /** Motivo → quantidade de questões deixadas de fora. */
  fora: Record<string, number>;
}

const LETRAS = ['A', 'B', 'C', 'D', 'E'];
const ESCOPOS_USADOS = new Set(['edital', 'paralelo']);

function resumoDaFicha(f: Ficha): string {
  const candidatos = [f.oQueE, ...f.fatosChave, f.titulo];
  for (const c of candidatos) {
    const limpo = (c || '')
      .replace(/^(O que é|Definição oficial|Definição|O que são)[^:]*:\s*/i, '')
      .trim();
    if (limpo.length > 5 && !limpo.includes('⚠️')) return limpo;
  }
  return f.titulo;
}

export function loadExamQuestions(
  fichas: Ficha[],
  aliasMap: Record<string, string>,
  file: string = EXAM_BANK_FILE
): ExamResult {
  const result: ExamResult = { questions: [], geradoEm: null, total: 0, fora: {} };
  if (!fs.existsSync(file)) return result;

  const bank = JSON.parse(fs.readFileSync(file, 'utf8')) as RawBank;
  if (!bank || !Array.isArray(bank.questoes) || typeof bank.provas !== 'object') {
    throw new Error(`${file}: formato inesperado (faltam "provas" ou "questoes")`);
  }
  result.geradoEm = bank.gerado_em || null;
  result.total = bank.questoes.length;

  const porId = new Map(fichas.map((f) => [f.id, f]));
  const resolver = (id: string): Ficha | undefined => porId.get(id) ?? porId.get(aliasMap[id]);
  const deixar = (motivo: string) => {
    result.fora[motivo] = (result.fora[motivo] || 0) + 1;
  };
  const vistos = new Set<string>();

  for (const q of bank.questoes) {
    if (!q.enunciado) {
      deixar('sem enunciado (prova só indexada)');
      continue;
    }
    if (q.figura || q.enunciado.includes('🖼️')) {
      deixar('depende de figura');
      continue;
    }
    if (!LETRAS.includes(q.gabarito)) {
      deixar('anulada ou sem gabarito');
      continue;
    }
    if (!ESCOPOS_USADOS.has(q.escopo)) {
      deixar(`escopo "${q.escopo}"`);
      continue;
    }
    const principal = q.ids?.[0];
    if (!principal) {
      deixar('sem ficha ligada');
      continue;
    }
    if (principal.startsWith('pt-')) {
      deixar('Português (sem região no jogo)');
      continue;
    }
    if (principal.startsWith('rlm-')) {
      deixar('Raciocínio lógico (sem região no jogo)');
      continue;
    }
    const ficha = resolver(principal);
    if (!ficha) {
      deixar('ficha principal não existe no jogo');
      continue;
    }
    if (!Array.isArray(q.alternativas) || q.alternativas.length !== 5) {
      deixar('não tem 5 alternativas');
      continue;
    }
    const alternativas = q.alternativas.map((a) => String(a[1] ?? '').trim());
    if (alternativas.some((a) => !a)) {
      deixar('alternativa vazia');
      continue;
    }
    const chave = [q.enunciado, ...alternativas].map((t) => t.replace(/\s+/g, ' ').trim()).join('|');
    if (vistos.has(chave)) {
      deixar('repetida (mesma questão em outra prova)');
      continue;
    }
    vistos.add(chave);

    const label = bank.provas[q.prova] || q.prova;
    const outras = (q.ids || [])
      .slice(1)
      .map((id) => resolver(id)?.id)
      .filter((id): id is string => Boolean(id) && id !== ficha.id);
    const prova: ProvaInfo = {
      id: q.prova,
      label,
      numero: q.n,
      trt: q.trt,
      nivel: q.nivel,
      escopo: q.escopo as ProvaInfo['escopo'],
      qid: String(q.qid),
      outrasFichas: [...new Set(outras)],
    };

    result.questions.push({
      id: `fcc-${q.qid}`,
      fichaId: ficha.id,
      fichaTitulo: ficha.titulo,
      zonaId: ficha.zonaId,
      regiaoId: ficha.regiaoId,
      // Vale o cargo da ficha no edital do TRT-4 2026; o da prova de origem fica em `prova.nivel`.
      cargo: ficha.cargo,
      tipo: 'multipla_escolha',
      enunciado: q.enunciado.trim(),
      alternativas,
      correta: LETRAS.indexOf(q.gabarito),
      trechoFonte: resumoDaFicha(ficha),
      dificuldade: 3,
      // Regra de outro TRT: só treino (monstros e duelos), nunca mini-boss ou chefe.
      isBossStyle: q.escopo === 'edital',
      isRealExam: true,
      banca: 'FCC',
      ano: q.ano,
      orgao: `TRT-${q.trt}`,
      cargoProva: label.split(' · ')[2] || (q.nivel === 'tec' ? 'Técnico Judiciário – TI' : 'Analista Judiciário – TI'),
      prova,
    });
  }

  return result;
}
