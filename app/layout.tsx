import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from '../components/Providers'
import { BottomNavigation } from '../components/mobile/BottomNavigation'

// クリーンなメタデータ設定
export const metadata: Metadata = {
  metadataBase: new URL('https://interdimensional-shop.vercel.app'),
  title: '異次元通販 - 宇宙と古代の叡智があなたの運命を変える',
  description: '量子レベルで人生を変える異次元商品をお届け。龍神の加護、宇宙エネルギー、古代の叡智が今ここに。',
  keywords: ['異次元通販', '量子商品', '龍神', '宇宙エネルギー', '古代の叡智', 'スピリチュアル'],
  authors: [{ name: '異次元通販運営チーム' }],
  creator: '異次元通販',
  publisher: '異次元通販',
  robots: 'index, follow',
  openGraph: {
    title: '異次元通販 - 宇宙と古代の叡智があなたの運命を変える',
    description: '量子レベルで人生を変える異次元商品をお届け',
    url: 'https://interdimensional-shop.vercel.app',
    siteName: '異次元通販',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '異次元通販 - 宇宙からの贈り物',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '異次元通販',
    description: '量子レベルで人生を変える異次元商品をお届け',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-black text-white selection:bg-purple-500/30 selection:text-purple-200" suppressHydrationWarning>
        {/* アクセシビリティ */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
        >
          メインコンテンツへスキップ
        </a>
        
        {/* メインコンテンツ */}
        <main id="main-content" className="relative min-h-screen">
          <Providers>
            {children}
            {/* Mobile Bottom Navigation */}
            <BottomNavigation />
          </Providers>
        </main>
        
        {/* アナリティクス */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}