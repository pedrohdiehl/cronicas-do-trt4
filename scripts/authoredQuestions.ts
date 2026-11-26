/**
 * Questões autorais: escritas à mão em conteudo/questoes/<NN-materia>/nivel-N[-assunto].yaml.
 *
 * Formato e regras vêm do projeto anterior (RPG de mesa). Cada questão cita, em `evidencia`,
 * o trecho exato da ficha que sustenta o gabarito. Este arquivo confere isso e converte
 * as questões para o formato do jogo. Uma questão inválida trava a geração, com a mensagem
 * dizendo arquivo, questão e o que corrigir.
 *
 * Associação (com pares) e ordenação são validadas, mas ainda não entram no jogo:
 * a tela de batalha só sabe mostrar uma alternativa por vez.
 */
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import type { CargoScope, Ficha, Question } from '../src/types';

export const AUTHORED_DIR = path.resolve(process.cwd(), 'conteudo/questoes');

type CargoYaml = 'ambos' | 'tec' | 'ana';
const CARGO_DO_JOGO: Record<CargoYaml, CargoScope> = { ambos: 'ambos', tec: 'tecnico', ana: 'analista' };
const CARGO_DO_YAML: Record<CargoScope, CargoYaml> = { ambos: 'ambos', tecnico: 'tec', analista: 'ana' };

const TIPOS = ['multipla', 'certo-errado', 'associacao', 'ordenacao'] as const;
const CAMPOS_RESPOSTA: Record<string, string[]> = {
  multipla: ['alternativas', 'correta'],
  'certo-errado': ['correta'],
  associacao: ['pares'],
  ordenacao: ['passos'],
};
const CAMPOS_CONHECIDOS = new Set([
  'id', 'tipo', 'fichas', 'nivel', 'cargo', 'origem', 'fcc', 'enunciado', 'explicacoes', 'evidencia',
  'alternativas', 'correta', 'pares', 'passos',
]);
/** Na associação e na ordenação. Com 2, acertar seria cara ou coroa. */
const LUGARES = { minimo: 3, maximo: 6 };

const ehTexto = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';
const temRepetidos = (l: readonly string[]) => new Set(l.map((a) => a.trim().toLowerCase())).size !== l.length;

export interface AuthoredResult {
  /** Prontas para o jogo. */
  questions: Question[];
  /** Válidas, mas de tipo que o jogo ainda não mostra (associação com pares, ordenação). */
  pendentes: { id: string; tipo: string; arquivo: string }[];
  erros: string[];
  /** Arquivos lidos, por matéria. */
  arquivos: number;
}

/**
 * Linhas da ficha com seu contexto: uma linha herda ⚠️ e marcas de cargo (🔵/🟣)
 * dos itens de lista que a contêm.
 */
export function linhasComContexto(corpo: string): { linha: string; aviso: boolean; cargo: CargoYaml }[] {
  const pilha: { recuo: number; texto: string }[] = [];
  return corpo.split(/\r?\n/).map((linha) => {
    const recuo = linha.length - linha.trimStart().length;
    if (/^#{1,6} /.test(linha)) {
      pilha.length = 0;
      pilha.push({ recuo: -1, texto: linha });
    } else if (linha.trim()) {
      while (pilha.length && pilha[pilha.length - 1].recuo >= recuo) pilha.pop();
      pilha.push({ recuo, texto: linha });
    }
    const contexto = pilha.map((p) => p.texto).join(' ');
    const marcas = [/🔵/u.test(contexto) && 'tec', /🟣/u.test(contexto) && 'ana'].filter(Boolean) as CargoYaml[];
    return { linha, aviso: contexto.includes('⚠️'), cargo: marcas.length === 1 ? marcas[0] : 'ambos' };
  });
}

/** Lê e valida todas as questões autorais. `fichas` são as fichas já lidas dos MDs. */
export function loadAuthoredQuestions(fichas: Ficha[], dir: string = AUTHORED_DIR): AuthoredResult {
  const result: AuthoredResult = { questions: [], pendentes: [], erros: [], arquivos: 0 };
  if (!fs.existsSync(dir)) return result;

  const porId = new Map(fichas.map((f) => [f.id, f]));
  const idsVistos = new Map<string, string>();

  const pastas = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const pasta of pastas) {
    const prefixo = pasta.match(/^(\d{2})-/)?.[1];
    if (!prefixo) {
      result.erros.push(`${pasta}: o nome da pasta precisa começar pelos dois números da matéria, como 06-seguranca`);
      continue;
    }
    const arquivos = fs
      .readdirSync(path.join(dir, pasta))
      .filter((a) => a.endsWith('.yaml'))
      .sort();

    for (const arquivo of arquivos) {
      const onde = `${pasta}/${arquivo}`;
      const nivelArquivo = Number(arquivo.match(/^nivel-([1-5])(-[a-z0-9-]+)?\.yaml$/)?.[1]);
      if (!nivelArquivo) {
        result.erros.push(`${onde}: o nome do arquivo precisa ser nivel-N.yaml ou nivel-N-assunto.yaml, com N de 1 a 5`);
        continue;
      }
      result.arquivos += 1;

      let brutas: unknown;
      try {
        brutas = YAML.parse(fs.readFileSync(path.join(dir, pasta, arquivo), 'utf8'));
      } catch (err) {
        result.erros.push(`${onde}: YAML inválido — ${err instanceof Error ? err.message.split('\n')[0] : String(err)}`);
        continue;
      }
      if (!Array.isArray(brutas)) {
        result.erros.push(`${onde}: o arquivo precisa ser uma lista de questões, cada uma começando por "- id: ..."`);
        continue;
      }

      brutas.forEach((p: any, k: number) => {
        const nome = ehTexto(p?.id) ? p.id : `#${k + 1}`;
        const meus: string[] = [];
        const falha = (m: string) => meus.push(`${onde} › ${nome}: ${m}`);

        // --- Campos comuns -------------------------------------------------------------
        if (!ehTexto(p?.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) {
          falha('id precisa ser minúsculas-com-hífens, como seg-backup-001');
        } else if (idsVistos.has(p.id)) {
          falha(`id repetido (também em ${idsVistos.get(p.id)}). Use um id novo; nunca mude o de uma questão antiga`);
        } else {
          idsVistos.set(p.id, onde);
        }
        if (p && typeof p === 'object') {
          for (const campo of Object.keys(p)) {
            if (!CAMPOS_CONHECIDOS.has(campo)) falha(`campo desconhecido "${campo}". Apague ou confira a grafia`);
          }
        }
        if (!ehTexto(p?.enunciado)) falha('falta o enunciado');
        if (p?.nivel !== nivelArquivo) falha(`nivel precisa ser ${nivelArquivo}, como no nome do arquivo`);
        if (!['ambos', 'tec', 'ana'].includes(p?.cargo)) falha('cargo precisa ser ambos, tec (🔵) ou ana (🟣)');
        if (p?.origem !== 'autoral') {
          falha(
            p?.origem === 'fcc'
              ? 'questões da FCC ainda não são aceitas aqui; use o importador de prova real do jogo'
              : 'origem precisa ser autoral'
          );
        }

        // --- Resposta, conforme o tipo ---------------------------------------------------
        const tipo: string = p?.tipo ?? 'multipla';
        let alternativas: string[] = [];
        let correta = -1;
        let lugares = 0;
        if (!(TIPOS as readonly string[]).includes(tipo)) {
          falha(`tipo precisa ser ${TIPOS.filter((t) => t !== 'multipla').join(', ')} ou nenhum (múltipla escolha)`);
        } else {
          for (const campo of ['alternativas', 'correta', 'pares', 'passos']) {
            if (p?.[campo] !== undefined && !CAMPOS_RESPOSTA[tipo].includes(campo)) {
              falha(`${campo} não existe em questão do tipo ${tipo}`);
            }
          }
          if (tipo === 'certo-errado') {
            if (p.correta !== 'certo' && p.correta !== 'errado') falha('correta precisa ser certo ou errado');
            alternativas = ['Certo', 'Errado'];
            correta = p.correta === 'certo' ? 0 : 1;
            lugares = 2;
          } else if (tipo === 'associacao') {
            const pares = p.pares;
            if (
              !Array.isArray(pares) ||
              pares.length < LUGARES.minimo ||
              pares.length > LUGARES.maximo ||
              !pares.every((x: any) => ehTexto(x?.item) && ehTexto(x?.par))
            ) {
              falha(`pares precisa ter de ${LUGARES.minimo} a ${LUGARES.maximo} itens { item, par }`);
            } else {
              if (temRepetidos(pares.map((x: any) => x.item))) falha('pares tem itens repetidos');
              if (temRepetidos(pares.map((x: any) => x.par))) falha('pares tem pares repetidos');
              lugares = pares.length;
            }
          } else if (tipo === 'ordenacao') {
            const passos = p.passos;
            if (!Array.isArray(passos) || passos.length < LUGARES.minimo || passos.length > LUGARES.maximo || !passos.every(ehTexto)) {
              falha(`passos precisa ter de ${LUGARES.minimo} a ${LUGARES.maximo} textos, na ordem certa`);
            } else {
              if (temRepetidos(passos)) falha('passos tem textos repetidos');
              lugares = passos.length;
            }
          } else {
            const alt = p?.alternativas;
            if (!Array.isArray(alt) || alt.length < 2 || alt.length > 5 || !alt.every(ehTexto)) {
              falha('alternativas precisam ser de 2 a 5 textos (número vai entre aspas)');
            } else {
              if (temRepetidos(alt)) falha('há alternativas repetidas');
              if (!Number.isInteger(p.correta) || p.correta < 0 || p.correta >= alt.length) {
                falha(`correta precisa ser um número de 0 a ${alt.length - 1} (a primeira alternativa é 0)`);
              }
              alternativas = alt.map((a: string) => a.trim());
              correta = p.correta;
              lugares = alt.length;
            }
          }
          if (lugares > 0) {
            const ex = p?.explicacoes;
            if (!Array.isArray(ex) || ex.length !== lugares || !ex.every(ehTexto)) {
              falha(`explicacoes precisa ter ${lugares} textos, um por ${tipo === 'associacao' ? 'par' : tipo === 'ordenacao' ? 'passo' : 'alternativa'}`);
            }
          }
        }

        // --- Fichas -----------------------------------------------------------------------
        const idsFicha: unknown[] = Array.isArray(p?.fichas) ? p.fichas : [];
        if (!idsFicha.length) falha('fichas precisa ter pelo menos um id, como fichas: [owasp]');
        const alvos: Ficha[] = [];
        for (const id of idsFicha) {
          const f = typeof id === 'string' ? porId.get(id) : undefined;
          if (!f) {
            falha(`ficha inexistente "${String(id)}". Use o id principal, o que está entre [[ ]] no título da ficha`);
            continue;
          }
          alvos.push(f);
          if (f.fontes.length === 0) falha(`a ficha "${f.id}" não tem fontes; ela não pode sustentar gabarito`);
          if (f.cargo !== 'ambos' && p?.cargo !== CARGO_DO_YAML[f.cargo]) {
            falha(`a ficha "${f.id}" é só ${CARGO_DO_YAML[f.cargo]}; escreva cargo: ${CARGO_DO_YAML[f.cargo]}`);
          }
        }
        if (alvos.length && !alvos.some((f) => f.zonaId.startsWith(`${prefixo}-`))) {
          falha(`nenhuma ficha é da matéria ${prefixo}; use ao menos uma ficha dela ou mova a questão de pasta`);
        }

        // --- Evidência: trecho exato da ficha, sem ⚠️ e do cargo certo -----------------
        const varios = Array.isArray(p?.evidencia) && (tipo === 'associacao' || tipo === 'ordenacao');
        const trechos: unknown[] = varios ? p.evidencia : [p?.evidencia];
        const linhas = alvos.flatMap((f) => linhasComContexto(f.textoCompleto));
        for (const t of trechos) {
          const qual = varios ? ` ("${String(t)}")` : '';
          if (!ehTexto(t) || t.trim().length < 10) {
            falha(`evidencia precisa ter pelo menos 10 caracteres${qual}`);
            continue;
          }
          if (!alvos.length) continue;
          const achadas = linhas.filter((l) => l.linha.includes(t.trim()));
          const firmes = achadas.filter((l) => !l.aviso);
          if (!achadas.length) {
            falha(`evidencia não aparece em nenhuma linha da ficha${qual}. Copie o trecho exatamente como está no MD, com os ** e tudo`);
          } else if (!firmes.length) {
            falha(`evidencia está num trecho com ⚠️ e não pode sustentar gabarito${qual}`);
          } else if (!firmes.some((l) => l.cargo === 'ambos' || l.cargo === p?.cargo)) {
            falha(`evidencia está num trecho só ${firmes[0].cargo}; escreva cargo: ${firmes[0].cargo}${qual}`);
          }
        }

        if (meus.length) {
          result.erros.push(...meus);
          return;
        }

        if (tipo === 'associacao' || tipo === 'ordenacao') {
          result.pendentes.push({ id: p.id, tipo, arquivo: onde });
          return;
        }

        const principal = alvos[0];
        result.questions.push({
          id: p.id,
          fichaId: principal.id,
          fichaTitulo: principal.titulo,
          zonaId: principal.zonaId,
          regiaoId: principal.regiaoId,
          cargo: CARGO_DO_JOGO[p.cargo as CargoYaml],
          tipo: tipo === 'certo-errado' ? 'certo_errado' : 'multipla_escolha',
          enunciado: p.enunciado.trim(),
          alternativas,
          correta,
          trechoFonte: (p.evidencia as string).trim(),
          dificuldade: Math.min(3, p.nivel) as 1 | 2 | 3,
          // Nível 3 vai para mini-boss e chefe; níveis 1 e 2, para monstros comuns.
          ...(p.nivel >= 3 ? { isBossStyle: true } : {}),
          origem: 'autoral',
          explicacoes: (p.explicacoes as string[]).map((e) => e.trim()),
        });
      });
    }
  }

  return result;
}
