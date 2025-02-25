"use client"
import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { useLanguage } from "@/app/providers/LanguageContext";
import { useState } from "react";
import ModalCard from "../ModalCard";

interface ProjectCardProps {
    title: string,
    src: StaticImageData,
    stack: IconType[],
    descriptionEn: string,
    descriptionBr: string,
    repository: string;
    post: string;

}


export function ProjectCard({ title, src, stack, descriptionEn, descriptionBr, post, repository }: ProjectCardProps) {


    const translation = {
        en: {
            button: "Details",
            description: descriptionEn,
        }, pt: {
            button: "Detalhes",
            description: descriptionBr
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();
    return (
        <>
            <div
                className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-500 group relative:"
            >
                <Image src={src} alt="Project 1" className="w-full h-auto rounded-lg" width={400} height={300} />
                <h3 className="text-xl font-semibold text-white mt-3">{title}</h3>

                <div className="flex items-center gap-2 mt-2 text-gray-300 py-2">
                    {
                        stack.map((Icon, i) => (
                            <Icon key={i} size={24} className="text-blue-500" />
                        ))
                    }
                </div>
                <button className="hidden sm:block absolute bottom-5 right-5 bg-blue-500 px-2 py-2 text-white rounded-lg opacity-0  duration-300 hover:opacity-100 group-hover:opacity-100 hover:bg-blue-700 hover:scale-105 hover:transition-all font-bold" onClick={() => setIsOpen(!isOpen)}>
                    {translation[language].button}
                </button>
            </div>
            <ModalCard description={translation[language].description} src={src} isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} title="Teste Dev controle" stack={stack} repository={repository} post={post} />
        </>
    )
}

