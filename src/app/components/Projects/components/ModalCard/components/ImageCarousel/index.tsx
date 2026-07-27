"use client"

//react
import { useEffect, useRef, useState } from "react";

//next
import Image from "next/image";
import type { StaticImageData } from "next/image";

//framer-motion
import { AnimatePresence, motion } from "framer-motion";

//icons
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface ImageCarouselProps {
    images: StaticImageData[];
    alt: string;
    priority?: boolean;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction >= 0 ? 40 : -40,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction >= 0 ? -40 : 40,
        opacity: 0,
    }),
};

export function ImageCarousel({ images, alt, priority }: ImageCarouselProps) {
    const [[current, direction], setCurrent] = useState<[number, number]>([0, 0]);
    const touchStartX = useRef(0);

    useEffect(() => {
        setCurrent([0, 0]);
    }, [images]);

    const hasMultiple = images.length > 1;

    const goTo = (index: number, dir: number) => setCurrent([index, dir]);
    const goPrev = () => goTo(current === 0 ? images.length - 1 : current - 1, -1);
    const goNext = () => goTo(current === images.length - 1 ? 0 : current + 1, 1);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
            delta > 0 ? goPrev() : goNext();
        }
    };

    return (
        <div
            className="w-full h-[240px] sm:h-[280px] md:h-[420px] xl:h-[500px] relative flex-shrink-0 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[current]}
                        alt={`${alt} - ${current + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={priority}
                    />
                </motion.div>
            </AnimatePresence>

            {hasMultiple && (
                <>
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous image"
                        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 transition-colors duration-300 hover:bg-black/60"
                    >
                        <IoChevronBack size={22} />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next image"
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 transition-colors duration-300 hover:bg-black/60"
                    >
                        <IoChevronForward size={22} />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goTo(i, i > current ? 1 : -1)}
                                aria-label={`Go to image ${i + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-4 bg-blue-500" : "w-2 bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
