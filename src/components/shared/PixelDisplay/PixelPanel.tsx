"use client";

//react
import { useEffect, useRef, useState, type ReactNode } from "react";

//animation
import { AnimatePresence, motion } from "framer-motion";

//components
import { PixelDisplay } from "./index";

import type { ShapeSource } from "./shapes";

const HEX = "0123456789abcdef";

const randomHash = () => Array.from({ length: 7 }, () => HEX[Math.floor(Math.random() * 16)]).join("");

interface PixelPanelProps {
  sources: ShapeSource[];
  /** Qual forma mostrar */
  index?: number;
  /** Hash que aparece antes de qualquer clique (fixo, para a hidratação não divergir) */
  initialHash: string;
  /** Texto do canto direito do cartão; recebe quantos cliques (commits novos) já aconteceram */
  counter: (extraCommits: number) => string;
  /** Começo colorido da mensagem, ex.: "merge:" */
  prefix: string;
  message: ReactNode;
}

/**
 * Display de pontos + cartão de "commit" embaixo. Ao clicar no display, o hash do commit
 * embaralha até virar um novo e aparece um "+1 commit" no canto.
 */
export function PixelPanel({ sources, index = 0, initialHash, counter, prefix, message }: PixelPanelProps) {
  const [hash, setHash] = useState(initialHash);

  const [extra, setExtra] = useState(0);

  const [badges, setBadges] = useState<number[]>([]);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextBadge = useRef(0);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const commit = () => {
    const final = randomHash();

    let step = 0;

    if (timer.current) clearInterval(timer.current);

    // as letras do hash "travam" uma a uma, da esquerda para a direita
    timer.current = setInterval(() => {
      step++;

      setHash(step >= 8 ? final : Array.from({ length: 7 }, (_, i) => (i < step - 1 ? final[i] : HEX[Math.floor(Math.random() * 16)])).join(""));

      if (step >= 8 && timer.current) clearInterval(timer.current);
    }, 40);

    setExtra((value) => value + 1);

    const id = nextBadge.current++;

    setBadges((list) => [...list, id]);

    setTimeout(() => setBadges((list) => list.filter((item) => item !== id)), 1200);
  };

  return (
    <div>
      <div className="glass p-5">
        <PixelDisplay sources={sources} index={index} onPress={commit} />
      </div>

      <div className="glass relative mt-3 px-5 py-4 font-mono text-xs">
        <p className="flex items-center justify-between text-neutral-500">
          <span className="text-blue-400">{hash}</span>
          <span>{counter(extra)}</span>
        </p>

        <p className="mt-2 text-neutral-300">
          <span className="text-cyan-400">{prefix}</span> <span className="text-white">{message}</span>
        </p>

        <AnimatePresence>
          {badges.map((id) => (
            <motion.span
              key={id}
              aria-hidden
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="absolute -top-3 right-4 rounded-full border border-blue-400/40 bg-neutral-950 px-2 py-0.5 text-[10px] text-blue-300"
            >
              +1 commit
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
