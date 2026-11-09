"use client";

//components
import CertificationsCard from "./components/CertificationsCard";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Certifications() {
  const { t } = useTranslation();

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow={t.certifications.eyebrow}
        title={t.certifications.heading}
        highlight={t.certifications.highlight}
      />

      <h3 className="mb-5 text-sm font-medium uppercase tracking-widest text-neutral-400">
        {t.certifications.graduationTitle}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </Section>
  );
}
