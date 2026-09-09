/** Projetos canônicos (§1.8). */
export type ProjectId =
  | "imobil"
  | "grupo-fenix"
  | "mep-decor"
  | "pe-quente"
  | "language-interpreter";

export type Project = {
  id: ProjectId;
  url: string;
  thumb: string;
};

export const projects: Project[] = [
  {
    id: "imobil",
    url: "https://imobil.app.br",
    thumb: "/placeholders/project-thumb.svg",
  },
  {
    id: "grupo-fenix",
    url: "https://grupofenix.vercel.app",
    thumb: "/placeholders/project-thumb.svg",
  },
  {
    id: "mep-decor",
    url: "https://mepdecor.vercel.app",
    thumb: "/placeholders/project-thumb.svg",
  },
  {
    id: "pe-quente",
    url: "https://pequentebarretos.vercel.app",
    thumb: "/placeholders/project-thumb.svg",
  },
  {
    id: "language-interpreter",
    url: "https://www.npmjs.com/package/language-interpreter",
    thumb: "/placeholders/project-thumb.svg",
  },
];
