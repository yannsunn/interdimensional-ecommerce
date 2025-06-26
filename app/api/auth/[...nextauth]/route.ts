import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const handler = NextAuth(authOptions)

// Error handling wrapper for NextAuth
async function authHandler(req: NextRequest, context: any) {
  try {
    return await handler(req, context)
  } catch (error) {
    console.error('NextAuth API error:', error)
    
    // Build-time or missing database handling
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️ NextAuth API: DATABASE_URL not set')
      return NextResponse.json(
        { error: 'Authentication not available' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Authentication error occurred' },
      { status: 500 }
    )
  }
}

export { authHandler as GET, authHandler as POST }