'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// === Card Types ===

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'mystical' | 'ghost' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  hover?: boolean
  glow?: boolean
  gradient?: boolean
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait'
  objectFit?: 'cover' | 'contain' | 'fill'
}

// === Card Variants ===

const cardVariants = {
  default: 'bg-gray-900/50 border border-gray-700 backdrop-blur-sm',
  mystical: 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-500/10',
  ghost: 'bg-transparent border border-gray-600/50',
  bordered: 'bg-gray-800/80 border-2 border-gray-600 backdrop-blur-sm'
}

const cardSizes = {
  sm: 'p-4 rounded-lg',
  md: 'p-6 rounded-xl',
  lg: 'p-8 rounded-2xl'
}

const cardHoverEffects = {
  default: 'hover:border-gray-600 hover:shadow-lg transition-all duration-300',
  mystical: 'hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300',
  ghost: 'hover:border-gray-500/70 hover:bg-gray-800/20 transition-all duration-300',
  bordered: 'hover:border-gray-500 hover:shadow-lg transition-all duration-300'
}

const cardGlowEffects = {
  default: 'shadow-lg shadow-gray-500/10',
  mystical: 'shadow-2xl shadow-purple-500/25',
  ghost: 'shadow-md shadow-gray-400/10',
  bordered: 'shadow-lg shadow-gray-400/15'
}

// === Aspect Ratio Classes ===

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]'
}

// === Main Card Component ===

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    hover = false,
    glow = false,
    gradient = false,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative overflow-hidden',
          // Variant styles
          cardVariants[variant],
          // Size styles
          cardSizes[size],
          // Hover effects
          hover && cardHoverEffects[variant],
          // Glow effects
          glow && cardGlowEffects[variant],
          // Gradient overlay
          gradient && 'before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/50 before:to-transparent before:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// === Card Header Component ===

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mb-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// === Card Body Component ===

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardBody.displayName = 'CardBody'

// === Card Footer Component ===

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 pt-4 border-t border-gray-700/50', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

// === Card Image Component ===

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({
    className,
    src,
    alt,
    aspectRatio = 'video',
    objectFit = 'cover',
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-lg bg-gray-800',
          aspectRatios[aspectRatio],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full transition-transform duration-300 hover:scale-105',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill'
          )}
          loading="lazy"
        />
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'

// === Product Card Component ===

export interface ProductCardProps extends CardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    images: string[]
    mysteryLevel: number
    inStock?: boolean
  }
  onAddToCart?: (productId: string) => void
  onViewDetails?: (productId: string) => void
  showAddToCart?: boolean
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({
    product,
    onAddToCart,
    onViewDetails,
    showAddToCart = true,
    className,
    ...props
  }, ref) => {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price
    const discountPercentage = hasDiscount 
      ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
      : 0
    
    return (
      <Card
        ref={ref}
        variant="mystical"
        hover
        glow
        className={cn('group cursor-pointer', className)}
        onClick={() => onViewDetails?.(product.id)}
        {...props}
      >
        {/* Product Image */}
        <div className="relative">
          <CardImage
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            aspectRatio="square"
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </div>
          )}
          
          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold">売り切れ</span>
            </div>
          )}
          
          {/* Mystery Level */}
          <div className="absolute bottom-2 left-2">
            <div className="bg-purple-600/90 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              🔮 Lv.{product.mysteryLevel}
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <CardBody className="pt-4">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-purple-300">
                ¥{product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ¥{product.originalPrice!.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </CardBody>
        
        {/* Add to Cart Button */}
        {showAddToCart && product.inStock && (
          <CardFooter className="pt-3">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart?.(product.id)
              }}
            >
              カートに追加
            </button>
          </CardFooter>
        )}
      </Card>
    )
  }
)

ProductCard.displayName = 'ProductCard'

// === Statistics Card Component ===

export interface StatsCardProps extends CardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
  }
  icon?: React.ReactNode
}

export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({ title, value, change, icon, className, ...props }, ref) => {
    const getChangeColor = () => {
      if (!change) return ''
      switch (change.type) {
        case 'increase':
          return 'text-green-400'
        case 'decrease':
          return 'text-red-400'
        default:
          return 'text-gray-400'
      }
    }
    
    const getChangeIcon = () => {
      if (!change) return null
      switch (change.type) {
        case 'increase':
          return '↗'
        case 'decrease':
          return '↘'
        default:
          return '→'
      }
    }
    
    return (
      <Card
        ref={ref}
        variant="default"
        hover
        className={cn('text-center', className)}
        {...props}
      >
        {icon && (
          <div className="text-3xl mb-2 text-purple-400">
            {icon}
          </div>
        )}
        
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white mb-2">{value}</p>
        
        {change && (
          <div className={cn('text-sm flex items-center justify-center gap-1', getChangeColor())}>
            <span>{getChangeIcon()}</span>
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </Card>
    )
  }
)

StatsCard.displayName = 'StatsCard'

// Export all components
export default Card