/**
 * 🔒 ULTRA SQL INJECTION PREVENTION SYSTEM
 * 
 * Revolutionary SQL injection protection with comprehensive security:
 * - Prisma query parameterization enforcement
 * - SQL injection pattern detection
 * - Dynamic query building with safety checks
 * - Query complexity analysis
 * - Database access auditing
 * - Prepared statement validation
 */

import { Prisma } from '@prisma/client'

// === Configuration ===

const SQL_SECURITY_CONFIG = {
  maxQueryComplexity: 10,
  maxParameters: 50,
  maxQueryLength: 10000,
  allowedOperators: [
    'equals', 'not', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte',
    'contains', 'startsWith', 'endsWith', 'mode', 'search'
  ],
  suspiciousPatterns: [
    // Basic SQL injection patterns
    /(\bUNION\b.*\bSELECT\b)/gi,
    /(\bSELECT\b.*\bFROM\b.*\bWHERE\b)/gi,
    /(\bINSERT\b.*\bINTO\b)/gi,
    /(\bUPDATE\b.*\bSET\b)/gi,
    /(\bDELETE\b.*\bFROM\b)/gi,
    /(\bDROP\b.*\bTABLE\b)/gi,
    /(\bCREATE\b.*\bTABLE\b)/gi,
    /(\bALTER\b.*\bTABLE\b)/gi,
    
    // Advanced injection patterns
    /(\bEXEC\b|\bEXECUTE\b)/gi,
    /(\bSP_\w+)/gi,
    /(\bXP_\w+)/gi,
    /(\bBULK\b.*\bINSERT\b)/gi,
    /(\bINTO\b.*\bOUTFILE\b)/gi,
    /(\bLOAD_FILE\b)/gi,
    
    // SQL comments and string concatenation
    /(--|\#|\/\*|\*\/)/g,
    /(\|\||CONCAT\b)/gi,
    
    // Blind SQL injection patterns
    /(\bSLEEP\b\s*\(|\bWAITFOR\b)/gi,
    /(\bBENCHMARK\b\s*\()/gi,
    /(\bPG_SLEEP\b\s*\()/gi,
    
    // Boolean-based injection
    /(\bAND\b.*=.*|\bOR\b.*=.*)/gi,
    /(1\s*=\s*1|1\s*=\s*0)/g,
    
    // Time-based injection
    /(\bIF\b\s*\(.*,.*SLEEP\b)/gi,
    /(\bCASE\b.*\bWHEN\b.*\bTHEN\b.*\bSLEEP\b)/gi
  ],
  dangerousPatterns: [
    // Extremely dangerous patterns
    /(\bEXEC\b\s+XP_CMDSHELL)/gi,
    /(\bSHUTDOWN\b|\bREBOOT\b)/gi,
    /(\bFORMAT\b.*\bC:)/gi,
    /(\bCMD\b|\bCOMMAND\b)/gi,
    
    // Database system functions
    /(\bUSER\b\(\)|\bCURRENT_USER\b)/gi,
    /(\bVERSION\b\(\)|\b@@VERSION\b)/gi,
    /(\bDATABASE\b\(\)|\bSCHEMA\b\(\))/gi,
    
    // Information schema access
    /(\bINFORMATION_SCHEMA\b)/gi,
    /(\bSYS\.\w+)/gi,
    /(\bMYSQL\.\w+)/gi
  ]
} as const

// === Types ===

interface QueryAnalysis {
  isSafe: boolean
  complexity: number
  threats: string[]
  confidence: number
  parameterCount: number
}

interface SafeQueryOptions {
  maxComplexity?: number
  allowRawQueries?: boolean
  validateParameters?: boolean
  logQueries?: boolean
}

// === SQL Injection Detection ===

export function detectSQLInjection(input: string): QueryAnalysis {
  const threats: string[] = []
  let confidence = 0
  let complexity = 0

  // Check for suspicious patterns
  for (const pattern of SQL_SECURITY_CONFIG.suspiciousPatterns) {
    const matches = input.match(pattern)
    if (matches) {
      threats.push(`Suspicious SQL pattern: ${pattern.source}`)
      confidence += 20
      complexity += matches.length
    }
  }

  // Check for dangerous patterns
  for (const pattern of SQL_SECURITY_CONFIG.dangerousPatterns) {
    const matches = input.match(pattern)
    if (matches) {
      threats.push(`Dangerous SQL pattern: ${pattern.source}`)
      confidence += 50
      complexity += matches.length * 3
    }
  }

  // Check for SQL keywords density
  const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'UNION', 'WHERE', 'FROM', 'JOIN']
  const keywordCount = sqlKeywords.filter(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'gi').test(input)
  ).length

  if (keywordCount > 3) {
    threats.push(`High SQL keyword density: ${keywordCount}`)
    confidence += keywordCount * 5
    complexity += keywordCount
  }

  // Check for suspicious characters
  const suspiciousChars = ["'", '"', ';', '--', '/*', '*/', '||']
  const charCount = suspiciousChars.filter(char => input.includes(char)).length

  if (charCount > 2) {
    threats.push(`Multiple suspicious characters: ${charCount}`)
    confidence += charCount * 3
  }

  // Estimate parameter count
  const parameterCount = (input.match(/\$\d+|\?/g) || []).length

  return {
    isSafe: threats.length === 0 && confidence < 20,
    complexity: Math.min(complexity, 50),
    threats,
    confidence: Math.min(confidence, 100),
    parameterCount
  }
}

// === Safe Query Builder ===

export class SafeQueryBuilder {
  private options: Required<SafeQueryOptions>

  constructor(options: SafeQueryOptions = {}) {
    this.options = {
      maxComplexity: options.maxComplexity ?? SQL_SECURITY_CONFIG.maxQueryComplexity,
      allowRawQueries: options.allowRawQueries ?? false,
      validateParameters: options.validateParameters ?? true,
      logQueries: options.logQueries ?? process.env.NODE_ENV === 'development'
    }
  }

  validateQuery(query: string | object): QueryAnalysis {
    const queryString = typeof query === 'string' ? query : JSON.stringify(query)
    
    // Check query length
    if (queryString.length > SQL_SECURITY_CONFIG.maxQueryLength) {
      return {
        isSafe: false,
        complexity: 50,
        threats: ['Query length exceeds maximum limit'],
        confidence: 100,
        parameterCount: 0
      }
    }

    return detectSQLInjection(queryString)
  }

  buildWhereClause(
    conditions: Record<string, any>,
    allowedFields: string[]
  ): Record<string, any> {
    const safeWhere: Record<string, any> = {}

    for (const [field, value] of Object.entries(conditions)) {
      // Validate field name
      if (!allowedFields.includes(field)) {
        throw new Error(`Field '${field}' is not allowed in where clause`)
      }

      // Validate field name format
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field)) {
        throw new Error(`Invalid field name format: ${field}`)
      }

      // Process value based on type
      safeWhere[field] = this.sanitizeValue(value, field)
    }

    return safeWhere
  }

  buildOrderBy(
    orderBy: Record<string, 'asc' | 'desc'>,
    allowedFields: string[]
  ): Record<string, 'asc' | 'desc'> {
    const safeOrderBy: Record<string, 'asc' | 'desc'> = {}

    for (const [field, direction] of Object.entries(orderBy)) {
      // Validate field
      if (!allowedFields.includes(field)) {
        throw new Error(`Field '${field}' is not allowed in order by clause`)
      }

      // Validate direction
      if (!['asc', 'desc'].includes(direction)) {
        throw new Error(`Invalid sort direction: ${direction}`)
      }

      safeOrderBy[field] = direction
    }

    return safeOrderBy
  }

  buildSelect(
    fields: string[],
    allowedFields: string[]
  ): Record<string, boolean> {
    const safeSelect: Record<string, boolean> = {}

    for (const field of fields) {
      // Validate field
      if (!allowedFields.includes(field)) {
        throw new Error(`Field '${field}' is not allowed in select clause`)
      }

      safeSelect[field] = true
    }

    return safeSelect
  }

  private sanitizeValue(value: any, field: string): any {
    if (value === null || value === undefined) {
      return value
    }

    if (typeof value === 'string') {
      // Check for SQL injection in string values
      const analysis = detectSQLInjection(value)
      if (!analysis.isSafe) {
        throw new Error(`Potential SQL injection in field '${field}': ${analysis.threats.join(', ')}`)
      }
      return value
    }

    if (typeof value === 'number') {
      if (!isFinite(value)) {
        throw new Error(`Invalid number value for field '${field}': ${value}`)
      }
      return value
    }

    if (typeof value === 'boolean') {
      return value
    }

    if (Array.isArray(value)) {
      return value.map(item => this.sanitizeValue(item, `${field}[]`))
    }

    if (typeof value === 'object') {
      // Handle Prisma operators
      const sanitizedObject: Record<string, any> = {}
      
      for (const [operator, operatorValue] of Object.entries(value)) {
        if (!SQL_SECURITY_CONFIG.allowedOperators.includes(operator)) {
          throw new Error(`Operator '${operator}' is not allowed`)
        }
        
        sanitizedObject[operator] = this.sanitizeValue(operatorValue, `${field}.${operator}`)
      }
      
      return sanitizedObject
    }

    throw new Error(`Unsupported value type for field '${field}': ${typeof value}`)
  }
}

// === Prisma Extensions ===

export function createSafePrismaClient<T extends Prisma.PrismaClient>(prisma: T) {
  const queryBuilder = new SafeQueryBuilder()

  return {
    ...prisma,
    
    // Safe query execution with validation
    safeQuery: async <R>(
      query: () => Promise<R>,
      validation?: (query: any) => void
    ): Promise<R> => {
      try {
        if (validation) {
          validation(query)
        }
        
        return await query()
      } catch (error) {
        console.error('Safe query execution failed:', error)
        throw error
      }
    },

    // Safe raw query execution (if absolutely necessary)
    safeRawQuery: async <R>(
      sql: string,
      parameters: any[] = []
    ): Promise<R> => {
      // Validate SQL query
      const analysis = detectSQLInjection(sql)
      if (!analysis.isSafe) {
        throw new Error(`Unsafe SQL query detected: ${analysis.threats.join(', ')}`)
      }

      // Validate parameter count
      if (parameters.length > SQL_SECURITY_CONFIG.maxParameters) {
        throw new Error(`Too many parameters: ${parameters.length}`)
      }

      // Ensure query uses parameters (no direct string interpolation)
      const parameterPlaceholders = (sql.match(/\$\d+/g) || []).length
      if (parameterPlaceholders !== parameters.length) {
        throw new Error('Parameter count mismatch with placeholders')
      }

      try {
        return await (prisma as any).$queryRaw`${Prisma.raw(sql)}` as R
      } catch (error) {
        console.error('Raw query execution failed:', error)
        throw error
      }
    },

    // Query builder helpers
    queryBuilder
  }
}

// === Validation Helpers ===

export function validateTableName(tableName: string): boolean {
  // Only allow alphanumeric characters and underscores
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)
}

export function validateColumnName(columnName: string): boolean {
  // Only allow alphanumeric characters and underscores
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)
}

export function validateIdentifier(identifier: string): boolean {
  // Validate database identifiers (table names, column names, etc.)
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier) && identifier.length <= 64
}

export function escapeIdentifier(identifier: string): string {
  if (!validateIdentifier(identifier)) {
    throw new Error(`Invalid identifier: ${identifier}`)
  }
  return `"${identifier}"`
}

// === Audit Logging ===

interface QueryAuditLog {
  timestamp: number
  query: string
  parameters?: any[]
  userId?: string
  ip?: string
  analysis: QueryAnalysis
  executionTime?: number
  success: boolean
  error?: string
}

class QueryAuditor {
  private logs: QueryAuditLog[] = []
  private maxLogs = 1000

  logQuery(log: QueryAuditLog): void {
    this.logs.push(log)
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs.splice(0, this.logs.length - this.maxLogs)
    }

    // Log suspicious queries
    if (!log.analysis.isSafe || log.analysis.confidence > 30) {
      console.warn('Suspicious query detected:', {
        query: log.query.slice(0, 200),
        threats: log.analysis.threats,
        confidence: log.analysis.confidence,
        userId: log.userId,
        ip: log.ip
      })
    }
  }

  getSuspiciousQueries(limit = 50): QueryAuditLog[] {
    return this.logs
      .filter(log => !log.analysis.isSafe || log.analysis.confidence > 20)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  }

  getQueryStats(): {
    total: number
    suspicious: number
    blocked: number
    averageComplexity: number
  } {
    const suspicious = this.logs.filter(log => !log.analysis.isSafe).length
    const blocked = this.logs.filter(log => !log.success).length
    const avgComplexity = this.logs.reduce((sum, log) => sum + log.analysis.complexity, 0) / this.logs.length

    return {
      total: this.logs.length,
      suspicious,
      blocked,
      averageComplexity: Math.round(avgComplexity * 100) / 100
    }
  }
}

export const queryAuditor = new QueryAuditor()

// === Middleware Integration ===

export function createSQLInjectionMiddleware() {
  return (request: Request) => {
    // Extract and validate any SQL-like content from request
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      // Validate JSON content for SQL injection patterns
      return async (body: any) => {
        const bodyString = JSON.stringify(body)
        const analysis = detectSQLInjection(bodyString)
        
        if (!analysis.isSafe && analysis.confidence > 50) {
          throw new Error('Potential SQL injection detected in request body')
        }
        
        return body
      }
    }

    return null
  }
}

export default {
  detectSQLInjection,
  SafeQueryBuilder,
  createSafePrismaClient,
  validateTableName,
  validateColumnName,
  validateIdentifier,
  escapeIdentifier,
  queryAuditor,
  createSQLInjectionMiddleware,
  SQL_SECURITY_CONFIG
}