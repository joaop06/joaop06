import { MotionHoverLink } from "@/components/motion/MotionHoverLink";

export type HeroCta = {
  href: string;
  label: string;
  variant: "primary" | "glass";
  external?: boolean;
  download?: boolean;
};

type HeroCtasProps = {
  items: HeroCta[];
};

/** CTAs do hero com micro-hover Motion (F3.7). */
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
        >
          {item.label}
        </MotionHoverLink>
      ))}
    </div>
  );
}
