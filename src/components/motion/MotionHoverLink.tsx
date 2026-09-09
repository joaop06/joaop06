/**
 * F3.7 — hover sutil em links/CTAs/projetos (Motion).
 * Nunca usar em nós com `data-chapter` (ownership GSAP).
 */
import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MotionHoverLinkProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  tone?: "cta" | "project" | "nav";
};

const hoverByTone = {
  cta: { scale: 1.03, opacity: 0.92 },
  project: { scale: 1.01, y: -2 },
  nav: { opacity: 0.85 },
} as const;

export function MotionHoverLink({
  children,
  className = "",
  tone = "nav",
  ...props
}: MotionHoverLinkProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <a className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      className={className}
      whileHover={hoverByTone[tone]}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
