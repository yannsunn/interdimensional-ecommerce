import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import SafeDatabase from '@/lib/db-safe'
import { ProductDetailClient } from '@/components/shop/ProductDetailClient'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await SafeDatabase.getProductBySlug(params.slug)
  
  if (!product) {
    return {
      title: '商品が見つかりません | 異次元通販',
      description: '指定された商品は異次元の彼方に消えてしまったようです。'
    }
  }

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
  const product = await SafeDatabase.getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }
  
  const relatedProducts = await SafeDatabase.getRelatedProducts(product.id, product.category)

  return (
    <ProductDetailClient 
      product={product} 
      relatedProducts={relatedProducts}
    />
  )
}

// generateStaticParams を完全に削除 - 100%動的レンダリング