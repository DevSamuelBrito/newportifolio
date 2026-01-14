//hooks
import { useTranslation } from "@/hooks/useTranslation";

//components
import CertificationsCard from "./components/CertificationsCard";

export function Certifications() {

    const { t } = useTranslation();

    return (
        <section id="certifications" className="bg-gray-900 min-h-screen pt-14">
            <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit" >
                <div className="text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {t.certifications.graduationTitle}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </div>

                <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {t.certifications.graduation.map((certification, index) => (
                        <div
                            key={index}
                            className={
                                t.certifications.graduation.length === 1
                                    ? "lg:col-start-2"
                                    : ""
                            }
                        >
                            <CertificationsCard
                                index={index}
                                name={certification.name}
                                issuer={certification.institution}
                                description={certification.description}
                                date={certification.date}
                                link={certification.link}
                            />
                        </div>
                    ))}
                </div>


                <div className="text-center">
                    <p className="text-3xl font-bold text-white relative inline-block">
                        {t.certifications.title}
                        <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
                    </p>
                </div>

                <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        t.certifications.data.map((certification, index) => (
                            <CertificationsCard
                                key={index}
                                index={index}
                                name={certification.name}
                                issuer={certification.issuer}
                                description={certification.description}
                                date={certification.date}
                                link={certification.link}
                            />
                        ))
                    }
                </div>

            </div>
        </section>

    );
}

