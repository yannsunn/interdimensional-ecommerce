/**
 * 🌟 ULTRA DESIGN SYSTEM - 異次元通販の統一デザインシステム
 * 
 * すべてのスタイル、アニメーション、タイポグラフィを一元管理
 * 重複を排除し、一貫性のあるデザインを実現
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ユーティリティ関数 - クラス名の結合
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 🎨 グラデーション定義
 */
export const gradients = {
  // プライマリグラデーション
  primary: 'from-purple-400 via-pink-300 to-cyan-300',
  primaryReverse: 'from-cyan-300 via-pink-300 to-purple-400',
  
  // セカンダリグラデーション
  secondary: 'from-yellow-400 via-orange-300 to-red-400',
  secondaryReverse: 'from-red-400 via-orange-300 to-yellow-400',
  
  // 背景グラデーション
  bgDark: 'from-slate-900 via-purple-900/30 to-slate-900',
  bgSubtle: 'from-purple-900/20 to-black/40',
  bgCard: 'from-purple-900/40 to-indigo-900/30',
  
  // エフェクトグラデーション
  glow: 'from-purple-500/30 via-pink-500/20 to-cyan-500/30',
  radial: 'from-purple-500/10 via-transparent to-transparent',
  conic: 'from-purple-500/10 via-transparent to-purple-500/10',
  
  // カテゴリ別グラデーション
  cosmic: 'from-indigo-600 to-purple-600',
  dragon: 'from-red-600 to-orange-600',
  ancient: 'from-amber-600 to-yellow-600',
  quantum: 'from-cyan-600 to-blue-600',
  mystic: 'from-purple-600 to-pink-600',
} as const

/**
 * 📝 タイポグラフィスケール
 */
export const typography = {
  // 見出し
  h1: 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black',
  h2: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black',
  h3: 'text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  h4: 'text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold',
  h5: 'text-base xs:text-lg sm:text-xl md:text-2xl font-semibold',
  
  // 本文
  body: {
    xl: 'text-lg xs:text-xl sm:text-2xl md:text-3xl',
    lg: 'text-base xs:text-lg sm:text-xl md:text-2xl',
    md: 'text-sm xs:text-base sm:text-lg md:text-xl',
    sm: 'text-xs xs:text-sm sm:text-base md:text-lg',
    xs: 'text-xs sm:text-sm md:text-base',
  },
  
  // 特殊テキスト
  price: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black',
  badge: 'text-xs xs:text-sm font-bold uppercase tracking-wider',
  caption: 'text-xs xs:text-sm opacity-70',
} as const

/**
 * 🎭 アニメーション定義
 */
export const animations = {
  // 基本アニメーション
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  ping: 'animate-ping',
  
  // カスタムアニメーション
  float: 'animate-float',
  glow: 'animate-glow',
  spinSlow: 'animate-spin-slow',
  
  // ホバーエフェクト
  hover: {
    scale: 'hover:scale-105',
    lift: 'hover:-translate-y-1',
    brightness: 'hover:brightness-110',
    contrast: 'hover:contrast-110',
  },
  
  // トランジション
  transition: {
    all: 'transition-all duration-300',
    fast: 'transition-all duration-200',
    slow: 'transition-all duration-500',
    ultra: 'transition-all duration-700',
  },
} as const

/**
 * 🎪 エフェクト定義
 */
export const effects = {
  // グラスモーフィズム
  glass: {
    light: 'bg-white/10 backdrop-blur-md border border-white/20',
    dark: 'bg-black/20 backdrop-blur-md border border-white/10',
    colored: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10',
  },
  
  // シャドウ
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    glow: 'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
    neon: 'shadow-[0_0_30px_rgba(59,130,246,0.8)]',
  },
  
  // ブラー
  blur: {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-3xl',
  },
} as const

/**
 * 🎯 レイアウト定義
 */
export const layout = {
  // コンテナ
  container: {
    base: 'container mx-auto px-4',
    sm: 'container mx-auto px-4 max-w-3xl',
    md: 'container mx-auto px-4 max-w-5xl',
    lg: 'container mx-auto px-4 max-w-7xl',
  },
  
  // セクション
  section: {
    base: 'py-16 md:py-20 lg:py-24',
    sm: 'py-8 md:py-12',
    lg: 'py-20 md:py-24 lg:py-32',
  },
  
  // グリッド
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-1 md:grid-cols-2',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  
  // ギャップ
  gap: {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 lg:gap-10',
    xl: 'gap-8 md:gap-12 lg:gap-16',
  },
} as const

/**
 * 🎨 カラーテーマ
 */
export const colors = {
  // 神秘レベル
  mysteryLevel: {
    1: 'text-blue-400',
    2: 'text-purple-400',
    3: 'text-pink-400',
    4: 'text-orange-400',
    5: 'text-red-400',
  },
  
  // カテゴリ
  category: {
    cosmic: 'text-indigo-400',
    dragon: 'text-red-400',
    ancient: 'text-amber-400',
    quantum: 'text-cyan-400',
    mystic: 'text-purple-400',
  },
} as const

/**
 * 🎯 コンポーネントスタイル
 */
export const components = {
  // ボタン
  button: {
    primary: cn(
      'relative overflow-hidden',
      'bg-gradient-to-r', gradients.cosmic,
      'hover:from-indigo-700 hover:to-purple-700',
      'text-white font-bold rounded-xl',
      'px-8 py-4 md:px-10 md:py-5',
      animations.transition.all,
      animations.hover.scale,
      animations.hover.lift,
      effects.shadow['2xl']
    ),
    secondary: cn(
      'relative overflow-hidden',
      'border-2 border-cyan-400/70',
      'bg-cyan-400/10 hover:bg-cyan-400/80',
      'text-cyan-300 hover:text-white',
      'font-bold rounded-xl',
      'px-8 py-4 md:px-10 md:py-5',
      animations.transition.all,
      animations.hover.scale,
      animations.hover.lift,
      effects.shadow['2xl'],
      'backdrop-blur-sm'
    ),
  },
  
  // カード
  card: {
    base: cn(
      'relative overflow-hidden',
      'rounded-2xl p-6 md:p-8',
      effects.glass.dark,
      effects.shadow['2xl'],
      animations.transition.all
    ),
    hover: cn(
      animations.hover.scale,
      animations.hover.lift
    ),
  },
  
  // バッジ
  badge: {
    base: cn(
      'inline-flex items-center',
      'px-4 py-2 rounded-full',
      'backdrop-blur-sm',
      typography.badge
    ),
    cosmic: cn(
      'bg-gradient-to-r from-indigo-400/20 to-purple-500/20',
      'text-indigo-300 border border-indigo-400/30'
    ),
    dragon: cn(
      'bg-gradient-to-r from-red-400/20 to-orange-500/20',
      'text-red-300 border border-red-400/30'
    ),
    quantum: cn(
      'bg-gradient-to-r from-cyan-400/20 to-blue-500/20',
      'text-cyan-300 border border-cyan-400/30'
    ),
  },
} as const

/**
 * 🚀 パフォーマンス設定
 */
export const performance = {
  // will-changeの適切な使用
  willChange: {
    transform: 'will-change-transform',
    opacity: 'will-change-opacity',
    auto: 'will-change-auto',
  },
  
  // GPUアクセラレーション
  gpu: 'transform-gpu',
  
  // 画像最適化
  image: {
    loading: 'loading-lazy',
    decoding: 'decoding-async',
  },
} as const

/**
 * 🎯 複合スタイル生成関数
 */
export const createStyles = {
  // グラデーントテキスト
  gradientText: (gradient: keyof typeof gradients) => cn(
    'text-transparent bg-clip-text',
    'bg-gradient-to-r',
    gradients[gradient]
  ),
  
  // グローエフェクト付きボックス
  glowBox: (color: string) => cn(
    'relative',
    `shadow-[0_0_30px_${color}]`,
    animations.transition.all
  ),
  
  // アニメーション付きバッジ
  animatedBadge: (animation: keyof typeof animations) => cn(
    components.badge.base,
    animations[animation]
  ),
} as const

/**
 * 🎯 レスポンシブヘルパー
 */
export const responsive = {
  // 表示制御
  hideOnMobile: 'hidden sm:block',
  hideOnDesktop: 'block lg:hidden',
  showOnlyMobile: 'block sm:hidden',
  showOnlyDesktop: 'hidden lg:block',
  
  // フレックス方向
  stackOnMobile: 'flex-col sm:flex-row',
  
  // テキスト配置
  centerOnMobile: 'text-center sm:text-left',
} as const

export default {
  gradients,
  typography,
  animations,
  effects,
  layout,
  colors,
  components,
  performance,
  createStyles,
  responsive,
  cn,
}