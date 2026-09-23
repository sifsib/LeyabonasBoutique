import type { NextConfig } from "next";

const demo = process.env.NEXT_PUBLIC_DEMO !== "false";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async headers() {
    if (!demo) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
