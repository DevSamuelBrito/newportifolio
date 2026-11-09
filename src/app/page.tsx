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

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
