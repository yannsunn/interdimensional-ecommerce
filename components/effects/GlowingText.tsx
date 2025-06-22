'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowingTextProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowingText({ 
  children, 
  className = '', 
  glowColor = 'rgb(255, 0, 255)' 
}: GlowingTextProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        textShadow: [
          `0 0 20px ${glowColor}`,
          `0 0 40px ${glowColor}`,
          `0 0 20px ${glowColor}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function GlitchText({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 text-cyan-500 animate-glitch-1" 
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 text-pink-500 animate-glitch-2" 
        aria-hidden="true"
      >
        {children}
      </span>
    </div>
  )
}