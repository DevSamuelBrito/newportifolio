/**
 * Transforma as linhas de descrição de um projeto (strings soltas, no estilo
 * markdown simples usado em projectsData.ts) em blocos estruturados para o modal.
 *
 * Padrões reconhecidos:
 *  - "✨ Principais Funcionalidades"          -> título de seção
 *  - "⚠️ Aviso..." / "💡 Dica..."              -> caixa de destaque
 *  - "- 🖥️ Título: texto" / "- texto"         -> item de lista (título opcional)
 *  - "✔️ texto"                                -> item de lista com check
 *  - qualquer outra linha                      -> parágrafo
 */

export type ListItem = {
  /** Emoji que abre o item (ex.: 🖥️). Vazio quando não há. */
  icon?: string;
  /** Trecho antes de ":" (ex.: "Kanban de Acompanhamento"). */
  title?: string;
  text: string;
  /** Item de checklist (✔️). */
  check?: boolean;
};

export type DescriptionBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; icon?: string; text: string }
  | { kind: "notice"; icon: string; tone: "warning" | "tip"; text: string }
  | { kind: "list"; items: ListItem[] };

// Emoji no início da linha (aceita o seletor de variação ️ que acompanha vários emojis)
const EMOJI_LEAD = /^(\p{Extended_Pictographic}️?)\s*/u;

const CHECK_ICONS = new Set(["✔", "✅", "☑"]);

const WARNING_ICONS = new Set(["⚠"]);

const TIP_ICONS = new Set(["💡"]);

/** Título de seção: curto e sem pontuação final de frase. */
const MAX_HEADING_LENGTH = 60;

/** "Título: texto" — o título precisa ser curto para não confundir com frase com ":" */
const TITLE_SPLIT = /^(.{3,60}?):\s+(.+)$/;

function splitLead(line: string): { icon?: string; rest: string } {
  const match = line.match(EMOJI_LEAD);

  if (!match) return { rest: line };

  return { icon: match[1], rest: line.slice(match[0].length) };
}

/** Compara emojis ignorando o seletor de variação (✔ e ✔️ são o mesmo). */
const baseIcon = (icon: string) => icon.replace(/️/g, "");

function parseItem(text: string): ListItem {
  const { icon, rest } = splitLead(text.trim());

  const split = rest.match(TITLE_SPLIT);

  return split ? { icon, title: split[1], text: split[2] } : { icon, text: rest };
}

export function parseDescription(lines: string[]): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];

  let list: ListItem[] | null = null;

  const pushItem = (item: ListItem) => {
    if (!list) {
      list = [];
      blocks.push({ kind: "list", items: list });
    }
    list.push(item);
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) continue;

    if (line.startsWith("- ")) {
      pushItem(parseItem(line.slice(2)));
      continue;
    }

    const { icon, rest } = splitLead(line);

    const kind = icon ? baseIcon(icon) : "";

    if (icon && CHECK_ICONS.has(kind)) {
      pushItem({ ...parseItem(rest), icon: undefined, check: true });
      continue;
    }

    // qualquer outra linha encerra a lista atual
    list = null;

    if (icon && WARNING_ICONS.has(kind)) {
      blocks.push({ kind: "notice", icon, tone: "warning", text: rest });
    } else if (icon && TIP_ICONS.has(kind)) {
      blocks.push({ kind: "notice", icon, tone: "tip", text: rest });
    } else if (icon && rest.length <= MAX_HEADING_LENGTH && !/[.!?]$/.test(rest)) {
      blocks.push({ kind: "heading", icon, text: rest });
    } else if (icon && rest.includes(" - ")) {
      // Seção inteira numa linha só, com itens separados por " - ":
      // "🏗️ Arquitetura e Padrões - Clean Architecture ... - DTOs ... - Repository ..."
      const [title, ...parts] = rest.split(" - ").map((part) => part.trim());

      blocks.push({ kind: "heading", icon, text: title });

      if (parts.length > 1) {
        blocks.push({ kind: "list", items: parts.map((part) => parseItem(part)) });
      } else {
        blocks.push({ kind: "paragraph", text: parts[0] });
      }
    } else {
      blocks.push({ kind: "paragraph", text: line });
    }
  }

  return blocks;
}
