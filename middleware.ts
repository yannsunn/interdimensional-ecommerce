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
  
  const response = NextResponse.next()
  
  // Security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Rate limit headers
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  
  // Edge Runtime optimization
  response.headers.set('X-Powered-By', 'Ultra-Edge-Runtime')
  
  // キャッシュ戦略
  const pathname = request.nextUrl.pathname
  
  // 静的アセットの長期キャッシュ
  if (pathname.startsWith('/_next/static')) {
    if (pathname.includes('.css')) {
      response.headers.set('Content-Type', 'text/css; charset=utf-8')
    } else if (pathname.includes('.js')) {
      response.headers.set('Content-Type', 'application/javascript; charset=utf-8')
    }
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (pathname.startsWith('/images')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // APIルートのキャッシュ
  if (pathname.startsWith('/api/products')) {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  }
  
  // 地域ベースのルーティング最適化
  const country = request.geo?.country || 'US'
  response.headers.set('X-User-Country', country)
  
  // パフォーマンスヒント
  response.headers.set('Link', '</_next/static/css>; rel=preload; as=style')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
}