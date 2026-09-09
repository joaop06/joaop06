import { useEffect, useState, type RefObject } from "react";

/**
 * Visibilidade do host do canvas (IntersectionObserver + document.hidden).
 * Usado pelo FramePacer para pausar invalidate offscreen / aba oculta.
 */
export function useHeroVisibility(hostRef: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

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
  }, [hostRef]);

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return visible && pageVisible;
}
