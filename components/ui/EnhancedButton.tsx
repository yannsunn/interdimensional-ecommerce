'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Sparkles, Zap } from 'lucide-react'

interface EnhancedButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'interdimensional' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  quantum?: boolean // 量子効果
  mysteryLevel?: number // 神秘度 (1-10)
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  quantum = false,
  mysteryLevel = 0,
  onClick,
  className = '',
  type = 'button'
}: EnhancedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])

  const baseClasses = `
    relative overflow-hidden font-medium transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    transform-gpu will-change-transform
    select-none touch-manipulation
  `

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px] min-w-[64px]',
    md: 'px-4 py-2.5 text-base min-h-[44px] min-w-[88px]',
    lg: 'px-6 py-3 text-lg min-h-[52px] min-w-[112px]',
    xl: 'px-8 py-4 text-xl min-h-[60px] min-w-[136px]'
  }

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-600 to-pink-600 text-white
      hover:from-purple-700 hover:to-pink-700
      focus:ring-purple-500 focus:ring-offset-slate-900
      shadow-lg hover:shadow-purple-500/25
    `,
    secondary: `
      bg-gradient-to-r from-slate-700 to-slate-600 text-white
      hover:from-slate-600 hover:to-slate-500
      focus:ring-slate-500 focus:ring-offset-slate-900
      shadow-lg hover:shadow-slate-500/25
    `,
    interdimensional: `
      bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white
      hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400
      focus:ring-cyan-500 focus:ring-offset-slate-900
      shadow-lg hover:shadow-cyan-500/50
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-pink-600 text-white
      hover:from-red-700 hover:to-pink-700
      focus:ring-red-500 focus:ring-offset-slate-900
      shadow-lg hover:shadow-red-500/25
    `,
    ghost: `
      bg-transparent text-slate-300 border border-slate-600
      hover:bg-slate-800 hover:text-white hover:border-slate-500
      focus:ring-slate-500 focus:ring-offset-slate-900
    `
  }

  const quantumClasses = quantum ? `
    animate-pulse
    after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent
    after:animate-ping after:animation-duration-2000
  ` : ''

  const mysteryGlow = mysteryLevel > 0 ? `
    drop-shadow-[0_0_${mysteryLevel * 2}px_rgba(139,92,246,0.${mysteryLevel})]
    hover:drop-shadow-[0_0_${mysteryLevel * 3}px_rgba(139,92,246,0.${Math.min(mysteryLevel + 2, 10)})]
  ` : ''

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // パーティクル効果
    if (mysteryLevel > 5) {
      const rect = e.currentTarget.getBoundingClientRect()
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }))
      setParticles(prev => [...prev, ...newParticles])
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.some(n => n.id === p.id)))
      }, 1000)
    }

    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    onClick?.()
  }

  return (
    <motion.button
      type={type}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${quantumClasses}
        ${mysteryGlow}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ローディング状態 */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 量子効果アイコン */}
      {quantum && !loading && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-3 h-3 text-yellow-400" />
        </motion.div>
      )}

      {/* 神秘レベル表示 */}
      {mysteryLevel > 7 && (
        <motion.div
          className="absolute -top-2 -left-2"
          animate={{ 
            y: [-2, 2, -2],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </motion.div>
      )}

      {/* パーティクル効果 */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* ボタンコンテンツ */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{ 
          scale: isPressed ? 0.95 : 1,
          filter: mysteryLevel > 0 ? `hue-rotate(${mysteryLevel * 10}deg)` : 'none'
        }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.span>

      {/* リップル効果 */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  )
}