/**
 * Cena procedural Órbita de Integrações (§7.1 / F4.1–F4.3, F4.7, F4.9).
 * Primitivos R3F + MeshPhysicalMaterial (glass); sem GLB (F4.2 / P8).
 * Ownership: R3F/Three apenas — não animar o wrapper DOM com Motion/GSAP.
 */
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { readThemeColors, type ThemeColors } from "@/lib/theme-colors";

type OrbitNodeDef = {
  id: string;
  radius: number;
  speed: number;
  phase: number;
  tilt: number;
  y: number;
  size: number;
  shape: "box" | "sphere" | "octa" | "cylinder";
};

const NODES: OrbitNodeDef[] = [
  { id: "api", radius: 1.55, speed: 0.22, phase: 0, tilt: 0.15, y: 0.15, size: 0.14, shape: "octa" },
  { id: "db", radius: 1.85, speed: 0.16, phase: 1.2, tilt: -0.2, y: -0.1, size: 0.12, shape: "cylinder" },
  { id: "queue", radius: 1.7, speed: 0.28, phase: 2.4, tilt: 0.35, y: 0.25, size: 0.11, shape: "box" },
  { id: "commerce", radius: 2.05, speed: 0.14, phase: 3.5, tilt: -0.1, y: -0.2, size: 0.13, shape: "box" },
  { id: "erp", radius: 1.95, speed: 0.19, phase: 4.8, tilt: 0.25, y: 0.05, size: 0.12, shape: "sphere" },
];

const TILT_AXIS = new THREE.Vector3(0, 0, 1);

function nodePosition(def: OrbitNodeDef, t: number, out: THREE.Vector3) {
  const a = t * def.speed + def.phase;
  out.set(
    Math.cos(a) * def.radius,
    def.y + Math.sin(a * 0.85) * 0.12,
    Math.sin(a) * def.radius * (1 - Math.abs(def.tilt) * 0.35),
  );
  out.applyAxisAngle(TILT_AXIS, def.tilt * 0.4);
}

function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(() => readThemeColors());

  useEffect(() => {
    const sync = () => setColors(readThemeColors());
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

function NodeMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.35}
      metalness={0.15}
      transparent
      opacity={0.92}
      clearcoat={0.4}
      clearcoatRoughness={0.3}
    />
  );
}

function OrbitNode({
  def,
  color,
  timeRef,
  positionRef,
}: {
  def: OrbitNodeDef;
  color: string;
  timeRef: MutableRefObject<number>;
  positionRef: MutableRefObject<THREE.Vector3>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    nodePosition(def, timeRef.current, positionRef.current);
    group.current.position.copy(positionRef.current);
    group.current.rotation.y += 0.008;
  });

  return (
    <group ref={group}>
      {def.shape === "box" && (
        <mesh>
          <boxGeometry args={[def.size * 1.4, def.size * 1.4, def.size * 1.4]} />
          <NodeMaterial color={color} />
        </mesh>
      )}
      {def.shape === "sphere" && (
        <mesh>
          <sphereGeometry args={[def.size, 16, 16]} />
          <NodeMaterial color={color} />
        </mesh>
      )}
      {def.shape === "octa" && (
        <mesh>
          <octahedronGeometry args={[def.size * 1.2, 0]} />
          <NodeMaterial color={color} />
        </mesh>
      )}
      {def.shape === "cylinder" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[def.size, def.size, def.size * 1.1, 12]} />
          <NodeMaterial color={color} />
        </mesh>
      )}
    </group>
  );
}

function Connections({
  positions,
  color,
}: {
  positions: MutableRefObject<THREE.Vector3>[];
  color: string;
}) {
  const lineObjects = useRef<THREE.Line[]>([]);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(), []);

  const lines = useMemo(() => {
    return positions.map(() => {
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });
      return new THREE.Line(geometry, material);
    });
  }, [positions, color]);

  useEffect(() => {
    lineObjects.current = lines;
    return () => {
      for (const line of lines) {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      }
    };
  }, [lines]);

  useFrame(() => {
    positions.forEach((posRef, i) => {
      const line = lineObjects.current[i];
      if (!line) return;
      const end = posRef.current;
      mid.copy(end).multiplyScalar(0.5);
      mid.y += 0.35;
      curve.v0.set(0, 0, 0);
      curve.v1.copy(mid);
      curve.v2.copy(end);
      line.geometry.setFromPoints(curve.getPoints(12));
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

function GlassCore({ colors }: { colors: ThemeColors }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += dt * 0.15;
    mesh.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.08;
  });

  useEffect(() => {
    return () => {
      const m = mesh.current;
      if (!m) return;
      m.geometry.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat.dispose();
    };
  }, []);

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshPhysicalMaterial
        color={colors.accentSoft}
        roughness={0.12}
        metalness={0.05}
        transmission={0.72}
        thickness={0.55}
        ior={1.45}
        transparent
        opacity={0.95}
        clearcoat={1}
        clearcoatRoughness={0.1}
        attenuationColor={colors.accent}
        attenuationDistance={2.5}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      // Parallax suave — sem preventDefault / sem scrolljacking (F4.7)
      target.current.x = ny * 0.18;
      target.current.y = nx * 0.28;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (!group.current) return;
    const k = 1 - Math.exp(-dt * 3.2);
    current.current.x += (target.current.x - current.current.x) * k;
    current.current.y += (target.current.y - current.current.y) * k;
    group.current.rotation.x = current.current.x;
    group.current.rotation.y = current.current.y;
  });

  return <group ref={group}>{children}</group>;
}

export function OrbitScene() {
  const colors = useThemeColors();
  const timeRef = useRef(0);
  const positionRefs = useMemo(
    () => NODES.map(() => ({ current: new THREE.Vector3() })),
    [],
  );

  useFrame((_, dt) => {
    timeRef.current += dt;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.1}
        color={colors.accentSoft}
      />
      <directionalLight
        position={[-3, -2, -4]}
        intensity={0.35}
        color={colors.accent}
      />
      <pointLight
        position={[0, 0, 2.2]}
        intensity={0.6}
        color={colors.accent}
        distance={6}
      />

      <PointerRig>
        <group scale={0.95}>
          <GlassCore colors={colors} />
          <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
            <torusGeometry args={[1.75, 0.008, 8, 64]} />
            <meshBasicMaterial color={colors.accent} transparent opacity={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 1.7, -0.3, 0.4]}>
            <torusGeometry args={[2.0, 0.006, 8, 64]} />
            <meshBasicMaterial color={colors.accent} transparent opacity={0.14} />
          </mesh>
          <Connections positions={positionRefs} color={colors.accent} />
          {NODES.map((def, i) => (
            <OrbitNode
              key={def.id}
              def={def}
              color={colors.accent}
              timeRef={timeRef}
              positionRef={positionRefs[i]}
            />
          ))}
        </group>
      </PointerRig>
    </>
  );
}
