import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SECURITY_HEADERS, checkRateLimit, getRateLimitKey } from '@/lib/security'

export function middleware(request: NextRequest) {
  // Rate limiting
  const rateLimitKey = getRateLimitKey(request)
  const { allowed, remaining } = checkRateLimit(rateLimitKey)
  
  if (!allowed) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '900', // 15 minutes
      }
    })
  }
  
  const pathname = request.nextUrl.pathname
  
  // 静的アセットの場合は処理をスキップ
  if (pathname.startsWith('/_next/static') || pathname.startsWith('/_next/css')) {
    return NextResponse.next()
  }
  
  const response = NextResponse.next()
  
  // Security headers (静的ファイル以外)
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Rate limit headers
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  
  // Edge Runtime optimization
  response.headers.set('X-Powered-By', 'Ultra-Edge-Runtime')
  
  // APIルートのキャッシュ
  if (pathname.startsWith('/api/products')) {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  }
  
  // 地域ベースのルーティング最適化
  const country = request.geo?.country || 'US'
  response.headers.set('X-User-Country', country)
  
  // パフォーマンスヒント - CSS preload removed to avoid directory reference
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}