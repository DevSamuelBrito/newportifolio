"use client";

//react
import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";

//animation
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

//lib
import { getSheetLayout } from "@/lib/sheets";

export interface SheetItem {
  /** id da seção (usado pela navbar para navegar e marcar a seção ativa) */
  id: string;
  node: ReactNode;
}

interface StackedSectionsProps {
  sections: SheetItem[];
}

/** O que o controlador de rolagem precisa saber de cada folha para atualizá-la */
interface SheetController {
  /** Quanto a próxima folha já cobriu esta (0 = nada, 1 = cobriu toda a tela) */
  progress: MotionValue<number>;
  setCovered: (covered: boolean) => void;
  /** Último valor enviado a setCovered (evita renderizar à toa) */
  covered: boolean;
}

interface SheetProps {
  id: string;
  index: number;
  /** false = layout normal, sem fixar nem recuar (prefers-reduced-motion) */
  stacked: boolean;
  /** última seção: não precisa de pausa depois dela */
  isLast: boolean;
  controllers: MutableRefObject<(SheetController | null)[]>;
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

function Sheet({ id, index, stacked: stackingEnabled, isLast, controllers, children }: SheetProps) {
  // A primeira seção (hero) rola normalmente para dentro da segunda; o efeito de
  // empilhar e dissolver começa a partir da segunda seção.
  const stacked = stackingEnabled && index > 0;

  const ref = useRef<HTMLDivElement | null>(null);

  // Quanto a próxima folha já cobriu esta (0 = nada, 1 = cobriu toda a tela).
  // Quem atualiza é o StackedSections, com uma única escuta de rolagem para todas as folhas.
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

  // Entrega ao StackedSections o que ele precisa para atualizar esta folha na rolagem
  useEffect(() => {
    if (!stacked) {
      progress.set(0);
      setCovered(false);
      return;
    }

    const controller: SheetController = { progress, setCovered, covered: false };

    controllers.current[index] = controller;

    return () => {
      if (controllers.current[index] === controller) controllers.current[index] = null;
    };
  }, [stacked, index, controllers, progress]);

  return (
    <div
      ref={ref}
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

  const controllers = useRef<(SheetController | null)[]>([]);

  // Uma única escuta de rolagem para todas as folhas. Só faz conta (com as posições em cache),
  // sem medir o layout: medir a cada rolagem, para cada folha, era o que travava a página.
  useEffect(() => {
    if (!stacked) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const layout = getSheetLayout();

      if (!layout) return;

      const viewport = window.innerHeight;

      const scrollY = window.scrollY;

      controllers.current.forEach((controller, index) => {
        if (!controller) return;

        const nextTop = layout.tops[index + 1];

        // Quanto da tela a próxima folha já cobriu. Quando ela já passou do topo (ou está "presa"),
        // o valor passa de 1 e é cortado em 1, então a posição natural basta para a conta.
        const value = nextTop === undefined ? 0 : clamp((viewport - (nextTop - scrollY)) / viewport, 0, 1);

        controller.progress.set(value);

        // já invisível (opacity 0 a partir de 0.45): sai do teclado e dos leitores de tela
        const isCovered = value >= 0.45;

        if (isCovered !== controller.covered) {
          controller.covered = isCovered;
          controller.setCovered(isCovered);
        }
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // a primeira medição também cria o observador de tamanho de lib/sheets (que renova o cache)
    update();

    window.addEventListener("scroll", schedule, { passive: true });

    window.addEventListener("resize", schedule);

    // se uma seção muda de altura sem rolagem (ex.: "Ver menos" nos projetos), a posição da
    // próxima folha muda e nenhum evento de scroll acontece: refaz a conta quando o <main> muda
    const main = document.querySelector("main");

    const observer = new ResizeObserver(schedule);

    if (main) observer.observe(main);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stacked]);

  return (
    <main>
      {sections.map((section, index) => (
        <Sheet
          key={section.id}
          id={section.id}
          index={index}
          stacked={stacked}
          isLast={index === sections.length - 1}
          controllers={controllers}
        >
          {section.node}
        </Sheet>
      ))}
    </main>
  );
}
