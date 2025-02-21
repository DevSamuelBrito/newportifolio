"use client";
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Criando tipagem para provedor
type Language = "en" | "pt";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Criando o contexto
const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

// Criando o Provider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("pt");

  // Recupera a linguagem do localStorage ao carregar o site
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Salva a linguagem no localStorage quando for alterada
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Criando um Hook personalizado para facilitar o uso 
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
};
