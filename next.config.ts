import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyrz1l31c0.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
