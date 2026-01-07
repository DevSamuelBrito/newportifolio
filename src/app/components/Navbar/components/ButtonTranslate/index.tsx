"use client";

//providers
import { Language, useLanguage } from "@/providers/LanguageContext";

//next
import Image, { StaticImageData } from "next/image";


interface ButtonTranslateProps {
    title: string,
    languageDefault: Language,
    src: StaticImageData,
}

export function ButtonTranslate({ title, languageDefault, src }: ButtonTranslateProps) {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            title={title}
            aria-label={`Mudar idioma para ${title}`}
            className="px-2 py-2"
            onClick={() => setLanguage(languageDefault)
            }
        >
            <Image
                src={src}
                alt="Usa Flag"
                className={`${language === languageDefault ? "opacity-50" : "opacity-100"} w-8 h-8 rounded-full`}
                width={28}
                height={28}
            />
        </button>
    );
}