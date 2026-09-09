import { Moon, Sun } from "lucide-react";
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

/** Toggle claro/escuro com persistência (F1.4). */
export default function ThemeToggle({
  label,
  labelLight,
  labelDark,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const next = theme === "dark" ? "light" : "dark";
  const actionLabel = next === "light" ? labelLight : labelDark;

  return (
    <button
      type="button"
      className="inline-flex size-10 items-center justify-center rounded-xl text-fg transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft"
      aria-label={`${label}: ${actionLabel}`}
      title={actionLabel}
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
    </button>
  );
}
