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
import { getBrandColor } from "@/data/brandColors";

//types
import type { Project } from "../../types";

interface ProjectCardProps {
  data: Project;
  /** Posição do card na grade, usada para escalonar a animação */
  position: number;
  /** Outro card está com o mouse em cima: este fica desfocado ao fundo */
  dimmed: boolean;
  onOpen: (project: Project) => void;
  /** Avisa a seção qual card está em destaque (null = nenhum) */
  onHoverChange: (id: string | null) => void;
}

export function ProjectCard({ data, position, dimmed, onOpen, onHoverChange }: ProjectCardProps) {
  const { t, language } = useTranslation();

  const reduceMotion = useReducedMotion();

  const title = language === "en" ? data.titleEn : data.titleBr;

  const description = (language === "en" ? data.descriptionEn : data.descriptionBr)[0];

  const images = data.images && data.images.length > 0 ? data.images : [data.src];

  // Tremidinha suave, em loop, só enquanto o mouse está em cima: convida ao clique
  const hoverAnimation = reduceMotion
    ? undefined
    : {
        scale: 1.05,
        y: -10,
        rotate: [0, -0.7, 0.7, -0.5, 0.5, 0],
        transition: {
          scale: { duration: 0.3, ease: "easeOut" as const },
          y: { duration: 0.3, ease: "easeOut" as const },
          rotate: { duration: 1.4, ease: "easeInOut" as const, repeat: Infinity, repeatDelay: 0.5 },
        },
      };

  return (
    // z-20 no hover: o card em destaque fica por cima dos vizinhos
    <Reveal delay={(position % 3) * 0.1} className="relative h-full hover:z-20 focus-within:z-20">
      {/* O desfoque fica neste wrapper (e não no Reveal) porque o Reveal controla a opacidade */}
      <div
        onMouseEnter={() => onHoverChange(data.id)}
        onMouseLeave={() => onHoverChange(null)}
        onFocusCapture={() => onHoverChange(data.id)}
        onBlurCapture={() => onHoverChange(null)}
        className={`h-full transition-[filter,opacity] duration-300 ${
          dimmed ? "opacity-40 blur-[3px]" : "opacity-100 blur-0"
        }`}
      >
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
