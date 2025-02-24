"use client"
import Image from "next/image";
import img from "@/assets/images/devcontrole.png";
import { FaReact } from "react-icons/fa";
import { useState } from "react";
import { SiNextdotjs, SiMongodb, SiPrisma, SiTypescript, SiTailwindcss } from "react-icons/si";
import { ProjectCard } from "./components/ProjectCard";

export function Projects() {

  const [hover, setHover] = useState(false);

  return (
    <section className="bg-gray-900 min-h-screen pt-14">
      <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit" >


        <div className="text-center">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            Projects
            <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>


        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">

          <ProjectCard title="Dev Controle" src={img} stack={[SiTypescript, FaReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma]} />
          <ProjectCard title="Dev Controle" src={img} stack={[SiTypescript, FaReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma]} />
          <ProjectCard title="Dev Controle" src={img} stack={[SiTypescript, FaReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma]} />
        </div>
      </div>
    </section>
  );
}
