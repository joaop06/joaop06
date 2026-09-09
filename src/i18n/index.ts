import { en } from "./en";
import { pt } from "./pt";

export type Locale = "pt" | "en";

export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

export const dictionaries = { pt, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
