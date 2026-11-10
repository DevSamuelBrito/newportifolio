"use client";

//react
import { useEffect, useRef } from "react";

//icons
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

//animation
import { motion } from "framer-motion";

//components
import { DescriptionBlocks } from "./components/DescriptionBlocks";

import { ModalGallery } from "./components/ModalGallery";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//data
import { getBrandColor, getBrandName } from "@/data/brandColors";

//types
import type { Project } from "../../types";

interface ModalCardProps {
  data: Project;
  onClose: () => void;
  /** Troca de projeto sem fechar o modal (-1 = anterior, 1 = próximo) */
  onNavigate: (direction: -1 | 1) => void;
  /** Posição do projeto na lista (começa em 1) e tamanho da lista */
  position: number;
  total: number;
  previous: Project | null;
  next: Project | null;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal de detalhes do projeto. É renderizado uma única vez, controlado pela
 * seção Projects; trocar de projeto só muda o conteúdo.
 */
export default function ModalCard({ data, onClose, onNavigate, position, total, previous, next }: ModalCardProps) {
  const { t, language } = useTranslation();

  const dialogRef = useRef<HTMLDivElement>(null);

  const closeButton = useRef<HTMLButtonElement>(null);

  const isEn = language === "en";

  const titleOf = (project: Project) => (isEn ? project.titleEn : project.titleBr);

  const title = titleOf(data);

  const description = isEn ? data.descriptionEn : data.descriptionBr;

  const images = data.images && data.images.length > 0 ? data.images : [data.src];

  // Trava a rolagem da página, fecha com ESC, prende o foco (Tab) dentro do modal
  // e devolve o foco ao elemento anterior quando fecha.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButton.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];

      if (focusable.length === 0) return;

      const first = focusable[0];

      const last = focusable[focusable.length - 1];

      const active = document.activeElement;

      if (!dialogRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const hasLinks = Boolean(data.website || data.repository || data.post);

  const hasNavigation = total > 1 && previous !== null && next !== null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          className="absolute right-3 top-3 z-20 rounded-full border border-neutral-700 bg-neutral-900/90 p-2 text-neutral-300 backdrop-blur transition-colors hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Celular: o conteúdo todo rola junto. Desktop: só a descrição rola. */}
        <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 gap-6 p-5 sm:p-8 lg:h-[min(76vh,720px)] lg:grid-cols-12 lg:gap-8"
          >
            {/* Coluna esquerda (desktop): galeria + tecnologias. No celular os filhos entram direto na grade. */}
            <div className="contents lg:col-span-7 lg:flex lg:min-h-0 lg:flex-col lg:gap-6 lg:overflow-y-auto lg:pr-1">
              <ModalGallery images={images} alt={title} />

              <section className="order-last lg:order-none">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  {t.projects.technologies}
                </h3>

                <ul className="flex flex-wrap gap-2">
                  {data.stack.map((Icon, index) => (
                    <li key={index} className="tag gap-2 !px-3 !py-1.5 text-sm">
                      <Icon size={16} style={{ color: getBrandColor(Icon) }} aria-hidden />
                      {getBrandName(Icon)}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Coluna direita: título, links e descrição */}
            <div className="flex min-h-0 flex-col lg:col-span-5">
              <h2 className="pr-12 text-2xl font-bold leading-tight text-white sm:text-3xl">{title}</h2>

              {hasLinks && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !px-4 !py-2 text-sm"
                  >
                    <TbWorld size={16} />
                    {t.projects.websiteLink}
                  </a>
                )}

                {data.repository && (
                  <a
                    href={data.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !px-4 !py-2 text-sm"
                  >
                    <FaGithub size={16} />
                    {t.projects.buttonGithub}
                  </a>
                )}

                {data.post && (
                  <a
                    href={data.post}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !px-4 !py-2 text-sm"
                  >
                    <FaExternalLinkAlt size={14} />
                    {t.projects.checkPost}
                  </a>
                )}
              </div>
              )}

              {/* No desktop a descrição rola e some em degradê no fim, indicando que há mais */}
              <div className="mt-5 min-h-0 flex-1 pb-2 lg:overflow-y-auto lg:pb-10 lg:pr-2 lg:[mask-image:linear-gradient(to_bottom,black_calc(100%-48px),transparent)]">
                <DescriptionBlocks lines={description} />
              </div>
            </div>
          </motion.div>
        </div>

        {hasNavigation && (
          <nav
            aria-label="Projetos"
            className="flex items-center justify-between gap-4 border-t border-neutral-800 bg-neutral-950 px-4 py-3 sm:px-8"
          >
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="group flex min-w-0 items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <ChevronLeft size={18} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span className="truncate">
                <span className="hidden text-neutral-600 sm:inline">{t.projects.previous}: </span>
                {titleOf(previous)}
              </span>
            </button>

            <span className="shrink-0 text-xs tabular-nums text-neutral-500">
              {position} / {total}
            </span>

            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="group flex min-w-0 items-center justify-end gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <span className="truncate">
                <span className="hidden text-neutral-600 sm:inline">{t.projects.next}: </span>
                {titleOf(next)}
              </span>
              <ChevronRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          </nav>
        )}
      </motion.div>
    </motion.div>
  );
}
