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

      {/* Hero Section - PC Optimized */}
      <main className="relative">
        <section className="relative px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:py-32 min-h-screen flex items-center">
          <div className="container mx-auto max-w-screen-2xl w-full">
            {/* PC-First Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
              
              {/* Hero Content - Wider on PC */}
              <div className="lg:col-span-7 xl:col-span-6 text-center lg:text-left space-y-8 lg:space-y-10 order-2 lg:order-1">
                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight tracking-tight">
                    異次元通販
                  </h1>
                  
                  <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-200 font-medium leading-relaxed">
                    〜 宇宙と古代の叡智があなたの運命を変える！ 〜
                  </p>
                </div>

                {/* Alert Banner */}
                <div className="inline-block bg-red-600 text-white py-4 px-8 lg:py-5 lg:px-10 rounded-xl border-2 border-yellow-400 shadow-2xl">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold">
                    ⚡ 緊急放送中！！本日限り、特別価格でご提供！！ ⚡
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-100 leading-relaxed max-w-4xl mx-auto lg:mx-0">
                    量子レベルで人生を変える商品を異次元からお届け。
                  </p>
                  
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto lg:mx-0">
                    <span className="text-yellow-300 font-bold text-2xl lg:text-3xl xl:text-4xl">龍神の加護</span>、
                    <span className="text-cyan-300 font-bold text-2xl lg:text-3xl xl:text-4xl">宇宙エネルギー</span>、
                    <span className="text-pink-300 font-bold text-2xl lg:text-3xl xl:text-4xl">古代の叡智</span>が今ここに！
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center lg:justify-start pt-4">
                  <a
                    href="#products"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-5 lg:px-12 lg:py-6 rounded-xl font-bold text-xl lg:text-2xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1"
                  >
                    🔮 運命の商品を見つける！ ✨
                  </a>
                  <a
                    href="/products"
                    className="border-4 border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-400 px-10 py-5 lg:px-12 lg:py-6 rounded-xl font-bold text-xl lg:text-2xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    🌌 全商品を見る →
                  </a>
                </div>
              </div>
              
              {/* Hero Image - PC Optimized */}
              <div className="lg:col-span-5 xl:col-span-6 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                  {/* Enhanced Background Effects */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-full blur-3xl opacity-75 animate-pulse"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-500/20 rounded-full blur-2xl"></div>
                  
                  {/* Image Container */}
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/images/hero-main.jpg"
                      alt="異次元通販 - 宇宙の叡智"
                      width={600}
                      height={600}
                      className="w-full h-full object-contain drop-shadow-2xl filter brightness-90 contrast-110 saturate-110"
                      priority
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                  
                  {/* Floating Elements for PC */}
                  <div className="hidden lg:block absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
                  <div 
                    className="hidden lg:block absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce" 
                    style={{ animationDelay: '1s' }}
                  ></div>
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