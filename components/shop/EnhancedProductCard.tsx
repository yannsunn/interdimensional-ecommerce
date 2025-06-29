'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Heart, Eye, Star, Zap, Shield } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { EnhancedButton } from '../ui/EnhancedButton'
import { MysteryLevelBadge } from '../ui/MysteryLevelBadge'
import { ProductStatusBadge } from '../ui/ProductStatusBadge'
import { ProductCardImage } from '../ui/BaseProductImage'

interface EnhancedProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number | null
    description: string
    images: string[]
    mysteryLevel: number
    stock: number
    effects?: string[]
    testimonials?: string[]
    slug: string
    featured?: boolean
    isLimited?: boolean
    limitedQuantity?: number
  }
  index?: number
  variant?: 'default' | 'compact' | 'featured' | 'mobile' | 'interdimensional'
  onAddToCart?: (productId: string) => void
  showAddToCart?: boolean
  className?: string
}

const formatPrice = (price: number) => `¥${price.toLocaleString()}`
const truncateText = (text: string, length: number) => 
  text.length > length ? text.substring(0, length) + '...' : text

export const EnhancedProductCard = memo(function EnhancedProductCard({ 
  product, 
  index = 0, 
  variant = 'default',
  onAddToCart,
  showAddToCart = true,
  className = ''
}: EnhancedProductCardProps) {
  const { addItem } = useCartStore()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  
  // Product calculations
  const discountPercentage = product.originalPrice && product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const isOutOfStock = product.stock <= 0
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isHot = product.mysteryLevel >= 8 || discountPercentage >= 30
  const isNew = !product.featured && product.mysteryLevel >= 6

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isOutOfStock) return
    
    if (onAddToCart) {
      onAddToCart(product.id)
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        mysteryLevel: product.mysteryLevel,
        image: product.images?.[0] || '',
      })
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuickView(true)
  }

  // Variant-specific styles
  const getCardStyles = () => {
    const baseStyles = `
      relative overflow-hidden backdrop-blur-sm transition-all duration-500 group
      transform-gpu will-change-transform cursor-pointer
    `
    
    const hoverEffects = `
      hover:scale-105 hover:z-10
      hover:shadow-2xl hover:shadow-purple-500/30
    `

    switch (variant) {
      case 'interdimensional':
        return `${baseStyles} ${hoverEffects}
          bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-cyan-900/40 
          border-2 border-transparent bg-clip-padding
          before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-cyan-500 before:rounded-3xl before:-z-10
          rounded-3xl p-6 shadow-2xl
        `
      case 'featured':
        return `${baseStyles} ${hoverEffects}
          bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-red-900/30 
          border-2 border-yellow-500/70 rounded-3xl p-6 shadow-2xl
          hover:border-yellow-400 hover:shadow-yellow-500/40
          ring-4 ring-yellow-500/20
        `
      case 'compact':
        return `${baseStyles} ${hoverEffects}
          bg-gradient-to-br from-purple-900/20 to-black/40 
          border border-purple-500/50 rounded-2xl p-4
          hover:border-pink-500 hover:shadow-purple-500/20
        `
      case 'mobile':
        return `${baseStyles}
          bg-gradient-to-br from-purple-900/30 to-black/50 
          border border-purple-400/50 rounded-xl p-3
          hover:border-purple-400 hover:shadow-lg active:scale-95
        `
      default:
        return `${baseStyles} ${hoverEffects}
          bg-gradient-to-br from-purple-900/20 to-black/40 
          border-2 border-purple-500/70 rounded-3xl p-4 sm:p-6
          hover:border-pink-500 hover:shadow-purple-500/25
        `
    }
  }

  const getImageHeight = () => {
    switch (variant) {
      case 'mobile': return 'h-32 sm:h-36'
      case 'compact': return 'h-36 sm:h-40'
      case 'featured': 
      case 'interdimensional': return 'h-48 sm:h-56 md:h-64'
      default: return 'h-40 sm:h-48 md:h-52'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: Math.min(index * 0.1, 0.5),
        duration: 0.6,
        ease: "easeOut"
      }}
      className={`${getCardStyles()} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quantum field effect for high mystery level */}
      {product.mysteryLevel >= 9 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(236,72,153,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(6,182,212,0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Top status badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
        <div className="flex flex-col gap-2">
          <MysteryLevelBadge 
            level={product.mysteryLevel} 
            variant={variant === 'mobile' ? 'compact' : 'default'}
            showAnimation={isHovered}
          />
          {product.featured && (
            <ProductStatusBadge type="verified" size="sm" />
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {isHot && <ProductStatusBadge type="hot" size="sm" pulsing />}
          {isNew && <ProductStatusBadge type="new" size="sm" />}
          {product.isLimited && (
            <ProductStatusBadge 
              type="limited" 
              count={product.limitedQuantity || product.stock}
              size="sm" 
              pulsing={product.stock <= 3}
            />
          )}
          {discountPercentage > 0 && (
            <motion.div
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {discountPercentage}%OFF
            </motion.div>
          )}
          {product.mysteryLevel >= 8 && (
            <ProductStatusBadge type="quantum" size="sm" />
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        <motion.button
          onClick={handleFavorite}
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:text-red-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="お気に入りに追加"
        >
          <Heart 
            size={18} 
            className={`${isFavorite ? 'fill-red-500 text-red-500' : ''} transition-colors`} 
          />
        </motion.button>
        
        {variant !== 'mobile' && (
          <motion.button
            onClick={handleQuickView}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="クイックビュー"
          >
            <Eye size={18} />
          </motion.button>
        )}
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`relative w-full ${getImageHeight()} rounded-lg mb-4 overflow-hidden group/image`}>
          <ProductCardImage
            product={product}
            className="w-full h-full transition-all duration-700 group-hover:scale-110"
            priority={index < 4}
          />
          
          {/* Hover overlay with enhanced effects */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 text-white text-sm font-medium"
            >
              <Eye size={16} />
              詳細を見る
            </motion.div>
          </motion.div>

          {/* Mystery level glow effect */}
          {product.mysteryLevel >= 7 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-lg"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                background: [
                  'linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2), rgba(6,182,212,0.2))',
                  'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(6,182,212,0.2), rgba(168,85,247,0.2))',
                  'linear-gradient(225deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2), rgba(236,72,153,0.2))'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <motion.h3 
            className={`
              ${variant === 'mobile' ? 'text-sm' : variant === 'featured' || variant === 'interdimensional' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} 
              font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text 
              transition-all duration-500 line-clamp-2 leading-tight
            `}
            whileHover={{ scale: 1.02 }}
          >
            {variant === 'mobile' ? truncateText(product.name, 30) : product.name}
          </motion.h3>
        </Link>

        {/* Description - Enhanced visibility */}
        {variant !== 'mobile' && (
          <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
            {truncateText(product.description, variant === 'compact' ? 80 : 120)}
          </p>
        )}

        {/* Effects Pills - Enhanced design */}
        {product.effects && product.effects.length > 0 && variant !== 'mobile' && (
          <motion.div 
            className="flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.effects.slice(0, variant === 'featured' || variant === 'interdimensional' ? 4 : 3).map((effect, i) => (
              <motion.span
                key={i}
                className="text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/30"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                {effect}
              </motion.span>
            ))}
            {product.effects.length > (variant === 'featured' || variant === 'interdimensional' ? 4 : 3) && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{product.effects.length - (variant === 'featured' || variant === 'interdimensional' ? 4 : 3)}
              </span>
            )}
          </motion.div>
        )}

        {/* Testimonials - For featured variants */}
        {(variant === 'featured' || variant === 'interdimensional') && product.testimonials && product.testimonials.length > 0 && (
          <motion.div 
            className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-green-400 text-sm font-medium">利用者の声</span>
            </div>
            <p className="text-gray-300 text-xs italic">
              "{truncateText(product.testimonials[0], 60)}"
            </p>
          </motion.div>
        )}

        {/* Price Section - Enhanced with better visual hierarchy */}
        <motion.div 
          className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-400/50 rounded-xl p-4 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
        >
          {product.originalPrice && product.originalPrice > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 line-through text-sm">
                通常価格: {formatPrice(product.originalPrice)}
              </span>
              <span className="text-red-400 text-sm font-bold bg-red-500/20 px-2 py-1 rounded">
                {discountPercentage}%お得
              </span>
            </div>
          )}
          <div className={`
            ${variant === 'mobile' ? 'text-xl' : variant === 'featured' || variant === 'interdimensional' ? 'text-3xl' : 'text-2xl'} 
            font-bold text-yellow-400 flex items-center justify-between
          `}>
            <span>{formatPrice(product.price)}</span>
            {product.mysteryLevel >= 8 && (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-cyan-400" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Add to Cart Button - Enhanced with better UX */}
        {showAddToCart && (
          <EnhancedButton
            variant={isOutOfStock ? 'ghost' : variant === 'featured' || variant === 'interdimensional' ? 'interdimensional' : 'primary'}
            size={variant === 'mobile' ? 'sm' : 'md'}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            quantum={product.mysteryLevel >= 8}
            mysteryLevel={product.mysteryLevel}
            className="w-full"
          >
            <ShoppingCart size={18} />
            {isOutOfStock ? '売り切れ' : 'カートに追加'}
          </EnhancedButton>
        )}

        {/* Stock indicator */}
        {!isOutOfStock && isLowStock && (
          <motion.p 
            className="text-orange-400 text-xs text-center font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚠ 残りわずか！({product.stock}個)
          </motion.p>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900 to-black border-2 border-purple-500 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{product.description}</p>
              <div className="flex gap-3">
                <EnhancedButton
                  variant="primary"
                  size="sm"
                  onClick={() => setShowQuickView(false)}
                  className="flex-1"
                >
                  詳細を見る
                </EnhancedButton>
                <EnhancedButton
                  variant="interdimensional"
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1"
                >
                  カートに追加
                </EnhancedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})