import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '@/lib/db-optimized'

// export const runtime = 'nodejs'  // Let Vercel auto-detect
export const dynamic = 'force-dynamic'

export async function GET() {
  const startTime = Date.now()
  
  // Database health check
  const dbStatus = await checkDatabaseConnection()
  
  // System health metrics
  const health = {
    status: dbStatus.connected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    responseTime: Date.now() - startTime,
    services: {
      database: {
        connected: dbStatus.connected,
        error: dbStatus.error,
      },
      runtime: {
        environment: process.env.NODE_ENV,
        edge: true,
        version: process.env.NEXT_PUBLIC_APP_VERSION || '3.0.0',
      },
    },
    performance: {
      uptime: process.uptime ? process.uptime() : 'N/A',
      memory: process.memoryUsage ? process.memoryUsage() : 'N/A',
    },
  }
  
  return NextResponse.json(health, {
    status: health.status === 'healthy' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}