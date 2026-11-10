"use client";

//react
import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";

//animation
import { motion, useMotionValue, useTransform } from "framer-motion";

export interface SheetItem {
  /** id da seção (usado pela navbar para navegar e marcar a seção ativa) */
  id: string;
  node: ReactNode;
}

interface StackedSectionsProps {
  sections: SheetItem[];
}

interface SheetProps {
  id: string;
  index: number;
  /** false = layout normal, sem fixar nem recuar (prefers-reduced-motion) */
  stacked: boolean;
  /** última seção: não precisa de pausa depois dela */
  isLast: boolean;
  refs: MutableRefObject<(HTMLDivElement | null)[]>;
  children: ReactNode;
}

// useLayoutEffect no navegador (mede antes de pintar), useEffect no servidor
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Pausa depois de cada seção: a seção fica parada e 100% visível enquanto esse
 * trecho de rolagem passa, e só então a próxima começa a subir e a dissolvê-la.
 */
const HOLD = "60svh";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Se o usuário prefere menos animação. Começa em false (igual ao servidor, para a
 * hidratação não divergir) e é atualizado logo depois que a página monta.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduced(query.matches);

    update();

    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Sheet({ id, index, stacked: stackingEnabled, isLast, refs, children }: SheetProps) {
  // A primeira seção (hero) rola normalmente para dentro da segunda; o efeito de
  // empilhar e dissolver começa a partir da segunda seção.
  const stacked = stackingEnabled && index > 0;

  const ref = useRef<HTMLDivElement | null>(null);

  // Quanto a próxima folha já cobriu esta (0 = nada, 1 = cobriu toda a tela)
  const progress = useMotionValue(0);

  // A folha anterior se dissolve cedo (some quando a próxima ainda está na metade de baixo da tela)
  // para os textos das duas não ficarem sobrepostos; o fundo fixo continua igual.
  const scale = useTransform(progress, [0, 1], [1, 0.96]);

  const opacity = useTransform(progress, [0, 0.45], [1, 0]);

  const [top, setTop] = useState(0);

  // Folha já dissolvida pela próxima: sai do teclado e dos leitores de tela (inert).
  // Sem isso, o Tab poderia cair em links invisíveis por baixo da folha de cima.
  const [covered, setCovered] = useState(false);

  // Folha mais alta que a tela: ela rola normalmente e só "trava" quando o FIM dela
  // chega ao fim da tela (top negativo). Folha menor trava no topo (top 0).
  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!stacked || !element) {
      setTop(0);
      return;
    }

    // floor: o fim da folha nunca fica acima do fim da tela (sem fresta de 1px)
    const update = () => setTop(Math.min(0, window.innerHeight - Math.floor(element.getBoundingClientRect().height)));

    update();

    // a altura muda com imagens, fontes, "ver mais projetos", troca de idioma...
    const observer = new ResizeObserver(update);

    observer.observe(element);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [stacked]);

  // Acompanha a rolagem para saber quanto a próxima folha já subiu por cima desta
  useEffect(() => {
    if (!stacked) {
      progress.set(0);
      setCovered(false);
      return;
    }

    const update = () => {
      const next = refs.current[index + 1];

      if (!next) {
        progress.set(0);
        return;
      }

      const viewport = window.innerHeight;

      const value = clamp((viewport - next.getBoundingClientRect().top) / viewport, 0, 1);

      progress.set(value);

      // já invisível (opacity 0 a partir de 0.45): sai do teclado e dos leitores de tela
      const isCovered = value >= 0.45;

      setCovered((previous) => (previous === isCovered ? previous : isCovered));
    };

    update();

    window.addEventListener("scroll", update, { passive: true });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [stacked, index, refs, progress]);

  return (
    <div
      ref={(element) => {
        ref.current = element;
        refs.current[index] = element;
      }}
      data-sheet={id}
      style={stacked ? { position: "sticky", top, zIndex: index + 1, marginBottom: isLast ? 0 : HOLD } : undefined}
      className="relative"
    >
      {/* Só o conteúdo se dissolve quando a próxima folha sobe; o fundo é global e fica parado */}
      <motion.div
        style={stacked ? { scale, opacity, transformOrigin: "50% 100%" } : undefined}
        inert={covered}
        className="relative z-10 flex min-h-svh flex-col justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Seções "empilhadas": a partir da segunda, cada seção fica fixa e a próxima sobe por cima dela. As seções
 * são transparentes e o fundo é global e parado (veja Background): a anterior se
 * dissolve enquanto a próxima sobe, sem nenhum "cartão" no meio.
 */
export function StackedSections({ sections }: StackedSectionsProps) {
  const stacked = !usePrefersReducedMotion();

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <main>
      {sections.map((section, index) => (
        <Sheet
          key={section.id}
          id={section.id}
          index={index}
          stacked={stacked}
          isLast={index === sections.length - 1}
          refs={refs}
        >
          {section.node}
        </Sheet>
      ))}
    </main>
  );
}
