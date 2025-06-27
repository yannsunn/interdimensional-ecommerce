'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getComputedValues,
  } = useCartStore()

  const { totalItems, totalPrice } = getComputedValues()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-md border-l-2 border-purple-500 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="text-purple-400" />
                  異次元カート
                  {totalItems > 0 && (
                    <span className="bg-purple-500 text-white text-sm px-2 py-1 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </h2>
                <button
                  onClick={closeCart}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔮</div>
                    <p className="text-gray-400 mb-4">
                      カートは空です
                    </p>
                    <p className="text-sm text-gray-500">
                      異次元の商品をカートに追加してください
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.productId}
                        layout
                        className="bg-black/30 rounded-lg p-4 border border-purple-500/30"
                      >
                        <div className="flex items-start gap-3">
                          {/* Product Image Placeholder */}
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center text-2xl">
                            🔮
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <div className="text-xs text-purple-400 mb-2">
                              怪しさレベル ★×{item.mysteryLevel}
                            </div>
                            <div className="text-yellow-400 font-bold">
                              {formatPrice(item.price)}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => {
                              removeItem(item.productId).catch(console.error)
                            }}
                            className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1">
                            <button
                              onClick={() => {
                                updateQuantity(item.productId, item.quantity - 1).catch(console.error)
                              }}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/30 rounded transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center text-white font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                updateQuantity(item.productId, item.quantity + 1).catch(console.error)
                              }}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/30 rounded transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-white font-bold">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-purple-500/30 p-6 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span className="text-white">合計</span>
                    <span className="text-yellow-400">{formatPrice(totalPrice)}</span>
                  </div>

                  {/* Mystery Message */}
                  <div className="bg-purple-500/20 border border-purple-400 rounded-lg p-3 text-center">
                    <div className="text-purple-300 text-sm animate-pulse">
                      🌟 宇宙のエネルギーがあなたの選択を祝福しています！ 🌟
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">運命を購入する！</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>

                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="block w-full text-center py-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    他の商品も見る →
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}