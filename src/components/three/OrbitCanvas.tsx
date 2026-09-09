/**
 * Canvas R3F do hero (F4.4–F4.6 / F5.9).
 * frameloop demand + invalidate ~20fps quando visível (evita main-thread thrash).
 */
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitScene } from "./OrbitScene";

type OrbitCanvasProps = {
  className?: string;
};

function FramePacer({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => invalidate(), 50);
    return () => window.clearInterval(id);
  }, [active, invalidate]);
  return null;
}

export default function OrbitCanvas({ className }: OrbitCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      { threshold: [0, 0.05, 0.25, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className}>
      <Canvas
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0.35, 4.2], fov: 42, near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
      >
        <FramePacer active={visible} />
        <OrbitScene />
      </Canvas>
    </div>
  );
}
