/** Stubs SEO — preenchidos na Fase 6. */
export const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? "https://joaoborges-dev.vercel.app";

export function absoluteUrl(path = "/"): string {
  const base = siteUrl.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
