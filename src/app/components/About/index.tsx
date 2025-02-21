"use client"
import Image from "next/image";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import img from "@/assets/images/profile-pic.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/providers/LanguageContext";
import { Typewriter } from "react-simple-typewriter";


const translation = {
  en: {
    hello: "Hello I'm",
    role: "Developer Full Stack",
    introducation: (
      <>
        I'm a developer specialized in
        <span className="font-bold text-blue-500"> Next.js, React, Typescript, MongoDB</span> and <span className="font-bold text-blue-500"> Prisma.</span> With a degree in <span className="font-bold text-blue-500"> Systems Analysis
          and Development </span>from<span className="font-bold text-blue-500"> Fatec Rio Preto, </span> I'm always looking for
        challenges that allow me to evolve and create elegant digital
        experiences.
      </>
    ),
    introducation2: (
      <>
        Currently, I am dedicating myself to studies and personal projects
        in search of new <span className="font-bold text-blue-500"> challenges</span> to improve my skills and become an
        increasingly better developer.
      </>
    )

  },
  pt: {
    hello: "Olá, eu sou",
    role: "Desenvolvedor Full Stack",
    introducation: (
      <>
        Sou um desenvolvedor especializado em
        <span className="font-bold text-blue-500"> Next.js, React, Typescript, MongoDB</span> and <span className="font-bold text-blue-500"> Prisma.</span> Formado em <span className="font-bold text-blue-500"> Análise e Desenvolvimento de Sistemas</span> pela <span className="font-bold text-blue-500"> Fatec Rio Preto,</span> estou sempre em busca de
        desafios que me permitam evoluir e criar modelos digitais elegantes
      </>
    ),
    introducation2: (
      <>
        Atualmente, estou me dedicando aos estudos e projetos pessoais
        em busca de novos <span className="font-bold text-blue-500"> desafios</span> para aprimorar minhas habilidades e me tornar um
        desenvolvedor cada vez melhor.
      </>
    )
  }
}

export function About() {

  const { language } = useLanguage();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [language]);

  return (
    <div>
      <section className="bg-gray-900 min-h-screen flex items-center pt-16">
        <div className="grid px-4 md:px-0 max-w-screen-xl  lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]  py-8 mx-auto lg:grid-cols-12 w-full">
          <div className="lg:col-span-6 flex flex-col justify-center mb-8 lg:mb-0 sm:px-2 md:px-4 xl:px-0">
            <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-white">
              {translation[language].hello} <br />
              <span className="text-blue-500">

                <Typewriter key={key} words={["Samuel Brito", translation[language].role]} loop={true} cursor
                  cursorStyle="|" typeSpeed={50} delaySpeed={2000} deleteSpeed={100} />

              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 ">
              {translation[language].introducation}
            </p>
            <p className="mt-2 text-lg text-gray-500 ">
              {translation[language].introducation2}
            </p>
            <div className="flex flex-row mt-6 items-center gap-3">
              <a
                href="/documents/cv.pdf"
                download="cv.pdf"
                className="border-blue-500 border-2 rounded-full px-4 py-3 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300"
              >
                Download CV <Download size={18} className="ml-2" />
              </a>
              <Link
                href="https://github.com/DevSamuelBrito"
                target="_blank"
                className="border-blue-500 border-2 rounded-full p-3 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300"
              >
                <FaGithub size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/samuel-fava-de-brito/"
                target="_blank"
                className="border-blue-500 border-2 rounded-full p-3 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-6 lg:flex justify-center items-center">
            <Image
              src={img}
              alt="Profile Picture"
              className="rounded-full w-64 h-64 object-cover shadow-xl"
              width={512}
              height={512}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
