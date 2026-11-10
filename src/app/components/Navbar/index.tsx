"use client";

//react
import { useEffect, useState } from "react";

//icons
import { Menu, X, ArrowUpRight } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

//animation
import { AnimatePresence, motion } from "framer-motion";

//components
import { LanguageSwitch } from "./components/LanguageSwitch";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//data
import { SOCIAL_LINKS } from "@/data/links";

import { SECTION_ORDER, type SectionId } from "@/data/sections";

//lib
import { getActiveSheetId, scrollToSection } from "@/lib/sheets";

export const Navbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const [scrolled, setScrolled] = useState(false);

  const links: { id: SectionId; label: string }[] = SECTION_ORDER.filter((id) => id !== "contact").map(
    (id) => ({ id, label: t.navbar[id] })
  );

  // Destaca o link da seção atual. Com as seções empilhadas (sticky), o que vale é a
  // posição natural de cada folha, não onde ela aparece na tela (veja lib/sheets.ts).
  useEffect(() => {
    const update = () => {
      const id = getActiveSheetId();
      if (id) setActiveSection(id as SectionId);
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Reforça o fundo da navbar depois que a página começa a rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 pt-4"
    >
      {/* Mesmo container das seções (max-w-7xl + padding), para alinhar com o conteúdo */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <nav
        aria-label="Principal"
        className={`rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 ${
          isOpen ? "bg-neutral-950/90" : scrolled ? "bg-neutral-950/25" : "bg-neutral-950/10"
        }`}
      >

        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("home");
            }}
            className="flex items-center gap-2 text-lg font-bold text-white"
            aria-label="Samuel Brito"
          >
            <span className="font-mono text-blue-500">&gt;_</span>
            <span>
              SB<span className="text-blue-500">.</span>
            </span>
          </a>

          {/* Links (desktop) */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(id);
                  }}
                  aria-current={activeSection === id ? "true" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === id ? "text-white" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Ações (desktop) */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch />

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-neutral-400 transition-colors hover:text-white"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-neutral-400 transition-colors hover:text-white"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("contact");
              }}
              className="btn-primary !px-5 !py-2 text-sm"
            >
              {t.navbar.cta}
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Botão do menu (mobile) */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? t.navbar.closeMenu : t.navbar.openMenu}
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-neutral-300 transition-colors hover:text-white lg:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu (mobile) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // Sem animar "height: auto": para medi-la, o framer-motion chama window.scrollTo(0, 0),
              // o que cancelaria a rolagem suave iniciada ao clicar num link do menu.
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 border-t border-neutral-800 px-4 py-3">
                {[...links, { id: "contact" as SectionId, label: t.navbar.contact }].map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(id);
                      }}
                      className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                        activeSection === id ? "bg-blue-500/10 text-blue-400" : "text-neutral-300 hover:text-white"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-neutral-800 px-4 py-3">
                <LanguageSwitch />
                <div className="flex items-center gap-1">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 text-neutral-400 hover:text-white"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 text-neutral-400 hover:text-white"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </div>
    </motion.header>
  );
};
