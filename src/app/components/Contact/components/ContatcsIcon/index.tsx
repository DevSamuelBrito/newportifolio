import { IconType } from "react-icons";
import Link from "next/link";

interface ContactIconProps {
    Icon: IconType;
    href: string;
    title: string;
}

export function ContactIcon({ Icon, href, title }: ContactIconProps) {
    return (

        <div className="text-center hover:font-bold hover:scale-110 transition-all duration-300  ">
            <Link
                href={href}
                target="_blank"
                className="border-blue-500 border-2 rounded-full p-3 inline-flex items-center justify-center text-blue-500 font-bold
            hover:bg-blue-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
            >
                <Icon size={36} />
            </Link>
            <p className="text-white mt-2 ">{title}</p>
        </div>
    )
}