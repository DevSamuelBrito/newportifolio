//react
import type { ReactNode } from "react";

//components
import { Background } from "@/components/shared/Background";

import { Hero } from "./components/Hero";

import { Navbar } from "./components/Navbar";

import { Projects } from "./components/Projects";

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
  stack: <Stack />,
  about: <About />,
  certifications: <Certifications />,
  contact: <Contact />,
};

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        {SECTION_ORDER.map((id) => (
          <div key={id}>{SECTIONS[id]}</div>
        ))}
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
