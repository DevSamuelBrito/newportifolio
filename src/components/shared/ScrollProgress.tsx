"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Linha fina azul no topo da tela que cresce conforme a página é rolada. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // a mola suaviza os saltos da rolagem
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-blue-500 to-cyan-400"
    />
  );
}
