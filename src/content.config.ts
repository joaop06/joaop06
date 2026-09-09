import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * F6.16 — coleção blog vazia (base SEO futura).
 * Posts reais ficam para P7; rota stub não entra na nav.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog };
