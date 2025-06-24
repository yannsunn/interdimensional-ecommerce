import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/shop/ProductDetailClient'

// ABSOLUTE DYNAMIC - NO STATIC EVER
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

// NO generateStaticParams - NEVER EVER

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Build-time safety
  if (!process.env.DATABASE_URL) {
    notFound()
  }

  try {
    const { prisma } = await import('@/lib/db')
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    })
    
    if (!product) {
      notFound()
    }
    
    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: product.id } },
          { category: product.category }
        ]
      },
      take: 4,
      orderBy: { mysteryLevel: 'desc' }
    })

    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  } catch (error) {
    console.error('Database error:', error)
    notFound()
  }
}