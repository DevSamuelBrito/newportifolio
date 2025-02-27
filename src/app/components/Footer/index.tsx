interface FooterProps {
    rights: string;
    developer: string;
}

export function Footer({ rights, developer }: FooterProps) {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="w-full border-t border-gray-500"></div>
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <p className="text-gray-400 mb-4 mt-1">{rights}</p>
                <p className="text-gray-400">{developer}</p>
            </div>
        </footer>
    );
}
