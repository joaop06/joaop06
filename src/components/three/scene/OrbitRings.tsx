import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitThemeColors } from "../hooks/useThemeColors";

type RingDef = {
  radius: number;
  tube: number;
  rotation: [number, number, number];
  opacity: number;
  dashed?: boolean;
  radial: number;
  tubular: number;
};

const RINGS: RingDef[] = [
  {
    radius: 1.72,
    tube: 0.016,
    rotation: [Math.PI / 2.35, 0.22, 0],
    opacity: 0.58,
    radial: 14,
    tubular: 128,
  },
  {
    radius: 1.95,
    tube: 0.012,
    rotation: [Math.PI / 1.72, -0.32, 0.38],
    opacity: 0.42,
    dashed: true,
    radial: 12,
    tubular: 96,
  },
  {
    radius: 2.18,
    tube: 0.014,
    rotation: [1.1, 0.55, -0.2],
    opacity: 0.32,
    dashed: true,
    radial: 12,
    tubular: 96,
  },
];

/** Anéis orbitais com espessura real; 1 sólido + 2 tracejados. */
export function OrbitRings({ colors }: { colors: OrbitThemeColors }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += Math.min(dt, 0.05) * 0.04;
  });

  return (
    <group ref={group}>
      {RINGS.map((ring, i) =>
        ring.dashed ? (
          <DashedRing key={i} ring={ring} colors={colors} />
        ) : (
          <mesh key={i} rotation={ring.rotation}>
            <torusGeometry
              args={[ring.radius, ring.tube, ring.radial, ring.tubular]}
            />
            <meshStandardMaterial
              color={colors.accent}
              emissive={colors.accent}
              emissiveIntensity={colors.isDark ? 0.4 : 0.22}
              metalness={0.55}
              roughness={0.35}
              transparent
              opacity={ring.opacity}
              depthWrite={false}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

function DashedRing({
  ring,
  colors,
}: {
  ring: RingDef;
  colors: OrbitThemeColors;
}) {
  const arcs = useMemo(() => {
    const count = 18;
    const span = (Math.PI * 2) / count;
    const gap = span * 0.35;
    return Array.from({ length: count }, (_, i) => ({
      start: i * span,
      length: span - gap,
    }));
  }, []);

  return (
    <group rotation={ring.rotation}>
      {arcs.map((arc, i) => (
        <mesh key={i} rotation={[0, 0, arc.start + arc.length / 2]}>
          <torusGeometry
            args={[
              ring.radius,
              ring.tube,
              ring.radial,
              Math.max(6, Math.floor(ring.tubular / arcs.length)),
              arc.length,
            ]}
          />
          <meshStandardMaterial
            color={colors.accent}
            emissive={colors.accent}
            emissiveIntensity={colors.isDark ? 0.32 : 0.18}
            metalness={0.5}
            roughness={0.4}
            transparent
            opacity={ring.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
