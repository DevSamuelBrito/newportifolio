
//animation
import { motion } from "framer-motion";

//hooks
import { useTranslation } from "@/hooks/useTranslation";


interface CertificationsCardProps {
    index: number;
    name: string;
    issuer: string;
    date: string;
    description: string;
    link: string;
}

const CertificationsCard = ({ index, name, issuer, date, description, link }: CertificationsCardProps) => {

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, x: index * 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full h-full"
        >
            <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-lg h-full flex flex-col hover:scale-105 transition-all duration-300 hover:border-blue-500 group">

                <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-white">
                        {name}
                    </h3>

                    <div className="flex flex-row w-full mt-2 items-center gap-2">
                        <span
                            key={issuer}
                            className="px-3 py-1 text-xs bg-gray-700 text-gray-200 rounded-full"
                        >
                            {issuer}
                        </span>
                        <p className="text-sm text-gray-400 ">
                            • {date}
                        </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-4 flex-grow line-clamp-4">
                        {description}
                    </p>
                    <button onClick={() => window.open(link, "_blank")}
                        className="border-blue-500 border-2 rounded-full px-2 py-2 text-base inline-flex items-center justify-center text-blue-500 font-bold hover:bg-blue-500 hover:text-gray-900 transition-all duration-300 hover:scale-105 mt-4 w-full"
                    >
                        {t.certifications.button}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default CertificationsCard;