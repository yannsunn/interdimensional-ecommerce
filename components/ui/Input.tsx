'use client'

import { forwardRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

// === Input Types ===

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined
  error?: string | undefined
  hint?: string | undefined
  leftIcon?: React.ReactNode | undefined
  rightIcon?: React.ReactNode | undefined
  variant?: 'default' | 'ghost' | 'mystical' | undefined
  inputSize?: 'sm' | 'md' | 'lg' | undefined
  fullWidth?: boolean | undefined
}

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showPasswordToggle?: boolean | undefined
}

// === Input Variants ===

const inputVariants = {
  default: 'border-gray-600 bg-gray-900/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20',
  ghost: 'border-transparent bg-transparent text-white placeholder-gray-500 focus:border-purple-400 focus:ring-purple-400/20',
  mystical: 'border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 text-white placeholder-purple-300/60 focus:border-purple-400 focus:ring-purple-400/30'
}

const inputSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg'
}

// === Base Input Component ===

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    variant = 'default',
    inputSize = 'md',
    fullWidth = false,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2)}`
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-200"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base styles
              'w-full border rounded-lg backdrop-blur-sm transition-all duration-200',
              'focus:outline-none focus:ring-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              // Variant styles
              inputVariants[variant],
              // Size styles
              inputSizes[inputSize],
              // Icon padding adjustments
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              // Error state
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          
          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Hint */}
        {hint && !error && (
          <p className="text-sm text-gray-400">{hint}</p>
        )}
        
        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// === Password Input Component ===

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPasswordToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const togglePassword = () => {
      setShowPassword(!showPassword)
    }
    
    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          showPasswordToggle ? (
            <button
              type="button"
              onClick={togglePassword}
              className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          ) : undefined
        }
        {...props}
      />
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

// === Email Input Component ===

export interface EmailInputProps extends Omit<InputProps, 'type'> {}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        type="email"
        placeholder="your@email.com"
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        }
        {...props}
      />
    )
  }
)

EmailInput.displayName = 'EmailInput'

// === Search Input Component ===

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: ((query: string) => void) | undefined
  searchDelay?: number | undefined
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, searchDelay = 300, ...props }, ref) => {
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>()
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      
      // Clear existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
      
      // Set new timeout for search
      if (onSearch) {
        const timeout = setTimeout(() => {
          onSearch(query)
        }, searchDelay)
        setSearchTimeout(timeout)
      }
      
      // Call original onChange if provided
      props.onChange?.(e)
    }
    
    return (
      <Input
        ref={ref}
        type="search"
        placeholder="Search mystical products..."
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        onChange={handleChange}
        {...props}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'

// === Number Input Component ===

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  min?: number | undefined
  max?: number | undefined
  step?: number | undefined
  onChange?: ((value: number | null) => void) | undefined
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ min, max, step = 1, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const numValue = value === '' ? null : Number(value)
      
      onChange?.(numValue)
    }
    
    return (
      <Input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'

// Export all components
export default Input