"use client";

//icons
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";

//components
import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

interface CertificationsCardProps {
  /** Posição na grade, usada para escalonar a animação */
  index: number;
  name: string;
  issuer: string;
  date: string;
  description: string;
  /** Link do certificado (vazio = sem botão) */
  link?: string;
  /** Usa o ícone de capelo (graduação) em vez do de certificado */
  graduation?: boolean;
}

const CertificationsCard = ({ index, name, issuer, date, description, link, graduation }: CertificationsCardProps) => {
  const { t } = useTranslation();

  const Icon = graduation ? GraduationCap : Award;

  return (
    <Reveal delay={(index % 3) * 0.1} className="h-full">
      <article className="glass glass-hover flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
            <Icon size={22} aria-hidden />
          </span>
          <span className="pt-1 text-sm text-neutral-500">{date}</span>
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-white">{name}</h3>

        <p className="mt-2 text-sm font-medium text-blue-400">{issuer}</p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{description}</p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-all hover:gap-2.5 hover:text-blue-300"
          >
            {t.certifications.button}
            <ArrowUpRight size={16} />
          </a>
        )}
      </article>
    </Reveal>
  );
};

export default CertificationsCard;
