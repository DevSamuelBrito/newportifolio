"use client";

//react
import { useSyncExternalStore } from "react";

//icons
import { Volume2, VolumeX } from "lucide-react";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//lib
import { isMuted, setMuted, subscribeMuted } from "@/lib/sound";

/** Liga e desliga os sons do site. Vem ligado; a escolha fica salva para as próximas visitas. */
export function SoundToggle() {
  const { t } = useTranslation();

  // no servidor o som está sempre "ligado": o estado salvo é lido só no navegador
  const muted = useSyncExternalStore(subscribeMuted, isMuted, () => false);

  return (
    <button
      type="button"
      // o botão cuida do próprio som (ligar/desligar): sem o clique padrão por cima
      data-sound="none"
      onClick={() => setMuted(!muted)}
      aria-label={muted ? t.sound.unmute : t.sound.mute}
      aria-pressed={!muted}
      title={muted ? t.sound.unmute : t.sound.mute}
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/90 shadow-lg backdrop-blur transition-colors hover:border-blue-500/50 ${
        muted ? "text-neutral-500 hover:text-neutral-300" : "text-blue-400 hover:text-blue-300"
      }`}
    >
      {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
    </button>
  );
}
