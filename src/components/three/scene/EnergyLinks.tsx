import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { useActiveOrbitId } from "../interaction/useOrbitSelection";
import type { OrbitThemeColors } from "../hooks/useThemeColors";
import type { RenderTierConfig } from "../hooks/useRenderTier";
import { NODES } from "./orbitConfig";

/**
 * Conexões energéticas core → nó com Line2 (espessura em px).
 * Atualização imperativa — sem setState por frame.
 */
export function EnergyLinks({
  positions,
  colors,
  tier,
}: {
  positions: MutableRefObject<THREE.Vector3>[];
  colors: OrbitThemeColors;
  tier: RenderTierConfig;
}) {
  const activeId = useActiveOrbitId();
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const { size } = useThree();
  const segments = tier.linkSegments;
  const mid = useMemo(() => new THREE.Vector3(), []);
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(), []);

  const lines = useMemo(() => {
    return positions.map((_, i) => {
      const geometry = new LineGeometry();
      const positionsArr = new Float32Array((segments + 1) * 3);
      geometry.setPositions(positionsArr);

      const material = new LineMaterial({
        color: new THREE.Color(colors.accent).getHex(),
        linewidth: tier.tubeLinks ? 2.2 : 1.2,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        toneMapped: false,
        dashed: false,
      });
      material.resolution.set(size.width, size.height);

      const line = new Line2(geometry, material);
      line.computeLineDistances();
      line.name = `EnergyLink_${NODES[i].id}`;
      return line;
    });
  }, [positions, colors.accent, segments, tier.tubeLinks, size.width, size.height]);

  useEffect(() => {
    return () => {
      for (const line of lines) {
        line.geometry.dispose();
        line.material.dispose();
      }
    };
  }, [lines]);

  useEffect(() => {
    for (const line of lines) {
      line.material.resolution.set(size.width, size.height);
    }
  }, [lines, size.width, size.height]);

  const frame = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const current = activeIdRef.current;
    frame.current += 1;
    const stride = tier.tier === "high" ? 1 : tier.tier === "mid" ? 2 : 3;
    if (frame.current % stride !== 0) {
      // still pulse opacity/width cheaply
      positions.forEach((_, i) => {
        const line = lines[i];
        if (!line) return;
        const isActive = current === NODES[i].id;
        line.material.opacity = isActive
          ? 0.9
          : 0.4 + 0.08 * Math.sin(t * 2.5 + i);
      });
      return;
    }

    const posBuf = new Float32Array((segments + 1) * 3);

    positions.forEach((posRef, i) => {
      const line = lines[i];
      if (!line) return;
      const end = posRef.current;
      mid.copy(end).multiplyScalar(0.5);
      mid.y += 0.35;
      curve.v0.set(0, 0, 0);
      curve.v1.copy(mid);
      curve.v2.copy(end);

      for (let s = 0; s <= segments; s++) {
        curve.getPoint(s / segments, scratch);
        posBuf[s * 3] = scratch.x;
        posBuf[s * 3 + 1] = scratch.y;
        posBuf[s * 3 + 2] = scratch.z;
      }
      line.geometry.setPositions(posBuf);
      line.computeLineDistances();

      const isActive = current === NODES[i].id;
      const base = tier.tubeLinks ? 2.2 : 1.25;
      const activeW = tier.tubeLinks ? 3.4 : 2.2;
      line.material.linewidth = isActive ? activeW : base;
      line.material.color.set(colors.accent);
      line.material.opacity = isActive
        ? 0.92
        : 0.4 + 0.08 * Math.sin(t * 2.5 + i);
    });
  });

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={NODES[i].id} object={line} />
      ))}
    </group>
  );
}
