/**
 * 🚀 ULTRA-ENHANCED CLIENT PRODUCT CARD
 * 
 * Progressive enhancement layer for interactive features:
 * - Smooth animations and transitions
 * - Real-time cart updates
 * - Advanced hover effects
 * - Performance-optimized interactions
 */

'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Product } from '@prisma/client'
import { useCartStore } from '../../store/cartStore'
import { formatPrice, getMysteryLevelText, getMysteryLevelColor } from '../../lib/utils'
import { cn } from '../../lib/design-system'
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  EyeIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'

// === Enhanced Interface ===

interface ClientEnhancedProductCardProps {
  product: Product
  priority?: boolean
  variant?: 'default' | 'compact' | 'featured'
  index?: number
  onQuickView?: (product: Product) => void
}

// === Animation Variants ===

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.6,
      type: "spring",
      stiffness: 100
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 400
    }
  }
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300
    }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
}

// === Main Component ===

export function ClientEnhancedProductCard({
  product,
  priority = false,
  variant = 'default',
  index = 0,
  onQuickView
}: ClientEnhancedProductCardProps) {
  // State
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Refs
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  
  // Store
  const { addItem } = useCartStore()

  // Product data
  const mysteryLevel = product.mysteryLevel
  const mysteryColor = getMysteryLevelColor(mysteryLevel)
  const mysteryText = getMysteryLevelText(mysteryLevel)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.price) * 100)
    : 0

  // Effects
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Handlers
  const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.stock === 0 || isAddingToCart) return
    
    setIsAddingToCart(true)
    
    try {
      await addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        mysteryLevel: product.mysteryLevel,
        image: product.images?.[0] || '',
      })

      // Success animation
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      })
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000)
    }
  }, [product, addItem, controls, isAddingToCart])

  const handleWishlistToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }, [isWishlisted])

  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }, [product, onQuickView])

  // Variant-specific classes
  const cardClasses = cn(
    "group relative bg-gradient-to-br backdrop-blur-sm border rounded-xl overflow-hidden",
    "cursor-pointer select-none",
    
    // Variant styles
    variant === 'compact' && 'aspect-square',
    variant === 'featured' && 'lg:aspect-[4/5]',
    variant === 'default' && 'aspect-[3/4]',
    
    // Mystery level styling with enhanced gradients
    mysteryLevel >= 8 && 'from-purple-900/40 to-pink-900/40 border-purple-400/40',
    mysteryLevel >= 6 && mysteryLevel < 8 && 'from-blue-900/40 to-purple-900/40 border-blue-400/40',
    mysteryLevel >= 4 && mysteryLevel < 6 && 'from-green-900/40 to-blue-900/40 border-green-400/40',
    mysteryLevel < 4 && 'from-gray-900/40 to-gray-800/40 border-gray-400/40'
  )

  return (
    <motion.article
      ref={cardRef}
      className={cardClasses}
      custom={index}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      itemScope 
      itemType="https://schema.org/Product"
    >
      {/* Main Link */}
      <Link 
        href={`/products/${product.slug}`}
        className="block w-full h-full"
        aria-label={`View details for ${product.name}`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Animated Mystery Level Badge */}
          <motion.div 
            className={cn(
              "absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full text-xs font-bold",
              "bg-black/60 backdrop-blur-md border shadow-lg",
              `text-${mysteryColor} border-${mysteryColor}/50`
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SparklesIcon className="w-3 h-3 inline mr-1" />
            {mysteryText}
          </motion.div>

          {/* Animated Discount Badge */}
          {hasDiscount && (
            <motion.div 
              className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              -{discountPercent}%
            </motion.div>
          )}

          {/* Product Image with Loading State */}
          <div className="relative w-full h-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-gray-600 animate-spin" />
              </div>
            )}
            
            <Image
              src={product.images?.[0] || '/images/placeholder-product.jpg'}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                "group-hover:scale-110",
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              sizes={
                variant === 'featured' ? '(max-width: 768px) 100vw, 50vw' :
                variant === 'compact' ? '(max-width: 768px) 50vw, 25vw' :
                '(max-width: 768px) 50vw, 33vw'
              }
              priority={priority}
              quality={priority ? 100 : 75}
              onLoad={() => setImageLoaded(true)}
              itemProp="image"
            />
          </div>

          {/* Interactive Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-4"
            variants={overlayVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          >
            {/* Quick Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                className={cn(
                  "p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30",
                  "text-white hover:bg-white/30 transition-colors"
                )}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                aria-label="Add to cart"
              >
                <ShoppingCartIcon className="w-5 h-5" />
              </motion.button>

              <motion.button
                className={cn(
                  "p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30",
                  "text-white hover:bg-white/30 transition-colors"
                )}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleWishlistToggle}
                aria-label="Add to wishlist"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-400" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </motion.button>

              {onQuickView && (
                <motion.button
                  className={cn(
                    "p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30",
                    "text-white hover:bg-white/30 transition-colors"
                  )}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleQuickView}
                  aria-label="Quick view"
                >
                  <EyeIcon className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Content */}
        <div className="p-4 space-y-3">
          {/* Product Name with Animation */}
          <motion.h3 
            className="font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2"
            whileHover={{ scale: 1.02 }}
            itemProp="name"
          >
            {product.name}
          </motion.h3>

          {/* Description - Featured variant only */}
          {variant === 'featured' && (
            <p className="text-sm text-gray-300 line-clamp-2" itemProp="description">
              {product.description}
            </p>
          )}

          {/* Enhanced Price Section */}
          <div className="space-y-1" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <div className="flex items-center gap-2">
              <motion.span 
                className="text-xl font-bold text-white"
                whileHover={{ scale: 1.05 }}
                itemProp="price"
                content={product.price.toString()}
              >
                {formatPrice(product.price)}
              </motion.span>
              
              {hasDiscount && (
                <motion.span 
                  className="text-sm text-gray-400 line-through"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {formatPrice(product.originalPrice!)}
                </motion.span>
              )}
            </div>
            
            <meta itemProp="priceCurrency" content="JPY" />
            <meta itemProp="availability" content={product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
          </div>

          {/* Enhanced Stock and Rating */}
          <div className="flex items-center justify-between text-sm">
            <motion.span 
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full",
                product.stock > 10 ? "text-green-400 bg-green-400/10" :
                product.stock > 0 ? "text-yellow-400 bg-yellow-400/10" : "text-red-400 bg-red-400/10"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-current"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {product.stock > 10 ? '在庫あり' :
               product.stock > 0 ? `残り${product.stock}個` : '在庫なし'}
            </motion.span>

            {/* Enhanced Rating - Placeholder for future implementation */}
            <motion.div 
              className="flex items-center gap-1 px-2 py-1 bg-yellow-400/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-gray-300 font-medium">4.8</span>
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Cart Addition Feedback */}
      {isAddingToCart && (
        <motion.div
          className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-green-500 text-white px-4 py-2 rounded-full font-medium"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ✓ カートに追加しました
          </motion.div>
        </motion.div>
      )}
    </motion.article>
  )
}

export default ClientEnhancedProductCard