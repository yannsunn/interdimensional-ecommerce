/**
 * 📝 Typography System
 * Responsive and accessible typography scales
 */

// 見出しスタイル
export const h1 = 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black'
export const h2 = 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'
export const h3 = 'text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold'
export const h4 = 'text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold'
export const h5 = 'text-base xs:text-lg sm:text-xl md:text-2xl font-semibold'
export const h6 = 'text-sm xs:text-base sm:text-lg md:text-xl font-medium'

// 本文スタイル
export const bodyLg = 'text-lg sm:text-xl leading-relaxed'
export const bodyMd = 'text-base sm:text-lg leading-relaxed'
export const bodySm = 'text-sm sm:text-base leading-relaxed'
export const bodyXs = 'text-xs sm:text-sm leading-relaxed'

// 特殊スタイル
export const caption = 'text-xs text-gray-500 uppercase tracking-wider'
export const label = 'text-sm font-medium text-gray-300'
export const code = 'font-mono text-sm bg-gray-800 px-2 py-1 rounded'
export const quote = 'text-lg italic text-gray-300 border-l-4 border-purple-500 pl-4'

// リンクスタイル
export const link = 'text-purple-400 hover:text-purple-300 transition-colors duration-200 underline underline-offset-2'
export const linkSubtle = 'text-gray-300 hover:text-white transition-colors duration-200'

// ボタンテキスト
export const buttonLg = 'text-lg font-semibold'
export const buttonMd = 'text-base font-semibold'
export const buttonSm = 'text-sm font-medium'

// 統合オブジェクト（後方互換性のため）
export const typography = {
  // 見出し
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  
  // 本文
  body: {
    lg: bodyLg,
    md: bodyMd,
    sm: bodySm,
    xs: bodyXs,
  },
  
  // 特殊
  caption,
  label,
  code,
  quote,
  
  // リンク
  link,
  linkSubtle,
  
  // ボタン
  button: {
    lg: buttonLg,
    md: buttonMd,
    sm: buttonSm,
  },
} as const

export type TypographyKey = keyof typeof typography