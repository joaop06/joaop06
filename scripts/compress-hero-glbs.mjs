/**
 * Comprime GLBs do hero com gltf-transform (dedup / weld / meshopt).
 * Uso: node scripts/compress-hero-glbs.mjs
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const heroDir = join(root, "public/models/hero");

const BUDGET = {
  "core.glb": 180 * 1024,
  "nodes.glb": 280 * 1024,
};

async function compress() {
  let NodeIO;
  let dedup;
  let weld;
  let prune;
  let meshopt;
  let MeshoptEncoder;
  let ALL_EXTENSIONS;

  try {
    ({ NodeIO } = await import("@gltf-transform/core"));
    ({ dedup, weld, prune, meshopt } = await import(
      "@gltf-transform/functions"
    ));
    ({ ALL_EXTENSIONS } = await import("@gltf-transform/extensions"));
    ({ MeshoptEncoder } = await import("meshoptimizer"));
  } catch (err) {
    console.warn(
      "[compress-hero-glbs] gltf-transform/meshoptimizer não instalados — skip.",
      err?.message ?? err,
    );
    process.exit(0);
  }

  await MeshoptEncoder.ready;

  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({ "meshopt.encoder": MeshoptEncoder });

  for (const name of Object.keys(BUDGET)) {
    const path = join(heroDir, name);
    if (!existsSync(path)) {
      console.warn("missing", path);
      continue;
    }
    const before = readFileSync(path).byteLength;
    const doc = await io.read(path);
    await doc.transform(
      dedup(),
      weld(),
      prune(),
      meshopt({ encoder: MeshoptEncoder, level: "medium" }),
    );

    mkdirSync(heroDir, { recursive: true });
    const out = await io.writeBinary(doc);
    writeFileSync(path, Buffer.from(out));
    const after = out.byteLength;
    const max = BUDGET[name];
    console.log(
      `${name}: ${before} → ${after} bytes (budget ${max})${after > max ? " OVER BUDGET" : " ok"}`,
    );
    if (after > max) {
      console.error(`[compress-hero-glbs] ${name} exceeds budget`);
      process.exitCode = 1;
    }
  }
}

await compress();
