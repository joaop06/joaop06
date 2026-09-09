/**
 * Fallback estático da metáfora Órbita de Integrações.
 * Silhuetas alinhadas aos nós hard-surface (api/db/queue/commerce/erp).
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
        <radialGradient id="hero-orbit-core" cx="50%" cy="42%" r="42%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Glow suave — sem rect de painel; fundo = página */}
      <ellipse
        cx="200"
        cy="140"
        rx="160"
        ry="110"
        fill="url(#hero-orbit-core)"
      />

      {/* Rings — 1 solid + dashed feel */}
      <ellipse
        cx="200"
        cy="140"
        rx="128"
        ry="78"
        stroke="var(--accent)"
        strokeOpacity="0.32"
        strokeWidth="2"
      />
      <ellipse
        cx="200"
        cy="140"
        rx="98"
        ry="58"
        stroke="var(--accent)"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        transform="rotate(-22 200 140)"
      />
      <ellipse
        cx="200"
        cy="140"
        rx="148"
        ry="52"
        stroke="var(--accent)"
        strokeOpacity="0.16"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        transform="rotate(28 200 140)"
      />

      {/* Energy spokes — thicker */}
      <path
        d="M200 140 L108 102 M200 140 L292 92 M200 140 L322 158 M200 140 L252 228 M200 140 L118 218"
        stroke="var(--accent)"
        strokeOpacity="0.38"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Core shell + inner */}
      <polygon
        points="200,96 238,116 238,164 200,184 162,164 162,116"
        fill="url(#hero-glass)"
        stroke="var(--border-glass, var(--accent))"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <polygon
        points="200,118 218,130 218,150 200,162 182,150 182,130"
        fill="var(--accent)"
        fillOpacity="0.45"
      />

      {/* Node_api — faceted diamond */}
      <polygon
        points="108,88 118,78 128,88 118,102"
        fill="var(--accent)"
        fillOpacity="0.62"
      />
      <circle cx="118" cy="88" r="3" fill="var(--accent)" fillOpacity="0.9" />

      {/* Node_db — stacked disks */}
      <g fill="var(--accent)" fillOpacity="0.55">
        <rect x="284" y="80" width="16" height="5" rx="2" />
        <rect x="284" y="88" width="16" height="5" rx="2" />
        <rect x="284" y="96" width="16" height="5" rx="2" />
      </g>

      {/* Node_queue — slotted cube */}
      <rect
        x="310"
        y="148"
        width="16"
        height="16"
        rx="2"
        fill="var(--accent)"
        fillOpacity="0.52"
      />
      <rect
        x="314"
        y="153"
        width="8"
        height="6"
        rx="1"
        fill="var(--bg-elevated)"
        fillOpacity="0.7"
      />

      {/* Node_commerce — prism + tag */}
      <polygon
        points="248,228 258,208 268,228"
        fill="var(--accent)"
        fillOpacity="0.5"
      />
      <rect
        x="262"
        y="214"
        width="10"
        height="6"
        rx="1"
        fill="var(--accent)"
        fillOpacity="0.75"
        transform="rotate(-20 267 217)"
      />

      {/* Node_erp — hub with ports */}
      <circle cx="118" cy="216" r="8" fill="var(--accent)" fillOpacity="0.55" />
      <circle cx="118" cy="208" r="2.5" fill="var(--accent)" fillOpacity="0.85" />
      <circle cx="126" cy="216" r="2.5" fill="var(--accent)" fillOpacity="0.85" />
      <circle cx="110" cy="216" r="2.5" fill="var(--accent)" fillOpacity="0.85" />
      <circle cx="118" cy="224" r="2.5" fill="var(--accent)" fillOpacity="0.85" />
    </svg>
  );
}
