"use client";
import { useState, useEffect } from "react";
import { ButtonTranslate } from "./components/ButtonTranslate";
import { Menu, X } from "lucide-react";
import brasilFlag from "@/assets/images/BR-flag.png";
import usaFlag from "@/assets/images/USA-flag.png";
import { useLanguage } from "@/app/providers/LanguageContext";
import { HeroItem, NavBarItem } from "./components/NavBarItem";
import { motion } from "framer-motion";

const translation = {
  en: {
    services: "Services",
    about: "About me",
    projects: "Projects",
    stack: "Stack",
    contact: "Contact",
  },
  pt: {
    services: "Serviços",
    about: "Sobre mim",
    projects: "Projetos",
    stack: "Tecnologias",
    contact: "Contato",
  }
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage(); // aqui eu pego o contexto do idioma

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = document.querySelector(`a[href="#${entry.target.id}"]`);
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            link?.classList.add("text-blue-700");
          } else {
            link?.classList.remove("text-blue-700");
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <motion.header initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 h-14 lg:h-auto shadow-lg">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-[#13202e]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl  lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">

          <HeroItem />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-500 rounded-lg focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            className={`${isOpen ? "block" : "hidden"
              } lg:flex justify-between items-center w-full lg:w-auto`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 font-medium ">

              <NavBarItem href="#about" id="about" label={translation[language].about} activeSection="about" setActiveSection={setActiveSection} />
              <NavBarItem href="#projects" id="projects" label={translation[language].projects} activeSection="projects" setActiveSection={setActiveSection} />
              <NavBarItem href="#stack" id="stack" label={translation[language].stack} activeSection="stack" setActiveSection={setActiveSection} />
              <NavBarItem href="#services" id="services" label={translation[language].services} activeSection="services" setActiveSection={setActiveSection} />
              <NavBarItem href="#contact" id="contact" label={translation[language].contact} activeSection="contact" setActiveSection={setActiveSection} />

              {isOpen && (
                <li className="flex flex-row  gap-2">
                  <ButtonTranslate languageDefault={"en"} src={usaFlag} title="Switch to English" />
                  <ButtonTranslate languageDefault={"pt"} src={brasilFlag} title="Trocar para o Português" />
                </li>
              )}
            </ul>
          </div>


          <div className="hidden lg:flex items-center">
            <ButtonTranslate languageDefault={"en"} src={usaFlag} title="Switch to English" />
            <ButtonTranslate languageDefault={"pt"} src={brasilFlag} title="Trocar para o Português" />
          </div>

        </div>
      </nav>
    </motion.header>
  );
};
