import { Product as PrismaProduct, User as PrismaUser, Order as PrismaOrder } from '@prisma/client'

// === Core Types ===

// Branded types for type safety
export type ProductId = string & { readonly __brand: 'ProductId' }
export type UserId = string & { readonly __brand: 'UserId' }
export type OrderId = string & { readonly __brand: 'OrderId' }

// Mystery level with strict typing
export type MysteryLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

// Order status with all possible states
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

// User roles
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR'

// === Extended Product Types ===

// Forward declare OrderItem to resolve circular dependency
interface OrderItem {
  id: string
  productId: ProductId
  quantity: number
  price: number
}

export interface ProductWithRelations extends PrismaProduct {
  reviews?: Review[]
  orderItems?: OrderItem[]
  _count?: {
    reviews: number
    orderItems: number
  }
}

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
}

// === Cart Types ===

export interface CartItem {
  productId: ProductId
  name: string
  price: number
  quantity: number
  image?: string
  mysteryLevel: MysteryLevel
  maxQuantity?: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

// === API Response Types ===

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
  timestamp: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// === Search and Filter Types ===

export interface ProductFilters {
  category?: string
  mysteryLevel?: MysteryLevel[]
  priceRange?: {
    min: number
    max: number
  }
  inStock?: boolean
  featured?: boolean
  tags?: string[]
  sortBy?: 'name' | 'price' | 'mysteryLevel' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  q?: string
  filters?: ProductFilters
  page?: number
  limit?: number
}

// === Form Types ===

export interface FormState<T = any> {
  data: T
  errors: Record<string, string[]>
  isSubmitting: boolean
  isValid: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  mysteryLevel?: MysteryLevel
}

export interface NewsletterFormData {
  email: string
  interests?: string[]
}

// === Animation and UI Types ===

export interface AnimationVariants {
  initial: Record<string, any>
  animate: Record<string, any>
  exit?: Record<string, any>
  transition?: Record<string, any>
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
}

// === Error Types ===

export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

export type ErrorBoundaryFallback = {
  error: Error
  resetErrorBoundary: () => void
}

// === Utility Types ===

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

// Make certain properties required
export type RequiredProductData = RequiredBy<ProductFormData, 'name' | 'price' | 'description'>

// === Event Types ===

export interface CustomEvent<T = any> {
  type: string
  payload: T
  timestamp: number
}

export interface ProductViewEvent extends CustomEvent<{
  productId: ProductId
  userId?: UserId
  source: 'list' | 'search' | 'featured' | 'direct'
}> {
  type: 'product_view'
}

export interface AddToCartEvent extends CustomEvent<{
  productId: ProductId
  quantity: number
  price: number
}> {
  type: 'add_to_cart'
}

// === SEO and Metadata Types ===

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
}

export interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

// === Review System Types ===

export interface Review {
  id: string
  userId: UserId
  productId: ProductId
  rating: 1 | 2 | 3 | 4 | 5
  title?: string
  content: string
  verified: boolean
  helpful: number
  createdAt: Date
  updatedAt: Date
  user: {
    name: string
    avatar?: string
  }
}

export interface ReviewFormData {
  rating: 1 | 2 | 3 | 4 | 5
  title?: string
  content: string
}

// === Notification Types ===

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// === Performance Types ===

export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
  bundleSize: number
}

export interface LazyComponentProps {
  fallback?: React.ComponentType
  delay?: number
}

// Export commonly used combined types
export type ProductCardProps = {
  product: ProductWithRelations
  index?: number
  variant?: 'default' | 'compact' | 'featured'
}

export type PageProps<T = {}> = {
  params: T
  searchParams: Record<string, string | string[] | undefined>
}