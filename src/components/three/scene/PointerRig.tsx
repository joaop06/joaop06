import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

/**
 * Parallax suave — pointer no slot do hero (não window).
 * Sem preventDefault / sem scrolljacking.
 */
export function PointerRig({
  children,
  slotSelector = "[data-hero-3d-slot]",
}: {
  children: ReactNode;
  slotSelector?: string;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const slot = document.querySelector<HTMLElement>(slotSelector);
    if (!slot) return;

    const onMove = (e: PointerEvent) => {
      const rect = slot.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      target.current.x = ny * 0.16;
      target.current.y = nx * 0.24;
      invalidate();
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      invalidate();
    };

    slot.addEventListener("pointermove", onMove, { passive: true });
    slot.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      slot.removeEventListener("pointermove", onMove);
      slot.removeEventListener("pointerleave", onLeave);
    };
  }, [invalidate, slotSelector]);

  useFrame((_, dt) => {
    if (!group.current) return;
    const d = Math.min(dt, 0.05);
    const k = 1 - Math.exp(-d * 3.4);
    current.current.x += (target.current.x - current.current.x) * k;
    current.current.y += (target.current.y - current.current.y) * k;
    group.current.rotation.x = current.current.x;
    group.current.rotation.y = current.current.y;
  });

  return <group ref={group}>{children}</group>;
}
