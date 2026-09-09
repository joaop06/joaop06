/**
 * Island do hero 3D.
 * Three/R3F só após interação no slot (ou idle longo) — fora do critical path.
 * Fallback SVG cobre LCP e first paint; crossfade ao canvas ready.
 */
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import type { Dictionary } from "@/i18n";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { supportsWebGL } from "@/lib/webgl";
import { HeroFallback } from "./HeroFallback";
import { NodeDetailPanel } from "./interaction/NodeDetailPanel";
import { OrbitSelectionProvider } from "./interaction/useOrbitSelection";

type HeroSceneProps = {
  label: string;
  orbitNodes: Dictionary["hero"]["orbitNodes"];
  dismissLabel: string;
  listLabel: string;
};

type OrbitCanvasComponent = ComponentType<{
  className?: string;
  onReady?: () => void;
}>;

export default function HeroScene({
  label,
  orbitNodes,
  dismissLabel,
  listLabel,
}: HeroSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [Canvas, setCanvas] = useState<OrbitCanvasComponent | null>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");
  const [canvasReady, setCanvasReady] = useState(false);

  const onReady = useCallback(() => setCanvasReady(true), []);

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
          void import("@react-three/drei").then(({ useGLTF }) => {
            useGLTF.preload("/models/hero/core.glb", false, true);
            useGLTF.preload("/models/hero/nodes.glb", false, true);
          });
          setCanvas(() => mod.default);
          setMode("webgl");
        })
        .catch(() => {
          if (!cancelled) setMode("fallback");
        });
    };

    const slot =
      rootRef.current?.closest<HTMLElement>("[data-hero-3d-slot]") ??
      rootRef.current;
    const onInteract = () => load();
    slot?.addEventListener("pointerenter", onInteract, { once: true });
    slot?.addEventListener("focusin", onInteract, { once: true });
    const late = window.setTimeout(load, 4500);

    return () => {
      cancelled = true;
      window.clearTimeout(late);
      slot?.removeEventListener("pointerenter", onInteract);
      slot?.removeEventListener("focusin", onInteract);
    };
  }, []);

  const showFallback =
    mode === "pending" || mode === "fallback" || !Canvas || !canvasReady;

  return (
    <OrbitSelectionProvider>
      <div ref={rootRef} className="relative h-full w-full" data-hero-3d>
        <div
          className={`hero-3d-visual absolute inset-0 h-full w-full transition-opacity duration-500 ${
            showFallback ? "opacity-100" : "opacity-0"
          }`}
          role="img"
          aria-label={label}
          aria-hidden={!showFallback}
        >
          <HeroFallback className="h-full w-full object-contain" />
        </div>

        {mode === "webgl" && Canvas && (
          <div
            className={`hero-3d-visual absolute inset-0 h-full w-full transition-opacity duration-500 ${
              canvasReady ? "opacity-100" : "opacity-0"
            }`}
            role="img"
            aria-label={label}
            aria-hidden={!canvasReady}
          >
            <Suspense fallback={null}>
              <Canvas className="h-full w-full" onReady={onReady} />
            </Suspense>
          </div>
        )}

        <NodeDetailPanel
          nodes={orbitNodes}
          dismissLabel={dismissLabel}
          listLabel={listLabel}
        />
      </div>
    </OrbitSelectionProvider>
  );
}
