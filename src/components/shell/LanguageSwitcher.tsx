import { Languages } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

const options: { locale: Locale; href: string; name: string }[] = [
  { locale: "pt", href: "/pt", name: "Português" },
  { locale: "en", href: "/en", name: "English" },
];

/** Seletor de idioma (F1.9) + microfeedback Motion (F3.8). */
export default function LanguageSwitcher({
  locale,
  label,
}: LanguageSwitcherProps) {
  const reduce = useReducedMotion();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl text-fg transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft"
          aria-label={label}
          whileTap={reduce ? undefined : { scale: 0.9 }}
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon icon={Languages} className="size-5" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.map((opt) => (
          <DropdownMenuItem key={opt.locale} asChild>
            <a
              href={opt.href}
              lang={opt.locale === "pt" ? "pt-BR" : "en"}
              hrefLang={opt.locale === "pt" ? "pt-BR" : "en"}
              aria-current={opt.locale === locale ? "page" : undefined}
              className={
                opt.locale === locale ? "bg-accent-soft font-medium" : undefined
              }
            >
              {opt.name}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
