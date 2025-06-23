import { Portal } from '@/components/effects/Portal'
import { FloatingElements } from '@/components/effects/FloatingElements'
import { GlowingText, GlitchText } from '@/components/effects/GlowingText'
import { ProductCard } from '@/components/shop/ProductCard'
import { Header } from '@/components/layout/Header'
import SafeDatabase from '@/lib/db-safe'
import { generateMysteryMessage } from '@/lib/utils'
import Image from 'next/image'

// Force dynamic rendering for database-dependent content
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featuredProducts = await SafeDatabase.getFeaturedProducts()

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      {/* Interdimensional Portal Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Image
          src="/images/portal-bg.jpg"
          alt="Interdimensional Portal Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <Portal />
      <FloatingElements />
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center text-center px-4 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Hero Image */}
          <div className="flex-1 relative order-2 lg:order-1">
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              <Image
                src="/images/hero-main.jpg"
                alt="異次元通販 - 宇宙の叡智"
                fill
                className="object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                priority
              />
              {/* Multi-layered Glowing Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-400/10 rounded-full blur-3xl animate-ping" style={{animationDuration: '3s'}} />
              {/* Rotating Energy Ring */}
              <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full animate-spin opacity-30" style={{animationDuration: '8s', mask: 'conic-gradient(transparent 30deg, black 60deg, transparent 90deg)'}} />
            </div>
          </div>
          
          {/* Hero Text */}
          <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
            <GlowingText className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
              異次元通販
            </GlowingText>
          
            <GlitchText className="text-2xl md:text-3xl lg:text-4xl mb-8 text-cyan-400 font-medium">
              〜 宇宙と古代の叡智があなたの運命を変える！ 〜
            </GlitchText>

            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-xl mb-8 animate-pulse border-2 border-yellow-400 shadow-2xl">
              <div className="text-xl font-bold flex items-center justify-center gap-2">
                <span className="animate-bounce">⚡</span>
                緊急放送中！！本日限り、異次元からの特別価格でご提供！！
                <span className="animate-bounce">⚡</span>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              量子レベルで人生を変える商品を異次元からお届け。<br />
              <span className="text-yellow-400 font-semibold">龍神の加護</span>、
              <span className="text-cyan-400 font-semibold">宇宙エネルギー</span>、
              <span className="text-pink-400 font-semibold">古代の叡智</span>が今ここに！
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a
                href="#products"
                className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 shadow-2xl"
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
                className="group border-3 border-cyan-400 text-cyan-400 px-10 py-5 rounded-full font-bold text-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 relative overflow-hidden shadow-2xl"
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
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400 rounded-lg p-6 text-center">
            <div className="text-yellow-400 text-lg font-bold animate-pulse">
              {generateMysteryMessage()}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <GlowingText className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
              🌟 異次元の力を秘めた特選商品 🌟
            </GlowingText>
            <p className="text-xl text-gray-300">
              龍神も認めた！宇宙からのメッセージを受け取った商品たち
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              もっと異次元商品を見る →
            </a>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <GlowingText className="text-3xl md:text-4xl font-bold mb-4 text-pink-400">
              🔮 異次元通販が選ばれる理由 🔮
            </GlowingText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-black/30 rounded-xl border border-purple-500">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">量子レベルの効果</h3>
              <p className="text-gray-300">
                DNAレベルから人生を書き換える
                革命的な商品をお届け
              </p>
            </div>

            <div className="text-center p-6 bg-black/30 rounded-xl border border-pink-500">
              <div className="text-4xl mb-4">🐉</div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">龍神の加護</h3>
              <p className="text-gray-300">
                古代より伝わる龍神の力で
                あなたを邪気から守護
              </p>
            </div>

            <div className="text-center p-6 bg-black/30 rounded-xl border border-cyan-500">
              <div className="text-4xl mb-4">🌌</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">宇宙エネルギー</h3>
              <p className="text-gray-300">
                宇宙の無限エネルギーを
                あなたの日常にお届け
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-400/20 to-red-400/20 border-2 border-yellow-400 rounded-lg p-6 text-center animate-pulse">
            <div className="text-yellow-400 text-sm">
              ⚠️ 異次元通販の商品は全て異次元の技術を使用しています。<br />
              現次元の物理法則に従わない場合がございます。<br />
              効果には個人差があり、別の時間軸では結果が異なる可能性があります。<br />
              ※精霊、龍神、宇宙人からのメッセージは保証対象外です。
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 text-center">
        <div className="container mx-auto px-4">
          <GlowingText className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
            今すぐお電話を！異次元のオペレーターが24時間待機中！
          </GlowingText>
          <div className="text-4xl md:text-6xl font-bold text-pink-500 mb-4 animate-pulse">
            📞 0120-XXX-XXXX
          </div>
          <p className="text-lg text-gray-300 mb-8">
            受付時間：24時間365日（※パラレルワールドでは営業時間が異なります）
          </p>
          <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400 rounded-lg p-4 inline-block">
            <p className="text-cyan-400">
              ご注文の方全員に「フラワーオブライフ」ステッカープレゼント！<br />
              古代エジプトの叡智があなたの波動を上げる！
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 border-t border-purple-500 py-8">
        <div className="container mx-auto px-4 text-center">
          <GlowingText className="text-2xl font-bold text-purple-400 mb-4">
            異次元通販
          </GlowingText>
          <p className="text-gray-400 mb-4">
            宇宙と古代の叡智があなたの運命を変える
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <a href="/terms" className="hover:text-purple-400 transition-colors">利用規約</a>
            <a href="/privacy" className="hover:text-purple-400 transition-colors">プライバシーポリシー</a>
            <a href="/contact" className="hover:text-purple-400 transition-colors">お問い合わせ</a>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            © 2024 異次元通販. All rights reserved in all dimensions.
          </div>
        </div>
      </footer>
    </div>
  )
}