import { PrismaClient } from '@prisma/client'

// Singleton pattern for connection pooling
declare global {
  var prismaGlobal: PrismaClient | undefined
}

// Ultra-optimized Prisma configuration
const createOptimizedPrismaClient = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  // Middleware for query optimization
  client.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()
    
    // Log slow queries in development
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

// Global connection instance
export const prismaOptimized = global.prismaGlobal || createOptimizedPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prismaOptimized
}

// Connection pool management
export async function ensureDbConnected() {
  try {
    await prismaOptimized.$connect()
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// Graceful shutdown
export async function disconnectDb() {
  await prismaOptimized.$disconnect()
}

// Query batching for performance
export const batchQueries = {
  async getProductsWithCategories(limit = 50) {
    const [products, categories] = await prismaOptimized.$transaction([
      prismaOptimized.product.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prismaOptimized.product.groupBy({
        by: ['category'],
        _count: { category: true },
        orderBy: { category: 'asc' },
      }),
    ])
    
    return { products, categories }
  },

  async getUserWithOrders(userId: string) {
    return prismaOptimized.user.findUnique({
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
    })
  },
}

// Prepared statements for frequently used queries
export const preparedQueries = {
  findProductBySlug: (slug: string) => 
    prismaOptimized.product.findUnique({
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

  getFeaturedProducts: () =>
    prismaOptimized.product.findMany({
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
    }),
}

// Edge-runtime compatible connection check
export async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    return { connected: false, error: 'DATABASE_URL not set' }
  }
  
  try {
    await prismaOptimized.$queryRaw`SELECT 1`
    return { connected: true, error: null }
  } catch (error) {
    return { connected: false, error: String(error) }
  }
}