/**
 * Ordem das seções da página. É a única fonte da verdade: a página (page.tsx)
 * e os links da navbar leem esta lista. Para mudar a ordem, basta mudar aqui.
 *
 * Cada id também é o id do elemento <section> e a chave de t.navbar nas traduções.
 */
export const SECTION_ORDER = [
  "home",
  "projects",
  "experience",
  "stack",
  "about",
  "certifications",
  "contact",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];
