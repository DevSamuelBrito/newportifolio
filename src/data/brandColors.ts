import type { IconType } from "react-icons";

import { FaReact } from "react-icons/fa";

import {
  SiCloudinary,
  SiCss3,
  SiDocker,
  SiDotnet,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiRedis,
  SiResend,
  SiShadcnui,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiZod,
} from "react-icons/si";

import { VscAzureDevops } from "react-icons/vsc";

import { CSharpIcon } from "@/app/components/Stack/components/Icons/csharpIcon";

import { PlaywrightIcon } from "@/app/components/Stack/components/Icons/playwrightIcon";

import { XUnitIcon } from "@/app/components/Stack/components/Icons/xunitIcon";

/** Cor usada quando o ícone não está no mapa (azul do tema). */
const FALLBACK_COLOR = "#60A5FA";

/**
 * Cor original e nome de cada tecnologia. Marcas que são pretas ou muito escuras
 * (Prisma, .NET, C#...) usam uma versão mais clara para aparecer no fundo preto.
 */
const BRAND_INFO = new Map<IconType, { color: string; name: string }>([
  [SiTypescript, { color: "#3178C6", name: "TypeScript" }],
  [SiJavascript, { color: "#F7DF1E", name: "JavaScript" }],
  [SiReact, { color: "#61DAFB", name: "React" }],
  [FaReact, { color: "#61DAFB", name: "React" }],
  [SiNextdotjs, { color: "#FFFFFF", name: "Next.js" }],
  [SiVite, { color: "#7C83FF", name: "Vite" }],
  [SiTailwindcss, { color: "#06B6D4", name: "Tailwind CSS" }],
  [SiHtml5, { color: "#E34F26", name: "HTML5" }],
  [SiCss3, { color: "#2965F1", name: "CSS3" }],
  [SiStyledcomponents, { color: "#DB7093", name: "styled-components" }],
  [SiShadcnui, { color: "#FFFFFF", name: "shadcn/ui" }],
  [SiZod, { color: "#4F7BD0", name: "Zod" }],
  [SiReacthookform, { color: "#EC5990", name: "React Hook Form" }],
  [SiJest, { color: "#E0384A", name: "Jest" }],
  [SiVitest, { color: "#8DC63F", name: "Vitest" }],
  [XUnitIcon, { color: "#9B7BFF", name: "xUnit" }],
  [PlaywrightIcon, { color: "#45BA4B", name: "Playwright" }],
  [SiNodedotjs, { color: "#5FA04E", name: "Node.js" }],
  [SiNestjs, { color: "#E0234E", name: "NestJS" }],
  [SiDotnet, { color: "#8B6CFF", name: ".NET" }],
  [CSharpIcon, { color: "#9B7BFF", name: "C#" }],
  [SiPrisma, { color: "#A0AEC0", name: "Prisma" }],
  [SiPostgresql, { color: "#5B7FE8", name: "PostgreSQL" }],
  [SiMysql, { color: "#5A9AC8", name: "MySQL" }],
  [SiMongodb, { color: "#47A248", name: "MongoDB" }],
  [SiRedis, { color: "#DC382D", name: "Redis" }],
  [SiFirebase, { color: "#FFCA28", name: "Firebase" }],
  [SiCloudinary, { color: "#5B6EF0", name: "Cloudinary" }],
  [SiResend, { color: "#FFFFFF", name: "Resend" }],
  [SiVercel, { color: "#FFFFFF", name: "Vercel" }],
  [SiDocker, { color: "#2496ED", name: "Docker" }],
  [SiGit, { color: "#F05032", name: "Git" }],
  [SiGithub, { color: "#FFFFFF", name: "GitHub" }],
  [SiLinux, { color: "#FCC624", name: "Linux" }],
  [VscAzureDevops, { color: "#2D9CF0", name: "Azure DevOps" }],
]);

export function getBrandColor(icon: IconType): string {
  return BRAND_INFO.get(icon)?.color ?? FALLBACK_COLOR;
}

/** Nome legível da tecnologia (ex.: "Next.js"); vazio se o ícone não estiver no mapa. */
export function getBrandName(icon: IconType): string {
  return BRAND_INFO.get(icon)?.name ?? "";
}
