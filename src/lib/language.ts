/**
 * Idiomas do site. Fica fora do LanguageContext (que é "use client") para
 * poder ser usado também no servidor, no layout.
 */
export type Language = "en" | "pt";

export const LANGUAGE_COOKIE = "language";

export const DEFAULT_LANGUAGE: Language = "pt";

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "pt";
}
