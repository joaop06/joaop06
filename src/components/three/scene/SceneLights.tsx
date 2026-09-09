import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import type { OrbitThemeColors } from "../hooks/useThemeColors";
import type { RenderTierConfig } from "../hooks/useRenderTier";

/** IBL + luzes + ContactShadows — resolução/env por tier. */
export function SceneLights({
  colors,
  tier,
}: {
  colors: OrbitThemeColors;
  tier: RenderTierConfig;
}) {
  return (
    <>
      <ambientLight intensity={colors.isDark ? 0.18 : 0.22} />
      <directionalLight
        position={[4.2, 5.5, 3.2]}
        intensity={colors.isDark ? 0.95 : 1.15}
        color={colors.isDark ? "#c8e8ee" : colors.accentSoft}
      />
      <directionalLight
        position={[-3.5, -1.5, -4]}
        intensity={0.28}
        color={colors.accent}
      />
      <pointLight
        position={[0, 0.15, 2.1]}
        intensity={colors.isDark ? 0.85 : 0.55}
        color={colors.accent}
        distance={7}
        decay={2}
      />

      {tier.enableEnvironment ? (
        <Environment
          frames={1}
          resolution={tier.envResolution}
          background={false}
        >
          <Lightformer
            form="rect"
            intensity={colors.isDark ? 2.2 : 1.6}
            color={colors.accent}
            scale={[6, 2, 1]}
            position={[0, 3.5, 2]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="ring"
            intensity={colors.isDark ? 1.4 : 1.1}
            color={colors.isDark ? "#9fd4de" : colors.accentSoft}
            scale={4}
            position={[0, -1.5, -2]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={0.7}
            color={colors.bg}
            scale={[8, 4, 1]}
            position={[-4, 1, 3]}
            target={[0, 0, 0]}
          />
          {/* Rim lights for metallic node edges */}
          <Lightformer
            form="rect"
            intensity={colors.isDark ? 1.8 : 1.2}
            color="#e8f6f8"
            scale={[1.2, 4, 1]}
            position={[3.5, 0.5, -1.5]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={0.9}
            color={colors.accent}
            scale={[0.8, 3, 1]}
            position={[-2.8, 1.2, 2]}
            target={[0, 0, 0]}
          />
        </Environment>
      ) : null}

      <ContactShadows
        frames={1}
        position={[0, -1.35, 0]}
        opacity={colors.isDark ? 0.38 : 0.3}
        scale={8}
        blur={tier.tier === "high" ? 1.9 : 2.2}
        far={3.5}
        color={colors.isDark ? "#020405" : "#1a2a30"}
      />
    </>
  );
}
