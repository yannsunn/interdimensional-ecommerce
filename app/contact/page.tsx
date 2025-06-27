/**
 * 📞 Contact Page - お問い合わせ
 */

import { cn } from '../../lib/design-system'
import { primary } from '../../lib/design-system/gradients'
import { h1, h4, bodyLg, bodyMd, bodySm, bodyXs } from '../../lib/design-system/typography'
import { sectionLg, containerLg } from '../../lib/design-system/layout'

export const metadata = {
  title: 'お問い合わせ | 異次元通販',
  description: '異次元通販へのお問い合わせ。宇宙レベルのサポートで、あらゆる次元からのご質問にお答えします。',
}

export default function ContactPage() {
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
              お問い合わせ
            </h1>
            <p className={cn(
              bodyLg,
              'text-gray-300 max-w-3xl mx-auto leading-relaxed'
            )}>
              宇宙レベルのサポートで、あらゆる次元からのご質問にお答えします
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* 基本お問い合わせ */}
              <section className={cn(
                'bg-gradient-to-br from-purple-900/20 to-black/40',
                'backdrop-blur-md border border-purple-500/30',
                'rounded-3xl p-6 md:p-8'
              )}>
                <h2 className={cn(h4, 'text-purple-400 mb-6')}>
                  🌌 基本お問い合わせ
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-400 text-xl">📧</div>
                    <div>
                      <p className={cn(bodySm, 'text-gray-400')}>メール</p>
                      <p className={cn(bodyMd, 'text-white')}>info@異次元通販.jp</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-400 text-xl">📱</div>
                    <div>
                      <p className={cn(bodySm, 'text-gray-400')}>電話</p>
                      <p className={cn(bodyMd, 'text-white')}>0120-999-888</p>
                      <p className={cn(bodyXs, 'text-gray-500')}>平日 9:00-18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-400 text-xl">🏢</div>
                    <div>
                      <p className={cn(bodySm, 'text-gray-400')}>住所</p>
                      <p className={cn(bodyMd, 'text-white')}>
                        東京都渋谷区異次元1-2-3<br />
                        宇宙ビル 龍神フロア
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 特殊お問い合わせ */}
              <section className={cn(
                'bg-gradient-to-br from-cyan-900/20 to-black/40',
                'backdrop-blur-md border border-cyan-500/30',
                'rounded-3xl p-6 md:p-8'
              )}>
                <h2 className={cn(h4, 'text-cyan-400 mb-6')}>
                  🔮 異次元専用サポート
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-cyan-400 text-xl">🧠</div>
                    <div>
                      <p className={cn(bodySm, 'text-gray-400')}>テレパシー</p>
                      <p className={cn(bodyMd, 'text-white')}>波長 432.8Hz</p>
                      <p className={cn(bodyXs, 'text-gray-500')}>24時間受信</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-cyan-400 text-xl">🐉</div>
                    <div>
                      <p className={cn(bodySm, 'text-gray-400')}>龍神ホットライン</p>
                      <p className={cn(bodyMd, 'text-white')}>夢の中でお呼びください</p>
                      <p className={cn(bodyXs, 'text-gray-500')}>睡眠中のみ</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-cyan-400 text-xl">🌟</div>
                    <div>
                      <p className={cn(bodySm, 'text-gray-400')}>宇宙メール</p>
                      <p className={cn(bodyMd, 'text-white')}>cosmic@universe.galaxy</p>
                      <p className={cn(bodyXs, 'text-gray-500')}>光速配送</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 営業時間 */}
              <section className={cn(
                'bg-gradient-to-br from-pink-900/20 to-black/40',
                'backdrop-blur-md border border-pink-500/30',
                'rounded-3xl p-6 md:p-8'
              )}>
                <h2 className={cn(h4, 'text-pink-400 mb-6')}>
                  ⏰ サポート時間
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={cn(bodyMd, 'text-gray-300')}>一般サポート</span>
                    <span className={cn(bodyMd, 'text-white')}>平日 9:00-18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={cn(bodyMd, 'text-gray-300')}>緊急サポート</span>
                    <span className={cn(bodyMd, 'text-white')}>24時間365日</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={cn(bodyMd, 'text-gray-300')}>宇宙サポート</span>
                    <span className={cn(bodyMd, 'text-white')}>時空間問わず</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={cn(bodyMd, 'text-gray-300')}>龍神サポート</span>
                    <span className={cn(bodyMd, 'text-white')}>満月の夜</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Form */}
            <div className="space-y-8">
              {/* お問い合わせフォーム */}
              <section className={cn(
                'bg-gradient-to-br from-yellow-900/20 to-black/40',
                'backdrop-blur-md border border-yellow-500/30',
                'rounded-3xl p-6 md:p-8'
              )}>
                <h2 className={cn(h4, 'text-yellow-400 mb-6')}>
                  ✉️ お問い合わせフォーム
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className={cn(bodyMd, 'text-gray-300 block mb-2')}>
                      お名前 *
                    </label>
                    <input
                      type="text"
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-black/50 border border-gray-600',
                        'text-white placeholder-gray-400',
                        'focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20',
                        'transition-all duration-300'
                      )}
                      placeholder="山田太郎"
                    />
                  </div>
                  
                  <div>
                    <label className={cn(bodyMd, 'text-gray-300 block mb-2')}>
                      メールアドレス *
                    </label>
                    <input
                      type="email"
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-black/50 border border-gray-600',
                        'text-white placeholder-gray-400',
                        'focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20',
                        'transition-all duration-300'
                      )}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className={cn(bodyMd, 'text-gray-300 block mb-2')}>
                      お問い合わせ種別
                    </label>
                    <select className={cn(
                      'w-full px-4 py-3 rounded-xl',
                      'bg-black/50 border border-gray-600',
                      'text-white',
                      'focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20',
                      'transition-all duration-300'
                    )}>
                      <option value="">選択してください</option>
                      <option value="general">一般的なお問い合わせ</option>
                      <option value="product">商品について</option>
                      <option value="order">注文について</option>
                      <option value="cosmic">宇宙的な相談</option>
                      <option value="dragon">龍神関連</option>
                      <option value="dimension">異次元トラブル</option>
                    </select>
                  </div>

                  <div>
                    <label className={cn(bodyMd, 'text-gray-300 block mb-2')}>
                      お問い合わせ内容 *
                    </label>
                    <textarea
                      rows={6}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-black/50 border border-gray-600',
                        'text-white placeholder-gray-400',
                        'focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20',
                        'transition-all duration-300 resize-none'
                      )}
                      placeholder="お問い合わせ内容をご記入ください。宇宙の叡智に関するご質問もお気軽にどうぞ。"
                    />
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      'w-full py-4 px-6 rounded-xl',
                      'bg-gradient-to-r from-yellow-500 to-orange-500',
                      'text-white font-bold text-lg',
                      'hover:from-yellow-400 hover:to-orange-400',
                      'transform hover:scale-105 transition-all duration-300',
                      'shadow-lg hover:shadow-xl'
                    )}
                  >
                    🚀 送信する
                  </button>
                </form>
              </section>

              {/* FAQ */}
              <section className={cn(
                'bg-gradient-to-br from-green-900/20 to-black/40',
                'backdrop-blur-md border border-green-500/30',
                'rounded-3xl p-6 md:p-8'
              )}>
                <h2 className={cn(h4, 'text-green-400 mb-6')}>
                  ❓ よくあるご質問
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className={cn(bodyMd, 'text-green-300 font-semibold mb-2')}>
                      商品の効果はいつ現れますか？
                    </h3>
                    <p className={cn(bodySm, 'text-gray-300')}>
                      個人差がありますが、宇宙エネルギーが同調するまで3-7日程度です。
                    </p>
                  </div>
                  <div>
                    <h3 className={cn(bodyMd, 'text-green-300 font-semibold mb-2')}>
                      異次元への移動は安全ですか？
                    </h3>
                    <p className={cn(bodySm, 'text-gray-300')}>
                      龍神の加護により、安全性は保証されています。
                    </p>
                  </div>
                  <div>
                    <h3 className={cn(bodyMd, 'text-green-300 font-semibold mb-2')}>
                      返品・交換は可能ですか？
                    </h3>
                    <p className={cn(bodySm, 'text-gray-300')}>
                      量子レベルで変化した商品の返品は、時空の歪みを生じる可能性があります。
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}