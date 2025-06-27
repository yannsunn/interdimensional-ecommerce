/**
 * 🛠️ Design System Utilities
 * Core utility functions for the design system
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ユーティリティ関数 - クラス名の結合
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 条件付きクラス適用
export function conditionalClass(
  condition: boolean | undefined,
  trueClass: string,
  falseClass: string = ''
): string {
  return condition ? trueClass : falseClass
}

// レスポンシブクラス生成
export function responsive(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string {
  const classes = [base]
  if (sm) classes.push(`sm:${sm}`)
  if (md) classes.push(`md:${md}`)
  if (lg) classes.push(`lg:${lg}`)
  if (xl) classes.push(`xl:${xl}`)
  return classes.join(' ')
}

// 状態クラス生成
export function stateClasses(
  base: string,
  states: {
    hover?: string
    focus?: string
    active?: string
    disabled?: string
  }
): string {
  const classes = [base]
  if (states.hover) classes.push(`hover:${states.hover}`)
  if (states.focus) classes.push(`focus:${states.focus}`)
  if (states.active) classes.push(`active:${states.active}`)
  if (states.disabled) classes.push(`disabled:${states.disabled}`)
  return classes.join(' ')
}

// カラーバリエーション生成
export function colorVariant(
  base: string,
  color: string,
  intensity: number = 500
): string {
  return base.replace(/\{color\}/g, `${color}-${intensity}`)
}

// アニメーション duration 生成
export function animationDuration(ms: number): string {
  if (ms <= 75) return 'duration-75'
  if (ms <= 100) return 'duration-100'
  if (ms <= 150) return 'duration-150'
  if (ms <= 200) return 'duration-200'
  if (ms <= 300) return 'duration-300'
  if (ms <= 500) return 'duration-500'
  if (ms <= 700) return 'duration-700'
  if (ms <= 1000) return 'duration-1000'
  return 'duration-1000'
}

// 型安全なバリアント選択
export function selectVariant<T extends Record<string, string>>(
  variants: T,
  variant: keyof T,
  fallback: keyof T
): string {
  return variants[variant] || variants[fallback] || ''
}