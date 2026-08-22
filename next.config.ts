import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ramx.in",
        pathname: "/blog/og/fafo-learning.png",
      },
    ],
  },
};

export default nextConfig;
