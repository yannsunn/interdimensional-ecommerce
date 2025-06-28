/**
 * 🚨 ErrorBoundary - 統一エラーハンドリングシステム
 * 
 * React Error Boundaryを使用してアプリケーション全体のエラーを管理
 * ユーザーフレンドリーなエラー表示とログ収集を提供
 */

'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { cn } from '../../lib/design-system'
import { gradients, typography, animations, effects, layout } from '../../lib/design-system'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error | undefined
  errorInfo?: ErrorInfo | undefined
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })
    
    // カスタムエラーハンドラー呼び出し
    this.props.onError?.(error, errorInfo)
    
    // エラーログの送信（本番環境では外部サービスに送信）
    this.logError(error, errorInfo)
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    // 開発環境では詳細なログを出力
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary - Detailed Error Log')
      console.error('Error:', error)
      console.error('Component Stack:', errorInfo.componentStack)
      console.error('Error Stack:', error.stack)
      console.groupEnd()
    }
    
    // 本番環境では外部ログサービスに送信
    // TODO: Sentry, LogRocket等のサービスに送信
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // カスタムフォールバックUIが提供されている場合
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      // デフォルトのエラーUI
      return <ErrorFallback error={this.state.error || new Error('Unknown error')} onReset={this.handleReset} />
    }

    return this.props.children
  }
}

/**
 * デフォルトエラーフォールバックUI
 */
interface ErrorFallbackProps {
  error: Error
  onReset: () => void
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center',
      'bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900',
      'text-white p-6'
    )}>
      <div className={cn(layout.container.sm)}>
        <div className="text-center space-y-8">
          {/* エラーアイコン */}
          <div className="relative">
            <div className={cn(
              'text-8xl md:text-9xl opacity-60',
              animations.bounce
            )}>
              🌀
            </div>
            <div className={cn(
              'absolute inset-0 text-8xl md:text-9xl opacity-20',
              effects.blur.lg
            )}>
              🌀
            </div>
          </div>
          
          {/* エラーメッセージ */}
          <div className="space-y-4">
            <h1 className={cn(
              typography.h2,
              'text-transparent bg-clip-text bg-gradient-to-r',
              gradients.primary,
              'leading-tight'
            )}>
              異次元エラーが発生しました
            </h1>
            
            <p className={cn(
              typography.body.lg,
              'text-gray-300 leading-relaxed max-w-2xl mx-auto'
            )}>
              申し訳ございません。時空間の歪みにより、予期しないエラーが発生いたしました。
              <br />
              しばらくお待ちいただくか、ページを再読み込みしてください。
            </p>
          </div>
          
          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReset}
              className={cn(
                'relative overflow-hidden',
                'bg-gradient-to-r', gradients.cosmic,
                'hover:from-purple-700 hover:to-indigo-700',
                'text-white font-bold rounded-xl',
                'px-8 py-4 md:px-10 md:py-5',
                animations.transition.all,
                animations.hover.scale,
                effects.shadow['2xl']
              )}
            >
              🔄 再試行する
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className={cn(
                'relative overflow-hidden',
                'border-2 border-cyan-400/70',
                'bg-cyan-400/10 hover:bg-cyan-400/80',
                'text-cyan-300 hover:text-white',
                'font-bold rounded-xl',
                'px-8 py-4 md:px-10 md:py-5',
                animations.transition.all,
                animations.hover.scale,
                effects.shadow['2xl'],
                'backdrop-blur-sm'
              )}
            >
              🏠 ホームに戻る
            </button>
          </div>
          
          {/* エラー詳細（開発環境のみ） */}
          {process.env.NODE_ENV === 'development' && error && (
            <ErrorDetails error={error} />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * エラー詳細表示（開発環境用）
 */
function ErrorDetails({ error }: { error: Error }) {
  return (
    <details className="text-left max-w-4xl mx-auto mt-8">
      <summary className={cn(
        'cursor-pointer text-yellow-400 font-semibold mb-4',
        'hover:text-yellow-300',
        animations.transition.all
      )}>
        🔍 エラー詳細（開発環境）
      </summary>
      
      <div className={cn(
        effects.glass.dark,
        'bg-red-900/20 border border-red-400/30',
        'rounded-xl p-6 space-y-4'
      )}>
        <div>
          <h4 className="text-red-300 font-semibold mb-2">エラーメッセージ:</h4>
          <pre className="text-red-200 text-sm overflow-x-auto bg-black/30 p-3 rounded">
            {error.message}
          </pre>
        </div>
        
        {error.stack && (
          <div>
            <h4 className="text-red-300 font-semibold mb-2">スタックトレース:</h4>
            <pre className="text-red-200 text-xs overflow-x-auto bg-black/30 p-3 rounded max-h-40">
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </details>
  )
}

/**
 * 特定コンポーネント用のError Boundary HOC
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

/**
 * エラー報告フック
 */
export function useErrorHandler() {
  return (error: Error, context?: string) => {
    console.error(`Error in ${context || 'Unknown context'}:`, error)
    
    // 本番環境では外部サービスに送信
    if (process.env.NODE_ENV === 'production') {
      // TODO: エラー追跡サービスに送信
    }
  }
}