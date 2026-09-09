import { defineConfig } from "astro/config";
import react from "@astrojs/react";
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
  integrations: [react()],
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
