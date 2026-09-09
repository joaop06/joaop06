/** Cores do tema a partir dos tokens CSS (§3 / F4.3). */
export type ThemeColors = {
  accent: string;
  accentSoft: string;
  fg: string;
  bg: string;
  glow: string;
};

const FALLBACK: ThemeColors = {
  accent: "#0f4c5c",
  accentSoft: "#e6f0f2",
  fg: "#0a0a0a",
  bg: "#f7f7f5",
  glow: "rgba(15, 76, 92, 0.12)",
};

export function readThemeColors(): ThemeColors {
  if (typeof document === "undefined") return FALLBACK;
  const s = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  return {
    accent: pick("--accent", FALLBACK.accent),
    accentSoft: pick("--accent-soft", FALLBACK.accentSoft),
    fg: pick("--fg", FALLBACK.fg),
    bg: pick("--bg", FALLBACK.bg),
    glow: pick("--glow", FALLBACK.glow),
  };
}
