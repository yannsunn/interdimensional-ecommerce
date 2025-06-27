/**
 * 🔒 Privacy Policy - プライバシーポリシー
 */

import { cn } from '@/lib/design-system'
import { primary } from '@/lib/design-system/gradients'
import { h1, h4, bodyLg, bodyMd, bodySm } from '@/lib/design-system/typography'
import { sectionLg, containerMd } from '@/lib/design-system/layout'

export const metadata = {
  title: 'プライバシーポリシー | 異次元通販',
  description: '異次元通販における個人情報の取り扱いと宇宙レベルでのプライバシー保護について',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-50" />
      
      <main className={cn(sectionLg, 'relative')}>
        <div className={cn(containerMd)}>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={cn(
              h1,
              'text-transparent bg-clip-text bg-gradient-to-r',
              primary,
              'mb-6 leading-tight'
            )}>
              プライバシーポリシー
            </h1>
            <p className={cn(
              bodyLg,
              'text-gray-300 max-w-2xl mx-auto leading-relaxed'
            )}>
              異次元通販における個人情報の取り扱いと宇宙レベルでのプライバシー保護について
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* 基本方針 */}
            <section className={cn(
              'bg-gradient-to-br from-purple-900/20 to-black/40',
              'backdrop-blur-md border border-purple-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(h4, 'text-purple-400 mb-4')}>
                🌌 基本方針
              </h2>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed mb-4')}>
                異次元通販（以下「当社」）は、お客様の個人情報を宇宙の法則に従って
                厳重に管理し、以下の方針に基づいて取り扱います。
              </p>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed')}>
                当社は、量子暗号化技術と古代の封印術を組み合わせた
                最高レベルのプライバシー保護を提供します。
              </p>
            </section>

            {/* 個人情報の収集 */}
            <section className={cn(
              'bg-gradient-to-br from-cyan-900/20 to-black/40',
              'backdrop-blur-md border border-cyan-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(h4, 'text-cyan-400 mb-4')}>
                📊 個人情報の収集
              </h2>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed mb-4')}>
                当社では、以下の情報を収集させていただく場合があります：
              </p>
              <div className={cn(bodySm, 'text-gray-300 space-y-3')}>
                <div>
                  <h3 className="font-semibold text-cyan-300 mb-2">基本情報</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>お名前、住所、電話番号、メールアドレス</li>
                    <li>生年月日、性別</li>
                    <li>お支払い情報</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-300 mb-2">異次元固有情報</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>オーラの波長パターン</li>
                    <li>前世からの因縁データ</li>
                    <li>守護霊との相性指数</li>
                    <li>チャクラの開放状況</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 利用目的 */}
            <section className={cn(
              'bg-gradient-to-br from-pink-900/20 to-black/40',
              'backdrop-blur-md border border-pink-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(h4, 'text-pink-400 mb-4')}>
                🎯 利用目的
              </h2>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed mb-4')}>
                収集した個人情報は、以下の目的で利用いたします：
              </p>
              <div className={cn(bodySm, 'text-gray-300')}>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>商品の販売、配送、アフターサービス</li>
                  <li>お客様専用の宇宙エネルギー調整</li>
                  <li>龍神認定プログラムの適用</li>
                  <li>前世診断と来世プランニング</li>
                  <li>異次元ポータルの個人設定</li>
                  <li>宇宙からのメッセージ配信</li>
                </ul>
              </div>
            </section>

            {/* 第三者提供 */}
            <section className={cn(
              'bg-gradient-to-br from-yellow-900/20 to-black/40',
              'backdrop-blur-md border border-yellow-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(h4, 'text-yellow-400 mb-4')}>
                🔐 第三者への提供
              </h2>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed mb-4')}>
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません：
              </p>
              <div className={cn(bodySm, 'text-gray-300')}>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>お客様の事前の同意がある場合</li>
                  <li>法的義務に基づく場合</li>
                  <li>宇宙評議会からの正式な要請</li>
                  <li>龍神からの神託による指示</li>
                  <li>時空の歪みによる緊急事態</li>
                </ul>
              </div>
            </section>

            {/* 安全管理措置 */}
            <section className={cn(
              'bg-gradient-to-br from-green-900/20 to-black/40',
              'backdrop-blur-md border border-green-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(h4, 'text-green-400 mb-4')}>
                🛡️ 安全管理措置
              </h2>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed mb-4')}>
                当社では、最高レベルのセキュリティ技術で個人情報を保護しています：
              </p>
              <div className={cn(bodySm, 'text-gray-300 space-y-3')}>
                <div>
                  <h3 className="font-semibold text-green-300 mb-2">技術的保護措置</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>量子暗号化（256次元対応）</li>
                    <li>霊的バリアシステム</li>
                    <li>多次元ファイアウォール</li>
                    <li>龍神による常時監視</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-300 mb-2">物理的保護措置</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>異次元金庫での保管</li>
                    <li>結界による物理的隔離</li>
                    <li>時空間ロック機能</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* お問い合わせ */}
            <section className={cn(
              'bg-gradient-to-br from-blue-900/20 to-black/40',
              'backdrop-blur-md border border-blue-500/30',
              'rounded-2xl p-6 md:p-8'
            )}>
              <h2 className={cn(h4, 'text-blue-400 mb-4')}>
                📧 お問い合わせ
              </h2>
              <p className={cn(bodyMd, 'text-gray-200 leading-relaxed mb-4')}>
                個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
              </p>
              <div className={cn(bodySm, 'text-gray-300 space-y-2')}>
                <p><span className="text-blue-300">メール：</span> privacy@異次元通販.jp</p>
                <p><span className="text-blue-300">宇宙テレパシー：</span> 波長 432.8Hz</p>
                <p><span className="text-blue-300">龍神ホットライン：</span> 夢の中でお呼びください</p>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center pt-8">
              <p className={cn(bodyMd, 'text-gray-400')}>
                最終更新日：2024年6月27日<br />
                異次元通販プライバシー保護委員会
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}