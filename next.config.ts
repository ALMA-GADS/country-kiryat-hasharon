import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/:path*", destination: "https://ks-lp26.vercel.app/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
