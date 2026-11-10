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

/** Máscara da grade: aparece perto do cursor e some gradualmente */
const GRID_MASK = `radial-gradient(circle ${GRID_REVEAL_RADIUS}px at var(--mx, -999px) var(--my, -999px), black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.08) 80%, transparent 100%)`;

/**
 * Efeito de luz que acompanha o mouse, por cima das seções (mix-blend screen: só
 * ilumina, não cobre o conteúdo). Três camadas:
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

  const gridRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-GLOW_SIZE);

  const y = useMotionValue(-GLOW_SIZE);

  // Cada camada persegue o cursor com um atraso diferente
  const glowX = useSpring(x, { stiffness: 55, damping: 20, mass: 1 });

  const glowY = useSpring(y, { stiffness: 55, damping: 20, mass: 1 });

  const trailX = useSpring(x, { stiffness: 22, damping: 18, mass: 1.2 });

  const trailY = useSpring(y, { stiffness: 22, damping: 18, mass: 1.2 });

  const gridX = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 });

  const gridY = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 });

  // A grade acompanha o cursor de perto, por variáveis CSS lidas pela máscara
  useMotionValueEvent(gridX, "change", (value) => gridRef.current?.style.setProperty("--mx", `${value}px`));

  useMotionValueEvent(gridY, "change", (value) => gridRef.current?.style.setProperty("--my", `${value}px`));

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
      className="pointer-events-none fixed inset-0 z-20 mix-blend-screen"
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

      {/* 3. A mesma grade de pontos do fundo, mais forte, revelada por uma máscara em volta do cursor */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          opacity: 0.2,
          backgroundImage: "radial-gradient(circle at center, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
    </motion.div>
  );
}
