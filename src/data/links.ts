/**
 * F7.3 — matriz canônica de links externos/contato (§1.2 / §1.8).
 * Fonte única para validação estática (sem rede).
 */
import { contact } from "@/data/contact";
import { projects } from "@/data/projects";

export const CANONICAL_LINKS = {
  mailto: `mailto:${contact.email}`,
  email: contact.email,
  whatsapp: contact.whatsappUrl,
  linkedin: contact.linkedin,
  github: contact.github,
  instagram: contact.instagram,
  cv: contact.cvPath,
  projects: Object.fromEntries(projects.map((p) => [p.id, p.url])),
} as const;

/** Expectativas alinhadas ao CHECKLIST §1 — falha = regressão de conteúdo. */
export const LINK_EXPECTATIONS = {
  email: "joaoofficialpedro@gmail.com",
  whatsapp: "https://wa.me/5516993791185",
  linkedin: "https://www.linkedin.com/in/joaop06",
  github: "https://github.com/joaop06",
  instagram: "https://www.instagram.com/ojoaoborges_/",
  cv: "/cv/joao-pedro-borges.pdf",
  projects: {
    imobil: "https://imobil.app.br",
    "grupo-fenix": "https://grupofenix.vercel.app",
    "mep-decor": "https://mepdecor.vercel.app",
    "pe-quente": "https://pequentebarretos.vercel.app",
    "language-interpreter":
      "https://www.npmjs.com/package/language-interpreter",
  },
} as const;

export function assertCanonicalLinks(): string[] {
  const errors: string[] = [];
  if (contact.email !== LINK_EXPECTATIONS.email) {
    errors.push(`email: got ${contact.email}`);
  }
  if (contact.whatsappUrl !== LINK_EXPECTATIONS.whatsapp) {
    errors.push(`whatsapp: got ${contact.whatsappUrl}`);
  }
  if (contact.linkedin !== LINK_EXPECTATIONS.linkedin) {
    errors.push(`linkedin: got ${contact.linkedin}`);
  }
  if (contact.github !== LINK_EXPECTATIONS.github) {
    errors.push(`github: got ${contact.github}`);
  }
  if (contact.instagram !== LINK_EXPECTATIONS.instagram) {
    errors.push(`instagram: got ${contact.instagram}`);
  }
  if (contact.cvPath !== LINK_EXPECTATIONS.cv) {
    errors.push(`cv: got ${contact.cvPath}`);
  }
  for (const project of projects) {
    const expected = LINK_EXPECTATIONS.projects[project.id];
    if (project.url !== expected) {
      errors.push(`project ${project.id}: got ${project.url}`);
    }
  }
  return errors;
}
