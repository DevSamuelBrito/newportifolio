"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ButtonTranslate } from "./components/ButtonTranslate";
import { Menu, X } from "lucide-react";
import brasilFlag from "@/assets/images/BR-flag.png";
import usaFlag from "@/assets/images/USA-flag.png";
import { useLanguage } from "@/app/providers/LanguageContext";

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
    const links = document.querySelectorAll("nav a");

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
    <header className="fixed top-0 w-full z-50 h-14 lg:h-auto shadow-lg">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-[#13202e]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl  lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <Link
            href="#hero"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("hero");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
              Samuel Brito
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-blue-900 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            className={`${isOpen ? "block" : "hidden"
              } lg:flex justify-between items-center w-full lg:w-auto`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 font-medium ">

              <li>
                <Link
                  href="#about"
                  className={`block py-2 px-4 text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === "about" ? "text-blue-700 " : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("about");
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("about"); 
                  }}
                >
                  {translation[language].about}
                </Link>
              </li>

              <li>
                <Link
                  href="#projects"
                    className={`block py-2 px-4 text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === "projects" ? "text-blue-700 " : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("projects");
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("projects");
                  }}
                >
                  {translation[language].projects}
                </Link>
              </li>
              <li>
                <Link
                  href="#stack"
                    className={`block py-2 px-4 text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === "stack" ? "text-blue-700 " : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("stack");
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("stack");
                  }}

                >
                  {translation[language].stack}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                    className={`block py-2 px-4 text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === "services" ? "text-blue-700 " : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("services");
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("services");
                  }}
                >
                  {translation[language].services}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                    className={`block py-2 px-4 text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === "contact" ? "text-blue-700 " : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("contact");
                  }}
                >
                  {translation[language].contact}
                </Link>

              </li>
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
    </header>
  );
};
