// 基本的な型定義 - 最も頻繁に使用される型
export type ProductId = string & { readonly __brand: 'ProductId' }
export type UserId = string & { readonly __brand: 'UserId' }
export type OrderId = string & { readonly __brand: 'OrderId' }
export type CartId = string & { readonly __brand: 'CartId' }

// 神秘レベル（1-10の厳密な型）
export type MysteryLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

// 注文ステータス
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

// ユーザーロール
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR'

// 支払い方法
export type PaymentMethod = 'CARD' | 'BANK_TRANSFER' | 'WALLET' | 'COD'

// 配送方法
export type ShippingMethod = 'STANDARD' | 'EXPRESS' | 'OVERNIGHT' | 'DIMENSIONAL_PORTAL'

// APIレスポンス基本型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ページネーション
export interface PaginationParams {
  page: number
  limit: number
  offset?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}