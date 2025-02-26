"use client"
import { useLanguage } from "@/app/providers/LanguageContext";

const translation = {
    en: {
        title: "Services",   
        question:"How can I help?",
        title2:""    
    },
    pt: {
        title: "Serviços",
        question:"Como eu posso ajudar?",
        title2:""
    }
}

export function Services() {
    const { language } = useLanguage();
    return (

        <section className="bg-gray-900 min-h-screen pt-14">
            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white relative inline-block">
                        {translation[language].title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </h2>
                </div>
                <div className="text-center mt-8">
                    <p></p>

                </div>

            </div>
        </section>

    )
}