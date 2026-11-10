"use client";

//react
import { useEffect, useRef } from "react";

//data
import { GRID, rasterize, type ShapeSource } from "./shapes";

/** Atraso (ms) por ponto de distância do centro: a troca de forma se espalha em onda */
const WAVE_DELAY = 16;

/** Tempo (ms) que cada ponto leva para chegar a ~63% do nível novo */
const EASE_TIME = 110;

/** Velocidade (px/ms) com que a onda do clique se espalha */
const RIPPLE_SPEED = 0.85;

/** Largura (px) do "anel" da onda que acende os pontos */
const RIPPLE_WIDTH = 50;

/** Quantos níveis de cor o desenho usa: pontos parecidos são pintados juntos (muito mais rápido) */
const LEVEL_STEPS = 10;

const GLOW_STEPS = 5;

const SHIMMER_STEPS = 3;

const BUCKETS = (LEVEL_STEPS + 1) * (GLOW_STEPS + 1) * SHIMMER_STEPS;

/** Cor de cada "lote": azul mais escuro nas bordas do desenho, azul-celeste nos pontos cheios; o brilho clareia */
const FILL_STYLES: string[] = Array.from({ length: BUCKETS }, (_, key) => {
  const shimmerStep = key % SHIMMER_STEPS;

  const glowStep = Math.floor(key / SHIMMER_STEPS) % (GLOW_STEPS + 1);

  const levelStep = Math.floor(key / (SHIMMER_STEPS * (GLOW_STEPS + 1)));

  const power = levelStep / LEVEL_STEPS;

  const glow = glowStep / GLOW_STEPS;

  const shimmer = power > 0.04 ? 0.8 + 0.2 * ((shimmerStep + 0.5) / SHIMMER_STEPS) : 1;

  const red = 37 + power * 88 + (190 - (37 + power * 88)) * glow * 0.8;

  const green = 99 + power * 112 + (235 - (99 + power * 112)) * glow * 0.8;

  const blue = 235 + power * 17 + (255 - (235 + power * 17)) * glow * 0.8;

  const alpha = Math.min(1, (0.07 + power * 0.93) * shimmer + glow * 0.35);

  return `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${alpha.toFixed(3)})`;
});

/** Intervalo (ms) entre repinturas quando o display está parado */
const IDLE_FRAME_MS = 66;

const CELLS = GRID * GRID;

/** Distância de cada ponto ao centro da grade (usada para a onda da troca de forma) */
const DISTANCE = Array.from({ length: CELLS }, (_, index) => {
  const x = (index % GRID) - (GRID - 1) / 2;
  const y = Math.floor(index / GRID) - (GRID - 1) / 2;

  return Math.hypot(x, y);
});

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

const smoothstep = (from: number, to: number, value: number) => {
  const t = clamp01((value - from) / (to - from));

  return t * t * (3 - 2 * t);
};

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

interface Ripple {
  x: number;
  y: number;
  /** instante do clique (ms) */
  time: number;
  /** força da onda (0 a 1) */
  power: number;
}

interface PixelDisplayProps {
  /** Formas que o display sabe mostrar (precisa ser uma constante, não recriar a cada render) */
  sources: ShapeSource[];
  /** Qual forma mostrar */
  index?: number;
  /** Chamado quando o usuário clica/toca no display */
  onPress?: () => void;
}

/**
 * Display de pontos (matriz de LED) azuis, interativo:
 * - ao entrar na tela, os pontos voam de posições espalhadas até formar o desenho;
 * - o mouse empurra os pontos por perto e os acende;
 * - o clique empurra tudo para longe e solta uma onda que acende os pontos conforme passa.
 * Só anima enquanto está na tela; com prefers-reduced-motion mostra tudo parado.
 */
export function PixelDisplay({ sources, index = 0, onPress }: PixelDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const indexRef = useRef(index);

  const pressRef = useRef(onPress);

  // o laço de animação é criado uma vez: ele chama esta função para trocar de forma
  const requestChange = useRef<(shape: number) => void>(() => {});

  useEffect(() => {
    pressRef.current = onPress;
  }, [onPress]);

  useEffect(() => {
    indexRef.current = index;

    requestChange.current(index);
  }, [index]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // forma: nível atual e nível-alvo (0 a 1) de cada ponto
    const level = new Float32Array(CELLS);

    let target: Float32Array = new Float32Array(CELLS);

    const readyAt = new Float32Array(CELLS);

    // física: posição inicial (espalhada), posição de casa, posição atual, velocidade e brilho
    const startX = new Float32Array(CELLS);
    const startY = new Float32Array(CELLS);
    const homeX = new Float32Array(CELLS);
    const homeY = new Float32Array(CELLS);
    const posX = new Float32Array(CELLS);
    const posY = new Float32Array(CELLS);
    const velX = new Float32Array(CELLS);
    const velY = new Float32Array(CELLS);
    const heat = new Float32Array(CELLS);

    // momento (0 a 1) em que cada ponto entra: da esquerda para a direita e de baixo para cima
    const threshold = new Float32Array(CELLS);

    let bitmaps: Float32Array[] = [];

    let size = 0;

    let pitch = 0;

    let dot = 0;

    // quanto do display já "entrou" (0 = ainda espalhado, 1 = desenho completo)
    let appear = reduceMotion ? 1 : 0;

    let inView = false;

    let frame = 0;

    let last = 0;

    let lastPaint = 0;

    const paths: (Path2D | undefined)[] = new Array(BUCKETS);

    const used: number[] = [];

    let wasCovered = false;

    let busy = true;

    const pointer = { x: -1e4, y: -1e4 };

    let ripples: Ripple[] = [];

    const scatter = () => {
      for (let cell = 0; cell < CELLS; cell++) {
        startX[cell] = homeX[cell] + (Math.random() - 0.5) * pitch * 7;

        startY[cell] = size + pitch * (2 + Math.random() * 7);

        posX[cell] = startX[cell];
        posY[cell] = startY[cell];
        velX[cell] = 0;
        velY[cell] = 0;
        heat[cell] = 0;
      }
    };

    const layout = () => {
      pitch = size / GRID;

      dot = pitch * 0.74;

      let max = 0;

      for (let cell = 0; cell < CELLS; cell++) {
        const x = cell % GRID;

        const y = Math.floor(cell / GRID);

        homeX[cell] = x * pitch + pitch / 2;
        homeY[cell] = y * pitch + pitch / 2;

        threshold[cell] = (x / GRID) * 0.5 + ((GRID - 1 - y) / GRID) * 0.18 + Math.random() * 0.07;

        max = Math.max(max, threshold[cell]);
      }

      for (let cell = 0; cell < CELLS; cell++) threshold[cell] *= 0.7 / max;

      scatter();

      // já visível: os pontos ficam em casa, sem repetir a entrada a cada redimensionamento
      if (appear > 0.5) {
        posX.set(homeX);
        posY.set(homeY);
      }
    };

    // devolve true se ainda há movimento (entrada, mola, brilho do mouse, onda ou troca de forma)
    const paint = (now: number, elapsed: number): boolean => {
      let busy = false;

      const rect = canvas.getBoundingClientRect();

      const levelEase = reduceMotion ? 1 : 1 - Math.exp(-elapsed / EASE_TIME);

      if (!reduceMotion) {
        // quanto do display está na tela decide se os pontos já voaram para o lugar
        const shown = clamp01((Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / Math.max(1, rect.height));

        const wanted = smoothstep(0.2, 0.7, shown);

        appear += (wanted - appear) * (1 - Math.exp(-elapsed / 320));

        if (Math.abs(appear - wanted) < 5e-4) appear = wanted;

        if (appear !== wanted) busy = true;
      }

      const localX = pointer.x - rect.left;

      const localY = pointer.y - rect.top;

      const reach = Math.max(74, pitch * 4.6);

      if (localX > -reach * 2 && localX < size + reach * 2 && localY > -reach * 2 && localY < size + reach * 2) busy = true;

      if (ripples.length > 0) busy = true;

      ripples = ripples.filter((ripple) => (now - ripple.time) * RIPPLE_SPEED < size * 1.6);

      context.clearRect(0, 0, size, size);

      for (let cell = 0; cell < CELLS; cell++) {
        if (now >= readyAt[cell]) level[cell] += (target[cell] - level[cell]) * levelEase;

        if (Math.abs(target[cell] - level[cell]) > 0.004) busy = true;

        const entering = reduceMotion ? 1 : clamp01((appear - threshold[cell]) / 0.3);

        if (entering <= 0) continue;

        const arrived = easeOutCubic(entering);

        if (entering < 1) busy = true;

        let heated = heat[cell];

        if (reduceMotion) {
          posX[cell] = homeX[cell];
          posY[cell] = homeY[cell];
        } else {
          // mola: o ponto é puxado para a posição de casa (ou para o caminho até ela, na entrada)
          const baseX = startX[cell] + (homeX[cell] - startX[cell]) * arrived;

          const baseY = startY[cell] + (homeY[cell] - startY[cell]) * arrived;

          let forceX = (velX[cell] + (baseX - posX[cell]) * 0.11) * 0.8;

          let forceY = (velY[cell] + (baseY - posY[cell]) * 0.11) * 0.8;

          // o mouse empurra e acende os pontos por perto
          const awayX = posX[cell] - localX;

          const awayY = posY[cell] - localY;

          const distance2 = awayX * awayX + awayY * awayY;

          if (distance2 < reach * reach) {
            const distance = Math.sqrt(distance2) || 1;

            const closeness = 1 - distance / reach;

            heated += (Math.max(heated, 0.35 + closeness * 0.65) - heated) * 0.3;

            forceX += (awayX / distance) * closeness * 0.8;
            forceY += (awayY / distance) * closeness * 0.8;
          }

          // a onda do clique acende o ponto quando o "anel" passa por ele
          for (const ripple of ripples) {
            const front = (now - ripple.time) * RIPPLE_SPEED;

            const gap = front - Math.hypot(posX[cell] - ripple.x, posY[cell] - ripple.y);

            if (gap > 0 && gap < RIPPLE_WIDTH) heated = Math.max(heated, Math.sin((gap / RIPPLE_WIDTH) * Math.PI) * ripple.power);
          }

          velX[cell] = forceX;
          velY[cell] = forceY;

          posX[cell] += forceX;
          posY[cell] += forceY;

          heated *= 0.955;

          heat[cell] = heated;

          if (heated > 0.02 || Math.abs(forceX) + Math.abs(forceY) > 0.05) busy = true;
        }

        const power = level[cell];

        // agrupa os pontos por cor: em vez de um preenchimento por ponto, um por cor
        const shimmer = power > 0.04 ? 0.9 + 0.1 * Math.sin(now / 650 + (cell % GRID) * 0.5 + Math.floor(cell / GRID) * 0.5) : 1;

        const key =
          (Math.round(power * LEVEL_STEPS) * (GLOW_STEPS + 1) + Math.round(Math.min(1, heated * 1.4) * GLOW_STEPS)) * SHIMMER_STEPS +
          Math.min(SHIMMER_STEPS - 1, Math.max(0, Math.floor(((shimmer - 0.8) / 0.2) * SHIMMER_STEPS)));

        const square = dot * (0.3 + 0.7 * arrived) * (1 + Math.min(heated, 1) * 0.22);

        let path = paths[key];

        if (!path) {
          path = new Path2D();

          paths[key] = path;

          used.push(key);
        }

        path.roundRect(posX[cell] - square / 2, posY[cell] - square / 2, square, square, square * 0.22);
      }

      for (const key of used) {
        context.fillStyle = FILL_STYLES[key];

        context.fill(paths[key] as Path2D);

        paths[key] = undefined;
      }

      used.length = 0;

      // de vez em quando um ponto do desenho "pisca" sozinho
      if (!reduceMotion && appear > 0.9) {
        const pick = Math.floor(Math.random() * CELLS);

        if (target[pick] > 0 && heat[pick] < 0.3) heat[pick] = 0.3;
      }

      return busy;
    };

    const step = (now: number) => {
      frame = 0;

      if (!inView) return;

      const elapsed = Math.min(64, now - (last || now));

      last = now;

      // seção coberta pela seguinte (invisível e inerte): não há o que pintar
      const covered = canvas.closest("[inert]") !== null;

      if (covered) {
        wasCovered = true;

        frame = requestAnimationFrame(step);

        return;
      }

      if (wasCovered) {
        wasCovered = false;

        busy = true;
      }

      // parado (só o brilho lento, que quase não muda): repinta a ~15 quadros por segundo, não a 60
      if (busy || now - lastPaint >= IDLE_FRAME_MS) {
        busy = paint(now, now - (lastPaint || now) > 64 ? 64 : now - (lastPaint || now));

        lastPaint = now;
      }

      // brilho, mola e piscadas continuam enquanto o display estiver na tela
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame || !inView || reduceMotion) return;

      last = 0;

      frame = requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      if (rect.width === 0) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);

      size = rect.width;

      canvas.width = Math.round(rect.width * ratio);

      canvas.height = Math.round(rect.width * ratio);

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      layout();

      paint(performance.now(), 0);
    };

    requestChange.current = (shape: number) => {
      const bitmap = bitmaps[shape % Math.max(1, bitmaps.length)];

      if (!bitmap) return;

      const now = performance.now();

      target = bitmap;

      busy = true;

      for (let cell = 0; cell < CELLS; cell++) readyAt[cell] = now + DISTANCE[cell] * WAVE_DELAY;

      if (reduceMotion) {
        level.set(bitmap);

        paint(now, 0);
      }
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const onLeave = () => {
      pointer.x = -1e4;
      pointer.y = -1e4;
    };

    const onTouchEnd = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") onLeave();
    };

    const onPress = (event: PointerEvent) => {
      if (reduceMotion) {
        pressRef.current?.();
        return;
      }

      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const radius = Math.max(160, pitch * 14);

      // empurra os pontos para longe do clique (quanto mais perto, mais forte)
      for (let cell = 0; cell < CELLS; cell++) {
        const awayX = posX[cell] - x;

        const awayY = posY[cell] - y;

        const distance = Math.sqrt(awayX * awayX + awayY * awayY) || 1;

        if (distance < radius) {
          const strength = (1 - distance / radius) ** 1.5;

          velX[cell] += (awayX / distance) * strength * 16 + (Math.random() - 0.5) * strength * 4;
          velY[cell] += (awayY / distance) * strength * 16 + (Math.random() - 0.5) * strength * 4;
        }
      }

      ripples.push({ x, y, time: performance.now(), power: 1 });

      busy = true;

      pressRef.current?.();
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;

        busy = true;

        if (inView) {
          start();
          return;
        }

        // saiu da tela: os pontos se espalham de novo e a entrada se repete quando voltar
        if (!reduceMotion) {
          appear = 0;

          scatter();

          context.clearRect(0, 0, size, size);
        }
      },
      { rootMargin: "0px" }
    );

    intersection.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onTouchEnd, { passive: true });
    window.addEventListener("pointercancel", onTouchEnd, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);

    canvas.addEventListener("pointerdown", onPress);

    let cancelled = false;

    Promise.all(sources.map(rasterize)).then((result) => {
      if (cancelled) return;

      bitmaps = result;

      requestChange.current(indexRef.current);
    });

    return () => {
      cancelled = true;

      requestChange.current = () => {};

      resizeObserver.disconnect();

      intersection.disconnect();

      cancelAnimationFrame(frame);

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);

      canvas.removeEventListener("pointerdown", onPress);
    };
  }, [sources]);

  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-manipulation" />
    </div>
  );
}
