import Image from 'next/image'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Ultra-Sync Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none -z-40" />
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Mystery Message Section */}
      <MysteryMessageSection />

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* Special Features Section */}
      <SpecialFeaturesSection />

      {/* Warning Section */}
      <WarningSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

// ヘッダーコンポーネント
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-purple-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              異次元通販
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-white hover:text-purple-400 transition-colors">
              商品一覧
            </Link>
            <Link href="/about" className="text-white hover:text-purple-400 transition-colors">
              異次元について
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-white hover:text-purple-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </button>
            <Link 
              href="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              ログイン
            </Link>
            <button className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// ヒーローセクション
function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen">      
      <div className="py-20 md:py-24 lg:py-32 relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            
            {/* ヒーロー画像 - 背景レイヤー */}
            <div className="order-1 lg:order-2 w-full flex justify-center relative -z-10">
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                {/* 多層背景エフェクト */}
                <div className="absolute -inset-8 md:-inset-12 lg:-inset-16 -z-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 via-transparent to-blue-500/8 rounded-full blur-2xl opacity-15"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-green-400/3 via-transparent to-purple-400/3 rounded-full blur-xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* プレミアム画像コンテナ */}
                <div className="relative aspect-square w-full group -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/1 to-white/3 rounded-3xl backdrop-blur-sm border border-white/3 shadow-lg"></div>
                  <div className="relative w-full h-full rounded-3xl overflow-hidden opacity-70">
                    <Image
                      src="/images/hero-main.jpg"
                      alt="異次元通販 - 宇宙の叡智"
                      fill
                      className="object-contain filter group-hover:opacity-40 transition-all duration-700"
                      priority
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                </div>
                
                {/* フローティングオーブ */}
                <div className="absolute w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-xl animate-bounce -top-4 -right-4 hidden lg:block -z-30"></div>
                <div className="absolute w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl animate-bounce -bottom-8 -left-8 hidden lg:block -z-30" style={{animationDelay: '2s'}}></div>
                <div className="absolute w-16 h-16 bg-gradient-to-br from-pink-400/10 to-purple-500/10 rounded-full blur-xl animate-bounce top-1/2 -right-8 hidden lg:block -z-30" style={{animationDelay: '3s'}}></div>
              </div>
            </div>
            
            {/* ヒーローコンテンツ - 前面レイヤー */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1 relative z-50">
              {/* 半透明背景で可読性確保 */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl -z-10"></div>
              
              {/* メインタイトル */}
              <div className="space-y-4 md:space-y-6 relative">
                <div className="relative">
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 leading-tight tracking-tight">
                    異次元通販
                  </h1>
                  <div className="absolute inset-0 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white opacity-20 blur-sm leading-tight tracking-tight">
                    異次元通販
                  </div>
                </div>
                
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent font-semibold leading-relaxed">
                  〜 宇宙と古代の叡智があなたの運命を変える！ 〜
                </p>
              </div>
              
              {/* プレミアムアラートバナー */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 xs:py-4 xs:px-8 md:py-5 md:px-10 rounded-xl md:rounded-2xl border border-yellow-400/50 shadow-2xl backdrop-blur-sm">
                  <div className="text-sm xs:text-base sm:text-lg md:text-xl font-bold leading-tight text-center">
                    <span className="animate-pulse">⚡</span> 緊急放送中！！本日限り、特別価格でご提供！！ <span className="animate-pulse">⚡</span>
                  </div>
                </div>
              </div>
              
              {/* 説明文 */}
              <div className="space-y-4 md:space-y-6">
                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium">
                  量子レベルで人生を変える商品を異次元からお届け。
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 border-yellow-400/30 font-bold text-sm md:text-base lg:text-lg rounded-full border backdrop-blur-sm">
                    🐉 龍神の加護
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-400/30 font-bold text-sm md:text-base lg:text-lg rounded-full border backdrop-blur-sm">
                    ⚡ 宇宙エネルギー
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400/20 to-purple-500/20 text-pink-300 border-pink-400/30 font-bold text-sm md:text-base lg:text-lg rounded-full border backdrop-blur-sm">
                    🔮 古代の叡智
                  </span>
                </div>
              </div>
              
              {/* CTAボタン */}
              <div className="flex flex-col xs:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-6">
                <Link
                  href="#products"
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-8 py-4 xs:px-10 xs:py-5 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-bold text-sm xs:text-base sm:text-lg md:text-xl transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <span className="relative">🔮 運命の商品を見つける！ ✨</span>
                </Link>
                
                <Link
                  href="/products"
                  className="group relative overflow-hidden border-2 border-cyan-400/70 bg-cyan-400/10 text-cyan-300 hover:text-white hover:bg-cyan-400/80 px-8 py-4 xs:px-10 xs:py-5 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-bold text-sm xs:text-base sm:text-lg md:text-xl transition-all duration-500 shadow-2xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <span className="relative">🌌 全商品を見る →</span>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

// 神秘的メッセージセクション
function MysteryMessageSection() {
  return (
    <section className="relative py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <div className="relative bg-black/20 backdrop-blur-md bg-gradient-to-r from-yellow-900/40 via-amber-900/30 to-yellow-900/40 border-2 border-yellow-400/50 rounded-2xl p-6 md:p-8 text-center shadow-2xl">
            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400/20 rounded-full animate-ping"></div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="text-yellow-200 text-base xs:text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed">
              ✨ 🔯 六芒星が輝いています...購入のサインです！ 🔯 ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 商品セクション
function FeaturedProductsSection() {
  return (
    <section id="products" className="relative py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-16 md:mb-20 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 mb-6 leading-tight">
              🌟 異次元の力を秘めた特選商品 🌟
            </h2>
            <div className="absolute inset-0 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white opacity-10 blur-sm leading-tight">
              🌟 異次元の力を秘めた特選商品 🌟
            </div>
          </div>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent font-medium max-w-3xl mx-auto leading-relaxed">
            龍神も認めた！宇宙からのメッセージを受け取った商品たち
          </p>
          
          {/* 装飾的な星 */}
          <div className="absolute -top-4 left-1/4 text-yellow-400 animate-bounce">⭐</div>
          <div className="absolute -top-2 right-1/4 text-cyan-400 animate-bounce" style={{animationDelay: '1s'}}>✨</div>
          <div className="absolute -bottom-2 left-1/3 text-purple-400 animate-bounce" style={{animationDelay: '2s'}}>🌟</div>
        </div>

        {/* 商品準備中メッセージ */}
        <div className="col-span-full text-center py-16">
          <div className="relative">
            <div className="text-6xl md:text-8xl opacity-20 mb-4">🔮</div>
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              神秘的な商品を準備中...
            </h3>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300">
              宇宙からの特別な商品が間もなく到着します
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
            <Link
              href="/products"
              className="relative bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 text-cyan-300 hover:text-white px-10 py-5 md:px-12 md:py-6 rounded-full font-bold text-sm xs:text-base sm:text-lg md:text-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 shadow-2xl backdrop-blur-sm will-change-transform"
            >
              <span className="relative flex items-center justify-center gap-3">
                <span>もっと異次元商品を見る</span>
                <span className="text-2xl animate-bounce">🚀</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// 特別機能セクション
function SpecialFeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: '量子レベルの効果',
      description: 'DNAレベルから人生を書き換える\n革命的な商品をお届け',
      gradient: 'from-purple-600/20 to-indigo-600/20',
      bgGradient: 'from-purple-600/40 to-indigo-600/20',
      borderColor: 'border-purple-400/30',
      textColor: 'text-purple-200',
      pingColor: 'bg-purple-400/40',
      delay: '0s'
    },
    {
      icon: '🐉',
      title: '龍神の加護',
      description: '古代より伝わる龍神の力で\nあなたを邪気から守護',
      gradient: 'from-pink-600/20 to-red-600/20',
      bgGradient: 'from-pink-600/40 to-red-600/20',
      borderColor: 'border-pink-400/30',
      textColor: 'text-pink-200',
      pingColor: 'bg-pink-400/40',
      delay: '1s'
    },
    {
      icon: '🌌',
      title: '宇宙エネルギー',
      description: '宇宙の無限エネルギーを\nあなたの日常にお届け',
      gradient: 'from-cyan-600/20 to-blue-600/20',
      bgGradient: 'from-cyan-600/40 to-blue-600/20',
      borderColor: 'border-cyan-400/30',
      textColor: 'text-cyan-200',
      pingColor: 'bg-cyan-400/40',
      delay: '2s'
    }
  ]

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-cyan-900/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 mb-6 leading-tight">
            🔮 異次元通販が選ばれる理由 🔮
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500`}></div>
              <div className={`relative bg-black/20 backdrop-blur-md bg-gradient-to-br ${feature.bgGradient} p-8 md:p-10 rounded-3xl border ${feature.borderColor} text-center transform group-hover:scale-105 transition-all duration-500 will-change-transform`}>
                <div className="text-6xl md:text-7xl mb-6 animate-glow">{feature.icon}</div>
                <h3 className={`text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-4 leading-tight ${feature.textColor}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {feature.description}
                </p>
                <div className={`absolute top-4 right-4 w-4 h-4 ${feature.pingColor} rounded-full animate-ping`} style={{animationDelay: feature.delay}}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <div className="flex items-center gap-2 text-yellow-400">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">宇宙認定</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <span className="text-2xl">🔮</span>
              <span className="font-semibold">神秘保証</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="text-2xl">✨</span>
              <span className="font-semibold">効果実証済み</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 注意事項セクション
function WarningSection() {
  return (
    <section className="relative py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-black/20 backdrop-blur-md bg-gradient-to-r from-yellow-900/30 via-amber-900/20 to-yellow-900/30 border border-yellow-400/40 rounded-2xl p-6 md:p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-400/20 p-3 rounded-full">
                <span className="text-2xl animate-pulse">⚠️</span>
              </div>
            </div>
            <div className="text-yellow-200 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              異次元通販の商品は全て異次元の技術を使用しています。<br />
              現次元の物理法則に従わない場合がございます。効果には個人差があります。
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 最終CTAセクション
function FinalCTASection() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 text-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="container mx-auto px-4 max-w-5xl relative">
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400 leading-tight">
            今すぐお電話を！異次元のオペレーターが24時間待機中！
          </h2>
          
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-6 md:px-12 md:py-8 rounded-2xl font-black text-3xl md:text-4xl lg:text-5xl shadow-2xl">
              📞 0120-XXX-XXXX
            </div>
          </div>
          
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            受付時間：24時間365日<br />
            <span className="text-sm opacity-70">（※パラレルワールドでは営業時間が異なります）</span>
          </p>
          
          <div className="relative inline-block group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-black/20 backdrop-blur-md bg-gradient-to-r from-cyan-900/40 to-blue-900/30 border border-cyan-400/40 rounded-2xl p-6 md:p-8">
              <div className="flex justify-center mb-4">
                <div className="bg-cyan-400/20 p-2 rounded-full">
                  <span className="text-xl animate-bounce">🎁</span>
                </div>
              </div>
              <p className="text-cyan-200 text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed">
                ご注文の方全員に「フラワーオブライフ」ステッカープレゼント！<br />
                <span className="text-cyan-300 font-semibold">
                  古代エジプトの叡智があなたの波動を上げる！
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// フッター
function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black/80 to-black/95 border-t border-purple-500/30 py-12 md:py-16 backdrop-blur-sm">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="space-y-8">
          <div className="relative text-center">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 mb-4">
              異次元通販
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mt-4">
              宇宙と古代の叡智があなたの運命を変える
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-xs xs:text-sm sm:text-base md:text-lg">
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-all duration-300 font-medium">
              利用規約
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-all duration-300 font-medium">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-all duration-300 font-medium">
              お問い合わせ
            </Link>
          </div>
          
          <div className="border-t border-gray-700/50 pt-8">
            <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-center">
              © 2024 異次元通販. All rights reserved in all dimensions.<br />
              <span className="text-xs opacity-60">
                Powered by quantum technology and ancient wisdom.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}