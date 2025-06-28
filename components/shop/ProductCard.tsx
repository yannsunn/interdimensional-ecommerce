'use client'

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

// Simplified interfaces and types for mobile optimization
interface ProductCardProps {
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
  }
  index?: number
  variant?: 'default' | 'compact' | 'featured' | 'mobile'
  onAddToCart?: (productId: string) => void
  showAddToCart?: boolean
  className?: string
}

// Utility functions (inline for better mobile performance)
const formatPrice = (price: number) => `¥${price.toLocaleString()}`
const truncateText = (text: string, length: number) => 
  text.length > length ? text.substring(0, length) + '...' : text
const getMysteryLevel = (level: number) => {
  if (level >= 9) return { text: '超神秘', color: 'text-yellow-400', bg: 'from-yellow-400 to-orange-500' }
  if (level >= 7) return { text: '高神秘', color: 'text-purple-400', bg: 'from-purple-400 to-pink-500' }
  if (level >= 5) return { text: '中神秘', color: 'text-cyan-400', bg: 'from-cyan-400 to-blue-500' }
  return { text: '初級', color: 'text-green-400', bg: 'from-green-400 to-emerald-500' }
}

export const ProductCard = memo(function ProductCard({ 
  product, 
  index = 0, 
  variant = 'default',
  onAddToCart,
  showAddToCart = true,
  className = ''
}: ProductCardProps) {
  const { addItem } = useCartStore()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Product calculations
  const productImage = product.images?.[0] || '/placeholder-product.jpg'
  const mysteryLevel = getMysteryLevel(product.mysteryLevel)
  const discountPercentage = product.originalPrice && product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const isOutOfStock = product.stock <= 0
  const isLowStock = product.stock <= 5 && product.stock > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onAddToCart) {
      onAddToCart(product.id)
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        mysteryLevel: product.mysteryLevel,
        image: productImage,
      })
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  // Mobile-first responsive styles
  const getCardStyles = () => {
    const baseStyles = "relative overflow-hidden backdrop-blur-sm transition-all duration-300 group"
    
    switch (variant) {
      case 'mobile':
        return `${baseStyles} bg-gradient-to-br from-purple-900/30 to-black/50 border border-purple-400/50 rounded-xl p-3 hover:border-purple-400 hover:shadow-lg`
      case 'compact':
        return `${baseStyles} bg-gradient-to-br from-purple-900/20 to-black/40 border border-purple-500/50 rounded-2xl p-4 hover:border-pink-500 hover:shadow-xl`
      case 'featured':
        return `${baseStyles} bg-gradient-to-br from-yellow-900/20 to-purple-900/20 border-2 border-yellow-500/70 rounded-3xl p-6 shadow-2xl hover:border-yellow-400 hover:shadow-yellow-500/20`
      default:
        return `${baseStyles} bg-gradient-to-br from-purple-900/20 to-black/40 border-2 border-purple-500/70 rounded-3xl p-4 sm:p-6 hover:border-pink-500 hover:shadow-xl`
    }
  }

  const getImageHeight = () => {
    switch (variant) {
      case 'mobile': return 'h-32 sm:h-36'
      case 'compact': return 'h-36 sm:h-40'
      case 'featured': return 'h-48 sm:h-56'
      default: return 'h-40 sm:h-48'
    }
  }

  const getTitleSize = () => {
    switch (variant) {
      case 'mobile': return 'text-sm sm:text-base'
      case 'compact': return 'text-base sm:text-lg'
      case 'featured': return 'text-lg sm:text-xl md:text-2xl'
      default: return 'text-base sm:text-lg md:text-xl'
    }
  }

  const getPriceSize = () => {
    switch (variant) {
      case 'mobile': return 'text-lg sm:text-xl'
      case 'compact': return 'text-xl sm:text-2xl'
      case 'featured': return 'text-2xl sm:text-3xl md:text-4xl'
      default: return 'text-xl sm:text-2xl md:text-3xl'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className={`${getCardStyles()} ${className}`}
    >
      {/* Top badges */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
        {/* Mystery Level Badge */}
        <div className={`bg-gradient-to-r ${mysteryLevel.bg} text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg transform -rotate-3`}>
          ★{product.mysteryLevel}
        </div>
        
        {/* Stock/Discount Badge */}
        <div className="flex flex-col items-end gap-1">
          {discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              {discountPercentage}%OFF
            </div>
          )}
          {isLowStock && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              残り{product.stock}
            </div>
          )}
        </div>
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:text-red-400 transition-colors pointer-events-auto"
        aria-label="お気に入りに追加"
      >
        <Heart 
          size={16} 
          className={`${isFavorite ? 'fill-red-500 text-red-500' : ''} transition-colors`} 
        />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`relative w-full ${getImageHeight()} bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg mb-3 overflow-hidden`}>
          <img
            src={productImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-110`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse" />
          )}
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Eye className="text-white" size={24} />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2 sm:space-y-3">
        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className={`${getTitleSize()} font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2`}>
            {variant === 'mobile' ? truncateText(product.name, 25) : product.name}
          </h3>
        </Link>

        {/* Mystery Level Text */}
        <div className={`text-xs sm:text-sm ${mysteryLevel.color} font-medium`}>
          {mysteryLevel.text}レベル
        </div>

        {/* Description - Hidden on mobile compact */}
        {variant !== 'mobile' && (
          <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">
            {truncateText(product.description, variant === 'compact' ? 60 : 100)}
          </p>
        )}

        {/* Effects Pills - Responsive count */}
        {product.effects && product.effects.length > 0 && variant !== 'mobile' && (
          <div className="flex flex-wrap gap-1">
            {product.effects.slice(0, variant === 'featured' ? 4 : 2).map((effect, i) => (
              <span
                key={i}
                className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
              >
                {effect}
              </span>
            ))}
            {product.effects.length > (variant === 'featured' ? 4 : 2) && (
              <span className="text-xs text-gray-400">
                +{product.effects.length - (variant === 'featured' ? 4 : 2)}
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-400/50 rounded-lg p-2 sm:p-3">
          {product.originalPrice && product.originalPrice > 0 && (
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 line-through text-sm sm:text-base">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
          )}
          <div className={`${getPriceSize()} font-bold text-yellow-400`}>
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 min-h-[44px] flex items-center justify-center"
          >
            詳細を見る
          </Link>
          
          {showAddToCart && !isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`${product.name}をカートに追加`}
            >
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        {/* Out of Stock Message */}
        {isOutOfStock && (
          <div className="text-center text-red-400 font-bold text-sm bg-red-900/20 border border-red-500/30 rounded-lg py-2">
            在庫切れ - 異次元で補充中
          </div>
        )}
      </div>

      {/* Floating effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'