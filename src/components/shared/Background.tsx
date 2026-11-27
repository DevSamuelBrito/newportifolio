import { CursorGlow } from "./CursorGlow";

import { softGlow } from "@/lib/softGlow";

const DOTS = "radial-gradient(circle at center, #fff 1px, transparent 1px)";

/**
 * Fundo fixo e contínuo da página: grade de pontos, duas luzes azuis nas laterais
 * e o brilho que acompanha o mouse. Fica atrás de todas as seções (que são
 * transparentes), então o fundo não se mexe enquanto o conteúdo sobe.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: DOTS, backgroundSize: "28px 28px" }} />

      <div
        className="absolute top-[12%] h-[900px] w-[900px]"
        style={{ left: -320, background: softGlow("37,99,235", 0.22) }}
      />

      <div
        className="absolute bottom-[6%] h-[900px] w-[900px]"
        style={{ right: -320, background: softGlow("34,211,238", 0.11) }}
      />

      <CursorGlow />
    </div>
  );
}
