"use client"

//react
import { useState } from "react";

//next
import Image from "next/image";

//framer-motion
import { motion } from "framer-motion";

//providers
import { useLanguage } from "@/providers/LanguageContext";

//components
import ModalCard from "../ModalCard";

//types
import type { Project } from "../../types";

interface ProjectCardProps {
    data: Project;
    index: number;
}

export function ProjectCard({ data, index }: ProjectCardProps) {

    const translation = {
        en: {
            button: "Details",
            description: data.descriptionEn,
        }, pt: {
            button: "Detalhes",
            description: data.descriptionBr
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const { language } = useLanguage();


    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="h-full"
        >

            <div
                className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-500 group relative h-full flex flex-col justify-between"
            >
                <Image
                    src={data.src}
                    alt={data.title}
                    className="w-full h-48 object-cover rounded-lg"
                    width={400}
                    height={300}
                />
                <h3 className="text-xl font-semibold text-white mt-3">{data.title}</h3>

                <div className="flex items-center gap-2 mt-2 text-gray-300 py-2">
                    {
                        data.stack.map((Icon, i) => (
                            <Icon key={i} size={24} className="text-blue-500" />
                        ))
                    }
                </div>
                <button className="hidden sm:block absolute bottom-5 right-5 bg-blue-500 px-2 py-2 text-white rounded-lg opacity-0  duration-300 hover:opacity-100 group-hover:opacity-100 hover:bg-blue-700 hover:scale-105 hover:transition-all font-bold" onClick={() => setIsOpen(!isOpen)}>
                    {translation[language].button}
                </button>
            </div>
            <ModalCard
                description={translation[language].description}
                src={data.src}
                isOpen={isOpen}
                onClose={() => setIsOpen(!isOpen)}
                title={data.title}
                stack={data.stack}
                repository={data.repository}
                post={data.post ?? ""}
            />
        </motion.div>
    )
}

