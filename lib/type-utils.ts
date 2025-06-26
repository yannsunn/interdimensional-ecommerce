// Type utility functions for enhanced type safety
import type { ProductId, UserId, OrderId } from '@/types'

// === Image Handling ===

/**
 * Safely get the first image from an array with fallback
 */
export const getSafeImageUrl = (images: string[], fallback = '/placeholder.jpg'): string => {
  return images?.[0] ?? fallback
}

/**
 * Get multiple images with fallbacks
 */
export const getSafeImages = (images: string[], count = 3, fallback = '/placeholder.jpg'): string[] => {
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(images?.[i] ?? fallback)
  }
  return result
}

// === Type Guards ===

/**
 * Type guard for ProductId
 */
export const isProductId = (value: unknown): value is ProductId => {
  return typeof value === 'string' && value.length > 0
}

/**
 * Type guard for UserId
 */
export const isUserId = (value: unknown): value is UserId => {
  return typeof value === 'string' && value.length > 0
}

/**
 * Type guard for OrderId
 */
export const isOrderId = (value: unknown): value is OrderId => {
  return typeof value === 'string' && value.length > 0
}

/**
 * Type guard for email validation
 */
export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

// === Array Utilities ===

/**
 * Safely get array item with optional chaining
 */
export const getArrayItem = <T>(array: T[] | undefined | null, index: number): T | undefined => {
  return array?.[index]
}

/**
 * Check if array has items
 */
export const hasItems = <T>(array: T[] | undefined | null): array is T[] => {
  return Array.isArray(array) && array.length > 0
}

/**
 * Safely map over array
 */
export const safeMap = <T, U>(
  array: T[] | undefined | null,
  mapper: (item: T, index: number) => U
): U[] => {
  return array?.map(mapper) ?? []
}

// === Object Utilities ===

/**
 * Safely access nested object properties
 */
export const safeGet = <T>(obj: any, path: string, defaultValue?: T): T | undefined => {
  const keys = path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (current?.[key] === undefined || current?.[key] === null) {
      return defaultValue
    }
    current = current[key]
  }
  
  return current
}

/**
 * Check if object has property safely
 */
export const hasProperty = <T extends object, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> => {
  return prop in obj
}

// === Form Validation Utilities ===

/**
 * Validate required field
 */
export const validateRequired = (value: unknown, fieldName: string): string | null => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`
  }
  return null
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): string | null => {
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

/**
 * Validate password strength
 */
export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }
  return null
}

/**
 * Validate quantity
 */
export const validateQuantity = (quantity: number, max?: number): string | null => {
  if (quantity < 1) {
    return 'Quantity must be at least 1'
  }
  if (max && quantity > max) {
    return `Quantity cannot exceed ${max}`
  }
  return null
}

// === Price Utilities ===

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

// === Error Handling ===

/**
 * Type-safe error extraction
 */
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}

/**
 * Create error object with type safety
 */
export const createError = (message: string, code?: string, details?: Record<string, any>) => {
  return {
    message,
    code: code ?? 'UNKNOWN_ERROR',
    details: details ?? {},
    timestamp: new Date().toISOString(),
  }
}

// === Environment Utilities ===

/**
 * Type-safe environment variable access
 */
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key]
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required`)
  }
  return value ?? defaultValue!
}

/**
 * Check if running in development
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

/**
 * Check if running in production
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

// === Async Utilities ===

/**
 * Type-safe async error wrapper
 */
export const safeAsync = async <T>(
  asyncFn: () => Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const result = await asyncFn()
    return [result, null]
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))]
  }
}

/**
 * Delay utility with type safety
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// === ID Generation ===

/**
 * Generate type-safe product ID
 */
export const generateProductId = (): ProductId => {
  return `product_${Date.now()}_${Math.random().toString(36).substring(2)}` as ProductId
}

/**
 * Generate type-safe user ID
 */
export const generateUserId = (): UserId => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2)}` as UserId
}

/**
 * Generate type-safe order ID
 */
export const generateOrderId = (): OrderId => {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2)}` as OrderId
}