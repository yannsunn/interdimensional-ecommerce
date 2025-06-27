/**
 * 📐 Layout System
 * Consistent spacing, containers, and grid systems
 */

// コンテナサイズ
export const containerSm = 'max-w-screen-sm mx-auto px-4 sm:px-6'
export const containerMd = 'max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8'
export const containerLg = 'max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8'
export const containerXl = 'max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'
export const containerFull = 'w-full px-4 sm:px-6 lg:px-8'

// セクションスペーシング
export const sectionSm = 'py-8 sm:py-12'
export const sectionMd = 'py-12 sm:py-16 lg:py-20'
export const sectionLg = 'py-16 sm:py-20 lg:py-24'
export const sectionXl = 'py-20 sm:py-24 lg:py-32'

// グリッドシステム
export const gridCols1 = 'grid grid-cols-1'
export const gridCols2 = 'grid grid-cols-1 sm:grid-cols-2'
export const gridCols3 = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
export const gridCols4 = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
export const gridGapSm = 'gap-4'
export const gridGapMd = 'gap-6'
export const gridGapLg = 'gap-8'

// フレックスレイアウト
export const flexCenter = 'flex items-center justify-center'
export const flexBetween = 'flex items-center justify-between'
export const flexStart = 'flex items-center justify-start'
export const flexEnd = 'flex items-center justify-end'
export const flexCol = 'flex flex-col'
export const flexColCenter = 'flex flex-col items-center justify-center'

// スペーシング
export const spacingXs = 'space-y-2'
export const spacingSm = 'space-y-4'
export const spacingMd = 'space-y-6'
export const spacingLg = 'space-y-8'
export const spacingXl = 'space-y-12'

// パディング/マージン
export const paddingSm = 'p-4'
export const paddingMd = 'p-6'
export const paddingLg = 'p-8'
export const marginSm = 'm-4'
export const marginMd = 'm-6'
export const marginLg = 'm-8'

// 統合オブジェクト（後方互換性のため）
export const layout = {
  // コンテナ
  container: {
    sm: containerSm,
    md: containerMd,
    lg: containerLg,
    xl: containerXl,
    full: containerFull,
  },
  
  // セクション
  section: {
    sm: sectionSm,
    md: sectionMd,
    lg: sectionLg,
    xl: sectionXl,
  },
  
  // グリッド
  grid: {
    cols1: gridCols1,
    cols2: gridCols2,
    cols3: gridCols3,
    cols4: gridCols4,
    gap: {
      sm: gridGapSm,
      md: gridGapMd,
      lg: gridGapLg,
    },
  },
  
  // フレックス
  flex: {
    center: flexCenter,
    between: flexBetween,
    start: flexStart,
    end: flexEnd,
    col: flexCol,
    colCenter: flexColCenter,
  },
  
  // スペーシング
  spacing: {
    xs: spacingXs,
    sm: spacingSm,
    md: spacingMd,
    lg: spacingLg,
    xl: spacingXl,
  },
  
  // パディング/マージン
  padding: {
    sm: paddingSm,
    md: paddingMd,
    lg: paddingLg,
  },
  margin: {
    sm: marginSm,
    md: marginMd,
    lg: marginLg,
  },
} as const

export type LayoutKey = keyof typeof layout

// レスポンシブブレークポイント
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Z-index システム
export const zIndex = {
  hide: '-z-50',
  base: 'z-0',
  above: 'z-10',
  dropdown: 'z-20',
  sticky: 'z-30',
  overlay: 'z-40',
  modal: 'z-50',
  popover: 'z-60',
  tooltip: 'z-70',
  notification: 'z-80',
  max: 'z-[9999]',
} as const