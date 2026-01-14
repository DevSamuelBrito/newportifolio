"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import img from "@/assets/images/iconHero.png";
export function Photo() {
    return (
        <div className="text-white w-7/12 h-full flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: "easeIn" } }}
            >
                {/* Photo */}
                <div className="w-72 h-72 xl:w-80 xl:h-80 absolute">
                    <Image
                        src={img}
                        alt="Foto do desenvolvedor"
                        priority
                        quality={100}
                        fill
                        sizes="(max-width: 1280px) 288px, 320px"
                        className="object-contain"
                    />
                </div>
                {/* Circle */}
                <motion.svg
                    className="w-[292px] h-[292px] xl:w-[324px] xl:h-[324px]"
                    fill={"transparent"}
                    viewBox="0 0 506 506"
                    xmlns={"http://www.w3.org/2000/svg"}
                >
                    <motion.circle
                        cx="253"
                        cy="253"
                        r="250"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        initial={{ strokeDasharray: "24 10 0 0" }}
                        animate={{
                            strokeDasharray:
                                ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                            rotate: [120, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                    </motion.circle>
                </motion.svg>
            </motion.div>
        </div>
    )
}