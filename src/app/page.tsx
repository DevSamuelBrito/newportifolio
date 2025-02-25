import { About } from "./components/About";
import { Navbar } from "./components/Header";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <About />
      <Projects />
      <Stack />
    </>
  );
}
