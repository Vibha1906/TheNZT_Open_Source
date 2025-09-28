import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // React configuration
  reactStrictMode: false, // You have this disabled, which is fine for development
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true, // You have this enabled
  },
  
  // Image configuration - required for static export
  images: {
    unoptimized: true, // Required when using output: 'export'
    domains: [], // Add any external image domains here if needed
  },
  
  // URL configuration
  trailingSlash: false,
  
  
  // Additional configurations for your project
  experimental: {
    // Enable if you need server components with static export
    esmExternals: 'loose',
  },
  
  // Allow production builds to complete even if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Environment variables configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
