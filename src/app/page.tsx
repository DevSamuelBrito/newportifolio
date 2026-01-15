"use client"

//react
import { useState } from "react";

//components
import { Hero } from "./components/Hero";

import { Navbar } from "./components/Navbar";

import { Projects } from "./components/Projects";

import { Stack } from "./components/Stack";

import { About } from "./components/About";

import { Experience } from "./components/Experience";

import { Certifications } from "./components/Certifications";

import { Contact } from "./components/Contact";

import ScrollToTopButton from "./components/ScrollTopButton";

import AlertDownload from "./components/AlertDownload";

//animation
import { AnimatePresence } from "framer-motion";


export default function App() {

  const [showAlert, setShowAlert] = useState(false)

  const handleDownloadClick = () => {
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 5000)
  }
  return (
    <>
      <Navbar />
      <Hero onDownloadClick={handleDownloadClick} />
      <Projects />
      <Stack />
      <Experience />
      <Certifications />
      <About />
      <Contact />
      <ScrollToTopButton />
      <AnimatePresence>
        {
          showAlert && <AlertDownload />
        }
      </AnimatePresence>
    </>
  );
}
