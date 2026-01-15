//next
import type { Metadata } from "next";

//context providers
import { LanguageProvider } from "../providers/LanguageContext";

//css
import "./globals.css";

const imageUrl = "https://www.devsamuelbrito.com.br/portifolio.png";

export const metadata: Metadata = {
  title: "Portifolio | Samuel Brito",
  description: "Portfólio de Samuel, desenvolvedor full-stack, com foco em Next.js, TypeScript, Tailwind CSS, Node.js, Prisma e PostgreSQL.",
  keywords: [
    "Samuel", "Samuel Fava de Brito", "DevSamuelBrito", "Dev Samuel Fava de Brito", "desenvolvedor", "portfólio", "Next.js", "TypeScript", "React", "JavaScript", "Tailwind CSS", "Node.js", "Prisma", "PostgreSQL",
    "front-end", "back-end", "full-stack", "programador", "desenvolvimento web", "developer", "portfolio", "web developer", "software engineer", "coding",
    "React developer", "JavaScript developer", "TypeScript expert", "frontend engineer",
    "backend engineer", "full-stack developer", "web programming", "software development",
    "hire developer", "remote developer", "Brazilian developer", "tech professional",
    "code portfolio", "web solutions", "modern web apps", "React applications",
    "responsive websites", "web services", "API specialist", "UI developer"
  ],

  openGraph: {
    title: "Samuel | Desenvolvedor Full-Stack",
    description: "Portfólio de Samuel, desenvolvedor full-stack. Conheça meus projetos e minha trajetória na área de tecnologia.",
    type: "website",
    images: [{ url: imageUrl, width: 1200, height: 600, alt: "Samuel | Desenvolvedor Full-Stack" }],
    url: "https://www.devsamuelbrito.com.br/"
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
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

