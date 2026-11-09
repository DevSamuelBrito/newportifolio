"use client";

//react
import { useEffect, useRef, useState } from "react";

//icons
import { ArrowUpRight, Download } from "lucide-react";

import { SiDotnet, SiNextdotjs, SiPostgresql, SiReact, SiTypescript } from "react-icons/si";

import type { IconType } from "react-icons";

//animation
import { motion } from "framer-motion";

//components
import { CodeWindow } from "./components/CodeWindow";

import DownloadNotification from "../DownloadNotification";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//utils
import { parseHighlight } from "@/utils/parseHighlight";

//data
import { RESUME_FILES } from "@/data/links";

const HERO_STACK: { icon: IconType; name: string; color: string }[] = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
  { icon: SiTypescript, name: "TypeScript", color: "#3B82F6" },
  { icon: SiDotnet, name: ".NET", color: "#9B7BFF" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#5B8DEF" },
];

export function Hero() {
  const { t, language } = useTranslation();

  const [showAlert, setShowAlert] = useState(false);

  const alertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resume = RESUME_FILES[language];

  const handleDownloadClick = () => {
    setShowAlert(true);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);
    alertTimeout.current = setTimeout(() => setShowAlert(false), 5000);
  };

  useEffect(() => {
    return () => {
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
    };
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center pb-16 pt-32 lg:pt-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="min-w-0 lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-2xl font-medium text-neutral-200 sm:text-3xl"
          >
            {t.hero.greeting} <span className="text-gradient font-semibold">Samuel Brito</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-400"
          >
            {parseHighlight(t.hero.description)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              {t.hero.projectsCta}
              <ArrowUpRight size={18} />
            </a>

            <a href={resume.href} download={resume.name} onClick={handleDownloadClick} className="btn-secondary">
              {t.hero.cv}
              <Download size={18} />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-5"
          >
            {HERO_STACK.map(({ icon: Icon, name, color }) => (
              <li key={name} className="flex flex-col items-center gap-2 text-neutral-400">
                <Icon size={34} style={{ color }} aria-hidden />
                <span className="text-sm">{name}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="min-w-0 lg:col-span-5"
        >
          <CodeWindow />
        </motion.div>
      </div>

      <DownloadNotification showAlert={showAlert} />
    </section>
  );
}
