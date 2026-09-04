import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
allowedDevOrigins: ["172.29.112.1"],

  images: {
    unoptimized: true,
  },
};

export default nextConfig;