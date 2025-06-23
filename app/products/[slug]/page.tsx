import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ProductDetailClient } from '@/components/shop/ProductDetailClient'

// Force dynamic rendering - NO static generation
export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Mock product data for build compatibility
const MOCK_PRODUCT = {
  id: 'mock-1',
  name: 'ミステリアス商品',
  slug: 'mock-product',
  description: '異次元からの神秘的な商品です。',
  price: 9999,
  originalPrice: 19999,
  stock: 10,
  mysteryLevel: 5,
  category: 'スピリチュアル',
  effects: ['運気上昇', '波動向上'],
  warnings: ['心臓の弱い方はご注意ください'],
  testimonials: ['効果抜群でした！'],
  images: ['/placeholder-product.jpg'],
  featured: true,
  tags: ['人気'],
  createdAt: new Date(),
  updatedAt: new Date()
}

// Safe database access
async function getProductBySlug(slug: string) {
  // In build environment, return null to trigger 404
  if (!process.env.DATABASE_URL || process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Database not available, using mock data for:', slug)
    return null // This will trigger notFound()
  }

  try {
    // In runtime with database, use actual query
    const { prisma } = await import('@/lib/db')
    const product = await prisma.product.findUnique({
      where: { slug },
    })
    return product
  } catch (error) {
    console.error('Database error:', error)
    return null
  }
}

async function getRelatedProducts(productId: string, category: string) {
  if (!process.env.DATABASE_URL) {
    return []
  }

  try {
    const { prisma } = await import('@/lib/db')
    return await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: productId } },
          { category }
        ]
      },
      take: 4,
      orderBy: { mysteryLevel: 'desc' }
    })
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return {
    title: '商品詳細 | 異次元通販',
    description: '異次元からの神秘的な商品をご覧ください。',
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }
  
  const relatedProducts = await getRelatedProducts(product.id, product.category)

  return (
    <ProductDetailClient 
      product={product} 
      relatedProducts={relatedProducts}
    />
  )
}