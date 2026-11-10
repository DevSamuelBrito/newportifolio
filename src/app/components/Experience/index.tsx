"use client";

//react
import { useEffect, useRef, useState } from "react";

//animation
import { AnimatePresence, motion } from "framer-motion";

//components
import ExperienceCard from "./components/ExperienceCard";

import { PixelDisplay } from "@/components/shared/PixelDisplay";

import { EXPERIENCE_SHAPES } from "@/components/shared/PixelDisplay/shapes";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

const pad = (value: number) => String(value).padStart(2, "0");

export function Experience() {
  const { t } = useTranslation();

  const items = t.experience.data;

  const listRef = useRef<HTMLOListElement | null>(null);

  // Experiência que está no meio da tela: é a que o display da esquerda mostra
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    const update = () => {
      const line = window.innerHeight * 0.5;

      let current = 0;

      [...list.children].forEach((child, index) => {
        if (child.getBoundingClientRect().top <= line) current = index;
      });

      setActive((previous) => (previous === current ? previous : current));
    };

    update();

    window.addEventListener("scroll", update, { passive: true });

    window.addEventListener("resize", update);

    // os cards mudam de altura sem rolagem (troca de idioma, fontes...)
    const observer = new ResizeObserver(update);

    observer.observe(list);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const current = items[active] ?? items[0];

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow={t.experience.eyebrow}
        title={t.experience.heading}
        highlight={t.experience.highlight}
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Painel fixo (só em telas grandes): ícone em pontos da experiência atual + resumo */}
        <aside className="hidden lg:sticky lg:top-28 lg:col-span-5 lg:block lg:self-start">
          <div className="glass p-5">
            <PixelDisplay sources={EXPERIENCE_SHAPES} index={active} />
          </div>

          <div className="glass mt-3 px-5 py-4 font-mono text-xs">
            <p className="flex items-center justify-between text-neutral-500">
              <span className="uppercase tracking-widest text-blue-400">{t.experience.eyebrow}</span>
              <span>
                {pad(active + 1)} / {pad(items.length)}
              </span>
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="mt-2 space-y-0.5"
              >
                <p className="text-sm font-semibold text-white">{current.company}</p>
                <p className="text-neutral-400">{current.role}</p>
                <p className="text-neutral-500">{current.period}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        {/* Linha do tempo: a borda esquerda é a "linha" e cada card tem uma bolinha sobre ela */}
        <ol
          ref={listRef}
          className="mx-auto w-full max-w-4xl space-y-8 border-l border-neutral-800 lg:col-span-7 lg:max-w-none"
        >
          {items.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.period}`}
              active={index === active}
              role={item.role}
              company={item.company}
              period={item.period}
              activities={item.activities}
              technologies={item.technologies}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}
