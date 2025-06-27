'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { productUtils, uiUtils } from '@/lib/utils'
import { getSafeImageUrl, hasItems } from '@/lib/type-utils'
import { useCartStore } from '@/store/cartStore'
import { ProductWithRelations } from '@/types'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: ProductWithRelations
  index?: number
  variant?: 'default' | 'compact' | 'featured'
  onAddToCart?: (productId: string) => void
  showAddToCart?: boolean
}

export const ProductCard = memo(function ProductCard({ 
  product, 
  index = 0, 
  variant = 'default',
  onAddToCart,
  showAddToCart = true 
}: ProductCardProps) {
  const { addItem } = useCartStore()
  
  // 統合ユーティリティを使用
  const productImage = getSafeImageUrl(product.images || [], '/placeholder-product.jpg')
  const mysteryLevel = productUtils.getMysteryLevel(product.mysteryLevel)
  const discountPercentage = product.originalPrice 
    ? productUtils.calculateDiscount(product.originalPrice, product.price)
    : 0
  const isOutOfStock = !productUtils.isInStock(product.stock)
  const isLowStock = product.stock <= 5 && product.stock > 0

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id)
    } else {
      addItem({
        productId: product.id as string,
        name: product.name,
        price: product.price,
        mysteryLevel: product.mysteryLevel,
        image: productImage,
      })
    }
  }

  // バリアント別のスタイリング
  const cardStyles = {
    default: 'bg-gradient-to-br from-purple-900/20 to-black/40 border-2 border-purple-500 rounded-3xl p-6',
    compact: 'bg-gradient-to-br from-purple-900/30 to-black/50 border border-purple-400 rounded-2xl p-4',
    featured: 'bg-gradient-to-br from-yellow-900/20 to-purple-900/20 border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className={uiUtils.cn(
        cardStyles[variant],
        'backdrop-blur-sm hover:border-pink-500 transition-all duration-300 animate-float'
      )}>
        {/* Mystery Level Badge */}
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold transform rotate-12 shadow-lg animate-shake">
          {mysteryLevel.text}
        </div>

        {/* Stock Warning */}
        {isLowStock && (
          <div className="absolute -top-3 -left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            残り{product.stock}個!
          </div>
        )}

        {/* Product Image */}
        <div className={uiUtils.cn(
          "w-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl mb-4 flex items-center justify-center overflow-hidden",
          variant === 'compact' ? 'h-32' : variant === 'featured' ? 'h-56' : 'h-48'
        )}>
          <img
            src={uiUtils.getOptimizedImageUrl(productImage, variant === 'featured' ? 1200 : 800)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Product Title */}
        <h3 className={uiUtils.cn(
          "font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300",
          variant === 'featured' ? 'text-2xl' : variant === 'compact' ? 'text-lg' : 'text-xl'
        )}>
          {uiUtils.truncateText(product.name, variant === 'compact' ? 30 : 50)}
        </h3>

        {/* Mystery Level */}
        <div className={uiUtils.cn("text-sm mb-2", mysteryLevel.color)}>
          {mysteryLevel.text} ★×{product.mysteryLevel}
        </div>

        {/* Description - compact版では非表示 */}
        {variant !== 'compact' && (
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {uiUtils.truncateText(product.description, 120)}
          </p>
        )}

        {/* Effects */}
        {hasItems(product.effects) && variant !== 'compact' && (
          <div className="mb-4">
            <h4 className="text-yellow-400 text-sm font-semibold mb-2">期待される効果:</h4>
            <div className="flex flex-wrap gap-1">
              {product.effects.slice(0, variant === 'featured' ? 5 : 3).map((effect, i) => (
                <span
                  key={i}
                  className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                >
                  {effect}
                </span>
              ))}
              {product.effects.length > (variant === 'featured' ? 5 : 3) && (
                <span className="text-xs text-gray-400">
                  +{product.effects.length - (variant === 'featured' ? 5 : 3)}個
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-dashed border-red-400 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-lg">
                {productUtils.formatPrice(product.originalPrice)}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                {discountPercentage}%OFF
              </span>
            )}
          </div>
          <div className={uiUtils.cn(
            "font-bold text-yellow-400 animate-price-glow",
            variant === 'featured' ? 'text-4xl' : variant === 'compact' ? 'text-2xl' : 'text-3xl'
          )}>
            {productUtils.formatPrice(product.price)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">詳細を見る</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
          
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={uiUtils.cn(
                "px-4 py-3 rounded-2xl font-bold transform transition-all duration-300",
                isOutOfStock 
                  ? "opacity-50 cursor-not-allowed bg-gray-600" 
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105"
              )}
              aria-label={`${product.name}をカートに追加`}
            >
              <ShoppingCart size={20} />
            </button>
          )}
        </div>

        {isOutOfStock && (
          <div className="text-center text-red-400 font-bold">
            在庫切れ - 異次元で補充中
          </div>
        )}

        {/* Testimonial Preview - featured版のみ */}
        {hasItems(product.testimonials) && variant === 'featured' && (
          <div className="mt-4 text-xs text-gray-400 italic">
            "{uiUtils.truncateText(product.testimonials?.[0] || '', 80)}..."
          </div>
        )}
      </div>
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'