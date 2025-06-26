'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Portal } from '@/components/ultra-dimensional/Portal'
import { OptimizedFloatingElements } from '@/components/ultra-dimensional/OptimizedFloatingElements'
import { GlowingText, GlitchText } from '@/components/ultra-dimensional/GlowingText'
import { Header } from '@/components/layout/Header'
import { ProductCard } from '@/components/shop/ProductCard'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, getMysteryLevelText, getMysteryLevelColor, generateMysteryMessage } from '@/lib/utils'
import { Product } from '@prisma/client'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw,
  Zap,
  Eye,
  ArrowLeft,
  Plus,
  Minus,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        mysteryLevel: product.mysteryLevel,
        image: product.images[0],
      })
    }

    setTimeout(() => setIsAddingToCart(false), 1000)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      <Portal />
      <OptimizedFloatingElements />
      
      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
              ホーム
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/products" className="text-purple-400 hover:text-purple-300 transition-colors">
              商品一覧
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">{product.name}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl flex items-center justify-center text-8xl border-2 border-purple-500 relative overflow-hidden"
            >
              {/* Mystery Level Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold text-sm z-10">
                {getMysteryLevelText(product.mysteryLevel)}
              </div>
              
              {/* Stock Badge */}
              {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse z-10">
                  残り{product.stock}個!
                </div>
              )}
              
              🔮
              
              {/* Mystical Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent animate-pulse" />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center text-3xl border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-purple-400 scale-105' 
                      : 'border-purple-500/30 hover:border-purple-400/50'
                  }`}
                >
                  🔮
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlitchText className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.name}
              </GlitchText>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-lg ${getMysteryLevelColor(product.mysteryLevel)} flex items-center gap-1`}>
                  {Array.from({ length: product.mysteryLevel }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <span className="ml-2">{getMysteryLevelText(product.mysteryLevel)}</span>
                </div>
                
                <div className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
            </motion.div>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-dashed border-red-400 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-xl">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-lg font-bold animate-pulse">
                    {discountPercentage}%OFF
                  </span>
                )}
              </div>
              <div className="text-4xl font-bold text-yellow-400 animate-price-glow mb-2">
                {formatPrice(product.price)}
              </div>
              <div className="text-sm text-gray-300">
                税込価格 • 送料別途（1万円以上で送料無料）
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-900/30 to-black/50 rounded-xl p-6 border border-purple-500/30"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-3">商品説明</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {product.description}
              </p>
              
              {product.story && (
                <div className="border-t border-purple-500/30 pt-4">
                  <h4 className="text-lg font-semibold text-pink-400 mb-2">神秘の物語</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {product.story}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Effects */}
            {product.effects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/30"
              >
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Zap />
                  期待される効果
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {product.effects.map((effect, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-black/30 rounded-lg p-3"
                    >
                      <Star className="text-yellow-400" size={16} fill="currentColor" />
                      <span className="text-green-300">{effect}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials */}
            {product.testimonials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/30"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-4">体験者の声</h3>
                <div className="space-y-4">
                  {product.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-black/30 rounded-lg p-4 border-l-4 border-blue-400"
                    >
                      <p className="text-gray-300 italic">"{testimonial}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Warnings */}
            {product.warnings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <AlertTriangle />
                  重要な注意事項
                </h3>
                <ul className="space-y-2">
                  {product.warnings.map((warning, index) => (
                    <li key={index} className="text-yellow-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">⚠️</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Add to Cart Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-pink-500"
            >
              {product.stock > 0 ? (
                <>
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-white font-semibold">数量:</span>
                    <div className="flex items-center gap-2 bg-black/50 rounded-lg p-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center text-white font-bold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-gray-400 text-sm">
                      在庫: {product.stock}個
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    {isAddingToCart ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        異次元カートに追加中...
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <ShoppingCart />
                          {formatPrice(product.price * quantity)} でカートに追加
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">😢</div>
                  <div className="text-2xl font-bold text-red-400 mb-2">売切れ</div>
                  <div className="text-gray-400">
                    現在異次元で補充作業中です。龍神のご機嫌次第で入荷予定です。
                  </div>
                </div>
              )}
            </motion.div>

            {/* Service Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid md:grid-cols-3 gap-4"
            >
              <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-500/30">
                <Shield className="mx-auto mb-2 text-green-400" size={24} />
                <div className="text-sm font-semibold text-white">龍神保証</div>
                <div className="text-xs text-gray-400">効果保証付き</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-500/30">
                <Truck className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-sm font-semibold text-white">宇宙便配送</div>
                <div className="text-xs text-gray-400">2-5営業日</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-500/30">
                <RotateCcw className="mx-auto mb-2 text-yellow-400" size={24} />
                <div className="text-sm font-semibold text-white">異次元返品</div>
                <div className="text-xs text-gray-400">30日以内</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mystery Message */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400 rounded-lg p-6">
            <p className="text-yellow-400 text-lg font-bold animate-pulse">
              {generateMysteryMessage()}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <GlowingText className="text-3xl font-bold text-center mb-8 text-purple-400">
              🌟 同じ波動を持つ商品 🌟
            </GlowingText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  index={index} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}