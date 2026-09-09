# Motion ownership map (F3.9)

Regra crítica (§0): **nunca** animar o mesmo nó DOM com Motion e GSAP ao mesmo tempo.

| Elemento / seletor | Owner | Biblioteca | Notas |
|--------------------|-------|------------|--------|
| `html` / viewport scroll | Lenis | `lenis` | Smooth scroll; desligado se `prefers-reduced-motion` |
| `[data-chapter]` (wrappers de seção) | GSAP | `gsap` + ScrollTrigger | Entrada opacity/y; **proibido** Motion |
| `[data-timeline-progress]` | GSAP / CSS | ScrollTrigger + style | Altura da linha de progresso |
| `[data-timeline-marker]` | CSS / JS | classes | Estado ativo via ScrollRuntime |
| Nav links / progress dot | CSS | classes + event | `portfolio:section`; hover Motion ok no `<a>` |
| CTAs hero `[data-motion-hover="cta"]` | Motion | `motion` | whileHover/whileTap apenas |
| Links de projetos `[data-motion-hover="project"]` | Motion | `motion` | escala/opacity sutis |
| `ThemeToggle` / `LanguageSwitcher` | Motion | `motion` | microfeedback no botão |
| Canvas hero 3D (`[data-hero-3d]`, F4/F5) | R3F | three / `@react-three/fiber` (+ drei / postprocessing) | Import diferido pós-interação/idle; wrapper DOM estático; `frameloop="always"` quando visível e `"never"` offscreen/`document.hidden`; qualidade via `useRenderTier`; GLB em `/models/hero/` |
| Detalhe dos nós (`NodeDetailPanel`) | React DOM / CSS | — | Fora do canvas; hover/focus/teclado; sem GSAP no mesmo nó |
| Fallback SVG hero (`HeroFallback`) | CSS/SVG | — | reduced-motion / sem WebGL; sem animação JS |
| Easter eggs overlays | Motion ou CSS | isolados | Nós próprios; sem GSAP no mesmo nó |

## Convenções

- GSAP: ownership de scroll/timeline de seções (`data-chapter`).
- Motion: hover, focus, mount/unmount de islands isoladas.
- CSS: tema, glass, transitions de cor, foco `:focus-visible`.
- R3F: clock compartilhado `useOrbitClock`; não animar o host DOM do canvas com Motion/GSAP.
