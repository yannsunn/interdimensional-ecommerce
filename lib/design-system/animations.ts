/**
 * ✨ Animation System
 * Performance-optimized animations and transitions
 */

// フェードアニメーション
export const fadeIn = 'animate-in fade-in duration-500'
export const fadeOut = 'animate-out fade-out duration-300'
export const fadeInUp = 'animate-in fade-in slide-in-from-bottom-4 duration-500'
export const fadeInDown = 'animate-in fade-in slide-in-from-top-4 duration-500'

// スライドアニメーション
export const slideInLeft = 'animate-in slide-in-from-left duration-500'
export const slideInRight = 'animate-in slide-in-from-right duration-500'
export const slideInUp = 'animate-in slide-in-from-bottom duration-500'
export const slideInDown = 'animate-in slide-in-from-top duration-500'

// スケールアニメーション
export const scaleIn = 'animate-in zoom-in duration-300'
export const scaleOut = 'animate-out zoom-out duration-200'
export const pulse = 'animate-pulse'
export const bounce = 'animate-bounce'

// ローテーション
export const spin = 'animate-spin'
export const ping = 'animate-ping'

// トランジション
export const transition = 'transition-all duration-300 ease-in-out'
export const transitionFast = 'transition-all duration-150 ease-in-out'
export const transitionSlow = 'transition-all duration-500 ease-in-out'

// ホバーエフェクト
export const hoverScale = 'transform transition-transform duration-300 hover:scale-105'
export const hoverGlow = 'transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25'
export const hoverFloat = 'transform transition-transform duration-300 hover:-translate-y-1'

// フォーカスエフェクト
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900'
export const focusVisible = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50'

// 統合オブジェクト（後方互換性のため）
export const animations = {
  // フェード
  fade: {
    in: fadeIn,
    out: fadeOut,
    inUp: fadeInUp,
    inDown: fadeInDown,
  },
  
  // スライド
  slide: {
    inLeft: slideInLeft,
    inRight: slideInRight,
    inUp: slideInUp,
    inDown: slideInDown,
  },
  
  // スケール
  scale: {
    in: scaleIn,
    out: scaleOut,
  },
  
  // その他
  pulse,
  bounce,
  spin,
  ping,
  
  // トランジション
  transition,
  transitionFast,
  transitionSlow,
  
  // ホバー
  hover: {
    scale: hoverScale,
    glow: hoverGlow,
    float: hoverFloat,
  },
  
  // フォーカス
  focus: {
    ring: focusRing,
    visible: focusVisible,
  },
} as const

export type AnimationKey = keyof typeof animations

// Animation utilities
export const createStaggerAnimation = (children: number, delay: number = 100) => {
  return Array.from({ length: children }, (_, i) => ({
    animationDelay: `${i * delay}ms`,
  }))
}

export const createKeyframes = (name: string, frames: Record<string, Record<string, string>>) => {
  return {
    [`@keyframes ${name}`]: frames,
    [`.animate-${name}`]: {
      animation: `${name} 1s ease-in-out infinite`,
    },
  }
}