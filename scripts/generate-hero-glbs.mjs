/**
 * Gera GLBs hard-surface procedurais do hero (placeholders de produção).
 * Core: Core_Shell + Core_Inner. Nodes: silhuetas icônicas por tipo.
 * Uso: node scripts/generate-hero-glbs.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

globalThis.FileReader = class FileReader {
  result = null;
  onloadend = null;
  onload = null;
  onerror = null;
  readAsArrayBuffer(blob) {
    Promise.resolve(blob.arrayBuffer())
      .then((buf) => {
        this.result = buf;
        const ev = { target: this };
        this.onload?.(ev);
        this.onloadend?.(ev);
      })
      .catch((err) => this.onerror?.(err));
  }
};

function exportGLB(root, outPath) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      root,
      (result) => {
        mkdirSync(dirname(outPath), { recursive: true });
        const buf = Buffer.from(result);
        writeFileSync(outPath, buf);
        console.log("wrote", outPath, buf.length, "bytes");
        resolve();
      },
      (err) => reject(err),
      { binary: true },
    );
  });
}

function mat(opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: 0x5eb3c2,
    metalness: 0.4,
    roughness: 0.3,
    ...opts,
  });
}

function merge(...geos) {
  const cleaned = geos.map((g) => {
    const c = g.index ? g : g.toNonIndexed();
    c.computeVertexNormals();
    return c;
  });
  const merged = mergeGeometries(cleaned, false);
  for (const g of geos) g.dispose();
  return merged;
}

/** Octaedro com bevel via subdivision + torus inset equatorial. */
function buildApi() {
  const group = new THREE.Group();
  group.name = "Node_api";

  const body = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.14, 3),
    mat({ metalness: 0.55, roughness: 0.28 }),
  );
  body.name = "Node_api_Body";

  const inset = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.012, 10, 24),
    mat({ metalness: 0.7, roughness: 0.2 }),
  );
  inset.rotation.x = Math.PI / 2;
  inset.name = "Node_api_Port";

  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 12, 12),
    mat({ metalness: 0.2, roughness: 0.35 }),
  );
  tip.position.y = 0.12;
  tip.name = "Node_api_Emissive";

  group.add(body, inset, tip);
  return group;
}

/** 3 discos empilhados (storage). */
function buildDb() {
  const group = new THREE.Group();
  group.name = "Node_db";
  const heights = [-0.055, 0, 0.055];
  heights.forEach((y, i) => {
    const disk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.04, 24),
      mat({ metalness: 0.2, roughness: 0.45 }),
    );
    disk.position.y = y;
    disk.name = i === 1 ? "Node_db_Body" : `Node_db_Disk_${i}`;
    group.add(disk);
    if (i < 2) {
      const spacer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.012, 16),
        mat({ metalness: 0.5, roughness: 0.3 }),
      );
      spacer.position.y = y + 0.026;
      group.add(spacer);
    }
  });
  return group;
}

/** Cubo com slot frontal + ranhuras laterais. */
function buildQueue() {
  const group = new THREE.Group();
  group.name = "Node_queue";

  const bodyGeo = merge(
    new THREE.BoxGeometry(0.15, 0.15, 0.15),
    (() => {
      const g = new THREE.BoxGeometry(0.08, 0.06, 0.04);
      g.translate(0, 0, 0.085);
      return g;
    })(),
  );
  // Carve look: subtractive via darker inset panel
  const body = new THREE.Mesh(bodyGeo, mat({ metalness: 0.7, roughness: 0.2 }));
  body.name = "Node_queue_Body";

  const slot = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.05, 0.02),
    mat({ metalness: 0.3, roughness: 0.5 }),
  );
  slot.position.z = 0.076;
  slot.name = "Node_queue_Slot";

  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const groove = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 0.1, 0.02),
        mat({ metalness: 0.5, roughness: 0.35 }),
      );
      groove.position.set(side * 0.078, (i - 1) * 0.035, 0);
      group.add(groove);
    }
  }

  group.add(body, slot);
  return group;
}

/** Prisma facetado + tag extrudada. */
function buildCommerce() {
  const group = new THREE.Group();
  group.name = "Node_commerce";

  const body = new THREE.Mesh(
    new THREE.ConeGeometry(0.11, 0.17, 6),
    mat({ metalness: 0.35, roughness: 0.38 }),
  );
  body.name = "Node_commerce_Body";

  const tag = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.035, 0.012),
    mat({ metalness: 0.6, roughness: 0.25 }),
  );
  tag.position.set(0.07, 0.02, 0.04);
  tag.rotation.z = -0.35;
  tag.name = "Node_commerce_Tag";

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.02, 0.006, 8, 16),
    mat({ metalness: 0.8, roughness: 0.15 }),
  );
  ring.position.set(0.095, 0.04, 0.04);
  ring.rotation.y = Math.PI / 2;
  ring.name = "Node_commerce_Emissive";

  group.add(body, tag, ring);
  return group;
}

/** Geodesic + 4 plug ports. */
function buildErp() {
  const group = new THREE.Group();
  group.name = "Node_erp";

  const body = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.115, 2),
    mat({ metalness: 0.45, roughness: 0.32 }),
  );
  body.name = "Node_erp_Body";

  const dirs = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
  ];
  dirs.forEach((d, i) => {
    const port = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.028, 0.04, 10),
      mat({ metalness: 0.7, roughness: 0.2 }),
    );
    port.position.set(d[0] * 0.11, d[1] * 0.11, d[2] * 0.11);
    if (d[0] !== 0) port.rotation.z = Math.PI / 2;
    port.name = i === 0 ? "Node_erp_Emissive" : `Node_erp_Port_${i}`;
    group.add(port);
  });

  group.add(body);
  return group;
}

{
  const group = new THREE.Group();
  group.name = "CoreRoot";

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.55, 5),
    new THREE.MeshStandardMaterial({
      color: 0xb8d4da,
      metalness: 0.05,
      roughness: 0.12,
    }),
  );
  shell.name = "Core_Shell";

  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.24, 3),
    new THREE.MeshStandardMaterial({
      color: 0x5eb3c2,
      metalness: 0.1,
      roughness: 0.4,
      emissive: 0x5eb3c2,
      emissiveIntensity: 0.8,
    }),
  );
  inner.name = "Core_Inner";

  // Legacy alias mesh (empty) kept as named empty for tools that look for "Core"
  const legacy = new THREE.Object3D();
  legacy.name = "Core";

  group.add(shell, inner, legacy);
  await exportGLB(group, "public/models/hero/core.glb");
}

{
  const group = new THREE.Group();
  group.name = "Nodes";
  group.add(buildApi(), buildDb(), buildQueue(), buildCommerce(), buildErp());
  await exportGLB(group, "public/models/hero/nodes.glb");
}

console.log("done");
