/**
 * Entrada do brand do hero: letras caem do topo (por cima do header) com springs individuais.
 * Owner: Motion — não usar GSAP no mesmo nó (`#hero-brand`).
 */
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const TITLE_CLASS =
  "font-display mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl";

const DROP_DELAY_MS = 500;
const VIEWPORT_MARGIN_PX = 28;

type HeroBrandTitleProps = {
  lines: readonly string[];
};

type LetterPhysics = {
  mass: number;
  stiffness: number;
  damping: number;
  delay: number;
  startX: number;
  startRotate: number;
};

/** Pseudo-aleatório estável por índice (replay consistente). */
function unit(seed: number): number {
  const n = Math.sin(seed) * 43758.5453123;
  return n - Math.floor(n);
}

function letterPhysics(index: number): LetterPhysics {
  const a = unit(index * 12.9898 + 78.233);
  const b = unit(index * 39.346 + 11.135);
  const c = unit(index * 73.157 + 4.209);

  return {
    mass: 0.55 + a * 0.75,
    stiffness: 200 + b * 200,
    // Damping baixo → 1–2 quiques elásticos sem a opção `bounce` (conflita com stiffness).
    damping: 7 + c * 9,
    delay: index * (0.032 + a * 0.028) + b * 0.04,
    startX: (a - 0.5) * 36,
    startRotate: (b - 0.5) * 42,
  };
}

function lineStartOffsets(lines: readonly string[]): number[] {
  const offsets: number[] = [];
  let total = 0;
  for (const line of lines) {
    offsets.push(total);
    total += Array.from(line).length;
  }
  return offsets;
}

export default function HeroBrandTitle({ lines }: HeroBrandTitleProps) {
  const reduce = useReducedMotion();
  const label = lines.join(" ");
  const offsets = useMemo(() => lineStartOffsets(lines), [lines]);
  const totalChars = useMemo(
    () => lines.reduce((sum, line) => sum + Array.from(line).length, 0),
    [lines],
  );
  const letterCount = useMemo(
    () =>
      lines.reduce(
        (count, line) =>
          count + Array.from(line).filter((char) => char !== " ").length,
        0,
      ),
    [lines],
  );

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const completedRef = useRef(0);
  const phaseRef = useRef<"pending" | "hanging" | "dropping" | "done">("pending");
  const [phase, setPhase] = useState<"pending" | "hanging" | "dropping" | "done">(
    "pending",
  );
  const [startYs, setStartYs] = useState<number[]>([]);

  const linesKey = lines.join("\n");
  phaseRef.current = phase;

  useLayoutEffect(() => {
    if (reduce) return;

    const next = Array.from({ length: totalChars }, (_, index) => {
      const el = letterRefs.current[index];
      if (!el) return -480;
      return -(el.getBoundingClientRect().top + VIEWPORT_MARGIN_PX);
    });
    setStartYs(next);
    setPhase((current) => (current === "pending" ? "hanging" : current));
  }, [reduce, linesKey, totalChars]);

  useEffect(() => {
    if (reduce || phase !== "hanging") return;

    const timer = window.setTimeout(() => {
      completedRef.current = 0;
      setPhase("dropping");
    }, DROP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "dropping") return;

    const fallback = window.setTimeout(() => {
      setPhase("done");
    }, 2800);

    return () => window.clearTimeout(fallback);
  }, [phase]);

  if (reduce) {
    return (
      <h1 id="hero-brand" data-egg-name className={TITLE_CLASS}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  const landed = phase === "dropping" || phase === "done";

  return (
    <h1
      id="hero-brand"
      data-egg-name
      data-dropping={phase === "dropping" ? "" : undefined}
      aria-label={label}
      className={TITLE_CLASS}
    >
      {lines.map((line, lineIndex) => (
        <span key={line} className="block whitespace-nowrap">
          {Array.from(line).map((char, charIndex) => {
            const index = (offsets[lineIndex] ?? 0) + charIndex;

            if (char === " ") {
              return (
                <span key={`space-${index}`} aria-hidden="true">
                  {"\u00a0"}
                </span>
              );
            }

            const physics = letterPhysics(index);
            const startY = startYs[index] ?? -480;

            return (
              <motion.span
                key={`${char}-${index}`}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                aria-hidden="true"
                className="inline-block will-change-transform"
                initial={false}
                animate={
                  landed
                    ? { opacity: 1, x: 0, y: 0, rotate: 0 }
                    : {
                        opacity: 0,
                        x: physics.startX,
                        y: startY,
                        rotate: physics.startRotate,
                      }
                }
                transition={
                  phase === "dropping"
                    ? {
                        type: "spring",
                        mass: physics.mass,
                        stiffness: physics.stiffness,
                        damping: physics.damping,
                        delay: physics.delay,
                      }
                    : { duration: 0 }
                }
                onAnimationComplete={() => {
                  if (phaseRef.current !== "dropping") return;
                  completedRef.current += 1;
                  if (completedRef.current >= letterCount) {
                    setPhase("done");
                  }
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
