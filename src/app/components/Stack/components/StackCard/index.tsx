"use client";

//react-icons
import type { IconType } from "react-icons";

//components
import { Reveal } from "@/components/shared/Reveal";

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

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {technologies.map(({ icon: Icon, name }) => (
            <li
              key={name}
              className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-800/70 bg-neutral-950/50 px-2 py-4 text-neutral-300 transition-colors duration-300 hover:border-blue-500/40 hover:text-blue-400"
            >
              <Icon size={32} aria-hidden />
              <span className="text-center text-xs leading-tight">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
