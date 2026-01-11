"use client"

//react
import { useState } from "react";

//icons
import { ChevronDown, ChevronUp } from "lucide-react";

//components
import ExperienceCard from "./components/ExperienceCard";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//animation
import { motion } from "framer-motion";


export function Experience() {

    const { t } = useTranslation();

    const [showAll, setShowAll] = useState(false);

    const dataToRender = showAll ? t.experience.data : t.experience.data.slice(0, 3);

    return (
        <section
            id="experience"
            className="bg-gray-900 min-h-screen pt-14"
        >
            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit">
                <div className="text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {t.experience.title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative w-full mt-12">
                    {/* Linha Vertical Central */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden md:block" />

                    {/* Timeline Items */}
                    <div className="space-y-12">
                        {dataToRender.map((item, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center ${index % 2 === 0
                                    ? 'md:flex-row flex-col'
                                    : 'md:flex-row-reverse flex-col'
                                    }`}
                            >
                                <div className="w-full md:w-5/12">
                                    <ExperienceCard
                                        index={index}
                                        role={item.role}
                                        company={item.company}
                                        period={item.period}
                                        activities={item.activities}
                                        technologies={item.technologies}
                                    />
                                </div>

                                {/* Bolinha Central */}
                                <div className="w-full md:w-2/12 justify-center my-4 md:my-0 hidden md:flex">
                                    <div className="relative flex items-center justify-center w-full">
                                        {/* Linha para a esquerda (quando card está à esquerda) */}
                                        {index % 2 === 0 && (
                                            <div className="absolute right-1/2 w-[calc(50%-12px)] h-0.5 bg-gradient-to-l from-blue-500/60 to-transparent mr-3" />
                                        )}

                                        {/* Bolinha */}
                                        <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900 z-10 shadow-lg shadow-blue-500/50" />

                                        {/* Linha para a direita (quando card está à direita) */}
                                        {index % 2 !== 0 && (
                                            <div className="absolute left-1/2 w-[calc(50%-12px)] h-0.5 bg-gradient-to-r from-blue-500/60 to-transparent ml-3" />
                                        )}
                                    </div>
                                </div>

                                {/* Espaço vazio do outro lado (apenas desktop) */}
                                <div className="hidden md:block md:w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>

                {t.experience.data.length > 3 && (
                    <motion.div
                        key={t.experience.data.length}
                        className="flex justify-center mt-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
                        >
                            {showAll ? t.experience.showLess : t.experience.showMore}
                            {showAll ? (
                                <ChevronUp size={20} className="text-current" />
                            ) : (
                                <ChevronDown size={20} className="text-current" />
                            )}

                        </button>
                    </motion.div>
                )}

            </div>
        </section>

    );
};

