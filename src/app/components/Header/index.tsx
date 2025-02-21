"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import brasilFlag from "@/assets/images/BR-flag.png";
import usaFlag from "@/assets/images/USA-flag.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEng, setIsEng] = useState(true);
  const [isPt, setIsPt] = useState(false);



  return (
    <header className="fixed top-0 w-full z-50 h-14 lg:h-auto">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-[#0d1b2a]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl  lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <Link
            href="https://www.linkedin.com/in/samuel-fava-de-brito"
            className="flex items-center"
          >
            <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
              Samuel Brito
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-blue-900 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            className={`${isOpen ? "block" : "hidden"
              } lg:flex justify-between items-center w-full lg:w-auto`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 font-medium ">
              <li>
                <Link
                  href="#home"
                  className="block py-2 px-4 text-white rounded-lg hover:text-lg hover:text-blue-500 hover:font-bold transition-all duration-200  lg:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#home"
                  className="block py-2 px-4 text-white rounded-lg hover:text-lg hover:text-blue-500 hover:font-bold transition-all duration-200 lg:p-0 "
                >
                  About me
                </Link>
              </li>
              <li>
                <Link
                  href="#home"
                  className="block py-2 px-4 text-white rounded-lg hover:text-lg hover:text-blue-500 hover:font-bold transition-all duration-200 lg:p-0 "
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#home"
                  className="block py-2 px-4 text-white rounded-lg hover:text-lg hover:text-blue-500 hover:font-bold transition-all duration-200 lg:p-0 "
                >
                  Stack
                </Link>
              </li>
              <li>
                <Link
                  href="#home"
                  className="block py-2 px-4 text-white rounded-lg hover:text-lg hover:text-blue-500 hover:font-bold transition-all duration-200 lg:p-0 "
                >
                  Contact
                </Link>
              </li>
              {isOpen && (
                <li className="flex flex-col gap-2">
                  <button
                    className="px-2 py-2"
                    onClick={() => {
                      console.log('click inglês')
                    }}
                  >
                    <Image
                      src={usaFlag}
                      alt="Usa Flag"
                      className="w-8 h-8 rounded-full"
                      width={28}
                      height={28}
                    />
                  </button>
                  <button
                    className="px-2 py-2"
                    onClick={() => {
                      console.log("click português")
                    }}
                  >
                    <Image
                      src={brasilFlag}
                      alt="Brasil Flag"
                      className="w-8 h-8 rounded-full"
                      width={28}
                      height={28}
                    />
                  </button>
                </li>
              )}
            </ul>
          </div>


          <div className="hidden lg:flex items-center">
            <button
              className="px-2 py-2"
              onClick={() => {
                console.log('click inglês')
              }}
            >
              <Image
                src={usaFlag}
                alt="Usa Flag"
                className="w-8 h-8 rounded-full"
                width={28}
                height={28}
              />
            </button>
            <button
              className="px-2 py-2"
              onClick={() => {
                console.log("click português")
              }}
            >
              <Image
                src={brasilFlag}
                alt="Brasil Flag"
                className="w-8 h-8 rounded-full"
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
