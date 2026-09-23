import { IMAGE_WIDTHS } from "./image-widths.mjs";

// Maps /images/x/y.png at a requested width to the pre-generated /_img/images/x/y-<w>.webp.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const w = IMAGE_WIDTHS.find((x) => x >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `/_img${src.replace(/\.\w+$/, "")}-${w}.webp`;
}
