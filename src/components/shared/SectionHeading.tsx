"use client";

import { Fragment } from "react";

import { motion, type Variants } from "framer-motion";

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

/** Mesma curva de animação usada em todo o site (começa rápida e desacelera suave) */
export const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Atraso entre uma palavra e a seguinte, em segundos */
const WORD_STAGGER = 0.055;

const wordVariants: Variants = {
  hidden: { y: "108%" },
  show: (index: number) => ({
    y: 0,
    transition: { duration: 0.95, ease: EASE, delay: 0.1 + index * WORD_STAGGER },
  }),
};

interface WordsProps {
  text: string;
  /** Índice da primeira palavra no título inteiro (para o atraso continuar de onde parou) */
  start: number;
  className?: string;
}

/**
 * Cada palavra sobe de dentro de uma "máscara" (overflow hidden), uma depois da outra.
 * As variantes "hidden"/"show" vêm do título (pai), então o gatilho de rolagem fica
 * nele: uma palavra escondida na máscara nunca contaria como "visível" sozinha.
 */
function Words({ text, start, className }: WordsProps) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* O padding/margem evitam cortar as hastes de letras como g, p e q */}
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span custom={start + index} variants={wordVariants} className={`inline-block ${className ?? ""}`}>
              {word}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
  viewport: { once: true, amount: 0.4 },
});

export function SectionHeading({ eyebrow, title, highlight, subtitle }: SectionHeadingProps) {
  const titleWords = title.split(" ").length;

  return (
    <div className="mb-12 text-center sm:mb-16">
      <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">{eyebrow}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
      >
        <Words text={title} start={0} />
        {highlight && <Words text={highlight} start={titleWords} className="text-gradient" />}
      </motion.h2>

      {subtitle && (
        <motion.p {...fadeUp(0.35)} className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 sm:text-lg">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
