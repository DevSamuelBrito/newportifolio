"use client"

//react
import { useState } from "react";

//icons
import { ChevronDown, ChevronUp } from "lucide-react";

//components
import ExperienceCard from "./components/ExperienceCard";

//hooks
import { useTranslation } from "@/hooks/useTranslation";


export function Experience() {

    const { t } = useTranslation();

    const [showAll, setShowAll] = useState(false);

    const renderData = showAll ?
        t.experience.data.map((item, index) => (
            <ExperienceCard
                key={index}
                index={index}
                role={item.role}
                company={item.company}
                period={item.period}
                activities={item.activities}
                technologies={item.technologies}
            />
        ))
        :
        t.experience.data.slice(0, 3).map((item, index) => (
            <ExperienceCard
                key={index}
                index={index}
                role={item.role}
                company={item.company}
                period={item.period}
                activities={item.activities}
                technologies={item.technologies}
            />
        ));

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
                <div className="w-full mt-4 flex flex-col gap-y-8 items-center">
                    {renderData}
                </div>

                {t.experience.data.length > 3 && (
                    <div key={t.experience.data.length} className="flex justify-center mt-10">
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
                    </div>
                )}

            </div>
        </section>

    );
};

