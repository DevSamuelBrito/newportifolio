"use client";

//components
import { StackCard } from "./components/StackCard";

//icons
import { SiPrisma, SiNextdotjs, SiTailwindcss, SiDocker, SiTypescript, SiDotnet, SiPostgresql, SiGit, SiZod, SiLinux, SiJest, SiVite, SiReact, SiGithub } from "react-icons/si";

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

                    {/* Front */}

                    <StackCard area={"Front-end"} technologies={[
                        { icon: SiTypescript, name: "TypeScript" },
                        { icon: SiReact, name: "React" },
                        { icon: SiVite, name: "Vite" },
                        { icon: SiNextdotjs, name: "Next.js" },
                        { icon: SiTailwindcss, name: "Tailwind CSS" },
                        { icon: SiZod, name: "Zod" },
                        { icon: SiJest, name: "Jest" },
                    ]} />


                    {/* Back */}

                    <StackCard area={"Back-end"} technologies={[

                        { icon: CSharpIcon, name: "C#" },
                        { icon: SiDotnet, name: ".NET" },
                        { icon: SiPrisma, name: "Prisma" },
                        { icon: SiPostgresql, name: "PostgreSQL" },
                    ]} />

                    {/* Outros */}

                    <StackCard area={t.stack.column} technologies={[
                        { icon: SiGit, name: "Git" },
                        { icon: SiGithub, name: "GitHub" },
                        { icon: SiDocker, name: "Docker" },
                        { icon: SiLinux, name: "Linux / WSL2" },
                        { icon: VscAzureDevops, name: "Azure DevOps" },
                    ]} />

                </div>
            </div>

        </section>
    );
}
