'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { NewProduct } from '../../data/newProducts'
import Link from 'next/link'

interface HorizontalProductSliderProps {
  title: string
  products: NewProduct[]
  category?: string
}

const HorizontalProductSlider = memo(function HorizontalProductSlider({ title, products, category }: HorizontalProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(280) // 商品カード幅 + マージン
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setIsAtStart(scrollLeft <= 0)
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 10)
    }
  }

  const scrollTo = useCallback((direction: 'prev' | 'next') => {
    if (!scrollContainerRef.current) return

    const visibleItems = Math.floor(scrollContainerRef.current.clientWidth / itemWidth)

    if (direction === 'prev') {
      const newIndex = Math.max(0, currentIndex - visibleItems)
      setCurrentIndex(newIndex)
      scrollContainerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      })
    } else {
      const maxIndex = Math.max(0, products.length - visibleItems)
      const newIndex = Math.min(maxIndex, currentIndex + visibleItems)
      setCurrentIndex(newIndex)
      scrollContainerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      })
    }
  }, [currentIndex, itemWidth])

  // レスポンシブなitemWidth計算
  useEffect(() => {
    const updateItemWidth = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) { // モバイル
        setItemWidth(220) // 小さめ
      } else if (screenWidth < 768) { // タブレット小
        setItemWidth(250)
      } else if (screenWidth < 1024) { // タブレット大
        setItemWidth(280)
      } else { // デスクトップ
        setItemWidth(300)
      }
    }

    updateItemWidth()
    window.addEventListener('resize', updateItemWidth)
    return () => window.removeEventListener('resize', updateItemWidth)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollState)
      updateScrollState() // 初期状態を設定
      
      return () => container.removeEventListener('scroll', updateScrollState)
    }
    return undefined
  }, [])

  // タッチイベントハンドラー
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    const touch = e.targetTouches[0]
    if (touch) {
      setTouchStart(touch.clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    if (touch) {
      setTouchEnd(touch.clientX)
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      scrollTo('next')
    } else if (isRightSwipe) {
      scrollTo('prev')
    }
  }

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`
  
  const getMysteryLevelText = (level: number) => {
    if (level >= 10) return { text: '神レベル', color: 'text-yellow-400' }
    if (level >= 9) return { text: '超神秘', color: 'text-yellow-400' }
    if (level >= 8) return { text: '高神秘', color: 'text-purple-400' }
    if (level >= 7) return { text: '中神秘', color: 'text-cyan-400' }
    return { text: '初級', color: 'text-green-400' }
  }

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Sparkles className="text-yellow-400 animate-pulse" size={24} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              {title}
            </h2>
            <Sparkles className="text-yellow-400 animate-pulse" size={24} />
          </motion.div>
          {category && (
            <p className="text-lg text-gray-300 mb-4">
              カテゴリー: <span className="text-yellow-400 font-semibold">{category}</span>
            </p>
          )}
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        {/* スライダーコントロール */}
        <div className="relative">
          {/* 左矢印 */}
          <button
            onClick={() => scrollTo('prev')}
            disabled={isAtStart}
            className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAtStart 
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' 
                : 'bg-purple-600/80 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* 右矢印 */}
          <button
            onClick={() => scrollTo('next')}
            disabled={isAtEnd}
            className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAtEnd 
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' 
                : 'bg-purple-600/80 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* 商品スライダー */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-8 sm:px-12 md:px-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {products.map((product, index) => {
              const mysteryLevel = getMysteryLevelText(product.mysteryLevel)
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-none w-52 sm:w-56 md:w-64 lg:w-72 bg-gradient-to-br from-gray-900/80 via-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden group hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{ minWidth: itemWidth }}
                >
                  <Link href={`/products/${product.slug}`}>
                    {/* 商品画像 */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden">
                      {/* プレースホルダー画像 */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                        <div className="text-center">
                          <Sparkles className="mx-auto mb-2 text-yellow-400" size={32} />
                          <span className="text-white text-sm font-medium">{product.name}</span>
                        </div>
                      </div>
                      
                      {/* バッジ */}
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                        <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold ${mysteryLevel.color}`}>
                          ★{product.mysteryLevel}
                        </div>
                        {product.isLimited && (
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            限定{product.limitedQuantity}
                          </div>
                        )}
                      </div>

                      {product.featured && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            おすすめ
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 商品情報 */}
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* 神秘レベル */}
                      <div className="mb-3">
                        <span className={`text-sm font-semibold ${mysteryLevel.color}`}>
                          {mysteryLevel.text}
                        </span>
                      </div>

                      {/* 価格 */}
                      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-400/50 rounded-lg p-3">
                        {product.originalPrice && (
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-400 line-through text-sm">
                              {formatPrice(product.originalPrice)}
                            </span>
                          </div>
                        )}
                        <div className="text-xl font-bold text-yellow-400">
                          {formatPrice(product.price)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          在庫: {product.stock}個
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* カテゴリー全体を見るボタン */}
        <div className="text-center mt-8">
          <Link
            href={`/products?category=${encodeURIComponent(category || '')}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            {category ? `${category}の商品をすべて見る` : 'すべての商品を見る'}
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
})

export { HorizontalProductSlider }