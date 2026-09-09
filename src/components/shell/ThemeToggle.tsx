import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  label: string;
  labelLight: string;
  labelDark: string;
};

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore quota / private mode */
  }
}

/** Toggle claro/escuro (F1.4) + microfeedback Motion (F3.8). */
export default function ThemeToggle({
  label,
  labelLight,
  labelDark,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const reduce = useReducedMotion();

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const next = theme === "dark" ? "light" : "dark";
  const actionLabel = next === "light" ? labelLight : labelDark;

  return (
    <motion.button
      type="button"
      className="inline-flex size-10 items-center justify-center rounded-xl text-fg transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft"
      aria-label={`${label}: ${actionLabel}`}
      title={actionLabel}
      whileTap={reduce ? undefined : { scale: 0.9, rotate: theme === "dark" ? -12 : 12 }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
    >
      {theme === "dark" ? (
        <Icon icon={Sun} className="size-5" />
      ) : (
        <Icon icon={Moon} className="size-5" />
      )}
    </motion.button>
  );
}
