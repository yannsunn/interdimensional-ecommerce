// Ultra-minimal monitoring
interface MetricData {
  name: string
  value: number
  timestamp: number
}

class MonitoringService {
  private metrics: MetricData[] = []
  
  trackMetric(name: string, value: number) {
    this.metrics.push({ name, value, timestamp: Date.now() })
    if (this.metrics.length > 100) this.metrics = this.metrics.slice(-100)
  }
  
  trackError(error: Error) {
    console.error('Error:', error)
    this.trackMetric('error_count', 1)
  }
  
  getMetrics(name?: string) {
    return name ? this.metrics.filter(m => m.name === name) : this.metrics
  }
}

export const monitoring = new MonitoringService()

export function withPerformanceTracking<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now()
  return fn()
    .then((result) => {
      monitoring.trackMetric(name, Date.now() - start)
      return result
    })
    .catch((error) => {
      monitoring.trackError(error)
      throw error
    })
}