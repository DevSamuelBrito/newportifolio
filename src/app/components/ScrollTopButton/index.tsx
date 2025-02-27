"use client"
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);


        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 w-12 h-12 flex items-center justify-center"
            >
                <span className="text-2xl">↑</span>
            </button>

        )
    );
};

export default ScrollToTopButton;
