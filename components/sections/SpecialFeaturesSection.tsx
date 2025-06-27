/**
 * 🔮 SpecialFeaturesSection - 特別機能セクション
 */

import { cn } from '@/lib/design-system'
import { gradients, typography, animations, effects, layout } from '@/lib/design-system'

const features = [
  {
    icon: '⚡',
    title: '量子レベルの効果',
    description: 'DNAレベルから人生を書き換える\n革命的な商品をお届け',
    gradient: 'cosmic',
    animation: 'glow',
  },
  {
    icon: '🐉',
    title: '龍神の加護',
    description: '古代より伝わる龍神の力で\nあなたを邪気から守護',
    gradient: 'dragon',
    animation: 'float',
  },
  {
    icon: '🌌',
    title: '宇宙エネルギー',
    description: '宇宙の無限エネルギーを\nあなたの日常にお届け',
    gradient: 'quantum',
    animation: 'glow',
  },
] as const

export function SpecialFeaturesSection() {
  return (
    <section className={cn('relative', layout.section.base, 'overflow-hidden')}>
      {/* 背景エフェクト */}
      <BackgroundEffects />
      
      <div className={cn(layout.container.lg, 'relative')}>
        {/* セクションヘッダー */}
        <SectionHeader />
        
        {/* 機能グリッド */}
        <FeaturesGrid />
        
        {/* 信頼指標 */}
        <TrustIndicators />
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
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-cyan-900/30" />
      <div className={cn(
        'absolute top-0 left-1/4 w-96 h-96',
        'bg-purple-500/10 rounded-full',
        effects.blur['3xl'],
        animations.pulse
      )} />
      <div
        className={cn(
          'absolute bottom-0 right-1/4 w-96 h-96',
          'bg-cyan-500/10 rounded-full',
          effects.blur['3xl'],
          animations.pulse
        )}
        style={{ animationDelay: '2s' }}
      />
    </div>
  )
}

/**
 * セクションヘッダー
 */
function SectionHeader() {
  return (
    <div className="text-center mb-16 md:mb-20">
      <h2 className={cn(
        typography.h2,
        'text-transparent bg-clip-text bg-gradient-to-r',
        gradients.primary,
        'mb-6 leading-tight'
      )}>
        🔮 異次元通販が選ばれる理由 🔮
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full" />
    </div>
  )
}

/**
 * 機能グリッド
 */
function FeaturesGrid() {
  return (
    <div className={cn(layout.grid.cols3, layout.gap.lg)}>
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </div>
  )
}

/**
 * 機能カード
 */
interface FeatureCardProps {
  feature: typeof features[number]
}

function FeatureCard({ feature }: FeatureCardProps) {
  const gradientColors = {
    cosmic: 'from-purple-600/20 to-indigo-600/20',
    dragon: 'from-pink-600/20 to-red-600/20',
    quantum: 'from-cyan-600/20 to-blue-600/20',
  }
  
  const borderColors = {
    cosmic: 'border-purple-400/30',
    dragon: 'border-pink-400/30',
    quantum: 'border-cyan-400/30',
  }
  
  const textColors = {
    cosmic: 'text-purple-200',
    dragon: 'text-pink-200',
    quantum: 'text-cyan-200',
  }
  
  const animationClass = feature.animation === 'glow' ? animations.glow : animations.float
  
  return (
    <div className="group relative">
      {/* グローエフェクト */}
      <div className={cn(
        'absolute inset-0',
        'bg-gradient-to-br',
        gradientColors[feature.gradient],
        'rounded-3xl',
        effects.blur.xl,
        'opacity-60 group-hover:opacity-100',
        animations.transition.slow
      )} />
      
      {/* カード本体 */}
      <div className={cn(
        'relative',
        effects.glass.dark,
        'bg-gradient-to-br',
        gradientColors[feature.gradient].replace('/20', '/40'),
        'p-8 md:p-10 rounded-3xl',
        'border',
        borderColors[feature.gradient],
        'text-center',
        'transform group-hover:scale-105',
        animations.transition.slow,
        'will-change-transform'
      )}>
        {/* アイコン */}
        <div className={cn('text-6xl md:text-7xl mb-6', animationClass)}>
          {feature.icon}
        </div>
        
        {/* タイトル */}
        <h3 className={cn(
          typography.h5,
          'font-bold mb-4 leading-tight',
          textColors[feature.gradient]
        )}>
          {feature.title}
        </h3>
        
        {/* 説明 */}
        <p className={cn(
          'text-gray-200',
          typography.body.sm,
          'leading-relaxed whitespace-pre-line'
        )}>
          {feature.description}
        </p>
        
        {/* パルスインジケーター */}
        <div
          className={cn(
            'absolute top-4 right-4 w-4 h-4',
            `bg-${feature.gradient === 'cosmic' ? 'purple' : feature.gradient === 'dragon' ? 'pink' : 'cyan'}-400/40`,
            'rounded-full',
            animations.ping
          )}
          style={{ animationDelay: `${feature.gradient === 'dragon' ? '1s' : feature.gradient === 'quantum' ? '2s' : '0s'}` }}
        />
      </div>
    </div>
  )
}

/**
 * 信頼指標
 */
function TrustIndicators() {
  const indicators = [
    { icon: '⭐', text: '宇宙認定', color: 'text-yellow-400' },
    { icon: '🔮', text: '神秘保証', color: 'text-purple-400' },
    { icon: '✨', text: '効果実証済み', color: 'text-cyan-400' },
  ]
  
  return (
    <div className="mt-16 md:mt-20 text-center">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
        {indicators.map((indicator) => (
          <div
            key={indicator.text}
            className={cn(
              'flex items-center gap-2',
              indicator.color
            )}
          >
            <span className="text-2xl">{indicator.icon}</span>
            <span className="font-semibold">{indicator.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}