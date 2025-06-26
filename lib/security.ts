import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

// Ultra-fast rate limiting
const RATE_LIMIT_WINDOW = 15 * 60 * 1000
const MAX_REQUESTS = 100
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0] || request.ip || 'unknown'
  return `rate_limit:${ip}`
}

export function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = requestCounts.get(key)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }
  
  record.count++
  return record.count > MAX_REQUESTS 
    ? { allowed: false, remaining: 0 }
    : { allowed: true, remaining: MAX_REQUESTS - record.count }
}

// CSRF protection
export function validateCSRFToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token')
  const sessionCsrf = request.cookies.get('csrf-token')?.value
  
  if (!csrfToken || !sessionCsrf) {
    return false
  }
  
  return csrfToken === sessionCsrf
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS vectors
    .replace(/['"]/g, '') // Remove quotes
    .trim()
    .substring(0, 1000) // Limit length
}

// SQL injection protection
export function validateDatabaseInput(input: string): boolean {
  const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i
  return !sqlInjectionPattern.test(input)
}

// Compact CSP
export const CSP_HEADER = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'"

// Security headers
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': CSP_HEADER,
}

// Authentication helpers
export function generateSecureToken(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  
  // Fallback for environments without crypto
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}

// Password validation
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('大文字を1文字以上含む必要があります')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('小文字を1文字以上含む必要があります')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('数字を1文字以上含む必要があります')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('記号を1文字以上含む必要があります')
  }
  
  return { valid: errors.length === 0, errors }
}

// Environment validation
export function validateEnvironmentVariables(): { valid: boolean; missing: string[] } {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ]
  
  const missing = required.filter(env => !process.env[env])
  
  return { valid: missing.length === 0, missing }
}