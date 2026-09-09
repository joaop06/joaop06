/**
 * Fallback estático da metáfora Órbita de Integrações (F4.8).
 * Usado com reduced-motion, WebGL indisponível ou falha de carregamento.
 * Ownership: CSS/SVG — sem Motion/GSAP neste nó.
 */
type HeroFallbackProps = {
  className?: string;
};

export function HeroFallback({ className }: HeroFallbackProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-orbit-core" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#hero-orbit-core)" />
      {/* Arcs */}
      <ellipse
        cx="200"
        cy="150"
        rx="118"
        ry="72"
        stroke="var(--accent)"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <ellipse
        cx="200"
        cy="150"
        rx="88"
        ry="52"
        stroke="var(--accent)"
        strokeOpacity="0.18"
        strokeWidth="1"
        transform="rotate(-18 200 150)"
      />
      {/* Spokes */}
      <path
        d="M200 150 L110 108 M200 150 L290 98 M200 150 L312 168 M200 150 L248 220 M200 150 L128 210"
        stroke="var(--accent)"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      {/* Core glass */}
      <rect
        x="168"
        y="118"
        width="64"
        height="64"
        rx="16"
        fill="color-mix(in oklab, var(--bg-elevated) 80%, transparent)"
        stroke="var(--border-glass, var(--accent))"
        strokeOpacity="0.55"
        strokeWidth="1.25"
      />
      <rect
        x="180"
        y="130"
        width="40"
        height="40"
        rx="10"
        fill="var(--accent)"
        fillOpacity="0.18"
      />
      {/* Orbit nodes */}
      <rect x="98" y="96" width="14" height="14" rx="3" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="282" y="86" width="12" height="12" rx="3" fill="var(--accent)" fillOpacity="0.45" />
      <circle cx="318" cy="168" r="7" fill="var(--accent)" fillOpacity="0.5" />
      <rect x="240" y="212" width="13" height="13" rx="3" fill="var(--accent)" fillOpacity="0.42" />
      <circle cx="122" cy="214" r="6.5" fill="var(--accent)" fillOpacity="0.48" />
    </svg>
  );
}
