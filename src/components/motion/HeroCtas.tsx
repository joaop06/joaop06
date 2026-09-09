import { MotionHoverLink } from "@/components/motion/MotionHoverLink";
import { trackUmami } from "@/lib/umami";

export type HeroCta = {
  href: string;
  label: string;
  variant: "primary" | "glass";
  external?: boolean;
  download?: boolean;
  /** F7.2 — id estável do CTA para analytics */
  trackId?: "talk" | "projects" | "cv" | "schedule";
};

type HeroCtasProps = {
  items: HeroCta[];
};

/** CTAs do hero com micro-hover Motion (F3.7) + eventos Umami (F7.2). */
export default function HeroCtas({ items }: HeroCtasProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {items.map((item) => (
        <MotionHoverLink
          key={item.label}
          href={item.href}
          tone="cta"
          download={item.download || undefined}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className={
            item.variant === "primary"
              ? "inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-on-accent no-underline"
              : "glass inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-fg no-underline"
          }
          onClick={() => {
            if (item.trackId === "cv") {
              trackUmami("cv-download", { source: "hero" });
              return;
            }
            if (item.trackId === "schedule") {
              trackUmami("schedule-whatsapp", { source: "hero" });
              return;
            }
            if (item.trackId) {
              trackUmami("cta-click", { cta: item.trackId, source: "hero" });
            }
          }}
        >
          {item.label}
        </MotionHoverLink>
      ))}
    </div>
  );
}
