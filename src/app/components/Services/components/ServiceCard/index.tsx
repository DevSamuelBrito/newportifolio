
import { IconType } from "react-icons"
import { TbApi } from "react-icons/tb";
import { FaDatabase, FaExchangeAlt } from "react-icons/fa";

interface ServiceCardProps {
    icon: IconType;
    title: string;
    description: string;
}

interface ServiceCardBackProps {

    title: string;
    description: string;
}
export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
    return (
        <div className="bg-gray-800 h-full flex-grow p-6 rounded-lg shadow-lg flex flex-col items-center ">
            <div className="h-24 w-32 flex items-center justify-center  ">
                <Icon size={60} className="text-blue-500 mt-2" />

            </div>
            <ul className="mt-2">
                <li className="flex flex-col items-center text-white">
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-semibold text-white text-center">{title}</p>
                        <span className="block w-24 h-1 bg-blue-500 mt-2 rounded-full"></span>
                    </div>
                    <p className="text-center px-4 mt-5 text-base 2xl:text-lg">
                        {description}
                    </p>
                </li>
            </ul>
        </div>
    )
}

export function ServiceCardBack({ title, description }: ServiceCardBackProps) {
    return (
        <div className="bg-gray-800 h-full flex-grow p-6 rounded-lg shadow-lg flex flex-col items-center ">
            <div className="flex gap-4 w-32 h-24 items-center justify-center">
                <TbApi size={50} className="text-blue-500" />
                <FaExchangeAlt size={30} className="text-blue-500" />
                <FaDatabase size={40} className="text-blue-500" />
            </div>

            <ul className="mt-2">
                <li className="flex flex-col items-center text-white">
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-semibold text-white text-center">{title}</p>
                        <span className="block w-24 h-1 bg-blue-500 mt-2 rounded-full"></span>
                    </div>
                    <p className="text-center px-4 mt-5 text-base 2xl:text-lg">
                        {description}
                    </p>
                </li>
            </ul>
        </div>
    )
}