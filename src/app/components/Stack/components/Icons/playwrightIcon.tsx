import type { IconType } from "react-icons";

/**
 * Ícone do Playwright (versão simplificada): duas máscaras de teatro sobrepostas.
 * Desenhado à mão porque a biblioteca de ícones do projeto não tem o Playwright.
 */
export const PlaywrightIcon: IconType = ({ size = 24, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 128 128"
    className={className}
    {...props}
  >
    {/* máscara de trás */}
    <path
      d="M20 40c0-8 6-14 14-14h34c8 0 14 6 14 14v34c0 20-14 34-31 34S20 94 20 74z"
      fill="currentColor"
      opacity="0.45"
      transform="rotate(-14 50 66)"
    />

    {/* máscara da frente */}
    <path
      d="M52 46c0-8 6-14 14-14h34c8 0 14 6 14 14v34c0 20-14 34-31 34S52 100 52 80z"
      fill="currentColor"
      transform="rotate(10 82 76)"
    />

    {/* olhos e sorriso da máscara da frente */}
    <g fill="none" stroke="#0a0a0a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M72 66l6 4-6 4" transform="rotate(10 82 76)" />
      <path d="M94 66l-6 4 6 4" transform="rotate(10 82 76)" />
      <path d="M74 88c5 6 15 6 20 0" transform="rotate(10 82 76)" />
    </g>
  </svg>
);
