"use client"
import { useLanguage } from "@/app/providers/LanguageContext";
import { FaLaptopCode, FaCode, } from "react-icons/fa";
import { ServiceCard, ServiceCardBack } from "./components/ServiceCard";


const translation = {
    en: {
        title: "Services",
        question: "How can I help?",
        anwser: "Although I am not yet offering services formally, I am always ready to collaborate on challenging projects and learn from new experiences.",
        anwser2:"In addition to web and backend development, I am also interested in exploring areas such as DevOps, automation, and best practices to make applications more efficient and scalable.",
        titleWeb: "Web Development",
        titleBack: "Back-End",
        titleTargets: "Goals and Objectives",
        descriptionWeb: "My focus is on creating web experiences that solve real problems, combining responsive design with robust functionality. I believe that a good web project should be intuitive, accessible and fast. Each project is an opportunity to learn new technologies, improve my skills in React, Next.js and other essential tools, and challenge myself to deliver increasingly efficient and scalable solutions.",
        descriptionBack: "While I'm still developing my knowledge, I've been working with Node.js and other technologies to build scalable APIs and systems. My goal is to understand how the backend connects to the frontend, ensuring that data flows efficiently and securely. I'm also studying databases like PostgreSQL and MongoDB to ensure easy implementations, efficient maintenance, and scalability.",
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
        descriptionWeb: "Meu foco está em criar experiências web que resolvam problemas reais, combinando design responsivo com funcionalidades robustas. Acredito que um bom projeto web deve ser intuitivo, acessível e rápido. Cada projeto é uma oportunidade para aprender novas tecnologias, aprimorar minhas habilidades em React, Next.js e outras ferramentas essenciais, e me desafiar a entregar soluções cada vez mais eficientes e escaláveis.",
        descriptionBack: "Embora ainda esteja aprofundando meus conhecimentos, já venho trabalhando com Node.js e outras tecnologias para construir APIs e sistemas escaláveis. Meu objetivo é entender como o back-end se conecta ao front-end, garantindo que os dados fluam de forma eficiente e segura. Além disso, estou estudando bancos de dados como PostgreSQL e MongoDB, para garantir implementações fáceis, manutenção eficiente e escalabilidade.",
        descriptionTargets: "Atualmente, meu foco é buscar novos desafios para crescer como programador. Estou empenhado em aprimorar meu conhecimento, principalmente em back-end, aprender novas ferramentas e melhorar minhas habilidades em programação. Além disso, busco aprender com pessoas mais experientes e aplicar os conhecimentos adquiridos em metodologias ágeis, sempre com o objetivo de evoluir constantemente."

    }
}

export function Services() {
    const { language } = useLanguage();
    return (

        <section id="services"className="bg-gray-900 min-h-screen pt-14">
            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit">
                <div className="text-center">
                    <p className="text-3xl font-bold  text-white relative inline-block">
                        {translation[language].title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </div>
                <div className="text-center mt-8 max-w-3xl mx-auto">
                    <p className="text-3xl text-white font-bold">{translation[language].question}</p>
                    <p className="text-xl text-gray-400 mt-3">{translation[language].anwser}</p>
                </div>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard icon={FaLaptopCode} title={translation[language].titleWeb} description={translation[language].descriptionWeb} />
                    <ServiceCardBack title={translation[language].titleBack} description={translation[language].descriptionBack} />
                    <ServiceCard icon={FaCode} title={translation[language].titleTargets} description={translation[language].descriptionTargets} />
                </div>
                <div className="text-center mt-8 max-w-3xl mx-auto">
                    <p className="text-xl text-gray-400 mt-3">{translation[language].anwser2}</p>
                </div>
                
            </div>
        </section>

    )
}