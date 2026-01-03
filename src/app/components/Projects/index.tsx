"use client"

//react
import { useState } from "react";

//icons
import { ChevronDown, ChevronUp } from "lucide-react";

//data
import { ProjectsData } from "./data/projectsData";

//components
import { ProjectCard } from "./components/ProjectCard";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Projects() {

  const [showAll, setShowAll] = useState(false);

  const { t } = useTranslation();

  const projectsData = ProjectsData;

  const displayedProjects = showAll
    ? projectsData.map(project => (
      <ProjectCard
        key={project.id}
        index={project.index}
        src={project.src}
        stack={project.stack}
        post={project.post}
        repository={project.repository}
        title={project.title}
        descriptionBr={project.descriptionBr}
        descriptionEn={project.descriptionEn}
      />
    ))
    : projectsData.slice(0, 6).map(project => (
      <ProjectCard
        key={project.id}
        index={project.index}
        src={project.src}
        stack={project.stack}
        post={project.post}
        repository={project.repository}
        title={project.title}
        descriptionBr={project.descriptionBr}
        descriptionEn={project.descriptionEn}
      />
    ));

  return (
    <section id="projects" className="bg-gray-900 min-h-screen pt-14">
      <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit" >


        <div className="text-center">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            {t.projects.title}
            <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>


        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {displayedProjects}
        </div>

        {projectsData.length > 6 && (
          <div key={projectsData.length} className="flex justify-center mt-10">
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
          </div>
        )}

      </div>
    </section>
  );
}
