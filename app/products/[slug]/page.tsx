import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { ProductDetailClient } from '@/components/shop/ProductDetailClient'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string) {
  // ビルド時はモックデータを返す
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not available - using mock data')
    notFound()
  }

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    })

    if (!product) {
      notFound()
    }

    return product
  } catch (error) {
    console.error('Database error:', error)
    notFound()
  }
}

// 関連商品を取得
async function getRelatedProducts(productId: string, category: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not available - returning empty related products')
    return []
  }

  try {
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
  const product = await getProduct(params.slug)

  return {
    title: `${product.name} | 異次元通販`,
    description: product.description.slice(0, 160),
    keywords: [
      product.name,
      product.category,
      '異次元',
      'スピリチュアル',
      '波動',
      '龍神',
      product.effects.join(', ')
    ].join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)
  const relatedProducts = await getRelatedProducts(product.id, product.category)

  return (
    <ProductDetailClient 
      product={product} 
      relatedProducts={relatedProducts}
    />
  )
}

// 静的生成用のパス生成 - ビルド時は無効化し完全に動的レンダリングに依存
export async function generateStaticParams() {
  // ビルド時は常に空配列を返してISR/動的レンダリングに委ねる
  console.warn('⚠️ Static generation disabled for build compatibility - using dynamic rendering')
  return []
}