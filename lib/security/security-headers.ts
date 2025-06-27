/**
 * 🛡️ ULTRA SECURITY HEADERS SYSTEM
 * 
 * Revolutionary security headers with OWASP compliance:
 * - Complete OWASP security header implementation
 * - Content Security Policy with advanced directives
 * - HSTS with preload support
 * - Cross-origin isolation and security
 * - Feature policy enforcement
 * - Advanced threat protection headers
 */

import { NextResponse } from 'next/server'

// === Configuration ===

export interface SecurityHeadersConfig {
  // Content Security Policy
  csp?: {
    enabled: boolean
    directives: CSPDirectives
    reportUri?: string
    reportOnly?: boolean
    nonce?: string
  }
  
  // HTTP Strict Transport Security
  hsts?: {
    enabled: boolean
    maxAge: number
    includeSubDomains: boolean
    preload: boolean
  }
  
  // Cross-Origin settings
  crossOrigin?: {
    embedderPolicy: 'require-corp' | 'unsafe-none'
    openerPolicy: 'same-origin' | 'same-origin-allow-popups' | 'unsafe-none'
    resourcePolicy: 'same-site' | 'same-origin' | 'cross-origin'
  }
  
  // Feature Policy / Permissions Policy
  permissionsPolicy?: {
    camera?: string[]
    microphone?: string[]
    geolocation?: string[]
    payment?: string[]
    usb?: string[]
    battery?: string[]
    accelerometer?: string[]
    gyroscope?: string[]
    magnetometer?: string[]
    displayCapture?: string[]
  }
  
  // Additional security settings
  additional?: {
    nosniff: boolean
    frameOptions: 'DENY' | 'SAMEORIGIN' | string
    xssProtection: boolean
    referrerPolicy: string
    dnsPrefetchControl: boolean
    crossOriginIsolation: boolean
  }
}

interface CSPDirectives {
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
  'worker-src'?: string[]
  'manifest-src'?: string[]
  'form-action'?: string[]
  'frame-ancestors'?: string[]
  'base-uri'?: string[]
  'report-uri'?: string[]
  'report-to'?: string[]
  'require-trusted-types-for'?: string[]
  'trusted-types'?: string[]
  'upgrade-insecure-requests'?: boolean
  'block-all-mixed-content'?: boolean
}

// === Default Configuration ===

const DEFAULT_CONFIG: Required<SecurityHeadersConfig> = {
  csp: {
    enabled: true,
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': ["'self'", 'https:'],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': true,
      'block-all-mixed-content': true
    },
    reportOnly: false
  },
  
  hsts: {
    enabled: true,
    maxAge: 63072000, // 2 years
    includeSubDomains: true,
    preload: true
  },
  
  crossOrigin: {
    embedderPolicy: 'require-corp',
    openerPolicy: 'same-origin',
    resourcePolicy: 'same-origin'
  },
  
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: ["'self'"],
    payment: ["'self'"],
    usb: [],
    battery: [],
    accelerometer: [],
    gyroscope: [],
    magnetometer: [],
    displayCapture: []
  },
  
  additional: {
    nosniff: true,
    frameOptions: 'DENY',
    xssProtection: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    dnsPrefetchControl: true,
    crossOriginIsolation: true
  }
}

// === Security Headers Manager ===

export class SecurityHeadersManager {
  private config: Required<SecurityHeadersConfig>

  constructor(config?: Partial<SecurityHeadersConfig>) {
    this.config = this.mergeConfig(DEFAULT_CONFIG, config || {})
  }

  private mergeConfig(
    defaultConfig: Required<SecurityHeadersConfig>,
    userConfig: Partial<SecurityHeadersConfig>
  ): Required<SecurityHeadersConfig> {
    return {
      csp: { ...defaultConfig.csp, ...userConfig.csp },
      hsts: { ...defaultConfig.hsts, ...userConfig.hsts },
      crossOrigin: { ...defaultConfig.crossOrigin, ...userConfig.crossOrigin },
      permissionsPolicy: { ...defaultConfig.permissionsPolicy, ...userConfig.permissionsPolicy },
      additional: { ...defaultConfig.additional, ...userConfig.additional }
    }
  }

  generateHeaders(nonce?: string): Record<string, string> {
    const headers: Record<string, string> = {}

    // Content Security Policy
    if (this.config.csp.enabled) {
      const cspOptions: { nonce?: string; reportUri?: string } = {}
      if (nonce) cspOptions.nonce = nonce
      if (this.config.csp.reportUri) cspOptions.reportUri = this.config.csp.reportUri
      
      headers[this.config.csp.reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy'] = 
        this.buildCSPHeader(this.config.csp.directives, cspOptions)
    }

    // HTTP Strict Transport Security
    if (this.config.hsts.enabled) {
      headers['Strict-Transport-Security'] = this.buildHSTSHeader()
    }

    // Cross-Origin headers
    headers['Cross-Origin-Embedder-Policy'] = this.config.crossOrigin.embedderPolicy
    headers['Cross-Origin-Opener-Policy'] = this.config.crossOrigin.openerPolicy
    headers['Cross-Origin-Resource-Policy'] = this.config.crossOrigin.resourcePolicy

    // Permissions Policy (Feature Policy)
    const permissionsPolicy = this.buildPermissionsPolicyHeader()
    if (permissionsPolicy) {
      headers['Permissions-Policy'] = permissionsPolicy
    }

    // Additional security headers
    if (this.config.additional.nosniff) {
      headers['X-Content-Type-Options'] = 'nosniff'
    }

    headers['X-Frame-Options'] = this.config.additional.frameOptions

    if (this.config.additional.xssProtection) {
      headers['X-XSS-Protection'] = '1; mode=block'
    }

    headers['Referrer-Policy'] = this.config.additional.referrerPolicy

    if (this.config.additional.dnsPrefetchControl) {
      headers['X-DNS-Prefetch-Control'] = 'off'
    }

    // Advanced security headers
    headers['X-Permitted-Cross-Domain-Policies'] = 'none'
    headers['X-Download-Options'] = 'noopen'
    headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate'
    headers['Pragma'] = 'no-cache'
    headers['Expires'] = '0'
    headers['Vary'] = 'Origin, Accept-Encoding'

    // Security-related meta headers
    headers['Server'] = '' // Hide server information
    headers['X-Powered-By'] = '' // Hide technology stack

    return headers
  }

  private buildCSPHeader(
    directives: CSPDirectives,
    options?: { nonce?: string; reportUri?: string }
  ): string {
    const cspDirectives: string[] = []

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
        if (options?.nonce && (directive === 'script-src' || directive === 'style-src')) {
          directiveValue += ` 'nonce-${options.nonce}'`
        }

        cspDirectives.push(`${directive} ${directiveValue}`)
      }
    }

    // Add report URI if provided
    if (options?.reportUri) {
      cspDirectives.push(`report-uri ${options.reportUri}`)
    }

    return cspDirectives.join('; ')
  }

  private buildHSTSHeader(): string {
    const parts = [`max-age=${this.config.hsts.maxAge}`]
    
    if (this.config.hsts.includeSubDomains) {
      parts.push('includeSubDomains')
    }
    
    if (this.config.hsts.preload) {
      parts.push('preload')
    }
    
    return parts.join('; ')
  }

  private buildPermissionsPolicyHeader(): string {
    const policies: string[] = []

    for (const [feature, allowlist] of Object.entries(this.config.permissionsPolicy)) {
      if (Array.isArray(allowlist)) {
        const value = allowlist.length === 0 ? '()' : `(${allowlist.join(' ')})`
        policies.push(`${feature}=${value}`)
      }
    }

    return policies.join(', ')
  }

  updateConfig(updates: Partial<SecurityHeadersConfig>): void {
    this.config = this.mergeConfig(this.config, updates)
  }

  addCSPDirective(directive: keyof CSPDirectives, values: string[]): void {
    // Only allow string array directives
    if (directive === 'upgrade-insecure-requests' || directive === 'block-all-mixed-content') {
      console.warn(`Cannot add string values to boolean directive: ${directive}`)
      return
    }
    
    if (!this.config.csp.directives[directive]) {
      (this.config.csp.directives as any)[directive] = []
    }
    
    const currentValues = this.config.csp.directives[directive] as string[]
    (this.config.csp.directives as any)[directive] = [...new Set([...currentValues, ...values])]
  }

  removeCSPDirective(directive: keyof CSPDirectives): void {
    delete this.config.csp.directives[directive]
  }

  setHSTS(enabled: boolean, maxAge?: number): void {
    this.config.hsts.enabled = enabled
    if (maxAge !== undefined) {
      this.config.hsts.maxAge = maxAge
    }
  }
}

// === Security Header Presets ===

export const SECURITY_PRESETS = {
  // Ultra-strict security for high-security applications
  strict: {
    csp: {
      enabled: true,
      directives: {
        'default-src': ["'none'"],
        'script-src': ["'self'"],
        'style-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'font-src': ["'self'"],
        'connect-src': ["'self'"],
        'frame-src': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': ["'none'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'upgrade-insecure-requests': true,
        'block-all-mixed-content': true,
        'require-trusted-types-for': ["'script'"]
      }
    },
    hsts: {
      enabled: true,
      maxAge: 94608000, // 3 years
      includeSubDomains: true,
      preload: true
    },
    crossOrigin: {
      embedderPolicy: 'require-corp' as const,
      openerPolicy: 'same-origin' as const,
      resourcePolicy: 'same-origin' as const
    },
    additional: {
      nosniff: true,
      frameOptions: 'DENY' as const,
      xssProtection: true,
      referrerPolicy: 'no-referrer',
      dnsPrefetchControl: true,
      crossOriginIsolation: true
    }
  } as Partial<SecurityHeadersConfig>,

  // Balanced security for most applications
  balanced: {
    csp: {
      enabled: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'img-src': ["'self'", 'data:', 'https:'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'connect-src': ["'self'", 'https:'],
        'frame-src': ["'self'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'upgrade-insecure-requests': true
      }
    },
    additional: {
      frameOptions: 'SAMEORIGIN' as const,
      referrerPolicy: 'strict-origin-when-cross-origin'
    }
  } as Partial<SecurityHeadersConfig>,

  // Development-friendly settings
  development: {
    csp: {
      enabled: true,
      reportOnly: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'localhost:*'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'https:', 'http:'],
        'connect-src': ["'self'", 'ws:', 'wss:', 'http:', 'https:']
      }
    },
    hsts: {
      enabled: false
    },
    additional: {
      frameOptions: 'SAMEORIGIN' as const,
      crossOriginIsolation: false
    }
  } as Partial<SecurityHeadersConfig>
}

// === Middleware Integration ===

export function createSecurityHeadersMiddleware(
  config?: Partial<SecurityHeadersConfig>,
  options?: {
    skipPaths?: string[]
    generateNonce?: () => string
  }
) {
  const manager = new SecurityHeadersManager(config)
  const { skipPaths = [], generateNonce } = options || {}

  return (request: Request): NextResponse => {
    const url = new URL(request.url)
    
    // Skip security headers for certain paths
    if (skipPaths.some(path => url.pathname.startsWith(path))) {
      return NextResponse.next()
    }

    // Generate nonce if function provided
    const nonce = generateNonce?.()

    // Generate security headers
    const securityHeaders = manager.generateHeaders(nonce)

    // Create response with security headers
    const response = NextResponse.next()
    
    // Apply all security headers
    for (const [name, value] of Object.entries(securityHeaders)) {
      if (value) { // Only set non-empty values
        response.headers.set(name, value)
      }
    }

    return response
  }
}

// === Validation and Testing ===

export interface SecurityHeadersAnalysis {
  score: number
  maxScore: number
  recommendations: string[]
  warnings: string[]
  compliant: boolean
}

export function analyzeSecurityHeaders(headers: Record<string, string>): SecurityHeadersAnalysis {
  const recommendations: string[] = []
  const warnings: string[] = []
  let score = 0
  const maxScore = 100

  // Check CSP
  if (headers['Content-Security-Policy'] || headers['Content-Security-Policy-Report-Only']) {
    score += 20
    const csp = headers['Content-Security-Policy'] || headers['Content-Security-Policy-Report-Only']
    
    if (csp && csp.includes("'unsafe-eval'")) {
      warnings.push("CSP allows 'unsafe-eval' which can be dangerous")
    }
    
    if (csp && csp.includes("'unsafe-inline'")) {
      warnings.push("CSP allows 'unsafe-inline' which reduces XSS protection")
    }
    
    if (csp && !csp.includes('upgrade-insecure-requests')) {
      recommendations.push('Add upgrade-insecure-requests to CSP')
    }
  } else {
    recommendations.push('Add Content-Security-Policy header')
  }

  // Check HSTS
  if (headers['Strict-Transport-Security']) {
    score += 15
    const hsts = headers['Strict-Transport-Security']
    
    if (!hsts.includes('preload')) {
      recommendations.push('Add preload to HSTS for better security')
    }
    
    if (!hsts.includes('includeSubDomains')) {
      recommendations.push('Add includeSubDomains to HSTS')
    }
  } else {
    recommendations.push('Add Strict-Transport-Security header')
  }

  // Check other important headers
  const importantHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Referrer-Policy'
  ]

  for (const header of importantHeaders) {
    if (headers[header]) {
      score += 10
    } else {
      recommendations.push(`Add ${header} header`)
    }
  }

  // Check modern security headers
  const modernHeaders = [
    'Cross-Origin-Embedder-Policy',
    'Cross-Origin-Opener-Policy',
    'Cross-Origin-Resource-Policy',
    'Permissions-Policy'
  ]

  for (const header of modernHeaders) {
    if (headers[header]) {
      score += 5
    } else {
      recommendations.push(`Consider adding ${header} header`)
    }
  }

  return {
    score,
    maxScore,
    recommendations,
    warnings,
    compliant: score >= 80 && warnings.length === 0
  }
}

// === Export Utilities ===

export function getSecurityGrade(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100
  
  if (percentage >= 95) return 'A+'
  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}

export function generateSecurityReport(headers: Record<string, string>): string {
  const analysis = analyzeSecurityHeaders(headers)
  const grade = getSecurityGrade(analysis.score, analysis.maxScore)
  
  let report = `Security Headers Analysis\n`
  report += `Grade: ${grade} (${analysis.score}/${analysis.maxScore})\n`
  report += `OWASP Compliant: ${analysis.compliant ? 'Yes' : 'No'}\n\n`
  
  if (analysis.warnings.length > 0) {
    report += `Warnings:\n${analysis.warnings.map(w => `- ${w}`).join('\n')}\n\n`
  }
  
  if (analysis.recommendations.length > 0) {
    report += `Recommendations:\n${analysis.recommendations.map(r => `- ${r}`).join('\n')}\n`
  }
  
  return report
}

// === Export Instances ===

export const defaultSecurityHeaders = new SecurityHeadersManager()
export const strictSecurityHeaders = new SecurityHeadersManager(SECURITY_PRESETS.strict)
export const balancedSecurityHeaders = new SecurityHeadersManager(SECURITY_PRESETS.balanced)
export const developmentSecurityHeaders = new SecurityHeadersManager(SECURITY_PRESETS.development)

export default {
  SecurityHeadersManager,
  SECURITY_PRESETS,
  createSecurityHeadersMiddleware,
  analyzeSecurityHeaders,
  getSecurityGrade,
  generateSecurityReport,
  defaultSecurityHeaders,
  strictSecurityHeaders,
  balancedSecurityHeaders,
  developmentSecurityHeaders
}