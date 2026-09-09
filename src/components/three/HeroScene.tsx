/**
 * Island do hero 3D (F4.4–F4.8).
 * Dynamic import de three/R3F (F4.5); fallback SVG se WebGL/reduced-motion (F4.8).
 * Ownership: R3F na cena; wrapper DOM sem Motion/GSAP.
 */
import { Suspense, useEffect, useState, type ComponentType } from "react";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { supportsWebGL } from "@/lib/webgl";
import { HeroFallback } from "./HeroFallback";

type HeroSceneProps = {
  label: string;
};

type OrbitCanvasComponent = ComponentType<{ className?: string }>;

export default function HeroScene({ label }: HeroSceneProps) {
  const [Canvas, setCanvas] = useState<OrbitCanvasComponent | null>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");

  useEffect(() => {
    let cancelled = false;

    if (prefersReducedMotion() || !supportsWebGL()) {
      setMode("fallback");
      return;
    }

    // F4.5 — dynamic import; three/R3F não entram no chunk inicial
    void import("./OrbitCanvas")
      .then((mod) => {
        if (cancelled) return;
        setCanvas(() => mod.default);
        setMode("webgl");
      })
      .catch(() => {
        if (!cancelled) setMode("fallback");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="relative h-full w-full"
      role="img"
      aria-label={label}
      data-hero-3d
    >
      {(mode === "pending" || mode === "fallback" || !Canvas) && (
        <HeroFallback className="absolute inset-0 h-full w-full" />
      )}
      {mode === "webgl" && Canvas && (
        <Suspense fallback={null}>
          <Canvas className="absolute inset-0 h-full w-full" />
        </Suspense>
      )}
    </div>
  );
}
