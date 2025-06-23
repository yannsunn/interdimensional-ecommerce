'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Alert } from './Alert'
import { LoadingSpinner } from './LoadingSpinner'

// === Error Boundary Types ===

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  retryCount: number
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, retry: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  maxRetries?: number
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
}

// === Error Boundary Component ===

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null
  
  constructor(props: ErrorBoundaryProps) {
    super(props)
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    }
  }
  
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }
  
  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props
    const { hasError } = this.state
    
    if (hasError && prevProps.children !== this.props.children && resetOnPropsChange) {
      this.resetErrorBoundary()
    }
    
    if (hasError && resetKeys) {
      const prevResetKeys = prevProps.resetKeys || []
      const hasResetKeyChanged = resetKeys.some((key, index) => key !== prevResetKeys[index])
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary()
      }
    }
  }
  
  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1
    })
  }
  
  handleRetry = () => {
    const { maxRetries = 3 } = this.props
    
    if (this.state.retryCount < maxRetries) {
      this.resetErrorBoundary()
    }
  }
  
  render() {
    const { hasError, error, retryCount } = this.state
    const { children, fallback, maxRetries = 3 } = this.props
    
    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.handleRetry)
      }
      
      // Default error UI
      return (
        <DefaultErrorFallback 
          error={error}
          retry={this.handleRetry}
          retryCount={retryCount}
          maxRetries={maxRetries}
        />
      )
    }
    
    return children
  }
}

// === Default Error Fallback ===

interface DefaultErrorFallbackProps {
  error: Error
  retry: () => void
  retryCount: number
  maxRetries: number
}

function DefaultErrorFallback({ error, retry, retryCount, maxRetries }: DefaultErrorFallbackProps) {
  const canRetry = retryCount < maxRetries
  
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="text-6xl mb-4">💥</div>
        
        {/* Error Alert */}
        <Alert
          type="error"
          variant="mystical"
          title="異次元エラーが発生しました"
          message={process.env.NODE_ENV === 'development' ? error.message : '予期しないエラーが発生しました'}
          className="mb-6"
        />
        
        {/* Error Details in Development */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-300 mb-2">
              エラーの詳細を表示
            </summary>
            <pre className="text-xs text-red-400 overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        )}
        
        {/* Retry Button */}
        {canRetry && (
          <button
            onClick={retry}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            もう一度試す ({maxRetries - retryCount}回まで)
          </button>
        )}
        
        {/* Max Retries Reached */}
        {!canRetry && (
          <div className="text-gray-400 text-sm">
            再試行回数が上限に達しました。ページを再読み込みしてください。
          </div>
        )}
      </div>
    </div>
  )
}

// === Async Error Boundary Hook ===

import { useState, useEffect } from 'react'

export function useAsyncError() {
  const [error, setError] = useState<Error | null>(null)
  
  const throwError = (error: Error) => {
    setError(error)
  }
  
  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])
  
  return throwError
}

// === HOC for Error Boundary ===

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// === Custom Error Fallbacks ===

export function LoadingErrorFallback({ 
  error, 
  retry 
}: { 
  error: Error
  retry: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <LoadingSpinner variant="mystical" size="lg" />
      <Alert
        type="warning"
        variant="mystical"
        message="データの読み込み中にエラーが発生しました"
        action={{
          label: 'もう一度試す',
          onClick: retry
        }}
      />
    </div>
  )
}

export function ProductErrorFallback({ 
  error, 
  retry 
}: { 
  error: Error
  retry: () => void 
}) {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">🛒</div>
      <h3 className="text-lg font-semibold text-white mb-2">商品の読み込みに失敗しました</h3>
      <p className="text-gray-400 text-sm mb-4">異次元の通信に問題があるようです</p>
      <button
        onClick={retry}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      >
        再試行
      </button>
    </div>
  )
}

export function CartErrorFallback({ 
  error, 
  retry 
}: { 
  error: Error
  retry: () => void 
}) {
  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">🛒💥</div>
      <h3 className="text-lg font-semibold text-white mb-2">カートでエラーが発生しました</h3>
      <p className="text-gray-400 text-sm mb-4">異次元カートの魔法が乱れています</p>
      <button
        onClick={retry}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      >
        カートを復旧
      </button>
    </div>
  )
}

// === Global Error Handler ===

export function setupGlobalErrorHandler() {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    // Prevent the default browser error handling
    event.preventDefault()
    
    // You could show a toast notification here
    // toast.error('予期しないエラーが発生しました')
  })
  
  // Handle global errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    
    // You could report to an error tracking service here
    // errorTracker.captureException(event.error)
  })
}

// === Error Reporting Utilities ===

export function reportError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error reported:', error, context)
    return
  }
  
  // In production, you would send this to an error tracking service
  // like Sentry, LogRocket, etc.
  
  try {
    // Example: Sentry integration
    // Sentry.captureException(error, { extra: context })
    
    // Example: Custom error tracking
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        context,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch(() => {
      // Silently fail if error reporting fails
    })
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError)
  }
}

// Export all components and utilities
export default ErrorBoundary