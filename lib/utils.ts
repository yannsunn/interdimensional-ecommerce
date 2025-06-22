import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(price)
}

export function generateMysteryMessage(): string {
  const messages = [
    '⚡ 異次元からの緊急メッセージ：在庫が時空の歪みで消失中！ ⚡',
    '🌟 パラレルワールドの自分が購入を勧めています！ 🌟',
    '🔮 龍神様のお告げ：今買わないと一生後悔する！ 🔮',
    '💫 宇宙からの電波：あなたの波動が商品を呼んでいます！ 💫',
    '🐉 龍が見えます...あなたの運命の商品です！ 🐉',
    '✨ 精霊たちがざわついています...何かが起こる予感！ ✨',
    '🌙 月のパワーが最大に！今がチャンスです！ 🌙',
    '🔯 六芒星が輝いています...購入のサインです！ 🔯',
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

export function getMysteryLevelText(level: number): string {
  if (level >= 9) return '異次元レベル'
  if (level >= 7) return '超常現象級'
  if (level >= 5) return '不思議体験'
  return 'ちょっと不思議'
}

export function getMysteryLevelColor(level: number): string {
  if (level >= 9) return 'text-purple-500'
  if (level >= 7) return 'text-pink-500'
  if (level >= 5) return 'text-blue-500'
  return 'text-gray-500'
}