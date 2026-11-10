"use client";

//icons
import { ArrowUpRight } from "lucide-react";

//components
import { PhotoStage } from "./components/PhotoStage";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//utils
import { parseHighlight } from "@/utils/parseHighlight";

//data
import { RESUME_FILES } from "@/data/links";

export function About() {
  const { t, language } = useTranslation();

  const resume = RESUME_FILES[language];

  const paragraphs = [t.about.about, t.about.about2, t.about.about3, t.about.about4];

  return (
    <Section id="about">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.heading} highlight={t.about.highlight} />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="flex justify-center overflow-x-clip pt-6 lg:col-span-4 lg:overflow-x-visible lg:pt-0">
          <PhotoStage />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="glass p-6 sm:p-8">
            <p className="text-xl font-light leading-relaxed text-neutral-200">{parseHighlight(paragraphs[0])}</p>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-400 sm:text-lg">
              {paragraphs.slice(1).map((paragraph, index) => (
                <p key={index}>{parseHighlight(paragraph)}</p>
              ))}
            </div>

            <div className="mt-8 border-t border-neutral-800/60 pt-6">
              <a
                href={resume.href}
                download={resume.name}
                className="group inline-flex items-center gap-2 font-medium text-blue-400 transition-all hover:gap-3"
              >
                {t.about.resume}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
