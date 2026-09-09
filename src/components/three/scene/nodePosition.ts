import * as THREE from "three";
import type { OrbitNodeDef } from "./orbitConfig";

const TILT_AXIS = new THREE.Vector3(0, 0, 1);

/** Posição orbital com excentricidade e tilt (frame-independent via t). */
export function nodePosition(
  def: OrbitNodeDef,
  t: number,
  out: THREE.Vector3,
) {
  const a = t * def.speed + def.phase;
  const rx = def.radius * (1 + def.eccentricity * Math.cos(a));
  const rz = def.radius * (1 - Math.abs(def.tilt) * 0.35);
  out.set(
    Math.cos(a) * rx,
    def.y + Math.sin(a * 0.85) * 0.14,
    Math.sin(a) * rz,
  );
  out.applyAxisAngle(TILT_AXIS, def.tilt * 0.45);
}
