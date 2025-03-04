import type { Metadata } from "next";
import { LanguageProvider } from "./providers/LanguageContext";
import "./globals.css";

const imageUrl = `${process.env.NEXT_PUBLIC_URL}/portifolio.png`;

export const metadata: Metadata = {
  title: "Samuel | Desenvolvedor Full-Stack",
  icons:"",
  description: "Portfólio de Samuel, desenvolvedor full-stack, com foco em Next.js, TypeScript, Tailwind CSS, MongoDB, Node.js, Prisma e PostgreSQL.",
  keywords: [
    "Samuel", "desenvolvedor", "portfólio", "Next.js", "TypeScript",
    "Tailwind CSS", "Node.js", "MongoDB", "Prisma", "PostgreSQL",
    "front-end", "back-end", "full-stack", "programador", "desenvolvimento web"
  ],
  openGraph: {
    title: "Samuel | Desenvolvedor Full-Stack",
    description: "Portfólio de Samuel, desenvolvedor full-stack. Conheça meus projetos e minha trajetória na área de tecnologia.",
    type: "website",
    images: [{ url: imageUrl, width: 1200, height: 600, alt: "Samuel | Desenvolvedor Full-Stack" }],
    url: "https://www.seusite.com"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

