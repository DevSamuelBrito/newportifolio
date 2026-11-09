"use client";

//next
import Image from "next/image";

//icons
import { ArrowUpRight } from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

//components
import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//types
import type { Project } from "../../types";

interface ProjectCardProps {
  data: Project;
  /** Posição do card na grade, usada para escalonar a animação */
  position: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ data, position, onOpen }: ProjectCardProps) {
  const { t, language } = useTranslation();

  const title = language === "en" ? data.titleEn : data.titleBr;

  const description = (language === "en" ? data.descriptionEn : data.descriptionBr)[0];

  return (
    <Reveal delay={(position % 3) * 0.1} className="h-full">
      <article className="glass glass-hover group flex h-full flex-col overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(data)}
          aria-label={`${t.projects.details}: ${title}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-neutral-900 text-left"
        >
          <Image
            src={data.src}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" aria-hidden />
        </button>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-bold text-white">{title}</h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">{description}</p>

          <ul className="mb-5 mt-4 flex flex-wrap items-center gap-2">
            {data.stack.map((Icon, i) => (
              <li
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-blue-400"
              >
                <Icon size={16} aria-hidden />
              </li>
            ))}
          </ul>

          <div className="mt-auto flex min-h-[3.25rem] items-center justify-between border-t border-neutral-800/60 pt-3">
            <button
              type="button"
              onClick={() => onOpen(data)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-all hover:gap-2.5 hover:text-blue-300"
            >
              {t.projects.details}
              <ArrowUpRight size={16} />
            </button>

            <div className="flex items-center gap-1">
              {data.repository && (
                <a
                  href={data.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.projects.buttonGithub}
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
                  className="rounded-lg p-2 text-neutral-400 transition-colors hover:text-white"
                >
                  <TbWorld size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
