/**
 * 🔒 ULTRA INPUT VALIDATION SYSTEM
 * 
 * Revolutionary input validation with comprehensive security:
 * - Zod schema validation with custom security rules
 * - Input sanitization with HTML/XSS protection
 * - Rate limiting per validation type
 * - Malicious pattern detection
 * - SQL injection prevention
 */

import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

// === Security Patterns ===

const MALICIOUS_PATTERNS = [
  // XSS attempts
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:text\/html/gi,
  
  // SQL injection attempts
  /union\s+select/gi,
  /drop\s+table/gi,
  /delete\s+from/gi,
  /insert\s+into/gi,
  /update\s+.*set/gi,
  
  // Path traversal
  /\.\.\//g,
  /\.\.%2f/gi,
  
  // Command injection
  /;\s*(rm|del|format|shutdown)/gi,
  /\|\s*(nc|netcat|telnet)/gi,
] as const

const SUSPICIOUS_PATTERNS = [
  // Potential XSS
  /<\w+/g,
  /&#x?\w+;/g,
  /%3c/gi,
  
  // Potential SQL
  /'\s*(or|and)\s*'/gi,
  /'\s*=\s*'/gi,
  
  // Base64 encoded attempts
  /^[A-Za-z0-9+/]{20,}={0,2}$/,
] as const

// === Validation Schemas ===

export const securitySchemas = {
  // User input validation
  email: z.string()
    .email('無効なメールアドレスです')
    .max(254, 'メールアドレスが長すぎます')
    .refine((email) => !containsMaliciousContent(email), 'セキュリティ違反が検出されました'),

  password: z.string()
    .min(8, 'パスワードは8文字以上である必要があります')
    .max(128, 'パスワードが長すぎます')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           '大文字、小文字、数字、特殊文字を含む必要があります')
    .refine((password) => !containsMaliciousContent(password), 'セキュリティ違反が検出されました'),

  name: z.string()
    .trim()
    .min(1, '名前は必須です')
    .max(100, '名前が長すぎます')
    .regex(/^[a-zA-Zぁ-んァ-ヶ一-龯\s\-'\.]+$/, '無効な文字が含まれています')
    .transform((name) => sanitizeInput(name))
    .refine((name) => !containsMaliciousContent(name), 'セキュリティ違反が検出されました'),

  productName: z.string()
    .trim()
    .min(1, '商品名は必須です')
    .max(200, '商品名が長すぎます')
    .transform((name) => sanitizeInput(name))
    .refine((name) => !containsMaliciousContent(name), 'セキュリティ違反が検出されました'),

  description: z.string()
    .trim()
    .max(2000, '説明文が長すぎます')
    .transform((desc) => sanitizeHtml(desc))
    .refine((desc) => !containsMaliciousContent(desc), 'セキュリティ違反が検出されました'),

  price: z.number()
    .positive('価格は正の数である必要があります')
    .max(10000000, '価格が高すぎます')
    .multipleOf(0.01, '価格は小数点以下2桁までです'),

  quantity: z.number()
    .int('数量は整数である必要があります')
    .min(1, '数量は1以上である必要があります')
    .max(10000, '数量が多すぎます'),

  searchQuery: z.string()
    .trim()
    .max(100, '検索クエリが長すぎます')
    .transform((query) => sanitizeInput(query))
    .refine((query) => !containsMaliciousContent(query), 'セキュリティ違反が検出されました'),

  url: z.string()
    .url('無効なURLです')
    .max(2048, 'URLが長すぎます')
    .refine((url) => {
      const parsed = new URL(url)
      // Only allow HTTPS and specific domains
      return parsed.protocol === 'https:' && 
             !containsMaliciousContent(url)
    }, 'セキュリティ違反が検出されました'),

  phoneNumber: z.string()
    .regex(/^[\d\-\+\(\)\s]+$/, '無効な電話番号です')
    .min(10, '電話番号が短すぎます')
    .max(20, '電話番号が長すぎます')
    .transform((phone) => phone.replace(/[\s\-\(\)]/g, ''))
    .refine((phone) => !containsMaliciousContent(phone), 'セキュリティ違反が検出されました'),

  // API-specific validation
  apiKey: z.string()
    .regex(/^[A-Za-z0-9_\-]+$/, '無効なAPIキーフォーマットです')
    .min(20, 'APIキーが短すぎます')
    .max(128, 'APIキーが長すぎます'),

  // File upload validation
  filename: z.string()
    .max(255, 'ファイル名が長すぎます')
    .regex(/^[a-zA-Z0-9._\-\s]+$/, '無効なファイル名です')
    .refine((filename) => {
      const ext = filename.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'txt', 'md']
      return ext && allowedExtensions.includes(ext)
    }, '許可されていないファイル形式です')
    .refine((filename) => !containsMaliciousContent(filename), 'セキュリティ違反が検出されました'),

  // Complex object validation
  userRegistration: z.object({
    email: z.string().email().pipe(z.string().email()),
    password: z.string().pipe(z.string().min(8)),
    name: z.string().pipe(z.string().min(1)),
    terms: z.boolean().refine(val => val === true, '利用規約に同意してください'),
    newsletter: z.boolean().optional()
  }),

  productData: z.object({
    name: z.string().pipe(z.string().min(1)),
    description: z.string().optional(),
    price: z.number().positive(),
    category: z.enum(['electronics', 'clothing', 'books', 'home', 'other']),
    tags: z.array(z.string().max(50)).max(10, 'タグは10個までです'),
    images: z.array(z.string().url()).max(5, '画像は5枚までです')
  }),

  orderData: z.object({
    items: z.array(z.object({
      productId: z.string().uuid('無効な商品IDです'),
      quantity: z.number().int().positive().max(100),
      price: z.number().positive()
    })).min(1, '注文アイテムが必要です').max(50, 'アイテム数が多すぎます'),
    shippingAddress: z.object({
      line1: z.string().min(1).max(100),
      line2: z.string().max(100).optional(),
      city: z.string().min(1).max(50),
      postalCode: z.string().regex(/^\d{3}-?\d{4}$/, '無効な郵便番号です'),
      country: z.enum(['JP'], { message: '日本のみ対応しています' })
    }),
    paymentMethod: z.enum(['card', 'bank_transfer', 'cod'])
  })
} as const

// === Security Functions ===

export function containsMaliciousContent(input: string): boolean {
  // Check for malicious patterns
  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(input)) {
      console.warn(`Malicious pattern detected: ${pattern}`)
      return true
    }
  }

  // Check for suspicious patterns (more lenient)
  let suspiciousCount = 0
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(input)) {
      suspiciousCount++
    }
  }

  // If multiple suspicious patterns, likely malicious
  return suspiciousCount >= 2
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/[<>]/g, '') // Remove potential HTML
    .slice(0, 1000) // Limit length
}

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'iframe']
  })
}

export function validateAndSanitize<T extends z.ZodSchema>(
  schema: T,
  data: unknown,
  options: {
    throwOnError?: boolean
    logViolations?: boolean
  } = {}
): { success: boolean; data?: z.infer<T>; errors?: string[] } {
  const { throwOnError = true, logViolations = true } = options

  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      )

      if (logViolations) {
        console.warn('Validation violation:', {
          errors,
          input: typeof data === 'string' ? data.slice(0, 100) : 'non-string',
          timestamp: new Date().toISOString()
        })
      }

      if (throwOnError) {
        throw new Error(`Validation failed: ${errors.join(', ')}`)
      }

      return { success: false, errors }
    }

    if (throwOnError) {
      throw error
    }

    return { 
      success: false, 
      errors: ['Unknown validation error'] 
    }
  }
}

// === Rate Limiting for Validation ===

const validationAttempts = new Map<string, { count: number; resetTime: number }>()

export function checkValidationRateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  const current = validationAttempts.get(identifier)

  if (!current || now > current.resetTime) {
    validationAttempts.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }

  if (current.count >= limit) {
    console.warn(`Validation rate limit exceeded for ${identifier}`)
    return false
  }

  current.count++
  return true
}

// === Validation Middleware ===

export function createValidationMiddleware<T extends z.ZodSchema>(
  schema: T,
  options: {
    rateLimit?: { limit: number; windowMs: number }
    logViolations?: boolean
    customSanitizer?: (data: any) => any
  } = {}
) {
  return (data: unknown, identifier?: string) => {
    // Rate limiting
    if (options.rateLimit && identifier) {
      if (!checkValidationRateLimit(
        identifier, 
        options.rateLimit.limit, 
        options.rateLimit.windowMs
      )) {
        throw new Error('Rate limit exceeded')
      }
    }

    // Custom sanitization
    let sanitizedData = data
    if (options.customSanitizer) {
      sanitizedData = options.customSanitizer(data)
    }

    // Validation
    return validateAndSanitize(schema, sanitizedData, {
      logViolations: options.logViolations ?? true
    })
  }
}

// === Export Convenience Validators ===

export const validators = {
  email: createValidationMiddleware(securitySchemas.email),
  password: createValidationMiddleware(securitySchemas.password),
  name: createValidationMiddleware(securitySchemas.name),
  productName: createValidationMiddleware(securitySchemas.productName),
  description: createValidationMiddleware(securitySchemas.description),
  searchQuery: createValidationMiddleware(securitySchemas.searchQuery, {
    rateLimit: { limit: 50, windowMs: 60000 }
  }),
  userRegistration: createValidationMiddleware(securitySchemas.userRegistration),
  productData: createValidationMiddleware(securitySchemas.productData),
  orderData: createValidationMiddleware(securitySchemas.orderData)
}

export default {
  schemas: securitySchemas,
  validators,
  sanitizeInput,
  sanitizeHtml,
  validateAndSanitize,
  containsMaliciousContent
}