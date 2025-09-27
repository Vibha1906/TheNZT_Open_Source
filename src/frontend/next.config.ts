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
  
  // Static export configuration
  output: 'export',
  
  // Additional configurations for your project
  experimental: {
    // Enable if you need server components with static export
    esmExternals: 'loose',
  },
  
  // Webpack configuration for handling specific file types
  webpack: (config, { isServer }) => {
    // Handle CSV files (you have @loaders.gl/csv)
    config.module.rules.push({
      test: /\.csv$/,
      use: 'raw-loader',
    });
    
    // Handle GeoJSON files (you have area-boundaries.geojson)
    config.module.rules.push({
      test: /\.geojson$/,
      use: 'json-loader',
    });
    
    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Environment variables configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
