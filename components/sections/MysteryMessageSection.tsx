/**
 * 🔮 MysteryMessageSection - 神秘的なメッセージセクション
 */

import { generateMysteryMessage } from '../../lib/utils'
import { cn } from '../../lib/design-system'
import { typography, animations, effects, layout } from '../../lib/design-system'

export function MysteryMessageSection() {
  return (
    <section className={cn('relative', layout.section.sm)}>
      <div className={cn(layout.container.md)}>
        <div className="relative group">
          {/* グローエフェクト */}
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-r from-yellow-600/20 to-amber-500/20',
            'rounded-2xl', effects.blur.xl,
            'opacity-60 group-hover:opacity-80',
            animations.transition.all
          )} />
          
          {/* メッセージコンテナ */}
          <div className={cn(
            'relative',
            effects.glass.dark,
            'bg-gradient-to-r from-yellow-900/40 via-amber-900/30 to-yellow-900/40',
            'border-2 border-yellow-400/50',
            'rounded-2xl p-6 md:p-8',
            'text-center',
            effects.shadow['2xl']
          )}>
            {/* パルス効果 */}
            <div className={cn(
              'absolute top-4 left-4 w-8 h-8',
              'bg-yellow-400/20 rounded-full',
              animations.ping
            )} />
            <div
              className={cn(
                'absolute top-4 right-4 w-6 h-6',
                'bg-amber-400/20 rounded-full',
                animations.ping
              )}
              style={{ animationDelay: '1s' }}
            />
            
            {/* メッセージ */}
            <div className={cn(
              'text-yellow-200',
              typography.body.lg,
              'font-semibold leading-relaxed'
            )}>
              ✨ {generateMysteryMessage()} ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// デフォルトエクスポートを追加
export default MysteryMessageSection