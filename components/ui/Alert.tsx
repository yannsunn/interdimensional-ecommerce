'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

// === Alert Types ===

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error' | undefined
  title?: string | undefined
  message: string
  variant?: 'default' | 'filled' | 'outlined' | 'mystical' | undefined
  size?: 'sm' | 'md' | 'lg' | undefined
  icon?: React.ReactNode | boolean | undefined
  dismissible?: boolean | undefined
  onDismiss?: (() => void) | undefined
  autoHide?: boolean | undefined
  autoHideDelay?: number | undefined
  className?: string | undefined
  action?: {
    label: string
    onClick: () => void
  } | undefined
}

export interface ToastProps extends AlertProps {
  id: string
  isVisible: boolean
}

// === Alert Variants ===

const alertTypeStyles = {
  info: {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    filled: 'bg-blue-600 border-blue-600 text-white',
    outlined: 'bg-transparent border-blue-500 text-blue-400',
    mystical: 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30 text-blue-300'
  },
  success: {
    default: 'bg-green-50 border-green-200 text-green-800',
    filled: 'bg-green-600 border-green-600 text-white',
    outlined: 'bg-transparent border-green-500 text-green-400',
    mystical: 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30 text-green-300'
  },
  warning: {
    default: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    filled: 'bg-yellow-600 border-yellow-600 text-white',
    outlined: 'bg-transparent border-yellow-500 text-yellow-400',
    mystical: 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30 text-yellow-300'
  },
  error: {
    default: 'bg-red-50 border-red-200 text-red-800',
    filled: 'bg-red-600 border-red-600 text-white',
    outlined: 'bg-transparent border-red-500 text-red-400',
    mystical: 'bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-500/30 text-red-300'
  }
}

const alertSizes = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg'
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

// === Alert Icons ===

const defaultIcons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon
}

// === Main Alert Component ===

export function Alert({
  type = 'info',
  title,
  message,
  variant = 'default',
  size = 'md',
  icon = true,
  dismissible = false,
  onDismiss,
  autoHide = false,
  autoHideDelay = 5000,
  className,
  action,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  // Auto hide functionality
  useEffect(() => {
    if (autoHide && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoHideDelay)
      
      return () => clearTimeout(timer)
    }
    return undefined
  }, [autoHide, autoHideDelay])
  
  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }
  
  const IconComponent = defaultIcons[type]
  const showIcon = icon !== false
  const customIcon = typeof icon === 'object' ? icon : null
  
  if (!isVisible) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'flex items-start gap-3 border rounded-lg backdrop-blur-sm',
        alertTypeStyles[type][variant],
        alertSizes[size],
        variant === 'mystical' && 'shadow-lg',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      {showIcon && (
        <div className="flex-shrink-0 mt-0.5">
          {customIcon || (
            <IconComponent className={cn(iconSizes[size])} />
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold mb-1">
            {title}
          </h4>
        )}
        <p className={cn('leading-relaxed', !title && 'font-medium')}>
          {message}
        </p>
        
        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              'mt-3 text-sm font-medium underline hover:no-underline transition-all',
              variant === 'filled' ? 'text-white/80 hover:text-white' : 'opacity-80 hover:opacity-100'
            )}
          >
            {action.label}
          </button>
        )}
      </div>
      
      {/* Dismiss Button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 p-1 rounded-md transition-colors',
            variant === 'filled' 
              ? 'hover:bg-white/10 text-white/70 hover:text-white' 
              : 'hover:bg-black/5 opacity-60 hover:opacity-100'
          )}
          aria-label="Dismiss alert"
        >
          <XMarkIcon className={cn(iconSizes[size])} />
        </button>
      )}
    </motion.div>
  )
}

// === Toast Notification System ===

export interface ToastContextType {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, 'id' | 'isVisible'>) => string
  removeToast: (id: string) => void
  clearToasts: () => void
}

let toastId = 0
const generateToastId = () => `toast-${++toastId}-${Date.now()}`

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  
  const addToast = (toast: Omit<ToastProps, 'id' | 'isVisible'>) => {
    const id = generateToastId()
    const newToast: ToastProps = {
      ...toast,
      id,
      isVisible: true,
      autoHide: toast.autoHide ?? true,
      autoHideDelay: toast.autoHideDelay ?? 5000
    }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove toast
    if (newToast.autoHide) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.autoHideDelay)
    }
    
    return id
  }
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }
  
  const clearToasts = () => {
    setToasts([])
  }
  
  // Convenience methods
  const showSuccess = (message: string, options?: Partial<ToastProps>) => 
    addToast({ type: 'success', message, ...options })
  
  const showError = (message: string, options?: Partial<ToastProps>) => 
    addToast({ type: 'error', message, ...options })
  
  const showWarning = (message: string, options?: Partial<ToastProps>) => 
    addToast({ type: 'warning', message, ...options })
  
  const showInfo = (message: string, options?: Partial<ToastProps>) => 
    addToast({ type: 'info', message, ...options })
  
  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}

// === Toast Container Component ===

export interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
  className?: string
}

export function ToastContainer({
  position = 'top-right',
  maxToasts = 5,
  className
}: ToastContainerProps) {
  const { toasts, removeToast } = useToast()
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }
  
  // Limit number of toasts
  const visibleToasts = toasts.slice(-maxToasts)
  
  return (
    <div className={cn(
      'fixed z-50 flex flex-col gap-2 pointer-events-none',
      positionClasses[position],
      className
    )}>
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: position.includes('right') ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position.includes('right') ? 100 : -100 }}
            className="pointer-events-auto max-w-sm w-full"
          >
            <Alert
              {...toast}
              dismissible
              onDismiss={() => removeToast(toast.id)}
              variant="mystical"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// === Banner Alert Component ===

export interface BannerAlertProps extends Omit<AlertProps, 'size'> {
  sticky?: boolean
}

export function BannerAlert({
  sticky = false,
  className,
  ...props
}: BannerAlertProps) {
  return (
    <div className={cn(
      'w-full',
      sticky && 'sticky top-0 z-40',
      className
    )}>
      <Alert
        {...props}
        size="md"
        className="rounded-none border-x-0"
      />
    </div>
  )
}

// === Inline Alert Component ===

export function InlineAlert(props: AlertProps) {
  return (
    <Alert
      {...props}
      variant="outlined"
      size="sm"
      dismissible={false}
    />
  )
}

// === Status Alert Component ===

export interface StatusAlertProps {
  status: 'loading' | 'success' | 'error' | 'idle'
  loadingMessage?: string
  successMessage?: string
  errorMessage?: string
  className?: string
}

export function StatusAlert({
  status,
  loadingMessage = 'Loading...',
  successMessage = 'Success!',
  errorMessage = 'An error occurred',
  className
}: StatusAlertProps) {
  if (status === 'idle') return null
  
  const getAlertProps = () => {
    switch (status) {
      case 'loading':
        return {
          type: 'info' as const,
          message: loadingMessage,
          icon: (
            <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
          )
        }
      case 'success':
        return {
          type: 'success' as const,
          message: successMessage
        }
      case 'error':
        return {
          type: 'error' as const,
          message: errorMessage
        }
      default:
        return { type: 'info' as const, message: '' }
    }
  }
  
  return (
    <Alert
      {...getAlertProps()}
      variant="mystical"
      size="sm"
      className={className}
    />
  )
}

// Export all components
export default Alert