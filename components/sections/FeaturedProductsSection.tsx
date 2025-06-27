/**
 * 🌟 FeaturedProductsSection - 特集商品セクション
 */

import Link from 'next/link'
import { ProductCard } from '@/components/shop/ProductCard'
import { cn } from '@/lib/design-system'
import { gradients, typography, animations, effects, layout } from '@/lib/design-system'
import type { Product } from '@prisma/client'

interface FeaturedProductsSectionProps {
  products?: Product[]
}

export function FeaturedProductsSection({ products = [] }: FeaturedProductsSectionProps) {
  return (
    <section id="products" className={cn('relative', layout.section.base)}>
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      </div>
      
      <div className={cn(layout.container.lg, 'relative')}>
        {/* セクションヘッダー */}
        <SectionHeader />
        
        {/* 商品グリッド */}
        <ProductGrid products={products} />
        
        {/* CTA */}
        <ViewAllProductsCTA />
      </div>
    </section>
  )
}

/**
 * セクションヘッダー
 */
function SectionHeader() {
  return (
    <div className="text-center mb-16 md:mb-20 relative">
      {/* 背景グロー */}
      <div className={cn(
        'absolute -top-8 left-1/2 -translate-x-1/2',
        'w-32 h-32',
        'bg-gradient-to-r from-purple-500/10 to-cyan-500/10',
        'rounded-full', effects.blur['3xl']
      )} />
      
      <div className="relative">
        <h2 className={cn(
          typography.h2,
          'text-transparent bg-clip-text bg-gradient-to-r',
          gradients.primary,
          'mb-6 leading-tight'
        )}>
          🌟 異次元の力を秘めた特選商品 🌟
        </h2>
        <div className={cn(
          'absolute inset-0',
          typography.h2,
          'text-white opacity-10 blur-sm leading-tight'
        )}>
          🌟 異次元の力を秘めた特選商品 🌟
        </div>
      </div>
      
      <p className={cn(
        typography.body.lg,
        'bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent',
        'font-medium max-w-3xl mx-auto leading-relaxed'
      )}>
        龍神も認めた！宇宙からのメッセージを受け取った商品たち
      </p>
      
      {/* 装飾的な星 */}
      <DecorationStars />
    </div>
  )
}

/**
 * 装飾的な星
 */
function DecorationStars() {
  return (
    <>
      <div className={cn(
        'absolute -top-4 left-1/4 text-yellow-400',
        animations.bounce
      )}>
        ⭐
      </div>
      <div
        className={cn(
          'absolute -top-2 right-1/4 text-cyan-400',
          animations.bounce
        )}
        style={{ animationDelay: '1s' }}
      >
        ✨
      </div>
      <div
        className={cn(
          'absolute -bottom-2 left-1/3 text-purple-400',
          animations.bounce
        )}
        style={{ animationDelay: '2s' }}
      >
        🌟
      </div>
    </>
  )
}

/**
 * 商品グリッド
 */
function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <EmptyState />
  }
  
  return (
    <div className={cn(layout.grid.cols3, layout.gap.lg, 'mb-16')}>
      {products.map((product, index) => (
        <div
          key={product.id}
          className={cn(
            'transform',
            animations.hover.scale,
            animations.transition.slow
          )}
        >
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  )
}

/**
 * 空の状態
 */
function EmptyState() {
  return (
    <div className="col-span-full text-center py-16">
      <div className="relative">
        <div className="text-6xl md:text-8xl opacity-20 mb-4">🔮</div>
        <h3 className={cn(
          typography.h4,
          'text-white mb-4'
        )}>
          神秘的な商品を準備中...
        </h3>
        <p className={cn(
          typography.body.md,
          'text-gray-300'
        )}>
          宇宙からの特別な商品が間もなく到着します
        </p>
      </div>
    </div>
  )
}

/**
 * 全商品を見るCTA
 */
function ViewAllProductsCTA() {
  return (
    <div className="text-center">
      <div className="relative inline-block group">
        {/* グローエフェクト */}
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-r', gradients.quantum,
          'rounded-full', effects.blur.lg,
          'opacity-70 group-hover:opacity-100',
          animations.transition.all
        )} />
        
        <Link
          href="/products"
          className={cn(
            'relative',
            effects.glass.colored,
            'bg-gradient-to-r from-cyan-500/20 to-blue-500/20',
            'border-2 border-cyan-400/50',
            'text-cyan-300 hover:text-white',
            'px-10 py-5 md:px-12 md:py-6',
            'rounded-full font-bold',
            typography.body.md,
            'transform',
            animations.hover.scale,
            animations.hover.lift,
            animations.transition.slow,
            effects.shadow['2xl'],
            'backdrop-blur-sm',
            'will-change-transform'
          )}
        >
          <span className="relative flex items-center justify-center gap-3">
            <span>もっと異次元商品を見る</span>
            <span className={cn('text-2xl', animations.bounce)}>🚀</span>
          </span>
        </Link>
      </div>
    </div>
  )
}

// デフォルトエクスポートを追加
export default FeaturedProductsSection