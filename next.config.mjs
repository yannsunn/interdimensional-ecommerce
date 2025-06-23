/** @type {import('next').NextConfig} */
const nextConfig = {
  // FORCE VERCEL RECOGNITION - NUCLEAR OPTION
  generateBuildId: () => `build-${Date.now()}-FORCE-REBUILD`,
  poweredByHeader: false,
  // React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable optimized CSS loading
    optimizeCss: true,
    // Server Components optimization
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Enable partial prerendering for better performance
    ppr: true,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },
  
  // Rewrites for cleaner URLs
  async rewrites() {
    return [
      {
        source: '/api/stripe',
        destination: '/api/webhook/stripe',
      },
    ]
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    // Tree shaking optimization
    config.optimization.sideEffects = false
    
    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      )
    }
    
    return config
  },
}

export default nextConfig