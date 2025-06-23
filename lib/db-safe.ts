// Safe database operations for build compatibility
import { prisma } from './db'

// Type-safe database wrapper with build-time protection
export class SafeDatabase {
  private static isAvailable(): boolean {
    // ビルド時は常にfalseを返す
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return false
    }
    
    // データベースURLが設定されていない場合もfalse
    if (!process.env.DATABASE_URL) {
      return false
    }
    
    return true
  }

  static async safeQuery<T>(
    operation: () => Promise<T>, 
    fallback: T,
    operationName: string = 'database operation'
  ): Promise<T> {
    if (!this.isAvailable()) {
      console.warn(`⚠️ ${operationName} skipped - database not available`)
      return fallback
    }

    try {
      return await operation()
    } catch (error) {
      console.error(`❌ ${operationName} failed:`, error)
      return fallback
    }
  }

  // Safe product operations
  static async getProducts() {
    return this.safeQuery(
      () => prisma.product.findMany({
        orderBy: [
          { featured: 'desc' },
          { mysteryLevel: 'desc' },
          { createdAt: 'desc' }
        ],
      }),
      [],
      'getProducts'
    )
  }

  static async getFeaturedProducts() {
    return this.safeQuery(
      () => prisma.product.findMany({
        where: { featured: true },
        take: 6,
        orderBy: { mysteryLevel: 'desc' },
      }),
      [],
      'getFeaturedProducts'
    )
  }

  static async getProductBySlug(slug: string) {
    return this.safeQuery(
      () => prisma.product.findUnique({
        where: { slug },
      }),
      null,
      `getProductBySlug(${slug})`
    )
  }

  static async getRelatedProducts(productId: string, category: string) {
    return this.safeQuery(
      () => prisma.product.findMany({
        where: {
          AND: [
            { id: { not: productId } },
            { category }
          ]
        },
        take: 4,
        orderBy: { mysteryLevel: 'desc' }
      }),
      [],
      'getRelatedProducts'
    )
  }

  static async getCategories() {
    return this.safeQuery(
      async () => {
        const categories = await prisma.product.groupBy({
          by: ['category'],
          _count: { category: true },
        })
        return categories.map(cat => ({
          name: cat.category,
          count: cat._count.category,
        }))
      },
      [],
      'getCategories'
    )
  }
}

export default SafeDatabase