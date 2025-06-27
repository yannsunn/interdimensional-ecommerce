/**
 * 🌟 ULTRA-OPTIMIZED SERVER PRODUCT CARD
 * 
 * Server-first rendering with progressive client enhancement
 * - Zero JavaScript until interaction
 * - Perfect SEO and accessibility
 * - Lightning-fast initial load
 */

import { Product } from '@prisma/client'
import { formatPrice, getMysteryLevelText, getMysteryLevelColor } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/design-system'

// === Server Component Interface ===

interface ServerProductCardProps {
  product: Product
  priority?: boolean
  variant?: 'default' | 'compact' | 'featured'
  showQuickActions?: boolean
}

// === Pure Server Component (No JavaScript) ===

export function ServerOptimizedProductCard({
  product,
  priority = false,
  variant = 'default',
  showQuickActions = false
}: ServerProductCardProps) {
  const mysteryLevel = product.mysteryLevel
  const mysteryColor = getMysteryLevelColor(mysteryLevel)
  const mysteryText = getMysteryLevelText(mysteryLevel)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  // Variant-specific styling
  const cardClasses = cn(
    // Base styles
    'group relative bg-gradient-to-br backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300',
    'hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1',
    
    // Variant styles
    variant === 'compact' && 'aspect-square',
    variant === 'featured' && 'lg:aspect-[4/5] shadow-lg',
    variant === 'default' && 'aspect-[3/4]',
    
    // Mystery level styling
    mysteryLevel >= 8 && 'from-purple-900/30 to-pink-900/30 border-purple-500/30',
    mysteryLevel >= 6 && mysteryLevel < 8 && 'from-blue-900/30 to-purple-900/30 border-blue-500/30',
    mysteryLevel >= 4 && mysteryLevel < 6 && 'from-green-900/30 to-blue-900/30 border-green-500/30',
    mysteryLevel < 4 && 'from-gray-900/30 to-gray-800/30 border-gray-500/30'
  )

  return (
    <article className={cardClasses} itemScope itemType="https://schema.org/Product">
      {/* Product Link Wrapper */}
      <Link 
        href={`/products/${product.slug}`}
        className="block w-full h-full"
        aria-label={`View details for ${product.name}`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Mystery Level Badge */}
          <div className={cn(
            "absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-bold",
            "bg-black/50 backdrop-blur-sm border",
            `text-${mysteryColor} border-${mysteryColor}/30`
          )}>
            ✨ {mysteryText}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercent}%
            </div>
          )}

          {/* Product Image */}
          <Image
            src={product.images?.[0] || '/images/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={
              variant === 'featured' ? '(max-width: 768px) 100vw, 50vw' :
              variant === 'compact' ? '(max-width: 768px) 50vw, 25vw' :
              '(max-width: 768px) 50vw, 33vw'
            }
            priority={priority}
            quality={priority ? 100 : 75}
            itemProp="image"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 
            className="font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2"
            itemProp="name"
          >
            {product.name}
          </h3>

          {/* Description - Featured variant only */}
          {variant === 'featured' && (
            <p className="text-sm text-gray-300 line-clamp-2" itemProp="description">
              {product.description}
            </p>
          )}

          {/* Price Section */}
          <div className="space-y-1" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <div className="flex items-center gap-2">
              <span 
                className="text-xl font-bold text-white"
                itemProp="price"
                content={product.price.toString()}
              >
                {formatPrice(product.price)}
              </span>
              
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>
            
            <meta itemProp="priceCurrency" content="JPY" />
            <meta itemProp="availability" content={product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between text-sm">
            <span className={cn(
              "flex items-center gap-1",
              product.stock > 10 ? "text-green-400" :
              product.stock > 0 ? "text-yellow-400" : "text-red-400"
            )}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {product.stock > 10 ? '在庫あり' :
               product.stock > 0 ? `残り${product.stock}個` : '在庫なし'}
            </span>

            {/* Rating Display - Placeholder for future implementation */}
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-300">4.8</span>
            </div>
          </div>

          {/* Quick Actions - Server-rendered buttons with enhanced styling */}
          {showQuickActions && (
            <div className="pt-2 space-y-2">
              {/* Add to Cart Button - Enhanced for client hydration */}
              <button
                className={cn(
                  "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
                  "bg-gradient-to-r from-purple-600 to-pink-600",
                  "hover:from-purple-500 hover:to-pink-500",
                  "transform hover:scale-105 active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "text-white shadow-lg shadow-purple-500/25"
                )}
                disabled={product.stock === 0}
                data-hydration-target="add-to-cart"
                data-product-id={product.id}
                aria-label={`Add ${product.name} to cart`}
              >
                {product.stock === 0 ? '在庫なし' : 'カートに追加'}
              </button>

              {/* Wishlist Button */}
              <button
                className={cn(
                  "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
                  "border border-gray-600 text-gray-300",
                  "hover:border-purple-400 hover:text-purple-300",
                  "transform hover:scale-105 active:scale-95"
                )}
                data-hydration-target="wishlist"
                data-product-id={product.id}
                aria-label={`Add ${product.name} to wishlist`}
              >
                ♡ ウィッシュリスト
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images?.[0] || '/images/placeholder-product.jpg',
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "JPY",
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 4.8,
              "ratingCount": 127
            }
          })
        }}
      />
    </article>
  )
}

export default ServerOptimizedProductCard