/**
 * 🌟 ULTRA SERVER-CLIENT BOUNDARY SYSTEM
 * 
 * Revolutionary component architecture for optimal performance:
 * - Server Components: Static content, SEO optimization, data fetching
 * - Client Components: Interactive, real-time, user-specific content
 * - Hybrid Components: Smart switching between server/client rendering
 */

'use client'

import { ComponentType, ReactNode, Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react'
import { ErrorBoundary } from '../../components/ui/ErrorBoundary'

// === Server Component Markers ===

export interface ServerComponentProps {
  children?: ReactNode
  fallback?: ReactNode
  errorFallback?: ComponentType<{ error: Error; retry: () => void }>
}

export interface ClientComponentProps extends ServerComponentProps {
  hydrationKey?: string
  priority?: 'high' | 'medium' | 'low'
  deferMs?: number
}

// === Hybrid Component System ===

/**
 * 🎯 Smart Server/Client Component Wrapper
 * Automatically determines optimal rendering strategy
 */
export function withServerClientBoundary<P extends object>(
  ServerComponent: ComponentType<P>,
  ClientComponent: ComponentType<P>,
  options: {
    serverFirst?: boolean
    clientTriggers?: ('interaction' | 'scroll' | 'timer')[]
    fallbackComponent?: ComponentType<P>
    errorBoundary?: boolean
  } = {}
) {
  const {
    serverFirst = true,
    fallbackComponent,
    errorBoundary = true
  } = options

  return function HybridComponent(props: P) {
    // Server-side rendering detection
    const isServer = typeof window === 'undefined'
    
    if (isServer && serverFirst) {
      return <ServerComponent {...props} />
    }

    const ComponentToRender = serverFirst ? ClientComponent : ServerComponent
    const content = <ComponentToRender {...props} />

    if (!errorBoundary) {
      return content
    }

    return (
      <ErrorBoundary
        fallback={fallbackComponent ? 
          (_error: Error, _retry: () => void) => {
            const FallbackComponent = fallbackComponent
            return <FallbackComponent {...props} />
          } : 
          undefined
        }
      >
        {content}
      </ErrorBoundary>
    )
  }
}

// === Progressive Enhancement System ===

/**
 * 🌊 Progressive Enhancement Wrapper
 * Enhances server content with client interactivity
 */
export function withProgressiveEnhancement<P extends object>(
  BaseComponent: ComponentType<P>,
  EnhancedComponent: ComponentType<P>,
  triggers: {
    onVisible?: boolean
    onInteraction?: boolean
    onTimer?: number
    onIdle?: boolean
  } = {}
) {
  return function ProgressiveComponent(props: P) {
    const [isEnhanced, setIsEnhanced] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      let cleanup: (() => void)[] = []

      // Visibility trigger
      if (triggers.onVisible) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              setIsEnhanced(true)
              observer.disconnect()
            }
          },
          { threshold: 0.1 }
        )
        
        if (ref.current) {
          observer.observe(ref.current)
          cleanup.push(() => observer.disconnect())
        }
      }

      // Interaction trigger
      if (triggers.onInteraction) {
        const handleInteraction = () => setIsEnhanced(true)
        const events = ['mouseenter', 'touchstart', 'focus']
        
        events.forEach(event => {
          ref.current?.addEventListener(event, handleInteraction, { once: true })
          cleanup.push(() => 
            ref.current?.removeEventListener(event, handleInteraction)
          )
        })
      }

      // Timer trigger
      if (triggers.onTimer) {
        const timer = setTimeout(() => setIsEnhanced(true), triggers.onTimer)
        cleanup.push(() => clearTimeout(timer))
      }

      // Idle trigger
      if (triggers.onIdle) {
        const handleIdle = () => setIsEnhanced(true)
        if ('requestIdleCallback' in window) {
          const id = requestIdleCallback(handleIdle)
          cleanup.push(() => cancelIdleCallback(id))
        } else {
          const timer = setTimeout(handleIdle, 100)
          cleanup.push(() => clearTimeout(timer))
        }
      }

      return () => {
        cleanup.forEach(fn => fn())
      }
    }, [])

    const Component = isEnhanced ? EnhancedComponent : BaseComponent

    return (
      <div ref={ref}>
        <Component {...props} />
      </div>
    )
  }
}

// === Client-Side Hydration Manager ===

/**
 * ⚡ Smart Hydration System
 * Prioritizes critical interactivity, defers non-essential
 */
export class HydrationManager {
  private static instance: HydrationManager
  private hydrationQueue: Array<{
    component: () => Promise<any>
    priority: 'critical' | 'high' | 'medium' | 'low'
    element: HTMLElement
  }> = []
  private isProcessing = false

  static getInstance(): HydrationManager {
    if (!HydrationManager.instance) {
      HydrationManager.instance = new HydrationManager()
    }
    return HydrationManager.instance
  }

  scheduleHydration(
    component: () => Promise<any>,
    element: HTMLElement,
    priority: 'critical' | 'high' | 'medium' | 'low' = 'medium'
  ) {
    this.hydrationQueue.push({ component, priority, element })
    this.processQueue()
  }

  private async processQueue() {
    if (this.isProcessing) return
    this.isProcessing = true

    // Sort by priority
    this.hydrationQueue.sort((a, b) => {
      const priorities = { critical: 0, high: 1, medium: 2, low: 3 }
      return priorities[a.priority] - priorities[b.priority]
    })

    while (this.hydrationQueue.length > 0) {
      const item = this.hydrationQueue.shift()
      if (!item) continue

      try {
        // Check if element is still in viewport or has been interacted with
        const rect = item.element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        const hasInteraction = item.element.getAttribute('data-interacted') === 'true'

        if (item.priority === 'critical' || isVisible || hasInteraction) {
          await item.component()
        } else if (item.priority !== 'low') {
          // Re-queue with lower priority
          this.hydrationQueue.push({
            ...item,
            priority: item.priority === 'high' ? 'medium' : 'low'
          })
        }
      } catch (error) {
        console.warn('Hydration failed for component:', error)
      }

      // Yield to main thread
      await new Promise(resolve => setTimeout(resolve, 0))
    }

    this.isProcessing = false
  }
}

// === Component Islands Architecture ===

/**
 * 🏝️ Component Islands
 * Independent, lazy-loaded interactive components
 */
export function createComponentIsland<P extends object>(
  componentLoader: () => Promise<{ default: ComponentType<P> }>,
  options: {
    loadingComponent?: ComponentType
    errorComponent?: ComponentType<{ error: Error; retry: () => void }>
    preload?: boolean
    priority?: 'critical' | 'high' | 'medium' | 'low'
  } = {}
) {
  const LazyComponent = lazy(componentLoader)
  
  if (options.preload) {
    // Preload the component
    componentLoader()
  }

  return function ComponentIsland(props: P) {
    const [hasError, setHasError] = useState(false)
    const [retryCount, setRetryCount] = useState(0)

    const retry = useCallback(() => {
      setHasError(false)
      setRetryCount(prev => prev + 1)
    }, [])

    if (hasError && options.errorComponent) {
      const ErrorComponent = options.errorComponent
      return <ErrorComponent error={new Error('Component failed to load')} retry={retry} />
    }

    return (
      <ErrorBoundary
        onError={() => setHasError(true)}
        fallback={options.errorComponent ? 
          (error: Error, boundaryRetry: () => void) => {
            const ErrorComponent = options.errorComponent!
            return <ErrorComponent error={error} retry={boundaryRetry} />
          } : undefined
        }
      >
        <Suspense fallback={options.loadingComponent ? <options.loadingComponent /> : null}>
          <LazyComponent key={retryCount} {...(props as any)} />
        </Suspense>
      </ErrorBoundary>
    )
  }
}

// === Streaming Component System ===

/**
 * 🌊 Streaming Components
 * Progressive content loading with streaming updates
 */
export function createStreamingComponent<T, P extends object>(
  dataStream: () => AsyncIterable<T>,
  Component: ComponentType<P & { data: T[]; isLoading: boolean; error?: Error | undefined }>
) {
  return function StreamingComponent(props: P) {
    const [data, setData] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error>()

    useEffect(() => {
      let isMounted = true

      async function consumeStream() {
        try {
          setIsLoading(true)
          setError(undefined)
          
          for await (const chunk of dataStream()) {
            if (!isMounted) break
            
            setData(prev => [...prev, chunk])
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err : new Error('Stream error'))
          }
        } finally {
          if (isMounted) {
            setIsLoading(false)
          }
        }
      }

      consumeStream()

      return () => {
        isMounted = false
      }
    }, [])

    return <Component {...props} data={data} isLoading={isLoading} error={error} />
  }
}

export default {
  withServerClientBoundary,
  withProgressiveEnhancement,
  HydrationManager,
  createComponentIsland,
  createStreamingComponent
}