/**
 * 🌟 HeroSection - 異次元通販のヒーローセクション
 * 
 * メインビジュアルとCTAを含む最重要セクション
 * 画像を上部、テキストを下部に配置
 */

import Image from 'next/image'
import Link from 'next/link'

// Simple cn utility for this component
const cn = (...classes: (string | undefined | null | false)[]) => 
  classes.filter(Boolean).join(' ')

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Image Section - Top */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-blue-500/5" />
        </div>
        
        {/* Main Hero Image */}
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-main.jpg"
            alt="異次元通販 - 宇宙の叡智"
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          
          {/* Gradient Overlay at bottom for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-bounce" />
        <div className="absolute bottom-16 left-8 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
      </div>

      {/* Text Content Section - Bottom */}
      <div className="relative bg-black">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
            {/* Title Section */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 leading-tight">
                異次元通販
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-semibold">
                〜 宇宙と古代の叡智があなたの運命を変える！ 〜
              </p>
            </div>

            {/* Alert Banner */}
            <div className="relative mx-auto max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 px-6 sm:py-5 sm:px-8 rounded-xl md:rounded-2xl font-bold shadow-2xl">
                <div className="text-base sm:text-lg md:text-xl flex items-center justify-center gap-2">
                  <span className="animate-pulse text-2xl">⚡</span>
                  <span>緊急放送中！！本日限り、特別価格でご提供！！</span>
                  <span className="animate-pulse text-2xl">⚡</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 md:space-y-8">
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-medium leading-relaxed">
                量子レベルで人生を変える商品を異次元からお届け。
              </p>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Badge icon="🐉" text="龍神の加護" gradient="from-yellow-400/20 to-orange-500/20" borderColor="border-yellow-400/30" textColor="text-yellow-300" />
                <Badge icon="⚡" text="宇宙エネルギー" gradient="from-cyan-400/20 to-blue-500/20" borderColor="border-cyan-400/30" textColor="text-cyan-300" />
                <Badge icon="🔮" text="古代の叡智" gradient="from-pink-400/20 to-purple-500/20" borderColor="border-pink-400/30" textColor="text-pink-300" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
              <Link
                href="#products"
                className={cn(
                  'group relative overflow-hidden',
                  'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700',
                  'hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800',
                  'text-white px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6',
                  'rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-xl',
                  'transition-all duration-300 shadow-2xl',
                  'transform hover:scale-105 hover:-translate-y-1'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <span className="text-2xl">🔮</span>
                  <span>運命の商品を見つける！</span>
                  <span className="text-2xl">✨</span>
                </span>
              </Link>
              
              <Link
                href="/products"
                className={cn(
                  'group relative overflow-hidden',
                  'border-2 border-cyan-400',
                  'bg-cyan-400/10 text-cyan-300',
                  'hover:bg-cyan-400/20 hover:text-white hover:border-cyan-300',
                  'px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6',
                  'rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-xl',
                  'transition-all duration-300 shadow-xl',
                  'transform hover:scale-105 hover:-translate-y-1',
                  'backdrop-blur-sm'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <span className="text-2xl">🌌</span>
                  <span>全商品を見る</span>
                  <span>→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
    </section>
  )
}

/**
 * Badge Component
 */
interface BadgeProps {
  icon: string
  text: string
  gradient: string
  borderColor: string
  textColor: string
}

function Badge({ icon, text, gradient, borderColor, textColor }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5',
        `bg-gradient-to-r ${gradient}`,
        'font-bold text-sm sm:text-base md:text-lg',
        `rounded-full border ${borderColor} ${textColor}`,
        'backdrop-blur-sm shadow-lg',
        'transform hover:scale-105 transition-all duration-300'
      )}
    >
      <span className="text-xl sm:text-2xl">{icon}</span>
      <span>{text}</span>
    </span>
  )
}