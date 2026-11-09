"use client";

//package.json
import packageJson from "../../../../package.json";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-neutral-800/70 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-8 text-center text-sm text-neutral-500 sm:flex-row sm:text-left lg:px-12">
        <p>
          © {new Date().getFullYear()} Samuel Brito. {t.contact.rights}
        </p>
        <p>
          {t.contact.developer} · v{packageJson.version}
        </p>
      </div>
    </footer>
  );
}
