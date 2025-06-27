/**
 * 🎭 useAnimationSettings - アニメーション設定管理フック
 * 
 * ユーザーの設定やデバイスに基づいてアニメーションを最適化
 */

import { useState, useEffect, useCallback } from 'react'

interface AnimationSettings {
  enabled: boolean
  reducedMotion: boolean
  performanceMode: 'high' | 'balanced' | 'low'
  particleCount: number
  animationSpeed: number
}

interface UseAnimationSettingsReturn extends AnimationSettings {
  updateSettings: (settings: Partial<AnimationSettings>) => void
  toggleAnimations: () => void
  shouldAnimate: (priority?: 'high' | 'medium' | 'low') => boolean
}

// デフォルト設定
const DEFAULT_SETTINGS: AnimationSettings = {
  enabled: true,
  reducedMotion: false,
  performanceMode: 'balanced',
  particleCount: 50,
  animationSpeed: 1,
}

// パフォーマンスモード別の設定
const PERFORMANCE_PRESETS = {
  high: {
    particleCount: 100,
    animationSpeed: 1,
  },
  balanced: {
    particleCount: 50,
    animationSpeed: 1,
  },
  low: {
    particleCount: 20,
    animationSpeed: 0.5,
  },
} as const

/**
 * アニメーション設定管理フック
 */
export function useAnimationSettings(): UseAnimationSettingsReturn {
  const [settings, setSettings] = useState<AnimationSettings>(DEFAULT_SETTINGS)
  
  /**
   * システム設定の検出
   */
  useEffect(() => {
    // Reduced Motion設定の検出
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSettings(prev => ({
        ...prev,
        reducedMotion: e.matches,
        enabled: !e.matches, // Reduced Motion有効時はアニメーション無効
      }))
    }
    
    // 初回チェック
    handleMotionChange(mediaQuery)
    
    // リスナー登録
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange)
    } else {
      // 古いブラウザ対応
      mediaQuery.addListener(handleMotionChange as any)
    }
    
    // デバイス性能の検出
    detectDevicePerformance()
    
    // ローカルストレージから設定読み込み
    loadSavedSettings()
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange)
      } else {
        mediaQuery.removeListener(handleMotionChange as any)
      }
    }
  }, [])
  
  /**
   * デバイス性能の検出
   */
  const detectDevicePerformance = useCallback(() => {
    // メモリチェック
    const memory = (navigator as any).deviceMemory
    // CPU コア数チェック
    const cores = navigator.hardwareConcurrency || 2
    
    let performanceMode: AnimationSettings['performanceMode'] = 'balanced'
    
    if (memory && memory < 4 || cores < 4) {
      performanceMode = 'low'
    } else if (memory && memory >= 8 && cores >= 8) {
      performanceMode = 'high'
    }
    
    // FPS測定による動的調整
    measureFPS((fps) => {
      if (fps < 30) {
        performanceMode = 'low'
      } else if (fps >= 50) {
        performanceMode = 'high'
      }
      
      setSettings(prev => ({
        ...prev,
        performanceMode,
        ...PERFORMANCE_PRESETS[performanceMode],
      }))
    })
  }, [])
  
  /**
   * FPS測定
   */
  const measureFPS = (callback: (fps: number) => void) => {
    let lastTime = performance.now()
    let frames = 0
    let fps = 0
    
    const measure = () => {
      frames++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime))
        callback(fps)
        return
      }
      
      if (frames < 60) {
        requestAnimationFrame(measure)
      }
    }
    
    requestAnimationFrame(measure)
  }
  
  /**
   * 設定の保存
   */
  const saveSettings = useCallback((newSettings: AnimationSettings) => {
    try {
      localStorage.setItem('animationSettings', JSON.stringify(newSettings))
    } catch (e) {
      console.warn('Failed to save animation settings:', e)
    }
  }, [])
  
  /**
   * 保存された設定の読み込み
   */
  const loadSavedSettings = useCallback(() => {
    try {
      const saved = localStorage.getItem('animationSettings')
      if (saved) {
        const parsed = JSON.parse(saved)
        setSettings(prev => ({
          ...prev,
          ...parsed,
        }))
      }
    } catch (e) {
      console.warn('Failed to load animation settings:', e)
    }
  }, [])
  
  /**
   * 設定の更新
   */
  const updateSettings = useCallback((updates: Partial<AnimationSettings>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates }
      
      // パフォーマンスモードが変更された場合、プリセットを適用
      if (updates.performanceMode && updates.performanceMode !== prev.performanceMode) {
        Object.assign(newSettings, PERFORMANCE_PRESETS[updates.performanceMode])
      }
      
      saveSettings(newSettings)
      return newSettings
    })
  }, [saveSettings])
  
  /**
   * アニメーションのトグル
   */
  const toggleAnimations = useCallback(() => {
    updateSettings({ enabled: !settings.enabled })
  }, [settings.enabled, updateSettings])
  
  /**
   * アニメーション実行判定
   */
  const shouldAnimate = useCallback((priority: 'high' | 'medium' | 'low' = 'medium') => {
    if (!settings.enabled || settings.reducedMotion) {
      return false
    }
    
    // パフォーマンスモードに基づく判定
    switch (settings.performanceMode) {
      case 'low':
        return priority === 'high'
      case 'balanced':
        return priority !== 'low'
      case 'high':
        return true
      default:
        return true
    }
  }, [settings])
  
  return {
    ...settings,
    updateSettings,
    toggleAnimations,
    shouldAnimate,
  }
}

/**
 * アニメーション設定のプリセット
 */
export const ANIMATION_PRESETS = {
  gaming: {
    enabled: true,
    performanceMode: 'high' as const,
    particleCount: 100,
    animationSpeed: 1.5,
  },
  office: {
    enabled: true,
    performanceMode: 'balanced' as const,
    particleCount: 30,
    animationSpeed: 0.8,
  },
  battery: {
    enabled: true,
    performanceMode: 'low' as const,
    particleCount: 10,
    animationSpeed: 0.5,
  },
  accessibility: {
    enabled: false,
    performanceMode: 'low' as const,
    particleCount: 0,
    animationSpeed: 0,
  },
} as const