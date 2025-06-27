/**
 * 📏 useResizeObserver Hook
 * Performance-optimized resize observation with debouncing
 */

'use client'

import { useRef, useCallback, useLayoutEffect, useState } from 'react'

interface ResizeObserverEntry {
  width: number
  height: number
  top: number
  left: number
}

interface UseResizeObserverOptions {
  debounceMs?: number
  box?: ResizeObserverBoxOptions
}

export function useResizeObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseResizeObserverOptions = {}
): [React.RefObject<T>, ResizeObserverEntry] {
  const { debounceMs = 100, box = 'border-box' } = options
  
  const ref = useRef<T>(null)
  const [dimensions, setDimensions] = useState<ResizeObserverEntry>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  })

  // デバウンス処理
  const debounceTimeoutRef = useRef<NodeJS.Timeout>()
  
  const updateDimensions = useCallback((entries: globalThis.ResizeObserverEntry[]) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (entries[0]) {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        const { top, left } = entry.target.getBoundingClientRect()
        
        setDimensions({
          width: Math.round(width),
          height: Math.round(height),
          top: Math.round(top),
          left: Math.round(left),
        })
      }
    }, debounceMs)
  }, [debounceMs])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    // 初期サイズを設定
    const rect = element.getBoundingClientRect()
    setDimensions({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      top: Math.round(rect.top),
      left: Math.round(rect.left),
    })

    // ResizeObserverのサポート確認
    if (typeof ResizeObserver === 'undefined') {
      console.warn('ResizeObserver is not supported in this browser')
      return
    }

    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(element, { box })

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [updateDimensions, box])

  return [ref, dimensions]
}

// レスポンシブブレークポイント用のフック
export function useBreakpoint() {
  const [ref, { width }] = useResizeObserver<HTMLDivElement>()
  
  const breakpoint = (() => {
    if (width < 640) return 'xs'
    if (width < 768) return 'sm'
    if (width < 1024) return 'md'
    if (width < 1280) return 'lg'
    if (width < 1536) return 'xl'
    return '2xl'
  })()

  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  return {
    ref,
    width,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  }
}

// 要素の可視性を監視するフック
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry?.isIntersecting ?? false)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting]
}