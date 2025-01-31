import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zdnxhxcmmcreiopojftp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
