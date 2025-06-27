/**
 * ⚖️ Terms of Service - 利用規約
 */

import { cn, gradients, typography, layout } from '@/lib/design-system'

export const metadata = {
  title: '利用規約 | 異次元通販',
  description: '異次元通販のサービス利用規約。異次元の技術による効果や注意事項について。',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-50" />
      
      <main className={cn(layout.section.lg, 'relative')}>
        <div className={cn(layout.container.md)}>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={cn(
              typography.h1,
              'text-transparent bg-clip-text bg-gradient-to-r',
              gradients.primary,
              'mb-6 leading-tight'
            )}>
              利用規約
            </h1>
            <p className={cn(
              typography.body.lg,
              'text-gray-300 max-w-2xl mx-auto leading-relaxed'
            )}>
              異次元通販サービスの利用に関する重要な規約です
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* 第1条 */}
            <section className={cn(
              'bg-gradient-to-br from-purple-900/20 to-black/40',
              'backdrop-blur-md border border-purple-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(typography.h4, 'text-purple-400 mb-4')}>
                第1条（適用）
              </h2>
              <p className={cn(typography.body.md, 'text-gray-200 leading-relaxed mb-4')}>
                本規約は、当社が提供する異次元通販サービス（以下「本サービス」）の利用に関して、
                当社と利用者との間の権利義務関係を定めるものです。
              </p>
              <p className={cn(typography.body.md, 'text-gray-200 leading-relaxed')}>
                本サービスは異次元の技術を使用しており、現次元の物理法則とは異なる効果が
                発生する場合があります。
              </p>
            </section>

            {/* 第2条 */}
            <section className={cn(
              'bg-gradient-to-br from-cyan-900/20 to-black/40',
              'backdrop-blur-md border border-cyan-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(typography.h4, 'text-cyan-400 mb-4')}>
                第2条（利用登録）
              </h2>
              <p className={cn(typography.body.md, 'text-gray-200 leading-relaxed mb-4')}>
                本サービスの利用を希望する者は、本規約に同意の上、当社の定める方法により
                利用登録を申請するものとします。
              </p>
              <div className={cn(typography.body.sm, 'text-gray-300 space-y-2')}>
                <p>利用登録には以下の条件があります：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>宇宙エネルギーに対する開放的な心を持っていること</li>
                  <li>古代の叡智を受け入れる準備ができていること</li>
                  <li>量子レベルでの変化を体験する意志があること</li>
                </ul>
              </div>
            </section>

            {/* 第3条 */}
            <section className={cn(
              'bg-gradient-to-br from-pink-900/20 to-black/40',
              'backdrop-blur-md border border-pink-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(typography.h4, 'text-pink-400 mb-4')}>
                第3条（商品の効果について）
              </h2>
              <p className={cn(typography.body.md, 'text-gray-200 leading-relaxed mb-4')}>
                当社の商品は異次元の技術を使用しており、以下の点にご注意ください：
              </p>
              <div className={cn(typography.body.sm, 'text-gray-300 space-y-3')}>
                <div>
                  <h3 className="font-semibold text-pink-300 mb-2">効果について</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>効果には個人差があります</li>
                    <li>現次元の物理法則に従わない場合があります</li>
                    <li>龍神の加護は保証されますが、発現方法は様々です</li>
                    <li>宇宙エネルギーの影響で予期しない変化が起こる可能性があります</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-pink-300 mb-2">使用上の注意</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>月光浴での浄化を定期的に行ってください</li>
                    <li>電子機器の近くでの使用は避けてください</li>
                    <li>直射日光を避けて保管してください</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 第4条 */}
            <section className={cn(
              'bg-gradient-to-br from-yellow-900/20 to-black/40',
              'backdrop-blur-md border border-yellow-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(typography.h4, 'text-yellow-400 mb-4')}>
                第4条（禁止事項）
              </h2>
              <p className={cn(typography.body.md, 'text-gray-200 leading-relaxed mb-4')}>
                利用者は、本サービスの利用において、以下の行為をしてはなりません：
              </p>
              <div className={cn(typography.body.sm, 'text-gray-300')}>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>悪意のある霊的エネルギーの送信</li>
                  <li>商品の異次元効果の悪用</li>
                  <li>龍神の名前を汚す行為</li>
                  <li>宇宙法則に反する使用方法</li>
                  <li>他の次元への無許可アクセス</li>
                </ul>
              </div>
            </section>

            {/* 第5条 */}
            <section className={cn(
              'bg-gradient-to-br from-green-900/20 to-black/40',
              'backdrop-blur-md border border-green-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(typography.h4, 'text-green-400 mb-4')}>
                第5条（免責事項）
              </h2>
              <p className={cn(typography.body.md, 'text-gray-200 leading-relaxed mb-4')}>
                当社は、本サービスに関して以下の事項について責任を負いません：
              </p>
              <div className={cn(typography.body.sm, 'text-gray-300')}>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>異次元への意図しない移動</li>
                  <li>時空連続体の歪みによる影響</li>
                  <li>パラレルワールドでの出来事</li>
                  <li>龍神との直接的なコンタクト</li>
                  <li>前世の記憶の蘇生</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center pt-8">
              <p className={cn(typography.body.md, 'text-gray-400')}>
                最終更新日：2024年6月27日<br />
                異次元通販運営チーム
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}