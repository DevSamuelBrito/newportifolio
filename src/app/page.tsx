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

import DownloadNotification from "./components/DownloadNotification/page";

export default function App() {

  const [showAlert, setShowAlert] = useState(false)

  return (
    <>
      <Navbar />
      <Hero
        setShowAlert={setShowAlert}
      />
      <Projects />
      <Stack />
      <Experience />
      <Certifications />
      <About />
      <Contact />
      <ScrollToTopButton />
     <DownloadNotification showAlert={showAlert} />
    </>
  );
}
