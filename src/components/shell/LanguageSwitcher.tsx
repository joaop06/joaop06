import { Languages } from "lucide-react";
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

/** Seletor de idioma (F1.9). */
export default function LanguageSwitcher({
  locale,
  label,
}: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl text-fg transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft"
          aria-label={label}
        >
          <Icon icon={Languages} className="size-5" />
        </button>
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
