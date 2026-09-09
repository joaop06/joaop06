# Hero GLB export spec

Metáfora: **Órbita de Integrações**. Assets em `public/models/hero/`.

## Budget (pós-compressão)

| Asset | Max |
|-------|-----|
| `core.glb` | 180 KB |
| `nodes.glb` (atlas) | 280 KB |
| Texturas | evitar; se PBR, ≤256² / KTX2; total ≤ ~150 KB |

## Critérios de aceite

- Desktop (≥2× DPR, tier high): silhuetas do core/nós sem serrilhado óbvio.
- Core e cada nó reconhecíveis por silhueta (teste mental: silhueta 64px distingue api/db/queue/commerce/erp).
- Mobile coarse (tier low): ≥30 FPS; desktop high: ≥55 FPS com bloom.
- Fallback SVG alinhado às silhuetas 3D; LCP do hero não regride (SVG first paint; WebGL diferido).

## Art direction — hard-surface product viz

- **Família:** hard-surface, bevel 0.5–1.5 mm (1u = 1 m), nós com raio envolvente ~0.12–0.16.
- **Core:** cristal/reator — `Core_Shell` (glass/transmission) + `Core_Inner` (emissivo sólido). Legacy `Core` ainda suportado.
- **Hierarquia de detalhe:** (1) silhueta 2 m → (2) bevels/ports 0.5 m → (3) micro só no hover.

| ID | Metáfora | Forma alvo |
|----|----------|------------|
| `Node_api` | gateway facetado | octaedro com bevel + inset equatorial |
| `Node_db` | stacked storage | 3 discos empilhados + chanfro |
| `Node_queue` | buffer | cubo com slot frontal + ranhuras |
| `Node_commerce` | tag abstrato | prisma facetado + “tag” extrudada |
| `Node_erp` | hub modular | geodesic baixa + 4 plug ports |

## Naming / escala

- Origin no centro; Core bounding ≈ 0.55; Nodes ≈ 0.12–0.16.
- Forward +Z, up +Y (glTF). Sem armature; motion no R3F.
- Sufixos opcionais: `_Emissive` → material emissivo accent; filhos `Node_*_Body` / `Node_*_Port`.

## Pipeline

```
assets/hero/blender/     # fonte Blender (opcional LFS)
public/models/hero/      # GLBs finais
scripts/generate-hero-glbs.mjs   # placeholders hard-surface procedurais
scripts/compress-hero-glbs.mjs   # gltf-transform (dedup/weld/meshopt)
```

```bash
npm run hero:glbs
npm run hero:compress
```

## Blender checklist

1. Scale: 1 unit = 1 m; Apply Scale/Rotation
2. Origin at geometry center
3. Bevel + Weighted Normal; Apply before export; Auto Smooth 30–45°
4. UV unwrap mínimo (prepara maps futuros)
5. Export glTF 2.0 Binary (+Y up); depois `npm run hero:compress`
6. Materiais no arquivo são placeholders — runtime aplica tema

## Runtime

- `useGLTF` + Suspense; preload só após gate WebGL
- Fallback procedural elevado se load falhar
- Não mutar cache do loader; dispose só materiais criados no runtime
- Tier via `useRenderTier` (low/mid/high): DPR, MSAA, bloom, env, tube links
- Meshopt: decoder em `/draco/meshopt_decoder.js` se GLB comprimido
