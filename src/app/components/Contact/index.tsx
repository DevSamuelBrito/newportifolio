"use client"

//icons
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

import { ContactIcon } from "./components/ContatcsIcon";

import { MdEmail, MdLocationOn } from "react-icons/md";

//components
import { Footer } from "../Footer";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Contact() {

    const { t } = useTranslation();

    return (
        <section
            id="contact"
            className="bg-gray-900 min-h-screen flex flex-col items-center pt-16 justify-between overflow-x-hidden"
        >
            <div className="grid px-4 sm:px-6 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto lg:grid-cols-12 w-full">
                <div className="lg:col-span-12 text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {t.contact.title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                    <div className="mt-5 my-auto">
                        <p className="font-bold py-2 text-white text-xl 2xl:text-2xl">{t.contact.title2}</p>
                        <p className="text-gray-400 py-2 px-4 sm:px-12 md:px-32 text-xl 2xl:pt-6">{t.contact.description}</p>
                        <p className="text-gray-400 py-2 px-4 sm:px-12 md:px-32 text-xl 2xl:pt-6">
                            {t.contact.description2}
                        </p>
                        <p className="text-gray-400 py-2 px-4 sm:px-12 md:px-32 text-xl 2xl:pt-6">
                            {t.contact.description3}
                        </p>

                        <div className="flex justify-center gap-8 sm:gap-10 mt-8 flex-wrap">
                            <ContactIcon title="Linkedin" Icon={FaLinkedin} href="https://www.linkedin.com/in/samuel-fava-de-brito/" />
                            <ContactIcon title="WhatsApp" Icon={FaWhatsapp} href="https://api.whatsapp.com/send/?phone=5517982299393&text=Oi!+Vi+o+seu+portfólio+e+estou+curioso(a)+para+saber+mais+sobre+você+e+seus+projetos.+Vamos+conversar%3F+&type=phone_number&app_absent=0" />
                            <ContactIcon title="Github" Icon={FaGithub} href="https://github.com/DevSamuelBrito" />
                            <ContactIcon title="Email" Icon={MdEmail} href="mailto:samuelbrito.dev@gmail.com" />
                            <ContactIcon title={t.contact.location} Icon={MdLocationOn} href="https://g.co/kgs/aLZQvv8" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer developer={t.contact.developer} rights={t.contact.rights} />
        </section>
    );
}
