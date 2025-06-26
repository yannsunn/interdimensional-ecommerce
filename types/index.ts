// 型定義のエントリーポイント - 全ての型をエクスポート
export * from './core'
export * from './product'
export * from './cart'

// Next.js and Prisma specific types
import { Product as PrismaProduct, User as PrismaUser, Order as PrismaOrder } from '@prisma/client'

// 旧式の互換性のためにPrisma型も再エクスポート
export type { PrismaProduct, PrismaUser, PrismaOrder }

// === User and Order Types ===

import { UserId, OrderId, ProductId, OrderStatus, UserRole, PaymentMethod, ShippingMethod } from './core'
import { Address } from './cart'

export interface User {
  id: UserId
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: OrderId
  productId: ProductId
  quantity: number
  price: number
  product?: {
    name: string
    images: string[]
    slug: string
  }
}

export interface Order {
  id: OrderId
  userId: UserId
  status: OrderStatus
  total: number
  subtotal: number
  tax: number
  shipping: number
  paymentMethod: PaymentMethod
  shippingMethod: ShippingMethod
  items: OrderItem[]
  shippingAddress: Address
  billingAddress?: Address
  createdAt: Date
  updatedAt: Date
  user?: User
}


// === Form Types ===

export interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// === UI Component Types ===

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

// === Search and Filter Types ===

export interface SearchParams {
  q?: string
  category?: string
  sort?: string
  page?: string
  limit?: string
}

export interface SearchResult<T> {
  items: T[]
  total: number
  query: string
  filters: Record<string, any>
  facets?: Record<string, Array<{ value: string; count: number }>>
}

// === Error Types ===

export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

export interface FieldError {
  field: string
  message: string
}

export interface ValidationErrors {
  [field: string]: string[]
}

// === Analytics Types ===

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: UserId
  sessionId?: string
  timestamp: Date
}

export interface ProductAnalytics {
  productId: ProductId
  views: number
  addToCart: number
  purchases: number
  revenue: number
  conversionRate: number
}

// === Configuration Types ===

export interface AppConfig {
  site: {
    name: string
    description: string
    url: string
    logo: string
  }
  api: {
    baseUrl: string
    timeout: number
  }
  features: {
    analytics: boolean
    paypal: boolean
    stripe: boolean
    guestCheckout: boolean
  }
}

// === Cache Types ===

export interface CacheOptions {
  ttl: number
  tags: string[]
  revalidate?: number
}

export interface CachedData<T> {
  data: T
  cachedAt: Date
  expiresAt: Date
  tags: string[]
}