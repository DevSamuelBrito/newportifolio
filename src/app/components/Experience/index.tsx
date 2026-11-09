"use client";

//components
import ExperienceCard from "./components/ExperienceCard";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Experience() {
  const { t } = useTranslation();

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow={t.experience.eyebrow}
        title={t.experience.heading}
        highlight={t.experience.highlight}
      />

      {/* Linha do tempo: a borda esquerda é a "linha" e cada card tem uma bolinha sobre ela */}
      <ol className="mx-auto max-w-4xl space-y-8 border-l border-neutral-800">
        {t.experience.data.map((item) => (
          <ExperienceCard
            key={`${item.company}-${item.period}`}
            role={item.role}
            company={item.company}
            period={item.period}
            activities={item.activities}
            technologies={item.technologies}
          />
        ))}
      </ol>
    </Section>
  );
}
