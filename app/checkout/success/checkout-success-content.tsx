'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Portal } from '@/components/effects/Portal'
import { GlowingText } from '@/components/effects/GlowingText'
import { Header } from '@/components/layout/Header'
import { useCartStore } from '@/store/cartStore'
import { CheckCircle, Package, Zap, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CheckoutSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(1200)

  const sessionId = searchParams.get('session_id')
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (sessionId && orderId) {
      // カートをクリア
      clearCart()
      
      // 注文情報を取得
      fetchOrderDetails()
    }
  }, [sessionId, orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const orderData = await response.json()
        setOrder(orderData)
      }
    } catch (error) {
      console.error('注文情報の取得に失敗:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const celebrations = [
    "🎉", "✨", "🌟", "💫", "🔮", "🌙", "⭐", "💎"
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      <Portal />
      
      {/* Celebration Elements */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {celebrations.map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            initial={{
              x: Math.random() * windowWidth,
              y: windowWidth + 100,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              y: -100,
              rotate: 360,
              scale: [0, 1, 0.8, 1.2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      
      <Header />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={64} className="text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlowingText className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              🎉 注文完了！ 🎉
            </GlowingText>
            
            <div className="text-2xl text-green-400 font-bold mb-4">
              異次元への扉が正常に開かれました！
            </div>
            
            <p className="text-xl text-gray-300 mb-8">
              ご注文ありがとうございます。宇宙のエネルギーがあなたの元へ向かっています。
            </p>
          </motion.div>

          {/* Order Details */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-3xl p-8 border-2 border-green-500 mb-8"
            >
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center justify-center gap-2">
                <Package />
                ご注文詳細
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">注文番号</h3>
                  <p className="text-green-300 font-mono">{orderId}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">決済方法</h3>
                  <p className="text-gray-300">クレジットカード (Stripe)</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-3xl p-8 border border-blue-500 mb-8"
          >
            <h2 className="text-2xl font-bold text-blue-400 mb-6">📧 今後の流れ</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h3 className="font-semibold text-white">確認メール送信</h3>
                  <p className="text-gray-300 text-sm">ご注文確認メールを送信いたします（数分以内）</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h3 className="font-semibold text-white">異次元加工処理</h3>
                  <p className="text-gray-300 text-sm">龍神の加護を商品に込める特別な処理を行います（1-2営業日）</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h3 className="font-semibold text-white">宇宙便で発送</h3>
                  <p className="text-gray-300 text-sm">特別な保護エネルギーで包装し発送します（2-5営業日でお届け）</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mystical Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400 rounded-lg p-6 mb-8"
          >
            <div className="text-yellow-400 text-lg font-bold mb-2 animate-pulse">
              🔮 龍神からのメッセージ 🔮
            </div>
            <p className="text-yellow-300">
              「あなたの選択は正しい。宇宙のエネルギーがあなたの人生を量子レベルで変化させるであろう。
              星々がその到着を祝福している。」
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => router.push('/orders')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Package />
              注文履歴を見る
            </button>
            
            <button
              onClick={() => router.push('/products')}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Zap />
              他の商品も見る
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Home />
              ホームに戻る
            </button>
          </motion.div>

          {/* Social Sharing (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-12 pt-8 border-t border-purple-500/30"
          >
            <p className="text-gray-400 text-sm mb-4">
              異次元体験をシェアしませんか？
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Twitter
              </button>
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors">
                Facebook
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                LINE
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}