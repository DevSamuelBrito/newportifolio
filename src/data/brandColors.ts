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
  SiZod,
} from "react-icons/si";

import { VscAzureDevops } from "react-icons/vsc";

import { CSharpIcon } from "@/app/components/Stack/components/Icons/csharpIcon";

/** Cor usada quando o ícone não está no mapa (azul do tema). */
const FALLBACK_COLOR = "#60A5FA";

/**
 * Cor original de cada tecnologia. Marcas que são pretas ou muito escuras
 * (Prisma, .NET, C#...) usam uma versão mais clara para aparecer no fundo preto.
 */
const BRAND_COLORS = new Map<IconType, string>([
  [SiTypescript, "#3178C6"],
  [SiJavascript, "#F7DF1E"],
  [SiReact, "#61DAFB"],
  [FaReact, "#61DAFB"],
  [SiNextdotjs, "#FFFFFF"],
  [SiVite, "#7C83FF"],
  [SiTailwindcss, "#06B6D4"],
  [SiHtml5, "#E34F26"],
  [SiCss3, "#2965F1"],
  [SiStyledcomponents, "#DB7093"],
  [SiShadcnui, "#FFFFFF"],
  [SiZod, "#4F7BD0"],
  [SiReacthookform, "#EC5990"],
  [SiJest, "#E0384A"],
  [SiNodedotjs, "#5FA04E"],
  [SiDotnet, "#8B6CFF"],
  [CSharpIcon, "#9B7BFF"],
  [SiPrisma, "#A0AEC0"],
  [SiPostgresql, "#5B7FE8"],
  [SiMysql, "#5A9AC8"],
  [SiMongodb, "#47A248"],
  [SiRedis, "#DC382D"],
  [SiFirebase, "#FFCA28"],
  [SiCloudinary, "#5B6EF0"],
  [SiResend, "#FFFFFF"],
  [SiVercel, "#FFFFFF"],
  [SiDocker, "#2496ED"],
  [SiGit, "#F05032"],
  [SiGithub, "#FFFFFF"],
  [SiLinux, "#FCC624"],
  [VscAzureDevops, "#2D9CF0"],
]);

export function getBrandColor(icon: IconType): string {
  return BRAND_COLORS.get(icon) ?? FALLBACK_COLOR;
}
