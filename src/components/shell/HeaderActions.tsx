/**
 * F5.1 — uma única island no header (em vez de 4× client:load).
 */
import DesktopNav, { type DesktopNavLink } from "@/components/motion/DesktopNav";
import LanguageSwitcher from "@/components/shell/LanguageSwitcher";
import MobileNav from "@/components/shell/MobileNav";
import ThemeToggle from "@/components/shell/ThemeToggle";
import type { Locale } from "@/i18n";

type HeaderActionsProps = {
  locale: Locale;
  links: DesktopNavLink[];
  navLabel: string;
  languageLabel: string;
  themeLabel: string;
  labelLight: string;
  labelDark: string;
  menuLabel: string;
  openLabel: string;
  closeLabel: string;
};

export default function HeaderActions({
  locale,
  links,
  navLabel,
  languageLabel,
  themeLabel,
  labelLight,
  labelDark,
  menuLabel,
  openLabel,
  closeLabel,
}: HeaderActionsProps) {
  return (
    <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
      <DesktopNav links={links} navLabel={navLabel} />
      <div className="flex items-center gap-1">
        <LanguageSwitcher locale={locale} label={languageLabel} />
        <ThemeToggle
          label={themeLabel}
          labelLight={labelLight}
          labelDark={labelDark}
        />
        <MobileNav
          links={links}
          menuLabel={menuLabel}
          openLabel={openLabel}
          closeLabel={closeLabel}
        />
      </div>
    </div>
  );
}
