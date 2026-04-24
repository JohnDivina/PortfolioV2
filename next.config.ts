import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [{ pathname: '/assets/**' }],
  },
};

export default nextConfig;
