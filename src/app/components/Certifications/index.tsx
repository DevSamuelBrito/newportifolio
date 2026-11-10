"use client";

//components
import CertificationsCard from "./components/CertificationsCard";

import { PixelPanel } from "@/components/shared/PixelDisplay/PixelPanel";

import { BRANCH_SHAPES } from "@/components/shared/PixelDisplay/shapes";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Certifications() {
  const { t } = useTranslation();

  // cada formação conta como um "commit" no grafo do painel
  const total = t.certifications.graduation.length + t.certifications.data.length;

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow={t.certifications.eyebrow}
        title={t.certifications.heading}
        highlight={t.certifications.highlight}
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Painel fixo (só em telas grandes): grafo de commits em pontos; clique para "commitar" */}
        <aside className="hidden lg:sticky lg:top-28 lg:col-span-5 lg:block lg:self-start">
          <PixelPanel
            sources={BRANCH_SHAPES}
            initialHash="a3f9c21"
            counter={(extra) => `${total + extra} commits`}
            prefix="merge:"
            message={t.certifications.merge}
          />
        </aside>

        <div className="lg:col-span-7">
          <h3 className="mb-5 text-sm font-medium uppercase tracking-widest text-neutral-400">
            {t.certifications.graduationTitle}
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {t.certifications.graduation.map((item, index) => (
              <CertificationsCard
                key={item.name}
                index={index}
                name={item.name}
                issuer={item.institution}
                description={item.description}
                date={item.date}
                link={item.link}
                graduation
              />
            ))}
          </div>

          <h3 className="mb-5 mt-14 text-sm font-medium uppercase tracking-widest text-neutral-400">
            {t.certifications.title}
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {t.certifications.data.map((item, index) => (
              <CertificationsCard
                key={item.name}
                index={index}
                name={item.name}
                issuer={item.issuer}
                description={item.description}
                date={item.date}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
