"use client";

//react
import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

//icons
import { ArrowUpRight, Download } from "lucide-react";

import { SiDotnet, SiNestjs, SiNextdotjs, SiPostgresql, SiReact, SiTypescript } from "react-icons/si";

import type { IconType } from "react-icons";

//animation
import { motion } from "framer-motion";

//components
import { CodeWindow } from "./components/CodeWindow";

import DownloadNotification from "../DownloadNotification";

import { DOWNLOAD_ALERT_MS } from "../DownloadNotification/AlertDownload";

import { DecryptText } from "@/components/shared/DecryptText";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//utils
import { parseHighlight } from "@/utils/parseHighlight";

//lib
import { scrollToSection } from "@/lib/sheets";

//data
import { getBrandColor } from "@/data/brandColors";

import { RESUME_FILES } from "@/data/links";

const HERO_STACK: { icon: IconType; name: string }[] = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiDotnet, name: ".NET" },
  { icon: SiNestjs, name: "NestJS" },
  { icon: SiPostgresql, name: "PostgreSQL" },
];

export function Hero() {
  const { t, language } = useTranslation();

  const [showAlert, setShowAlert] = useState(false);

  // O alerta é "fixed": precisa sair de dentro da seção (que é uma folha empilhada),
  // senão a próxima folha o cobriria.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const alertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resume = RESUME_FILES[language];

  // Muda a cada clique para a barra de progresso do aviso recomeçar
  const [alertId, setAlertId] = useState(0);

  const closeAlert = () => {
    if (alertTimeout.current) clearTimeout(alertTimeout.current);
    setShowAlert(false);
  };

  const handleDownloadClick = () => {
    setShowAlert(true);
    setAlertId((id) => id + 1);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);
    alertTimeout.current = setTimeout(() => setShowAlert(false), DOWNLOAD_ALERT_MS);
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
            {t.hero.greeting} <DecryptText text="Samuel Brito" delay={500} className="text-gradient font-semibold" />
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
                scrollToSection("projects");
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
            {HERO_STACK.map(({ icon: Icon, name }) => (
              <li key={name} className="flex flex-col items-center gap-2 text-neutral-400">
                <Icon size={34} style={{ color: getBrandColor(Icon) }} aria-hidden />
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

      {mounted && createPortal(
          <DownloadNotification showAlert={showAlert} fileName={resume.name} triggerId={alertId} onClose={closeAlert} />,
          document.body
        )}
    </section>
  );
}
