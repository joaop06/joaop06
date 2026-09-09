/** Definições compartilhadas da órbita de integrações. */
import type { OrbitNodeId } from "../interaction/useOrbitSelection";

export type OrbitNodeDef = {
  id: OrbitNodeId;
  radius: number;
  speed: number;
  phase: number;
  tilt: number;
  y: number;
  size: number;
  eccentricity: number;
  shape: "box" | "sphere" | "octa" | "cylinder" | "prism";
  /** mesh name inside nodes.glb */
  glbName: string;
  metalness: number;
  roughness: number;
  emissiveIntensity: number;
};

export const NODES: OrbitNodeDef[] = [
  {
    id: "api",
    radius: 1.55,
    speed: 0.22,
    phase: 0,
    tilt: 0.18,
    y: 0.15,
    size: 0.14,
    eccentricity: 0.08,
    shape: "octa",
    glbName: "Node_api",
    metalness: 0.55,
    roughness: 0.28,
    emissiveIntensity: 0.35,
  },
  {
    id: "db",
    radius: 1.88,
    speed: 0.15,
    phase: 1.15,
    tilt: -0.22,
    y: -0.12,
    size: 0.13,
    eccentricity: 0.12,
    shape: "cylinder",
    glbName: "Node_db",
    metalness: 0.2,
    roughness: 0.45,
    emissiveIntensity: 0.22,
  },
  {
    id: "queue",
    radius: 1.68,
    speed: 0.28,
    phase: 2.35,
    tilt: 0.38,
    y: 0.28,
    size: 0.11,
    eccentricity: 0.06,
    shape: "box",
    glbName: "Node_queue",
    metalness: 0.7,
    roughness: 0.2,
    emissiveIntensity: 0.4,
  },
  {
    id: "commerce",
    radius: 2.08,
    speed: 0.13,
    phase: 3.55,
    tilt: -0.12,
    y: -0.22,
    size: 0.135,
    eccentricity: 0.15,
    shape: "prism",
    glbName: "Node_commerce",
    metalness: 0.35,
    roughness: 0.38,
    emissiveIntensity: 0.28,
  },
  {
    id: "erp",
    radius: 1.95,
    speed: 0.19,
    phase: 4.75,
    tilt: 0.26,
    y: 0.06,
    size: 0.125,
    eccentricity: 0.1,
    shape: "sphere",
    glbName: "Node_erp",
    metalness: 0.45,
    roughness: 0.32,
    emissiveIntensity: 0.3,
  },
];

/** Budget: core ≤180KB, nodes ≤280KB (pós meshopt). */
export const CORE_GLB = "/models/hero/core.glb";
export const NODES_GLB = "/models/hero/nodes.glb";

/** useGLTF: (url, useDraco=false, useMeshopt=true) */
export const GLB_USE_DRACO = false;
export const GLB_USE_MESHOPT = true;
