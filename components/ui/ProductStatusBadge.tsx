'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Fire, Shield, Zap, AlertTriangle, CheckCircle } from 'lucide-react'

interface ProductStatusBadgeProps {
  type: 'limited' | 'hot' | 'new' | 'guaranteed' | 'quantum' | 'warning' | 'verified'
  count?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  pulsing?: boolean
}

export function ProductStatusBadge({ 
  type, 
  count, 
  className = '',
  size = 'md',
  pulsing = false
}: ProductStatusBadgeProps) {
  const getStatusConfig = (type: string) => {
    const configs = {
      limited: {
        icon: Clock,
        label: count ? `残り${count}個` : '限定',
        color: 'bg-gradient-to-r from-red-500 to-pink-500',
        textColor: 'text-white',
        border: 'border-red-500/30',
        glow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]',
        animation: 'pulse'
      },
      hot: {
        icon: Fire,
        label: '大人気',
        color: 'bg-gradient-to-r from-orange-500 to-red-500',
        textColor: 'text-white',
        border: 'border-orange-500/30',
        glow: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]',
        animation: 'bounce'
      },
      new: {
        icon: Zap,
        label: '新着',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500',
        textColor: 'text-white',
        border: 'border-green-500/30',
        glow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]',
        animation: 'none'
      },
      guaranteed: {
        icon: Shield,
        label: '効果保証',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        textColor: 'text-white',
        border: 'border-blue-500/30',
        glow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]',
        animation: 'none'
      },
      quantum: {
        icon: Zap,
        label: '量子効果',
        color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500',
        textColor: 'text-white',
        border: 'border-purple-500/30',
        glow: 'drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]',
        animation: 'quantum'
      },
      warning: {
        icon: AlertTriangle,
        label: '注意',
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        textColor: 'text-black',
        border: 'border-yellow-500/30',
        glow: 'drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]',
        animation: 'none'
      },
      verified: {
        icon: CheckCircle,
        label: '認証済み',
        color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        textColor: 'text-white',
        border: 'border-emerald-500/30',
        glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]',
        animation: 'none'
      }
    }
    return configs[type] || configs.new
  }

  const config = getStatusConfig(type)
  const Icon = config.icon

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const baseClasses = `
    inline-flex items-center gap-1.5 rounded-full font-bold
    backdrop-blur-sm border transition-all duration-300
    select-none whitespace-nowrap
  `

  // アニメーション設定
  const getAnimationProps = () => {
    switch (config.animation) {
      case 'pulse':
        return pulsing ? {
          animate: {
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : {}
      
      case 'bounce':
        return {
          animate: {
            y: [0, -2, 0],
            scale: [1, 1.02, 1]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'quantum':
        return {
          animate: {
            background: [
              'linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4)',
              'linear-gradient(90deg, #ec4899, #06b6d4, #8b5cf6)',
              'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
              'linear-gradient(180deg, #8b5cf6, #ec4899, #06b6d4)'
            ],
            rotate: [0, 360]
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }
        }
      
      default:
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 }
        }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${config.color}
          ${config.textColor}
          ${config.border}
          ${config.glow}
          ${className}
        `}
        {...getAnimationProps()}
      >
        {/* アイコン */}
        <motion.div
          animate={config.animation === 'quantum' ? {
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          } : {}}
          transition={config.animation === 'quantum' ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <Icon className={iconSizes[size]} />
        </motion.div>

        {/* ラベル */}
        <span className="font-extrabold tracking-wide">
          {config.label}
        </span>

        {/* 限定商品の場合のカウントダウン効果 */}
        {type === 'limited' && count && count <= 5 && (
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* 量子効果の特別エフェクト */}
        {type === 'quantum' && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-1 h-1 bg-cyan-400 rounded-full" />
            </motion.div>
          </>
        )}

        {/* 人気商品の炎エフェクト */}
        {type === 'hot' && (
          <motion.div
            className="absolute -top-1 -left-1"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full" />
          </motion.div>
        )}

        {/* 新着商品のスパークル */}
        {type === 'new' && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}