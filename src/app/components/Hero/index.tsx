"use client"

//react
import { useEffect, useState } from "react";

//icons
import { Download } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

//context
import { useLanguage } from "@/providers/LanguageContext";

//typewriter
import { Typewriter } from "react-simple-typewriter";

//animation
import { motion } from "framer-motion";

//components
import { SocialMediaButton } from "../Navbar/components/SocialMediaButton";

import { Photo } from "./components/Photo";

//utils
import { parseHighlight } from "@/utils/parseHighlight";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

interface HeroProps {
  onDownloadClick: () => void;
}

export function Hero({ onDownloadClick }: HeroProps) {

  const { language } = useLanguage();
  const [key, setKey] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [language]);

  return (
    <div className="overflow-hidden">
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
              {t.hero.hello} <br />
              <span className="text-blue-500">

                <Typewriter key={key} words={["Samuel Brito", t.hero.role]} loop={true} cursor
                  cursorStyle="|" typeSpeed={50} delaySpeed={2000} deleteSpeed={100} />

              </span>
            </p>
            <p className="mt-4 text-lg text-gray-400 2xl:text-xl ">
              {parseHighlight(t.hero.introducation)}
            </p>
            <p className="mt-2 text-lg text-gray-400 2xl:text-xl">
              {parseHighlight(t.hero.introducation2)}
            </p>
            <div className="flex flex-row mt-6 items-center gap-3">

              <a
                href="cvSamuelBrito.pdf"
                download="cvSamuelBrito.pdf"
                className="border-blue-500 border-2 rounded-full px-4 py-3 text-lg  inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                onClick={onDownloadClick}
              >
                {t.hero.cv}<Download size={18} className="ml-2" />
              </a>

              <SocialMediaButton
                href="https://github.com/DevSamuelBrito"
                Icon={FaGithub}
              />
              <SocialMediaButton
                href="https://www.linkedin.com/in/samuel-fava-de-brito/"
                Icon={FaLinkedin}
              />

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: +100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="hidden lg:col-span-6 lg:flex justify-center items-center xl:justify-end"
          >
            <Photo />
          </motion.div>

        </div>
      </section >
    </div >
  );
}
