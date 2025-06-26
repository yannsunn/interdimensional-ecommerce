import { Portal } from '@/components/effects/Portal'
import { OptimizedFloatingElements } from '@/components/effects/OptimizedFloatingElements'
import { GlowingText, GlitchText } from '@/components/effects/GlowingText'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10" />
      {/* Interdimensional Portal Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <Image
          src="/images/portal-bg.jpg"
          alt="Interdimensional Portal Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <Portal />
      <OptimizedFloatingElements />
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center text-center px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Hero Image */}
          <div className="flex-1 relative order-2 lg:order-1">
            <div className="relative w-full max-w-lg lg:max-w-2xl mx-auto aspect-square">
              <Image
                src="/images/hero-main.jpg"
                alt="異次元通販 - 宇宙の叡智"
                fill
                className="object-contain drop-shadow-2xl filter brightness-75 contrast-90 opacity-80"
                priority
              />
              {/* Subtle Glowing Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-blue-400/5 rounded-full blur-3xl animate-ping" style={{animationDuration: '3s'}} />
              {/* Rotating Energy Ring */}
              <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full animate-spin opacity-30" style={{animationDuration: '8s', mask: 'conic-gradient(transparent 30deg, black 60deg, transparent 90deg)'}} />
            </div>
          </div>
          
          {/* Hero Text */}
          <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
            <GlowingText className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              異次元通販
            </GlowingText>
          
            <GlitchText className="text-lg md:text-xl lg:text-2xl mb-6 text-cyan-300 font-medium opacity-90">
              〜 宇宙と古代の叡智があなたの運命を変える！ 〜
            </GlitchText>

            <div className="bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-sm text-white py-3 px-6 rounded-lg mb-6 border border-yellow-400/50 shadow-lg">
              <div className="text-lg font-semibold flex items-center justify-center gap-2">
                <span className="animate-bounce">⚡</span>
                緊急放送中！！本日限り、特別価格でご提供！！
                <span className="animate-bounce">⚡</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed opacity-90">
              量子レベルで人生を変える商品を異次元からお届け。<br />
              <span className="text-yellow-300 font-medium">龍神の加護</span>、
              <span className="text-cyan-300 font-medium">宇宙エネルギー</span>、
              <span className="text-pink-300 font-medium">古代の叡智</span>が今ここに！
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a
                href="#products"
                className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="animate-pulse">🔮</span>
                  運命の商品を見つける！
                  <span className="animate-pulse">✨</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
              </a>
              <a
                href="/products"
                className="group border-2 border-cyan-400/70 text-cyan-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-400/20 hover:border-cyan-300 transition-all duration-300 relative overflow-hidden shadow-lg backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>🌌</span>
                  全商品を見る
                  <span>→</span>
                </span>
                <div className="absolute inset-0 bg-cyan-400/10 group-hover:bg-cyan-400 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mystery Message */}
      <section className="relative z-10 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/50 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-yellow-300 text-base md:text-lg font-medium">
              {generateMysteryMessage()}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <GlowingText className="text-3xl md:text-4xl font-bold mb-3 text-purple-400">
              🌟 異次元の力を秘めた特選商品 🌟
            </GlowingText>
            <p className="text-lg text-gray-300 opacity-90">
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
      <section className="relative z-10 py-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <GlowingText className="text-2xl md:text-3xl font-bold mb-3 text-pink-400">
              🔮 異次元通販が選ばれる理由 🔮
            </GlowingText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-5 bg-black/20 rounded-xl border border-purple-500/50 backdrop-blur-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">量子レベルの効果</h3>
              <p className="text-gray-300 text-sm opacity-90">
                DNAレベルから人生を書き換える
                革命的な商品をお届け
              </p>
            </div>

            <div className="text-center p-5 bg-black/20 rounded-xl border border-pink-500/50 backdrop-blur-sm">
              <div className="text-3xl mb-3">🐉</div>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">龍神の加護</h3>
              <p className="text-gray-300 text-sm opacity-90">
                古代より伝わる龍神の力で
                あなたを邪気から守護
              </p>
            </div>

            <div className="text-center p-5 bg-black/20 rounded-xl border border-cyan-500/50 backdrop-blur-sm">
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">宇宙エネルギー</h3>
              <p className="text-gray-300 text-sm opacity-90">
                宇宙の無限エネルギーを
                あなたの日常にお届け
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="relative z-10 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-yellow-400/10 to-red-400/10 border border-yellow-400/50 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-yellow-300/80 text-xs md:text-sm leading-relaxed">
              ⚠️ 異次元通販の商品は全て異次元の技術を使用しています。<br />
              現次元の物理法則に従わない場合がございます。効果には個人差があります。
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-12 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <GlowingText className="text-2xl md:text-3xl font-bold mb-3 text-yellow-400">
            今すぐお電話を！異次元のオペレーターが24時間待機中！
          </GlowingText>
          <div className="text-2xl md:text-4xl font-bold text-pink-400 mb-3">
            📞 0120-XXX-XXXX
          </div>
          <p className="text-sm md:text-base text-gray-300 mb-6 opacity-80">
            受付時間：24時間365日（※パラレルワールドでは営業時間が異なります）
          </p>
          <div className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/50 rounded-xl p-3 inline-block backdrop-blur-sm">
            <p className="text-cyan-300 text-sm">
              ご注文の方全員に「フラワーオブライフ」ステッカープレゼント！<br />
              古代エジプトの叡智があなたの波動を上げる！
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 border-t border-purple-500/30 py-6 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <GlowingText className="text-xl font-bold text-purple-400 mb-3">
            異次元通販
          </GlowingText>
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