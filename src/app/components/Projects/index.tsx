"use client";

//react
import { useCallback, useEffect, useMemo, useState } from "react";

import { createPortal } from "react-dom";

//icons
import { ChevronDown, ChevronUp } from "lucide-react";

//animation
import { AnimatePresence } from "framer-motion";

//data
import { ProjectsData } from "./data/projectsData";

//components
import { ProjectCard } from "./components/ProjectCard";

import ModalCard from "./components/ModalCard";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//types
import type { Project } from "./types";

const INITIAL_VISIBLE = 6;

export function Projects() {
  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(false);

  const [selected, setSelected] = useState<Project | null>(null);

  // O modal vai para o <body>: dentro da seção (uma folha empilhada com z-index próprio)
  // as folhas seguintes o cobririam.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeModal = useCallback(() => setSelected(null), []);

  // Mais recentes primeiro
  const sortedProjects = useMemo(() => [...ProjectsData].sort((a, b) => b.index - a.index), []);

  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, INITIAL_VISIBLE);

  // Navegação anterior/próximo dentro do modal (circular, só entre os projetos visíveis)
  const selectedIndex = selected ? visibleProjects.findIndex((project) => project.id === selected.id) : -1;

  const neighbor = (offset: -1 | 1) =>
    selectedIndex === -1
      ? null
      : visibleProjects[(selectedIndex + offset + visibleProjects.length) % visibleProjects.length];

  const navigate = (direction: -1 | 1) => {
    const target = neighbor(direction);
    if (target) setSelected(target);
  };

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={t.projects.heading}
        highlight={t.projects.highlight}
        subtitle={t.projects.subtitle}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, position) => (
          <ProjectCard
            key={project.id}
            data={project}
            position={position}
            onOpen={setSelected}
          />
        ))}
      </div>

      {sortedProjects.length > INITIAL_VISIBLE && (
        <Reveal className="mt-12 flex justify-center">
          <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-secondary">
            {showAll ? t.projects.showLess : t.projects.showMore}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </Reveal>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && (
              // A chave é fixa: trocar de projeto só troca o conteúdo, sem remontar o modal
              <ModalCard
                key="project-modal"
                data={selected}
                onClose={closeModal}
                onNavigate={navigate}
                position={selectedIndex + 1}
                total={visibleProjects.length}
                previous={neighbor(-1)}
                next={neighbor(1)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}
