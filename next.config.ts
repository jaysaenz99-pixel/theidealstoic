import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ImageKit already resizes and compresses, so Next only needs permission to
    // serve the URLs. Every ImageKit account is served from this host.
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
  },
};

export default nextConfig;
