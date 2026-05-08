"use client"

//react
import { useState } from "react";

//icons
import { ChevronDown, ChevronUp } from "lucide-react";

//framer-motion
import { motion } from "framer-motion";

//data
import { ProjectsData } from "./data/projectsData";

//components
import { ProjectCard } from "./components/ProjectCard";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//components
import DefaultSection from "@/components/shared/DefaultSection";

export function Projects() {

  const [showAll, setShowAll] = useState(false);

  const { t } = useTranslation();

  const projectsData = ProjectsData;

  const sortedProjects = [...projectsData].sort((a, b) => b.index - a.index);

  const displayedProjects = showAll
    ? sortedProjects.map((project, i) => (
        <ProjectCard key={project.id} data={project}  index={i} />
      ))
    : sortedProjects.slice(0, 6).map((project, i) => (
        <ProjectCard key={project.id} data={project}  index={i}/>
      ));

  return (

    <DefaultSection section="projects" >
      <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit" >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            {t.projects.title}
            <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>


        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:px-4">
          {displayedProjects}
        </div>

        {projectsData.length > 6 && (
          <motion.div
            key={projectsData.length}
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
              {showAll ? t.projects.showLess : t.projects.showMore}
              {showAll ? (
                <ChevronUp size={20} className="text-current" />
              ) : (
                <ChevronDown size={20} className="text-current" />
              )}

            </button>
          </motion.div>
        )}

      </div>
    </DefaultSection>


  );
}
