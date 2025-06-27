/**
 * 🌟 ULTRA HYBRID PRODUCT CARD SYSTEM
 * 
 * Revolutionary adaptive rendering:
 * - Server-first for SEO and performance
 * - Progressive client enhancement on interaction
 * - Intelligent hydration strategy
 * - Zero layout shift guaranteed
 */

import { Product } from '@prisma/client'
import { withProgressiveEnhancement } from '@/lib/component-patterns/server-client-boundary'
import { ServerOptimizedProductCard } from './ServerOptimizedProductCard'
import { ClientEnhancedProductCard } from './ClientEnhancedProductCard'

// === Hybrid Component Props ===

interface HybridProductCardProps {
  product: Product
  priority?: boolean | undefined
  variant?: 'default' | 'compact' | 'featured' | undefined
  index?: number | undefined
  onQuickView?: ((product: Product) => void) | undefined
  hydrationStrategy?: 'immediate' | 'on-hover' | 'on-visible' | 'on-idle' | undefined
  showQuickActions?: boolean | undefined
}

// === Progressive Enhancement Configuration ===

const enhancementConfig = {
  // Enhance on first interaction (hover, touch, focus)
  onInteraction: true,
  
  // Enhance when component becomes visible
  onVisible: false,
  
  // Enhance after main thread is idle
  onIdle: true,
  
  // Don't enhance immediately on timer
  onTimer: undefined
}

// === Base Hybrid Component ===

function BaseHybridProductCard({
  product,
  priority = false,
  variant = 'default',
  index = 0,
  onQuickView,
  hydrationStrategy = 'on-hover',
  showQuickActions = false
}: HybridProductCardProps) {
  // Use different enhancement strategies based on prop
  const enhancementTriggers = {
    immediate: { onTimer: 0 },
    'on-hover': { onInteraction: true },
    'on-visible': { onVisible: true },
    'on-idle': { onIdle: true }
  }[hydrationStrategy] || enhancementConfig

  // Create the progressive enhancement wrapper
  const EnhancedComponent = withProgressiveEnhancement(
    // Base server component
    (props: any) => (
      <ServerOptimizedProductCard
        {...props}
        showQuickActions={showQuickActions}
      />
    ),
    
    // Enhanced client component  
    (props: any) => (
      <ClientEnhancedProductCard
        {...props}
        onQuickView={onQuickView}
      />
    ),
    
    // Enhancement triggers
    enhancementTriggers
  )

  return (
    <EnhancedComponent
      product={product}
      priority={priority}
      variant={variant}
      index={index}
    />
  )
}

// === Smart Hydration Product Card ===

export function HybridProductCard({
  product,
  priority = false,
  variant = 'default',
  index = 0,
  onQuickView,
  hydrationStrategy = 'on-hover',
  showQuickActions = false
}: HybridProductCardProps) {
  // Determine optimal hydration strategy based on context
  const smartHydrationStrategy = (() => {
    // High priority items (above fold) get immediate enhancement
    if (priority && index < 4) {
      return 'immediate'
    }
    
    // Featured variants get enhanced on visibility
    if (variant === 'featured') {
      return 'on-visible'
    }
    
    // Compact variants are often in grids, enhance on hover
    if (variant === 'compact') {
      return 'on-hover'
    }
    
    // Default: enhance on interaction
    return hydrationStrategy
  })()

  return (
    <BaseHybridProductCard
      product={product}
      priority={priority}
      variant={variant}
      index={index}
      onQuickView={onQuickView}
      hydrationStrategy={smartHydrationStrategy}
      showQuickActions={showQuickActions}
    />
  )
}

// === Pre-configured Variants ===

/**
 * ⚡ Critical Product Card - Immediate hydration for above-fold content
 */
export function CriticalProductCard(props: Omit<HybridProductCardProps, 'hydrationStrategy'>) {
  return (
    <HybridProductCard
      {...props}
      hydrationStrategy="immediate"
      priority={true}
    />
  )
}

/**
 * 🎯 Interactive Product Card - Enhanced on hover for grid layouts
 */
export function InteractiveProductCard(props: Omit<HybridProductCardProps, 'hydrationStrategy'>) {
  return (
    <HybridProductCard
      {...props}
      hydrationStrategy="on-hover"
      showQuickActions={true}
    />
  )
}

/**
 * 👁️ Viewport Product Card - Enhanced when visible for performance
 */
export function ViewportProductCard(props: Omit<HybridProductCardProps, 'hydrationStrategy'>) {
  return (
    <HybridProductCard
      {...props}
      hydrationStrategy="on-visible"
    />
  )
}

/**
 * 💤 Lazy Product Card - Enhanced on idle for non-critical content
 */
export function LazyProductCard(props: Omit<HybridProductCardProps, 'hydrationStrategy'>) {
  return (
    <HybridProductCard
      {...props}
      hydrationStrategy="on-idle"
    />
  )
}

// === Product Grid with Smart Hydration ===

interface SmartProductGridProps {
  products: Product[]
  variant?: 'default' | 'compact' | 'featured' | undefined
  onQuickView?: ((product: Product) => void) | undefined
  className?: string | undefined
  itemsPerRow?: number | undefined
}

export function SmartProductGrid({
  products,
  variant = 'default',
  onQuickView,
  className = '',
  itemsPerRow = 4
}: SmartProductGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'
  }[itemsPerRow] || 'grid-cols-4'

  return (
    <div className={`grid ${gridClasses} gap-6 ${className}`}>
      {products.map((product, index) => {
        // Smart hydration strategy based on position
        let Component = HybridProductCard
        
        if (index < 2) {
          // First 2 items: Critical (immediate hydration)
          Component = CriticalProductCard
        } else if (index < 8) {
          // Next 6 items: Interactive (on hover)
          Component = InteractiveProductCard
        } else if (index < 16) {
          // Next 8 items: Viewport (on visible)
          Component = ViewportProductCard
        } else {
          // Remaining items: Lazy (on idle)
          Component = LazyProductCard
        }

        return (
          <Component
            key={product.id}
            product={product}
            variant={variant}
            index={index}
            onQuickView={onQuickView}
          />
        )
      })}
    </div>
  )
}

export default HybridProductCard