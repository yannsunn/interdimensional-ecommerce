import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// ビルド時のダミー接続対応
const createPrismaClient = () => {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
    console.warn('⚠️ DATABASE_URL not set - using mock client for build')
    // ビルド時のダミークライアント（実際の操作は行わない）
    return new Proxy({} as PrismaClient, {
      get: (target, prop) => {
        // プロパティアクセスに対応
        if (prop === 'product' || prop === 'user' || prop === 'order' || prop === 'cart' || prop === 'cartItem') {
          return new Proxy({}, {
            get: (modelTarget, method) => {
              // メソッドアクセスに対応
              if (method === 'count') {
                return () => Promise.resolve(0)
              }
              if (method === 'findMany' || method === 'findFirst' || method === 'findUnique') {
                return () => Promise.resolve([])
              }
              if (method === 'aggregate') {
                return () => Promise.resolve({ _sum: { total: 0 } })
              }
              if (method === 'create' || method === 'update' || method === 'delete') {
                return () => Promise.resolve({})
              }
              return () => Promise.resolve(null)
            }
          })
        }
        return () => Promise.resolve(null)
      }
    })
  }
  return new PrismaClient()
}

export const prisma = global.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}