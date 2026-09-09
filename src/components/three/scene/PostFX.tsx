import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import type { RenderTierConfig } from "../hooks/useRenderTier";

/** Bloom + ACES — MSAA e intensidade por tier; desliga no low. */
export function PostFX({ tier }: { tier: RenderTierConfig }) {
  if (!tier.bloom) return null;

  return (
    <EffectComposer
      multisampling={tier.multisampling}
      enableNormalPass={false}
    >
      <Bloom
        intensity={tier.bloomIntensity}
        luminanceThreshold={tier.bloomThreshold}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
