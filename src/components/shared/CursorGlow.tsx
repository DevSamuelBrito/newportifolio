"use client";

//react
import { useEffect, useState } from "react";

//animation
import { motion, useMotionValue, useSpring } from "framer-motion";

const GLOW_SIZE = 460;

const CORE_SIZE = 180;

/**
 * Brilho azul desfocado que acompanha o mouse no fundo da página.
 * Só aparece em dispositivos com mouse (não em telas de toque) e é
 * desativado quando o usuário prefere menos animação.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-GLOW_SIZE);

  const y = useMotionValue(-GLOW_SIZE);

  // O brilho "persegue" o cursor com um atraso suave, em vez de grudar nele
  const smoothX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.7 });

  const smoothY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.7 });

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
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute inset-0"
    >
      {/* Brilho grande e suave */}
      <motion.div
        style={{ x: smoothX, y: smoothY, marginLeft: -GLOW_SIZE / 2, marginTop: -GLOW_SIZE / 2 }}
        className="absolute left-0 top-0 rounded-full bg-blue-500/40 blur-3xl"
        initial={false}
      >
        <div style={{ width: GLOW_SIZE, height: GLOW_SIZE }} />
      </motion.div>

      {/* Núcleo menor e mais claro, para dar o ponto de luz */}
      <motion.div
        style={{ x: smoothX, y: smoothY, marginLeft: -CORE_SIZE / 2, marginTop: -CORE_SIZE / 2 }}
        className="absolute left-0 top-0 rounded-full bg-cyan-400/30 blur-2xl"
        initial={false}
      >
        <div style={{ width: CORE_SIZE, height: CORE_SIZE }} />
      </motion.div>
    </motion.div>
  );
}
