/**
 * 🛡️ Unified Error Handling System
 * Enterprise-grade error management with structured logging
 */

// 構造化エラー定義
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly context?: Record<string, unknown>,
    public readonly isOperational: boolean = true
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, AppError)
  }
}

// エラーコード定数
export const ERROR_CODES = {
  // Database errors
  DATABASE_CONNECTION_FAILED: 'DB_001',
  DATABASE_QUERY_FAILED: 'DB_002',
  
  // Authentication errors
  INVALID_CREDENTIALS: 'AUTH_001',
  SESSION_EXPIRED: 'AUTH_002',
  UNAUTHORIZED_ACCESS: 'AUTH_003',
  
  // Validation errors
  INVALID_INPUT: 'VAL_001',
  MISSING_REQUIRED_FIELD: 'VAL_002',
  INVALID_FORMAT: 'VAL_003',
  
  // Business logic errors
  PRODUCT_NOT_FOUND: 'BIZ_001',
  INSUFFICIENT_STOCK: 'BIZ_002',
  PAYMENT_FAILED: 'BIZ_003',
  
  // External service errors
  EXTERNAL_SERVICE_ERROR: 'EXT_001',
  NETWORK_ERROR: 'EXT_002',
  
  // System errors
  INTERNAL_SERVER_ERROR: 'SYS_001',
  CONFIGURATION_ERROR: 'SYS_002',
} as const

export type ErrorCode = keyof typeof ERROR_CODES

// エラーハンドラー関数型
export type ErrorHandler<T> = (operation: () => Promise<T>) => Promise<T>

// エラーハンドラー作成関数
export const createErrorHandler = <T>(
  _fallback: T,
  options: {
    shouldLog?: boolean
    transformError?: (error: unknown) => AppError
    onError?: (error: AppError) => void
  } = {}
): ErrorHandler<T> => {
  const { shouldLog = true, transformError, onError } = options

  return async (operation: () => Promise<T>): Promise<T> => {
    try {
      return await operation()
    } catch (error) {
      const appError = transformError ? transformError(error) : normalizeError(error)
      
      if (shouldLog) {
        logError(appError)
      }
      
      if (onError) {
        onError(appError)
      }
      
      // 本番環境では詳細なエラー情報を隠す
      if (process.env.NODE_ENV === 'production' && !appError.isOperational) {
        throw new AppError(
          'Internal server error',
          ERROR_CODES.INTERNAL_SERVER_ERROR,
          500
        )
      }
      
      throw appError
    }
  }
}

// エラー正規化関数
export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }
  
  if (error instanceof Error) {
    // 既知のエラーパターンをマッピング
    if (error.message.includes('fetch')) {
      return new AppError(
        'Network request failed',
        ERROR_CODES.NETWORK_ERROR,
        502,
        { originalError: error.message }
      )
    }
    
    if (error.message.includes('database') || error.message.includes('prisma')) {
      return new AppError(
        'Database operation failed',
        ERROR_CODES.DATABASE_QUERY_FAILED,
        500,
        { originalError: error.message }
      )
    }
    
    return new AppError(
      error.message,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      500,
      { originalError: error.message }
    )
  }
  
  return new AppError(
    'Unknown error occurred',
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    500,
    { originalError: String(error) }
  )
}

// 構造化ログ関数
export function logError(error: AppError): void {
  const logData = {
    timestamp: new Date().toISOString(),
    level: 'error',
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    context: error.context,
    stack: error.stack,
    isOperational: error.isOperational,
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Application Error:', logData)
  } else {
    // 本番環境では構造化ログシステムに送信
    console.error(JSON.stringify(logData))
  }
}

// データベース操作用エラーハンドラー
export const withDatabaseErrorHandler = <T>(fallback: T) =>
  createErrorHandler(fallback, {
    transformError: (error) => {
      if (error instanceof Error && error.message.includes('prisma')) {
        return new AppError(
          'Database operation failed',
          ERROR_CODES.DATABASE_QUERY_FAILED,
          500,
          { prismaError: error.message }
        )
      }
      return normalizeError(error)
    },
  })

// API操作用エラーハンドラー
export const withApiErrorHandler = <T>(fallback: T) =>
  createErrorHandler(fallback, {
    transformError: (error) => {
      if (error instanceof Response) {
        return new AppError(
          `API request failed: ${error.status}`,
          ERROR_CODES.EXTERNAL_SERVICE_ERROR,
          error.status,
          { response: error.statusText }
        )
      }
      return normalizeError(error)
    },
  })

// バリデーション用エラーハンドラー
export const withValidationErrorHandler = <T>(fallback: T) =>
  createErrorHandler(fallback, {
    transformError: (error) => {
      if (error instanceof Error && error.message.includes('validation')) {
        return new AppError(
          'Validation failed',
          ERROR_CODES.INVALID_INPUT,
          400,
          { validationError: error.message }
        )
      }
      return normalizeError(error)
    },
  })

// React Query用エラーハンドラー
export function createQueryErrorHandler(
  onError?: (error: AppError) => void
) {
  return (error: unknown) => {
    const appError = normalizeError(error)
    logError(appError)
    
    if (onError) {
      onError(appError)
    }
    
    return appError
  }
}

// サーバーアクション用エラーハンドラー
export function withServerActionErrorHandler<T extends unknown[], R>(
  action: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<{ success: true; data: R } | { success: false; error: string }> => {
    try {
      const result = await action(...args)
      return { success: true, data: result }
    } catch (error) {
      const appError = normalizeError(error)
      logError(appError)
      
      return {
        success: false,
        error: process.env.NODE_ENV === 'production' && !appError.isOperational
          ? 'Internal server error'
          : appError.message
      }
    }
  }
}

// 型ガード
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

// エラー境界用のエラー情報取得
export function getErrorInfo(error: unknown): {
  message: string
  code: string
  statusCode: number
  context?: Record<string, unknown> | undefined
} {
  const appError = normalizeError(error)
  
  return {
    message: appError.message,
    code: appError.code,
    statusCode: appError.statusCode,
    context: appError.context,
  }
}