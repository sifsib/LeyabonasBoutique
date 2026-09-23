import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { logoDataUrl } from "@/lib/logo";

export const dynamic = "force-static";

export const alt = site.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const { width, height } = site.images.logo;
  const h = 470;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#010101", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={await logoDataUrl()} width={Math.round((h * width) / height)} height={h} alt="" />
      </div>
    ),
    size,
  );
}
