import type { NextConfig } from "next";
import { LEGACY_PHOTO_IDS, remotePhotoUrl } from "./src/lib/image-sources";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // Existing files in public/ win. Missing files from an incomplete
      // deployment resolve to their original photograph rather than 404 HTML.
      // Explicit paths only: this is not an unrestricted image proxy.
      afterFiles: Object.entries(LEGACY_PHOTO_IDS).map(([source, id]) => ({
        source,
        destination: remotePhotoUrl(id, 1600),
      })),
      fallback: [],
    };
  },
};

export default nextConfig;
