"use client"
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageContext";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { SocialMediaButton } from "../Header/components/SocialMediaButton";
import { Photo } from "./components/Photo";


const translation = {
  en: {
    hello: "Hello I'm",
    role: "Developer Full Stack",
    cv: "Get Resume",
    introducation: (
      <>
        I'm a developer specialized in
        <span className="font-bold text-blue-500"> Next.js, React, Typescript, Postgres</span> and <span className="font-bold text-blue-500"> Prisma.</span> With a degree in <span className="font-bold text-blue-500"> Systems Analysis
          and Development </span>from<span className="font-bold text-blue-500"> Fatec Rio Preto, </span> I constantly seek challenges that make me grow and create high-impact digital applications.
      </>
    ),
    introducation2: (
      <>
        Currently, I've been honing my <span className="font-bold text-blue-500">skills</span> through hands-on projects and ongoing <span className="font-bold text-blue-500">experiences</span>, always striving to evolve as a <span className="font-bold text-blue-500">Full-Stack Developer.</span>
      </>
    )

  },
  pt: {
    hello: "Olá, eu sou",
    role: "Desenvolvedor Full Stack",
    cv: "Baixar Curriculo",
    introducation: (
      <>
        Sou um desenvolvedor especializado em
        <span className="font-bold text-blue-500"> Next.js, React, Typescript, Postgres</span> and <span className="font-bold text-blue-500"> Prisma.</span> Formado em <span className="font-bold text-blue-500"> Análise e Desenvolvimento de Sistemas</span> pela <span className="font-bold text-blue-500"> Fatec Rio Preto,</span> busco constantemente desafios que me façam crescer e criar aplicações digitais de alto impacto.
      </>
    ),
    introducation2: (
      <>
        Atualmente, venho aprimorando minhas <span className="font-bold text-blue-500">habilidades</span> por meio de projetos práticos e <span className="font-bold text-blue-500">experiências</span> contínuas, sempre buscando evoluir como <span className="font-bold text-blue-500"> Desenvolvedor Full-Stack.</span>
      </>
    )
  }
}

interface HeroProps {
  onDownloadClick: () => void;
}

export function Hero({ onDownloadClick }: HeroProps) {

  const { language } = useLanguage();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [language]);

  return (
    <div>
      <section id="hero" className="bg-gray-900 min-h-screen flex items-center pt-16">

        <div className="grid px-4 md:px-0 max-w-screen-xl  lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]  py-8 mx-auto lg:grid-cols-12 w-full">

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center lg:mb-0 sm:px-2 md:px-4 xl:px-0"
          >

            <p className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-white">
              {translation[language].hello} <br />
              <span className="text-blue-500">

                <Typewriter key={key} words={["Samuel Brito", translation[language].role]} loop={true} cursor
                  cursorStyle="|" typeSpeed={50} delaySpeed={2000} deleteSpeed={100} />

              </span>
            </p>
            <p className="mt-4 text-lg text-gray-400 2xl:text-xl ">
              {translation[language].introducation}
            </p>
            <p className="mt-2 text-lg text-gray-400 2xl:text-xl">
              {translation[language].introducation2}
            </p>
            <div className="flex flex-row mt-6 items-center gap-3">

              <a
                href="cvSamuelBrito.pdf"
                download="cvSamuelBrito.pdf"
                className="border-blue-500 border-2 rounded-full px-4 py-3 text-lg  inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                onClick={onDownloadClick}
              >
                {translation[language].cv}<Download size={18} className="ml-2" />
              </a>

              <SocialMediaButton href="https://github.com/DevSamuelBrito" Icon={FaGithub} />
              <SocialMediaButton href="https://www.linkedin.com/in/samuel-fava-de-brito/" Icon={FaLinkedin} />

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: +100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="hidden lg:col-span-6 lg:flex justify-center items-center xl:justify-end">
            <Photo />
            {/* <Image
              src={img}
              alt="Profile Picture"
              className=" w-96 h-96 rounded-md object-cover shadow-2xl"
              width={512}
              height={512}
            /> */}
          </motion.div>
        </div>
      </section >
    </div >
  );
}
