//hooks
import { useTranslation } from "@/hooks/useTranslation";

interface ExperienceCardProps {
    role: string;
    company: string;
    period: string;
    activities: string[];
    technologies: string[];   
}

const ExperienceCard = ({ role, company, period, activities, technologies }: ExperienceCardProps) => {

    const { t } = useTranslation();

    return (
        <div className="w-full sm:w-8/12 bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-500 group relative:">

            {/* Cabeçalho */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">
                    {role}
                </h3>
                <p className="text-sm text-gray-400">
                    {company} • {period}
                </p>
            </div>

            {/* Atividades */}
            <ul className="text-gray-200 text-sm space-y-2 mb-4 list-disc list-inside">
                {activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
            </ul>

            {/* Tecnologias */}
            <div>
                <p className="text-sm font-semibold text-white mb-2">
                    {t.stack.title}
                </p>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-gray-700 text-gray-200 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ExperienceCard;