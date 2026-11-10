"use client";

//react
import { useEffect, useMemo, useRef } from "react";

//next
import Image from "next/image";

//animation
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

//images
import photo from "@/assets/images/iconHero.png";

/** Distância (px) da câmera: quanto menor, mais forte o efeito 3D */
const PERSPECTIVE = 1000;

/** Quanto a pessoa "sai" da tela, em px (translateZ) */
const PERSON_DEPTH = 50;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Padrão de traços irregulares (traço, vazio, traço, vazio...) que soma exatamente 100,
 * para o anel fechar sem emenda quando usado com pathLength={100}. Determinístico (mesma
 * semente), então o servidor e o navegador desenham o mesmo anel.
 */
function dashPattern(seed: number, min: number, max: number, gapMin: number, gapMax: number) {
  let state = seed;

  const random = () => {
    // gerador simples e repetível (mulberry32)
    state = (state + 0x6d2b79f5) | 0;

    let t = Math.imul(state ^ (state >>> 15), 1 | state);

    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const parts: number[] = [];

  let total = 0;

  while (total < 96) {
    const dash = min + random() * (max - min);

    const gap = gapMin + random() * (gapMax - gapMin);

    parts.push(dash, gap);

    total += dash + gap;
  }

  // ajusta a escala para somar exatamente 100
  return parts.map((part) => (part * 100) / total);
}

interface RingProps {
  /** Quanto o anel passa da borda da foto (em % do tamanho) */
  inset: string;
  /** strokeDasharray já pronto (em unidades de pathLength=100) */
  dashes: string;
  width: number;
  className: string;
  seconds: number;
  reverse?: boolean;
  /** Anima o anel girando (desligado com prefers-reduced-motion) */
  animated: boolean;
}

/** Anel de traços que gira devagar */
function DashedRing({ inset, dashes, width, className, seconds, reverse, animated }: RingProps) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 100"
      className="absolute overflow-visible"
      style={{ inset }}
      animate={animated ? { rotate: reverse ? -360 : 360 } : undefined}
      transition={{ duration: seconds, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="none"
        pathLength={100}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashes}
        className={className}
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

/**
 * Foto sem fundo cercada por uma borda de traços azuis animada. Tem um leve efeito 3D: o conjunto
 * inclina na direção do mouse e a pessoa fica "mais perto" que a borda (paralaxe).
 */
export function PhotoStage() {
  const reduce = useReducedMotion();

  const animated = !reduce;

  const stageRef = useRef<HTMLDivElement | null>(null);

  // posição do mouse em relação ao centro da foto, de -1 a 1
  const pointerX = useMotionValue(0);

  const pointerY = useMotionValue(0);

  const spring = { stiffness: 90, damping: 16, mass: 0.6 };

  const x = useSpring(pointerX, spring);

  const y = useSpring(pointerY, spring);

  const rotateY = useTransform(x, (value) => value * 12);

  const rotateX = useTransform(y, (value) => value * -9);

  // a pessoa desliza um pouco: parece mais perto da tela que os anéis
  const personX = useTransform(x, (value) => value * 8);

  const personY = useTransform(y, (value) => value * 5);

  const mainDashes = useMemo(() => dashPattern(7, 0.7, 6.5, 1.6, 4.4).join(" "), []);

  useEffect(() => {
    if (reduce) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const rect = stageRef.current?.getBoundingClientRect();

      if (!rect) return;

      // o efeito segue o mouse pela tela inteira, ficando mais forte perto da foto
      pointerX.set(clamp((event.clientX - (rect.left + rect.width / 2)) / 600, -1, 1));

      pointerY.set(clamp((event.clientY - (rect.top + rect.height / 2)) / 450, -1, 1));
    };

    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    document.addEventListener("pointerleave", onLeave);

    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [reduce, pointerX, pointerY]);

  return (
    <div
      ref={stageRef}
      className="relative h-[var(--d)] w-[var(--d)] [--d:16rem] sm:[--d:19rem]"
      style={{ perspective: PERSPECTIVE }}
    >
      {/* flutua devagar, mesmo sem mouse */}
      <motion.div
        className="absolute inset-0"
        animate={animated ? { y: [0, -7, 0] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", rotateX, rotateY }}>
          {/* borda atrás da pessoa */}
          <div className="absolute inset-0" style={{ transform: "translateZ(-24px)" }}>
            {/* borda: traços azuis de tamanhos diferentes */}
            <DashedRing
              inset="-1.2%"
              dashes={mainDashes}
              width={3}
              seconds={38}
              animated={animated}
              className="stroke-blue-500"
            />

            {/* um traço mais claro que corre pela borda */}
            <DashedRing
              inset="-1.2%"
              dashes="7 93"
              width={3.2}
              seconds={7}
              animated={animated}
              className="stroke-cyan-300 [filter:drop-shadow(0_0_5px_rgba(34,211,238,0.9))]"
            />
          </div>

          {/* pessoa, na frente dos anéis (profundidade fixa + paralaxe com o mouse em elementos separados) */}
          <div
            className="absolute inset-0"
            style={{ transform: `translateZ(${PERSON_DEPTH}px) scale(${PERSPECTIVE / (PERSPECTIVE + PERSON_DEPTH)})` }}
          >
            <motion.div className="absolute inset-0" style={{ x: personX, y: personY }}>
              <Image
                src={photo}
                alt="Samuel Brito"
                width={384}
                height={384}
                sizes="(max-width: 640px) 256px, 304px"
                className="h-full w-full drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]"
                priority={false}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
