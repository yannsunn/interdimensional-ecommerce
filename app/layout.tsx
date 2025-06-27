import type { Metadata, Viewport } from 'next'
// フォントを一時的に無効化してビルドエラーを回避
// import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { validateEnvironmentVariables } from '@/lib/security'

// 環境変数の検証（実行時のみ）
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  try {
    const { valid, missing } = validateEnvironmentVariables()
    if (!valid) {
      console.warn('Missing environment variables:', missing)
    }
  } catch (error) {
    console.warn('Environment validation skipped during build')
  }
}

// Font optimization with variable fonts - 一時的に無効化
// const inter = Inter({ 
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
//   preload: true,
// })

// const notoSansJP = Noto_Sans_JP({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '700', '900'],
//   display: 'swap',
//   variable: '--font-noto-sans-jp',
//   preload: true,
// })

// Enhanced metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://interdimensional-shop.vercel.app'),
  title: {
    default: '異次元通販 - 宇宙と古代の叡智があなたの運命を変える',
    template: '%s | 異次元通販'
  },
  description: '量子レベルで人生を変える異次元商品をお届け。龍神の加護、宇宙エネルギー、古代の叡智が今ここに。',
  keywords: ['異次元通販', '量子商品', '龍神', '宇宙エネルギー', '古代の叡智', 'スピリチュアル'],
  authors: [{ name: '異次元通販運営チーム' }],
  creator: '異次元通販',
  publisher: '異次元通販',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '異次元通販 - 宇宙と古代の叡智があなたの運命を変える',
    description: '量子レベルで人生を変える異次元商品をお届け',
    url: 'https://interdimensional-shop.vercel.app',
    siteName: '異次元通販',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '異次元通販 - 宇宙からの贈り物',
      }
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '異次元通販',
    description: '量子レベルで人生を変える異次元商品をお届け',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://interdimensional-shop.vercel.app',
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="ja" 
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        {/* PWA meta tags */}
        <meta name="application-name" content="異次元通販" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="異次元通販" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '異次元通販',
              description: '量子レベルで人生を変える異次元商品をお届け',
              url: 'https://interdimensional-shop.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://interdimensional-shop.vercel.app/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body 
        className="font-sans antialiased bg-black text-white selection:bg-purple-500/30 selection:text-purple-200"
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <Providers>
            {/* Skip to main content for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50">
              メインコンテンツへスキップ
            </a>
            
            <main id="main-content" className="relative min-h-screen">
              {children}
            </main>
            
            {/* Performance monitoring */}
            <SpeedInsights />
            <Analytics />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}