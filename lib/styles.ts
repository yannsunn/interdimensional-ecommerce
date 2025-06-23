// 共通スタイルクラス定数 - コード重複削除
export const COMMON_GRADIENTS = {
  primary: 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600',
  card: 'bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-md',
  cardBorder: 'border-2 border-purple-500/30 hover:border-purple-400/50',
  text: 'bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent',
  glow: 'shadow-2xl shadow-purple-500/20',
  emergency: 'bg-gradient-to-r from-red-600 to-red-700',
  cyan: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  portal: 'bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20',
} as const

export const COMMON_ANIMATIONS = {
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
  ping: 'animate-ping',
  float: 'animate-float',
  glow: 'animate-glow',
  gradientShift: 'animate-gradient-shift',
} as const

export const COMMON_TRANSITIONS = {
  default: 'transition-all duration-300',
  fast: 'transition-all duration-150',
  slow: 'transition-all duration-500',
  colors: 'transition-colors duration-300',
  transform: 'transition-transform duration-300',
} as const