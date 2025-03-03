import type { Metadata } from "next";
import { LanguageProvider } from "./providers/LanguageContext";
import "./globals.css";
import { useLanguage } from "./providers/LanguageContext";

export const metadata: Metadata = {
  title: "Samuel - Portfólio",
  description: "Portfólio de Samuel, desenvolvedor full-stack, com foco em Next.js, Next.js, TypeScript, Tailwind CSS, MongoDB, Node.js, Prisma, Postgresql",
  keywords: ["Samuel", "desenvolvedor", "portfólio", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Prisma", "Postgresql", "front-end", "back-end", "full-stack"],
  openGraph: {
    title: "Portfólio de Samuel",
    description: "Portfólio de Samuel, desenvolvedor full-stack, para você me conhecer e também os projetos desenvolvidos",
    images: [`${process.env.NEXT_PUBLIC_URL}/profile-image.jpg`],
    url: "https://www.seusite.com"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { language } = useLanguage();
  return (

    <html lang={language}>
      <meta name="description" content={metadata.description ?? ""} />
      <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : metadata.keywords ?? ""} />
      <meta property="og:title" content={metadata.openGraph?.title } />
      <meta property="og:description" content={metadata.openGraph?.description } />
      <meta property="og:image" content={metadata.openGraph?.images[0]} />
      <meta property="og:url" content={metadata.openGraph?.url?.toString() ?? ""} />
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
