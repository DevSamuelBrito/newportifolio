"use client";
import { useLanguage } from "@/app/providers/LanguageContext";
import { DiFirebase } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import { SiOracle, SiFirebase, SiMysql, SiFlutter, SiMongodb, SiPrisma, SiReact, SiNextdotjs, SiTailwindcss, SiDocker, SiTypescript, SiNodedotjs, SiDotnet, SiPython, SiUnity, SiPostgresql } from "react-icons/si";


const translation = {
    en: {
        Stack: "Stack",
    },
    pt: {
        Stack: "Tecnologias",
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
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Trabalhando Atualmente */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-500">Trabalhando Atualmente</h3>
                        <span className="block w-24 h-1 bg-blue-500 mt-2 rounded-full"></span>
                        <ul className="mt-6 text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiReact size={64} />
                                <p>React</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiNextdotjs size={64} />
                                <p>Next Js</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiTailwindcss size={64} />
                                <p>TailwindCSS</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiTypescript size={64} />
                                <p>Typescript</p>
                            </li>
                        </ul>
                    </div>

                    {/* Já Trabalhei */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-500">Já Trabalhei</h3>
                        <span className="block w-24 h-1 bg-blue-500 mt-2 rounded-full"></span>

                        <ul className="mt-6 text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiDotnet size={64} />
                                <p>Dotnet</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiPython size={64} />
                                <p>Python</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiUnity size={64} />
                                <p>Unity</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiFirebase size={64} />
                                <p>Firebase</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiFlutter size={64} />
                                <p>Flutter</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiMysql size={64} />
                                <p>MySQL</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <FaAws size={64} />
                                <p>AWS</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiOracle size={64} />
                                <p>Oracle</p>
                            </li>
                        </ul>
                    </div>

                    {/* Estou Estudando */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-500">Estou Estudando</h3>
                        <span className="block w-24 h-1 bg-blue-500 mt-2 rounded-full"></span>

                        <ul className="mt-6 text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiMongodb size={64} />
                                <p>MongoDB</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiPrisma size={64} />
                                <p>Prisma</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiDocker size={64} />
                                <p>Docker</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiNextdotjs size={64} />
                                <p>Next JS</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiNodedotjs size={64} />
                                <p>Node JS</p>
                            </li>
                            <li className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                                <SiPostgresql size={64} />
                                <p>PostgreeSql</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
