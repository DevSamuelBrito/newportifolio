"use client";

//react
import { useCallback, useMemo, useState } from "react";

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

  const closeModal = useCallback(() => setSelected(null), []);

  // Mais recentes primeiro
  const sortedProjects = useMemo(() => [...ProjectsData].sort((a, b) => b.index - a.index), []);

  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, INITIAL_VISIBLE);

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

      <AnimatePresence>{selected && <ModalCard key={selected.id} data={selected} onClose={closeModal} />}</AnimatePresence>
    </Section>
  );
}
