import { unstable_cache } from 'next/cache'
import { cache } from 'react'

// Ultra-performance cache configuration
export const CACHE_TAGS = {
  products: 'products',
  product: (id: string) => `product-${id}`,
  categories: 'categories',
  user: (id: string) => `user-${id}`,
  cart: (id: string) => `cart-${id}`,
} as const

// Revalidation times (in seconds)
export const CACHE_TIMES = {
  products: 3600, // 1 hour
  categories: 7200, // 2 hours
  static: 86400, // 24 hours
  user: 300, // 5 minutes
  cart: 600, // 10 minutes
} as const

// Product cache with automatic revalidation
export const getCachedProducts = unstable_cache(
  async () => {
    const { SafeDatabase } = await import('./db-safe')
    return SafeDatabase.getProducts()
  },
  ['all-products'],
  {
    revalidate: CACHE_TIMES.products,
    tags: [CACHE_TAGS.products],
  }
)

// Featured products cache
export const getCachedFeaturedProducts = unstable_cache(
  async () => {
    const { SafeDatabase } = await import('./db-safe')
    return SafeDatabase.getFeaturedProducts()
  },
  ['featured-products'],
  {
    revalidate: CACHE_TIMES.products,
    tags: [CACHE_TAGS.products],
  }
)

// Single product cache
export const getCachedProduct = unstable_cache(
  async (slug: string) => {
    const { SafeDatabase } = await import('./db-safe')
    return SafeDatabase.getProductBySlug(slug)
  },
  ['product-by-slug'],
  {
    revalidate: CACHE_TIMES.products,
    tags: [CACHE_TAGS.products],
  }
)

// Categories cache
export const getCachedCategories = unstable_cache(
  async () => {
    const { SafeDatabase } = await import('./db-safe')
    return SafeDatabase.getCategories()
  },
  ['all-categories'],
  {
    revalidate: CACHE_TIMES.categories,
    tags: [CACHE_TAGS.categories],
  }
)

// React cache for request deduplication
export const getProduct = cache(async (slug: string) => {
  return getCachedProduct(slug)
})

export const getProducts = cache(async () => {
  return getCachedProducts()
})

// Cache revalidation helpers
export async function revalidateProducts() {
  const { revalidateTag } = await import('next/cache')
  revalidateTag(CACHE_TAGS.products)
}

export async function revalidateProduct(id: string) {
  const { revalidateTag } = await import('next/cache')
  revalidateTag(CACHE_TAGS.product(id))
}

// Edge-compatible memory cache for ultra-fast access
class MemoryCache {
  private cache = new Map<string, { value: any; expires: number }>()
  
  set(key: string, value: any, ttl: number) {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl * 1000,
    })
  }
  
  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }
  
  clear() {
    this.cache.clear()
  }
}

export const memoryCache = new MemoryCache()