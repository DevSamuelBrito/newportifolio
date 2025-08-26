"use client"
import { useLanguage } from "@/app/providers/LanguageContext";
import { FaLaptopCode, FaCode, } from "react-icons/fa";
import { ServiceCard, ServiceCardBack } from "./components/ServiceCard";
import { motion } from "framer-motion";


const translation = {
    en: {
        title: "Services",
        question: "How can I help?",
        anwser: "Although I am not yet offering services formally, I am always ready to collaborate on challenging projects and learn from new experiences.",
        anwser2: "In addition to web and backend development, I am also interested in exploring areas such as DevOps, automation, and best practices to make applications more efficient and scalable.",
        titleWeb: "Web Development",
        titleBack: "Back-End",
        titleTargets: "Goals and Objectives",
        descriptionWeb: "My focus is on creating web experiences that solve real problems, combining responsive design with robust functionality. I believe that a good web project should be intuitive, accessible and fast. Each project is an opportunity to learn new technologies, improve my skills in React, Next.js and other essential tools, and challenge myself to deliver increasingly efficient and scalable solutions.",
        descriptionBack: "I have experience developing APIs and scalable systems using Node.js and ASP.NET, always focusing on security, performance, and good architectural practices. I work with databases like PostgreSQL and Firebird, structuring applications that ensure integrity, efficient data flow, and easy maintenance. My goal is to deliver robust solutions that reliably connect the frontend to the backend, providing a solid foundation for any application.",
        descriptionTargets: "Currently, my focus is on seeking new challenges to grow as a programmer. I am committed to improving my knowledge, especially in back-end, learning new tools and improving my programming skills. In addition, I seek to learn from more experienced people and apply the knowledge acquired in agile methodologies, always with the goal of constantly evolving."
    },
    pt: {
        title: "Serviços",
        question: "Como posso ajudar?",
        anwser: "Embora eu ainda não esteja oferecendo serviços de forma formal, estou sempre pronto para colaborar em projetos desafiadores e aprender com novas experiências.",
        anwser2: "Além do desenvolvimento web e back-end, também estou interessado em explorar áreas como DevOps, automação e melhores práticas para tornar aplicações mais eficientes e escaláveis.",
        titleWeb: "Desenvolvimento Web",
        titleBack: "Back-End",
        titleTargets: "Objetivos e Metas",
        descriptionWeb: "Meu foco está em criar experiências web que resolvam problemas reais, combinando design responsivo com funcionalidades robustas. Acredito que um bom projeto web deve ser intuitivo, acessível e rápido. Cada projeto é uma oportunidade para aprender novas tecnologias, aprimorar minhas habilidades em React, Next.js e outras ferramentas essenciais, e me desafiar a entregar soluções mais eficientes e escaláveis.",
        descriptionBack: "Tenho experiência no desenvolvimento de APIs e sistemas escaláveis utilizando Node.js e ASP.NET, sempre com foco em segurança, performance e boas práticas de arquitetura. Trabalho com bancos de dados como PostgreSQL e Firebird, estruturando aplicações que garantem integridade, eficiência no fluxo de dados e fácil manutenção. Meu objetivo é entregar soluções robustas que conectem de forma confiável o front-end ao back-end, proporcionando uma base sólida para qualquer aplicação.",
        descriptionTargets: "Atualmente, meu foco é buscar novos desafios para crescer como programador. Estou empenhado em aprimorar meu conhecimento, principalmente em back-end, aprender novas ferramentas e melhorar minhas habilidades em programação. Além disso, busco aprender com pessoas mais experientes e aplicar os conhecimentos adquiridos em metodologias ágeis, sempre com o objetivo de evoluir constantemente."

    }
}

export function Services() {
    const { language } = useLanguage();
    return (
        <section
            id="services"
            className="bg-gray-900 min-h-screen pt-14"
        >
            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit">
                <div className="text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {translation[language].title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </div>
                <div className="text-center mt-8 max-w-3xl mx-auto">
                    <p className="text-3xl text-white font-bold">{translation[language].question}</p>
                    <p className="text-xl text-gray-400 mt-3">{translation[language].anwser}</p>
                </div>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }} 
                    >
                        <ServiceCard icon={FaLaptopCode} title={translation[language].titleWeb} description={translation[language].descriptionWeb} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }} 
                    >
                        <ServiceCardBack title={translation[language].titleBack} description={translation[language].descriptionBack} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }} 
                    >
                        <ServiceCard icon={FaCode} title={translation[language].titleTargets} description={translation[language].descriptionTargets} />
                    </motion.div>
                </div>
                <div className="text-center mt-8 max-w-3xl mx-auto">
                    <p className="text-xl text-gray-400 mt-3">{translation[language].anwser2}</p>
                </div>
            </div>
        </section>

    );
};

