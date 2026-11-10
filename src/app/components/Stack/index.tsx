"use client";

//icons
import {
  SiDocker,
  SiDotnet,
  SiGit,
  SiGithub,
  SiJest,
  SiLinux,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
  SiZod,
} from "react-icons/si";

import { VscAzureDevops } from "react-icons/vsc";

import { CSharpIcon } from "./components/Icons/csharpIcon";

import { PlaywrightIcon } from "./components/Icons/playwrightIcon";

import { XUnitIcon } from "./components/Icons/xunitIcon";

//components
import { StackCard } from "./components/StackCard";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Stack() {
  const { t } = useTranslation();

  return (
    <Section id="stack">
      <SectionHeading eyebrow={t.stack.eyebrow} title={t.stack.heading} highlight={t.stack.highlight} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StackCard
          area="Front-end"
          technologies={[
            { icon: SiTypescript, name: "TypeScript" },
            { icon: SiReact, name: "React" },
            { icon: SiVite, name: "Vite" },
            { icon: SiNextdotjs, name: "Next.js" },
            { icon: SiTailwindcss, name: "Tailwind CSS" },
            { icon: SiZod, name: "Zod" },
            { icon: SiReacthookform, name: "React Hook Form" },
          ]}
        />

        <StackCard
          area="Back-end"
          delay={0.1}
          technologies={[
            { icon: CSharpIcon, name: "C#" },
            { icon: SiDotnet, name: ".NET" },
            { icon: SiNestjs, name: "NestJS" },
            { icon: SiPrisma, name: "Prisma" },
            { icon: SiPostgresql, name: "PostgreSQL" },
          ]}
        />

        <StackCard
          area={t.stack.column}
          delay={0.2}
          technologies={[
            { icon: SiGit, name: "Git" },
            { icon: SiGithub, name: "GitHub" },
            { icon: SiDocker, name: "Docker" },
            { icon: SiLinux, name: "Linux / WSL2" },
            { icon: VscAzureDevops, name: "Azure DevOps" },
          ]}
        />

        <StackCard
          area={t.stack.tests}
          delay={0.3}
          technologies={[
            { icon: SiVitest, name: "Vitest" },
            { icon: SiJest, name: "Jest" },
            { icon: XUnitIcon, name: "xUnit" },
            { icon: PlaywrightIcon, name: "Playwright" },
          ]}
        />
      </div>
    </Section>
  );
}
