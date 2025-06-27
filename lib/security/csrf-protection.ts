/**
 * 🛡️ ULTRA CSRF PROTECTION SYSTEM
 * 
 * Revolutionary CSRF protection with multi-layer security:
 * - Cryptographically secure token generation
 * - Double submit cookie pattern
 * - SameSite cookie enforcement
 * - Origin validation
 * - Referer header validation
 * - Token rotation and expiry
 */

import { NextRequest, NextResponse } from 'next/server'
import { randomBytes, createHmac, timingSafeEqual } from 'crypto'

// === Configuration ===

const CSRF_CONFIG = {
  tokenLength: 32,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  cookieName: '__Host-csrf-token',
  headerName: 'x-csrf-token',
  secret: process.env.CSRF_SECRET || 'ultra-secure-csrf-secret-change-in-production',
  algorithm: 'sha256' as const,
  secureCookie: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
} as const

// === Token Management ===

interface CSRFToken {
  value: string
  timestamp: number
  hmac: string
}

export function generateCSRFToken(): CSRFToken {
  const timestamp = Date.now()
  const randomValue = randomBytes(CSRF_CONFIG.tokenLength).toString('base64url')
  const value = `${timestamp}.${randomValue}`
  
  // Create HMAC for token integrity
  const hmac = createHmac(CSRF_CONFIG.algorithm, CSRF_CONFIG.secret)
    .update(value)
    .digest('base64url')
  
  return {
    value,
    timestamp,
    hmac
  }
}

export function verifyCSRFToken(token: string, expectedHmac: string): boolean {
  try {
    // Verify HMAC
    const hmac = createHmac(CSRF_CONFIG.algorithm, CSRF_CONFIG.secret)
      .update(token)
      .digest('base64url')
    
    if (!timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      console.warn('CSRF token HMAC verification failed')
      return false
    }

    // Extract timestamp
    const [timestampStr] = token.split('.')
    const timestamp = parseInt(timestampStr || '0', 10)
    
    if (isNaN(timestamp)) {
      console.warn('CSRF token timestamp invalid')
      return false
    }

    // Check expiry
    const now = Date.now()
    if (now - timestamp > CSRF_CONFIG.maxAge) {
      console.warn('CSRF token expired')
      return false
    }

    return true
  } catch (error) {
    console.error('CSRF token verification error:', error)
    return false
  }
}

export function isTokenExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CSRF_CONFIG.maxAge
}

// === Cookie Management ===

export function setCSRFCookie(response: NextResponse, token: CSRFToken): void {
  const cookieValue = `${token.value}.${token.hmac}`
  
  response.cookies.set(CSRF_CONFIG.cookieName, cookieValue, {
    httpOnly: true,
    secure: CSRF_CONFIG.secureCookie,
    sameSite: CSRF_CONFIG.sameSite,
    maxAge: CSRF_CONFIG.maxAge / 1000, // Convert to seconds
    path: '/'
  })
}

export function getCSRFTokenFromCookie(request: NextRequest): CSRFToken | null {
  try {
    const cookieValue = request.cookies.get(CSRF_CONFIG.cookieName)?.value
    if (!cookieValue) return null

    const [tokenValue, hmac] = cookieValue.split('.')
    if (!tokenValue || !hmac) return null

    const [timestampStr] = tokenValue.split('.')
    const timestamp = parseInt(timestampStr || '0', 10)
    
    if (isNaN(timestamp)) return null

    return {
      value: tokenValue,
      timestamp,
      hmac
    }
  } catch (error) {
    console.error('Error parsing CSRF cookie:', error)
    return null
  }
}

// === Origin & Referer Validation ===

export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  
  if (!origin && !host) {
    console.warn('Missing origin and host headers')
    return false
  }

  // Same-origin check
  if (origin) {
    const expectedOrigin = `${request.nextUrl.protocol}//${host}`
    
    if (origin !== expectedOrigin) {
      // Check against allowed origins
      if (!CSRF_CONFIG.allowedOrigins.includes(origin)) {
        console.warn(`Origin validation failed: ${origin} not in allowed list`)
        return false
      }
    }
  }

  // Referer validation for additional security
  const referer = request.headers.get('referer')
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const expectedHost = host || request.nextUrl.host
      
      if (refererUrl.host !== expectedHost) {
        console.warn(`Referer validation failed: ${refererUrl.host} !== ${expectedHost}`)
        return false
      }
    } catch (error) {
      console.warn('Invalid referer header:', referer)
      return false
    }
  }

  return true
}

// === CSRF Middleware ===

export function createCSRFMiddleware(options: {
  skipPaths?: string[]
  skipMethods?: string[]
  customValidation?: (request: NextRequest) => boolean
} = {}) {
  const {
    skipPaths = ['/api/health', '/api/monitoring'],
    skipMethods = ['GET', 'HEAD', 'OPTIONS'],
    customValidation
  } = options

  return async (request: NextRequest): Promise<NextResponse | null> => {
    const { pathname } = request.nextUrl
    const method = request.method

    // Skip CSRF protection for certain paths and methods
    if (skipMethods.includes(method) || skipPaths.some(path => pathname.startsWith(path))) {
      return null
    }

    // Custom validation logic
    if (customValidation && !customValidation(request)) {
      return new NextResponse('CSRF validation failed', { status: 403 })
    }

    // Validate origin and referer
    if (!validateOrigin(request)) {
      return new NextResponse('Origin validation failed', { status: 403 })
    }

    // Get CSRF token from cookie
    const cookieToken = getCSRFTokenFromCookie(request)
    if (!cookieToken) {
      return new NextResponse('CSRF token missing', { status: 403 })
    }

    // Get CSRF token from header
    const headerToken = request.headers.get(CSRF_CONFIG.headerName)
    if (!headerToken) {
      return new NextResponse('CSRF header missing', { status: 403 })
    }

    // Double submit pattern validation
    if (headerToken !== cookieToken.value) {
      console.warn('CSRF double submit pattern failed')
      return new NextResponse('CSRF token mismatch', { status: 403 })
    }

    // Verify token integrity and expiry
    if (!verifyCSRFToken(cookieToken.value, cookieToken.hmac)) {
      return new NextResponse('CSRF token invalid', { status: 403 })
    }

    return null // Continue with request
  }
}

// === API Helpers ===

export function generateCSRFResponse(): { token: string; cookie: string } {
  const csrfToken = generateCSRFToken()
  const cookieValue = `${csrfToken.value}.${csrfToken.hmac}`
  
  return {
    token: csrfToken.value,
    cookie: cookieValue
  }
}

export async function validateCSRFFromRequest(request: NextRequest): Promise<boolean> {
  try {
    // Get tokens
    const cookieToken = getCSRFTokenFromCookie(request)
    const headerToken = request.headers.get(CSRF_CONFIG.headerName)

    if (!cookieToken || !headerToken) {
      return false
    }

    // Double submit validation
    if (headerToken !== cookieToken.value) {
      return false
    }

    // Token integrity validation
    return verifyCSRFToken(cookieToken.value, cookieToken.hmac)
  } catch (error) {
    console.error('CSRF validation error:', error)
    return false
  }
}

// === React Hook for Client-Side ===

export function useCSRFToken() {
  const getToken = (): string | null => {
    if (typeof window === 'undefined') return null
    
    // Try to get from meta tag first
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    if (metaToken) return metaToken

    // Try to get from cookie (for client-side access)
    const cookieMatch = document.cookie.match(new RegExp(`${CSRF_CONFIG.cookieName}=([^;]+)`))
    if (cookieMatch && cookieMatch[1]) {
      const [tokenValue] = cookieMatch[1].split('.')
      return tokenValue || null
    }

    return null
  }

  const addCSRFHeaders = (headers: HeadersInit = {}): HeadersInit => {
    const token = getToken()
    if (!token) {
      console.warn('CSRF token not available')
      return headers
    }

    return {
      ...headers,
      [CSRF_CONFIG.headerName]: token
    }
  }

  return {
    getToken,
    addCSRFHeaders,
    headerName: CSRF_CONFIG.headerName
  }
}

// === Utilities ===

export function createCSRFMetaTag(token: string): string {
  return `<meta name="csrf-token" content="${token}" />`
}

export function rotateCSRFToken(currentToken: CSRFToken): CSRFToken {
  // Generate new token if current one is close to expiry
  const timeRemaining = CSRF_CONFIG.maxAge - (Date.now() - currentToken.timestamp)
  const rotationThreshold = CSRF_CONFIG.maxAge * 0.25 // Rotate when 75% expired

  if (timeRemaining < rotationThreshold) {
    return generateCSRFToken()
  }

  return currentToken
}

// === Export Configuration ===

export { CSRF_CONFIG }

export default {
  generateCSRFToken,
  verifyCSRFToken,
  setCSRFCookie,
  getCSRFTokenFromCookie,
  validateOrigin,
  createCSRFMiddleware,
  generateCSRFResponse,
  validateCSRFFromRequest,
  useCSRFToken,
  createCSRFMetaTag,
  rotateCSRFToken,
  CSRF_CONFIG
}