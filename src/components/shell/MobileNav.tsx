import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { SectionId } from "@/lib/sections";
import { Icon } from "@/components/ui/Icon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

export type NavLink = {
  id: SectionId;
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
  menuLabel: string;
  openLabel: string;
  closeLabel: string;
};

/** Nav mobile acessível via Radix Dialog (F1.6 / F1.9). */
export default function MobileNav({
  links,
  menuLabel,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl text-fg transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft md:hidden"
          aria-label={openLabel}
        >
          <Icon icon={Menu} className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between gap-4">
          <DialogTitle className="font-display text-lg font-semibold text-fg">
            {menuLabel}
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl text-fg hover:bg-accent-soft"
              aria-label={closeLabel}
            >
              <Icon icon={X} className="size-5" />
            </button>
          </DialogClose>
        </div>
        <nav aria-label={menuLabel}>
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-base text-fg hover:bg-accent-soft"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
