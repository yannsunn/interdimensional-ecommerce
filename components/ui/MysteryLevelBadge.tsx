'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Eye, Crown, Infinity } from 'lucide-react'

interface MysteryLevelBadgeProps {
  level: number
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
  showAnimation?: boolean
}

export function MysteryLevelBadge({ 
  level, 
  variant = 'default', 
  className = '',
  showAnimation = true
}: MysteryLevelBadgeProps) {
  const getMysteryData = (level: number) => {
    if (level <= 0) return { color: 'gray', label: '一般', icon: null, description: '通常の商品' }
    if (level <= 2) return { 
      color: 'green', 
      label: '微神秘', 
      icon: Sparkles, 
      description: '少し不思議な効果',
      gradient: 'from-green-500 to-emerald-400'
    }
    if (level <= 4) return { 
      color: 'blue', 
      label: '神秘', 
      icon: Eye, 
      description: '神秘的な力を秘める',
      gradient: 'from-blue-500 to-cyan-400'
    }
    if (level <= 6) return { 
      color: 'purple', 
      label: '超神秘', 
      icon: Zap, 
      description: '異次元のエネルギー',
      gradient: 'from-purple-500 to-pink-400'
    }
    if (level <= 8) return { 
      color: 'yellow', 
      label: '極神秘', 
      icon: Crown, 
      description: '宇宙レベルの神秘',
      gradient: 'from-yellow-500 to-orange-400'
    }
    return { 
      color: 'rainbow', 
      label: '無限神秘', 
      icon: Infinity, 
      description: '存在そのものが異次元',
      gradient: 'from-cyan-500 via-purple-500 to-pink-500'
    }
  }

  const mysteryData = getMysteryData(level)
  const Icon = mysteryData.icon

  const baseClasses = `
    inline-flex items-center gap-1 rounded-full font-medium
    backdrop-blur-sm border transition-all duration-300
    select-none
  `

  const sizeClasses = {
    compact: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    detailed: 'px-4 py-2 text-base'
  }

  const colorClasses = {
    gray: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    rainbow: 'bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-transparent text-transparent bg-clip-text'
  }

  const glowEffect = level > 6 ? `
    drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]
    hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]
  ` : level > 3 ? `
    drop-shadow-[0_0_4px_rgba(59,130,246,0.3)]
    hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]
  ` : ''

  const animationProps = showAnimation && level > 0 ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.05 },
    transition: { duration: 0.3 }
  } : {}

  // レベル9-10は特別なアニメーション
  const specialAnimation = level >= 9 ? {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 1, -1, 0],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <motion.div
      className={`
        ${baseClasses}
        ${sizeClasses[variant]}
        ${colorClasses[mysteryData.color]}
        ${glowEffect}
        ${className}
      `}
      {...animationProps}
      {...specialAnimation}
      title={variant === 'compact' ? `${mysteryData.label} - ${mysteryData.description}` : undefined}
    >
      {/* アイコン */}
      {Icon && (
        <motion.div
          animate={level >= 7 ? {
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          } : {}}
          transition={level >= 7 ? {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <Icon className={`
            ${variant === 'compact' ? 'w-3 h-3' : 'w-4 h-4'}
            ${mysteryData.color === 'rainbow' ? 'text-cyan-400' : ''}
          `} />
        </motion.div>
      )}

      {/* レベル表示 */}
      <span className={`
        font-bold
        ${mysteryData.color === 'rainbow' ? `
          bg-gradient-to-r ${mysteryData.gradient} bg-clip-text text-transparent
        ` : ''}
      `}>
        {variant === 'compact' ? `Lv.${level}` : mysteryData.label}
      </span>

      {/* 詳細版の説明 */}
      {variant === 'detailed' && (
        <span className="text-xs opacity-75 ml-1">
          {mysteryData.description}
        </span>
      )}

      {/* 高レベル時の追加エフェクト */}
      {level >= 8 && showAnimation && (
        <>
          {/* パルス効果 */}
          <motion.div
            className="absolute inset-0 rounded-full bg-current opacity-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* スパークル */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-2 h-2 text-yellow-400" />
          </motion.div>
        </>
      )}

      {/* 最高レベル時の虹色オーラ */}
      {level >= 9 && showAnimation && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-sm"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.div>
  )
}