'use client';

import React from 'react';

/**
 * Simple markdown renderer - handles headings, bold, lists, and paragraphs.
 * No external dependency needed.
 */
export function Markdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!listItems) return;
    if (listItems.type === 'ul') {
      elements.push(
        <ul key={elements.length} className="list-disc pl-6 my-2 space-y-1">
          {listItems.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={elements.length} className="list-decimal pl-6 my-2 space-y-1">
          {listItems.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ol>
      );
    }
    listItems = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushList();
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base'];
      elements.push(
        React.createElement(
          `h${level}`,
          {
            key: elements.length,
            className: `${sizes[level - 1] || 'text-base'} font-bold mt-4 mb-2`,
            dangerouslySetInnerHTML: { __html: renderInline(text) },
          }
        )
      );
      continue;
    }

    // Unordered list item
    if (trimmed.startsWith('- ')) {
      if (!listItems || listItems.type !== 'ul') {
        flushList();
        listItems = { type: 'ul', items: [] };
      }
      listItems.items.push(trimmed.slice(2));
      continue;
    }

    // Ordered list item
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!listItems || listItems.type !== 'ol') {
        flushList();
        listItems = { type: 'ol', items: [] };
      }
      listItems.items.push(olMatch[2]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p
        key={elements.length}
        className="my-2 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }}
      />
    );
  }

  flushList();

  return <div className="dark:prose-invert">{elements}</div>;
}

/** Render inline markdown: **bold** and *italic* */
function renderInline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-sm">$1</code>');
}
