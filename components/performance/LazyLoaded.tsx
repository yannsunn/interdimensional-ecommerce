/**
 * 🚀 LazyLoaded - パフォーマンス最適化コンポーネント
 * 
 * Intersection Observerを使用したレイジーローディング
 * スクロール位置に基づいてコンポーネントを動的に読み込み
 */

'use client'

import { useState, useEffect, useRef, ReactNode, ComponentType } from 'react'
import { cn } from '@/lib/design-system'

interface LazyLoadedProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  placeholder?: ReactNode
  fallback?: ReactNode
  delay?: number
}

/**
 * レイジーローディングコンポーネント
 */
export function LazyLoaded({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  once = true,
  placeholder,
  fallback: _fallback,
  delay = 0,
}: LazyLoadedProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              setTimeout(() => setIsLoaded(true), 100)
            }, delay)
          } else {
            setIsVisible(true)
            setTimeout(() => setIsLoaded(true), 100)
          }

          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
          setIsLoaded(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, once, delay])

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-700',
        isVisible ? 'opacity-100' : 'opacity-0',
        isLoaded ? 'transform-none' : 'transform translate-y-8',
        className
      )}
    >
      {isVisible ? children : (placeholder || <LazyPlaceholder />)}
    </div>
  )
}

/**
 * デフォルトプレースホルダー
 */
function LazyPlaceholder() {
  return (
    <div className={cn(
      'w-full h-32 rounded-xl',
      'bg-gradient-to-r from-gray-800/50 to-gray-700/50',
      'animate-pulse flex items-center justify-center'
    )}>
      <div className="text-gray-500 text-sm">読み込み中...</div>
    </div>
  )
}

/**
 * 高次コンポーネント（HOC）版のレイジーローディング
 */
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  options: Omit<LazyLoadedProps, 'children'> = {}
) {
  const LazyComponent = (props: P) => (
    <LazyLoaded {...options}>
      <Component {...props} />
    </LazyLoaded>
  )

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`

  return LazyComponent
}

/**
 * セクション専用のレイジーローディングフック
 */
export function useLazySection(options: {
  threshold?: number
  rootMargin?: string
  delay?: number
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting && !hasAnimated) {
          if (options.delay) {
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, options.delay)
          } else {
            setIsVisible(true)
            setHasAnimated(true)
          }
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options.threshold, options.rootMargin, options.delay, hasAnimated])

  return { ref, isVisible, hasAnimated }
}

/**
 * スタッガードアニメーション用のレイジーローディング
 */
interface StaggeredLazyLoadProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
  itemClassName?: string
  threshold?: number
}

export function StaggeredLazyLoad({
  children,
  staggerDelay = 100,
  className,
  itemClassName,
  threshold = 0.1,
}: StaggeredLazyLoadProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          // スタッガードアニメーションで順次表示
          children.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]))
            }, index * staggerDelay)
          })
          observer.unobserve(container)
        }
      },
      { threshold }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [children.length, staggerDelay, threshold])

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-700',
            visibleItems.has(index)
              ? 'opacity-100 transform-none'
              : 'opacity-0 transform translate-y-8',
            itemClassName
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

/**
 * 画像専用のレイジーローディング
 */
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  quality?: number
  sizes?: string
  priority?: boolean
}

export function LazyImage({
  src,
  alt,
  className,
  placeholder,
  quality: _quality = 75,
  sizes: _sizes,
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) {
      // 優先度が高い画像は即座に読み込み
      setIsLoaded(true)
      return
    }

    const img = imgRef.current
    if (!img) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          setIsLoaded(true)
          observer.unobserve(img)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(img)

    return () => {
      observer.unobserve(img)
    }
  }, [priority])

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {/* プレースホルダー */}
      {!isLoaded && (
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700',
          'animate-pulse flex items-center justify-center'
        )}>
          {placeholder || (
            <div className="text-gray-500 text-sm">画像読み込み中...</div>
          )}
        </div>
      )}

      {/* 実際の画像 */}
      {isLoaded && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            hasError ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* エラー時のフォールバック */}
      {hasError && (
        <div className={cn(
          'absolute inset-0 bg-gray-800',
          'flex items-center justify-center text-gray-500'
        )}>
          画像の読み込みに失敗しました
        </div>
      )}
    </div>
  )
}