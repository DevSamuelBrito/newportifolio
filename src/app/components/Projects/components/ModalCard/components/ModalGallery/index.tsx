"use client";

//react
import { useCallback, useEffect, useRef, useState } from "react";

//next
import Image from "next/image";

import type { StaticImageData } from "next/image";

//icons
import { ChevronLeft, ChevronRight } from "lucide-react";

//animation
import { AnimatePresence, motion } from "framer-motion";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

interface ModalGalleryProps {
  images: StaticImageData[];
  alt: string;
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction >= 0 ? "30%" : "-30%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? "-30%" : "30%", opacity: 0 }),
};

const SWIPE_THRESHOLD = 50;

/**
 * Galeria do modal: imagem principal sem faixas vazias (a própria imagem,
 * desfocada, preenche o fundo), setas, contador, miniaturas clicáveis,
 * deslizar no celular e teclas ← →.
 */
export function ModalGallery({ images, alt }: ModalGalleryProps) {
  const { t } = useTranslation();

  const [[current, direction], setCurrent] = useState<[number, number]>([0, 0]);

  const touchStartX = useRef(0);

  const activeThumb = useRef<HTMLButtonElement>(null);

  const total = images.length;

  const hasMultiple = total > 1;

  const goTo = useCallback((index: number, dir: number) => setCurrent([index, dir]), []);

  const goPrev = useCallback(
    () => setCurrent(([i]) => [i === 0 ? total - 1 : i - 1, -1]),
    [total]
  );

  const goNext = useCallback(
    () => setCurrent(([i]) => [i === total - 1 ? 0 : i + 1, 1]),
    [total]
  );

  // Teclas ← → trocam a imagem enquanto o modal está aberto
  useEffect(() => {
    if (!hasMultiple) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasMultiple, goPrev, goNext]);

  // Mantém a miniatura ativa visível na faixa (sem rolar o modal na vertical)
  useEffect(() => {
    activeThumb.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [current]);

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;

    if (delta > 0) goPrev();
    else goNext();
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* A mesma imagem, desfocada, preenche as sobras do quadro */}
            <Image
              src={images[current]}
              alt=""
              aria-hidden
              fill
              sizes="64px"
              className="scale-125 object-cover opacity-50 blur-2xl"
            />
            <Image
              src={images[current]}
              alt={hasMultiple ? `${alt} (${current + 1}/${total})` : alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={current === 0}
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={t.projects.previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur transition-colors hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={t.projects.nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur transition-colors hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>

            <span className="absolute bottom-2 right-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur">
              {current + 1} / {total}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <ul className="flex gap-2 overflow-x-auto pb-1" role="list">
          {images.map((image, index) => {
            const isActive = index === current;

            return (
              <li key={index} className="shrink-0">
                <button
                  ref={isActive ? activeThumb : undefined}
                  type="button"
                  onClick={() => goTo(index, index > current ? 1 : -1)}
                  aria-label={`${t.projects.goToImage} ${index + 1}`}
                  aria-current={isActive}
                  className={`relative block h-14 w-24 overflow-hidden rounded-lg border-2 bg-neutral-900 transition-all duration-200 ${
                    isActive ? "border-blue-500" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={image} alt="" aria-hidden fill sizes="96px" className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
