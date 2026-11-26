/**
 * Pure Markdown-to-Apostila parser for study fichas and companion chat replies.
 * Zero external dependencies, zero HTML injection — produces typed AST nodes
 * rendered safely as React JSX.
 */

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; children: InlineToken[] }
  | { type: 'italic'; children: InlineToken[] }
  | { type: 'code'; text: string }
  | { type: 'link'; label: string; url: string }
  | { type: 'wikilink'; id: string };

export interface ListItemNode {
  depth: number;
  number?: string;
  tokens: InlineToken[];
}

export type ApostilaBlock =
  | { type: 'paragraph'; tokens: InlineToken[] }
  | { type: 'subheading'; text: string }
  | { type: 'list'; ordered: boolean; items: ListItemNode[] }
  | { type: 'table'; headers: InlineToken[][]; rows: InlineToken[][][] }
  | { type: 'code'; language: string; code: string }
  | { type: 'blockquote'; tokens: InlineToken[] }
  | { type: 'divider' };

export type ApostilaSectionKind =
  | 'lead'
  | 'topic'
  | 'example'
  | 'connections'
  | 'sources'
  | 'oracle';

export interface ApostilaSection {
  kind: ApostilaSectionKind;
  heading?: string;
  blocks: ApostilaBlock[];
}

export interface ParsedSourceLink {
  label: string;
  url: string;
}

export interface ApostilaDocument {
  sections: ApostilaSection[];
  inlineSources: ParsedSourceLink[];
  inlineOracleWarnings: string[];
}

export function isSafeHttpUrl(raw: string): boolean {
  const trimmed = raw.trim();
  return /^https?:\/\/[^\s<>"]+$/i.test(trimmed);
}

/**
 * Parses inline Markdown syntax (**bold**, *italic*, `code`, [label](url), [[id]])
 * into a safe token tree with no stray formatting symbols.
 */
export function parseInlineTokens(input: string, depth = 0): InlineToken[] {
  if (!input) return [];
  if (depth > 4) return [{ type: 'text', text: input }];

  const tokens: InlineToken[] = [];
  const pattern =
    /(\[\[([^\]]+)\]\])|(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([\s\S]+?)\*\*)|(`([^`\n]+)`)|(\*(?!\s)([^*\n]+?)(?<!\s)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: input.slice(lastIndex, match.index) });
    }

    if (match[1] && match[2]) {
      // [[ficha-id]]
      tokens.push({ type: 'wikilink', id: match[2].trim() });
    } else if (match[3] && match[4] && match[5]) {
      // [label](https://...)
      const url = match[5].trim();
      if (isSafeHttpUrl(url)) {
        tokens.push({ type: 'link', label: match[4].trim(), url });
      } else {
        tokens.push({ type: 'text', text: match[4].trim() });
      }
    } else if (match[6] && match[7] !== undefined) {
      // **bold**
      tokens.push({
        type: 'bold',
        children: parseInlineTokens(match[7], depth + 1),
      });
    } else if (match[8] && match[9] !== undefined) {
      // `inline code`
      tokens.push({ type: 'code', text: match[9] });
    } else if (match[10] && match[11] !== undefined) {
      // *italic*
      tokens.push({
        type: 'italic',
        children: parseInlineTokens(match[11], depth + 1),
      });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push({ type: 'text', text: input.slice(lastIndex) });
  }

  return tokens;
}

/**
 * Extracts plain text from an InlineToken tree (useful for tests & deduplication).
 */
export function inlineTokensToPlainText(tokens: InlineToken[]): string {
  return tokens
    .map((t) => {
      if (t.type === 'text' || t.type === 'code') return t.text;
      if (t.type === 'link') return t.label;
      if (t.type === 'wikilink') return t.id;
      return inlineTokensToPlainText(t.children);
    })
    .join('');
}

function classifyHeading(rawHeading: string): ApostilaSectionKind {
  const norm = rawHeading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (
    /^o que (e|sao)\b/.test(norm) ||
    /^definicao\b/.test(norm) ||
    /^ideia central\b/.test(norm) ||
    /— o que (e|sao)\b/.test(norm)
  ) {
    return 'lead';
  }
  if (/^exemplos?( praticos?)?\b/.test(norm)) {
    return 'example';
  }
  if (/^conex(ao|oes)\b/.test(norm) && !norm.includes('normativa')) {
    return 'connections';
  }
  if (/^fontes?\b/.test(norm) || /^referencias?\b/.test(norm)) {
    return 'sources';
  }
  return 'topic';
}

function isPipeRow(line: string): boolean {
  const t = line.trim();
  return t.startsWith('|') && t.endsWith('|') && t.length >= 3;
}

function isTableSeparatorRow(line: string): boolean {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c.trim()));
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((c) => c.trim());
}

function parseTable(lines: string[], startIdx: number): { block: ApostilaBlock; nextIdx: number } {
  const rawRows: string[][] = [];
  let idx = startIdx;
  while (idx < lines.length && isPipeRow(lines[idx])) {
    rawRows.push(splitTableRow(lines[idx]));
    idx++;
  }

  let headerCells: string[] = [];
  let bodyRows: string[][] = [];

  if (rawRows.length >= 2 && isTableSeparatorRow(lines[startIdx + 1])) {
    headerCells = rawRows[0];
    bodyRows = rawRows.slice(2);
  } else if (rawRows.length >= 2) {
    // Handles 2-row summary tables extracted from MD tables (e.g., carta-onu) without --- separator
    headerCells = rawRows[0];
    bodyRows = rawRows.slice(1);
  } else if (rawRows.length === 1) {
    bodyRows = rawRows;
  }

  return {
    block: {
      type: 'table',
      headers: headerCells.map((c) => parseInlineTokens(c)),
      rows: bodyRows.map((row) => row.map((c) => parseInlineTokens(c))),
    },
    nextIdx: idx,
  };
}

function extractLinksFromText(text: string): ParsedSourceLink[] {
  const links: ParsedSourceLink[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (isSafeHttpUrl(m[2])) {
      links.push({ label: m[1].trim(), url: m[2].trim() });
    }
  }
  return links;
}

/**
 * Splits a top-level bullet line like "- **Heading:** body" into heading + body.
 * Returns null if the bullet does not start with a bold section title.
 */
function parseTopLevelSectionBullet(line: string): { heading: string; body: string } | null {
  // Match "- **Title:** body" or "- **Title**: body" or "- **Title (art. 1º):** body"
  const m = line.match(/^[-*]\s+\*\*([^*\n]+?)\*\*\s*:?\s*(.*)$/);
  if (!m) return null;

  let heading = m[1].trim();
  const body = m[2].trim();

  // Only promote to a titled section if the original line had a colon right before or after **
  const hasColon = heading.endsWith(':') || /^[-*]\s+\*\*[^*\n]+?\*\*\s*:/.test(line);
  if (!hasColon) return null;

  heading = heading.replace(/:+\s*$/, '').trim();
  if (!heading) return null;

  return { heading, body };
}

/**
 * Parses a study ficha's Markdown (`textoCompleto`) into an editorial ApostilaDocument
 * with clear sections, properly indented nested lists, tables, code blocks, links,
 * clickable [[connections]], and separated Oracle warnings & sources.
 */
export function parseFichaApostila(markdown: string): ApostilaDocument {
  const rawLines = markdown.replace(/\r\n/g, '\n').split('\n');

  // Trim trailing empty lines and trailing horizontal rules ("---")
  while (rawLines.length > 0) {
    const tail = rawLines[rawLines.length - 1].trim();
    if (tail === '' || /^-{3,}$/.test(tail)) {
      rawLines.pop();
    } else {
      break;
    }
  }

  const sections: ApostilaSection[] = [];
  const inlineSources: ParsedSourceLink[] = [];
  const inlineOracleWarnings: string[] = [];

  let currentSection: ApostilaSection | null = null;

  const pushSection = (section: ApostilaSection) => {
    if (section.kind === 'sources') {
      // Collect links for footer instead of duplicating raw "Fontes:" line
      return;
    }
    if (section.kind === 'oracle') {
      return;
    }
    sections.push(section);
  };

  const ensureCurrentTopic = (): ApostilaSection => {
    if (!currentSection) {
      currentSection = { kind: 'topic', blocks: [] };
      sections.push(currentSection);
    }
    return currentSection;
  };

  const appendListItem = (target: ApostilaSection, ordered: boolean, item: ListItemNode) => {
    const last = target.blocks[target.blocks.length - 1];
    if (last && last.type === 'list' && last.ordered === ordered) {
      last.items.push(item);
    } else {
      target.blocks.push({ type: 'list', ordered, items: [item] });
    }
  };

  let i = 0;
  while (i < rawLines.length) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Skip blank lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal rule inside content
    if (/^-{3,}$/.test(trimmed)) {
      if (currentSection && currentSection.blocks.length > 0) {
        currentSection.blocks.push({ type: 'divider' });
      }
      i++;
      continue;
    }

    // Fenced code block (possibly indented inside a bullet)
    const fenceMatch = line.match(/^(\s*)```([a-zA-Z0-9_-]*)\s*$/);
    if (fenceMatch) {
      const baseIndent = fenceMatch[1].length;
      const language = fenceMatch[2] || 'texto';
      const codeLines: string[] = [];
      i++;
      while (i < rawLines.length && !/^\s*```\s*$/.test(rawLines[i])) {
        const rawCodeLine = rawLines[i];
        codeLines.push(
          rawCodeLine.startsWith(' '.repeat(baseIndent))
            ? rawCodeLine.slice(baseIndent)
            : rawCodeLine.trimStart()
        );
        i++;
      }
      if (i < rawLines.length) i++; // consume closing ```
      const target = ensureCurrentTopic();
      target.blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n'),
      });
      continue;
    }

    // Pipe table
    if (isPipeRow(line)) {
      const { block, nextIdx } = parseTable(rawLines, i);
      const target = ensureCurrentTopic();
      target.blocks.push(block);
      i = nextIdx;
      continue;
    }

    // Markdown Heading (#, ##, ###, ####)
    const headingMatch = trimmed.match(/^#{1,6}\s+(.+)$/);
    if (headingMatch) {
      const headingText = headingMatch[1].replace(/\*\*/g, '').trim();
      const nextSec: ApostilaSection = {
        kind: classifyHeading(headingText),
        heading: headingText,
        blocks: [],
      };
      currentSection = nextSec;
      pushSection(nextSec);
      i++;
      continue;
    }

    // Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('>')) {
        quoteLines.push(rawLines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const target = ensureCurrentTopic();
      target.blocks.push({
        type: 'blockquote',
        tokens: parseInlineTokens(quoteLines.join(' ')),
      });
      continue;
    }

    // Standalone Oracle Warning line ("- ⚠️ ..." or "⚠️ ...")
    if (/^[-*]?\s*⚠️/.test(trimmed)) {
      const cleanWarning = trimmed.replace(/^[-*]\s*/, '').replace(/^⚠️\s*/, '').trim();
      if (cleanWarning) {
        inlineOracleWarnings.push(cleanWarning);
      }
      currentSection = null;
      i++;
      continue;
    }

    // Indented sub-bullets or nested ordered items (2+ leading spaces)
    const indentSpaces = line.length - line.trimStart().length;
    if (indentSpaces >= 2) {
      const subOrdered = trimmed.match(/^(\d+)\.\s+(.+)$/);
      const subBullet = trimmed.match(/^[-*]\s+(.+)$/);

      if (subOrdered || subBullet) {
        const depth = Math.min(2, Math.max(0, Math.floor(indentSpaces / 2) - 1));
        const text = (subOrdered ? subOrdered[2] : subBullet![1]).trim();

        // If inside a Sources section, extract links from nested bullets too
        if (currentSection?.kind === 'sources') {
          inlineSources.push(...extractLinksFromText(text));
          i++;
          continue;
        }

        const target = ensureCurrentTopic();
        appendListItem(target, Boolean(subOrdered), {
          depth,
          number: subOrdered ? subOrdered[1] : undefined,
          tokens: parseInlineTokens(text),
        });
        i++;
        continue;
      }
    }

    // Top-level bullet with bold topic heading ("- **Objetivos (art. 1º):** ...")
    if (indentSpaces < 2 && /^[-*]\s+/.test(line)) {
      const sectionBullet = parseTopLevelSectionBullet(line);
      if (sectionBullet) {
        let kind = classifyHeading(sectionBullet.heading);
        if (kind === 'sources') {
          inlineSources.push(...extractLinksFromText(sectionBullet.body));
          currentSection = { kind: 'sources', heading: sectionBullet.heading, blocks: [] };
          i++;
          continue;
        }
        // Only the very first overview section gets the tinted lead summary box
        if (kind === 'lead' && sections.some((s) => s.kind === 'lead')) {
          kind = 'topic';
        }

        const nextSec: ApostilaSection = {
          kind,
          heading: sectionBullet.heading,
          blocks: [],
        };

        if (sectionBullet.body) {
          const formattedBody = sectionBullet.body.replace(
            /^([a-zà-öø-ÿ])/,
            (ch) => ch.toUpperCase()
          );
          nextSec.blocks.push({
            type: 'paragraph',
            tokens: parseInlineTokens(formattedBody),
          });
        }

        currentSection = nextSec;
        pushSection(nextSec);
        i++;
        continue;
      }

      // Top-level bullet without a bold colon heading -> clean bullet list item
      const bulletText = trimmed.replace(/^[-*]\s+/, '').trim();
      const target = ensureCurrentTopic();
      appendListItem(target, false, {
        depth: 0,
        tokens: parseInlineTokens(bulletText),
      });
      i++;
      continue;
    }

    // Top-level numbered list ("1. ...")
    const topOrdered = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (topOrdered) {
      const target = ensureCurrentTopic();
      appendListItem(target, true, {
        depth: 0,
        number: topOrdered[1],
        tokens: parseInlineTokens(topOrdered[2].trim()),
      });
      i++;
      continue;
    }

    // Regular paragraph line
    const target = ensureCurrentTopic();
    target.blocks.push({
      type: 'paragraph',
      tokens: parseInlineTokens(trimmed),
    });
    i++;
  }

  return {
    sections: sections.filter((s) => s.blocks.length > 0 || Boolean(s.heading)),
    inlineSources,
    inlineOracleWarnings,
  };
}
