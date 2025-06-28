'use client'

import { forwardRef } from 'react'
import { Input, InputProps, PasswordInput, EmailInput, NumberInput } from '../ui/Input'

// Mobile-optimized utility function
const cn = (...classes: (string | undefined | null | false)[]) => 
  classes.filter(Boolean).join(' ')

// === Form Field Types ===

export interface FormFieldProps extends Omit<InputProps, 'error'> {
  name: string
  errors?: string[] | undefined
  touched?: boolean | undefined
  showErrors?: boolean | undefined
}

export interface FormFieldWrapperProps {
  children: React.ReactNode
  label?: string | undefined
  name: string
  errors?: string[] | undefined
  touched?: boolean | undefined
  showErrors?: boolean | undefined
  required?: boolean | undefined
  hint?: string | undefined
  className?: string | undefined
}

// === Form Field Wrapper Component ===

export const FormFieldWrapper = forwardRef<HTMLDivElement, FormFieldWrapperProps>(
  ({
    children,
    label,
    name,
    errors = [],
    touched = false,
    showErrors = true,
    required = false,
    hint,
    className,
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={fieldId}
            className="block text-sm font-medium text-gray-200"
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        {/* Input Field */}
        <div className="relative">
          {children}
        </div>
        
        {/* Hint */}
        {hint && !hasErrors && (
          <p className="text-sm text-gray-400">{hint}</p>
        )}
        
        {/* Error Messages */}
        {hasErrors && (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-400 flex items-center gap-1">
                <span className="text-xs">⚠</span>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }
)

FormFieldWrapper.displayName = 'FormFieldWrapper'

// === Generic Form Field Component ===

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    label,
    hint,
    required,
    className,
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        required={required}
        hint={hint}
        className={className}
      >
        <Input
          ref={ref}
          id={fieldId}
          name={name}
          error={hasErrors ? errors[0] : undefined}
          required={required}
          {...props}
        />
      </FormFieldWrapper>
    )
  }
)

FormField.displayName = 'FormField'

// === Password Form Field ===

export interface PasswordFormFieldProps extends Omit<FormFieldProps, 'type'> {
  showPasswordToggle?: boolean | undefined
}

export const PasswordFormField = forwardRef<HTMLInputElement, PasswordFormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    showPasswordToggle = true,
    label = 'パスワード',
    hint,
    required,
    className,
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        required={required}
        hint={hint}
        className={className}
      >
        <PasswordInput
          ref={ref}
          id={fieldId}
          name={name}
          error={hasErrors ? errors[0] : undefined}
          required={required}
          showPasswordToggle={showPasswordToggle}
          {...props}
        />
      </FormFieldWrapper>
    )
  }
)

PasswordFormField.displayName = 'PasswordFormField'

// === Email Form Field ===

export interface EmailFormFieldProps extends Omit<FormFieldProps, 'type'> {}

export const EmailFormField = forwardRef<HTMLInputElement, EmailFormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    label = 'メールアドレス',
    hint,
    required,
    className,
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        required={required}
        hint={hint}
        className={className}
      >
        <EmailInput
          ref={ref}
          id={fieldId}
          name={name}
          error={hasErrors ? errors[0] : undefined}
          required={required}
          {...props}
        />
      </FormFieldWrapper>
    )
  }
)

EmailFormField.displayName = 'EmailFormField'

// === Number Form Field ===

export interface NumberFormFieldProps extends Omit<FormFieldProps, 'type' | 'onChange'> {
  min?: number | undefined
  max?: number | undefined
  step?: number | undefined
  onChange?: ((value: number | null) => void) | undefined
}

export const NumberFormField = forwardRef<HTMLInputElement, NumberFormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    label,
    hint,
    required,
    className,
    min,
    max,
    step,
    onChange,
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        required={required}
        hint={hint}
        className={className}
      >
        <NumberInput
          ref={ref}
          id={fieldId}
          name={name}
          error={hasErrors ? errors[0] : undefined}
          required={required}
          min={min}
          max={max}
          step={step}
          {...props}
        />
      </FormFieldWrapper>
    )
  }
)

NumberFormField.displayName = 'NumberFormField'

// === Textarea Form Field ===

export interface TextareaFormFieldProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'id'> {
  name: string
  errors?: string[] | undefined
  touched?: boolean | undefined
  showErrors?: boolean | undefined
  label?: string | undefined
  hint?: string | undefined
  required?: boolean | undefined
  rows?: number | undefined
  resize?: boolean | undefined
}

export const TextareaFormField = forwardRef<HTMLTextAreaElement, TextareaFormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    label,
    hint,
    required,
    className,
    rows = 4,
    resize = true,
    ...textareaProps
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        required={required}
        hint={hint}
        className={className}
      >
        <textarea
          ref={ref}
          id={fieldId}
          name={name}
          rows={rows}
          className={cn(
            // Base styles
            'w-full border rounded-lg backdrop-blur-sm transition-all duration-200 px-4 py-3 sm:py-3',
            'text-base sm:text-sm', // Prevent zoom on iOS
            'min-h-[44px]', // Mobile touch target
            'focus:outline-none focus:ring-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Theme styles
            'border-gray-600 bg-gray-900/50 text-white placeholder-gray-400',
            'focus:border-purple-400 focus:ring-purple-400/20',
            // Error state
            hasErrors && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            // Resize
            !resize && 'resize-none',
            className
          )}
          {...textareaProps}
        />
      </FormFieldWrapper>
    )
  }
)

TextareaFormField.displayName = 'TextareaFormField'

// === Select Form Field ===

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean | undefined
}

export interface SelectFormFieldProps extends Omit<FormFieldProps, 'type'> {
  options: SelectOption[]
  placeholder?: string | undefined
}

export const SelectFormField = forwardRef<HTMLSelectElement, SelectFormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    label,
    hint,
    required,
    className,
    options,
    placeholder = '選択してください',
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        required={required}
        hint={hint}
        className={className}
      >
        <select
          ref={ref}
          id={fieldId}
          name={name}
          className={cn(
            // Base styles
            'w-full border rounded-lg backdrop-blur-sm transition-all duration-200 px-4 py-3 sm:py-3',
            'text-base sm:text-sm', // Prevent zoom on iOS
            'min-h-[44px]', // Mobile touch target
            'focus:outline-none focus:ring-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Theme styles
            'border-gray-600 bg-gray-900/50 text-white',
            'focus:border-purple-400 focus:ring-purple-400/20',
            // Error state
            hasErrors && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...(props as any)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </FormFieldWrapper>
    )
  }
)

SelectFormField.displayName = 'SelectFormField'

// === Checkbox Form Field ===

export interface CheckboxFormFieldProps extends Omit<FormFieldProps, 'type'> {
  checkboxLabel?: string | undefined
}

export const CheckboxFormField = forwardRef<HTMLInputElement, CheckboxFormFieldProps>(
  ({
    name,
    errors = [],
    touched = false,
    showErrors = true,
    label,
    checkboxLabel,
    hint,
    required,
    className,
    ...props
  }, ref) => {
    const hasErrors = showErrors && touched && errors.length > 0
    const fieldId = `field-${name}`
    
    return (
      <FormFieldWrapper
        name={name}
        errors={errors}
        touched={touched}
        showErrors={showErrors}
        hint={hint}
        className={className}
      >
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={fieldId}
            name={name}
            className={cn(
              'mt-1 w-5 h-5 sm:w-4 sm:h-4 rounded border-gray-600 bg-gray-900 text-purple-600',
              'min-w-[20px] min-h-[20px] sm:min-w-[16px] sm:min-h-[16px]', // Better mobile touch target
              'focus:ring-purple-500 focus:ring-offset-gray-900',
              hasErrors && 'border-red-500'
            )}
            {...props}
          />
          <label htmlFor={fieldId} className="text-sm text-gray-200">
            {checkboxLabel || label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        </div>
      </FormFieldWrapper>
    )
  }
)

CheckboxFormField.displayName = 'CheckboxFormField'

// Export all components
export default FormField