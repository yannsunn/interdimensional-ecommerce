import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse } from '@/types/core'

// API共通レスポンス作成
export function createApiResponse<T>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: status < 400,
      data,
      message,
    },
    { status }
  )
}

// エラーレスポンス作成
export function createErrorResponse(
  error: string,
  status: number = 500,
  details?: any
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      message: error,
      ...(details && { details }),
    },
    { status }
  )
}

// リクエストボディパーサー（型安全）
export async function parseRequestBody<T>(request: NextRequest): Promise<T> {
  try {
    return await request.json()
  } catch (error) {
    throw new Error('Invalid JSON body')
  }
}

// クエリパラメータ取得
export function getQueryParam(
  request: NextRequest,
  key: string,
  defaultValue?: string
): string | undefined {
  const url = new URL(request.url)
  return url.searchParams.get(key) || defaultValue
}

// ページネーションパラメータ取得
export function getPaginationParams(request: NextRequest) {
  const page = parseInt(getQueryParam(request, 'page', '1') || '1', 10)
  const limit = Math.min(
    parseInt(getQueryParam(request, 'limit', '20') || '20', 10),
    100 // 最大100件に制限
  )
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

// レート制限（シンプル実装）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000 // 1分
): boolean {
  const now = Date.now()
  const current = rateLimitMap.get(identifier)

  if (!current || now > current.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (current.count >= limit) {
    return false
  }

  current.count++
  return true
}

// IPアドレス取得
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// CORS ヘッダー設定
export function setCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// APIルートハンドラーラッパー
export function withApiHandler<T>(
  handler: (request: NextRequest, params?: any) => Promise<NextResponse<ApiResponse<T>>>
) {
  return async (request: NextRequest, context?: { params: any }) => {
    try {
      // レート制限チェック
      const clientIP = getClientIP(request)
      if (!rateLimit(clientIP)) {
        return createErrorResponse('Too many requests', 429)
      }

      // ハンドラー実行
      const response = await handler(request, context?.params)
      
      // CORS ヘッダー設定
      return setCorsHeaders(response)
    } catch (error) {
      console.error('API Handler Error:', error)
      return createErrorResponse(
        error instanceof Error ? error.message : 'Internal server error',
        500
      )
    }
  }
}

// バリデーションヘルパー
export function validateRequired<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const field of requiredFields) {
    if (!data[field] || data[field] === '') {
      errors.push(`${String(field)} is required`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// 環境変数チェック
export function requireEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Environment variable ${name} is required`)
  }
  return value
}

// エッジランタイム互換チェック
export function isEdgeRuntime(): boolean {
  return process.env.NEXT_RUNTIME === 'edge'
}

// キャッシュヘッダー設定
export function setCacheHeaders(
  response: NextResponse,
  maxAge: number = 3600,
  staleWhileRevalidate: number = 86400
): NextResponse {
  response.headers.set(
    'Cache-Control',
    `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  )
  return response
}