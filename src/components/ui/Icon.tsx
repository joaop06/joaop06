import type { LucideIcon, LucideProps } from "lucide-react";

const DEFAULT_STROKE = 1.5;

export type IconProps = LucideProps & {
  icon: LucideIcon;
};

/** Wrapper Lucide com strokeWidth global (F1.10). */
export function Icon({
  icon: IconComp,
  strokeWidth = DEFAULT_STROKE,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <IconComp
      strokeWidth={strokeWidth}
      aria-hidden={ariaLabel ? ariaHidden : true}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
