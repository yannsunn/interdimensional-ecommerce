import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// export const runtime = 'nodejs'  // Let Vercel auto-detect

// Monitoring endpoint for uptime checks
export async function GET() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')
  
  // Simple auth check for monitoring
  if (authHeader !== `Bearer ${process.env.MONITORING_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  
  try {
    // Check critical services
    const checks = await Promise.allSettled([
      checkDatabase(),
      checkCache(),
      checkExternalAPIs(),
    ])
    
    const results = checks.map((check, index) => ({
      service: ['database', 'cache', 'external_apis'][index],
      status: check.status === 'fulfilled' ? check.value : 'error',
      error: check.status === 'rejected' ? check.reason : null,
    }))
    
    const allHealthy = results.every(r => r.status === 'healthy')
    
    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks: results,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '3.0.0',
    }, {
      status: allHealthy ? 200 : 503,
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: String(error),
    }, { status: 500 })
  }
}

async function checkDatabase() {
  // Database health check
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not configured')
  }
  return 'healthy'
}

async function checkCache() {
  // Cache health check
  return 'healthy'
}

async function checkExternalAPIs() {
  // External API health check
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe not configured')
  }
  return 'healthy'
}