/**
 * 🌟 HeroSection - 異次元通販のヒーローセクション
 * 
 * メインビジュアルとCTAを含む最重要セクション
 * デザインシステムを活用し、パフォーマンスを最適化
 */

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/design-system'
import { gradients, typography, animations, effects, layout } from '@/lib/design-system'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen">      
      <div className={cn(layout.section.lg, 'relative min-h-screen flex items-center')}>
        <div className={layout.container.lg}>
          {/* レスポンシブグリッドレイアウト */}
          <div className={cn(layout.grid.cols2, 'gap-8 md:gap-12 lg:gap-20 items-center')}>
            
            {/* ヒーロー画像 - 最背面レイヤー */}
            <HeroImage />
            
            {/* ヒーローコンテンツ - 前面レイヤー */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1 relative z-50">
              {/* 半透明背景で可読性確保 */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl -z-10" />
              
              {/* メインタイトル */}
              <TitleSection />
              
              {/* プレミアムアラートバナー */}
              <AlertBanner />
              
              {/* 説明文 */}
              <DescriptionSection />
              
              {/* CTAボタン */}
              <CTAButtons />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * タイトルセクション
 */
function TitleSection() {
  return (
    <div className="space-y-4 md:space-y-6 relative">
      <div className="relative">
        <h1 className={cn(
          typography.h1,
          'text-transparent bg-clip-text bg-gradient-to-r',
          gradients.primary,
          'leading-tight tracking-tight'
        )}>
          異次元通販
        </h1>
        <div className={cn(
          'absolute inset-0',
          typography.h1,
          'text-white opacity-20 blur-sm leading-tight tracking-tight'
        )}>
          異次元通販
        </div>
      </div>
      
      <p className={cn(
        typography.body.lg,
        'bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent',
        'font-semibold leading-relaxed'
      )}>
        〜 宇宙と古代の叡智があなたの運命を変える！ 〜
      </p>
    </div>
  )
}

/**
 * アラートバナー
 */
function AlertBanner() {
  return (
    <div className="relative group">
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r',
        gradients.dragon,
        'rounded-2xl blur-lg opacity-75',
        'group-hover:opacity-100',
        animations.transition.all
      )} />
      <div className={cn(
        'relative bg-gradient-to-r',
        gradients.dragon,
        'text-white py-3 px-6 xs:py-4 xs:px-8 md:py-5 md:px-10',
        'rounded-xl md:rounded-2xl',
        'border border-yellow-400/50',
        effects.shadow['2xl'],
        'backdrop-blur-sm'
      )}>
        <div className={cn(typography.body.md, 'font-bold leading-tight text-center')}>
          <span className={animations.pulse}>⚡</span> 
          {' '}緊急放送中！！本日限り、特別価格でご提供！！{' '}
          <span className={animations.pulse}>⚡</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 説明セクション
 */
function DescriptionSection() {
  const badges = [
    { icon: '🐉', text: '龍神の加護', gradient: 'dragon' },
    { icon: '⚡', text: '宇宙エネルギー', gradient: 'quantum' },
    { icon: '🔮', text: '古代の叡智', gradient: 'mystic' },
  ] as const
  
  return (
    <div className="space-y-4 md:space-y-6">
      <p className={cn(
        typography.body.xl,
        'text-gray-100 leading-relaxed',
        'max-w-3xl mx-auto lg:mx-0 font-medium'
      )}>
        量子レベルで人生を変える商品を異次元からお届け。
      </p>
      
      <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
        {badges.map((badge) => (
          <span
            key={badge.text}
            className={cn(
              'inline-flex items-center px-4 py-2',
              `bg-gradient-to-r ${
                badge.gradient === 'dragon' ? 'from-yellow-400/20 to-orange-500/20 text-yellow-300 border-yellow-400/30' :
                badge.gradient === 'quantum' ? 'from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-400/30' :
                'from-pink-400/20 to-purple-500/20 text-pink-300 border-pink-400/30'
              }`,
              'font-bold text-sm md:text-base lg:text-lg',
              'rounded-full border backdrop-blur-sm'
            )}
          >
            {badge.icon} {badge.text}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * CTAボタン
 */
function CTAButtons() {
  return (
    <div className="flex flex-col xs:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-6">
      <Link
        href="#products"
        className={cn(
          'group relative overflow-hidden',
          'bg-gradient-to-r', gradients.cosmic,
          'hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800',
          'text-white px-8 py-4 xs:px-10 xs:py-5 md:px-12 md:py-6',
          'rounded-xl md:rounded-2xl font-bold',
          typography.body.md,
          animations.transition.slow,
          effects.shadow['2xl'],
          'transform', animations.hover.scale, animations.hover.lift
        )}
      >
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-r from-purple-400/20 to-cyan-400/20',
          'opacity-0 group-hover:opacity-100',
          animations.transition.slow
        )} />
        <span className="relative">🔮 運命の商品を見つける！ ✨</span>
      </Link>
      
      <Link
        href="/products"
        className={cn(
          'group relative overflow-hidden',
          'border-2 border-cyan-400/70',
          'bg-cyan-400/10 text-cyan-300',
          'hover:text-white hover:bg-cyan-400/80',
          'px-8 py-4 xs:px-10 xs:py-5 md:px-12 md:py-6',
          'rounded-xl md:rounded-2xl font-bold',
          typography.body.md,
          animations.transition.slow,
          effects.shadow['2xl'],
          'transform', animations.hover.scale, animations.hover.lift,
          'backdrop-blur-sm'
        )}
      >
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-r from-cyan-400/0 to-cyan-400/20',
          'opacity-0 group-hover:opacity-100',
          animations.transition.slow
        )} />
        <span className="relative">🌌 全商品を見る →</span>
      </Link>
    </div>
  )
}

/**
 * ヒーロー画像 - 最背面配置
 */
function HeroImage() {
  return (
    <div className="order-1 lg:order-2 w-full flex justify-center relative -z-10">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* 多層背景エフェクト - 最背面 */}
        <div className="absolute -inset-8 md:-inset-12 lg:-inset-16 -z-20">
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-r', gradients.glow,
            'rounded-full', effects.blur['3xl'],
            'opacity-20', animations.pulse
          )} />
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-br from-yellow-400/8 via-transparent to-blue-500/8',
            'rounded-full', effects.blur['2xl'],
            'opacity-15'
          )} />
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-tl from-green-400/3 via-transparent to-purple-400/3',
              'rounded-full', effects.blur.xl,
              'opacity-10', animations.pulse
            )}
            style={{ animationDelay: '1s' }}
          />
        </div>
        
        {/* プレミアム画像コンテナ - 最背面 */}
        <div className="relative aspect-square w-full group -z-10">
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-br from-white/1 to-white/3',
            'rounded-3xl backdrop-blur-sm',
            'border border-white/3',
            'shadow-lg'
          )} />
          <div className="relative w-full h-full rounded-3xl overflow-hidden opacity-70">
            <Image
              src="/images/hero-main.jpg"
              alt="異次元通販 - 宇宙の叡智"
              fill
              className={cn(
                'object-contain filter',
                'group-hover:opacity-40',
                animations.transition.ultra
              )}
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>
        
        {/* フローティングオーブ - 最背面 */}
        <FloatingOrb className="-top-4 -right-4 hidden lg:block -z-30" size="lg" color="from-yellow-400/10 to-orange-500/10" />
        <FloatingOrb className="-bottom-8 -left-8 hidden lg:block -z-30" size="md" color="from-cyan-400/10 to-blue-500/10" delay="2s" />
        <FloatingOrb className="top-1/2 -right-8 hidden lg:block -z-30" size="sm" color="from-pink-400/10 to-purple-500/10" delay="3s" />
      </div>
    </div>
  )
}

/**
 * フローティングオーブコンポーネント
 */
interface FloatingOrbProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color: string
  delay?: string
}

function FloatingOrb({ className, size = 'md', color, delay }: FloatingOrbProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }
  
  return (
    <div
      className={cn(
        'absolute',
        sizeClasses[size],
        'bg-gradient-to-br',
        color,
        'rounded-full',
        effects.blur.xl,
        animations.bounce,
        className
      )}
      style={{ animationDelay: delay }}
    />
  )
}