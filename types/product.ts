import { Product as PrismaProduct } from '@prisma/client'
import { ProductId, MysteryLevel } from './core'

// 商品基本型
export interface ProductBase {
  id: ProductId
  name: string
  description: string
  price: number
  originalPrice?: number
  stock: number
  mysteryLevel: MysteryLevel
  category: string
  slug: string
  images: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// レビュー付き商品
export interface Review {
  id: string
  userId: string
  productId: ProductId
  rating: number
  comment: string
  createdAt: Date
  user?: {
    name: string
    avatar?: string
  }
}

// 拡張商品型
export interface ProductWithRelations extends PrismaProduct {
  reviews?: Review[]
  orderItems?: Array<{
    id: string
    quantity: number
    price: number
  }>
  _count?: {
    reviews: number
    orderItems: number
  }
}

// 商品フォームデータ
export interface ProductFormData {
  name: string
  description: string
  price: number
  originalPrice?: number
  stock: number
  mysteryLevel: MysteryLevel
  effects: string[]
  warnings: string[]
  testimonials: string[]
  images: string[]
  featured: boolean
  tags?: string[]
  category: string
  slug?: string
}

// 商品フィルター
export interface ProductFilter {
  category?: string
  priceMin?: number
  priceMax?: number
  mysteryLevel?: MysteryLevel
  featured?: boolean
  inStock?: boolean
  search?: string
}

// 商品ソート
export type ProductSortBy = 'name' | 'price' | 'mysteryLevel' | 'createdAt' | 'popularity'
export type SortOrder = 'asc' | 'desc'

export interface ProductSort {
  sortBy: ProductSortBy
  order: SortOrder
}

// 商品カテゴリ
export interface ProductCategory {
  name: string
  count: number
  slug: string
  description?: string
}