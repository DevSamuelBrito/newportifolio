"use client";

//icons
import { AlertTriangle, Check, Lightbulb } from "lucide-react";

//utils
import { parseDescription } from "../../../../utils/parseDescription";

import type { DescriptionBlock, ListItem } from "../../../../utils/parseDescription";

interface DescriptionBlocksProps {
  /** Linhas de descrição do projeto (descriptionBr / descriptionEn) */
  lines: string[];
}

const NOTICE_STYLES = {
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-100/90",
  tip: "border-blue-500/30 bg-blue-500/10 text-blue-100/90",
} as const;

function Item({ item }: { item: ListItem }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-sm">
        {item.check ? (
          <Check size={14} className="text-blue-400" aria-hidden />
        ) : item.icon ? (
          <span aria-hidden>{item.icon}</span>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden />
        )}
      </span>

      <p className="min-w-0 break-words text-[15px] leading-relaxed text-neutral-400">
        {item.title && <strong className="font-semibold text-neutral-100">{item.title}: </strong>}
        {item.text}
      </p>
    </li>
  );
}

function Block({ block, first }: { block: DescriptionBlock; first: boolean }) {
  switch (block.kind) {
    case "paragraph":
      return (
        // O primeiro parágrafo é a apresentação do projeto: um pouco maior e mais claro
        <p
          className={`break-words leading-relaxed ${
            first ? "text-base text-neutral-200" : "text-[15px] text-neutral-400"
          }`}
        >
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h3 className="flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
          {block.icon && <span aria-hidden>{block.icon}</span>}
          {block.text}
        </h3>
      );

    case "notice": {
      const Icon = block.tone === "warning" ? AlertTriangle : Lightbulb;

      return (
        <div className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${NOTICE_STYLES[block.tone]}`}>
          <Icon size={18} className="mt-0.5 shrink-0" aria-hidden />
          <p className="min-w-0 break-words">{block.text}</p>
        </div>
      );
    }

    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </ul>
      );
  }
}

/** Descrição do projeto com cabeçalhos, listas e avisos em vez de texto corrido. */
export function DescriptionBlocks({ lines }: DescriptionBlocksProps) {
  const blocks = parseDescription(lines);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Block key={index} block={block} first={index === 0} />
      ))}
    </div>
  );
}
