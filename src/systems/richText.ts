/**
 * Texto de questão real (FCC): só alguns destaques do original viram formatação.
 *
 * - <u>…</u>: o "termo sublinhado" que a questão cita;
 * - <mark>…</mark>: destaque do original;
 * - <sup>…</sup>: expoente;
 * - <br>, <p>, </p>: quebra de linha.
 *
 * Qualquer outra coisa entre < > é texto: muitas questões mostram código, como <stdio.h>,
 * <xs:element> ou até <script>, e isso precisa aparecer literalmente, nunca ser interpretado.
 */

export type RichTag = 'u' | 'mark' | 'sup';

export type RichToken =
  | { type: 'text'; text: string }
  | { type: 'open'; tag: RichTag }
  | { type: 'close'; tag: RichTag }
  | { type: 'br' };

const TAG = /<\s*(\/?)\s*(u|mark|sup|p|br)\s*\/?\s*>/gi;

export function tokenizeRichText(raw: string): RichToken[] {
  const tokens: RichToken[] = [];
  let last = 0;
  for (const m of raw.matchAll(TAG)) {
    const idx = m.index ?? 0;
    if (idx > last) tokens.push({ type: 'text', text: raw.slice(last, idx) });
    last = idx + m[0].length;
    const tag = m[2].toLowerCase();
    if (tag === 'br' || tag === 'p') {
      // <p> no começo do texto não precisa de quebra.
      if (!(tag === 'p' && m[1] !== '/' && tokens.length === 0)) tokens.push({ type: 'br' });
    } else {
      tokens.push({ type: m[1] === '/' ? 'close' : 'open', tag: tag as RichTag });
    }
  }
  if (last < raw.length) tokens.push({ type: 'text', text: raw.slice(last) });
  return tokens;
}

/** O mesmo texto sem nenhuma formatação, para resumos de uma linha. */
export function stripRichText(raw: string): string {
  return tokenizeRichText(raw)
    .map((t) => (t.type === 'text' ? t.text : t.type === 'br' ? ' ' : ''))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}
