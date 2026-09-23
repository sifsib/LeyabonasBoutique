// Writes WebP copies of everything in public/images at each width in IMAGE_WIDTHS,
// to public/_img/images/... Only needed for static hosting; Vercel optimises on demand.
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS } from "../lib/image-widths.mjs";

const SRC = "public/images";
const OUT = "public/_img/images";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name)) yield p;
  }
}

let count = 0;
for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(/\.\w+$/, "");
  const { width: srcW } = await sharp(file).metadata();
  const srcTime = (await stat(file)).mtimeMs;
  await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true });
  for (const w of IMAGE_WIDTHS) {
    const out = path.join(OUT, `${rel}-${w}.webp`);
    const fresh = await stat(out).then((s) => s.mtimeMs >= srcTime).catch(() => false);
    if (fresh) continue;
    // Never upscale: widths above the source reuse the source size under that name.
    await sharp(file).resize({ width: Math.min(w, srcW) }).webp({ quality: 72 }).toFile(out);
    count++;
  }
}
console.log(`optimize-images: wrote ${count} files to ${OUT}`);
