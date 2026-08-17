import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package.json lives above this directory; pin the root so Turbopack
  // does not walk out of the project looking for a lockfile.
  turbopack: { root: __dirname },
};

export default nextConfig;
