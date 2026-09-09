#!/usr/bin/env node
/**
 * F7.3 — validação estática dos links canônicos (§1.2 / §1.8).
 * Não faz HTTP — só garante que o código bate com a matriz do checklist.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contactSrc = readFileSync(join(root, "src/data/contact.ts"), "utf8");
const projectsSrc = readFileSync(join(root, "src/data/projects.ts"), "utf8");

const expected = [
  ["email", "joaoofficialpedro@gmail.com", contactSrc],
  ["whatsapp", "https://wa.me/5516993791185", contactSrc],
  ["linkedin", "https://www.linkedin.com/in/joaop06", contactSrc],
  ["github", "https://github.com/joaop06", contactSrc],
  ["instagram", "https://www.instagram.com/ojoaoborges_/", contactSrc],
  ["cv", "/cv/joao-pedro-borges.pdf", contactSrc],
  ["imobil", "https://imobil.app.br", projectsSrc],
  ["grupo-fenix", "https://grupofenix.vercel.app", projectsSrc],
  ["mep-decor", "https://mepdecor.vercel.app", projectsSrc],
  ["pe-quente", "https://pequentebarretos.vercel.app", projectsSrc],
  [
    "language-interpreter",
    "https://www.npmjs.com/package/language-interpreter",
    projectsSrc,
  ],
];

const errors = [];
for (const [id, value, src] of expected) {
  if (!src.includes(value)) {
    errors.push(`${id}: missing ${value}`);
  }
}

if (errors.length) {
  console.error("F7.3 link validation FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  "F7.3 OK — mailto, WhatsApp, Instagram, LinkedIn, GitHub, CV e projetos alinhados ao §1.",
);
