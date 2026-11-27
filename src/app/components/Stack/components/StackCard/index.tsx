"use client";

//react-icons
import type { IconType } from "react-icons";

//components
import { Reveal } from "@/components/shared/Reveal";

//data
import { getBrandColor } from "@/data/brandColors";

interface StackCardProps {
  area: string;
  technologies: {
    icon: IconType;
    name: string;
  }[];
  /** Atraso da animação de entrada, para escalonar os cards */
  delay?: number;
}

export function StackCard({ area, technologies, delay = 0 }: StackCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="glass h-full p-6">
        <h3 className="font-mono text-sm font-medium uppercase tracking-widest text-blue-400">{area}</h3>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map(({ icon: Icon, name }) => (
            <li
              key={name}
              className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-800/70 bg-neutral-950/50 px-2 py-4 text-neutral-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600 hover:text-neutral-200"
            >
              <Icon size={32} style={{ color: getBrandColor(Icon) }} aria-hidden />
              <span className="text-center text-xs leading-tight">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
