import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { MysteryMessageSection } from '@/components/sections/MysteryMessageSection'
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection'
import { SpecialFeaturesSection } from '@/components/sections/SpecialFeaturesSection'
import { WarningSection } from '@/components/sections/WarningSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { FooterSection } from '@/components/sections/FooterSection'

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