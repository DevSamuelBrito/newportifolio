"use client"
import { useLanguage } from "@/app/providers/LanguageContext";
import Image from "next/image";
import img from "@/assets/images/developer.gif";
import { motion } from "framer-motion";


const translation = {
    en: {
        title: "About Me",
        about: (
            <>
                Throughout my journey, I graduated in
                <span className="font-bold text-blue-500"> Systems Analysis and Development </span>
                from Fatec Rio Preto and also took several additional courses to expand my knowledge of modern technologies used in the actual market. <br></br>
                I currently work as a developer focusing on web applications using
                <span className="font-bold text-blue-500"> TypeScript, React, and Next.js</span> on the front end,
                in addition to working on the
                <span className="font-bold text-blue-500"> back end</span> with
                <span className="font-bold text-blue-500"> Node.js</span>,
                <span className="font-bold text-blue-500"> ASP.NET</span>, and databases such as
                <span className="font-bold text-blue-500"> PostgreSQL + Prisma</span> and
                <span className="font-bold text-blue-500"> Firebird</span>,
                building complete systems with a focus on performance and scalability. <br></br>
                I'm constantly learning and evolving, striving to hone my skills through new projects, ongoing studies, and best development practices.
                <br></br>
                My <span className="font-bold text-blue-500">carrer goal</span> is to grow as a full-stack developer, applying my knowledge in projects that challenge me and contribute to my ongoing development.
            </>
        )
    },
    pt: {
        title: "Sobre mim",
        about: (
            <>
                Ao longo da minha jornada, me formei em
                <span className="font-bold text-blue-500"> Análise e Desenvolvimento de Sistemas </span>
                pela Fatec Rio Preto e também realizei diversos cursos complementares para expandir meu conhecimento em tecnologias modernas e utilizadas pelo mercado.
                <br></br>
                Atualmente trabalho como desenvolvedor com foco em aplicações web utilizando
                <span className="font-bold text-blue-500"> TypeScript, React e Next.js</span> no front-end,
                além de atuar no
                <span className="font-bold text-blue-500"> back-end</span> com
                <span className="font-bold text-blue-500"> Node.js</span>,
                <span className="font-bold text-blue-500"> ASP.NET</span> e bancos de dados como
                <span className="font-bold text-blue-500"> PostgreSQL + Prisma</span> e
                <span className="font-bold text-blue-500"> Firebird</span>,
                construindo sistemas completos, com foco em performance e escalabilidade.
                <br></br>
                Estou sempre em constante aprendizado e evolução, buscando aprimorar minhas habilidades por meio de novos projetos, estudos contínuos e boas práticas de desenvolvimento.
                <br></br>
                Meu <span className="font-bold text-blue-500">objetivo</span> de carreira é crescer como desenvolvedor full-stack, colocando meus conhecimentos em prática em projetos que me desafiem e contribuam para minha evolução constante.
            </>

        )
    }
}

export function About() {
    const { language } = useLanguage();

    return (


        <section id="about" className="bg-gray-900 min-h-screen flex flex-col items-center pt-16">

            <div className="grid px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto lg:grid-cols-12 w-full">

                <motion.div initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="lg:col-span-12 w-full text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {translation[language].title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-6 flex justify-center items-center max-w-xl 2xl:max-w-2xl mx-10"
                >
                    <Image
                        src={img}
                        className="object-cover w-full h-auto"
                        alt="Profile Picture"
                        width={512}
                        height={512}
                        unoptimized
                    />
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-6 flex flex-col justify-center lg:mb-0 sm:px-2 md:px-4 xl:px-0">
                    <p className="mt-4 text-lg text-gray-400 text-center 2xl:text-xl">
                        {translation[language].about}
                    </p>
                </motion.div>

            </div>

        </section>


    );
}

