"use client";

//components
import { Reveal } from "@/components/shared/Reveal";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  activities: string[];
  technologies: string[];
}

const ExperienceCard = ({ role, company, period, activities, technologies }: ExperienceCardProps) => {
  const { t } = useTranslation();

  return (
    <li className="relative pl-8 sm:pl-10">
      {/* Bolinha na linha do tempo */}
      <span
        aria-hidden
        className="absolute -left-[7px] top-7 h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_2px_rgba(59,130,246,0.6)] ring-4 ring-[#050505]"
      />

      <Reveal>
        <article className="glass glass-hover p-6 sm:p-7">
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-neutral-400">
            <span>{period}</span>
            <span aria-hidden className="text-neutral-600">
              •
            </span>
            <span>{role}</span>
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">{company}</h3>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {activities.map((activity, index) => (
              <li
                key={index}
                className="rounded-xl border border-neutral-800/70 bg-neutral-950/60 p-3.5 text-sm leading-relaxed text-neutral-300 [&:last-child:nth-child(odd)]:sm:col-span-2"
              >
                {activity}
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
              {t.experience.technologies}
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
};

export default ExperienceCard;
