//next
import type { Metadata, Viewport } from "next";

import { cookies } from "next/headers";

import { Geist, Geist_Mono } from "next/font/google";

//analytics
import { Analytics } from "@vercel/analytics/next";

//context providers
import { LanguageProvider } from "../providers/LanguageContext";

import { MotionProvider } from "../providers/MotionProvider";

import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, isLanguage } from "@/lib/language";

//css
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl = "https://www.devsamuelbrito.com.br";

const imageUrl = `${siteUrl}/portifolio.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Samuel Brito | Desenvolvedor Full Stack",
  description:
    "Portfólio de Samuel Brito, desenvolvedor full stack com foco em React, Next.js, TypeScript, ASP.NET Core e PostgreSQL.",
  keywords: [
    "Samuel Brito",
    "Samuel Fava de Brito",
    "DevSamuelBrito",
    "desenvolvedor full stack",
    "portfólio",
    "Next.js",
    "React",
    "TypeScript",
    "ASP.NET Core",
    "NestJS",
    "C#",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
  ],
  authors: [{ name: "Samuel Brito", url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Samuel Brito | Desenvolvedor Full Stack",
    description:
      "Conheça os projetos e a trajetória de Samuel Brito, desenvolvedor full stack.",
    type: "website",
    url: siteUrl,
    images: [{ url: imageUrl, width: 1200, height: 600, alt: "Samuel Brito | Desenvolvedor Full Stack" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // O idioma vem do cookie no servidor: a página já renderiza no idioma certo
  // e o atributo lang do <html> fica correto para SEO e acessibilidade.
  const cookieStore = await cookies();
  const saved = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const language = isLanguage(saved) ? saved : DEFAULT_LANGUAGE;

  return (
    <html
      lang={language === "en" ? "en" : "pt-BR"}
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider initialLanguage={language}>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
