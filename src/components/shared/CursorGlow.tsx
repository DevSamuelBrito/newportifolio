"use client";

//react
import { useEffect, useRef, useState } from "react";

//animation
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";

//lib
import { softGlow } from "@/lib/softGlow";

const GLOW_SIZE = 1000;

const TRAIL_SIZE = 1400;

/** Raio (px) em que a grade de pontos "acende" em volta do cursor */
const GRID_REVEAL_RADIUS = 340;

const GLOW_BACKGROUND = softGlow("59,130,246", 0.17);

const TRAIL_BACKGROUND = softGlow("139,92,246", 0.08);

/** Mesmo espaçamento da grade de pontos do fundo (Background) */
const GRID_SIZE = 28;

/** Opacidade dos pontos "acesos" no centro do brilho */
const GRID_OPACITY = 0.32;

/** Força dos pontos conforme a distância ao cursor (0 = no cursor, 1 = na borda): some gradualmente */
const GRID_FALLOFF: [number, number][] = [
  [0, 1],
  [0.25, 0.7],
  [0.55, 0.3],
  [0.8, 0.08],
  [1, 0],
];

function gridStrength(ratio: number) {
  for (let i = 1; i < GRID_FALLOFF.length; i++) {
    const [to, toValue] = GRID_FALLOFF[i];

    if (ratio <= to) {
      const [from, fromValue] = GRID_FALLOFF[i - 1];

      return fromValue + ((toValue - fromValue) * (ratio - from)) / (to - from);
    }
  }

  return 0;
}

/**
 * Efeito de luz que acompanha o mouse, no fundo fixo da página (atrás do conteúdo).
 * Três camadas:
 *  1. brilho azul bem suave e grande;
 *  2. um rastro violeta ainda mais fraco e mais lento, que desalinha do brilho
 *     e tira o aspecto de "círculo perfeito";
 *  3. a grade de pontos do fundo "acende" perto do cursor.
 *
 * Só aparece em dispositivos com mouse e é desligado com prefers-reduced-motion.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const [visible, setVisible] = useState(false);

  const gridRef = useRef<HTMLCanvasElement>(null);

  const x = useMotionValue(-GLOW_SIZE);

  const y = useMotionValue(-GLOW_SIZE);

  // Cada camada persegue o cursor com um atraso diferente
  const glowX = useSpring(x, { stiffness: 55, damping: 20, mass: 1 });

  const glowY = useSpring(y, { stiffness: 55, damping: 20, mass: 1 });

  const trailX = useSpring(x, { stiffness: 22, damping: 18, mass: 1.2 });

  const trailY = useSpring(y, { stiffness: 22, damping: 18, mass: 1.2 });

  const gridX = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 });

  const gridY = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 });

  // A grade de pontos acesos é um canvas pequeno (só em volta do cursor) que se move por transform.
  // Antes era uma camada do tamanho da tela com mask-image, que obrigava a GPU a refazer uma
  // superfície inteira a cada quadro da rolagem e deixava a página pesada.
  const drawFrame = useRef(0);

  const drawGrid = () => {
    drawFrame.current = 0;

    const canvas = gridRef.current;

    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const radius = GRID_REVEAL_RADIUS;

    const cursorX = gridX.get();

    const cursorY = gridY.get();

    // o canvas só anda em pixels inteiros; os pontos são desenhados com o resto, para continuarem
    // exatamente sobre a grade do fundo
    const originX = Math.round(cursorX - radius);

    const originY = Math.round(cursorY - radius);

    canvas.style.transform = `translate3d(${originX}px, ${originY}px, 0)`;

    context.clearRect(0, 0, radius * 2, radius * 2);

    const firstColumn = Math.floor(originX / GRID_SIZE);

    const firstRow = Math.floor(originY / GRID_SIZE);

    const columns = Math.ceil((radius * 2) / GRID_SIZE) + 1;

    for (let row = 0; row <= columns; row++) {
      for (let column = 0; column <= columns; column++) {
        // centro do ponto no espaço da página (o "circle at center" de cada ladrilho de 28px)
        const worldX = (firstColumn + column) * GRID_SIZE + GRID_SIZE / 2;

        const worldY = (firstRow + row) * GRID_SIZE + GRID_SIZE / 2;

        const strength = gridStrength(Math.hypot(worldX - cursorX, worldY - cursorY) / radius);

        if (strength <= 0.01) continue;

        context.fillStyle = `rgba(255,255,255,${(strength * GRID_OPACITY).toFixed(3)})`;

        context.beginPath();

        context.arc(worldX - originX, worldY - originY, 1, 0, Math.PI * 2);

        context.fill();
      }
    }
  };

  const scheduleGrid = () => {
    if (!drawFrame.current) drawFrame.current = requestAnimationFrame(drawGrid);
  };

  useMotionValueEvent(gridX, "change", scheduleGrid);

  useMotionValueEvent(gridY, "change", scheduleGrid);

  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer: fine)").matches;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasMouse || reduceMotion) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });

    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0"
    >
      {/* 2. Rastro violeta: mais lento e mais fraco que o brilho principal */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          width: TRAIL_SIZE,
          height: TRAIL_SIZE,
          marginLeft: -TRAIL_SIZE / 2,
          marginTop: -TRAIL_SIZE / 2,
          background: TRAIL_BACKGROUND,
        }}
        className="absolute left-0 top-0"
      />

      {/* 1. Brilho azul principal */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          marginLeft: -GLOW_SIZE / 2,
          marginTop: -GLOW_SIZE / 2,
          background: GLOW_BACKGROUND,
        }}
        className="absolute left-0 top-0"
      />

      {/* 3. A mesma grade de pontos do fundo, mais forte, desenhada só em volta do cursor */}
      <canvas
        ref={gridRef}
        width={GRID_REVEAL_RADIUS * 2}
        height={GRID_REVEAL_RADIUS * 2}
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: GRID_REVEAL_RADIUS * 2, height: GRID_REVEAL_RADIUS * 2 }}
      />
    </motion.div>
  );
}
