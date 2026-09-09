/**
 * Island do hero 3D (F4.4–F4.8 / F5.3 / F5.8).
 * Three/R3F só após interação no slot (ou idle longo) — fora do critical path.
 * Fallback SVG cobre LCP e first paint.
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
    let loaded = false;

    if (prefersReducedMotion() || !supportsWebGL()) {
      setMode("fallback");
      return;
    }

    const load = () => {
      if (cancelled || loaded) return;
      loaded = true;
      void import("./OrbitCanvas")
        .then((mod) => {
          if (cancelled) return;
          setCanvas(() => mod.default);
          setMode("webgl");
        })
        .catch(() => {
          if (!cancelled) setMode("fallback");
        });
    };

    const slot = document.querySelector<HTMLElement>("[data-hero-3d-slot]");
    const onInteract = () => load();
    slot?.addEventListener("pointerenter", onInteract, { once: true });
    slot?.addEventListener("focusin", onInteract, { once: true });
    // Visitantes sem hover (mobile): carrega bem depois do first paint
    const late = window.setTimeout(load, 4500);

    return () => {
      cancelled = true;
      window.clearTimeout(late);
      slot?.removeEventListener("pointerenter", onInteract);
      slot?.removeEventListener("focusin", onInteract);
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
