"use client";

//react
import { useEffect, useRef, useState } from "react";

//next
import Image from "next/image";

import type { StaticImageData } from "next/image";

//animation
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

interface CardImageSliderProps {
  images: StaticImageData[];
  alt: string;
  /** Tempo entre as trocas, em ms. Varia por card para não trocarem todos juntos. */
  intervalMs: number;
}

const SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Imagem do card. Com mais de uma imagem, troca sozinha de tempos em tempos:
 * a nova entra pela direita empurrando a anterior para a esquerda.
 * Só anima enquanto o card está visível na tela.
 */
export function CardImageSlider({ images, alt, intervalMs }: CardImageSliderProps) {
  const [index, setIndex] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const reduceMotion = useReducedMotion();

  const total = images.length;

  const canRotate = total > 1 && inView && !reduceMotion;

  useEffect(() => {
    if (!canRotate) return;

    const id = window.setInterval(() => setIndex((current) => (current + 1) % total), intervalMs);

    return () => window.clearInterval(id);
  }, [canRotate, intervalMs, total]);

  const next = (index + 1) % total;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${alt} (${index + 1}/${total})`}
            fill
            sizes={SIZES}
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* Carrega a próxima imagem antes da troca, para ela já entrar pronta */}
      {total > 1 && (
        <Image
          src={images[next]}
          alt=""
          aria-hidden
          fill
          sizes={SIZES}
          loading="eager"
          className="pointer-events-none -z-10 object-cover opacity-0"
        />
      )}

      {total > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5" aria-hidden>
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-4 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
