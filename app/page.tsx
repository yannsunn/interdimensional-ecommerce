import { Portal } from '@/components/ultra-dimensional/Portal'
import { OptimizedFloatingElements } from '@/components/ultra-dimensional/OptimizedFloatingElements'
import { GlowingText, GlitchText } from '@/components/ultra-dimensional/GlowingText'
import { ProductCard } from '@/components/shop/ProductCard'
import { Header } from '@/components/layout/Header'
import { generateMysteryMessage } from '@/lib/utils'
import Image from 'next/image'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

async function getFeaturedProducts() {
  if (!process.env.DATABASE_URL) {
    return []
  }
  
  try {
    const { prisma } = await import('@/lib/db')
    return await prisma.product.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { mysteryLevel: 'desc' },
    })
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Ultra-Sync Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none -z-40" />
      
      {/* Header */}
      <Header />

      {/* Hero Section - Ultra Optimized */}
      <main className="relative">
        {/* Hero Container */}
        <section className="relative px-4 py-20 md:py-24 lg:py-32 min-h-screen flex items-center">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Hero Content */}
              <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  異次元通販
                </h1>
                
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium">
                  〜 宇宙と古代の叡智があなたの運命を変える！ 〜
                </p>

                <div className="inline-block bg-red-600 text-white py-3 px-6 rounded-lg border-2 border-yellow-400">
                  <div className="text-lg font-semibold">
                    ⚡ 緊急放送中！！本日限り、特別価格でご提供！！ ⚡
                  </div>
                </div>

                <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  量子レベルで人生を変える商品を異次元からお届け。<br />
                  <span className="text-yellow-200 font-semibold">龍神の加護</span>、
                  <span className="text-cyan-200 font-semibold">宇宙エネルギー</span>、
                  <span className="text-pink-200 font-semibold">古代の叡智</span>が今ここに！
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <a
                    href="#products"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🔮 運命の商品を見つける！ ✨
                  </a>
                  <a
                    href="/products"
                    className="border-2 border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🌌 全商品を見る →
                  </a>
                </div>
              </div>
              
              {/* Hero Image - Simplified */}
              <div className="order-1 lg:order-2 w-full max-w-lg mx-auto">
                <div className="relative aspect-square w-full max-w-md mx-auto">
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
                  
                  {/* Image Container */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-main.jpg"
                      alt="異次元通販 - 宇宙の叡智"
                      width={400}
                      height={400}
                      className="w-full h-full object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>

      {/* Mystery Message */}
      <section className="relative py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-yellow-900/30 border border-yellow-400 rounded-lg p-4 text-center backdrop-blur-sm">
            <div className="text-yellow-200 text-base md:text-lg font-medium">
              {generateMysteryMessage()}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="relative py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              🌟 異次元の力を秘めた特選商品 🌟
            </h2>
            <p className="text-lg text-gray-200">
              龍神も認めた！宇宙からのメッセージを受け取った商品たち
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/products"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold text-base hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              もっと異次元商品を見る →
            </a>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="relative py-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              🔮 異次元通販が選ばれる理由 🔮
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-5 bg-purple-900/30 rounded-lg border border-purple-400">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">量子レベルの効果</h3>
              <p className="text-gray-200 text-sm">
                DNAレベルから人生を書き換える
                革命的な商品をお届け
              </p>
            </div>

            <div className="text-center p-5 bg-pink-900/30 rounded-lg border border-pink-400">
              <div className="text-3xl mb-3">🐉</div>
              <h3 className="text-lg font-semibold text-pink-200 mb-2">龍神の加護</h3>
              <p className="text-gray-200 text-sm">
                古代より伝わる龍神の力で
                あなたを邪気から守護
              </p>
            </div>

            <div className="text-center p-5 bg-cyan-900/30 rounded-lg border border-cyan-400">
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-lg font-semibold text-cyan-200 mb-2">宇宙エネルギー</h3>
              <p className="text-gray-200 text-sm">
                宇宙の無限エネルギーを
                あなたの日常にお届け
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="relative py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-yellow-900/30 border border-yellow-400 rounded-lg p-4 text-center backdrop-blur-sm">
            <div className="text-yellow-200 text-xs md:text-sm leading-relaxed">
              ⚠️ 異次元通販の商品は全て異次元の技術を使用しています。<br />
              現次元の物理法則に従わない場合がございます。効果には個人差があります。
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-12 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            今すぐお電話を！異次元のオペレーターが24時間待機中！
          </h2>
          <div className="text-2xl md:text-4xl font-bold text-yellow-200 mb-3">
            📞 0120-XXX-XXXX
          </div>
          <p className="text-sm md:text-base text-gray-300 mb-6 opacity-80">
            受付時間：24時間365日（※パラレルワールドでは営業時間が異なります）
          </p>
          <div className="bg-cyan-900/30 border border-cyan-400 rounded-lg p-3 inline-block">
            <p className="text-cyan-200 text-sm">
              ご注文の方全員に「フラワーオブライフ」ステッカープレゼント！<br />
              古代エジプトの叡智があなたの波動を上げる！
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/60 border-t border-purple-500/30 py-6 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h3 className="text-xl font-bold text-white mb-3">
            異次元通販
          </h3>
          <p className="text-gray-400 mb-4 text-sm opacity-80">
            宇宙と古代の叡智があなたの運命を変える
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <a href="/terms" className="hover:text-purple-400 transition-colors">利用規約</a>
            <a href="/privacy" className="hover:text-purple-400 transition-colors">プライバシーポリシー</a>
            <a href="/contact" className="hover:text-purple-400 transition-colors">お問い合わせ</a>
          </div>
          <div className="mt-3 text-xs text-gray-600 opacity-60">
            © 2024 異次元通販. All rights reserved in all dimensions.
          </div>
        </div>
      </footer>
    </div>
  )
}