/**
 * ⚡ Suspense Wrapper
 * Advanced Suspense boundaries with error handling and streaming
 */

'use client'

import { Suspense, type ReactNode } from 'react'
import { ErrorBoundary } from '../error/ErrorBoundary'
import { cn } from '../../lib/design-system'

interface SuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode | undefined
  errorFallback?: ReactNode | undefined
  className?: string | undefined
  name?: string | undefined
}

// 高度なローディングスケルトン
export const AdvancedSkeleton = ({ 
  className,
  variant = 'default',
  rows = 3,
  showAvatar = false,
}: {
  className?: string
  variant?: 'default' | 'card' | 'list' | 'grid'
  rows?: number
  showAvatar?: boolean
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]'
  
  if (variant === 'card') {
    return (
      <div className={cn('space-y-4 p-6 bg-gray-900/50 rounded-xl border border-gray-700', className)}>
        <div className={cn(baseClasses, 'h-48 rounded-lg')} />
        <div className="space-y-2">
          <div className={cn(baseClasses, 'h-4 rounded w-3/4')} />
          <div className={cn(baseClasses, 'h-4 rounded w-1/2')} />
        </div>
        <div className={cn(baseClasses, 'h-8 rounded w-1/4')} />
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <AdvancedSkeleton key={i} variant="card" />
        ))}
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            {showAvatar && (
              <div className={cn(baseClasses, 'h-12 w-12 rounded-full')} />
            )}
            <div className="flex-1 space-y-2">
              <div className={cn(baseClasses, 'h-4 rounded w-3/4')} />
              <div className={cn(baseClasses, 'h-4 rounded w-1/2')} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={cn(baseClasses, 'h-4 rounded', {
          'w-full': i === 0,
          'w-5/6': i === 1,
          'w-4/6': i === 2,
          'w-3/6': i >= 3,
        })} />
      ))}
    </div>
  )
}

// パフォーマンス最適化されたSuspenseラッパー
export const SuspenseWrapper = ({ 
  children, 
  fallback,
  errorFallback,
  className,
  name: _name = 'Component'
}: SuspenseWrapperProps) => {
  const defaultFallback = (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
        <p className="text-sm text-gray-400">読み込み中...</p>
      </div>
    </div>
  )

  const defaultErrorFallback = (
    <div className={cn('p-8 text-center', className)}>
      <div className="text-red-400 mb-2">⚠️</div>
      <p className="text-gray-400">コンテンツの読み込みに失敗しました</p>
    </div>
  )

  return (
    <ErrorBoundary fallback={errorFallback || defaultErrorFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

// 複数のコンポーネントを並列で読み込む
export const ParallelSuspense = ({ 
  components,
  className 
}: {
  components: Array<{
    component: ReactNode
    fallback?: ReactNode
    name?: string
  }>
  className?: string
}) => {
  return (
    <div className={className}>
      {components.map((item, index) => (
        <SuspenseWrapper
          key={index}
          fallback={item.fallback}
          name={item.name}
        >
          {item.component}
        </SuspenseWrapper>
      ))}
    </div>
  )
}

// プログレッシブローディング用のコンポーネント
export const ProgressiveLoader = ({
  stages,
  currentStage,
  className
}: {
  stages: string[]
  currentStage: number
  className?: string
}) => {
  return (
    <div className={cn('p-8 text-center', className)}>
      <div className="max-w-md mx-auto space-y-4">
        {/* プログレスバー */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStage / stages.length) * 100}%` }}
          />
        </div>
        
        {/* 現在のステージ */}
        <p className="text-sm text-gray-400">
          {stages[currentStage] || '読み込み中...'}
        </p>
        
        {/* ステージインジケーター */}
        <div className="flex justify-center space-x-2">
          {stages.map((_, index) => (
            <div
              key={index}
              className={cn('w-2 h-2 rounded-full transition-colors duration-300', {
                'bg-purple-500': index <= currentStage,
                'bg-gray-600': index > currentStage,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ストリーミング用のチャンクローダー
export const StreamingContent = ({ 
  chunks,
  interval = 100,
  className
}: {
  chunks: ReactNode[]
  interval?: number
  className?: string
}) => {
  return (
    <div className={className}>
      {chunks.map((chunk, index) => (
        <SuspenseWrapper
          key={index}
          fallback={
            <AdvancedSkeleton 
              variant="default" 
              rows={2}
              className="my-4" 
            />
          }
        >
          <div 
            style={{ 
              animationDelay: `${index * interval}ms` 
            }}
            className="animate-in fade-in slide-in-from-bottom-4"
          >
            {chunk}
          </div>
        </SuspenseWrapper>
      ))}
    </div>
  )
}