"use client"
import { useLanguage } from "@/app/providers/LanguageContext";
import Image from "next/image";
import img from "@/assets/images/developer.gif";
import { motion } from "framer-motion";


const translation = {
    en: {
        title: "About Me",
        about: (
            <>Throughout my journey, I graduated in <span className="font-bold text-blue-500"> Systems Analysis and Development</span> from Fatec Rio Preto and in parallel to that I took several complementary courses focused on technologies to improve myself more and more in this area. Currently I am developing in the web area mainly focusing on <span className="font-bold text-blue-500"> TypeScript, React, Next.js</span> and in addition, I am very focused on <span className="font-bold text-blue-500">backend</span> studying <span className="font-bold text-blue-500">Node.js</span> and <span className="font-bold text-blue-500">databases</span> such as <span className="font-bold text-blue-500">MongoDB + Prisma and PostgreeSQL</span> to build complete applications. I am currently improving my skills through personal projects and constant study. My <span className="font-bold text-blue-500">goal</span> is to finally enter this market and <span className="font-bold text-blue-500">learn</span> from more experienced people so that they can help me evolve and apply knowledge that I see on the internet in practice. My <span className="font-bold text-blue-500">dream</span> career is to collaborate on innovative projects, where I can apply my knowledge and continue to evolve as a developer.
            </>
        )
    },
    pt: {
        title: "Sobre mim",
        about: (
            <>Ao longo da minha jornada, me formei em <span className="font-bold text-blue-500"> Análise e Desenvolvimento de Sistemas</span> pela Fatec Rio Preto e em paralelo a isso fiz diversos cursos complementares voltados a tecnologias para me aprimorar cada vez mais nessa área. Atualmente estou me desenvolvendo na área web principalmente com foco <span className="font-bold text-blue-500"> TypeScript, React, Next.js</span> e além disso, estou com bastante foco no <span className="font-bold text-blue-500">backend</span> estudando <span className="font-bold text-blue-500">Node.js</span> e <span className="font-bold text-blue-500">bancos de dados</span> como <span className="font-bold text-blue-500">MongoDB + Prisma e PostgreeSQL</span> para construir aplicações completas. Atualmente, estou aprimorando minhas habilidades por meio de projetos pessoais e estudo constante. Meu <span className="font-bold text-blue-500">objetivo</span> é finalmente entrar para esse mercado e <span className="font-bold text-blue-500">aprender</span> com pessoas mais experientes para que eles possam me ajudar a evoluir e aplicar conhecimentos que vejo na internet em prática. Meu <span className="font-bold text-blue-500">sonho</span> de carreira é colaborar em projetos inovadores, onde eu possa aplicar meus conhecimentos e continuar evoluindo como desenvolvedor.
            </>
        )
    }
}

export function About() {
    const { language } = useLanguage();

    return (
        <div>

            <section id="about" className="bg-gray-900 min-h-screen flex flex-col items-center pt-16">

                <div className="grid px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto lg:grid-cols-12 w-full">

                    <motion.div initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 text-center">
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
                        className="lg:col-span-6 flex justify-center items-center">
                        <Image
                            src={img}
                            alt="Profile Picture"
                            width={490}
                            height={490}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-6 flex flex-col justify-center lg:mb-0 sm:px-2 md:px-4 xl:px-0">
                        <p className="mt-4 text-lg text-gray-500 ">
                            {translation[language].about}
                        </p>
                    </motion.div>

                </div>

            </section>

        </div>
    );
}

