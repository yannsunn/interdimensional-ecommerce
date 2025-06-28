'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from '../shop/ProductCard'
import { Filter, Grid, List } from 'lucide-react'

interface Product {
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
  category?: string
}

interface MobileProductGridProps {
  products: Product[]
  title?: string
  showFilters?: boolean
  defaultViewMode?: 'grid' | 'list'
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'mystery-high' | 'mystery-low'
type FilterCategory = 'all' | string

export function MobileProductGrid({ 
  products, 
  title = "商品一覧",
  showFilters = true,
  defaultViewMode = 'grid'
}: MobileProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultViewMode)
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all')
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    return ['all', ...cats]
  }, [products])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'mystery-high':
          return b.mysteryLevel - a.mysteryLevel
        case 'mystery-low':
          return a.mysteryLevel - b.mysteryLevel
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, filterCategory, sortBy])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400">
            {filteredAndSortedProducts.length}件の商品
          </p>
        </div>
        
        {showFilters && (
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List size={16} />
              </button>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`p-2 rounded-lg ${
                showFilterPanel 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Filter size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-900/50 backdrop-blur-sm rounded-lg mx-4 border border-purple-500/30"
          >
            <div className="p-4 space-y-4">
              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  並び順
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="name">名前順</option>
                  <option value="price-low">価格の安い順</option>
                  <option value="price-high">価格の高い順</option>
                  <option value="mystery-high">神秘レベル高い順</option>
                  <option value="mystery-low">神秘レベル低い順</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  カテゴリー
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filterCategory === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category === 'all' ? '全て' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <div className="px-4">
        <motion.div
          layout
          className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2' 
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  variant={viewMode === 'grid' ? 'mobile' : 'compact'}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              商品が見つかりません
            </h3>
            <p className="text-gray-500">
              フィルターを変更して再度お試しください
            </p>
          </motion.div>
        )}
      </div>

      {/* Load More Button (for future implementation) */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="text-center py-8">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
            さらに読み込む
          </button>
        </div>
      )}
    </div>
  )
}