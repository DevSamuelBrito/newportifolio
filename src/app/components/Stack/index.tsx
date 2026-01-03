"use client";

//components
import { StackCard } from "./components/StackCard";

//icons
import { SiOracle, SiFirebase, SiMysql, SiFlutter, SiMongodb, SiPrisma, SiReact, SiNextdotjs, SiTailwindcss, SiDocker, SiTypescript, SiNodedotjs, SiDotnet, SiPython, SiUnity, SiPostgresql, SiStyledcomponents, SiAmazonwebservices, SiGit, SiSass, SiExpo, SiZod, SiLinux, SiJavascript, SiExpress, SiJest, SiVite, } from "react-icons/si";

import { VscAzureDevops } from "react-icons/vsc";

import { CSharpIcon } from "./components/Icons/csharpIcon";

//hooks
import { useTranslation } from "@/hooks/useTranslation";


export function Stack() {

    const { t } = useTranslation();

    return (
        <section id="stack" className="bg-gray-900 min-h-screen pt-14">

            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit">

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white relative inline-block">
                        {t.stack.title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </h2>
                </div>

                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Trabalhando Atualmente */}

                    <StackCard situation={t.stack.currently} technologies={[
                        { icon: SiTypescript, name: "Typescript" },
                        { icon: SiReact, name: "React" },
                        { icon: SiVite, name: "Vite" },
                        { icon: SiTailwindcss, name: "TailwindCSS" },
                        { icon: CSharpIcon, name: "C#" },
                        { icon: SiDotnet, name: "Dotnet" },
                        { icon: VscAzureDevops, name: "AzureDevOps" },
                        { icon: SiGit, name: "Git" },

                    ]} />


                    {/* Já Trabalhei */}

                    <StackCard situation={t.stack.worked} technologies={[
                        { icon: SiJavascript, name: "JavaScript" },
                        { icon: SiStyledcomponents, name: "Style in Js" },
                        { icon: SiSass, name: "SASS" },
                        { icon: SiPython, name: "Python" },
                        { icon: SiUnity, name: "Unity" },
                        { icon: SiExpo, name: "Expo" },
                        { icon: SiFlutter, name: "Flutter" },
                        { icon: SiFirebase, name: "Firebase" },
                        { icon: SiMysql, name: "MySQL" },
                        { icon: SiMongodb, name: "MongoDB" },
                        { icon: SiAmazonwebservices, name: "AWS" },
                        { icon: SiOracle, name: "Oracle" },
                    ]} />

                    {/* Estou Estudando */}

                    <StackCard situation={t.stack.studying} technologies={[
                        { icon: SiNextdotjs, name: "Next JS 14" },
                        { icon: SiNodedotjs, name: "Node JS" },
                        { icon: SiExpress, name: "Express JS" },
                        { icon: SiPostgresql, name: "Postgresql" },
                        { icon: SiPrisma, name: "Prisma" },
                        { icon: SiZod, name: "Zod" },
                        { icon: SiJest, name: "Jest" },
                        { icon: SiLinux, name: "Linux/Wsl2" },
                        { icon: SiDocker, name: "Docker" },
                    ]} />

                </div>
            </div>

        </section>
    );
}
