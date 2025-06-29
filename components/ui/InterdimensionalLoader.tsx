'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Sparkles, Zap, Eye } from 'lucide-react'

interface InterdimensionalLoaderProps {
  variant?: 'portal' | 'quantum' | 'energy' | 'minimal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  mysteryLevel?: number
  isVisible?: boolean
  className?: string
}

export function InterdimensionalLoader({
  variant = 'portal',
  size = 'md',
  text = '異次元エネルギー充填中...',
  mysteryLevel = 5,
  isVisible = true,
  className = ''
}: InterdimensionalLoaderProps) {
  const sizeConfig = {
    sm: { container: 'w-12 h-12', icon: 16, text: 'text-sm' },
    md: { container: 'w-16 h-16', icon: 24, text: 'text-base' },
    lg: { container: 'w-24 h-24', icon: 32, text: 'text-lg' },
    xl: { container: 'w-32 h-32', icon: 48, text: 'text-xl' }
  }

  const config = sizeConfig[size]

  const PortalLoader = () => (
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-pink-400/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner core */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Energy particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: `${20 + i * 4}px 0px`
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )

  const QuantumLoader = () => (
    <div className="relative">
      {/* Quantum field */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20"
        animate={{
          background: [
            'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)'
          ],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Quantum dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${50 + 30 * Math.cos((i * Math.PI) / 4)}%`,
            top: `${50 + 30 * Math.sin((i * Math.PI) / 4)}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Central energy */}
      <motion.div className="absolute inset-6 flex items-center justify-center">
        <Zap 
          size={config.icon} 
          className="text-yellow-400"
        />
      </motion.div>
    </div>
  )

  const EnergyLoader = () => (
    <div className="relative">
      {/* Energy waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute inset-${i * 2} rounded-full border-2 border-cyan-400/30`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Central spark */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 360]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles 
          size={config.icon} 
          className="text-purple-400"
        />
      </motion.div>
      
      {/* Mystery level effects */}
      {mysteryLevel >= 8 && (
        <motion.div
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
          animate={{
            rotate: [0, -360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )

  const MinimalLoader = () => (
    <motion.div
      className="flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 size={config.icon} className="text-purple-400" />
    </motion.div>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'portal': return <PortalLoader />
      case 'quantum': return <QuantumLoader />
      case 'energy': return <EnergyLoader />
      case 'minimal': return <MinimalLoader />
      default: return <PortalLoader />
    }
  }

  const mysteryGlow = mysteryLevel >= 7 ? 
    `drop-shadow-[0_0_${mysteryLevel}px_rgba(147,51,234,0.5)]` : ''

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`flex flex-col items-center justify-center gap-4 ${className}`}
        >
          {/* Loader animation */}
          <div className={`${config.container} relative ${mysteryGlow}`}>
            {renderLoader()}
          </div>
          
          {/* Loading text with typewriter effect */}
          {text && (
            <motion.div 
              className={`${config.text} text-center text-gray-300 font-medium`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                animate={{
                  background: [
                    'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4)',
                    'linear-gradient(135deg, #ec4899, #06b6d4, #a855f7)',
                    'linear-gradient(225deg, #06b6d4, #a855f7, #ec4899)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
              >
                {text}
              </motion.span>
              
              {/* Animated dots */}
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-purple-400"
              >
                ...
              </motion.span>
            </motion.div>
          )}
          
          {/* Mystery level indicator */}
          {mysteryLevel >= 7 && (
            <motion.div
              className="flex items-center gap-1 text-xs text-yellow-400"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Eye size={12} />
              <span>異次元レベル {mysteryLevel}</span>
            </motion.div>
          )}
          
          {/* Ambient particles */}
          {variant !== 'minimal' && mysteryLevel >= 6 && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}