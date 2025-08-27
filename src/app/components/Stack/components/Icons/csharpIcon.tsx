import { IconType } from "react-icons";

export const CSharpIcon: IconType = ({ size = 24, className, ...props }) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 128 128"
  className={className}
  {...props}
>
  <defs>
    <mask id="csharp-mask">
      <rect width="128" height="128" fill="white" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="48"
        fontFamily="Segoe UI, sans-serif"
        fontWeight="bold"
        fill="black"
      >
        C#
      </text>
    </mask>
  </defs>

  <polygon
    points="64,5 15,32 15,96 64,123 113,96 113,32"
    fill="currentColor"
    mask="url(#csharp-mask)"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"   
  />
</svg>

);
