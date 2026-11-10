/**
 * Degradê radial com queda gaussiana (curva em sino). Diferente de um degradê
 * com poucas paradas, não forma faixas nem contorno visível: a cor some aos
 * poucos e chega a zero exatamente na borda.
 *
 * @param rgb       cor no formato "59,130,246"
 * @param maxAlpha  opacidade no centro (0 a 1)
 */
export function softGlow(rgb: string, maxAlpha: number, steps = 16) {
  const stops = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;

    // curva em sino, com um fade final para garantir alpha 0 na borda
    const edgeFade = t < 0.7 ? 1 : 1 - ((t - 0.7) / 0.3) ** 2 * (3 - 2 * ((t - 0.7) / 0.3));

    const alpha = maxAlpha * Math.exp(-3.6 * t * t) * edgeFade;

    return `rgba(${rgb},${alpha.toFixed(4)}) ${(t * 100).toFixed(1)}%`;
  });

  return `radial-gradient(circle closest-side, ${stops.join(", ")})`;
}
