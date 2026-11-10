import { CursorGlow } from "./CursorGlow";

/**
 * Fundo fixo da página: manchas azuis desfocadas, uma grade sutil de pontos
 * e um brilho que acompanha o mouse. Fica atrás de todo o conteúdo e não recebe cliques.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] animate-pulse rounded-full bg-blue-600/15 blur-3xl" />
      <div
        className="absolute -right-40 top-2/3 h-[32rem] w-[32rem] animate-pulse rounded-full bg-cyan-500/10 blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at center, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <CursorGlow />
    </div>
  );
}
