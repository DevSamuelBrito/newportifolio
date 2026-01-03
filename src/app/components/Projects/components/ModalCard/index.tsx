import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { IoCloseCircle } from "react-icons/io5";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useLanguage } from "@/providers/LanguageContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const translation = {
    en: {
        checkPost: "Check Post",
        buttonGithub: "Access Repository",
        close: "Close"
    },
    pt: {
        checkPost: "Verificar Post",
        buttonGithub: "Acessar Repositorio",
        close: "Fechar"
    }
}

interface ModalCardProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    stack: IconType[];
    src: string | StaticImageData;
    repository: string;
    post: string;
}

export default function ModalCard({ isOpen, onClose, title, src, description, stack, repository, post }: ModalCardProps) {
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);

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
    if (!mounted) return null; // Impede renderização no servidor (SSG/SSR)

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
            transition-all duration-300 ease-in-out`}>
            <div className={`bg-white p-8 rounded-lg shadow-lg max-w-6xl xl:max-w-7xl w-full max-h-[90vh] overflow-y-auto relative 
                ${isOpen ? 'transform scale-100' : 'transform scale-90'} 
                transition-all duration-300 ease-in-out`}>

                <button onClick={onClose} className="absolute top-5 right-3 hover:text-gray-500 text-red-700" aria-label={translation[language].close}>
                    <IoCloseCircle size={34} />
                </button>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-5">

                    <div className="flex flex-col items-center">

                        <Image src={src} width={500} height={400} alt={title} className="rounded-md max-w-full" />
                        <div className="flex gap-7 mt-10 justify-center w-full">

                            <Link href={repository}
                                target="_blank" className="flex border-blue-500 bg-white text-blue-500  items-center justify-center w-1/2 rounded-md border-2 py-2 px-2 gap-2 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white">
                                <FaGithub size={18} />
                                {translation[language].buttonGithub}
                            </Link>
                            {
                                post && (
                                    <Link href={post}
                                        target="_blank" className="flex border-blue-500 bg-white text-blue-500  items-center justify-center w-1/2 rounded-md border-2 py-2 px-2 gap-2 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white">
                                        <FaExternalLinkAlt size={16} />
                                        {translation[language].checkPost}
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col pl-5 max-w-full md:max-w-2xl">
                        <h1 className="text-xl font-semibold pb-3 text-gray-800 md:text-xl xl:text-2xl">{title}</h1>
                        <p className="text-gray-500 text-base break-words whitespace-pre-line xl:text-xl">
                            {description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-gray-300 py-2">

                            {
                                stack.map((Icon, i) => (
                                    <Icon key={i} size={24} className="text-blue-500" />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
