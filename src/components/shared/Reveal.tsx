"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos (útil para escalonar cards) */
  delay?: number;
  /** Deslocamento vertical inicial em px */
  y?: number;
}

/** Faz o conteúdo surgir suavemente (fade + subida) quando entra na tela. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
