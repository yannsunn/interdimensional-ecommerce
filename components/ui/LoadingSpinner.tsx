'use client'

import { cn } from '../../lib/utils'

// === Loading Spinner Types ===

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined
  variant?: 'default' | 'mystical' | 'dots' | 'pulse' | 'bounce' | undefined
  color?: 'white' | 'purple' | 'pink' | 'blue' | 'green' | undefined
  className?: string | undefined
  fullScreen?: boolean | undefined
  text?: string | undefined
}

// === Size Variants ===

const sizeVariants = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

// === Color Variants ===

const colorVariants = {
  white: 'border-white/30 border-t-white',
  purple: 'border-purple-500/30 border-t-purple-500',
  pink: 'border-pink-500/30 border-t-pink-500',
  blue: 'border-blue-500/30 border-t-blue-500',
  green: 'border-green-500/30 border-t-green-500'
}

const textColors = {
  white: 'text-white',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  blue: 'text-blue-400',
  green: 'text-green-400'
}

// === Default Spinner Component ===

function DefaultSpinner({ size = 'md', color = 'white', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full border-2 animate-spin',
        sizeVariants[size],
        colorVariants[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}

// === Mystical Spinner Component ===

function MysticalSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div className={cn('relative', sizeVariants[size], className)} role="status" aria-label="Loading">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
      
      {/* Inner ring */}
      <div className="absolute inset-2 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin animate-reverse" />
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
      </div>
      
      {/* Mystical sparkles */}
      <div className="absolute -inset-4 opacity-60">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping" />
        <div className="absolute bottom-0 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping animation-delay-300" />
        <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping animation-delay-700" />
      </div>
    </div>
  )
}

// === Dots Spinner Component ===

function DotsSpinner({ size = 'md', color = 'white', className }: LoadingSpinnerProps) {
  const dotSize = size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'
  
  return (
    <div className={cn('flex space-x-1', className)} role="status" aria-label="Loading">
      <div className={cn('rounded-full animate-bounce', dotSize, `bg-${color === 'white' ? 'white' : color}-500`)} />
      <div className={cn('rounded-full animate-bounce animation-delay-150', dotSize, `bg-${color === 'white' ? 'white' : color}-500`)} />
      <div className={cn('rounded-full animate-bounce animation-delay-300', dotSize, `bg-${color === 'white' ? 'white' : color}-500`)} />
    </div>
  )
}

// === Pulse Spinner Component ===

function PulseSpinner({ size = 'md', color = 'white', className }: LoadingSpinnerProps) {
  return (
    <div className={cn('relative', sizeVariants[size], className)} role="status" aria-label="Loading">
      <div className={cn(
        'absolute inset-0 rounded-full animate-ping',
        color === 'white' ? 'bg-white/20' : `bg-${color}-500/20`
      )} />
      <div className={cn(
        'absolute inset-2 rounded-full animate-ping animation-delay-300',
        color === 'white' ? 'bg-white/40' : `bg-${color}-500/40`
      )} />
      <div className={cn(
        'absolute inset-4 rounded-full animate-pulse',
        color === 'white' ? 'bg-white' : `bg-${color}-500`
      )} />
    </div>
  )
}

// === Bounce Spinner Component ===

function BounceSpinner({ size = 'md', color = 'white', className }: LoadingSpinnerProps) {
  const ballSize = size === 'xs' ? 'w-2 h-2' : size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'
  
  return (
    <div className={cn('flex space-x-2', className)} role="status" aria-label="Loading">
      <div className={cn(
        'rounded-full animate-bounce',
        ballSize,
        color === 'white' ? 'bg-white' : `bg-${color}-500`
      )} />
      <div className={cn(
        'rounded-full animate-bounce animation-delay-150',
        ballSize,
        color === 'white' ? 'bg-white' : `bg-${color}-500`
      )} />
    </div>
  )
}

// === Main Loading Spinner Component ===

export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  color = 'white',
  className,
  fullScreen = false,
  text,
  ...props
}: LoadingSpinnerProps) {
  const renderSpinner = () => {
    switch (variant) {
      case 'mystical':
        return <MysticalSpinner size={size} className={className} {...props} />
      case 'dots':
        return <DotsSpinner size={size} color={color} className={className} {...props} />
      case 'pulse':
        return <PulseSpinner size={size} color={color} className={className} {...props} />
      case 'bounce':
        return <BounceSpinner size={size} color={color} className={className} {...props} />
      default:
        return <DefaultSpinner size={size} color={color} className={className} {...props} />
    }
  }
  
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {renderSpinner()}
      {text && (
        <p className={cn(
          'font-medium',
          textSizes[size],
          textColors[color]
        )}>
          {text}
        </p>
      )}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }
  
  return content
}

// === Loading Overlay Component ===

export interface LoadingOverlayProps extends LoadingSpinnerProps {
  isLoading: boolean
  children: React.ReactNode
  overlay?: boolean
}

export function LoadingOverlay({
  isLoading,
  children,
  overlay = true,
  ...spinnerProps
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center z-10',
          overlay && 'bg-black/50 backdrop-blur-sm'
        )}>
          <LoadingSpinner {...spinnerProps} />
        </div>
      )}
    </div>
  )
}

// === Loading Button Component ===

export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  spinnerSize?: LoadingSpinnerProps['size']
  spinnerVariant?: LoadingSpinnerProps['variant']
  spinnerColor?: LoadingSpinnerProps['color']
}

export function LoadingButton({
  isLoading = false,
  loadingText,
  spinnerSize = 'sm',
  spinnerVariant = 'default',
  spinnerColor = 'white',
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center gap-2',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner
          size={spinnerSize}
          variant={spinnerVariant}
          color={spinnerColor}
        />
      )}
      <span className={cn(isLoading && 'opacity-70')}>
        {isLoading && loadingText ? loadingText : children}
      </span>
    </button>
  )
}

// === Loading Card Component ===

export interface LoadingCardProps {
  lines?: number
  className?: string
  animate?: boolean
}

export function LoadingCard({ lines = 3, className, animate = true }: LoadingCardProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header skeleton */}
      <div className={cn(
        'h-4 bg-gray-700 rounded',
        animate && 'animate-pulse'
      )} />
      
      {/* Content lines skeleton */}
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-3 bg-gray-700 rounded',
            animate && 'animate-pulse',
            index === lines - 1 && 'w-3/4' // Last line shorter
          )}
          style={{
            animationDelay: animate ? `${index * 100}ms` : undefined
          }}
        />
      ))}
    </div>
  )
}

// === Quantum Loading Effect ===

export function QuantumLoader({ size = 'md', className }: Pick<LoadingSpinnerProps, 'size' | 'className'>) {
  return (
    <div className={cn('relative', sizeVariants[size], className)} role="status" aria-label="Quantum Loading">
      {/* Quantum particles */}
      <div className="absolute inset-0">
        {/* Proton */}
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-spin" 
             style={{ transformOrigin: '0 20px', animationDuration: '2s' }} />
        
        {/* Electron */}
        <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-red-400 rounded-full animate-spin" 
             style={{ transformOrigin: '20px 0', animationDuration: '1.5s', animationDirection: 'reverse' }} />
        
        {/* Neutron */}
        <div className="absolute bottom-0 right-1/2 w-0.5 h-0.5 bg-green-400 rounded-full animate-spin" 
             style={{ transformOrigin: '0 -20px', animationDuration: '3s' }} />
      </div>
      
      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
      </div>
      
      {/* Quantum field */}
      <div className="absolute -inset-2 border border-purple-500/20 rounded-full animate-ping" />
    </div>
  )
}

// Export all components
export default LoadingSpinner