//react
import { useEffect, useState } from "react";

//next
import Image from "next/image";

import Link from "next/link";

//icons
import { IoCloseCircle } from "react-icons/io5";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import { TbWorld } from "react-icons/tb";

//providers
import { useLanguage } from "@/providers/LanguageContext";

//types
import type { Project } from "../../types";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

interface ModalCardProps {
    isOpen: boolean;
    onClose: () => void;
    data: Project;
}

export default function ModalCard({ isOpen, onClose, data }: ModalCardProps) {

    const { t } = useTranslation();

    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);

    const description = language === "en" ? data.descriptionEn : data.descriptionBr;
    const title = language === "en" ? data.titleEn : data.titleBr;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        setMounted(true);
    }, []);


    useEffect(() => {
        // Fechar o modal quando pressionar ESC
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        // Fechar o modal ao clicar fora dele
        const handleClickOutside = (e: MouseEvent) => {
            const modalElement = document.getElementById("modal-container");
            if (modalElement && !modalElement.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            // Adicionar event listeners
            window.addEventListener("keydown", handleEscKey);
            window.addEventListener("mousedown", handleClickOutside);
        }

        // Limpar os event listeners quando o modal for fechado ou o componente for desmontado
        return () => {
            window.removeEventListener("keydown", handleEscKey);
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!mounted) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
            transition-all duration-300 ease-in-out`}>

            <div className={`bg-white p-8 rounded-lg shadow-lg max-w-6xl xl:max-w-7xl w-full max-h-[90vh] relative flex flex-col
                ${isOpen ? 'transform scale-100' : 'transform scale-90'} 
                transition-all duration-300 ease-in-out`}>

                <button onClick={onClose} className="absolute top-5 right-3 hover:text-gray-500 text-red-700" aria-label={t.projects.close}>
                    <IoCloseCircle size={34} />
                </button>

                <div className="flex flex-col md:flex-row gap-5 flex-1 overflow-hidden">

                    {/* Coluna esquerda — fixa */}
                    <div className="flex flex-col items-center md:w-6/12 w-full flex-shrink-0 gap-6 justify-center">

                        <div className="w-full h-[240px] sm:h-[280px] md:h-[420px] xl:h-[500px] relative flex-shrink-0">
                            <Image
                                src={data.src}
                                alt={title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={data.index <= 2}
                            />
                        </div>

                        <div className="flex gap-7 justify-center w-full">
                            <Link href={data.repository}
                                target="_blank" className="flex border-blue-500 bg-white text-blue-500 items-center justify-center w-1/2 rounded-md border-2 py-2 px-2 gap-2 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white">
                                <FaGithub size={18} />
                                {t.projects.buttonGithub}
                            </Link>

                            {data.post && (
                                <Link href={data.post}
                                    target="_blank" className="flex border-blue-500 bg-white text-blue-500 items-center justify-center w-1/2 rounded-md border-2 py-2 px-2 gap-2 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white">
                                    <FaExternalLinkAlt size={16} />
                                    {t.projects.checkPost}
                                </Link>
                            )}
                            {
                                data.website && (
                                    <Link href={data.website}
                                        target="_blank" className="flex border-blue-500 bg-white text-blue-500 items-center justify-center w-1/2 rounded-md border-2 py-2 px-2 gap-2 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white">
                                        <TbWorld size={16} />
                                        {t.projects.websiteLink}
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                    {/* Coluna direita — título fixo, descrição rola, stack fixo */}
                    <div className="flex flex-col pl-5 md:w-6/12 flex-1 min-h-0">

                        {/* Título fixo */}
                        <h1 className="text-xl font-semibold pb-3 text-gray-800 md:text-xl xl:text-2xl flex-shrink-0 border-b border-gray-200">
                            {title}
                        </h1>

                        {/* Descrição com scroll */}
                        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                            <div className="min-h-full flex flex-col justify-center space-y-4 text-gray-500 text-base break-words xl:text-xl">
                                {description.map((paragraph, index) => (
                                    <p key={index} className="whitespace-pre-line">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Stack fixo no rodapé */}
                        <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-200 flex-shrink-0">
                            {data.stack.map((Icon, i) => (
                                <Icon key={i} size={24} className="text-blue-500" />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
