"use client";

//icons
import { ArrowUpRight } from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

//animation
import { motion, useReducedMotion } from "framer-motion";

//components
import { CardImageSlider } from "../CardImageSlider";

import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//data
import { getBrandColor, getBrandName } from "@/data/brandColors";

//types
import type { Project } from "../../types";

/** Segundos com o mouse em cima até o balanço começar (só o tempo do card terminar de subir) */
const WOBBLE_DELAY = 0.15;

/**
 * Um ciclo do balanço (graus): começa forte, acalma no meio e volta a ficar forte.
 * Termina em 0 e o ciclo se repete sem pausa enquanto o mouse estiver em cima.
 */
const WOBBLE_ROTATE = [0, -1.6, 1.6, -1.3, 1.3, -0.7, 0.7, -0.3, 0.3, -0.7, 0.7, -1.3, 1.3, -1.6, 0];

/** Duração (s) de um ciclo completo do balanço */
const WOBBLE_DURATION = 3.6;

interface ProjectCardProps {
  data: Project;
  /** Posição do card na grade, usada para escalonar a animação */
  position: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ data, position, onOpen }: ProjectCardProps) {
  const { t, language } = useTranslation();

  const reduceMotion = useReducedMotion();

  const title = language === "en" ? data.titleEn : data.titleBr;

  const description = (language === "en" ? data.descriptionEn : data.descriptionBr)[0];

  const images = data.images && data.images.length > 0 ? data.images : [data.src];

  // O card cresce e sobe na hora e logo em seguida balança em loop enquanto o mouse
  // estiver em cima: forte no começo, mais calmo no meio e forte de novo (WOBBLE_ROTATE).
  const hoverAnimation = reduceMotion
    ? undefined
    : {
        scale: 1.05,
        y: -10,
        rotate: WOBBLE_ROTATE,
        transition: {
          scale: { duration: 0.3, ease: "easeOut" as const },
          y: { duration: 0.3, ease: "easeOut" as const },
          rotate: {
            duration: WOBBLE_DURATION,
            ease: "easeInOut" as const,
            delay: WOBBLE_DELAY,
            repeat: Infinity,
          },
        },
      };

  return (
    // z-20 no hover: o card em destaque fica por cima dos vizinhos
    <Reveal delay={(position % 3) * 0.1} className="relative h-full hover:z-20 focus-within:z-20">
      <div className="h-full">
        <motion.article
          whileHover={hoverAnimation}
          onClick={() => onOpen(data)}
          className="glass group flex h-full cursor-pointer flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          <button
            type="button"
            aria-label={`${t.projects.details}: ${title}`}
            className="relative block aspect-[16/10] w-full overflow-hidden bg-neutral-900 text-left"
          >
            <CardImageSlider images={images} alt={title} intervalMs={3800 + position * 450} />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent"
              aria-hidden
            />
          </button>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-xl font-bold text-white">{title}</h3>

            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">{description}</p>

            <ul className="mb-5 mt-4 flex flex-wrap items-center gap-2">
              {data.stack.map((Icon, i) => (
                <li
                  key={i}
                  title={getBrandName(Icon)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900"
                >
                  <Icon size={16} style={{ color: getBrandColor(Icon) }} aria-hidden />
                </li>
              ))}
            </ul>

            <div className="mt-auto flex min-h-[3.25rem] items-center justify-between border-t border-neutral-800/60 pt-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-all group-hover:gap-2.5 group-hover:text-blue-300">
                {t.projects.details}
                <ArrowUpRight size={16} />
              </span>

              <div className="flex items-center gap-1">
                {data.repository && (
                  <a
                    href={data.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.projects.buttonGithub}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-lg p-2 text-neutral-400 transition-colors hover:text-white"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.projects.websiteLink}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-lg p-2 text-neutral-400 transition-colors hover:text-white"
                  >
                    <TbWorld size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </Reveal>
  );
}
