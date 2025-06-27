/**
 * 🌟 Design System Index
 * Main entry point with selective exports for optimal tree-shaking
 */

// Re-export utilities (most commonly used)
export { cn, conditionalClass, responsive, stateClasses } from './utils'

// Re-export individual modules for selective importing
export * as gradients from './gradients'
export * as typography from './typography'
export * as animations from './animations'
export * as layout from './layout'

// Legacy imports (for backward compatibility)
export { gradients as gradientsLegacy } from './gradients'
export { typography as typographyLegacy } from './typography'
export { animations as animationsLegacy } from './animations'
export { layout as layoutLegacy } from './layout'

// Commonly used exports for convenience
export { primary as primaryGradient, secondary as secondaryGradient } from './gradients'
export { h1, h2, h3, bodyMd, bodySm } from './typography'
export { transition, hoverScale, focusRing } from './animations'
export { containerMd, sectionMd, flexCenter } from './layout'

// Type exports
export type { GradientKey } from './gradients'
export type { TypographyKey } from './typography'
export type { AnimationKey } from './animations'
export type { LayoutKey } from './layout'

// Design tokens
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#8b5cf6',
      900: '#581c87',
    },
    secondary: {
      50: '#fefce8',
      100: '#fef3c7',
      500: '#f59e0b',
      900: '#78350f',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgb(139 92 246 / 0.3)',
  },
} as const

// Utility functions for design tokens
export const getToken = (path: string, tokens = designTokens): any => {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], tokens)
}

export const createTheme = (overrides: Partial<typeof designTokens>) => {
  return { ...designTokens, ...overrides }
}