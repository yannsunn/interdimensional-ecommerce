import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 価格フォーマッター（メモ化対応）
const priceFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
})

export function formatPrice(price: number): string {
  return priceFormatter.format(price)
}

// 神秘メッセージ配列（不変配列として最適化）
const MYSTERY_MESSAGES = [
  '⚡ 異次元からの緊急メッセージ：在庫が時空の歪みで消失中！ ⚡',
  '🌟 パラレルワールドの自分が購入を勧めています！ 🌟',
  '🔮 龍神様のお告げ：今買わないと一生後悔する！ 🔮',
  '💫 宇宙からの電波：あなたの波動が商品を呼んでいます！ 💫',
  '🐉 龍が見えます...あなたの運命の商品です！ 🐉',
  '✨ 精霊たちがざわついています...何かが起こる予感！ ✨',
  '🌙 月のパワーが最大に！今がチャンスです！ 🌙',
  '🔯 六芒星が輝いています...購入のサインです！ 🔯',
] as const

export function generateMysteryMessage(): string {
  return MYSTERY_MESSAGES[Math.floor(Math.random() * MYSTERY_MESSAGES.length)] ?? '神秘的な商品です'
}

// 神秘レベル設定（オブジェクトベースで高速化）
const MYSTERY_LEVELS = {
  9: { text: '異次元レベル', color: 'text-purple-500' },
  7: { text: '超常現象級', color: 'text-pink-500' },
  5: { text: '不思議体験', color: 'text-blue-500' },
  0: { text: 'ちょっと不思議', color: 'text-gray-500' },
} as const

export function getMysteryLevel(level: number): { text: string; color: string } {
  if (level >= 9) return MYSTERY_LEVELS[9]
  if (level >= 7) return MYSTERY_LEVELS[7]
  if (level >= 5) return MYSTERY_LEVELS[5]
  return MYSTERY_LEVELS[0]
}

// 後方互換性のための個別関数（非推奨）
export function getMysteryLevelText(level: number): string {
  return getMysteryLevel(level).text
}

export function getMysteryLevelColor(level: number): string {
  return getMysteryLevel(level).color
}

// プロダクト関連ユーティリティ統合
export const productUtils = {
  formatPrice,
  getMysteryLevel,
  generateMysteryMessage,
  
  // カート計算ユーティリティ
  calculateTotal: (items: Array<{ price: number; quantity: number }>): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  
  // 在庫チェック
  isInStock: (stock: number, quantity: number = 1): boolean => {
    return stock >= quantity
  },
  
  // 割引計算
  calculateDiscount: (originalPrice: number, discountPrice: number): number => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
  }
}

// UI関連ユーティリティ統合
export const uiUtils = {
  cn,
  
  // レスポンシブ画像URL生成
  getOptimizedImageUrl: (url: string, width: number = 800, quality: number = 80): string => {
    if (!url) return '/placeholder.jpg'
    return `${url}?w=${width}&q=${quality}`
  },
  
  // クラス条件分岐
  conditionalClass: (condition: boolean, trueClass: string, falseClass: string = ''): string => {
    return condition ? trueClass : falseClass
  },
  
  // 切り捨て文字列
  truncateText: (text: string, length: number = 100): string => {
    return text.length > length ? `${text.substring(0, length)}...` : text
  }
}