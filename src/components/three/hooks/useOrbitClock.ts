import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";

export type OrbitClock = {
  /** Tempo acumulado (s). */
  elapsed: MutableRefObject<number>;
  /** Delta limitado para motion estável. */
  delta: MutableRefObject<number>;
};

const MAX_DELTA = 0.05;

/** Clock único da órbita — motion frame-independent (não chama getDelta). */
export function useOrbitClock(): OrbitClock {
  const elapsed = useRef(0);
  const delta = useRef(0);
  const prev = useRef<number | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const raw = prev.current == null ? 0 : t - prev.current;
    prev.current = t;
    delta.current = Math.min(Math.max(raw, 0), MAX_DELTA);
    elapsed.current = t;
  });

  return { elapsed, delta };
}
