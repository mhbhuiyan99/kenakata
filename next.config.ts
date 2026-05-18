import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // allows all hosts (fine for dev)
    ],
  },
};

export default nextConfig;
