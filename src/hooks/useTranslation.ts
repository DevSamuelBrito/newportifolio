//providers
import { useLanguage } from "@/app/providers/LanguageContext";

//en
import enTranslations from "@/locales/en.json";

//pt br
import ptTranslations from "@/locales/pt.json";


const translations = {
  en: enTranslations,
  pt: ptTranslations,
};

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = translations[language]; 
  
  return { t, language };
}