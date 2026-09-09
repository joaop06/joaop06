import { useEffect, useState } from "react";
import { MotionHoverLink } from "@/components/motion/MotionHoverLink";
import type { SectionId } from "@/lib/sections";
import {
  SECTION_CHANGE_EVENT,
  type SectionChangeDetail,
} from "@/lib/scroll-events";

export type DesktopNavLink = {
  id: SectionId;
  href: string;
  label: string;
};

type DesktopNavProps = {
  links: DesktopNavLink[];
  navLabel: string;
};

/** Nav desktop com ponto ativo (F3.4) + hover Motion (F3.7). */
export default function DesktopNav({ links, navLabel }: DesktopNavProps) {
  const [activeId, setActiveId] = useState<SectionId>(links[0]?.id ?? "home");

  useEffect(() => {
    const onSection = (event: Event) => {
      const detail = (event as CustomEvent<SectionChangeDetail>).detail;
      if (detail?.id) setActiveId(detail.id);
    };
    window.addEventListener(SECTION_CHANGE_EVENT, onSection);
    return () => window.removeEventListener(SECTION_CHANGE_EVENT, onSection);
  }, []);

  return (
    <nav className="hidden md:block" aria-label={navLabel}>
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const active = link.id === activeId;
          return (
            <li key={link.id} className="relative">
              <MotionHoverLink
                href={link.href}
                tone="nav"
                aria-current={active ? "true" : undefined}
                className={`rounded-xl px-3 py-2 text-sm no-underline transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft hover:text-fg ${
                  active ? "text-fg font-medium" : "text-fg-muted"
                }`}
              >
                {link.label}
              </MotionHoverLink>
              {active ? (
                <span
                  className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
