import type { Locale } from "@/i18n";

export type SectionId =
  | "home"
  | "about"
  | "education"
  | "stack"
  | "experience"
  | "projects"
  | "contact";

export type SectionDef = {
  id: SectionId;
  /** Hash na landing (sem #) */
  hash: string;
  /** Path de deep-link sem locale (ex.: "sobre") */
  path: string;
};

/** Âncoras e rotas de seção por locale (§4.1 / §4.2). */
export const sectionsByLocale: Record<Locale, SectionDef[]> = {
  pt: [
    { id: "home", hash: "inicio", path: "inicio" },
    { id: "about", hash: "sobre", path: "sobre" },
    { id: "education", hash: "formacao", path: "formacao" },
    { id: "stack", hash: "stack", path: "stack" },
    { id: "experience", hash: "experiencia", path: "experiencia" },
    { id: "projects", hash: "projetos", path: "projetos" },
    { id: "contact", hash: "contato", path: "contato" },
  ],
  en: [
    { id: "home", hash: "home", path: "home" },
    { id: "about", hash: "about", path: "about" },
    { id: "education", hash: "education", path: "education" },
    { id: "stack", hash: "stack", path: "stack" },
    { id: "experience", hash: "experience", path: "experience" },
    { id: "projects", hash: "projects", path: "projects" },
    { id: "contact", hash: "contact", path: "contact" },
  ],
};

export function getSections(locale: Locale): SectionDef[] {
  return sectionsByLocale[locale];
}

export function sectionHref(locale: Locale, hash: string): string {
  return `/${locale}#${hash}`;
}
