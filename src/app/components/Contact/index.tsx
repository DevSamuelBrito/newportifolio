"use client"
import { useLanguage } from "@/app/providers/LanguageContext";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ContactIcon } from "./components/ContatcsIcon";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Footer } from "../Footer";


const translations = {
    en: {
        title: "Contact",
        description: "I’m always open to new connections and opportunities. If you have any questions, would like to discuss an idea, or are looking for a partnership, I’d be happy to chat. Feel free to message me on my social media channels below, and I’ll do my best to respond promptly.",
        location: "Location",
        description2: "I love learning from new experiences and challenges. Whether it's to share ideas, ask for advice or discuss future projects, I'm here to help. Let's exchange ideas and explore new possibilities together!",
        description3: "Feel free to explore my repositories, contribute new features, connect with me on Linkedin, send me an email or even invite me for a virtual coffee.",
        developer: "Developed by Samuel Brito",
        rights: "© 2025 Samuel Brito. All rights reserved.",
        title2: "Let's Connect"
    },
    pt: {
        title: "Contato",
        description: "Estou sempre aberto a novas conexões e oportunidades. Se você tem alguma dúvida, gostaria de discutir uma ideia ou está em busca de uma parceria, ficarei feliz em conversar. Sinta-se à vontade para me mandar uma mensagem pelas minhas redes sociais abaixo, e farei o possível para responder rapidamente.",
        location: "Localização",
        description2: "Adoro aprender com novas experiências e desafios. Seja para compartilhar ideias, pedir conselhos ou discutir projetos futuros, estou à disposição. Vamos trocar ideias e explorar novas possibilidades juntos!",
        description3: "Fique a Vontade para explorar meus repositorios, contribuir  com novas feautures, se conectar comigo no Linkedin, me mandar um email ou até mesmo me chamar para um café virtual.",
        developer: "Desenvolvido por Samuel Brito",
        rights: "© 2025 Samuel Brito. Todos os direitos resevador.",
        title2: "Entre em contato comigo"

    }
}

export function Contact() {
    const { language } = useLanguage();
    return (
        <section id="contact" className="bg-gray-900 min-h-screen flex flex-col items-center pt-16 justify-between overflow-x-hidden">
            <div className="grid px-4 sm:px-6 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto lg:grid-cols-12 w-full">
                <div className="lg:col-span-12 text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {translations[language].title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                    <div className="mt-5 my-auto">
                        <p className="font-bold py-2 text-white text-xl 2xl:text-4xl">{translations[language].title2}</p>
                        <p className="text-gray-400 py-2 px-4 sm:px-12 md:px-32 2xl:text-xl 2xl:pt-6">{translations[language].description}</p>
                        <p className="text-gray-400 py-2 px-4 sm:px-12 md:px-32 2xl:text-xl 2xl:pt-6">
                            {translations[language].description2}
                        </p>
                        <p className="text-gray-400 py-2 px-4 sm:px-12 md:px-32 2xl:text-xl 2xl:pt-6">
                            {translations[language].description3}
                        </p>

                        <div className="flex justify-center gap-8 sm:gap-10 mt-8 flex-wrap">
                            <ContactIcon title={translations[language].location} Icon={MdLocationOn} href="https://g.co/kgs/aLZQvv8" />
                            <ContactIcon title="Github" Icon={FaGithub} href="https://github.com/DevSamuelBrito" />
                            <ContactIcon title="Email" Icon={MdEmail} href="mailto:samuelbrito.dev@gmail.com" />
                            <ContactIcon title="WhatsApp" Icon={FaWhatsapp} href="https://api.whatsapp.com/send/?phone=5517982299393&text=Oi!+Vi+o+seu+portfólio+e+estou+curioso(a)+para+saber+mais+sobre+você+e+seus+projetos.+Vamos+conversar%3F+&type=phone_number&app_absent=0" />
                            <ContactIcon title="Linkedin" Icon={FaLinkedin} href="https://www.linkedin.com/in/samuel-fava-de-brito/" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer developer={translations[language].developer} rights={translations[language].rights} />
        </section>
    );
}
