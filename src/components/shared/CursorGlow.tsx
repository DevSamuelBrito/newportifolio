"use client";

//react
import { useEffect, useState } from "react";

//animation
import { motion, useMotionValue, useSpring } from "framer-motion";

const GLOW_SIZE = 680;

const CORE_SIZE = 300;

/**
 * Degradê radial: a cor vai sumindo aos poucos até ficar transparente, sem
 * nenhuma borda. É mais suave que um círculo sólido com blur.
 */
const GLOW_BACKGROUND =
  "radial-gradient(circle, rgba(59,130,246,0.26) 0%, rgba(59,130,246,0.14) 30%, rgba(59,130,246,0.05) 55%, transparent 72%)";

const CORE_BACKGROUND =
  "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)";

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

  // O brilho "flutua" atrás do cursor, com um atraso longo e macio
  const smoothX = useSpring(x, { stiffness: 55, damping: 20, mass: 1 });

  const smoothY = useSpring(y, { stiffness: 55, damping: 20, mass: 1 });

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
      {/* Brilho grande e suave */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          marginLeft: -GLOW_SIZE / 2,
          marginTop: -GLOW_SIZE / 2,
          background: GLOW_BACKGROUND,
        }}
        className="absolute left-0 top-0 rounded-full"
      />

      {/* Núcleo menor, um tom mais claro, para dar profundidade */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          width: CORE_SIZE,
          height: CORE_SIZE,
          marginLeft: -CORE_SIZE / 2,
          marginTop: -CORE_SIZE / 2,
          background: CORE_BACKGROUND,
        }}
        className="absolute left-0 top-0 rounded-full"
      />
    </motion.div>
  );
}
