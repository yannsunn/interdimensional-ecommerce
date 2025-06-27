/**
 * 🚫 ULTRA XSS PROTECTION SYSTEM
 * 
 * Revolutionary XSS protection with comprehensive security:
 * - Advanced content sanitization with whitelist approach
 * - Content Security Policy (CSP) with nonce generation
 * - DOM-based XSS prevention
 * - Input/Output encoding
 * - Safe HTML rendering utilities
 * - Real-time XSS pattern detection
 */

import DOMPurify from 'isomorphic-dompurify'
import { randomBytes } from 'crypto'

// === Configuration ===

const XSS_CONFIG = {
  domPurify: {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'i', 'b',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote',
      'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'id'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'iframe', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    ALLOW_DATA_ATTR: false,
    STRIP_COMMENTS: true,
    KEEP_CONTENT: false
  },
  patterns: {
    // JavaScript protocol detection
    jsProtocol: /^\s*javascript:/i,
    
    // Event handler detection
    eventHandlers: /\son\w+\s*=/gi,
    
    // Script tag detection
    scriptTags: /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    
    // Data URLs
    dataUrls: /data:\s*text\/html/gi,
    
    // VBScript
    vbscript: /vbscript:/gi,
    
    // Expression() CSS
    cssExpression: /expression\s*\(/gi,
    
    // Import statements
    importStatements: /@import|import\s+/gi,
    
    // Suspicious attributes
    suspiciousAttrs: /\b(?:src|href|action|formaction|background|poster)\s*=\s*["']?(?:javascript|data|vbscript):/gi
  }
} as const

// === XSS Patterns Detection ===

export interface XSSDetectionResult {
  isClean: boolean
  threats: string[]
  sanitized?: string
  confidence: number
}

export function detectXSSPatterns(input: string): XSSDetectionResult {
  const threats: string[] = []
  let confidence = 0

  // Check for JavaScript protocols
  if (XSS_CONFIG.patterns.jsProtocol.test(input)) {
    threats.push('JavaScript protocol detected')
    confidence += 30
  }

  // Check for event handlers
  const eventMatches = input.match(XSS_CONFIG.patterns.eventHandlers)
  if (eventMatches) {
    threats.push(`Event handlers detected: ${eventMatches.length}`)
    confidence += eventMatches.length * 20
  }

  // Check for script tags
  const scriptMatches = input.match(XSS_CONFIG.patterns.scriptTags)
  if (scriptMatches) {
    threats.push(`Script tags detected: ${scriptMatches.length}`)
    confidence += scriptMatches.length * 40
  }

  // Check for data URLs
  if (XSS_CONFIG.patterns.dataUrls.test(input)) {
    threats.push('Data URL with HTML detected')
    confidence += 25
  }

  // Check for VBScript
  if (XSS_CONFIG.patterns.vbscript.test(input)) {
    threats.push('VBScript protocol detected')
    confidence += 35
  }

  // Check for CSS expressions
  if (XSS_CONFIG.patterns.cssExpression.test(input)) {
    threats.push('CSS expression detected')
    confidence += 30
  }

  // Check for import statements
  if (XSS_CONFIG.patterns.importStatements.test(input)) {
    threats.push('Import statement detected')
    confidence += 20
  }

  // Check for suspicious attributes
  const attrMatches = input.match(XSS_CONFIG.patterns.suspiciousAttrs)
  if (attrMatches) {
    threats.push(`Suspicious attributes detected: ${attrMatches.length}`)
    confidence += attrMatches.length * 15
  }

  // Additional heuristics
  const suspiciousChars = ['<', '>', '"', "'", '&', '%'].filter(char => input.includes(char))
  if (suspiciousChars.length > 2) {
    confidence += suspiciousChars.length * 2
  }

  return {
    isClean: threats.length === 0,
    threats,
    confidence: Math.min(confidence, 100)
  }
}

// === Content Sanitization ===

export class UltraSanitizer {
  private config: typeof XSS_CONFIG.domPurify

  constructor(customConfig?: Partial<typeof XSS_CONFIG.domPurify>) {
    this.config = { ...XSS_CONFIG.domPurify, ...customConfig }
  }

  sanitizeHtml(html: string, options?: {
    allowedTags?: string[]
    allowedAttributes?: string[]
    strict?: boolean
  }): string {
    const { allowedTags, allowedAttributes, strict = false } = options || {}

    const config = {
      ...this.config,
      ...(allowedTags && { ALLOWED_TAGS: allowedTags }),
      ...(allowedAttributes && { ALLOWED_ATTR: allowedAttributes }),
      ...(strict && {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
        ALLOWED_ATTR: [],
        KEEP_CONTENT: true
      })
    }

    try {
      return DOMPurify.sanitize(html, config)
    } catch (error) {
      console.error('HTML sanitization error:', error)
      return this.stripAllTags(html)
    }
  }

  sanitizeText(text: string): string {
    return text
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/[&]/g, '&amp;') // Escape ampersands
      .replace(/['"]/g, (match) => match === '"' ? '&quot;' : '&#x27;') // Escape quotes
      .replace(/\//g, '&#x2F;') // Escape forward slashes
      .trim()
  }

  sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url)
      
      // Only allow specific protocols
      const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
      if (!allowedProtocols.includes(parsed.protocol)) {
        return ''
      }

      // Check for XSS patterns in URL
      const detection = detectXSSPatterns(url)
      if (!detection.isClean) {
        console.warn('XSS patterns detected in URL:', detection.threats)
        return ''
      }

      return parsed.toString()
    } catch (error) {
      return ''
    }
  }

  sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[<>:"/\\|?*]/g, '') // Remove invalid file characters
      .replace(/\.\./g, '') // Remove directory traversal
      .replace(/^\.+/, '') // Remove leading dots
      .trim()
      .slice(0, 255) // Limit length
  }

  stripAllTags(html: string): string {
    return html.replace(/<[^>]*>/g, '')
  }

  encodeHtmlEntities(text: string): string {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }

    return text.replace(/[&<>"'\/]/g, (match) => entities[match] || match)
  }

  decodeHtmlEntities(text: string): string {
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x2F;': '/'
    }

    return text.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, (match) => entities[match] || match)
  }
}

// === Content Security Policy ===

export interface CSPDirectives {
  'default-src'?: string[]
  'script-src'?: string[]
  'style-src'?: string[]
  'img-src'?: string[]
  'font-src'?: string[]
  'connect-src'?: string[]
  'frame-src'?: string[]
  'object-src'?: string[]
  'media-src'?: string[]
  'child-src'?: string[]
  'form-action'?: string[]
  'frame-ancestors'?: string[]
  'base-uri'?: string[]
  'upgrade-insecure-requests'?: boolean
  'block-all-mixed-content'?: boolean
}

export class CSPManager {
  private nonces = new Set<string>()

  generateNonce(): string {
    const nonce = randomBytes(16).toString('base64')
    this.nonces.add(nonce)
    
    // Clean up old nonces (keep last 100)
    if (this.nonces.size > 100) {
      const nonceArray = Array.from(this.nonces)
      this.nonces.clear()
      nonceArray.slice(-100).forEach(n => this.nonces.add(n))
    }

    return nonce
  }

  validateNonce(nonce: string): boolean {
    return this.nonces.has(nonce)
  }

  buildCSPHeader(directives: CSPDirectives, options?: {
    nonce?: string
    reportUri?: string
    reportOnly?: boolean
  }): string {
    const { nonce, reportUri, reportOnly = false } = options || {}
    const cspDirectives: string[] = []

    // Build directive strings
    for (const [directive, values] of Object.entries(directives)) {
      if (directive === 'upgrade-insecure-requests' && values === true) {
        cspDirectives.push('upgrade-insecure-requests')
        continue
      }

      if (directive === 'block-all-mixed-content' && values === true) {
        cspDirectives.push('block-all-mixed-content')
        continue
      }

      if (Array.isArray(values) && values.length > 0) {
        let directiveValue = values.join(' ')
        
        // Add nonce to script-src and style-src if provided
        if (nonce && (directive === 'script-src' || directive === 'style-src')) {
          directiveValue += ` 'nonce-${nonce}'`
        }

        cspDirectives.push(`${directive} ${directiveValue}`)
      }
    }

    // Add report URI if provided
    if (reportUri) {
      cspDirectives.push(`report-uri ${reportUri}`)
    }

    const headerName = reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy'
    return cspDirectives.join('; ')
  }

  getStrictCSP(nonce?: string): CSPDirectives {
    return {
      'default-src': ["'none'"],
      'script-src': ["'self'", "'unsafe-inline'"], // Will add nonce in buildCSPHeader
      'style-src': ["'self'", "'unsafe-inline'"], // Will add nonce in buildCSPHeader
      'img-src': ["'self'", 'data:', 'https:'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': ["'self'"],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': true,
      'block-all-mixed-content': true
    }
  }

  getRelaxedCSP(): CSPDirectives {
    return {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.jsdelivr.net'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': ["'self'", 'https:'],
      'frame-src': ["'self'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'upgrade-insecure-requests': true
    }
  }
}

// === Safe Rendering Utilities ===

export interface SafeRenderOptions {
  allowHtml?: boolean
  maxLength?: number
  sanitizer?: UltraSanitizer
  escapeHtml?: boolean
}

export function safeRender(
  content: string,
  options: SafeRenderOptions = {}
): string {
  const {
    allowHtml = false,
    maxLength = 10000,
    sanitizer = new UltraSanitizer(),
    escapeHtml = true
  } = options

  // Truncate content
  let processedContent = content.slice(0, maxLength)

  if (allowHtml) {
    // Sanitize HTML content
    processedContent = sanitizer.sanitizeHtml(processedContent)
  } else if (escapeHtml) {
    // Escape HTML entities
    processedContent = sanitizer.encodeHtmlEntities(processedContent)
  } else {
    // Strip all HTML tags
    processedContent = sanitizer.stripAllTags(processedContent)
  }

  return processedContent
}

export function createSafeInnerHTML(html: string, sanitizer = new UltraSanitizer()): { __html: string } {
  return {
    __html: sanitizer.sanitizeHtml(html)
  }
}

// === React Components Utilities ===

export function useSafeHTML(html: string, options?: SafeRenderOptions) {
  const sanitizer = new UltraSanitizer()
  
  return {
    dangerouslySetInnerHTML: createSafeInnerHTML(html, sanitizer),
    textContent: safeRender(html, { ...options, allowHtml: false })
  }
}

// === Export Instances ===

export const defaultSanitizer = new UltraSanitizer()
export const cspManager = new CSPManager()

// === Middleware Integration ===

export function createXSSProtectionMiddleware(options?: {
  csp?: CSPDirectives
  reportUri?: string
  reportOnly?: boolean
}) {
  return (request: Request): Record<string, string> => {
    const nonce = cspManager.generateNonce()
    const headers: Record<string, string> = {}

    // Set XSS protection headers
    headers['X-Content-Type-Options'] = 'nosniff'
    headers['X-Frame-Options'] = 'DENY'
    headers['X-XSS-Protection'] = '1; mode=block'
    headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'

    // Set CSP header
    if (options?.csp) {
      headers['Content-Security-Policy'] = cspManager.buildCSPHeader(
        options.csp,
        {
          nonce,
          reportUri: options.reportUri,
          reportOnly: options.reportOnly
        }
      )
    }

    return headers
  }
}

export default {
  detectXSSPatterns,
  UltraSanitizer,
  CSPManager,
  safeRender,
  createSafeInnerHTML,
  useSafeHTML,
  defaultSanitizer,
  cspManager,
  createXSSProtectionMiddleware,
  XSS_CONFIG
}