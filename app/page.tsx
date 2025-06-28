import { Header } from '../components/layout/Header'
import { HeroSection } from '../components/sections/HeroSection'
import { MysteryMessageSection } from '../components/sections/MysteryMessageSection'
import { FeaturedProductsSection } from '../components/sections/FeaturedProductsSection'
import { HorizontalProductSlider } from '../components/sections/HorizontalProductSlider'
import { SpecialFeaturesSection } from '../components/sections/SpecialFeaturesSection'
import { WarningSection } from '../components/sections/WarningSection'
import { FinalCTASection } from '../components/sections/FinalCTASection'
import { FooterSection } from '../components/sections/FooterSection'
import { getFeaturedProducts, getProductsByCategory } from '../data/newProducts'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function HomePage() {
  // 新商品データの取得
  const featuredProducts = getFeaturedProducts()
  const talismanProducts = getProductsByCategory('天然石お守り')
  const muramTechProducts = getProductsByCategory('ミューラムテクノロジー')
  const iyashirochiProducts = getProductsByCategory('イヤシロチシリーズ')
  const specialProducts = getProductsByCategory('スペシャルアイテム')

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Ultra-Sync Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none -z-40" />
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Mystery Message Section */}
      <MysteryMessageSection />

      {/* 新着おすすめ商品 */}
      <HorizontalProductSlider 
        title="✨ 新着おすすめ商品 ✨"
        products={featuredProducts}
      />

      {/* 天然石お守りシリーズ */}
      <HorizontalProductSlider 
        title="🔮 天然石×お守りシリーズ"
        products={talismanProducts}
        category="天然石お守り"
      />

      {/* ミューラムテクノロジー */}
      <HorizontalProductSlider 
        title="🌌 ミューラムテクノロジー"
        products={muramTechProducts}
        category="ミューラムテクノロジー"
      />

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* イヤシロチシリーズ */}
      <HorizontalProductSlider 
        title="🏯 究極の浄化「イヤシロチシリーズ」"
        products={iyashirochiProducts}
        category="イヤシロチシリーズ"
      />

      {/* スペシャルアイテム */}
      <HorizontalProductSlider 
        title="👑 スペシャルアイテム"
        products={specialProducts}
        category="スペシャルアイテム"
      />

      {/* Special Features Section */}
      <SpecialFeaturesSection />

      {/* Warning Section */}
      <WarningSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

