/**
 * ⚡ Zustand Performance Optimization Utilities
 * Memoized selectors and computed values for optimal re-rendering
 */

import { StoreApi, UseBoundStore } from 'zustand'

// セレクター作成ユーティリティ
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as S
  ;(store as any).use = {}
  
  for (const k of Object.keys(store.getState())) {
    ;((store as any).use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store as S & {
    use: {
      [K in keyof ReturnType<S['getState']>]: () => ReturnType<S['getState']>[K]
    }
  }
}

// 浅い等価性チェック
export function shallowEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) {
    return true
  }

  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false
  }

  const keysA = Object.keys(a) as Array<keyof T>
  const keysB = Object.keys(b) as Array<keyof T>

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || !Object.is(a[key], b[key])) {
      return false
    }
  }

  return true
}

// 最適化されたセレクター関数
export const createMemoizedSelector = <T, R>(
  selector: (state: T) => R,
  equalityFn = shallowEqual
) => {
  let lastArgs: T | undefined
  let lastResult: R

  return (state: T): R => {
    if (lastArgs === undefined || !equalityFn(lastArgs, state)) {
      lastArgs = state
      lastResult = selector(state)
    }
    return lastResult
  }
}

// 計算値を持つストア拡張
export interface ComputedStore {
  _computed: Record<string, unknown>
  _updateComputed: () => void
  _getComputed: (key: string) => any
}

export const withComputed = <T extends object>(
  config: (set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => T,
  computedConfig: (get: StoreApi<T>['getState']) => Record<string, unknown>
) => {
  return (set: StoreApi<T & ComputedStore>['setState'], get: StoreApi<T & ComputedStore>['getState']) => {
    const baseStore = config(
      (partial, _replace) => {
        set(partial as any, _replace)
        // 状態変更後に計算値を更新
        const state = get()
        state._updateComputed()
      },
      get
    )

    return {
      ...baseStore,
      _computed: {},
      
      _updateComputed: () => {
        const computed = computedConfig(get)
        set({ _computed: computed } as Partial<T & ComputedStore>)
      },
      
      _getComputed: <K extends keyof typeof computedConfig>(key: K) => {
        return get()._computed[key as string]
      },
    } as T & ComputedStore
  }
}

// パフォーマンス監視
export const withPerformanceMonitoring = <T extends object>(
  config: (set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => T,
  name: string
) => {
  return (set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => {
    const monitoredSet: StoreApi<T>['setState'] = (partial, replace) => {
      const start = performance.now()
      set(partial, replace)
      const end = performance.now()
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 Store ${name} update took ${end - start}ms`)
      }
    }

    return config(monitoredSet, get)
  }
}

// 永続化の型安全な実装
export interface PersistOptions<T> {
  name: string
  version?: number
  migrate?: (persistedState: unknown, version: number) => T
  partialize?: (state: T) => Partial<T>
  skipHydration?: boolean
}

// デバウンス機能付きストア更新
export const createDebouncedSetter = <T>(
  set: StoreApi<T>['setState'],
  delay = 300
) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      set(partial, replace)
      timeoutId = null
    }, delay)
  }
}

// ストア値の変更履歴追跡
export interface HistoryStore<T> {
  _history: T[]
  _historyIndex: number
  _maxHistorySize: number
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  clearHistory: () => void
}

export const withHistory = <T extends object>(
  config: (set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => T,
  maxHistorySize = 50
) => {
  return (set: StoreApi<T & HistoryStore<T>>['setState'], get: StoreApi<T & HistoryStore<T>>['getState']) => {
    const baseStore = config(
      (partial, _replace) => {
        const currentState = get()
        const newState = typeof partial === 'function' 
          ? { ...currentState, ...partial(currentState) }
          : { ...currentState, ...partial }

        // 履歴に現在の状態を追加
        const history = [...currentState._history.slice(0, currentState._historyIndex + 1), currentState]
        if (history.length > maxHistorySize) {
          history.shift()
        }

        set({
          ...newState,
          _history: history,
          _historyIndex: history.length - 1,
        } as T & HistoryStore<T>)
      },
      get
    )

    return {
      ...baseStore,
      _history: [],
      _historyIndex: -1,
      _maxHistorySize: maxHistorySize,

      undo: () => {
        const state = get()
        if (state._historyIndex > 0) {
          const previousState = state._history[state._historyIndex - 1]
          set({
            ...previousState,
            _historyIndex: state._historyIndex - 1,
          } as T & HistoryStore<T>)
        }
      },

      redo: () => {
        const state = get()
        if (state._historyIndex < state._history.length - 1) {
          const nextState = state._history[state._historyIndex + 1]
          set({
            ...nextState,
            _historyIndex: state._historyIndex + 1,
          } as T & HistoryStore<T>)
        }
      },

      canUndo: () => get()._historyIndex > 0,
      canRedo: () => get()._historyIndex < get()._history.length - 1,
      
      clearHistory: () => {
        set({
          _history: [],
          _historyIndex: -1,
        } as Partial<T & HistoryStore<T>>)
      },
    } as T & HistoryStore<T>
  }
}