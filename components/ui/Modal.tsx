'use client'

import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'

// === Modal Types ===

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string | undefined
  description?: string | undefined
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | undefined
  variant?: 'default' | 'mystical' | 'danger' | undefined
  showCloseButton?: boolean | undefined
  closeOnOverlayClick?: boolean | undefined
  closeOnEscape?: boolean | undefined
  className?: string | undefined
  overlayClassName?: string | undefined
  panelClassName?: string | undefined
}

export interface ModalHeaderProps {
  title?: string | undefined
  description?: string | undefined
  onClose?: (() => void) | undefined
  showCloseButton?: boolean | undefined
  className?: string | undefined
}

export interface ModalFooterProps {
  children: React.ReactNode
  className?: string | undefined
}

export interface ModalBodyProps {
  children: React.ReactNode
  className?: string | undefined
}

// === Modal Size Variants ===

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-none m-4'
}

// === Modal Variants ===

const modalVariants = {
  default: {
    overlay: 'bg-black/50 backdrop-blur-sm',
    panel: 'bg-gray-900 border border-gray-700',
    header: 'border-b border-gray-700'
  },
  mystical: {
    overlay: 'bg-black/60 backdrop-blur-md',
    panel: 'bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-purple-500/30 shadow-2xl shadow-purple-500/20',
    header: 'border-b border-purple-500/30'
  },
  danger: {
    overlay: 'bg-black/50 backdrop-blur-sm',
    panel: 'bg-gray-900 border border-red-500/50',
    header: 'border-b border-red-500/50'
  }
}

// === Main Modal Component ===

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
  panelClassName
}: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  const variantStyles = modalVariants[variant]
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className={cn('relative z-50', className)}
        onClose={closeOnOverlayClick ? onClose : () => {}}
        // Disable escape key if closeOnEscape is false
        {...(!closeOnEscape && { static: true })}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className={cn(
              'fixed inset-0',
              variantStyles.overlay,
              overlayClassName
            )} 
          />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                className={cn(
                  'w-full transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all',
                  modalSizes[size],
                  variantStyles.panel,
                  panelClassName
                )}
              >
                {/* Header */}
                {(title || description || showCloseButton) && (
                  <ModalHeader
                    title={title}
                    description={description}
                    onClose={onClose}
                    showCloseButton={showCloseButton}
                    className={variantStyles.header}
                  />
                )}
                
                {/* Body */}
                <ModalBody>
                  {children}
                </ModalBody>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

// === Modal Header Component ===

export function ModalHeader({
  title,
  description,
  onClose,
  showCloseButton = true,
  className
}: ModalHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between p-6', className)}>
      <div className="flex-1">
        {title && (
          <Dialog.Title 
            as="h3"
            className="text-xl font-semibold leading-6 text-white"
          >
            {title}
          </Dialog.Title>
        )}
        
        {description && (
          <Dialog.Description className="mt-2 text-sm text-gray-300">
            {description}
          </Dialog.Description>
        )}
      </div>
      
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ml-4 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-1 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}

// === Modal Body Component ===

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  )
}

// === Modal Footer Component ===

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn('flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-700', className)}>
      {children}
    </div>
  )
}

// === Confirmation Modal ===

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
  isLoading?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false
}: ConfirmationModalProps) {
  const isDanger = variant === 'danger'
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={message}
      size="sm"
      variant={isDanger ? 'danger' : 'default'}
    >
      <ModalFooter>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </button>
        
        <button
          type="button"
          className={cn(
            'px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50',
            isDanger 
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
          )}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading...
            </div>
          ) : (
            confirmText
          )}
        </button>
      </ModalFooter>
    </Modal>
  )
}

// === Alert Modal ===

export interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  buttonText?: string
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  buttonText = 'OK'
}: AlertModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      default:
        return 'ℹ️'
    }
  }
  
  const getVariant = () => {
    return type === 'error' ? 'danger' : 'default'
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      variant={getVariant()}
    >
      <div className="text-center py-4">
        <div className="text-4xl mb-4">{getIcon()}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
      </div>
      
      <ModalFooter>
        <button
          type="button"
          className="px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg transition-colors"
          onClick={onClose}
        >
          {buttonText}
        </button>
      </ModalFooter>
    </Modal>
  )
}

// Export all components
export default Modal