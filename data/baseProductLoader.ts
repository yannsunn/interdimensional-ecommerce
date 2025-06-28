import baseProductsData from './baseProducts.json'

export interface BaseProduct {
  id: string
  title: string
  price: number
  originalPrice?: number
  description: string
  imageUrl: string
  category: string
  mysteryLevel: number
  stock: number
  featured?: boolean
  slug: string
  tags: string[]
  effects: string[]
  baseUrl: string
  shippingCost?: number
  shippingNote?: string
}

export interface BaseCategory {
  name: string
  description: string
  icon: string
}

// BASE商品データを異次元通販フォーマットに変換
export function convertBaseProductToNewProduct(baseProduct: BaseProduct) {
  return {
    id: baseProduct.id,
    name: baseProduct.title,
    price: baseProduct.price,
    originalPrice: baseProduct.originalPrice,
    description: baseProduct.description,
    images: [baseProduct.imageUrl],
    mysteryLevel: baseProduct.mysteryLevel,
    stock: baseProduct.stock,
    category: baseProduct.category,
    featured: baseProduct.featured,
    slug: baseProduct.slug,
    wholesalePrice: Math.floor(baseProduct.price * 0.5),
    isLimited: baseProduct.stock < 20,
    limitedQuantity: baseProduct.stock < 20 ? baseProduct.stock : undefined,
    effects: baseProduct.effects,
    testimonials: []
  }
}

// プロキシ画像URLを生成
export function getProxyImageUrl(originalUrl: string): string {
  if (typeof window === 'undefined') {
    // サーバーサイドでは元のURLをそのまま使用
    return originalUrl
  }
  
  // クライアントサイドではプロキシを使用
  const encodedUrl = encodeURIComponent(originalUrl)
  return `/api/proxy-image?url=${encodedUrl}`
}

// 画像URL付きのBASE商品を取得
export function getBaseProductsWithProxyImages(): BaseProduct[] {
  return baseProductsData.products.map(product => ({
    ...product,
    imageUrl: getProxyImageUrl(product.imageUrl)
  }))
}

// 全BASE商品を異次元通販フォーマットで取得
export function getAllBaseProducts() {
  const baseProducts = getBaseProductsWithProxyImages()
  return baseProducts.map(convertBaseProductToNewProduct)
}

// カテゴリー別BASE商品取得
export function getBaseProductsByCategory(category: string) {
  const allProducts = getAllBaseProducts()
  return allProducts.filter(product => product.category === category)
}

// おすすめBASE商品取得
export function getFeaturedBaseProducts() {
  const allProducts = getAllBaseProducts()
  return allProducts.filter(product => product.featured === true)
}

// BASE商品カテゴリー取得
export function getBaseCategories(): BaseCategory[] {
  return baseProductsData.categories
}

// BASE商品とオリジナル商品を統合
export function getCombinedProducts() {
  const baseProducts = getAllBaseProducts()
  
  // オリジナル商品データがあれば統合（今後の拡張用）
  // const originalProducts = getOriginalProducts()
  
  return baseProducts
}

// 商品検索機能
export function searchBaseProducts(query: string) {
  const allProducts = getAllBaseProducts()
  const lowercaseQuery = query.toLowerCase()
  
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.effects.some(effect => effect.toLowerCase().includes(lowercaseQuery))
  )
}

// 価格範囲での絞り込み
export function getBaseProductsByPriceRange(min: number, max: number) {
  const allProducts = getAllBaseProducts()
  return allProducts.filter(product => 
    product.price >= min && product.price <= max
  )
}

// 神秘レベルでの絞り込み
export function getBaseProductsByMysteryLevel(minLevel: number) {
  const allProducts = getAllBaseProducts()
  return allProducts.filter(product => product.mysteryLevel >= minLevel)
}