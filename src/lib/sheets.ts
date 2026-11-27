/**
 * Utilitários das "folhas" (seções empilhadas). Com as seções fixas (sticky),
 * a posição que cada uma tem na tela não é a posição "de verdade" dela na
 * página. Estas funções calculam a posição natural: a soma das alturas das
 * folhas anteriores. Navegação, destaque da seção ativa e o efeito de empilhar
 * usam isso.
 *
 * Desempenho: medir o layout (getBoundingClientRect/getComputedStyle) a cada evento
 * de rolagem obriga o navegador a recalcular o layout o tempo todo e trava a página.
 * Por isso as posições são medidas uma vez, guardadas em cache e só medidas de novo
 * quando alguma seção muda de tamanho. Durante a rolagem só se faz conta.
 */

export interface SheetLayout {
  ids: string[];
  /** Posição natural de cada folha (px, a partir do topo do documento), na mesma ordem de `ids` */
  tops: number[];
}

let cache: SheetLayout | null = null;

let observer: ResizeObserver | null = null;

function getSheets(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>("[data-sheet]")];
}

/** Descarta as medidas guardadas (a próxima leitura mede de novo) */
export function invalidateSheetLayout() {
  cache = null;
}

/** Mede tudo de uma vez. Chamado só na primeira leitura e depois que alguma seção muda de tamanho. */
function measure(): SheetLayout | null {
  const sheets = getSheets();

  if (sheets.length === 0) return null;

  // o <main> não é sticky, então o topo dele é confiável
  const container = sheets[0].parentElement as HTMLElement;

  let top = container.getBoundingClientRect().top + window.scrollY;

  const ids: string[] = [];

  const tops: number[] = [];

  for (const sheet of sheets) {
    ids.push(sheet.dataset.sheet as string);

    tops.push(top);

    // altura fracionária (offsetHeight arredonda e o erro se acumula entre as folhas)
    // + a pausa (margem) que cada folha tem depois de si
    top += sheet.getBoundingClientRect().height + (parseFloat(getComputedStyle(sheet).marginBottom) || 0);
  }

  // Renova as medidas sempre que o <main> ou uma folha mudar de tamanho (imagens, fontes,
  // "ver mais projetos", troca de idioma...). Este observador é criado junto com a primeira
  // medição, então roda antes dos que dependem dele.
  if (!observer) {
    observer = new ResizeObserver(invalidateSheetLayout);

    observer.observe(container);

    sheets.forEach((sheet) => observer?.observe(sheet));

    window.addEventListener("resize", invalidateSheetLayout);
  }

  return { ids, tops };
}

/** Posições naturais de todas as folhas (em cache). */
export function getSheetLayout(): SheetLayout | null {
  if (!cache) cache = measure();

  return cache;
}

/** Posição (em px, a partir do topo do documento) em que a folha começa. */
export function getSheetTop(id: string): number | null {
  const layout = getSheetLayout();

  if (!layout) return null;

  const index = layout.ids.indexOf(id);

  return index === -1 ? null : layout.tops[index];
}

/** Rola até o começo da seção (suave por padrão; "instant" para voltar sem animação). */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  // mede de novo: quem chama (ex.: "Ver menos") pode ter acabado de mudar o tamanho da seção
  invalidateSheetLayout();

  const top = getSheetTop(id);

  if (top === null) return;

  // ceil: se sobrar fração, a folha fica 1px acima do topo, nunca com uma linha da anterior à mostra
  window.scrollTo({ top: Math.ceil(top), behavior });
}

/** Seção "atual": a última cujo começo já passou de ~45% da altura da tela. */
export function getActiveSheetId(): string | null {
  const layout = getSheetLayout();

  if (!layout) return null;

  const line = window.scrollY + window.innerHeight * 0.45;

  let active = layout.ids[0] ?? null;

  layout.tops.forEach((top, index) => {
    if (top <= line) active = layout.ids[index];
  });

  return active;
}
