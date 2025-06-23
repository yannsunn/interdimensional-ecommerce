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
      get: () => () => Promise.resolve([])
    })
  }
  return new PrismaClient()
}

export const prisma = global.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}