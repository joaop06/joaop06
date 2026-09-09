/** Preferência de movimento reduzido (F3.10). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Hashes que não são âncoras de seção (easter eggs F3.16). */
export const SECRET_HASHES = new Set(["matrix", "coffee"]);
