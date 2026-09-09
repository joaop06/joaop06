import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import {
  useActiveOrbitId,
  useOrbitSelection,
  type OrbitNodeId,
} from "../interaction/useOrbitSelection";
import type { OrbitThemeColors } from "../hooks/useThemeColors";
import type { RenderTierConfig } from "../hooks/useRenderTier";
import { NODES_GLB, GLB_USE_DRACO, GLB_USE_MESHOPT, type OrbitNodeDef } from "./orbitConfig";
import { nodePosition } from "./nodePosition";

class GlbErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function ProceduralShape({ def }: { def: OrbitNodeDef }) {
  const s = def.size;
  switch (def.shape) {
    case "box":
      return <boxGeometry args={[s * 1.4, s * 1.4, s * 1.4]} />;
    case "sphere":
      return <icosahedronGeometry args={[s, 1]} />;
    case "octa":
      return <octahedronGeometry args={[s * 1.2, 2]} />;
    case "cylinder":
      return <cylinderGeometry args={[s, s, s * 1.2, 32]} />;
    case "prism":
      return <coneGeometry args={[s * 1.1, s * 1.5, 6]} />;
    default:
      return <sphereGeometry args={[s, 24, 24]} />;
  }
}

function nodePhysicalProps(
  def: OrbitNodeDef,
  color: string,
  clearcoat: boolean,
) {
  return {
    color,
    metalness: def.metalness,
    roughness: def.roughness,
    emissive: color,
    emissiveIntensity: def.emissiveIntensity * 0.32,
    envMapIntensity: 1.15,
    ...(clearcoat
      ? { clearcoat: 0.45, clearcoatRoughness: 0.22 }
      : {}),
  } as const;
}

function createNodeMaterial(
  def: OrbitNodeDef,
  color: string,
  clearcoat: boolean,
  emissiveOnly: boolean,
): THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial {
  if (emissiveOnly) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: def.emissiveIntensity * 1.2,
      metalness: 0.2,
      roughness: 0.4,
    });
  }
  if (clearcoat) {
    return new THREE.MeshPhysicalMaterial(
      nodePhysicalProps(def, color, true),
    );
  }
  return new THREE.MeshStandardMaterial(nodePhysicalProps(def, color, false));
}

function GlbNodeMesh({
  def,
  color,
  activeRef,
  clearcoat,
  onBounds,
}: {
  def: OrbitNodeDef;
  color: string;
  activeRef: { current: boolean };
  clearcoat: boolean;
  onBounds: (radius: number) => void;
}) {
  const { scene } = useGLTF(NODES_GLB, GLB_USE_DRACO, GLB_USE_MESHOPT);
  const matsRef = useRef<
    (THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial)[]
  >([]);

  const source = useMemo(() => {
    let found: THREE.Object3D | null = null;
    scene.traverse((o) => {
      if (o.name === def.glbName) found = o;
    });
    return found;
  }, [scene, def.glbName]);

  const cloned = useMemo(() => {
    if (!source) return null;
    return (source as THREE.Object3D).clone(true);
  }, [source]);

  useLayoutEffect(() => {
    if (!cloned) return;
    const created: (THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial)[] =
      [];
    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const emissiveOnly = /_Emissive$/i.test(obj.name);
      const mat = createNodeMaterial(def, color, clearcoat, emissiveOnly);
      obj.material = mat;
      created.push(mat);
    });
    matsRef.current = created;

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    onBounds(Math.max(size.x, size.y, size.z) * 0.55);

    return () => {
      for (const m of created) m.dispose();
    };
  }, [cloned, color, def, clearcoat, onBounds]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const active = activeRef.current;
    for (const mat of matsRef.current) {
      const base = def.emissiveIntensity;
      const dimTarget = active ? base * 1.85 : base * 0.28;
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        dimTarget,
        10,
        d,
      );
    }
  });

  if (!cloned) {
    return (
      <ProceduralNodeMesh
        def={def}
        color={color}
        activeRef={activeRef}
        clearcoat={clearcoat}
      />
    );
  }

  return <primitive object={cloned} />;
}

function ProceduralNodeMesh({
  def,
  color,
  activeRef,
  clearcoat,
}: {
  def: OrbitNodeDef;
  color: string;
  activeRef: { current: boolean };
  clearcoat: boolean;
}) {
  const matRef = useRef<
    THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial
  >(null);

  useFrame((_, dt) => {
    const mat = matRef.current;
    if (!mat) return;
    const d = Math.min(dt, 0.05);
    const target = activeRef.current
      ? def.emissiveIntensity * 1.85
      : def.emissiveIntensity * 0.28;
    mat.emissiveIntensity = THREE.MathUtils.damp(
      mat.emissiveIntensity,
      target,
      10,
      d,
    );
  });

  const props = nodePhysicalProps(def, color, clearcoat);

  return (
    <mesh>
      <ProceduralShape def={def} />
      {clearcoat ? (
        <meshPhysicalMaterial ref={matRef as never} {...props} />
      ) : (
        <meshStandardMaterial ref={matRef as never} {...props} />
      )}
    </mesh>
  );
}

export function OrbitNode({
  def,
  colors,
  positionRef,
  tier,
}: {
  def: OrbitNodeDef;
  colors: OrbitThemeColors;
  positionRef: { current: THREE.Vector3 };
  tier: RenderTierConfig;
}) {
  const group = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);
  const activeRef = useRef(false);
  const [hitRadius, setHitRadius] = useState(def.size * 2.2);
  const { setHoveredId, setSelectedId } = useOrbitSelection();
  const activeId = useActiveOrbitId();
  const clearcoat = tier.clearcoatNodes;

  useEffect(() => {
    activeRef.current = activeId === def.id;
  }, [activeId, def.id]);

  const onBounds = useCallback(
    (radius: number) => {
      setHitRadius(Math.max(radius * 1.35, def.size * 1.8));
    },
    [def.size],
  );

  useFrame((state, dt) => {
    if (!group.current) return;
    const d = Math.min(dt, 0.05);
    nodePosition(def, state.clock.elapsedTime, positionRef.current);
    group.current.position.copy(positionRef.current);
    group.current.rotation.y += d * 0.55;
    group.current.rotation.x += d * 0.18;

    const target = activeRef.current ? 1.12 : 1;
    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, target, 8, d);
    group.current.scale.setScalar(scaleRef.current);
  });

  const color = colors.accent;
  const fallback = (
    <ProceduralNodeMesh
      def={def}
      color={color}
      activeRef={activeRef}
      clearcoat={clearcoat}
    />
  );

  const onOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHoveredId(def.id);
    document.body.style.cursor = "pointer";
  };
  const onOut = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHoveredId(null);
    document.body.style.cursor = "auto";
  };
  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setSelectedId(def.id);
  };

  return (
    <group ref={group}>
      <GlbErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <GlbNodeMesh
            def={def}
            color={color}
            activeRef={activeRef}
            clearcoat={clearcoat}
            onBounds={onBounds}
          />
        </Suspense>
      </GlbErrorBoundary>
      <mesh
        visible={false}
        onPointerOver={onOver}
        onPointerOut={onOut}
        onClick={onClick}
      >
        <sphereGeometry args={[hitRadius, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}

export function isOrbitNodeId(id: string): id is OrbitNodeId {
  return (["api", "db", "queue", "commerce", "erp"] as string[]).includes(id);
}

useGLTF.preload(NODES_GLB, GLB_USE_DRACO, GLB_USE_MESHOPT);
