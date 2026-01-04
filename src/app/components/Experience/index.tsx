"use client"

//components
import ExperienceCard from "./components/ExperienceCard";

//hooks
import { useTranslation } from "@/hooks/useTranslation";


export function Experience() {

    const { t } = useTranslation();


    const renderData = t.experience.data.map((item, index) => (
        <ExperienceCard
            key={index}
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
                <div className="w-full mt-4  grid grid-cols-1 gap-y-8 place-items-center ">
                    {renderData}
                </div>

            </div>
        </section>

    );
};

