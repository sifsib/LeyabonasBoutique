import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { logoDataUrl } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const { width, height } = site.images.logo;
  const h = 164;
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
