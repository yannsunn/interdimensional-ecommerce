/**
 * 🌟 About Page - 異次元通販について
 */

import { cn } from '../../lib/design-system'
import { primary } from '../../lib/design-system/gradients'
import { h1, h3, h5, bodyLg, bodyMd, bodySm } from '../../lib/design-system/typography'
import { sectionLg, containerLg } from '../../lib/design-system/layout'

export const metadata = {
  title: '異次元通販について | 宇宙と古代の叡智',
  description: '異次元通販の歴史、ミッション、そして宇宙からのメッセージをお届けする使命について',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-50" />
      
      <main className={cn(sectionLg, 'relative')}>
        <div className={cn(containerLg)}>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={cn(
              h1,
              'text-transparent bg-clip-text bg-gradient-to-r',
              primary,
              'mb-6 leading-tight'
            )}>
              異次元通販について
            </h1>
            <p className={cn(
              bodyLg,
              'text-gray-300 max-w-3xl mx-auto leading-relaxed'
            )}>
              宇宙と古代の叡智を現代にお届けする、革新的なECプラットフォーム
            </p>
          </div>

          {/* Content Grid */}
          <div className="space-y-16">
            {/* Mission */}
            <section className="relative">
              <div className={cn(
                'bg-gradient-to-br from-purple-900/20 to-black/40',
                'backdrop-blur-md border border-purple-500/30',
                'rounded-3xl p-8 md:p-12'
              )}>
                <h2 className={cn(
                  h3,
                  'text-purple-400 mb-6'
                )}>
                  🌌 私たちのミッション
                </h2>
                <p className={cn(
                  bodyLg,
                  'text-gray-200 leading-relaxed mb-6'
                )}>
                  異次元通販は、宇宙の叡智と古代の秘術を現代のライフスタイルに融合させる、
                  革新的なプラットフォームです。量子レベルから人生を変革する商品を、
                  厳選してお届けしています。
                </p>
                <p className={cn(
                  bodyMd,
                  'text-gray-300 leading-relaxed'
                )}>
                  私たちは単なる商品販売を超え、お客様の人生に真の価値と変化をもたらすことを
                  使命としています。
                </p>
              </div>
            </section>

            {/* History */}
            <section className="relative">
              <div className={cn(
                'bg-gradient-to-br from-cyan-900/20 to-black/40',
                'backdrop-blur-md border border-cyan-500/30',
                'rounded-3xl p-8 md:p-12'
              )}>
                <h2 className={cn(
                  h3,
                  'text-cyan-400 mb-6'
                )}>
                  📜 私たちの歴史
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={cn(h5, 'text-cyan-300 mb-3')}>
                      2020年 - 創立
                    </h3>
                    <p className={cn(bodyMd, 'text-gray-300 leading-relaxed')}>
                      宇宙からのメッセージを受信した創設者により設立。
                      異次元の技術と古代の叡智の融合を開始。
                    </p>
                  </div>
                  <div>
                    <h3 className={cn(h5, 'text-cyan-300 mb-3')}>
                      2021年 - 量子技術導入
                    </h3>
                    <p className={cn(bodyMd, 'text-gray-300 leading-relaxed')}>
                      最先端の量子物理学技術を商品開発に応用。
                      DNAレベルでの効果実証を開始。
                    </p>
                  </div>
                  <div>
                    <h3 className={cn(h5, 'text-cyan-300 mb-3')}>
                      2024年 - グローバル展開
                    </h3>
                    <p className={cn(bodyMd, 'text-gray-300 leading-relaxed')}>
                      全世界へのサービス拡大。龍神認定プログラムを開始し、
                      宇宙との共鳴を深める。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Values */}
            <section className="relative">
              <div className={cn(
                'bg-gradient-to-br from-pink-900/20 to-black/40',
                'backdrop-blur-md border border-pink-500/30',
                'rounded-3xl p-8 md:p-12'
              )}>
                <h2 className={cn(
                  h3,
                  'text-pink-400 mb-8'
                )}>
                  💎 私たちの価値観
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔮</div>
                    <h3 className={cn(h5, 'text-pink-300 mb-3')}>
                      神秘性
                    </h3>
                    <p className={cn(bodySm, 'text-gray-300')}>
                      古代から受け継がれる<br />
                      神秘的な力を重視
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className={cn(h5, 'text-pink-300 mb-3')}>
                      革新性
                    </h3>
                    <p className={cn(bodySm, 'text-gray-300')}>
                      最先端技術と<br />
                      伝統の融合
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌟</div>
                    <h3 className={cn(h5, 'text-pink-300 mb-3')}>
                      変革性
                    </h3>
                    <p className={cn(bodySm, 'text-gray-300')}>
                      人生を根本から<br />
                      変える力
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}