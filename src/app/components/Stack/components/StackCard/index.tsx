import { IconType } from "react-icons";

interface StackCardProps {
    situation: string;
    technologies: {
        icon: IconType;
        name: string;
    }[];
}

export function StackCard({ situation, technologies }: StackCardProps) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500">{situation}</h3>
            <span className="block w-24 h-1 bg-blue-500 mt-2 rounded-full"></span>
            <ul className="mt-6 text-white grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    technologies.map(({ icon: Icon, name }) => (
                        <li key={name} className="text-lg text-white pt-1 flex flex-col items-center hover:text-blue-500 transition-all duration-300">
                            <Icon  size={48} className="sm:size-16 md:size-16" />
                            <p>{name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}