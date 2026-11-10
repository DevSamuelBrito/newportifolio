"use client";

//react
import { useEffect, useRef } from "react";

/** Quantidade de pontos por lado do display */
const GRID = 26;

/** Cada ponto é desenhado em um quadrado de `GRID * SUPERSAMPLE` px e depois reduzido, para ter bordas suaves */
const SUPERSAMPLE = 4;

/** Atraso (ms) por ponto de distância do centro: a troca de ícone se espalha em onda */
const WAVE_DELAY = 16;

/** Tempo (ms) que cada ponto leva para chegar a ~63% do valor novo */
const EASE_TIME = 110;

/**
 * Ícones do display, na ordem das experiências (do mais recente ao mais antigo).
 * A geometria é a do lucide (viewBox 24); aqui só viram pontos.
 */
const ICONS: string[] = [
  // engrenagem: sistemas industriais da Canastra (silhueta preenchida: disco + 8 dentes, com furo)
  `<defs><mask id="hole"><rect width="24" height="24" fill="white"/><circle cx="12" cy="12" r="3" fill="black"/></mask></defs>` +
    `<g mask="url(#hole)" fill="white" stroke="none"><circle cx="12" cy="12" r="6.4"/>` +
    [0, 45, 90, 135].map((angle) => `<rect x="10.3" y="2.2" width="3.4" height="19.6" rx="0.5" transform="rotate(${angle} 12 12)"/>`).join("") +
    `</g>`,
  // </>: freelancer
  `<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>`,
  // servidor: setor de TI
  `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`,
  // monitor: estágio de TI
  `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>`,
  // raio: eletricista de manutenção
  `<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" fill="white"/>`,
];

/** Distância de cada ponto ao centro da grade (usada para a onda da troca) */
const DISTANCE = Array.from({ length: GRID * GRID }, (_, index) => {
  const x = (index % GRID) - (GRID - 1) / 2;
  const y = Math.floor(index / GRID) - (GRID - 1) / 2;

  return Math.hypot(x, y);
});

/** Transforma um ícone em uma grade GRID x GRID de intensidades (0 a 1) */
function rasterize(inner: string): Promise<Float32Array> {
  return new Promise((resolve) => {
    const size = GRID * SUPERSAMPLE;

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" width="${size}" height="${size}" ` +
      `fill="none" stroke="white" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext("2d", { willReadFrequently: true });

      const result = new Float32Array(GRID * GRID);

      if (!context) {
        resolve(result);
        return;
      }

      context.drawImage(image, 0, 0, size, size);

      const { data } = context.getImageData(0, 0, size, size);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const cell = Math.floor(y / SUPERSAMPLE) * GRID + Math.floor(x / SUPERSAMPLE);

          result[cell] += data[(y * size + x) * 4 + 3] / 255;
        }
      }

      // média do bloco (alfa) e um pequeno reforço, descartando o que é só "sujeira" de borda
      for (let cell = 0; cell < result.length; cell++) {
        const value = Math.min(1, (result[cell] / (SUPERSAMPLE * SUPERSAMPLE)) * 1.35);

        result[cell] = value < 0.12 ? 0 : value;
      }

      resolve(result);
    };

    image.onerror = () => resolve(new Float32Array(GRID * GRID));

    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

interface PixelDisplayProps {
  /** Qual ícone mostrar (posição da experiência) */
  icon: number;
}

/**
 * Display de pontos (matriz de LED) que mostra um ícone feito de pontos azuis.
 * Ao trocar de ícone, os pontos mudam em onda a partir do centro. Só anima enquanto
 * está na tela e, com prefers-reduced-motion, troca direto, sem animação.
 */
export function PixelDisplay({ icon }: PixelDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const iconRef = useRef(icon);

  // o ícone pedido vai para um ref: o laço de animação (criado uma vez) sempre lê o valor atual
  const requestChange = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    iconRef.current = icon;

    requestChange.current(icon);
  }, [icon]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cells = GRID * GRID;

    const current = new Float32Array(cells);

    let target: Float32Array = new Float32Array(cells);

    const readyAt = new Float32Array(cells);

    let bitmaps: Float32Array[] = [];

    let frame = 0;

    let visible = false;

    let last = 0;

    let cssSize = 0;

    const draw = (now: number) => {
      const pitch = cssSize / GRID;

      const dot = pitch * 0.74;

      const radius = dot * 0.22;

      context.clearRect(0, 0, cssSize, cssSize);

      for (let index = 0; index < cells; index++) {
        const x = index % GRID;

        const y = Math.floor(index / GRID);

        // brilho que passa na diagonal, bem sutil
        const shimmer = 0.9 + 0.1 * Math.sin(now / 650 + (x + y) * 0.5);

        const level = current[index];

        const alpha = (0.07 + level * 0.93) * (level > 0.04 ? shimmer : 1);

        // azul mais escuro nas bordas do desenho, azul-celeste nos pontos mais cheios
        const red = Math.round(37 + level * 88);

        const green = Math.round(99 + level * 112);

        const blue = Math.round(235 + level * 17);

        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        context.beginPath();

        context.roundRect(x * pitch + (pitch - dot) / 2, y * pitch + (pitch - dot) / 2, dot, dot, radius);

        context.fill();
      }
    };

    const step = (now: number) => {
      frame = 0;

      if (!visible) return;

      const elapsed = Math.min(64, now - (last || now));

      last = now;

      const k = 1 - Math.exp(-elapsed / EASE_TIME);

      for (let index = 0; index < cells; index++) {
        if (now >= readyAt[index]) current[index] += (target[index] - current[index]) * k;
      }

      draw(now);

      // o brilho diagonal anima para sempre, enquanto o display estiver na tela
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame || !visible || reduceMotion) return;

      last = 0;

      frame = requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      if (rect.width === 0) return;

      const ratio = window.devicePixelRatio || 1;

      cssSize = rect.width;

      canvas.width = Math.round(rect.width * ratio);

      canvas.height = Math.round(rect.width * ratio);

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      draw(performance.now());
    };

    requestChange.current = (index: number) => {
      const bitmap = bitmaps[index % ICONS.length];

      if (!bitmap) return;

      const now = performance.now();

      target = bitmap;

      for (let cell = 0; cell < cells; cell++) readyAt[cell] = now + DISTANCE[cell] * WAVE_DELAY;

      if (reduceMotion) {
        current.set(bitmap);

        draw(now);
      }
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;

      if (visible) start();
    });

    intersection.observe(canvas);

    let cancelled = false;

    Promise.all(ICONS.map(rasterize)).then((result) => {
      if (cancelled) return;

      bitmaps = result;

      // primeira exibição: os pontos "acendem" em onda a partir do centro
      requestChange.current(iconRef.current);
    });

    return () => {
      cancelled = true;

      requestChange.current = () => {};

      resizeObserver.disconnect();

      intersection.disconnect();

      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
