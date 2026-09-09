import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Screenshots are captured locally by `npm run shots`; the optimizer only
    // needs to resize and re-encode files already in public/work.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
