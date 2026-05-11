
const DefaultSection = ({ section, paddingTop, children }: { section: string; paddingTop?: string; children: React.ReactNode }) => {
    return (

        <div className="overflow-hidden">
            <section
                id={section}
                className={`bg-gray-900 min-h-screen flex items-center pt-${paddingTop || '14'}`}
            >
                {children}
            </section>
        </div>
    );
}

export default DefaultSection;