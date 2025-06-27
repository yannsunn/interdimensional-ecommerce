/**
 * 🛍️ useProducts - 商品データ管理フック
 * 
 * 商品データの取得、キャッシュ、エラーハンドリングを統一管理
 */

import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@prisma/client'

interface UseProductsOptions {
  featured?: boolean
  category?: string
  limit?: number
}

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

// キャッシュストレージ
const productCache = new Map<string, {
  data: Product[]
  timestamp: number
}>()

const CACHE_DURATION = 5 * 60 * 1000 // 5分

/**
 * 商品データ管理フック
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // キャッシュキー生成
  const cacheKey = JSON.stringify(options)
  
  /**
   * 商品データ取得
   */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // キャッシュチェック
      const cached = productCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setProducts(cached.data)
        setLoading(false)
        return
      }
      
      // APIパラメータ構築
      const params = new URLSearchParams()
      if (options.featured) params.append('featured', 'true')
      if (options.category) params.append('category', options.category)
      if (options.limit) params.append('limit', options.limit.toString())
      
      // API呼び出し
      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // キャッシュ更新
      productCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      })
      
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err instanceof Error ? err : new Error('Unknown error'))
      
      // フォールバックデータ
      setProducts(getFallbackProducts(options))
    } finally {
      setLoading(false)
    }
  }, [cacheKey, options])
  
  /**
   * 初回ロード
   */
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  
  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  }
}

/**
 * フォールバック商品データ
 */
function getFallbackProducts(options: UseProductsOptions): Product[] {
  const fallbackProducts: Product[] = [
    {
      id: 'fallback-1',
      name: '龍神の護符',
      slug: 'dragon-amulet',
      description: '古代から伝わる龍神の力が宿る護符',
      story: '古代中国の皇帝が所持していた伝説の護符',
      effects: ['厄除け', '運気上昇', '邪気払い'],
      warnings: ['直射日光を避けて保管してください'],
      testimonials: ['人生が激変しました！'],
      price: 29800,
      originalPrice: null,
      stock: 100,
      images: ['/images/products/dragon-amulet.jpg'],
      category: 'dragon',
      mysteryLevel: 5,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'fallback-2',
      name: '宇宙エネルギー水晶',
      slug: 'cosmic-crystal',
      description: '宇宙のエネルギーを凝縮した特別な水晶',
      story: 'NASA研究所で発見された特殊な水晶',
      effects: ['集中力向上', 'チャクラ調整'],
      warnings: ['月光浴で浄化してください'],
      testimonials: ['仕事の効率が3倍になりました'],
      price: 19800,
      originalPrice: null,
      stock: 50,
      images: ['/images/products/cosmic-crystal.jpg'],
      category: 'cosmic',
      mysteryLevel: 4,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'fallback-3',
      name: '量子波動調整器',
      slug: 'quantum-tuner',
      description: '量子レベルで波動を調整する最新デバイス',
      story: '最先端の量子物理学技術を応用',
      effects: ['波動調整', 'エネルギー増幅'],
      warnings: ['電子機器から離してお使いください'],
      testimonials: ['波動が整い、運命が変わりました'],
      price: 49800,
      originalPrice: null,
      stock: 25,
      images: ['/images/products/quantum-tuner.jpg'],
      category: 'quantum',
      mysteryLevel: 5,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  
  // オプションに基づくフィルタリング
  let filtered = fallbackProducts
  
  if (options.featured) {
    filtered = filtered.filter(p => p.featured)
  }
  
  if (options.category) {
    filtered = filtered.filter(p => p.category === options.category)
  }
  
  if (options.limit) {
    filtered = filtered.slice(0, options.limit)
  }
  
  return filtered
}

/**
 * 商品データのプリフェッチ
 */
export async function prefetchProducts(options: UseProductsOptions = {}) {
  const cacheKey = JSON.stringify(options)
  const cached = productCache.get(cacheKey)
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  try {
    const params = new URLSearchParams()
    if (options.featured) params.append('featured', 'true')
    if (options.category) params.append('category', options.category)
    if (options.limit) params.append('limit', options.limit.toString())
    
    const response = await fetch(`/api/products?${params}`)
    if (!response.ok) {
      throw new Error(`Failed to prefetch products: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    productCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })
    
    return data
  } catch (err) {
    console.error('Error prefetching products:', err)
    return getFallbackProducts(options)
  }
}