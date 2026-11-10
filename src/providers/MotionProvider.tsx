"use client";

import type { ReactNode } from "react";

import { MotionConfig } from "framer-motion";

/**
 * Respeita a preferência "reduzir animações" do sistema em todo o site:
 * as animações de movimento (subir, deslizar, escalar) são puladas e o conteúdo
 * aparece direto no lugar final.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
