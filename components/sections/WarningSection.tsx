/**
 * ⚠️ WarningSection - 警告セクション
 */

import { cn } from '@/lib/design-system'
import { typography, animations, effects, layout } from '@/lib/design-system'

export function WarningSection() {
  return (
    <section className={cn('relative', layout.section.sm)}>
      <div className={cn(layout.container.md)}>
        <div className="relative group">
          {/* 背景グロー */}
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-r from-amber-600/10 to-yellow-600/10',
            'rounded-2xl',
            effects.blur.xl
          )} />
          
          {/* 警告コンテナ */}
          <div className={cn(
            'relative',
            effects.glass.dark,
            'bg-gradient-to-r from-yellow-900/30 via-amber-900/20 to-yellow-900/30',
            'border border-yellow-400/40',
            'rounded-2xl p-6 md:p-8',
            'text-center'
          )}>
            {/* 警告アイコン */}
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-400/20 p-3 rounded-full">
                <span className={cn('text-2xl', animations.pulse)}>⚠️</span>
              </div>
            </div>
            
            {/* 警告メッセージ */}
            <div className={cn(
              'text-yellow-200',
              typography.body.sm,
              'leading-relaxed max-w-4xl mx-auto'
            )}>
              異次元通販の商品は全て異次元の技術を使用しています。<br />
              現次元の物理法則に従わない場合がございます。効果には個人差があります。
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}