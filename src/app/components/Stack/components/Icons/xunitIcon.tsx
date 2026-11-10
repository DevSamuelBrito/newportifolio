import type { IconType } from "react-icons";

/**
 * Ícone do xUnit (versão simplificada): hexágono com "xU" vazado, no mesmo estilo do ícone de C#.
 * Desenhado à mão porque a biblioteca de ícones do projeto não tem o xUnit.
 */
export const XUnitIcon: IconType = ({ size = 24, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 128 128"
    className={className}
    {...props}
  >
    <defs>
      <mask id="xunit-mask">
        <rect width="128" height="128" fill="white" />
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="46"
          fontFamily="Segoe UI, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          xU
        </text>
      </mask>
    </defs>

    <polygon
      points="64,5 15,32 15,96 64,123 113,96 113,32"
      fill="currentColor"
      mask="url(#xunit-mask)"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
