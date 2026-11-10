"use client";

//animation
import { motion } from "framer-motion";

//icons
import { Download, X } from "lucide-react";

//hooks
import { useLanguage } from "@/providers/LanguageContext";

/** Quanto tempo (ms) o aviso fica na tela. A barra de progresso usa o mesmo valor. */
export const DOWNLOAD_ALERT_MS = 5000;

const translation = {
  en: {
    title: "Download started",
    description: "Your resume is on its way.",
    close: "Close notification",
  },
  pt: {
    title: "Download iniciado",
    description: "Seu currículo já está a caminho.",
    close: "Fechar aviso",
  },
};

interface AlertDownloadProps {
  /** Nome do arquivo que está sendo baixado */
  fileName: string;
  /** Muda a cada clique: reinicia a barra de progresso */
  triggerId: number;
  onClose: () => void;
}

const AlertDownload = ({ fileName, triggerId, onClose }: AlertDownloadProps) => {
  const { language } = useLanguage();

  const text = translation[language];

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] sm:w-96"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      <div className="glass relative overflow-hidden p-4 pr-11 shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(59,130,246,0.18)]">
        <div className="flex items-center gap-3.5">
          {/* Ícone com brilho: a seta "cai" em loop enquanto o aviso está aberto */}
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/10 ring-1 ring-blue-400/30">
            <span aria-hidden className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md" />
            <motion.span
              className="relative text-blue-300"
              animate={{ y: [-2, 3, -2] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Download size={20} strokeWidth={2.2} />
            </motion.span>
          </span>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{text.title}</p>

            <p className="mt-0.5 text-sm text-neutral-400">{text.description}</p>

            <p className="mt-2 inline-block max-w-full truncate rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-neutral-300">
              {fileName}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={text.close}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Barra que esvazia no tempo que o aviso fica aberto */}
        <motion.span
          key={triggerId}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: DOWNLOAD_ALERT_MS / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default AlertDownload;
