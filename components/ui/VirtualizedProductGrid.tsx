/**
 * ⚡ Virtualized Product Grid
 * High-performance rendering for large product lists
 */

'use client'

import { memo, useMemo, useCallback } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { Product } from '@prisma/client'
import { ProductCard } from '../shop/ProductCard'
import { cn } from '../../lib/design-system'

interface VirtualizedProductGridProps {
  products: Product[]
  itemsPerRow?: number
  itemHeight?: number
  itemWidth?: number
  gap?: number
  className?: string
  overscan?: number
  threshold?: number
}

interface CellRendererProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
  data: {
    products: Product[]
    itemsPerRow: number
    gap: number
  }
}

// メモ化されたセルレンダラー
const CellRenderer = memo<CellRendererProps>(({ 
  columnIndex, 
  rowIndex, 
  style, 
  data 
}) => {
  const { products, itemsPerRow, gap } = data
  const index = rowIndex * itemsPerRow + columnIndex
  const product = products[index]

  if (!product) {
    return null
  }

  return (
    <div 
      style={{
        ...style,
        padding: gap / 2,
      }}
    >
      <ProductCard 
        product={product} 
        variant="compact"
      />
    </div>
  )
})

CellRenderer.displayName = 'CellRenderer'

export const VirtualizedProductGrid = memo<VirtualizedProductGridProps>(({
  products,
  itemsPerRow = 4,
  itemHeight = 400,
  itemWidth = 300,
  gap = 16,
  className,
  overscan = 2,
  threshold = 50,
}) => {
  const [containerRef, { width: containerWidth, height: containerHeight }] = useResizeObserver()

  // レスポンシブなアイテム数の計算
  const responsiveItemsPerRow = useMemo(() => {
    if (!containerWidth) return itemsPerRow
    
    const availableWidth = containerWidth - gap
    const itemWidthWithGap = itemWidth + gap
    const calculatedItems = Math.floor(availableWidth / itemWidthWithGap)
    
    // 最小1個、最大指定された数
    return Math.max(1, Math.min(calculatedItems, itemsPerRow))
  }, [containerWidth, itemWidth, gap, itemsPerRow])

  // グリッドの寸法計算
  const gridMetrics = useMemo(() => {
    const rowCount = Math.ceil(products.length / responsiveItemsPerRow)
    const actualItemWidth = containerWidth 
      ? (containerWidth - gap * (responsiveItemsPerRow - 1)) / responsiveItemsPerRow
      : itemWidth

    return {
      rowCount,
      columnCount: responsiveItemsPerRow,
      itemWidth: actualItemWidth,
      itemHeight,
    }
  }, [products.length, responsiveItemsPerRow, containerWidth, gap, itemWidth, itemHeight])

  // グリッドデータのメモ化
  const itemData = useMemo(() => ({
    products,
    itemsPerRow: responsiveItemsPerRow,
    gap,
  }), [products, responsiveItemsPerRow, gap])

  // グリッド高さの計算
  const gridHeight = useMemo(() => {
    const maxHeight = containerHeight || 600
    const calculatedHeight = gridMetrics.rowCount * itemHeight
    return Math.min(calculatedHeight, maxHeight)
  }, [containerHeight, gridMetrics.rowCount, itemHeight])

  // パフォーマンス監視用のコールバック
  const onItemsRendered = useCallback((params: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 VirtualizedGrid rendered items:', params)
    }
  }, [])

  // 早期リターン：商品がない場合
  if (products.length === 0) {
    return (
      <div className={cn(
        'flex items-center justify-center h-64',
        'bg-gray-800/50 rounded-xl border border-gray-700',
        className
      )}>
        <p className="text-gray-400 text-lg">商品が見つかりません</p>
      </div>
    )
  }

  // 商品数が閾値以下の場合は通常のグリッドを使用
  if (products.length <= threshold) {
    return (
      <div 
        ref={containerRef}
        className={cn(
          'grid gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          className
        )}
      >
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            variant="compact"
          />
        ))}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {containerWidth && (
        <Grid
          columnCount={gridMetrics.columnCount}
          columnWidth={gridMetrics.itemWidth}
          height={gridHeight}
          rowCount={gridMetrics.rowCount}
          rowHeight={itemHeight}
          width={containerWidth}
          itemData={itemData}
          overscanRowCount={overscan}
          overscanColumnCount={overscan}
          onItemsRendered={onItemsRendered}
          className="scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800"
        >
          {CellRenderer}
        </Grid>
      )}
      
      {/* ローディング状態の表示 */}
      {!containerWidth && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
        </div>
      )}
    </div>
  )
})

VirtualizedProductGrid.displayName = 'VirtualizedProductGrid'

// パフォーマンス分析用のフック
export const useVirtualizationMetrics = (products: Product[], threshold: number = 50) => {
  return useMemo(() => {
    const shouldVirtualize = products.length > threshold
    const estimatedMemorySaving = shouldVirtualize 
      ? ((products.length - threshold) * 0.5) // KB per item approximation
      : 0
    
    return {
      shouldVirtualize,
      productCount: products.length,
      threshold,
      estimatedMemorySaving: `${estimatedMemorySaving.toFixed(1)}KB`,
      renderingStrategy: shouldVirtualize ? 'virtualized' : 'standard',
    }
  }, [products.length, threshold])
}