import { softGlow } from "@/lib/softGlow";

interface SheetBackgroundProps {
  /** Posição da folha: alterna o lado das luzes para cada folha ter um visual diferente */
  index: number;
}

const DOTS = "radial-gradient(circle at center, #fff 1px, transparent 1px)";

/**
 * Fundo de cada folha: grade de pontos sutil e duas luzes azuis nas laterais.
 * Cada folha é opaca (para cobrir a anterior), então o ambiente vive dentro dela.
 */
export function SheetBackground({ index }: SheetBackgroundProps) {
  const first = index % 2 === 0 ? "left" : "right";

  const second = first === "left" ? "right" : "left";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: DOTS, backgroundSize: "28px 28px" }} />

      <div
        className="absolute top-[10%] h-[760px] w-[760px]"
        style={{ [first]: -300, background: softGlow("37,99,235", 0.2) }}
      />

      <div
        className="absolute bottom-[6%] h-[760px] w-[760px]"
        style={{ [second]: -300, background: softGlow("34,211,238", 0.1) }}
      />
    </div>
  );
}
