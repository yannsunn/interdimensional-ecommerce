import { EnhancedHeader } from '../../components/layout/EnhancedHeader'
import { HeroSection } from '../../components/sections/HeroSection'
import { MysteryMessageSection } from '../../components/sections/MysteryMessageSection'
import { EnhancedProductCard } from '../../components/shop/EnhancedProductCard'
import { InterdimensionalLoader } from '../../components/ui/InterdimensionalLoader'
import { EnhancedButton } from '../../components/ui/EnhancedButton'
import { getFeaturedProducts, getProductsByCategory } from '../../data/newProducts'
import { Sparkles, Zap, Eye, Crown, Infinity } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function EnhancedHomePage() {
  const featuredProducts = getFeaturedProducts()
  const mysteryProducts = getProductsByCategory('ミューラムテクノロジー')
  const talismanProducts = getProductsByCategory('天然石お守り')
  const specialProducts = getProductsByCategory('スペシャルアイテム')

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Ultra-Dimensional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black -z-50" />
      <div className="fixed inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none -z-40" />
      
      {/* Floating energy particles */}
      <div className="fixed inset-0 pointer-events-none -z-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Header */}
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/40" />
        
        {/* Dimensional portal effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-96 h-96 rounded-full border-4 border-purple-500/30 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-80 h-80 rounded-full border-2 border-pink-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute w-64 h-64 rounded-full border border-cyan-300/10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 text-purple-400 animate-ping opacity-20">
                <Sparkles className="w-full h-full" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            異次元通販
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            現実世界では手に入らない、真の異次元アイテムをあなたに
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <EnhancedButton
              variant="interdimensional"
              size="lg"
              quantum={true}
              mysteryLevel={10}
            >
              <Zap className="w-5 h-5" />
              異次元ショップに入る
            </EnhancedButton>
            
            <EnhancedButton
              variant="ghost"
              size="lg"
            >
              <Eye className="w-5 h-5" />
              神秘度について学ぶ
            </EnhancedButton>
          </div>

          {/* Warning message with enhanced styling */}
          <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-2 border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-400">重要な警告</span>
              <Crown className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              当店の商品は異次元から調達された本物のアイテムです。<br />
              効果は絶大ですが、使用は自己責任でお願いいたします。
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🌟 異次元フィーチャー商品
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              最高レベルの神秘度を誇る、選ばれし者のための特別アイテム
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <EnhancedProductCard
                key={product.id}
                product={product}
                index={index}
                variant={index === 0 ? 'interdimensional' : index < 3 ? 'featured' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quantum Technology Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Infinity className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ミューラムテクノロジー
              </h2>
              <Infinity className="w-8 h-8 text-purple-400 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
            </div>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              量子レベルで現実を変革する、宇宙最先端のテクノロジーアイテム
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mysteryProducts.slice(0, 4).map((product, index) => (
              <EnhancedProductCard
                key={product.id}
                product={product}
                index={index}
                variant="interdimensional"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Loading Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-black via-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">
            🔮 異次元エネルギー充填システム
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">ポータル型</h3>
              <InterdimensionalLoader variant="portal" mysteryLevel={8} />
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">量子型</h3>
              <InterdimensionalLoader variant="quantum" mysteryLevel={9} />
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-pink-400">エネルギー型</h3>
              <InterdimensionalLoader variant="energy" mysteryLevel={7} />
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm border border-gray-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-400">ミニマル型</h3>
              <InterdimensionalLoader variant="minimal" mysteryLevel={5} />
            </div>
          </div>
        </div>
      </section>

      {/* Natural Stone Talismans */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              💎 天然石お守りシリーズ
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              古代の叡智と現代の神秘が融合した、運命を変えるお守り
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {talismanProducts.slice(0, 8).map((product, index) => (
              <EnhancedProductCard
                key={product.id}
                product={product}
                index={index}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Ultra-High-End Items */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-orange-900/10 to-red-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-10 h-10 text-yellow-400 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                👑 スペシャルアイテム
              </h2>
              <Crown className="w-10 h-10 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              人生を根本から変革する、最高峰の異次元アイテム
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {specialProducts.slice(0, 4).map((product, index) => (
              <EnhancedProductCard
                key={product.id}
                product={product}
                index={index}
                variant="featured"
                className="lg:col-span-1"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            あなたの人生を<br />異次元へ導く
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            今すぐ異次元通販で、現実を超越した体験を始めましょう
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <EnhancedButton
              variant="interdimensional"
              size="xl"
              quantum={true}
              mysteryLevel={10}
            >
              <Sparkles className="w-6 h-6" />
              異次元の扉を開く
            </EnhancedButton>
            
            <EnhancedButton
              variant="primary"
              size="xl"
              mysteryLevel={8}
            >
              <Zap className="w-6 h-6" />
              商品一覧を見る
            </EnhancedButton>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-black border-t border-purple-500/30 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 異次元通販. All interdimensional rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}