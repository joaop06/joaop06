/**
 * Canvas R3F do hero (F4.4–F4.6).
 * Importado dinamicamente por HeroScene — three/R3F fora do bundle crítico (F4.5).
 * Pausar render offscreen via frameloop (F4.6); cena permanece montada (F4.9).
 */
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitScene } from "./OrbitScene";

type OrbitCanvasProps = {
  className?: string;
};

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
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: true,
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
        <OrbitScene />
      </Canvas>
    </div>
  );
}
