'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

// Element pool with better performance
const ELEMENT_POOL = ['🌟', '💫', '🔮', '✨', '🔯', '🌙', '⭐', '🪐'] as const
const MAX_VISIBLE_ELEMENTS = 6
const ANIMATION_DURATION = 25

interface FloatingElement {
  id: string
  element: string
  delay: number
  duration: number
  top: number
  left: number
  scale: number
}

export function OptimizedFloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Generate optimized element configurations
  const generateElements = useCallback((): FloatingElement[] => {
    return Array.from({ length: MAX_VISIBLE_ELEMENTS }, (_, index) => ({
      id: `element-${Date.now()}-${index}`,
      element: ELEMENT_POOL[index % ELEMENT_POOL.length] ?? '✨',
      delay: index * 4,
      duration: ANIMATION_DURATION + (index * 2),
      top: Math.random() * 70 + 10, // Keep elements in viewable area
      left: -10,
      scale: 0.8 + Math.random() * 0.4, // Varied sizes
    }))
  }, [])

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false)
      },
      { threshold: 0.1 }
    )

    const target = document.getElementById('floating-elements-container')
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [])

  // Generate new elements periodically
  useEffect(() => {
    if (!isVisible || shouldReduceMotion) return

    const generateNewElements = () => {
      setElements(generateElements())
    }

    generateNewElements()
    
    const interval = setInterval(generateNewElements, ANIMATION_DURATION * 1000)
    return () => clearInterval(interval)
  }, [isVisible, shouldReduceMotion, generateElements])

  // Don't render if reduced motion is preferred
  if (shouldReduceMotion) {
    return null
  }

  return (
    <div 
      id="floating-elements-container"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      <AnimatePresence mode="popLayout">
        {isVisible && elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-2xl opacity-40 will-change-transform"
            initial={{ 
              x: element.left, 
              y: `${element.top}vh`,
              scale: 0,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              x: ['0vw', '50vw', '100vw', '110vw'],
              y: [`${element.top}vh`, `${element.top - 20}vh`, `${element.top - 10}vh`, `${element.top - 30}vh`],
              scale: [0, element.scale, element.scale, 0],
              rotate: [0, 180, 360, 540],
              opacity: [0, 0.6, 0.4, 0]
            }}
            exit={{ 
              opacity: 0,
              scale: 0,
              transition: { duration: 0.5 }
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
              times: [0, 0.2, 0.8, 1], // Keyframe timing
            }}
            style={{
              filter: 'blur(0.5px)', // Subtle blur for ethereal effect
              textShadow: '0 0 10px currentColor',
            }}
          >
            {element.element}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Memoized export for performance
export default OptimizedFloatingElements