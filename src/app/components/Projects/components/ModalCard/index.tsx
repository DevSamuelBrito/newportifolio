"use client";

//react
import { useEffect, useRef } from "react";

//icons
import { X } from "lucide-react";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

//animation
import { motion } from "framer-motion";

//components
import { ImageCarousel } from "./components/ImageCarousel";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//types
import type { Project } from "../../types";

interface ModalCardProps {
  onClose: () => void;
  data: Project;
}

const LINK_CLASS = "btn-secondary flex-1 !px-4 !py-2.5 text-sm";

/**
 * Modal de detalhes do projeto. É renderizado só quando há um projeto
 * selecionado (o controle fica na seção Projects).
 */
export default function ModalCard({ onClose, data }: ModalCardProps) {
  const { t, language } = useTranslation();

  const closeButton = useRef<HTMLButtonElement>(null);

  const description = language === "en" ? data.descriptionEn : data.descriptionBr;

  const title = language === "en" ? data.titleEn : data.titleBr;

  // Trava a rolagem da página, fecha com ESC e leva o foco para o botão de fechar
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButton.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex max-h-[90vh] w-full max-w-6xl flex-col rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-2xl sm:p-8"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          className="absolute right-3 top-3 z-10 rounded-full border border-neutral-800 bg-neutral-900 p-2 text-neutral-300 transition-colors hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto md:flex-row md:overflow-hidden">
          {/* Coluna esquerda: imagens e links */}
          <div className="flex w-full flex-shrink-0 flex-col justify-center gap-5 md:w-1/2">
            <ImageCarousel
              images={data.images && data.images.length > 0 ? data.images : [data.src]}
              alt={title}
              priority={data.index <= 2}
            />

            <div className="flex flex-wrap gap-3">
              {data.repository && (
                <a href={data.repository} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  <FaGithub size={16} />
                  {t.projects.buttonGithub}
                </a>
              )}

              {data.post && (
                <a href={data.post} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  <FaExternalLinkAlt size={14} />
                  {t.projects.checkPost}
                </a>
              )}

              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  <TbWorld size={16} />
                  {t.projects.websiteLink}
                </a>
              )}
            </div>
          </div>

          {/* Coluna direita: título, descrição com rolagem e stack */}
          <div className="flex min-h-0 flex-1 flex-col md:w-1/2">
            <h2 className="flex-shrink-0 border-b border-neutral-800 pb-3 pr-10 text-2xl font-bold text-white">
              {title}
            </h2>

            <div className="min-h-0 flex-1 overflow-y-auto py-4 pr-2">
              <div className="space-y-4 break-words text-base leading-relaxed text-neutral-400">
                {description.map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <ul className="flex flex-shrink-0 flex-wrap items-center gap-2 border-t border-neutral-800 pt-4">
              {data.stack.map((Icon, i) => (
                <li
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-blue-400"
                >
                  <Icon size={18} aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
