import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '異次元通販 - 宇宙と古代の叡智があなたの運命を変える！',
  description: '量子レベルで人生を変える商品を異次元からお届け。龍神の加護、宇宙エネルギー、古代の叡智が今ここに！',
  keywords: '異次元通販, スピリチュアル, 波動, エネルギー, 龍神, 量子, ヒーリング',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}