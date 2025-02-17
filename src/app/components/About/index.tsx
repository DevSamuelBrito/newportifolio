import { Container } from "../Container";
import Image from "next/image";
import { HyperText } from "./components/HyperText";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import img from "@/assets/images/profile-pic.png";
import Link from "next/link";

export function About() {
  return (
    <div>
      <section className="bg-gray-900 min-h-screen flex items-center pt-16">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:grid-cols-12 w-full">
          <div className="lg:col-span-6 flex flex-col justify-center  mb-8 lg:mb-0">
            <h1 className="font-bold text-white text-lg">
              Full Stack Developer
            </h1>
            <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-white">
              Hello I'm <br />
              <span className="text-blue-500">
                <HyperText
                  duration={1000}
                  animateOnHover
                  className="text-4xl font-sans font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl "
                >
                  Samuel Brito
                </HyperText>
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 ">
              I'm a full stack developer specialized in Next.js, React,
              TypeScript, MongoDB and Prisma. With a degree in Systems Analysis
              and Development from Fatec Rio Preto, I'm always looking for
              challenges that allow me to evolve and create elegant digital
              experiences.
            </p>
            <p className="mt-2 text-lg text-gray-500 ">
              Currently, I am dedicating myself to studies and personal projects
              in search of new challenges to improve my skills and become an
              increasingly better developer.
            </p>
            <div className="flex flex-row mt-6 items-center gap-3">
              <a
                href="/documents/cv.pdf"
                download="cv.pdf"
                className="border-blue-500 border-2 rounded-full px-4 py-2 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300"
              >
                Download CV <Download size={18} className="ml-2" />
              </a>
              <Link
                href="https://github.com/DevSamuelBrito"
                target="_blank"
                className="border-blue-500 border-2 rounded-full p-3 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300"
              >
                <FaGithub size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/samuel-fava-de-brito/"
                target="_blank"
                className="border-blue-500 border-2 rounded-full p-3 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-6 lg:flex justify-center items-center">
            <Image
              src={img}
              alt="Profile Picture"
              className="rounded-full w-64 h-64 object-cover shadow-xl"
              width={512}
              height={512}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
