"use client";

//providers
import { Language, useLanguage } from "@/providers/LanguageContext";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
];

/** Alternador de idioma em formato de pílula: PT | EN */
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const { t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t.navbar.switchLanguage}
      className="inline-flex rounded-full border border-neutral-800 bg-neutral-900/80 p-0.5"
    >
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setLanguage(value)}
          aria-pressed={language === value}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
            language === value ? "bg-blue-500 text-white" : "text-neutral-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
