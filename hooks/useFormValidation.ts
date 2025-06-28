import { useState, useCallback, useMemo } from 'react'
import { validateRequired, validateEmail, validatePassword } from '../lib/type-utils'

// === Form Validation Types ===

export interface ValidationRule<T = any> {
  required?: boolean | undefined
  email?: boolean | undefined
  password?: boolean | undefined
  min?: number | undefined
  max?: number | undefined
  minLength?: number | undefined
  maxLength?: number | undefined
  pattern?: RegExp | undefined
  custom?: ((value: T) => string | null) | undefined
}

export interface FieldConfig<T = any> {
  name: keyof T
  rules?: ValidationRule<T[keyof T]> | undefined
  initialValue?: T[keyof T] | undefined
}

export interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string[]>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
}

export interface FormActions<T> {
  setValue: (name: keyof T, value: T[keyof T]) => void
  setValues: (values: Partial<T>) => void
  setError: (name: keyof T, error: string | string[]) => void
  setErrors: (errors: Partial<Record<keyof T, string | string[]>>) => void
  setTouched: (name: keyof T, touched: boolean) => void
  setTouchedAll: () => void
  setSubmitting: (isSubmitting: boolean) => void
  validateField: (name: keyof T) => string[]
  validateForm: () => boolean
  resetForm: () => void
  resetField: (name: keyof T) => void
}

// === Validation Functions ===

const validateField = <T>(value: T, rules: ValidationRule<T> = {}): string[] => {
  const errors: string[] = []
  
  // Required validation
  if (rules.required) {
    const error = validateRequired(value, 'This field')
    if (error) errors.push(error)
  }
  
  // Skip other validations if value is empty and not required
  if (!value && !rules.required) return errors
  
  // Email validation
  if (rules.email && typeof value === 'string') {
    const error = validateEmail(value)
    if (error) errors.push(error)
  }
  
  // Password validation
  if (rules.password && typeof value === 'string') {
    const error = validatePassword(value)
    if (error) errors.push(error)
  }
  
  // Min/Max validation for numbers
  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      errors.push(`Value must be at least ${rules.min}`)
    }
    if (rules.max !== undefined && value > rules.max) {
      errors.push(`Value must be at most ${rules.max}`)
    }
  }
  
  // Min/Max length validation for strings
  if (typeof value === 'string') {
    if (rules.minLength !== undefined && value.length < rules.minLength) {
      errors.push(`Must be at least ${rules.minLength} characters`)
    }
    if (rules.maxLength !== undefined && value.length > rules.maxLength) {
      errors.push(`Must be at most ${rules.maxLength} characters`)
    }
  }
  
  // Pattern validation
  if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
    errors.push('Invalid format')
  }
  
  // Custom validation
  if (rules.custom) {
    const error = rules.custom(value)
    if (error) errors.push(error)
  }
  
  return errors
}

// === Main Hook ===

export function useFormValidation<T extends Record<string, any>>(
  fields: FieldConfig<T>[],
  options: {
    validateOnChange?: boolean
    validateOnBlur?: boolean
    validateOnSubmit?: boolean
  } = {}
) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    validateOnSubmit = true
  } = options
  
  // Create field map for quick lookup
  const fieldMap = useMemo(() => {
    const map = new Map<keyof T, FieldConfig<T>>()
    fields.forEach(field => map.set(field.name, field))
    return map
  }, [fields])
  
  // Create initial values
  const initialValues = useMemo(() => {
    const values = {} as T
    fields.forEach(field => {
      values[field.name] = field.initialValue as T[keyof T]
    })
    return values
  }, [fields])
  
  // Form state
  const [state, setState] = useState<FormState<T>>(() => ({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    isDirty: false
  }))
  
  // Update validity and dirty state
  const updateMetaState = useCallback((newState: Partial<FormState<T>>) => {
    setState(prevState => {
      const updatedState = { ...prevState, ...newState }
      
      // Calculate if form is valid
      const hasErrors = Object.values(updatedState.errors).some(
        errors => Array.isArray(errors) && errors.length > 0
      )
      updatedState.isValid = !hasErrors
      
      // Calculate if form is dirty
      const isDirty = Object.keys(updatedState.values).some(
        key => updatedState.values[key as keyof T] !== initialValues[key as keyof T]
      )
      updatedState.isDirty = isDirty
      
      return updatedState
    })
  }, [initialValues])
  
  // Actions
  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    const newValues = { ...state.values, [name]: value }
    const newState: Partial<FormState<T>> = { values: newValues }
    
    // Validate on change if enabled
    if (validateOnChange) {
      const field = fieldMap.get(name)
      if (field?.rules) {
        const errors = validateField(value, field.rules)
        newState.errors = {
          ...state.errors,
          [name]: errors
        }
      }
    }
    
    updateMetaState(newState)
  }, [state.values, state.errors, fieldMap, validateOnChange, updateMetaState])
  
  const setValues = useCallback((values: Partial<T>) => {
    const newValues = { ...state.values, ...values }
    const newState: Partial<FormState<T>> = { values: newValues }
    
    // Validate all changed fields if enabled
    if (validateOnChange) {
      const newErrors = { ...state.errors }
      Object.keys(values).forEach(key => {
        const name = key as keyof T
        const field = fieldMap.get(name)
        if (field?.rules) {
          const errors = validateField(values[name] as any, field.rules)
          newErrors[name] = errors
        }
      })
      newState.errors = newErrors
    }
    
    updateMetaState(newState)
  }, [state.values, state.errors, fieldMap, validateOnChange, updateMetaState])
  
  const setError = useCallback((name: keyof T, error: string | string[]) => {
    const errors = Array.isArray(error) ? error : [error]
    updateMetaState({
      errors: {
        ...state.errors,
        [name]: errors
      }
    })
  }, [state.errors, updateMetaState])
  
  const setErrors = useCallback((errors: Partial<Record<keyof T, string | string[]>>) => {
    const normalizedErrors: Partial<Record<keyof T, string[]>> = {}
    Object.keys(errors).forEach(key => {
      const name = key as keyof T
      const error = errors[name]
      if (error) {
        normalizedErrors[name] = Array.isArray(error) ? error : [error]
      }
    })
    
    updateMetaState({
      errors: {
        ...state.errors,
        ...normalizedErrors
      }
    })
  }, [state.errors, updateMetaState])
  
  const setTouched = useCallback((name: keyof T, touched: boolean) => {
    const newTouched = { ...state.touched, [name]: touched }
    const newState: Partial<FormState<T>> = { touched: newTouched }
    
    // Validate on blur if enabled and field is being touched
    if (validateOnBlur && touched) {
      const field = fieldMap.get(name)
      if (field?.rules) {
        const errors = validateField(state.values[name], field.rules)
        newState.errors = {
          ...state.errors,
          [name]: errors
        }
      }
    }
    
    updateMetaState(newState)
  }, [state.touched, state.errors, state.values, fieldMap, validateOnBlur, updateMetaState])
  
  const setTouchedAll = useCallback(() => {
    const newTouched: Partial<Record<keyof T, boolean>> = {}
    fields.forEach(field => {
      newTouched[field.name] = true
    })
    updateMetaState({ touched: newTouched })
  }, [fields, updateMetaState])
  
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    updateMetaState({ isSubmitting })
  }, [updateMetaState])
  
  const validateFieldAction = useCallback((name: keyof T) => {
    const field = fieldMap.get(name)
    if (!field?.rules) return []
    
    const errors = validateField(state.values[name], field.rules)
    updateMetaState({
      errors: {
        ...state.errors,
        [name]: errors
      }
    })
    
    return errors
  }, [state.values, state.errors, fieldMap, updateMetaState])
  
  const validateForm = useCallback(() => {
    if (!validateOnSubmit) return true
    
    const newErrors: Partial<Record<keyof T, string[]>> = {}
    let isValid = true
    
    fields.forEach(field => {
      if (field.rules) {
        const errors = validateField(state.values[field.name], field.rules)
        newErrors[field.name] = errors
        if (errors.length > 0) {
          isValid = false
        }
      }
    })
    
    const touchedEntries: Array<[keyof T, boolean]> = fields.map(field => [field.name, true])
    updateMetaState({
      errors: newErrors,
      touched: Object.fromEntries(touchedEntries) as Partial<Record<keyof T, boolean>>
    })
    
    return isValid
  }, [fields, state.values, validateOnSubmit, updateMetaState])
  
  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
      isDirty: false
    })
  }, [initialValues])
  
  const resetField = useCallback((name: keyof T) => {
    updateMetaState({
      values: {
        ...state.values,
        [name]: initialValues[name]
      },
      errors: {
        ...state.errors,
        [name]: []
      },
      touched: {
        ...state.touched,
        [name]: false
      }
    })
  }, [state.values, state.errors, state.touched, initialValues, updateMetaState])
  
  // Helper function to get field props
  const getFieldProps = useCallback((name: keyof T) => ({
    name: name as string,
    value: state.values[name],
    errors: state.errors[name] || [],
    touched: state.touched[name] || false,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValue(name, e.target.value as T[keyof T])
    },
    onBlur: () => {
      setTouched(name, true)
    }
  }), [state.values, state.errors, state.touched, setValue, setTouched])
  
  return {
    // State
    ...state,
    
    // Actions
    setValue,
    setValues,
    setError,
    setErrors,
    setTouched,
    setTouchedAll,
    setSubmitting,
    validateField: validateFieldAction,
    validateForm,
    resetForm,
    resetField,
    
    // Helpers
    getFieldProps
  }
}

// === Predefined Field Configurations ===

export const createEmailField = (name: string, required = true): FieldConfig => ({
  name,
  rules: {
    required,
    email: true
  },
  initialValue: ''
})

export const createPasswordField = (name: string, required = true): FieldConfig => ({
  name,
  rules: {
    required,
    password: true
  },
  initialValue: ''
})

export const createTextField = (
  name: string, 
  required = false, 
  minLength?: number, 
  maxLength?: number
): FieldConfig => ({
  name,
  rules: {
    required,
    minLength,
    maxLength
  },
  initialValue: ''
})

export const createNumberField = (
  name: string, 
  required = false, 
  min?: number, 
  max?: number
): FieldConfig => ({
  name,
  rules: {
    required,
    min,
    max
  },
  initialValue: 0
})

// Export validation utilities
export { validateField }
export default useFormValidation