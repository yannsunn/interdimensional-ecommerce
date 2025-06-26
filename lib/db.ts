import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Ultra-synced database client with build-time safety and performance optimization
const createUltraSyncedPrismaClient = () => {
  // Build-time mock client
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
    console.warn('⚠️ DATABASE_URL not set - using mock client for build')
    return new Proxy({} as PrismaClient, {
      get: (target, prop) => {
        if (prop === 'product' || prop === 'user' || prop === 'order' || prop === 'cart' || prop === 'cartItem') {
          return new Proxy({}, {
            get: (modelTarget, method) => {
              if (method === 'count') return () => Promise.resolve(0)
              if (method === 'findMany' || method === 'findFirst' || method === 'findUnique') return () => Promise.resolve([])
              if (method === 'aggregate') return () => Promise.resolve({ _sum: { total: 0 } })
              if (method === 'create' || method === 'update' || method === 'delete') return () => Promise.resolve({})
              return () => Promise.resolve(null)
            }
          })
        }
        if (prop === '$connect' || prop === '$disconnect' || prop === '$transaction' || prop === '$queryRaw') {
          return () => Promise.resolve()
        }
        return () => Promise.resolve(null)
      }
    })
  }

  // Production client with optimization
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  // Performance monitoring middleware
  client.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()
    
    if (process.env.NODE_ENV === 'development' && after - before > 100) {
      console.warn(`⚠️ Slow query (${after - before}ms):`, {
        model: params.model,
        action: params.action,
      })
    }
    
    return result
  })

  return client
}

export const prisma = global.prisma || createUltraSyncedPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Ultra-synced safe database operations
export class UltraSyncDatabase {
  private static isAvailable(): boolean {
    if (process.env.NEXT_PHASE === 'phase-production-build') return false
    if (!process.env.DATABASE_URL) return false
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

  // Optimized product operations
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
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          images: true,
          mysteryLevel: true,
        },
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
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
          stock: true,
          category: true,
          featured: true,
          mysteryLevel: true,
        },
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
          orderBy: { category: 'asc' },
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

  // Batch operations for performance
  static async getProductsWithCategories(limit = 50) {
    return this.safeQuery(
      async () => {
        const [products, categories] = await prisma.$transaction([
          prisma.product.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.product.groupBy({
            by: ['category'],
            _count: { category: true },
            orderBy: { category: 'asc' },
          }),
        ])
        return { products, categories }
      },
      { products: [], categories: [] },
      'getProductsWithCategories'
    )
  }

  static async getUserWithOrders(userId: string) {
    return this.safeQuery(
      () => prisma.user.findUnique({
        where: { id: userId },
        include: {
          orders: {
            include: {
              items: {
                include: {
                  product: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      }),
      null,
      'getUserWithOrders'
    )
  }
}

// Connection management
export async function ensureDbConnected() {
  if (!UltraSyncDatabase['isAvailable']()) return false
  
  try {
    await prisma.$connect()
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

export async function disconnectDb() {
  await prisma.$disconnect()
}

export async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    return { connected: false, error: 'DATABASE_URL not set' }
  }
  
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, error: null }
  } catch (error) {
    return { connected: false, error: String(error) }
  }
}

// Backward compatibility exports
export const SafeDatabase = UltraSyncDatabase
export const prismaOptimized = prisma
export const batchQueries = {
  getProductsWithCategories: UltraSyncDatabase.getProductsWithCategories,
  getUserWithOrders: UltraSyncDatabase.getUserWithOrders,
}
export const preparedQueries = {
  findProductBySlug: (slug: string) => UltraSyncDatabase.getProductBySlug(slug),
  getFeaturedProducts: () => UltraSyncDatabase.getFeaturedProducts(),
}

export default UltraSyncDatabase