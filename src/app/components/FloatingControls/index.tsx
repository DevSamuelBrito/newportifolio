//components
import ScrollToTopButton from "../ScrollTopButton";

import { SoundToggle } from "./components/SoundToggle";

/**
 * Botões flutuantes do canto inferior direito. O de som fica sempre ali; quando a seta de
 * voltar ao topo aparece (depois de rolar um pouco), ela ocupa o canto e o de som sobe para
 * cima dela.
 */
export function FloatingControls() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <SoundToggle />

      <ScrollToTopButton />
    </div>
  );
}
