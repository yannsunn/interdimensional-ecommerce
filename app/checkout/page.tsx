'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Portal } from '@/components/effects/Portal'
import { GlowingText } from '@/components/effects/GlowingText'
import { Header } from '@/components/layout/Header'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { CreditCard, Lock, Zap } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = getTotalPrice()
  const tax = Math.floor(subtotal * 0.1)
  const shipping = subtotal >= 10000 ? 0 : 500
  const total = subtotal + tax + shipping

  const handleCheckout = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    if (items.length === 0) {
      router.push('/cart')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '決済処理でエラーが発生しました')
      }

      // Stripeのチェックアウトページにリダイレクト
      window.location.href = data.url

    } catch (error) {
      console.error('Checkout error:', error)
      setError(error instanceof Error ? error.message : '予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <GlowingText className="text-3xl font-bold mb-4">
            ログインが必要です
          </GlowingText>
          <button
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            ログインページへ
          </button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <GlowingText className="text-3xl font-bold mb-4">
            カートが空です
          </GlowingText>
          <button
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            商品を見る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      <Portal />
      
      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <GlowingText className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              🌟 異次元チェックアウト 🌟
            </GlowingText>
            <p className="text-xl text-gray-300">
              運命の瞬間が訪れました
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-500">
              <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <CreditCard />
                ご注文内容
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center text-2xl">
                      🔮
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white line-clamp-2">{item.name}</h3>
                      <p className="text-purple-400 text-sm">怪しさレベル ★×{item.mysteryLevel}</p>
                      <p className="text-gray-400 text-sm">数量: {item.quantity}</p>
                    </div>
                    <div className="text-yellow-400 font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-purple-500/30 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>小計</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>消費税 (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>送料</span>
                  <span>{shipping === 0 ? '無料' : formatPrice(shipping)}</span>
                </div>
                {subtotal >= 10000 && (
                  <div className="text-green-400 text-sm">
                    ✨ 1万円以上で送料無料！
                  </div>
                )}
                <div className="border-t border-purple-500/30 pt-2 flex justify-between text-xl font-bold text-yellow-400">
                  <span>合計</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-gradient-to-br from-pink-900/30 to-black/50 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-500">
              <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
                <Lock />
                お支払い方法
              </h2>

              {/* Security Info */}
              <div className="bg-green-500/20 border border-green-400 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-300 font-semibold mb-2">
                  <Lock size={20} />
                  セキュリティ保護
                </div>
                <p className="text-green-200 text-sm">
                  すべての決済情報は256bit SSL暗号化により保護されています。
                  異次元の力でさらに強固に守られています。
                </p>
              </div>

              {/* Stripe Info */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="text-blue-400" />
                  <span className="text-white font-semibold">Stripe決済</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  世界最高水準のセキュリティを誇るStripeで安全にお支払いください。
                  VISA、MasterCard、JCB、American Express対応。
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mb-6">
                  <p className="text-red-300">{error}</p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    異次元への扉を開いています...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap />
                      {formatPrice(total)} で運命を変える！
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </>
                )}
              </button>

              {/* Terms */}
              <p className="text-gray-400 text-xs mt-4 text-center">
                お支払いボタンをクリックすることで、
                <a href="/terms" className="text-purple-400 hover:underline">利用規約</a>
                と
                <a href="/privacy" className="text-purple-400 hover:underline">プライバシーポリシー</a>
                に同意したものとみなします。
              </p>
            </div>
          </div>

          {/* Mystery Message */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400 rounded-lg p-4">
              <p className="text-yellow-400 animate-pulse">
                🔮 龍神があなたの決断を見守っています 🔮
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}