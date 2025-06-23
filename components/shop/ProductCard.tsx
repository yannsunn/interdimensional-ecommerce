'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatPrice, getMysteryLevelText, getMysteryLevelColor } from '@/lib/utils'
import { getSafeImageUrl, calculateDiscount, hasItems } from '@/lib/type-utils'
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

export function ProductCard({ 
  product, 
  index = 0, 
  variant = 'default',
  onAddToCart,
  showAddToCart = true 
}: ProductCardProps) {
  const { addItem } = useCartStore()
  
  // Type-safe image handling
  const productImage = getSafeImageUrl(product.images || [], '/placeholder-product.jpg')
  
  // Type-safe discount calculation
  const discountPercentage = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : 0

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-purple-900/20 to-black/40 border-2 border-purple-500 rounded-3xl p-6 backdrop-blur-sm hover:border-pink-500 transition-all duration-300 animate-float">
        {/* Mystery Level Badge */}
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold transform rotate-12 shadow-lg animate-shake">
          {getMysteryLevelText(product.mysteryLevel)}
        </div>

        {/* Stock Warning */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute -top-3 -left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            残り{product.stock}個!
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
          {product.name}
        </h3>

        {/* Mystery Level */}
        <div className={`text-sm mb-2 ${getMysteryLevelColor(product.mysteryLevel)}`}>
          {getMysteryLevelText(product.mysteryLevel)} ★×{product.mysteryLevel}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">
          {product.description}
        </p>

        {/* Effects */}
        {hasItems(product.effects) && (
          <div className="mb-4">
            <h4 className="text-yellow-400 text-sm font-semibold mb-2">期待される効果:</h4>
            <div className="flex flex-wrap gap-1">
              {product.effects.slice(0, 3).map((effect, i) => (
                <span
                  key={i}
                  className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                >
                  {effect}
                </span>
              ))}
              {product.effects.length > 3 && (
                <span className="text-xs text-gray-400">+{product.effects.length - 3}個</span>
              )}
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-dashed border-red-400 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-lg">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                {discountPercentage}%OFF
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-yellow-400 animate-price-glow">
            {formatPrice(product.price)}
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
              disabled={product.stock <= 0}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              aria-label={`${product.name}をカートに追加`}
            >
              <ShoppingCart size={20} />
            </button>
          )}
        </div>

        {product.stock <= 0 && (
          <div className="text-center text-red-400 font-bold">
            在庫切れ - 異次元で補充中
          </div>
        )}

        {/* Testimonial Preview */}
        {hasItems(product.testimonials) && (
          <div className="mt-4 text-xs text-gray-400 italic">
            "{product.testimonials[0].slice(0, 50)}..."
          </div>
        )}
      </div>
    </motion.div>
  )
}