"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  /** Texto pequeno em maiúsculas acima do título (ex.: "SOBRE") */
  eyebrow: string;
  /** Parte normal do título */
  title: string;
  /** Parte do título em degradê azul (opcional) */
  highlight?: string;
  /** Linha de apoio abaixo do título (opcional) */
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, highlight, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className="mb-12 text-center sm:mb-16"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
