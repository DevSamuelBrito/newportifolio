"use client";
import { useLanguage } from "@/app/providers/LanguageContext";
import { SiOracle, SiFirebase, SiMysql, SiFlutter, SiMongodb, SiPrisma, SiReact, SiNextdotjs, SiTailwindcss, SiDocker, SiTypescript, SiNodedotjs, SiDotnet, SiPython, SiUnity, SiPostgresql, SiStyledcomponents, SiAmazonwebservices, SiJasmine, SiGit, SiGithub, SiSass, SiExpo } from "react-icons/si";
import { StackCard } from "./components/StackCard";


const translation = {
    en: {
        Stack: "Stack",
        currently: "Currently working",
        worked: "I've already worked",
        studying: "I am studying",
    },
    pt: {
        Stack: "Tecnologias",
        currently: "Trabalhando Atualmente",
        worked: "Já trabalhei",
        studying: "Estou Estudando",
    },
};

export function Stack() {
    const { language } = useLanguage();

    return (
        <section className="bg-gray-900 min-h-screen pt-14">
            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white relative inline-block">
                        {translation[language].Stack}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </h2>
                </div>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Trabalhando Atualmente */}

                    <StackCard situation={translation[language].currently} technologies={[
                        { icon: SiReact, name: "React" },
                        { icon: SiNextdotjs, name: "Next Js" },
                        { icon: SiTailwindcss, name: "TailwindCSS" },
                        { icon: SiTypescript, name: "Typescript" },
                        { icon: SiGit, name: "Git" },
                        { icon: SiGithub, name: "GitHub" },
                    ]} />

                    {/* Já Trabalhei */}

                    <StackCard situation={translation[language].worked} technologies={[
                        { icon: SiDotnet, name: "Dotnet" },
                        { icon: SiPython, name: "Python" },
                        { icon: SiUnity, name: "Unity" },
                        { icon: SiFirebase, name: "Firebase" },
                        { icon: SiStyledcomponents, name: "Style in Js" },
                        { icon: SiFlutter, name: "Flutter" },
                        { icon: SiMysql, name: "MySQL" },
                        { icon: SiAmazonwebservices, name: "AWS" },
                        { icon: SiOracle, name: "Oracle" },
                        { icon: SiJasmine, name: "Jasmine" },
                        { icon: SiSass, name: "SASS" },                    
                        { icon: SiExpo, name: "Expo" },
                    ]} />

                    {/* Estou Estudando */}

                    <StackCard situation={translation[language].studying} technologies={[
                        { icon: SiMongodb, name: "MongoDB" },
                        { icon: SiPrisma, name: "Prisma" },
                        { icon: SiDocker, name: "Docker" },
                        { icon: SiNextdotjs, name: "Next JS" },
                        { icon: SiNodedotjs, name: "Node JS" },
                        { icon: SiPostgresql, name: "PostgreeSql" },
                    ]} />
                </div>
            </div>
        </section>
    );
}
