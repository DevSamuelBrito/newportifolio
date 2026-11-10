"use client";

//react
import { useEffect, useRef, useState } from "react";

interface DecryptTextProps {
  /** Texto final que aparece depois de "decifrado" */
  text: string;
  /** Atraso antes de começar, em ms */
  delay?: number;
  /** Duração total do efeito, em ms */
  duration?: number;
  className?: string;
}

/** Caracteres que ficam trocando enquanto a letra ainda não foi "decifrada" */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/\\{}[]#$%&*+=?";

/** Quanto tempo (ms) as letras trocadas ficam no mesmo caractere antes de sortear outro */
const SCRAMBLE_STEP = 45;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Efeito de "decriptografar": as letras começam embaralhadas e vão se revelando da
 * esquerda para a direita. O texto real fica sempre no DOM para leitores de tela e
 * buscadores (sr-only); com prefers-reduced-motion ele aparece direto, sem efeito.
 */
export function DecryptText({ text, delay = 0, duration = 1400, className }: DecryptTextProps) {
  // Começa igual ao servidor (texto final) para a hidratação não divergir
  const [display, setDisplay] = useState(text);

  // Escondido até o efeito começar: sem isso, o texto final piscaria antes de embaralhar
  const [ready, setReady] = useState(false);

  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      setReady(true);
      return;
    }

    const letters = [...text];

    // cada letra tem o seu instante de "decifrar", espalhado de 0 a `duration` (os espaços não contam)
    const total = letters.length;

    const revealAt = letters.map((_, index) => (index / Math.max(1, total - 1)) * duration);

    let last = -SCRAMBLE_STEP;

    let startedAt = 0;

    let current = letters.map((char) => (char === " " ? " " : randomGlyph()));

    setDisplay(current.join(""));

    setReady(true);

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;

      const elapsed = now - startedAt;

      if (now - last >= SCRAMBLE_STEP) {
        last = now;

        current = letters.map((char, index) => {
          if (char === " " || elapsed >= revealAt[index] + 180) return char;

          return randomGlyph();
        });

        setDisplay(current.join(""));
      }

      if (elapsed < duration + 180) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    const timeout = setTimeout(() => {
      frame.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame.current);
    };
  }, [text, delay, duration]);

  return (
    <span className={className}>
      {/* O leitor de tela lê o texto real; as letras trocando ficam escondidas dele */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`whitespace-pre ${ready ? "" : "invisible"}`}>
        {display}
      </span>
    </span>
  );
}
