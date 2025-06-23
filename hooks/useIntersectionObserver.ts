import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
  enabled?: boolean
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    enabled = true,
    ...restOptions
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    if (!enabled || !ref.current) return

    // If triggerOnce and already intersected, don't observe again
    if (triggerOnce && hasIntersected) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        setIsIntersecting(isElementIntersecting)
        
        if (isElementIntersecting) {
          setHasIntersected(true)
          
          // If triggerOnce, disconnect after first intersection
          if (triggerOnce) {
            observer.disconnect()
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
        ...restOptions,
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [
    ref,
    threshold,
    root,
    rootMargin,
    triggerOnce,
    hasIntersected,
    enabled,
    restOptions,
  ])

  return {
    isIntersecting,
    hasIntersected,
  }
}

// Hook for observing multiple elements
export function useMultipleIntersectionObserver(
  refs: RefObject<Element>[],
  options: UseIntersectionObserverOptions = {}
) {
  const [intersectingElements, setIntersectingElements] = useState<Set<Element>>(new Set())

  useEffect(() => {
    if (!options.enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        setIntersectingElements(prev => {
          const newSet = new Set(prev)
          
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              newSet.add(entry.target)
            } else {
              newSet.delete(entry.target)
            }
          })
          
          return newSet
        })
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
      }
    )

    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [refs, options])

  return intersectingElements
}