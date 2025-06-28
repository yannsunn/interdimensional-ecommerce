/**
 * 📞 FinalCTASection - 最終CTAセクション
 */

import { cn } from '../../lib/design-system'
import { gradients, typography, animations, effects, layout } from '../../lib/design-system'

export function FinalCTASection() {
  return (
    <section className={cn('relative', layout.section.base, 'text-center overflow-hidden')}>
      {/* 背景エフェクト */}
      <BackgroundEffects />
      
      <div className={cn(layout.container.md, 'relative')}>
        <div className="space-y-8 md:space-y-10">
          {/* ヘッドライン */}
          <Headline />
          
          {/* 電話番号 */}
          <PhoneNumber />
          
          {/* 営業時間 */}
          <BusinessHours />
          
          {/* ギフトオファー */}
          <GiftOffer />
        </div>
      </div>
    </section>
  )
}

/**
 * 背景エフェクト
 */
function BackgroundEffects() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
      <div className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-96 h-96',
        'bg-yellow-400/5 rounded-full',
        effects.blur['3xl'],
        animations.pulse
      )} />
    </div>
  )
}

/**
 * ヘッドライン
 */
function Headline() {
  return (
    <h2 className={cn(
      typography.h3,
      'font-black',
      'text-transparent bg-clip-text bg-gradient-to-r',
      gradients.secondary,
      'leading-tight'
    )}>
      今すぐお電話を！異次元のオペレーターが24時間待機中！
    </h2>
  )
}

/**
 * 電話番号
 */
function PhoneNumber() {
  return (
    <div className="relative inline-block group">
      {/* グローエフェクト */}
      <div className={cn(
        'absolute inset-0',
        'bg-gradient-to-r', gradients.dragon,
        'rounded-2xl', effects.blur.lg,
        'opacity-60 group-hover:opacity-100',
        animations.transition.all
      )} />
      
      {/* 電話番号コンテナ */}
      <div className={cn(
        'relative',
        'bg-gradient-to-r', gradients.dragon,
        'text-white',
        'px-8 py-6 md:px-12 md:py-8',
        'rounded-2xl',
        'font-black text-3xl md:text-4xl lg:text-5xl',
        effects.shadow['2xl']
      )}>
        📞 0120-XXX-XXXX
      </div>
    </div>
  )
}

/**
 * 営業時間
 */
function BusinessHours() {
  return (
    <p className={cn(
      typography.body.md,
      'text-gray-300 leading-relaxed'
    )}>
      受付時間：24時間365日<br />
      <span className="text-sm opacity-70">
        （※パラレルワールドでは営業時間が異なります）
      </span>
    </p>
  )
}

/**
 * ギフトオファー
 */
function GiftOffer() {
  return (
    <div className="relative inline-block group max-w-2xl mx-auto">
      {/* グローエフェクト */}
      <div className={cn(
        'absolute inset-0',
        'bg-gradient-to-r from-cyan-600/20 to-blue-600/20',
        'rounded-2xl', effects.blur.xl,
        'opacity-60 group-hover:opacity-100',
        animations.transition.all
      )} />
      
      {/* オファーコンテナ */}
      <div className={cn(
        'relative',
        effects.glass.dark,
        'bg-gradient-to-r from-cyan-900/40 to-blue-900/30',
        'border border-cyan-400/40',
        'rounded-2xl p-6 md:p-8'
      )}>
        {/* ギフトアイコン */}
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-400/20 p-2 rounded-full">
            <span className={cn('text-xl', animations.bounce)}>🎁</span>
          </div>
        </div>
        
        {/* オファーテキスト */}
        <p className={cn(
          'text-cyan-200',
          typography.body.md,
          'leading-relaxed'
        )}>
          ご注文の方全員に「フラワーオブライフ」ステッカープレゼント！<br />
          <span className="text-cyan-300 font-semibold">
            古代エジプトの叡智があなたの波動を上げる！
          </span>
        </p>
      </div>
    </div>
  )
}
// デフォルトエクスポートを追加
export default FinalCTASection
