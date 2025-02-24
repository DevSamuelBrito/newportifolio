import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";

interface ProjectCardProps {
    title: string,
    src: StaticImageData,
    stack: IconType[],
}


export function ProjectCard({ title, src, stack }: ProjectCardProps) {
    return (
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
            <button className="absolute bottom-5 right-5 bg-blue-500 px-2 py-2 text-white rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100">
                Ver Projeto
            </button>
        </div>
    )
}