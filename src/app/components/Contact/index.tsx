"use client";

//icons
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

import { MdEmail, MdLocationOn } from "react-icons/md";

//components
import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//data
import { SOCIAL_LINKS } from "@/data/links";

export function Contact() {
  const { t } = useTranslation();

  const links = [
    { title: "LinkedIn", Icon: FaLinkedin, href: SOCIAL_LINKS.linkedin },
    { title: "GitHub", Icon: FaGithub, href: SOCIAL_LINKS.github },
    { title: t.contact.location, Icon: MdLocationOn, href: SOCIAL_LINKS.location },
  ];

  return (
    <Section id="contact">
      <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.heading} highlight={t.contact.highlight} />

      <Reveal>
        <div className="glass mx-auto max-w-3xl p-8 text-center sm:p-12">
          <p className="text-lg leading-relaxed text-neutral-300">{t.contact.description}</p>

          <p className="mt-4 text-base leading-relaxed text-neutral-400">{t.contact.description3}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={SOCIAL_LINKS.email} className="btn-primary">
              <MdEmail size={18} />
              {t.contact.email}
            </a>

            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FaWhatsapp size={18} />
              {t.contact.whatsapp}
            </a>
          </div>

          <ul className="mt-8 flex items-center justify-center gap-3 border-t border-neutral-800/60 pt-8">
            {links.map(({ title, Icon, href }) => (
              <li key={title}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  title={title}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 transition-all duration-300 hover:border-blue-500/50 hover:text-blue-400"
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
