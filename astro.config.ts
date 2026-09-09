import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "1";

// https://astro.build/config
export default defineConfig({
  site: "https://joaoborges-dev.vercel.app",
  trailingSlash: "never",
  // F5.11 — prefetch de rotas de idioma / seções
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    react(),
    // F6.4 — sitemap com locales + alternates
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: {
          pt: "pt-BR",
          en: "en",
        },
      },
      filter: (page) => {
        const path = new URL(page).pathname;
        // Landings canônicas; exclui redirects de hash, CV e stub de blog
        if (path === "/pt" || path === "/en") return true;
        if (path === "/" || path.endsWith("/blog") || path.endsWith("/cv")) {
          return false;
        }
        // Deep-links de seção (HashRedirect) → fora do sitemap
        return false;
      },
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      // F5.10 — bundle visualizer (ANALYZE=1 npm run analyze)
      analyze
        ? visualizer({
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
            open: false,
          })
        : undefined,
    ].filter(Boolean),
  },
});
