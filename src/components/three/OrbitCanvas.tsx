/**
 * Canvas R3F do hero — frameloop always quando visível, never offscreen.
 * Qualidade via useRenderTier (DPR / AA / MSAA downstream).
 */
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useHeroVisibility } from "./hooks/useHeroVisibility";
import { useRenderTier } from "./hooks/useRenderTier";
import { OrbitScene } from "./OrbitScene";

type OrbitCanvasProps = {
  className?: string;
  onReady?: () => void;
};

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || !onReady) return;
    fired.current = true;
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

export default function OrbitCanvas({ className, onReady }: OrbitCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const visible = useHeroVisibility(hostRef);
  const tier = useRenderTier();

  return (
    <div ref={hostRef} className={`${className ?? ""} pointer-events-none`}>
      <Canvas
        key={tier.tier}
        dpr={tier.dpr}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: tier.antialias,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0.15, 0.28, 3.85], fov: 40, near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
        className="pointer-events-auto"
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = tier.bloom
            ? THREE.NoToneMapping
            : THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
          scene.background = null;
        }}
      >
        <ReadySignal onReady={onReady} />
        <OrbitScene tier={tier} />
      </Canvas>
    </div>
  );
}
