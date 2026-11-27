"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language } from "@/lib/language";

export type { Language };

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  /** Idioma lido do cookie no servidor, para a página já abrir no idioma certo. */
  initialLanguage?: Language;
}

export const LanguageProvider = ({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);

    // Cookie lido pelo servidor na próxima visita (evita "piscar" no idioma errado)
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
};
