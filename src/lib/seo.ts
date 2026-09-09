import { contact } from "@/data/contact";
import { projects } from "@/data/projects";
import { stackCategories } from "@/data/stack";
import type { Dictionary, Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

/** URL canônica do site (Vercel / PUBLIC_SITE_URL). */
export const siteUrl = (
  import.meta.env.PUBLIC_SITE_URL ?? "https://joaoborges-dev.vercel.app"
).replace(/\/$/, "");

export const personName = "João Pedro Borges Araújo";
export const brandName = "João Pedro Borges Araújo";
/** Alias SEO curto (não é a marca principal da UI). */
export const brandNameShort = "João Pedro Borges";
export const jobTitle = "Software Engineer";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}

export function localeHomeUrl(locale: Locale): string {
  return absoluteUrl(`/${locale}`);
}

export function ogImageUrl(): string {
  return absoluteUrl("/og-default.png");
}

/** Stack labels canônicos para knowsAbout / mirror. */
export function knowsAboutLabels(locale: Locale = "pt"): string[] {
  const dict = getDictionary(locale);
  return stackCategories.flatMap((category) =>
    category.items.map((item) => {
      const key = item.labelKey as keyof typeof dict.stack.items;
      return dict.stack.items[key];
    }),
  );
}

export type FaqItem = { question: string; answer: string };

export function buildFaqItems(dict: Dictionary): FaqItem[] {
  return [
    {
      question: dict.faq.stack.question,
      answer: dict.faq.stack.answer,
    },
    {
      question: dict.faq.availability.question,
      answer: dict.faq.availability.answer,
    },
    {
      question: dict.faq.experience.question,
      answer: dict.faq.experience.answer,
    },
  ];
}

export function buildPersonJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@type": "Person",
    "@id": `${localeHomeUrl(locale)}#person`,
    name: personName,
    alternateName: brandNameShort,
    jobTitle,
    description: dict.meta.description,
    email: contact.email,
    url: localeHomeUrl(locale),
    image: absoluteUrl("/avatar.svg"),
    sameAs: [contact.linkedin, contact.github, contact.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Franca",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    knowsAbout: knowsAboutLabels(locale),
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@type": "WebSite",
    "@id": `${localeHomeUrl(locale)}#website`,
    name: brandName,
    alternateName: brandNameShort,
    url: localeHomeUrl(locale),
    description: dict.meta.description,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    publisher: { "@id": `${localeHomeUrl(locale)}#person` },
  };
}

export function buildProjectsJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const items = projects.map((project, index) => {
    const copy = dict.projects.items[project.id];
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: copy.name,
        description: copy.description,
        url: project.url,
        author: { "@id": `${localeHomeUrl(locale)}#person` },
      },
    };
  });

  return {
    "@type": "ItemList",
    "@id": `${localeHomeUrl(locale)}#projects`,
    name: dict.projects.title,
    numberOfItems: items.length,
    itemListElement: items,
  };
}

export function buildFaqJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const faqs = buildFaqItems(dict);
  return {
    "@type": "FAQPage",
    "@id": `${localeHomeUrl(locale)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildJsonLdGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonJsonLd(locale),
      buildWebSiteJsonLd(locale),
      buildProjectsJsonLd(locale),
      buildFaqJsonLd(locale),
    ],
  };
}
