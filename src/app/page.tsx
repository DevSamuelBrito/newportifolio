import { Hero } from "./components/Hero";
import { Navbar } from "./components/Header";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import ScrollToTopButton from "./components/ScrollTopButton";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Services />
      <Contact />
      <ScrollToTopButton />
    </>
  );
}
