'use client'

import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import type { MysteryLevel } from '../../types'

// === Badge Types ===

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'mystical' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill' | 'square'
  glow?: boolean
  animate?: boolean
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

export interface MysteryBadgeProps extends Omit<BadgeProps, 'variant'> {
  level: MysteryLevel
  showStars?: boolean
  showText?: boolean
}

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'busy' | 'away' | 'pending' | 'active' | 'inactive'
  pulse?: boolean
}

// === Badge Variants ===

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-purple-100 text-purple-800 border-purple-200',
  secondary: 'bg-gray-100 text-gray-600 border-gray-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  mystical: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 backdrop-blur-sm shadow-lg shadow-purple-500/20',
  outline: 'bg-transparent text-gray-300 border-gray-600'
}

const badgeSizes = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
}

const badgeShapes = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
  square: 'rounded-none'
}

// === Mystery Level Utilities ===

const getMysteryLevelColor = (level: MysteryLevel): string => {
  const colors = {
    1: 'from-gray-500 to-gray-600',
    2: 'from-green-500 to-green-600',
    3: 'from-blue-500 to-blue-600',
    4: 'from-purple-500 to-purple-600',
    5: 'from-pink-500 to-pink-600',
    6: 'from-yellow-500 to-orange-500',
    7: 'from-red-500 to-red-600',
    8: 'from-indigo-500 to-purple-500',
    9: 'from-purple-600 to-pink-600',
    10: 'from-yellow-400 via-pink-500 to-purple-600'
  }
  return colors[level] || colors[1]
}

const getMysteryLevelText = (level: MysteryLevel): string => {
  const texts = {
    1: '初級',
    2: '入門',
    3: '普通',
    4: '上級',
    5: '専門',
    6: '希少',
    7: '極稀',
    8: '伝説',
    9: '神話',
    10: '至高'
  }
  return texts[level] || texts[1]
}

// === Main Badge Component ===

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'sm',
    shape = 'pill',
    glow = false,
    animate = false,
    icon,
    removable = false,
    onRemove,
    children,
    ...props
  }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center gap-1 font-medium border transition-all duration-200',
          // Variant styles
          badgeVariants[variant],
          // Size styles
          badgeSizes[size],
          // Shape styles
          badgeShapes[shape],
          // Glow effect
          glow && variant === 'mystical' && 'shadow-lg shadow-purple-500/25',
          // Animation
          animate && 'animate-pulse',
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        
        {/* Content */}
        {children && (
          <span className="truncate">
            {children}
          </span>
        )}
        
        {/* Remove button */}
        {removable && onRemove && (
          <button
            onClick={onRemove}
            className="flex-shrink-0 ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
            aria-label="Remove badge"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// === Mystery Level Badge ===

export const MysteryBadge = forwardRef<HTMLSpanElement, MysteryBadgeProps>(
  ({
    level,
    showStars = true,
    showText = true,
    className,
    ...props
  }, ref) => {
    const stars = '★'.repeat(level)
    const gradient = getMysteryLevelColor(level)
    const text = getMysteryLevelText(level)
    
    return (
      <Badge
        ref={ref}
        className={cn(
          `bg-gradient-to-r ${gradient} text-white border-0 shadow-lg`,
          level >= 8 && 'animate-pulse shadow-xl',
          className
        )}
        glow={level >= 6}
        animate={level === 10}
        icon={
          <span className="text-yellow-300">
            🔮
          </span>
        }
        {...props}
      >
        <div className="flex items-center gap-1">
          {showText && (
            <span className="font-bold">
              {text}
            </span>
          )}
          {showStars && (
            <span className="text-yellow-300 text-xs">
              {stars}
            </span>
          )}
          <span className="text-xs opacity-80">
            Lv.{level}
          </span>
        </div>
      </Badge>
    )
  }
)

MysteryBadge.displayName = 'MysteryBadge'

// === Status Badge ===

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({
    status,
    pulse = false,
    className,
    ...props
  }, ref) => {
    const statusConfig = {
      online: { color: 'bg-green-500', text: 'オンライン', variant: 'success' as const },
      offline: { color: 'bg-gray-500', text: 'オフライン', variant: 'default' as const },
      busy: { color: 'bg-red-500', text: '取り込み中', variant: 'error' as const },
      away: { color: 'bg-yellow-500', text: '離席中', variant: 'warning' as const },
      pending: { color: 'bg-blue-500', text: '保留中', variant: 'primary' as const },
      active: { color: 'bg-green-500', text: 'アクティブ', variant: 'success' as const },
      inactive: { color: 'bg-gray-500', text: '非アクティブ', variant: 'default' as const }
    }
    
    const config = statusConfig[status]
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        className={className}
        icon={
          <div className={cn(
            'w-2 h-2 rounded-full',
            config.color,
            pulse && 'animate-pulse'
          )} />
        }
        {...props}
      >
        {config.text}
      </Badge>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

// === Count Badge ===

export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

export const CountBadge = forwardRef<HTMLSpanElement, CountBadgeProps>(
  ({
    count,
    max = 99,
    showZero = false,
    className,
    ...props
  }, ref) => {
    if (count === 0 && !showZero) return null
    
    const displayCount = count > max ? `${max}+` : count.toString()
    
    return (
      <Badge
        ref={ref}
        variant="error"
        size="xs"
        className={cn('min-w-[1.25rem] justify-center', className)}
        {...props}
      >
        {displayCount}
      </Badge>
    )
  }
)

CountBadge.displayName = 'CountBadge'

// === Discount Badge ===

export interface DiscountBadgeProps extends Omit<BadgeProps, 'children'> {
  percentage: number
  originalPrice?: number
  currentPrice?: number
}

export const DiscountBadge = forwardRef<HTMLSpanElement, DiscountBadgeProps>(
  ({
    percentage,
    originalPrice,
    currentPrice,
    className,
    ...props
  }, ref) => {
    // Calculate percentage if prices are provided
    const calculatedPercentage = originalPrice && currentPrice 
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : percentage
    
    if (calculatedPercentage <= 0) return null
    
    return (
      <Badge
        ref={ref}
        variant="error"
        className={cn('font-bold', className)}
        glow
        {...props}
      >
        -{calculatedPercentage}%
      </Badge>
    )
  }
)

DiscountBadge.displayName = 'DiscountBadge'

// === Stock Badge ===

export interface StockBadgeProps extends Omit<BadgeProps, 'children'> {
  stock: number
  lowStockThreshold?: number
}

export const StockBadge = forwardRef<HTMLSpanElement, StockBadgeProps>(
  ({
    stock,
    lowStockThreshold = 5,
    className,
    ...props
  }, ref) => {
    if (stock > lowStockThreshold) return null
    
    const getVariant = () => {
      if (stock === 0) return 'error'
      if (stock <= lowStockThreshold / 2) return 'warning'
      return 'warning'
    }
    
    const getText = () => {
      if (stock === 0) return '在庫切れ'
      return `残り${stock}個`
    }
    
    return (
      <Badge
        ref={ref}
        variant={getVariant()}
        className={cn('font-bold', className)}
        animate={stock === 0}
        {...props}
      >
        {getText()}
      </Badge>
    )
  }
)

StockBadge.displayName = 'StockBadge'

// === New Badge ===

export interface NewBadgeProps extends Omit<BadgeProps, 'children'> {
  createdAt: Date
  newThresholdDays?: number
}

export const NewBadge = forwardRef<HTMLSpanElement, NewBadgeProps>(
  ({
    createdAt,
    newThresholdDays = 7,
    className,
    ...props
  }, ref) => {
    const daysSinceCreation = Math.floor(
      (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    )
    
    if (daysSinceCreation > newThresholdDays) return null
    
    return (
      <Badge
        ref={ref}
        variant="success"
        className={cn('font-bold', className)}
        glow
        animate
        {...props}
      >
        NEW
      </Badge>
    )
  }
)

NewBadge.displayName = 'NewBadge'

// Export all components
export default Badge