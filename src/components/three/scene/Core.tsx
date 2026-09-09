import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Component,
  Suspense,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as THREE from "three";
import type { OrbitThemeColors } from "../hooks/useThemeColors";
import type { RenderTierConfig } from "../hooks/useRenderTier";
import { CORE_GLB, GLB_USE_DRACO, GLB_USE_MESHOPT } from "./orbitConfig";

type CoreProps = {
  colors: OrbitThemeColors;
  sparkCount?: number;
  tier?: RenderTierConfig;
};

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

function coreShellProps(colors: OrbitThemeColors) {
  return {
    color: colors.coreAlbedo,
    roughness: 0.1,
    metalness: 0.05,
    transmission: 0.72,
    thickness: 0.65,
    ior: 1.45,
    transparent: true,
    opacity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    attenuationColor: colors.coreAttenuation,
    attenuationDistance: 2.0,
    envMapIntensity: 1.4,
    emissive: colors.accent,
    emissiveIntensity: colors.isDark ? 0.06 : 0.03,
  } as const;
}

function coreInnerProps(colors: OrbitThemeColors) {
  return {
    color: colors.accent,
    roughness: 0.35,
    metalness: 0.15,
    emissive: colors.accent,
    emissiveIntensity: colors.isDark ? 0.85 : 0.55,
    envMapIntensity: 0.6,
  } as const;
}

function applyFresnel(mat: THREE.MeshPhysicalMaterial, accent: string) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uFresnelPower = { value: 2.4 };
    shader.uniforms.uFresnelColor = { value: new THREE.Color(accent) };
    shader.fragmentShader = `
      uniform float uFresnelPower;
      uniform vec3 uFresnelColor;
      ${shader.fragmentShader}
    `.replace(
      "#include <opaque_fragment>",
      /* glsl */ `
      {
        float fre = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), uFresnelPower);
        outgoingLight += uFresnelColor * fre * 0.45;
      }
      #include <opaque_fragment>
      `,
    );
  };
  mat.needsUpdate = true;
}

function ProceduralCoreMesh({
  colors,
  meshRef,
  innerMatRef,
}: {
  colors: OrbitThemeColors;
  meshRef: MutableRefObject<THREE.Mesh | null>;
  innerMatRef: MutableRefObject<THREE.MeshStandardMaterial | null>;
}) {
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useEffect(() => {
    meshRef.current = shell.current;
  });

  useLayoutEffect(() => {
    const m = shell.current?.material;
    if (m && !Array.isArray(m)) {
      applyFresnel(m as THREE.MeshPhysicalMaterial, colors.accent);
    }
    const im = inner.current?.material;
    if (im && !Array.isArray(im)) {
      innerMatRef.current = im as THREE.MeshStandardMaterial;
    }
  }, [colors.accent, meshRef, innerMatRef]);

  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.55, 5]} />
        <meshPhysicalMaterial {...coreShellProps(colors)} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.24, 3]} />
        <meshStandardMaterial {...coreInnerProps(colors)} />
      </mesh>
    </group>
  );
}

function GlbCoreMesh({
  colors,
  meshRef,
  innerMatRef,
}: {
  colors: OrbitThemeColors;
  meshRef: MutableRefObject<THREE.Mesh | null>;
  innerMatRef: MutableRefObject<THREE.MeshStandardMaterial | null>;
}) {
  const { scene } = useGLTF(CORE_GLB, GLB_USE_DRACO, GLB_USE_MESHOPT);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const created: THREE.Material[] = [];
    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const name = obj.name || "";

      if (name === "Core_Inner" || name.endsWith("_Inner")) {
        const mat = new THREE.MeshStandardMaterial({
          ...coreInnerProps(colors),
          emissive: new THREE.Color(colors.accent),
        });
        obj.material = mat;
        created.push(mat);
        innerMatRef.current = mat;
        return;
      }

      // Core_Shell, Core, or any other mesh → glass shell
      const mat = new THREE.MeshPhysicalMaterial({
        ...coreShellProps(colors),
        emissive: new THREE.Color(colors.accent),
      });
      applyFresnel(mat, colors.accent);
      obj.material = mat;
      created.push(mat);
      if (name === "Core_Shell" || name === "Core" || !meshRef.current) {
        meshRef.current = obj;
      }
    });

    return () => {
      for (const m of created) m.dispose();
    };
  }, [cloned, colors, meshRef, innerMatRef]);

  return <primitive object={cloned} />;
}

function useSoftSparkTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function CoreSparks({
  color,
  count,
  useSprites,
}: {
  color: string;
  count: number;
  useSprites: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tex = useSoftSparkTexture();
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        theta: (i / count) * Math.PI * 2,
        phi: ((i * 1.7) % 1) * Math.PI,
        r: 0.58 + (i % 5) * 0.03,
        speed: 0.2 + (i % 7) * 0.04,
      })),
    [count],
  );
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useEffect(() => {
    return () => {
      tex.dispose();
    };
  }, [tex]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (useSprites && points.current) {
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        const a = s.theta + t * s.speed;
        const y = Math.cos(s.phi + t * 0.15) * s.r * 0.55;
        positions[i * 3] = Math.cos(a) * s.r * Math.sin(s.phi + 0.4);
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(a) * s.r * Math.sin(s.phi + 0.4);
      }
      const attr = points.current.geometry.getAttribute("position");
      (attr as THREE.BufferAttribute).needsUpdate = true;
      return;
    }
    if (!mesh.current) return;
    seeds.forEach((s, i) => {
      const a = s.theta + t * s.speed;
      const y = Math.cos(s.phi + t * 0.15) * s.r * 0.55;
      dummy.position.set(
        Math.cos(a) * s.r * Math.sin(s.phi + 0.4),
        y,
        Math.sin(a) * s.r * Math.sin(s.phi + 0.4),
      );
      dummy.scale.setScalar(0.012 + Math.sin(t * 2 + i) * 0.004);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  if (useSprites) {
    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={tex}
          color={color}
          size={0.06}
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    );
  }

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/** Núcleo glass (GLB Shell+Inner) com fallback procedural elevado. */
export const Core = forwardRef<THREE.Group, CoreProps>(function Core(
  { colors, sparkCount = 32, tier },
  ref,
) {
  const group = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const useSprites = tier?.tier === "high";

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") ref(group.current);
    else ref.current = group.current;
  });

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    g.rotation.y += d * 0.18;
    g.rotation.x = Math.sin(t * 0.32) * 0.07;
    const breath = 1 + Math.sin(t * 0.55) * 0.025;
    g.scale.setScalar(breath);

    const inner = innerMatRef.current;
    if (inner) {
      const pulse = colors.isDark ? 0.85 : 0.55;
      inner.emissiveIntensity = pulse + Math.sin(t * 1.4) * 0.18;
    }
  });

  const fallback = (
    <ProceduralCoreMesh
      colors={colors}
      meshRef={meshRef}
      innerMatRef={innerMatRef}
    />
  );

  return (
    <group ref={group}>
      <GlbErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <GlbCoreMesh
            colors={colors}
            meshRef={meshRef}
            innerMatRef={innerMatRef}
          />
        </Suspense>
      </GlbErrorBoundary>
      <CoreSparks
        color={colors.accent}
        count={sparkCount}
        useSprites={Boolean(useSprites)}
      />
    </group>
  );
});

useGLTF.preload(CORE_GLB, GLB_USE_DRACO, GLB_USE_MESHOPT);
