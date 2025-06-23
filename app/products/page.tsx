import { ProductCard } from '@/components/shop/ProductCard'
import { Portal } from '@/components/effects/Portal'
import { FloatingElements } from '@/components/effects/FloatingElements'
import { GlowingText } from '@/components/effects/GlowingText'
import { Header } from '@/components/layout/Header'
import { prisma } from '@/lib/db'

async function getProducts() {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not available - returning empty products')
    return []
  }

  try {
    return await prisma.product.findMany({
      orderBy: [
        { featured: 'desc' },
        { mysteryLevel: 'desc' },
        { createdAt: 'desc' }
      ],
    })
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

async function getCategories() {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not available - returning empty categories')
    return []
  }

  try {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    })
    
    return categories.map(cat => ({
      name: cat.category,
      count: cat._count.category,
    }))
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      <Portal />
      <FloatingElements />
      
      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <GlowingText className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            🌌 異次元商品一覧 🌌
          </GlowingText>
          <p className="text-xl text-gray-300 mb-8">
            宇宙の力を秘めた商品があなたを待っています
          </p>
          
          {/* Mystery Message */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400 rounded-lg p-4 mb-8">
            <div className="text-yellow-400 font-bold animate-pulse">
              ⚡ 全商品に龍神の加護付き！今なら宇宙エネルギー無料転写中！ ⚡
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">カテゴリー</h2>
          <div className="flex flex-wrap gap-3">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">
              全て ({products.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full hover:bg-purple-500/40 transition-colors"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-8xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              商品が見つかりません
            </h3>
            <p className="text-gray-500">
              異次元で商品を準備中です...
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 py-12 border-t border-purple-500/30">
          <GlowingText className="text-3xl font-bold text-yellow-400 mb-4">
            運命の商品が見つからない？
          </GlowingText>
          <p className="text-lg text-gray-300 mb-6">
            異次元のコンシェルジュがあなた専用の商品をお探しします
          </p>
          <a
            href="tel:0120-XXX-XXXX"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300"
          >
            📞 今すぐ異次元に電話する
          </a>
        </div>
      </div>
    </div>
  )
}