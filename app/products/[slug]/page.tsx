import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { ProductDetailClient } from '@/components/shop/ProductDetailClient'

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
  })

  if (!product) {
    notFound()
  }

  return product
}

// 関連商品を取得
async function getRelatedProducts(productId: string, category: string) {
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
      type: 'product',
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

// 静的生成用のパス生成
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true }
  })

  return products.map((product) => ({
    slug: product.slug,
  }))
}