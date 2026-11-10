//react
import type { ReactNode } from "react";

//components
import { Background } from "@/components/shared/Background";

import { ScrollProgress } from "@/components/shared/ScrollProgress";

import { StackedSections } from "@/components/shared/StackedSections";

import { Hero } from "./components/Hero";

import { Navbar } from "./components/Navbar";

import { Projects } from "./components/Projects";

import { GitHub } from "./components/GitHub";

import { Stack } from "./components/Stack";

import { About } from "./components/About";

import { Experience } from "./components/Experience";

import { Certifications } from "./components/Certifications";

import { Contact } from "./components/Contact";

import { Footer } from "./components/Footer";

import ScrollToTopButton from "./components/ScrollTopButton";

//data
import { SECTION_ORDER, type SectionId } from "@/data/sections";

// A ordem em que as seções aparecem é definida em src/data/sections.ts
const SECTIONS: Record<SectionId, ReactNode> = {
  home: <Hero />,
  projects: <Projects />,
  experience: <Experience />,
  github: <GitHub />,
  stack: <Stack />,
  about: <About />,
  certifications: <Certifications />,
  contact: <Contact />,
};

export default function App() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <Navbar />
      {/* Cada seção é uma "folha": a próxima sobe por cima da anterior ao rolar */}
      <StackedSections sections={SECTION_ORDER.map((id) => ({ id, node: SECTIONS[id] }))} />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
