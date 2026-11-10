"use client";

//react
import { useEffect, useMemo, useState } from "react";

//icons
import { Terminal } from "lucide-react";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

type Token = { text: string; className: string };

type Line = Token[];

const COLORS = {
  comment: "text-neutral-500 italic",
  keyword: "text-blue-400",
  name: "text-white",
  string: "text-cyan-300",
  plain: "text-neutral-300",
} as const;

const tok = (text: string, kind: keyof typeof COLORS): Token => ({ text, className: COLORS[kind] });

/** Monta uma linha do tipo:  frontend = ['A', 'B'];  (campo de classe) */
const arrayLine = (property: string, items: string[]): Line => [
  tok("  ", "plain"),
  tok(property, "name"),
  tok(" = [", "plain"),
  ...items.flatMap((item, index) => [
    tok(`'${item}'`, "string"),
    ...(index < items.length - 1 ? [tok(", ", "plain")] : []),
  ]),
  tok("];", "plain"),
];

/** Janela de código estilo editor, com o texto sendo digitado. */
export function CodeWindow() {
  const { t } = useTranslation();

  const lines = useMemo<Line[]>(
    () => [
      [tok(`// ${t.hero.codeComment}`, "comment")],
      [tok("class ", "keyword"), tok("Samuel", "name"), tok(" {", "plain")],
      arrayLine("frontend", ["TypeScript", "React", "Next.js"]),
      arrayLine("backend", ["C#", "ASP.NET Core", "NestJS"]),
      arrayLine("database", ["PostgreSQL", "Firebird"]),
      arrayLine("devops", ["Docker", "Git", "Azure DevOps"]),
      [tok("}", "plain")],
    ],
    [t.hero.codeComment]
  );

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.reduce((s, token) => s + token.text.length, 0) + 1, 0),
    [lines]
  );

  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(total);
      return;
    }

    setTyped(0);

    const id = window.setInterval(() => {
      setTyped((current) => {
        if (current >= total) {
          window.clearInterval(id);
          return current;
        }
        return current + 1;
      });
    }, 22);

    return () => window.clearInterval(id);
  }, [total]);

  // Corta as linhas na quantidade de caracteres já "digitados"
  let remaining = typed;

  // O cursor fica no fim da linha que está sendo digitada
  let caretPlaced = false;

  const caret = <span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-blue-400" />;

  const rendered = lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];

    for (const [tokenIndex, token] of line.entries()) {
      if (remaining <= 0) break;
      const visible = token.text.slice(0, remaining);
      remaining -= visible.length;
      tokens.push(
        <span key={tokenIndex} className={token.className}>
          {visible}
        </span>
      );
    }

    // consome o "\n" do fim da linha
    if (remaining > 0) remaining -= 1;

    const showCaret = !caretPlaced && remaining <= 0;

    if (showCaret) caretPlaced = true;

    return (
      <div key={lineIndex} className="min-h-[1.5rem]">
        {tokens}
        {showCaret && caret}
      </div>
    );
  });

  return (
    <div className="glass w-full overflow-hidden p-5 sm:p-6" aria-label="stack.ts">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
          <span className="h-3 w-3 rounded-full bg-green-500/90" />
          <span className="ml-3 font-mono text-xs text-neutral-400">stack.ts</span>
        </div>
        <Terminal size={14} className="text-neutral-500" />
      </div>

      <pre className="h-56 overflow-x-auto overflow-y-hidden rounded-xl bg-black/60 p-4 font-mono text-[12px] leading-6 sm:h-60 sm:text-[13px]">
        <code>{rendered}</code>
      </pre>
    </div>
  );
}
