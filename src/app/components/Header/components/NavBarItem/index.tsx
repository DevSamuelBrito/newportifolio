import Link from "next/link"

interface NavbarItemProps {
    href: string;
    id: string;
    label: string;
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export function NavBarItem({ href, id, label, activeSection, setActiveSection }: NavbarItemProps) {
    return (
        <li>
            <Link
                href={href}
                className={`block py-2 px-4 text-base 2xl:text-lg text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === id ? "text-blue-700 " : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    element?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(id);
                }}
            >
                {label}
            </Link>
        </li>
    )
}

{/* <li>
    <Link
        href="#about"
        className={`block py-2 px-4 text-white rounded-lg font-bold hover:text-blue-500  transition-all duration-200 lg:p-0 ${activeSection === "about" ? "text-blue-700 " : ""}`}
        onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById("about");
        element?.scrollIntoView({ behavior: "smooth" });
        setActiveSection("about");
        }}
        >
        {translation[language].about}
    </Link>
</li> */}


export function HeroItem() {
    return (
        <Link
            href="#hero"
            className="flex items-center"
            onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("hero");
                element?.scrollIntoView({ behavior: "smooth" });
            }}
        >
            <span className="self-center text-xl 2xl:text-2xl text-white font-semibold whitespace-nowrap">
                Samuel Brito
            </span>
        </Link>
    )
}