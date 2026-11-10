/**
 * Utilitários das "folhas" (seções empilhadas). Com as seções fixas (sticky),
 * a posição que cada uma tem na tela não é a posição "de verdade" dela na
 * página. Estas funções calculam a posição natural: a soma das alturas das
 * folhas anteriores. Navegação e destaque da seção ativa usam isso.
 */

function getSheets(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>("[data-sheet]")];
}

/** Posição (em px, a partir do topo do documento) em que a folha começa. */
export function getSheetTop(id: string): number | null {
  const sheets = getSheets();

  if (sheets.length === 0) return null;

  // o <main> não é sticky, então o topo dele é confiável
  const container = sheets[0].parentElement as HTMLElement;

  let top = container.getBoundingClientRect().top + window.scrollY;

  for (const sheet of sheets) {
    if (sheet.dataset.sheet === id) return top;

    // altura fracionária (offsetHeight arredonda e o erro se acumula entre as folhas)
    top += sheet.getBoundingClientRect().height;
  }

  return null;
}

/** Rola suavemente até o começo da seção. */
export function scrollToSection(id: string) {
  const top = getSheetTop(id);

  if (top === null) return;

  // ceil: se sobrar fração, a folha fica 1px acima do topo, nunca com uma linha da anterior à mostra
  window.scrollTo({ top: Math.ceil(top), behavior: "smooth" });
}

/** Seção "atual": a última cujo começo já passou de ~45% da altura da tela. */
export function getActiveSheetId(): string | null {
  const sheets = getSheets();

  if (sheets.length === 0) return null;

  const line = window.scrollY + window.innerHeight * 0.45;

  let active = sheets[0].dataset.sheet ?? null;

  for (const sheet of sheets) {
    const id = sheet.dataset.sheet as string;

    const top = getSheetTop(id);

    if (top !== null && top <= line) active = id;
  }

  return active;
}
