"use client"
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Header";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import ScrollToTopButton from "./components/ScrollTopButton";
import AlertDownload from "./components/AlertDownload";
import { useState } from "react";
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
      <About />
      <Projects />
      <Stack />
      <Services />
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
