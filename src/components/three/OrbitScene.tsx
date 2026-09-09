/**
 * Cena Órbita de Integrações — composição raiz.
 * Ownership: R3F/Three apenas — não animar o wrapper DOM com Motion/GSAP.
 * GLB budget: core ≤180KB, nodes ≤280KB (meshopt).
 */
import { createContext, useMemo } from "react";
import * as THREE from "three";
import { useOrbitClock, type OrbitClock } from "./hooks/useOrbitClock";
import type { RenderTierConfig } from "./hooks/useRenderTier";
import { useThemeColors } from "./hooks/useThemeColors";
import { Core } from "./scene/Core";
import { EnergyLinks } from "./scene/EnergyLinks";
import { NODES } from "./scene/orbitConfig";
import { OrbitNode } from "./scene/OrbitNode";
import { OrbitRings } from "./scene/OrbitRings";
import { PointerRig } from "./scene/PointerRig";
import { PostFX } from "./scene/PostFX";
import { SceneLights } from "./scene/SceneLights";

export const OrbitClockContext = createContext<OrbitClock | null>(null);
export const RenderTierContext = createContext<RenderTierConfig | null>(null);

export function OrbitScene({ tier }: { tier: RenderTierConfig }) {
  const colors = useThemeColors();
  const clock = useOrbitClock();
  const positionRefs = useMemo(
    () => NODES.map(() => ({ current: new THREE.Vector3() })),
    [],
  );

  return (
    <RenderTierContext.Provider value={tier}>
      <OrbitClockContext.Provider value={clock}>
        <SceneLights colors={colors} tier={tier} />
        <PointerRig>
          <group scale={0.95}>
            <Core colors={colors} sparkCount={tier.sparkCount} tier={tier} />
            <OrbitRings colors={colors} />
            <EnergyLinks
              positions={positionRefs}
              colors={colors}
              tier={tier}
            />
            {NODES.map((def, i) => (
              <OrbitNode
                key={def.id}
                def={def}
                colors={colors}
                positionRef={positionRefs[i]}
                tier={tier}
              />
            ))}
          </group>
        </PointerRig>
        <PostFX tier={tier} />
      </OrbitClockContext.Provider>
    </RenderTierContext.Provider>
  );
}
