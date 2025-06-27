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
  // Temporary fallback for database issues
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not configured, using fallback data')
      return []
    }
    
    const { UltraSyncDatabase } = await import('@/lib/db')
    
    return await UltraSyncDatabase.safeQuery(
      async () => {
        const { prisma } = await import('@/lib/db')
        return await prisma.product.findMany({
          where: { featured: true },
          take: 6,
          orderBy: { mysteryLevel: 'desc' },
        })
      },
      [], // fallback to empty array
      'getFeaturedProducts'
    )
  } catch (error) {
    console.error('Database connection failed:', error)
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

      {/* Hero Section - Modern Rich UI */}
      <main className="relative overflow-hidden">
        {/* Advanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[conic-gradient(at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0),rgba(120,119,198,0.1))] animate-spin-slow"></div>
        </div>
        
        <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-32 min-h-screen flex items-center">
          <div className="container mx-auto max-w-7xl w-full">
            {/* Enhanced Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
              
              {/* Hero Content - Enhanced */}
              <div className="text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-bounce"></div>
                
                {/* Main Title with Enhanced Typography */}
                <div className="space-y-4 md:space-y-6 relative">
                  <div className="relative">
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 leading-tight tracking-tight">
                      異次元通販
                    </h1>
                    <div className="absolute inset-0 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white opacity-20 blur-sm leading-tight tracking-tight">
                      異次元通販
                    </div>
                  </div>
                  
                  <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent font-semibold leading-relaxed">
                    〜 宇宙と古代の叡智があなたの運命を変える！ 〜
                  </p>
                </div>

                {/* Premium Alert Banner */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-3 px-6 xs:py-4 xs:px-8 md:py-5 md:px-10 rounded-xl md:rounded-2xl border border-yellow-400/50 shadow-2xl backdrop-blur-sm">
                    <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight text-center">
                      <span className="animate-pulse">⚡</span> 緊急放送中！！本日限り、特別価格でご提供！！ <span className="animate-pulse">⚡</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <div className="space-y-4 md:space-y-6">
                  <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium">
                    量子レベルで人生を変える商品を異次元からお届け。
                  </p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 font-bold text-sm md:text-base lg:text-lg rounded-full border border-yellow-400/30 backdrop-blur-sm">
                      🐉 龍神の加護
                    </span>
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 font-bold text-sm md:text-base lg:text-lg rounded-full border border-cyan-400/30 backdrop-blur-sm">
                      ⚡ 宇宙エネルギー
                    </span>
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400/20 to-purple-500/20 text-pink-300 font-bold text-sm md:text-base lg:text-lg rounded-full border border-pink-400/30 backdrop-blur-sm">
                      🔮 古代の叡智
                    </span>
                  </div>
                </div>

                {/* Premium CTA Buttons */}
                <div className="flex flex-col xs:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-6">
                  <a
                    href="#products"
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-8 py-4 xs:px-10 xs:py-5 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-bold text-base xs:text-lg md:text-xl transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative">🔮 運命の商品を見つける！ ✨</span>
                  </a>
                  <a
                    href="/products"
                    className="group relative overflow-hidden border-2 border-cyan-400/70 bg-cyan-400/10 text-cyan-300 hover:text-white hover:bg-cyan-400/80 px-8 py-4 xs:px-10 xs:py-5 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-bold text-base xs:text-lg md:text-xl transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative">🌌 全商品を見る →</span>
                  </a>
                </div>
              </div>
              
              {/* Hero Image - Ultra Enhanced */}
              <div className="order-1 lg:order-2 w-full flex justify-center relative">
                <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                  {/* Multi-layer Background Effects */}
                  <div className="absolute -inset-8 md:-inset-12 lg:-inset-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-500/20 rounded-full blur-2xl opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-green-400/10 via-transparent to-purple-400/10 rounded-full blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Premium Image Container */}
                  <div className="relative aspect-square w-full group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl"></div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden">
                      <Image
                        src="/images/hero-main.jpg"
                        alt="異次元通販 - 宇宙の叡智"
                        fill
                        className="object-contain drop-shadow-2xl filter group-hover:brightness-110 group-hover:contrast-110 transition-all duration-700"
                        priority
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Orbs */}
                  <div className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-xl animate-bounce"></div>
                  <div className="hidden lg:block absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s' }}></div>
                  <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '3s' }}></div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>

      {/* Mystery Message - Enhanced */}
      <section className="relative py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative glass bg-gradient-to-r from-yellow-900/40 via-amber-900/30 to-yellow-900/40 border-2 border-yellow-400/50 rounded-2xl p-6 md:p-8 text-center shadow-2xl">
              <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400/20 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="text-yellow-200 text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed">
                ✨ {generateMysteryMessage()} ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Ultra Enhanced */}
      <section id="products" className="relative py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 mb-6 leading-tight">
                🌟 異次元の力を秘めた特選商品 🌟
              </h2>
              <div className="absolute inset-0 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white opacity-10 blur-sm leading-tight">
                🌟 異次元の力を秘めた特選商品 🌟
              </div>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent font-medium max-w-3xl mx-auto leading-relaxed">
              龍神も認めた！宇宙からのメッセージを受け取った商品たち
            </p>
            
            {/* Decorative Stars */}
            <div className="absolute -top-4 left-1/4 text-yellow-400 animate-bounce">⭐</div>
            <div className="absolute -top-2 right-1/4 text-cyan-400 animate-bounce" style={{ animationDelay: '1s' }}>✨</div>
            <div className="absolute -bottom-2 left-1/3 text-purple-400 animate-bounce" style={{ animationDelay: '2s' }}>🌟</div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div key={product.id} className="transform hover:scale-105 transition-transform duration-500">
                  <ProductCard product={product} index={index} />
                </div>
              ))
            ) : (
              // Fallback for no products
              <div className="col-span-full text-center py-16">
                <div className="relative">
                  <div className="text-6xl md:text-8xl opacity-20 mb-4">🔮</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    神秘的な商品を準備中...
                  </h3>
                  <p className="text-lg text-gray-300">
                    宇宙からの特別な商品が間もなく到着します
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced CTA */}
          <div className="text-center">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <a
                href="/products"
                className="relative glass bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 text-cyan-300 hover:text-white px-10 py-5 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 shadow-2xl backdrop-blur-sm will-change-transform"
              >
                <span className="relative flex items-center justify-center gap-3">
                  <span>もっと異次元商品を見る</span>
                  <span className="text-2xl animate-bounce">🚀</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features - Ultra Modern */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-cyan-900/30"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 mb-6 leading-tight">
              🔮 異次元通販が選ばれる理由 🔮
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Quantum Effect Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative glass bg-gradient-to-br from-purple-900/40 to-indigo-900/30 p-8 md:p-10 rounded-3xl border border-purple-400/30 text-center transform group-hover:scale-105 transition-all duration-500 will-change-transform">
                <div className="text-6xl md:text-7xl mb-6 animate-glow">⚡</div>
                <h3 className="text-xl md:text-2xl font-bold text-purple-200 mb-4 leading-tight">量子レベルの効果</h3>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  DNAレベルから人生を書き換える<br />
                  革命的な商品をお届け
                </p>
                <div className="absolute top-4 right-4 w-4 h-4 bg-purple-400/40 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Dragon Protection Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative glass bg-gradient-to-br from-pink-900/40 to-red-900/30 p-8 md:p-10 rounded-3xl border border-pink-400/30 text-center transform group-hover:scale-105 transition-all duration-500 will-change-transform">
                <div className="text-6xl md:text-7xl mb-6 animate-float">🐉</div>
                <h3 className="text-xl md:text-2xl font-bold text-pink-200 mb-4 leading-tight">龍神の加護</h3>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  古代より伝わる龍神の力で<br />
                  あなたを邪気から守護
                </p>
                <div className="absolute top-4 right-4 w-4 h-4 bg-pink-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Cosmic Energy Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative glass bg-gradient-to-br from-cyan-900/40 to-blue-900/30 p-8 md:p-10 rounded-3xl border border-cyan-400/30 text-center transform group-hover:scale-105 transition-all duration-500 will-change-transform">
                <div className="text-6xl md:text-7xl mb-6 animate-glow">🌌</div>
                <h3 className="text-xl md:text-2xl font-bold text-cyan-200 mb-4 leading-tight">宇宙エネルギー</h3>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  宇宙の無限エネルギーを<br />
                  あなたの日常にお届け
                </p>
                <div className="absolute top-4 right-4 w-4 h-4 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">宇宙認定</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <span className="text-2xl">🔮</span>
                <span className="font-semibold">神秘保証</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-2xl">✨</span>
                <span className="font-semibold">効果実証済み</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section - Enhanced */}
      <section className="relative py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 rounded-2xl blur-xl"></div>
            <div className="relative glass bg-gradient-to-r from-yellow-900/30 via-amber-900/20 to-yellow-900/30 border border-yellow-400/40 rounded-2xl p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-400/20 p-3 rounded-full">
                  <span className="text-2xl animate-pulse">⚠️</span>
                </div>
              </div>
              <div className="text-yellow-200 text-sm md:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">
                異次元通販の商品は全て異次元の技術を使用しています。<br />
                現次元の物理法則に従わない場合がございます。効果には個人差があります。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Ultra Enhanced */}
      <section className="relative py-16 md:py-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="space-y-8 md:space-y-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400 leading-tight">
              今すぐお電話を！異次元のオペレーターが24時間待機中！
            </h2>
            
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-6 md:px-12 md:py-8 rounded-2xl font-black text-3xl md:text-4xl lg:text-5xl shadow-2xl">
                📞 0120-XXX-XXXX
              </div>
            </div>
            
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              受付時間：24時間365日<br />
              <span className="text-sm opacity-70">（※パラレルワールドでは営業時間が異なります）</span>
            </p>
            
            <div className="relative inline-block group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative glass bg-gradient-to-r from-cyan-900/40 to-blue-900/30 border border-cyan-400/40 rounded-2xl p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-cyan-400/20 p-2 rounded-full">
                    <span className="text-xl animate-bounce">🎁</span>
                  </div>
                </div>
                <p className="text-cyan-200 text-base md:text-lg leading-relaxed">
                  ご注文の方全員に「フラワーオブライフ」ステッカープレゼント！<br />
                  <span className="text-cyan-300 font-semibold">古代エジプトの叡智があなたの波動を上げる！</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Premium */}
      <footer className="relative bg-gradient-to-b from-black/80 to-black/95 border-t border-purple-500/30 py-12 md:py-16 backdrop-blur-sm">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center max-w-6xl relative">
          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 mb-4">
                異次元通販
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              宇宙と古代の叡智があなたの運命を変える
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm md:text-base">
              <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 font-medium">利用規約</a>
              <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 font-medium">プライバシーポリシー</a>
              <a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 font-medium">お問い合わせ</a>
            </div>
            
            <div className="border-t border-gray-700/50 pt-8">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                © 2024 異次元通販. All rights reserved in all dimensions.<br />
                <span className="text-xs opacity-60">Powered by quantum technology and ancient wisdom.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}