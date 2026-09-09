import { useEffect, useState } from "react";
import { readThemeColors, type ThemeColors } from "@/lib/theme-colors";

export type OrbitThemeColors = ThemeColors & {
  /** Albedo estável do núcleo (não usa accent-soft escuro no dark). */
  coreAlbedo: string;
  coreAttenuation: string;
  isDark: boolean;
};

function deriveOrbitColors(base: ThemeColors): OrbitThemeColors {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "dark";

  return {
    ...base,
    isDark,
    // Light: vidro claro; dark: vidro teal translúcido (não accent-soft #143038)
    coreAlbedo: isDark ? "#8ec9d4" : base.accentSoft,
    coreAttenuation: base.accent,
  };
}

/** Cores do tema + derivados para a órbita (F4.3). */
export function useThemeColors(): OrbitThemeColors {
  const [colors, setColors] = useState<OrbitThemeColors>(() =>
    deriveOrbitColors(readThemeColors()),
  );

  useEffect(() => {
    const sync = () => setColors(deriveOrbitColors(readThemeColors()));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-egg-konami"],
    });
    return () => mo.disconnect();
  }, []);

  return colors;
}
