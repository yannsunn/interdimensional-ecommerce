import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 静的アセットやAPI routes は処理をスキップ
  if (
    pathname.startsWith('/_next/static') || 
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // ファイル拡張子があるもの
  ) {
    return NextResponse.next()
  }
  
  const response = NextResponse.next()
  
  // 基本的なセキュリティヘッダーのみ
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}