/**
 * 🎨 Gradient Definitions
 * Optimized gradient system with tree-shaking support
 */

// プライマリグラデーション
export const primary = 'from-purple-400 via-pink-300 to-cyan-300'
export const primaryReverse = 'from-cyan-300 via-pink-300 to-purple-400'

// セカンダリグラデーション
export const secondary = 'from-yellow-400 via-orange-300 to-red-400'
export const secondaryReverse = 'from-red-400 via-orange-300 to-yellow-400'

// 背景グラデーション
export const bgDark = 'from-slate-900 via-purple-900/30 to-slate-900'
export const bgSubtle = 'from-purple-900/20 to-black/40'
export const bgCard = 'from-purple-900/40 to-indigo-900/30'

// エフェクトグラデーション
export const glow = 'from-purple-500/30 via-pink-500/20 to-cyan-500/30'
export const radial = 'from-purple-500/10 via-transparent to-transparent'
export const conic = 'from-purple-500/10 via-transparent to-purple-500/10'

// カテゴリ別グラデーション
export const cosmic = 'from-indigo-600 to-purple-600'
export const dragon = 'from-red-600 to-orange-600'
export const ancient = 'from-amber-600 to-yellow-600'
export const quantum = 'from-cyan-600 to-blue-600'
export const mystic = 'from-purple-600 to-pink-600'

// 統合オブジェクト（後方互換性のため）
export const gradients = {
  primary,
  primaryReverse,
  secondary,
  secondaryReverse,
  bgDark,
  bgSubtle,
  bgCard,
  glow,
  radial,
  conic,
  cosmic,
  dragon,
  ancient,
  quantum,
  mystic,
} as const

export type GradientKey = keyof typeof gradients