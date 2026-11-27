import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Casca padrão de toda seção: define o id (usado pela navbar), o espaçamento
 * vertical e o container central com largura máxima.
 */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 py-20 sm:py-28", className ?? "")}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">{children}</div>
    </section>
  );
}
