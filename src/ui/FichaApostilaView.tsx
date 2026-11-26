import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Compass,
  ExternalLink,
  Link2,
  Moon,
  Sun,
} from 'lucide-react';
import { getFichaById } from '../systems/customDatabase';
import {
  parseFichaApostila,
  type ApostilaBlock,
  type ApostilaSection,
  type InlineToken,
  type ParsedSourceLink,
} from '../systems/fichaMarkdown';
import type { Ficha } from '../types';

const THEME_STORAGE_KEY = 'cronicas_trt4_apostila_theme_v1';
const SIZE_STORAGE_KEY = 'cronicas_trt4_apostila_size_v1';

type ReaderTheme = 'paper' | 'dark';
type ReaderSize = 'sm' | 'md' | 'lg';

function loadReaderTheme(): ReaderTheme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'paper';
  } catch {
    return 'paper';
  }
}

function loadReaderSize(): ReaderSize {
  try {
    const v = localStorage.getItem(SIZE_STORAGE_KEY);
    if (v === 'sm' || v === 'lg') return v;
    return 'md';
  } catch {
    return 'md';
  }
}

const SIZE_CLASSES: Record<ReaderSize, string> = {
  sm: 'text-[14.5px] leading-[1.72]',
  md: 'text-[16px] leading-[1.78]',
  lg: 'text-[17.5px] leading-[1.82]',
};

interface InlineRendererProps {
  tokens: InlineToken[];
  isPaper: boolean;
  onSelectFichaId?: (fichaId: string) => void;
}

export const RenderInlineTokens: React.FC<InlineRendererProps> = ({
  tokens,
  isPaper,
  onSelectFichaId,
}) => {
  return (
    <>
      {tokens.map((tok, idx) => {
        if (tok.type === 'text') {
          return <React.Fragment key={idx}>{tok.text}</React.Fragment>;
        }
        if (tok.type === 'bold') {
          return (
            <strong
              key={idx}
              className={
                isPaper
                  ? 'font-semibold text-[#0f172a]'
                  : 'font-semibold text-[#f8fafc]'
              }
            >
              <RenderInlineTokens
                tokens={tok.children}
                isPaper={isPaper}
                onSelectFichaId={onSelectFichaId}
              />
            </strong>
          );
        }
        if (tok.type === 'italic') {
          return (
            <em
              key={idx}
              className={isPaper ? 'italic text-[#334155]' : 'italic text-[#cbd5e1]'}
            >
              <RenderInlineTokens
                tokens={tok.children}
                isPaper={isPaper}
                onSelectFichaId={onSelectFichaId}
              />
            </em>
          );
        }
        if (tok.type === 'code') {
          return (
            <code
              key={idx}
              className={`font-mono-num text-[0.88em] px-1.5 py-0.5 rounded-[3px] ${
                isPaper
                  ? 'bg-[#e9e6dc] text-[#1e293b] border border-[#dad5c7]'
                  : 'bg-[#1e2638] text-[#93c5fd] border border-[#2f3b54]'
              }`}
            >
              {tok.text}
            </code>
          );
        }
        if (tok.type === 'link') {
          return (
            <a
              key={idx}
              href={tok.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-2 decoration-1 inline-flex items-center gap-1 ${
                isPaper
                  ? 'text-[#1d4ed8] hover:text-[#1e3a8a]'
                  : 'text-[#7dd3fc] hover:text-[#bae6fd]'
              }`}
            >
              <span>{tok.label}</span>
              <ExternalLink className="w-3 h-3 inline shrink-0" />
            </a>
          );
        }
        // [[wikilink]]
        const target = getFichaById(tok.id);
        const label = target ? target.titulo.split('—')[0].trim() : tok.id;
        if (onSelectFichaId && target) {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectFichaId(target.id)}
              title={`Abrir ficha: ${target.titulo}`}
              className={`inline underline underline-offset-2 decoration-dotted font-medium cursor-pointer text-left ${
                isPaper
                  ? 'text-[#0f4c81] hover:text-[#1d4ed8]'
                  : 'text-[#7dd3fc] hover:text-[#bae6fd]'
              }`}
            >
              {label}
            </button>
          );
        }
        return (
          <span
            key={idx}
            className={
              isPaper
                ? 'font-medium text-[#0f4c81]'
                : 'font-medium text-[#7dd3fc]'
            }
          >
            {label}
          </span>
        );
      })}
    </>
  );
};

interface FichaApostilaViewProps {
  ficha: Ficha;
  /** Show the editorial document title & metadata header inside the paper sheet */
  showHeader?: boolean;
  /** Optional handler when user clicks a [[connection]] link inside the apostila */
  onOpenConnectedFicha?: (fichaId: string) => void;
  /** Optional handler to track a connected NPC on the world map */
  onTrackNpc?: (fichaId: string) => void;
}

const CARGO_LABEL: Record<Ficha['cargo'], string> = {
  ambos: 'Técnico e Analista TI',
  tecnico: 'Técnico Judiciário — TI',
  analista: 'Analista Judiciário — TI',
};

export const FichaApostilaView: React.FC<FichaApostilaViewProps> = ({
  ficha,
  showHeader = true,
  onOpenConnectedFicha,
  onTrackNpc,
}) => {
  const [theme, setTheme] = useState<ReaderTheme>(loadReaderTheme);
  const [size, setSize] = useState<ReaderSize>(loadReaderSize);

  const isPaper = theme === 'paper';

  const changeTheme = (next: ReaderTheme) => {
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore storage quota errors
    }
  };

  const changeSize = (next: ReaderSize) => {
    setSize(next);
    try {
      localStorage.setItem(SIZE_STORAGE_KEY, next);
    } catch {
      // ignore storage quota errors
    }
  };

  const doc = useMemo(() => parseFichaApostila(ficha.textoCompleto), [ficha.textoCompleto]);

  // Merge and deduplicate official sources from ficha.fontes + parsed MD sources
  const mergedSources = useMemo<ParsedSourceLink[]>(() => {
    const seen = new Set<string>();
    const list: ParsedSourceLink[] = [];
    for (const s of [...ficha.fontes, ...doc.inlineSources]) {
      if (!s.url || seen.has(s.url)) continue;
      seen.add(s.url);
      list.push(s);
    }
    return list;
  }, [ficha.fontes, doc.inlineSources]);

  // Merge and deduplicate Oracle warnings
  const mergedWarnings = useMemo<string[]>(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const raw of [...ficha.avisosOraculo, ...doc.inlineOracleWarnings]) {
      const clean = raw.replace(/^⚠️\s*/, '').trim();
      const normKey = clean.toLowerCase().slice(0, 60);
      if (!clean || seen.has(normKey)) continue;
      seen.add(normKey);
      list.push(clean);
    }
    return list;
  }, [ficha.avisosOraculo, doc.inlineOracleWarnings]);

  const renderBlock = (block: ApostilaBlock, bIdx: number) => {
    if (block.type === 'paragraph') {
      return (
        <p key={bIdx} className="my-0">
          <RenderInlineTokens
            tokens={block.tokens}
            isPaper={isPaper}
            onSelectFichaId={onOpenConnectedFicha}
          />
        </p>
      );
    }

    if (block.type === 'subheading') {
      return (
        <h5
          key={bIdx}
          className={`font-semibold mt-3 mb-1 ${
            isPaper ? 'text-[#0f172a]' : 'text-[#f1f5f9]'
          }`}
        >
          {block.text}
        </h5>
      );
    }

    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={bIdx}
          className={`space-y-2 my-1 ${block.ordered ? 'list-none pl-0' : 'list-none pl-0'}`}
        >
          {block.items.map((item, iIdx) => {
            const indentClass =
              item.depth === 0 ? 'pl-5' : item.depth === 1 ? 'pl-10' : 'pl-14';
            return (
              <li key={iIdx} className={`relative ${indentClass}`}>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 select-none ${
                    item.depth === 0
                      ? 'left-1'
                      : item.depth === 1
                        ? 'left-6'
                        : 'left-10'
                  } ${
                    block.ordered
                      ? isPaper
                        ? 'font-mono-num text-[0.86em] font-semibold text-[#1d4ed8]'
                        : 'font-mono-num text-[0.86em] font-semibold text-[#7dd3fc]'
                      : isPaper
                        ? 'text-[#64748b]'
                        : 'text-[#94a3b8]'
                  }`}
                >
                  {block.ordered
                    ? `${item.number || iIdx + 1}.`
                    : item.depth === 0
                      ? '•'
                      : '–'}
                </span>
                <RenderInlineTokens
                  tokens={item.tokens}
                  isPaper={isPaper}
                  onSelectFichaId={onOpenConnectedFicha}
                />
              </li>
            );
          })}
        </ListTag>
      );
    }

    if (block.type === 'table') {
      return (
        <div
          key={bIdx}
          className={`my-3 overflow-x-auto rounded-[4px] border ${
            isPaper ? 'border-[#d6d2c4] bg-white' : 'border-[#2c3448] bg-[#0f131d]'
          }`}
        >
          <table className="w-full text-left border-collapse text-[0.9em] leading-snug">
            {block.headers.length > 0 && (
              <thead>
                <tr
                  className={
                    isPaper
                      ? 'bg-[#ece9df] text-[#0f172a] border-b border-[#d6d2c4]'
                      : 'bg-[#1b2234] text-[#f1f5f9] border-b border-[#2c3448]'
                  }
                >
                  {block.headers.map((cell, cIdx) => (
                    <th
                      key={cIdx}
                      className="px-3.5 py-2.5 font-semibold whitespace-nowrap"
                    >
                      <RenderInlineTokens
                        tokens={cell}
                        isPaper={isPaper}
                        onSelectFichaId={onOpenConnectedFicha}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody
              className={
                isPaper
                  ? 'divide-y divide-[#e8e5dc]'
                  : 'divide-y divide-[#22293b]'
              }
            >
              {block.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={
                    rIdx % 2 === 1
                      ? isPaper
                        ? 'bg-[#f9f8f4]'
                        : 'bg-[#141926]'
                      : ''
                  }
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-3.5 py-2.5 align-top tabular-nums"
                    >
                      <RenderInlineTokens
                        tokens={cell}
                        isPaper={isPaper}
                        onSelectFichaId={onOpenConnectedFicha}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === 'code') {
      return (
        <div
          key={bIdx}
          className={`my-3 rounded-[4px] overflow-hidden border ${
            isPaper ? 'border-[#cbd5e1] bg-[#141923]' : 'border-[#2d3748] bg-[#0b0e16]'
          }`}
        >
          <div className="px-3 py-1.5 text-[11px] font-mono-num text-[#94a3b8] bg-[#1c2333] border-b border-[#2b3449]">
            {block.language}
          </div>
          <pre className="p-3.5 overflow-x-auto font-mono-num text-[13.5px] leading-relaxed text-[#e2e8f0] m-0">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    }

    if (block.type === 'blockquote') {
      return (
        <blockquote
          key={bIdx}
          className={`my-2 px-4 py-3 rounded-[4px] border italic ${
            isPaper
              ? 'bg-[#f1efe8] border-[#dcd8cb] text-[#334155]'
              : 'bg-[#171d2c] border-[#2c354b] text-[#cbd5e1]'
          }`}
        >
          <RenderInlineTokens
            tokens={block.tokens}
            isPaper={isPaper}
            onSelectFichaId={onOpenConnectedFicha}
          />
        </blockquote>
      );
    }

    return (
      <hr
        key={bIdx}
        className={`my-4 border-0 border-t ${
          isPaper ? 'border-[#e2dfd5]' : 'border-[#262d3f]'
        }`}
      />
    );
  };

  const renderSection = (section: ApostilaSection, sIdx: number) => {
    if (section.kind === 'lead') {
      return (
        <section
          key={sIdx}
          className={`p-4 sm:p-5 rounded-[4px] border space-y-2 ${
            isPaper
              ? 'bg-[#f0eee6] border-[#dedad0]'
              : 'bg-[#171d2c] border-[#293247]'
          }`}
        >
          <div
            className={`text-xs font-semibold tracking-wide ${
              isPaper ? 'text-[#0f4c81]' : 'text-[#7dd3fc]'
            }`}
          >
            {section.heading || 'Conceito central'}
          </div>
          <div className="space-y-2.5">
            {section.blocks.map((b, bIdx) => renderBlock(b, bIdx))}
          </div>
        </section>
      );
    }

    if (section.kind === 'example') {
      return (
        <section
          key={sIdx}
          className={`p-4 sm:p-5 rounded-[4px] border space-y-2 ${
            isPaper
              ? 'bg-[#eff5fb] border-[#c7daf0]'
              : 'bg-[#132032] border-[#253c59]'
          }`}
        >
          <div
            className={`text-xs font-semibold tracking-wide ${
              isPaper ? 'text-[#1d4ed8]' : 'text-[#93c5fd]'
            }`}
          >
            {section.heading || 'Exemplo prático'}
          </div>
          <div className="space-y-2.5">
            {section.blocks.map((b, bIdx) => renderBlock(b, bIdx))}
          </div>
        </section>
      );
    }

    if (section.kind === 'connections') {
      return (
        <section
          key={sIdx}
          className={`pt-5 mt-2 border-t space-y-2.5 ${
            isPaper ? 'border-[#e4e0d5]' : 'border-[#262d3f]'
          }`}
        >
          <h4
            className={`text-sm font-semibold flex items-center gap-1.5 ${
              isPaper ? 'text-[#0f4c81]' : 'text-[#7dd3fc]'
            }`}
          >
            <Link2 className="w-4 h-4 shrink-0" />
            <span>{section.heading || 'Conexões na prova'}</span>
          </h4>
          <div className="space-y-2">
            {section.blocks.map((b, bIdx) => renderBlock(b, bIdx))}
          </div>
        </section>
      );
    }

    // Standard editorial topic section
    return (
      <section key={sIdx} className="space-y-2">
        {section.heading && (
          <h4
            className={`text-[1.04em] font-bold tracking-[-0.01em] ${
              isPaper ? 'text-[#0f172a]' : 'text-[#f5e6c8]'
            }`}
          >
            {section.heading}
          </h4>
        )}
        <div className="space-y-2.5">
          {section.blocks.map((b, bIdx) => renderBlock(b, bIdx))}
        </div>
      </section>
    );
  };

  return (
    <article
      data-testid="ficha-apostila"
      className={`rounded-[4px] border transition-colors ${
        isPaper
          ? 'bg-[#f8f7f3] border-[#dcd8cc] text-[#222834]'
          : 'bg-[#121621] border-[#2a3144] text-[#e6e2d8]'
      }`}
    >
      {/* Compact Reading Controls Bar */}
      <div
        className={`px-5 sm:px-7 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${
          isPaper
            ? 'bg-[#f1efe8] border-[#e2dfd4] text-[#475569]'
            : 'bg-[#161b29] border-[#252c3f] text-[#94a3b8]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen
            className={`w-3.5 h-3.5 shrink-0 ${
              isPaper ? 'text-[#0f4c81]' : 'text-[#e6b84c]'
            }`}
          />
          <span className="font-medium truncate">Apostila de Estudo</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{CARGO_LABEL[ficha.cargo]}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Font size segmented selector */}
          <div
            className={`inline-flex items-center rounded-[4px] p-0.5 border ${
              isPaper
                ? 'bg-[#e8e5dc] border-[#d6d2c4]'
                : 'bg-[#0e111a] border-[#2a3246]'
            }`}
            role="group"
            aria-label="Tamanho da fonte da apostila"
          >
            {(
              [
                ['sm', 'A-'],
                ['md', 'A'],
                ['lg', 'A+'],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => changeSize(k)}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-[3px] cursor-pointer transition-colors ${
                  size === k
                    ? isPaper
                      ? 'bg-white text-[#0f172a] shadow-xs'
                      : 'bg-[#2a344c] text-white'
                    : isPaper
                      ? 'text-[#475569] hover:text-[#0f172a]'
                      : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Paper vs Dark reading mode toggle */}
          <button
            type="button"
            onClick={() => changeTheme(isPaper ? 'dark' : 'paper')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border text-[11px] font-semibold cursor-pointer transition-colors ${
              isPaper
                ? 'bg-white hover:bg-[#fafaf8] border-[#d6d2c4] text-[#1e293b]'
                : 'bg-[#1d2436] hover:bg-[#27314a] border-[#33405c] text-[#e2e8f0]'
            }`}
          >
            {isPaper ? (
              <>
                <Moon className="w-3 h-3" />
                Escuro
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-[#fde047]" />
                Papel
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Editorial Reading Column */}
      <div className="px-5 sm:px-8 py-6 sm:py-7">
        <div className={`max-w-[70ch] mx-auto space-y-6 ${SIZE_CLASSES[size]}`}>
          {showHeader && (
            <header
              className={`pb-5 border-b space-y-2 ${
                isPaper ? 'border-[#dfdacf]' : 'border-[#272f42]'
              }`}
            >
              <div
                className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs ${
                  isPaper ? 'text-[#475569]' : 'text-[#94a3b8]'
                }`}
              >
                <span className="font-semibold">{ficha.materia}</span>
                <span aria-hidden="true">·</span>
                <span>Instrutor: {ficha.npcName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">{ficha.id}</span>
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold leading-snug tracking-[-0.015em] [text-wrap:balance] ${
                  isPaper ? 'text-[#0f172a]' : 'text-[#f8f5ec]'
                }`}
              >
                {ficha.titulo}
              </h3>
              {onTrackNpc && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onTrackNpc(ficha.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 cursor-pointer ${
                      isPaper
                        ? 'text-[#0f4c81] hover:text-[#1d4ed8]'
                        : 'text-[#7dd3fc] hover:text-[#bae6fd]'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Rastrear {ficha.npcName} no mapa
                  </button>
                </div>
              )}
            </header>
          )}

          {/* Structured Apostila Sections */}
          <div className="space-y-5">
            {doc.sections.map((section, sIdx) => renderSection(section, sIdx))}
          </div>

          {/* Deduplicated Oracle Warning Note */}
          {mergedWarnings.length > 0 && (
            <aside
              className={`p-4 sm:p-5 rounded-[4px] border space-y-1.5 text-[0.92em] ${
                isPaper
                  ? 'bg-[#fef7e6] border-[#e8c675] text-[#6b4407]'
                  : 'bg-[#2a2013] border-[#a16207] text-[#fde68a]'
              }`}
            >
              <div className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Aviso do Oráculo — ponto para conferência (não gera perguntas)</span>
              </div>
              {mergedWarnings.map((warn, idx) => (
                <p key={idx} className="my-0 leading-relaxed">
                  {warn}
                </p>
              ))}
            </aside>
          )}

          {/* Deduplicated Official Sources Footer */}
          {mergedSources.length > 0 && (
            <footer
              className={`pt-5 border-t space-y-2.5 text-[0.88em] ${
                isPaper ? 'border-[#dfdacf]' : 'border-[#272f42]'
              }`}
            >
              <div
                className={`text-xs font-semibold ${
                  isPaper ? 'text-[#475569]' : 'text-[#94a3b8]'
                }`}
              >
                Referências e fontes oficiais
              </div>
              <ul className="space-y-1.5 list-none pl-0 m-0">
                {mergedSources.map((src) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 underline underline-offset-2 ${
                        isPaper
                          ? 'text-[#1d4ed8] hover:text-[#1e3a8a]'
                          : 'text-[#7dd3fc] hover:text-[#bae6fd]'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>{src.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </footer>
          )}
        </div>
      </div>
    </article>
  );
};
