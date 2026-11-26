"use client";

//react
import { useEffect } from "react";

//lib
import { playSound, type SoundName } from "@/lib/sound";

/** O que conta como "clicável" para o som de clique */
const CLICKABLE = 'a[href], button, [role="button"], [data-sound]';

/**
 * Liga os sons da interface no site inteiro com dois ouvintes no documento, em vez de
 * espalhar um `onClick` por botão. Cada elemento pode escolher o seu som:
 *
 * - `data-sound="tick"` (ou outro nome de `SoundName`): toca esse som no clique
 * - `data-sound="none"`: não toca nada no clique (o próprio componente cuida do som)
 * - `data-sound-hover`: toca um som suave quando o mouse entra no elemento
 *
 * Sem `data-sound`, links e botões tocam o clique padrão; links de download tocam a confirmação.
 */
export function SoundEffects() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>(CLICKABLE);

      if (!element || (element as HTMLButtonElement).disabled) return;

      const custom = element.dataset.sound;

      if (custom === "none") return;

      if (custom) playSound(custom as SoundName);
      else if (element.matches("a[download]")) playSound("confirm");
      else playSound("click");
    };

    const onOver = (event: PointerEvent) => {
      // celular não tem "passar o mouse": o toque já gera o som de clique
      if (event.pointerType !== "mouse") return;

      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-sound-hover]");

      if (!element) return;

      // só quando o mouse entra no elemento, não a cada filho por onde ele passa
      const from = event.relatedTarget as Node | null;

      if (from && element.contains(from)) return;

      playSound("hover");
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return null;
}
