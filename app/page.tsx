import dynamicImport from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/HeroSection'

// 遅延読み込みでパフォーマンス最適化 - 名前付きエクスポートに対応
const MysteryMessageSection = dynamicImport(() => import('@/components/sections/MysteryMessageSection'), {
  loading: () => <div className="h-40 animate-pulse bg-purple-900/20" />
})
const FeaturedProductsSection = dynamicImport(() => import('@/components/sections/FeaturedProductsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-purple-900/20" />
})
const SpecialFeaturesSection = dynamicImport(() => import('@/components/sections/SpecialFeaturesSection'), {
  loading: () => <div className="h-80 animate-pulse bg-purple-900/20" />
})
const WarningSection = dynamicImport(() => import('@/components/sections/WarningSection'), {
  loading: () => <div className="h-60 animate-pulse bg-red-900/20" />
})
const FinalCTASection = dynamicImport(() => import('@/components/sections/FinalCTASection'), {
  loading: () => <div className="h-80 animate-pulse bg-purple-900/20" />
})
const FooterSection = dynamicImport(() => import('@/components/sections/FooterSection'), {
  loading: () => <div className="h-60 animate-pulse bg-gray-900/20" />
})

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
    // 本番環境では構造化ログを使用
    if (process.env.NODE_ENV === 'development') {
      console.error('Database connection failed:', error)
    }
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Ultra-Sync Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none -z-10" />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <HeroSection />
        <MysteryMessageSection />
        <FeaturedProductsSection products={featuredProducts} />
        <SpecialFeaturesSection />
        <WarningSection />
        <FinalCTASection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}