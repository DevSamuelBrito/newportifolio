import type { Metadata } from "next";
import { LanguageProvider } from "./providers/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portifolio Samuel Brito",
  description: "Portifolio Samuel Brito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
