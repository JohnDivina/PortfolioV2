import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [
      { pathname: '/assets/**' },
      { pathname: '/experience/**' },
      { pathname: '/projects/**' },
      { pathname: '/ip/**' },
    ],
  },
};

export default nextConfig;
