import React from 'react';
import { tokenizeRichText, type RichTag } from '../systems/richText';

const TAG_CLASS: Record<RichTag, string> = {
  u: 'underline decoration-2 underline-offset-[3px] decoration-[#fde047]',
  mark: 'bg-[#fde047]/25 text-inherit rounded-sm px-0.5',
  sup: '',
};

interface Node {
  tag: RichTag | null;
  children: React.ReactNode[];
}

/**
 * Mostra texto de questão real com os destaques permitidos (<u>, <mark>, <sup>, quebras).
 * Todo o resto vira texto comum: nada do conteúdo é interpretado como HTML.
 */
export function RichText({ text }: { text: string }): React.ReactElement {
  const root: Node = { tag: null, children: [] };
  const stack: Node[] = [root];
  let key = 0;

  const close = (node: Node) => {
    const parent = stack[stack.length - 1];
    const Tag = node.tag as RichTag;
    parent.children.push(
      <Tag key={key++} className={TAG_CLASS[Tag] || undefined}>
        {node.children}
      </Tag>
    );
  };

  for (const t of tokenizeRichText(text)) {
    const top = stack[stack.length - 1];
    if (t.type === 'text') top.children.push(t.text);
    else if (t.type === 'br') top.children.push(<br key={key++} />);
    else if (t.type === 'open') stack.push({ tag: t.tag, children: [] });
    else {
      // Fecha só se houver uma tag igual aberta; fechamento solto é ignorado.
      const at = stack.map((n) => n.tag).lastIndexOf(t.tag);
      if (at > 0) {
        while (stack.length > at) close(stack.pop() as Node);
      }
    }
  }
  while (stack.length > 1) close(stack.pop() as Node);

  return <>{root.children}</>;
}
