import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

/** The logo as a data URL, for build-time generated images (OG card, favicon). */
export async function logoDataUrl() {
  const file = await readFile(path.join(process.cwd(), "public", site.images.logo.src));
  return `data:image/png;base64,${file.toString("base64")}`;
}
