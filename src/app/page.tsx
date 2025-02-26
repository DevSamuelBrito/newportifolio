import { Hero } from "./components/Hero";
import { Navbar } from "./components/Header";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { About } from "./components/About";
import { Services } from "./components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Services />
    </>
  );
}
