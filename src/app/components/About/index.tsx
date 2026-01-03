"use client"
//next
import Image from "next/image";

//images
import img from "@/assets/images/developer.gif";

//animation
import { motion } from "framer-motion";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//utils
import { parseHighlight } from "@/utils/parseHighlight";

export function About() {
   

    const { t } = useTranslation();

    return (
        <section id="about" className="bg-gray-900 min-h-screen flex flex-col items-center pt-16">

            <div className="grid px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto lg:grid-cols-12 w-full">

                <motion.div initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="lg:col-span-12 w-full text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {t.about.title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-6 flex justify-center items-center max-w-xl 2xl:max-w-2xl mx-10"
                >
                    <Image
                        src={img}
                        className="object-cover w-full h-auto"
                        alt="Profile Picture"
                        width={512}
                        height={512}
                        unoptimized
                    />
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-6 flex flex-col justify-center lg:mb-0 sm:px-2 md:px-4 xl:px-0">
                    <p className="mt-4 text-lg text-gray-400 text-center 2xl:text-xl">
                        {parseHighlight(t.about.about)}
                    </p>
                    <p className="mt-4 text-lg text-gray-400 text-center 2xl:text-xl">
                        {parseHighlight(t.about.about2)}
                    </p>
                    <p className="mt-4 text-lg text-gray-400 text-center 2xl:text-xl">
                        {parseHighlight(t.about.about3)}
                    </p>
                    <p className="mt-4 text-lg text-gray-400 text-center 2xl:text-xl">
                        {parseHighlight(t.about.about4)}
                    </p>
                </motion.div>

            </div>

        </section>


    );
}

