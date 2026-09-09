import { useEffect, useState } from "react";

export type RenderTier = "low" | "mid" | "high";

export type RenderTierConfig = {
  tier: RenderTier;
  dpr: [number, number];
  antialias: boolean;
  multisampling: number;
  bloom: boolean;
  bloomIntensity: number;
  bloomThreshold: number;
  envResolution: number;
  enableEnvironment: boolean;
  sparkCount: number;
  tubeLinks: boolean;
  linkSegments: number;
  clearcoatNodes: boolean;
};

const HIGH: RenderTierConfig = {
  tier: "high",
  dpr: [1, 2],
  antialias: true,
  multisampling: 4,
  bloom: true,
  bloomIntensity: 0.38,
  bloomThreshold: 0.9,
  envResolution: 512,
  enableEnvironment: true,
  sparkCount: 40,
  tubeLinks: true,
  linkSegments: 64,
  clearcoatNodes: true,
};

const MID: RenderTierConfig = {
  tier: "mid",
  dpr: [1, 1.5],
  antialias: true,
  multisampling: 2,
  bloom: true,
  bloomIntensity: 0.32,
  bloomThreshold: 0.9,
  envResolution: 256,
  enableEnvironment: true,
  sparkCount: 24,
  tubeLinks: true,
  linkSegments: 32,
  clearcoatNodes: true,
};

const LOW: RenderTierConfig = {
  tier: "low",
  dpr: [1, 1.25],
  antialias: false,
  multisampling: 0,
  bloom: false,
  bloomIntensity: 0,
  bloomThreshold: 1,
  envResolution: 128,
  enableEnvironment: false,
  sparkCount: 12,
  tubeLinks: false,
  linkSegments: 16,
  clearcoatNodes: false,
};

function detectTier(): RenderTier {
  if (typeof window === "undefined") return "mid";

  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const saveData = Boolean(conn?.saveData);
  const slowNet =
    conn?.effectiveType === "slow-2g" ||
    conn?.effectiveType === "2g" ||
    conn?.effectiveType === "3g";

  if (saveData || slowNet || cores <= 4 || mem <= 2) return "low";
  if (coarse || cores <= 6 || mem <= 4) return "mid";
  return "high";
}

function configFor(tier: RenderTier): RenderTierConfig {
  if (tier === "high") return HIGH;
  if (tier === "low") return LOW;
  return MID;
}

/** Qualidade adaptativa do hero 3D (DPR, MSAA, bloom, env, links). */
export function useRenderTier(): RenderTierConfig {
  const [config, setConfig] = useState<RenderTierConfig>(() =>
    configFor(detectTier()),
  );

  useEffect(() => {
    const sync = () => setConfig(configFor(detectTier()));
    sync();
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", sync);
    const conn = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    conn?.addEventListener?.("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      conn?.removeEventListener?.("change", sync);
    };
  }, []);

  return config;
}
