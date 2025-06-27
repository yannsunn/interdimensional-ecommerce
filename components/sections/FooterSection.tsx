/**
 * 🌟 FooterSection - フッターセクション
 */

import Link from 'next/link'
import { cn } from '@/lib/design-system'
import { gradients, typography, animations, effects, layout } from '@/lib/design-system'

export function FooterSection() {
  return (
    <footer className={cn(
      'relative',
      'bg-gradient-to-b from-black/80 to-black/95',
      'border-t border-purple-500/30',
      'py-12 md:py-16',
      'backdrop-blur-sm'
    )}>
      {/* 背景エフェクト */}
      <BackgroundEffects />
      
      <div className={cn(layout.container.lg, 'relative')}>
        <div className="space-y-8">
          {/* ブランド */}
          <BrandSection />
          
          {/* ナビゲーション */}
          <NavigationLinks />
          
          {/* コピーライト */}
          <Copyright />
        </div>
      </div>
    </footer>
  )
}

/**
 * 背景エフェクト
 */
function BackgroundEffects() {
  return (
    <div className="absolute inset-0">
      <div className={cn(
        'absolute top-0 left-1/4 w-32 h-32',
        'bg-purple-500/5 rounded-full',
        effects.blur['3xl']
      )} />
      <div className={cn(
        'absolute bottom-0 right-1/4 w-32 h-32',
        'bg-cyan-500/5 rounded-full',
        effects.blur['3xl']
      )} />
    </div>
  )
}

/**
 * ブランドセクション
 */
function BrandSection() {
  return (
    <div className="relative text-center">
      <h3 className={cn(
        typography.h4,
        'font-black',
        'text-transparent bg-clip-text bg-gradient-to-r',
        gradients.primary,
        'mb-4'
      )}>
        異次元通販
      </h3>
      <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full" />
      
      <p className={cn(
        'text-gray-400',
        typography.body.md,
        'font-medium max-w-2xl mx-auto leading-relaxed mt-4'
      )}>
        宇宙と古代の叡智があなたの運命を変える
      </p>
    </div>
  )
}

/**
 * ナビゲーションリンク
 */
function NavigationLinks() {
  const links = [
    { href: '/terms', label: '利用規約' },
    { href: '/privacy', label: 'プライバシーポリシー' },
    { href: '/contact', label: 'お問い合わせ' },
  ]
  
  return (
    <div className={cn(
      'flex flex-wrap justify-center gap-8 md:gap-12',
      typography.body.sm
    )}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-gray-400 hover:text-purple-400',
            animations.transition.all,
            'font-medium'
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

/**
 * コピーライト
 */
function Copyright() {
  return (
    <div className="border-t border-gray-700/50 pt-8">
      <p className={cn(
        'text-gray-600',
        typography.body.sm,
        'leading-relaxed text-center'
      )}>
        © 2024 異次元通販. All rights reserved in all dimensions.<br />
        <span className="text-xs opacity-60">
          Powered by quantum technology and ancient wisdom.
        </span>
      </p>
    </div>
  )
}
// デフォルトエクスポートを追加
export default FooterSection
