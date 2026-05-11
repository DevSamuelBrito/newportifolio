//next
import Link from 'next/link';

//react-icons
import { IconType } from 'react-icons';

interface SocialMediaButtonProps {
    href: string;
    Icon: IconType;
    ariaLabel?: string;
}

export function SocialMediaButton({ href, Icon, ariaLabel }: SocialMediaButtonProps) {
    return (
        <Link
            href={href}
            target="_blank"
            aria-label={ariaLabel || "Open external link"}
            className="border-blue-500 border-2 rounded-full p-3 inline-flex items-center justify-center text-blue-500 font-bold
      hover:bg-blue-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
        >
            <Icon size={20} />
        </Link>
    )
}