"use client";

//react
import { useEffect, useRef } from "react";

//next
import Image from "next/image";

//animation
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

//images
import photo from "@/assets/images/iconHero.png";

/** Distância (px) da câmera: quanto menor, mais forte o efeito 3D */
const PERSPECTIVE = 1100;

/** Quanto a pessoa "sai" da tela, em px (translateZ) */
const PERSON_DEPTH = 70;

/**
 * Máscara do "pop-out": acima do centro do disco a pessoa aparece inteira (a cabeça passa da borda);
 * abaixo do centro ela é cortada pelo círculo do disco. --d é o diâmetro do disco.
 */
const POP_OUT_MASK =
  "linear-gradient(#000 0 0) top / 100% calc(var(--d) * 0.75) no-repeat, " +
  "radial-gradient(circle calc(var(--d) / 2) at 50% calc(var(--d) * 0.75), #000 calc(var(--d) / 2 - 1.5px), transparent calc(var(--d) / 2))";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Anel girando em volta de si mesmo */
function Spinner({ seconds, reverse, className }: { seconds: number; reverse?: boolean; className: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={className}
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration: seconds, repeat: Infinity, ease: "linear" }}
    />
  );
}

/**
 * Foto com profundidade: um disco de vidro com anéis em órbita atrás e a pessoa "saindo" dele.
 * O conjunto inclina na direção do mouse e cada camada se move numa velocidade diferente (paralaxe).
 */
export function PhotoStage() {
  const reduce = useReducedMotion();

  const stageRef = useRef<HTMLDivElement | null>(null);

  // posição do mouse em relação ao centro da foto, de -1 a 1
  const pointerX = useMotionValue(0);

  const pointerY = useMotionValue(0);

  const spring = { stiffness: 90, damping: 16, mass: 0.6 };

  const x = useSpring(pointerX, spring);

  const y = useSpring(pointerY, spring);

  const rotateY = useTransform(x, (value) => value * 16);

  const rotateX = useTransform(y, (value) => value * -12);

  // a pessoa desliza um pouco no sentido oposto da inclinação: parece mais perto da tela
  const personX = useTransform(x, (value) => value * 10);

  const personY = useTransform(y, (value) => value * 6);

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
      className="relative h-[var(--d)] w-[var(--d)] [--d:17rem] sm:[--d:20rem]"
      style={{ perspective: PERSPECTIVE }}
    >
      {/* flutua devagar, mesmo sem mouse */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", rotateX, rotateY }}>
          {/* brilho de fundo */}
          <div
            aria-hidden
            className="absolute -inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.38)_0%,rgba(34,211,238,0.1)_45%,transparent_70%)] blur-xl sm:-inset-[22%]"
            style={{ transform: "translateZ(-60px)" }}
          />

          {/* sombra no chão */}
          <div
            aria-hidden
            className="absolute -bottom-7 left-1/2 h-7 w-3/4 -translate-x-1/2 rounded-full bg-blue-500/40 blur-xl"
            style={{ transform: "translateZ(-20px)" }}
          />

          {/* linhas em volta: anel fino fixo, anel com varredura de luz e anel tracejado */}
          <div
            aria-hidden
            className="absolute -inset-[7%] rounded-full border border-blue-400/30"
            style={{ transform: "translateZ(-30px)" }}
          />

          <div className="absolute inset-0" style={{ transform: "translateZ(-30px)" }}>
            <Spinner
              seconds={9}
              className="absolute -inset-[7%] rounded-full [background:conic-gradient(from_0deg,transparent_0deg,transparent_215deg,rgba(34,211,238,0.95)_360deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))] [-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]"
            />
          </div>

          <div className="absolute inset-0" style={{ transform: "translateZ(-45px)" }}>
            <Spinner
              seconds={70}
              reverse
              className="absolute -inset-[12%] rounded-full border border-dashed border-cyan-300/35 sm:-inset-[18%]"
            />
          </div>

          {/* órbita inclinada: o ponto de luz passa atrás e na frente da pessoa */}
          <div
            aria-hidden
            className="absolute -inset-[14%] sm:-inset-[30%]"
            style={{ transform: "rotateX(72deg) translateZ(0px)", transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 rounded-full border border-blue-400/35" />

            <motion.div
              className="absolute inset-0"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_4px_rgba(34,211,238,0.8)]" />
            </motion.div>
          </div>

          {/* disco de vidro */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_50%_32%,rgba(59,130,246,0.45),rgba(17,36,92,0.72)_80%)] shadow-[inset_0_0_40px_rgba(59,130,246,0.25),0_0_50px_rgba(37,99,235,0.25)]"
          />

          {/* pessoa: sai do disco (máscara) e fica na frente, em profundidade */}
          <div
            className="absolute"
            style={{
              left: "calc(var(--d) * -0.1)",
              top: "calc(var(--d) * -0.25)",
              width: "calc(var(--d) * 1.2)",
              height: "calc(var(--d) * 1.25)",
              transform: `translateZ(${PERSON_DEPTH}px) scale(${PERSPECTIVE / (PERSPECTIVE + PERSON_DEPTH)})`,
              WebkitMask: POP_OUT_MASK,
              mask: POP_OUT_MASK,
            }}
          >
            <motion.div className="absolute inset-0" style={{ x: personX, y: personY }}>
              <Image
                src={photo}
                alt="Samuel Brito"
                width={384}
                height={384}
                sizes="(max-width: 640px) 245px, 288px"
                className="absolute bottom-0 left-0 h-auto w-full drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                priority={false}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
