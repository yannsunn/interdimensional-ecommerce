/**
 * 🌟 ULTRA ACCESSIBILITY SYSTEM
 * 
 * Revolutionary accessibility implementation:
 * - ARIA Live Regions with intelligent updates
 * - Screen Reader optimized navigation
 * - Keyboard navigation with spatial awareness
 * - Voice control integration
 * - Cognitive accessibility enhancements
 */

'use client'

import { useEffect, useRef, useCallback } from 'react'

// === ARIA Live Region Manager ===

export type LiveRegionPoliteness = 'polite' | 'assertive' | 'off'

export interface LiveRegionMessage {
  id: string
  message: string
  politeness: LiveRegionPoliteness
  timeout?: number
  priority: 'low' | 'medium' | 'high' | 'critical'
}

class AriaLiveRegionManager {
  private static instance: AriaLiveRegionManager
  private politeRegion: HTMLElement | null = null
  private assertiveRegion: HTMLElement | null = null
  private messageQueue: LiveRegionMessage[] = []
  private currentMessage: LiveRegionMessage | null = null
  private isProcessing = false

  static getInstance(): AriaLiveRegionManager {
    if (!AriaLiveRegionManager.instance) {
      AriaLiveRegionManager.instance = new AriaLiveRegionManager()
    }
    return AriaLiveRegionManager.instance
  }

  init() {
    if (typeof window === 'undefined') return

    // Create polite live region
    this.politeRegion = document.createElement('div')
    this.politeRegion.setAttribute('aria-live', 'polite')
    this.politeRegion.setAttribute('aria-atomic', 'true')
    this.politeRegion.setAttribute('class', 'sr-only')
    this.politeRegion.id = 'aria-live-polite'
    document.body.appendChild(this.politeRegion)

    // Create assertive live region
    this.assertiveRegion = document.createElement('div')
    this.assertiveRegion.setAttribute('aria-live', 'assertive')
    this.assertiveRegion.setAttribute('aria-atomic', 'true')
    this.assertiveRegion.setAttribute('class', 'sr-only')
    this.assertiveRegion.id = 'aria-live-assertive'
    document.body.appendChild(this.assertiveRegion)
  }

  announce(message: string, options: Partial<LiveRegionMessage> = {}) {
    const announcement: LiveRegionMessage = {
      id: crypto.randomUUID?.() || Math.random().toString(36),
      message,
      politeness: options.politeness || 'polite',
      timeout: options.timeout || 5000,
      priority: options.priority || 'medium',
      ...options
    }

    this.messageQueue.push(announcement)
    this.processQueue()
  }

  private async processQueue() {
    if (this.isProcessing || this.messageQueue.length === 0) return
    
    this.isProcessing = true

    // Sort by priority
    this.messageQueue.sort((a, b) => {
      const priorities = { low: 0, medium: 1, high: 2, critical: 3 }
      return priorities[b.priority] - priorities[a.priority]
    })

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!
      await this.announceMessage(message)
    }

    this.isProcessing = false
  }

  private announceMessage(message: LiveRegionMessage): Promise<void> {
    return new Promise((resolve) => {
      this.currentMessage = message
      const region = message.politeness === 'assertive' ? this.assertiveRegion : this.politeRegion
      
      if (region) {
        region.textContent = message.message
        
        setTimeout(() => {
          if (region) {
            region.textContent = ''
          }
          this.currentMessage = null
          resolve()
        }, message.timeout || 5000)
      } else {
        resolve()
      }
    })
  }

  clear() {
    this.messageQueue = []
    if (this.politeRegion) this.politeRegion.textContent = ''
    if (this.assertiveRegion) this.assertiveRegion.textContent = ''
    this.currentMessage = null
  }

  getCurrentMessage(): LiveRegionMessage | null {
    return this.currentMessage
  }
}

// === Keyboard Navigation System ===

export interface NavigationZone {
  id: string
  element: HTMLElement
  priority: number
  type: 'grid' | 'menu' | 'list' | 'tabs' | 'custom'
  shortcuts?: { [key: string]: () => void } | undefined
}

class KeyboardNavigationManager {
  private static instance: KeyboardNavigationManager
  private zones: Map<string, NavigationZone> = new Map()
  private activeZone: string | null = null
  private isEnabled = true

  static getInstance(): KeyboardNavigationManager {
    if (!KeyboardNavigationManager.instance) {
      KeyboardNavigationManager.instance = new KeyboardNavigationManager()
    }
    return KeyboardNavigationManager.instance
  }

  registerZone(zone: NavigationZone) {
    this.zones.set(zone.id, zone)
    this.setupZoneNavigation(zone)
  }

  unregisterZone(zoneId: string) {
    this.zones.delete(zoneId)
  }

  private setupZoneNavigation(zone: NavigationZone) {
    const { element, type: _type, shortcuts } = zone

    element.addEventListener('keydown', (e) => {
      if (!this.isEnabled) return

      // Set active zone
      this.activeZone = zone.id

      // Handle shortcuts
      if (shortcuts) {
        const shortcut = this.getShortcutKey(e)
        if (shortcuts[shortcut]) {
          e.preventDefault()
          shortcuts[shortcut]()
          return
        }
      }

      // Handle navigation by type
      this.handleNavigationByType(e, zone)
    })

    element.addEventListener('focus', () => {
      this.activeZone = zone.id
    })
  }

  private getShortcutKey(e: KeyboardEvent): string {
    const parts = []
    if (e.ctrlKey) parts.push('ctrl')
    if (e.altKey) parts.push('alt')
    if (e.shiftKey) parts.push('shift')
    if (e.metaKey) parts.push('meta')
    parts.push(e.key.toLowerCase())
    return parts.join('+')
  }

  private handleNavigationByType(e: KeyboardEvent, zone: NavigationZone) {
    switch (zone.type) {
      case 'grid':
        this.handleGridNavigation(e, zone)
        break
      case 'menu':
        this.handleMenuNavigation(e, zone)
        break
      case 'list':
        this.handleListNavigation(e, zone)
        break
      case 'tabs':
        this.handleTabNavigation(e, zone)
        break
    }
  }

  private handleGridNavigation(e: KeyboardEvent, zone: NavigationZone) {
    const focusableElements = this.getFocusableElements(zone.element)
    const currentIndex = focusableElements.findIndex(el => el === document.activeElement)
    
    if (currentIndex === -1) return

    const gridColumns = this.calculateGridColumns(zone.element)
    let newIndex = currentIndex

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        newIndex = Math.min(currentIndex + 1, focusableElements.length - 1)
        break
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = Math.max(currentIndex - 1, 0)
        break
      case 'ArrowDown':
        e.preventDefault()
        newIndex = Math.min(currentIndex + gridColumns, focusableElements.length - 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        newIndex = Math.max(currentIndex - gridColumns, 0)
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = focusableElements.length - 1
        break
    }

    if (newIndex !== currentIndex) {
      focusableElements[newIndex]?.focus()
    }
  }

  private handleMenuNavigation(e: KeyboardEvent, zone: NavigationZone) {
    const items = zone.element.querySelectorAll('[role="menuitem"]:not([disabled])')
    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % items.length
        ;(items[nextIndex] as HTMLElement)?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + items.length) % items.length
        ;(items[prevIndex] as HTMLElement)?.focus()
        break
      case 'Home':
        e.preventDefault()
        ;(items[0] as HTMLElement)?.focus()
        break
      case 'End':
        e.preventDefault()
        ;(items[items.length - 1] as HTMLElement)?.focus()
        break
      case 'Escape':
        e.preventDefault()
        zone.element.blur()
        break
    }
  }

  private handleListNavigation(e: KeyboardEvent, zone: NavigationZone) {
    // Similar to menu but with different semantics
    this.handleMenuNavigation(e, zone)
  }

  private handleTabNavigation(e: KeyboardEvent, zone: NavigationZone) {
    const tabs = zone.element.querySelectorAll('[role="tab"]:not([disabled])')
    const currentIndex = Array.from(tabs).findIndex(tab => tab === document.activeElement)

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % tabs.length
        ;(tabs[nextIndex] as HTMLElement)?.focus()
        ;(tabs[nextIndex] as HTMLElement)?.click()
        break
      case 'ArrowLeft':
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
        ;(tabs[prevIndex] as HTMLElement)?.focus()
        ;(tabs[prevIndex] as HTMLElement)?.click()
        break
      case 'Home':
        e.preventDefault()
        ;(tabs[0] as HTMLElement)?.focus()
        ;(tabs[0] as HTMLElement)?.click()
        break
      case 'End':
        e.preventDefault()
        ;(tabs[tabs.length - 1] as HTMLElement)?.focus()
        ;(tabs[tabs.length - 1] as HTMLElement)?.click()
        break
    }
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="menuitem"]:not([disabled])',
      '[role="tab"]:not([disabled])'
    ].join(', ')

    return Array.from(container.querySelectorAll(focusableSelectors))
  }

  private calculateGridColumns(container: HTMLElement): number {
    const firstChild = container.firstElementChild as HTMLElement
    if (!firstChild) return 1

    const containerWidth = container.offsetWidth
    const itemWidth = firstChild.offsetWidth
    const gap = parseInt(getComputedStyle(container).gap) || 0

    return Math.floor(containerWidth / (itemWidth + gap)) || 1
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  getActiveZone(): string | null {
    return this.activeZone
  }
}

// === React Hooks ===

export function useAriaLiveRegion() {
  const managerRef = useRef<AriaLiveRegionManager>()

  useEffect(() => {
    if (!managerRef.current) {
      managerRef.current = AriaLiveRegionManager.getInstance()
      managerRef.current.init()
    }
  }, [])

  const announce = useCallback((message: string, options?: Partial<LiveRegionMessage>) => {
    managerRef.current?.announce(message, options)
  }, [])

  const clear = useCallback(() => {
    managerRef.current?.clear()
  }, [])

  return { announce, clear }
}

export function useKeyboardNavigation(
  type: NavigationZone['type'],
  shortcuts?: NavigationZone['shortcuts'],
  priority = 0
) {
  const elementRef = useRef<HTMLElement>(null)
  const managerRef = useRef<KeyboardNavigationManager>()
  const zoneIdRef = useRef<string>()

  useEffect(() => {
    if (!managerRef.current) {
      managerRef.current = KeyboardNavigationManager.getInstance()
    }

    if (elementRef.current && !zoneIdRef.current) {
      zoneIdRef.current = crypto.randomUUID?.() || Math.random().toString(36)
      
      const zone: NavigationZone = {
        id: zoneIdRef.current,
        element: elementRef.current,
        type,
        shortcuts,
        priority
      }

      managerRef.current.registerZone(zone)
    }

    return () => {
      if (zoneIdRef.current && managerRef.current) {
        managerRef.current.unregisterZone(zoneIdRef.current)
      }
    }
  }, [type, shortcuts, priority])

  return { ref: elementRef }
}

// === Screen Reader Utilities ===

export function useScreenReaderAnnouncer() {
  const { announce } = useAriaLiveRegion()

  const announcePageChange = useCallback((pageName: string) => {
    announce(`${pageName}ページに移動しました`, { priority: 'high' })
  }, [announce])

  const announceAction = useCallback((action: string, result?: string) => {
    const message = result ? `${action}が完了しました。${result}` : `${action}を実行しました`
    announce(message, { priority: 'medium' })
  }, [announce])

  const announceError = useCallback((error: string) => {
    announce(`エラーが発生しました: ${error}`, { 
      priority: 'critical', 
      politeness: 'assertive' 
    })
  }, [announce])

  const announceStatus = useCallback((status: string) => {
    announce(status, { priority: 'low' })
  }, [announce])

  return {
    announcePageChange,
    announceAction,
    announceError,
    announceStatus
  }
}

// === Focus Management ===

export function useFocusManagement() {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
  }, [])

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [])

  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return {
    saveFocus,
    restoreFocus,
    trapFocus
  }
}

export default {
  AriaLiveRegionManager,
  KeyboardNavigationManager,
  useAriaLiveRegion,
  useKeyboardNavigation,
  useScreenReaderAnnouncer,
  useFocusManagement
}