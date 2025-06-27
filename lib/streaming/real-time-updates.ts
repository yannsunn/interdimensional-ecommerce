/**
 * 🌊 ULTRA REAL-TIME STREAMING SYSTEM
 * 
 * Revolutionary real-time data streaming:
 * - WebSocket connections with automatic reconnection
 * - Server-Sent Events for unidirectional updates
 * - Optimistic updates with conflict resolution
 * - Memory-efficient streaming data management
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// === Streaming Data Types ===

export interface StreamEvent<T = any> {
  id: string
  type: string
  data: T
  timestamp: number
  source?: string
}

export interface StreamConfig {
  url: string
  reconnectDelay?: number
  maxReconnectAttempts?: number
  heartbeatInterval?: number
  bufferSize?: number
  compression?: boolean
}

// === WebSocket Stream Manager ===

export class WebSocketStreamManager {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private heartbeatTimer: NodeJS.Timeout | null = null
  private listeners = new Map<string, Set<(event: StreamEvent) => void>>()
  
  constructor(private config: StreamConfig) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.url)
        
        this.ws.onopen = () => {
          console.log('🔌 WebSocket connected')
          this.reconnectAttempts = 0
          this.startHeartbeat()
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const streamEvent: StreamEvent = JSON.parse(event.data)
            this.handleStreamEvent(streamEvent)
          } catch (error) {
            console.warn('Failed to parse stream event:', error)
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log('🔌 WebSocket disconnected')
          this.cleanup()
          this.attemptReconnect()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleStreamEvent(event: StreamEvent) {
    const listeners = this.listeners.get(event.type)
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event)
        } catch (error) {
          console.error('Stream event handler error:', error)
        }
      })
    }
  }

  private startHeartbeat() {
    if (this.config.heartbeatInterval) {
      this.heartbeatTimer = setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: 'ping' }))
        }
      }, this.config.heartbeatInterval)
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < (this.config.maxReconnectAttempts || 5)) {
      this.reconnectAttempts++
      const delay = (this.config.reconnectDelay || 1000) * Math.pow(2, this.reconnectAttempts - 1)
      
      console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`)
      
      setTimeout(() => {
        this.connect().catch(console.error)
      }, delay)
    }
  }

  private cleanup() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  subscribe(eventType: string, listener: (event: StreamEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(listener)
    
    return () => {
      const listeners = this.listeners.get(eventType)
      if (listeners) {
        listeners.delete(listener)
        if (listeners.size === 0) {
          this.listeners.delete(eventType)
        }
      }
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  disconnect() {
    this.cleanup()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// === Server-Sent Events Manager ===

export class SSEStreamManager {
  private eventSource: EventSource | null = null
  private listeners = new Map<string, Set<(event: StreamEvent) => void>>()
  
  constructor(private config: StreamConfig) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.eventSource = new EventSource(this.config.url)
        
        this.eventSource.onopen = () => {
          console.log('📡 SSE connected')
          resolve()
        }

        this.eventSource.onmessage = (event) => {
          try {
            const streamEvent: StreamEvent = JSON.parse(event.data)
            this.handleStreamEvent(streamEvent)
          } catch (error) {
            console.warn('Failed to parse SSE event:', error)
          }
        }

        this.eventSource.onerror = (error) => {
          console.error('SSE error:', error)
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleStreamEvent(event: StreamEvent) {
    const listeners = this.listeners.get(event.type)
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event)
        } catch (error) {
          console.error('SSE event handler error:', error)
        }
      })
    }
  }

  subscribe(eventType: string, listener: (event: StreamEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(listener)
    
    return () => {
      const listeners = this.listeners.get(eventType)
      if (listeners) {
        listeners.delete(listener)
        if (listeners.size === 0) {
          this.listeners.delete(eventType)
        }
      }
    }
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }
}

// === Real-time React Hook ===

export function useRealTimeStream<T = any>(
  config: StreamConfig,
  eventTypes: string[],
  options: {
    type?: 'websocket' | 'sse'
    autoConnect?: boolean
    bufferSize?: number
  } = {}
) {
  const [isConnected, setIsConnected] = useState(false)
  const [events, setEvents] = useState<StreamEvent<T>[]>([])
  const [error, setError] = useState<Error | null>(null)
  
  const managerRef = useRef<WebSocketStreamManager | SSEStreamManager | null>(null)
  const eventBufferRef = useRef<StreamEvent<T>[]>([])
  
  const { type = 'websocket', autoConnect = true, bufferSize = 100 } = options

  // Initialize stream manager
  useEffect(() => {
    const manager = type === 'websocket' 
      ? new WebSocketStreamManager(config)
      : new SSEStreamManager(config)
    
    managerRef.current = manager
    
    // Subscribe to events
    const unsubscribers = eventTypes.map(eventType =>
      manager.subscribe(eventType, (event: StreamEvent<T>) => {
        // Add to buffer
        eventBufferRef.current.push(event)
        
        // Maintain buffer size
        if (eventBufferRef.current.length > bufferSize) {
          eventBufferRef.current = eventBufferRef.current.slice(-bufferSize)
        }
        
        // Update state
        setEvents([...eventBufferRef.current])
      })
    )

    // Auto-connect if enabled
    if (autoConnect) {
      manager.connect()
        .then(() => setIsConnected(true))
        .catch(setError)
    }

    return () => {
      unsubscribers.forEach(unsub => unsub())
      manager.disconnect()
      setIsConnected(false)
    }
  }, [config.url, type, autoConnect, bufferSize])

  const connect = useCallback(async () => {
    if (managerRef.current && !isConnected) {
      try {
        await managerRef.current.connect()
        setIsConnected(true)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Connection failed'))
      }
    }
  }, [isConnected])

  const disconnect = useCallback(() => {
    if (managerRef.current) {
      managerRef.current.disconnect()
      setIsConnected(false)
    }
  }, [])

  const sendMessage = useCallback((data: any) => {
    if (managerRef.current && 'send' in managerRef.current) {
      managerRef.current.send(data)
    }
  }, [])

  const clearEvents = useCallback(() => {
    eventBufferRef.current = []
    setEvents([])
  }, [])

  return {
    isConnected,
    events,
    error,
    connect,
    disconnect,
    sendMessage,
    clearEvents
  }
}

// === Optimistic Updates System ===

interface OptimisticUpdate<T> {
  id: string
  type: 'create' | 'update' | 'delete'
  data: T
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
}

export function useOptimisticUpdates<T extends { id: string }>(
  initialData: T[],
  conflictResolution: (server: T, local: T) => T = (server) => server
) {
  const [data, setData] = useState<T[]>(initialData)
  const [pendingUpdates, setPendingUpdates] = useState<OptimisticUpdate<T>[]>([])

  const applyOptimisticUpdate = useCallback((update: Omit<OptimisticUpdate<T>, 'timestamp' | 'status'>) => {
    const optimisticUpdate: OptimisticUpdate<T> = {
      ...update,
      timestamp: Date.now(),
      status: 'pending'
    }

    setPendingUpdates(prev => [...prev, optimisticUpdate])

    // Apply optimistic change immediately
    setData(prev => {
      switch (update.type) {
        case 'create':
          return [...prev, update.data]
        case 'update':
          return prev.map(item => 
            item.id === update.data.id ? update.data : item
          )
        case 'delete':
          return prev.filter(item => item.id !== update.data.id)
        default:
          return prev
      }
    })

    return optimisticUpdate.id
  }, [])

  const confirmUpdate = useCallback((updateId: string, serverData?: T) => {
    setPendingUpdates(prev => 
      prev.map(update => 
        update.id === updateId 
          ? { ...update, status: 'confirmed' as const }
          : update
      )
    )

    // Apply server data if provided (conflict resolution)
    if (serverData) {
      setData(prev => 
        prev.map(item => 
          item.id === serverData.id 
            ? conflictResolution(serverData, item)
            : item
        )
      )
    }
  }, [conflictResolution])

  const rejectUpdate = useCallback((updateId: string) => {
    const failedUpdate = pendingUpdates.find(u => u.id === updateId)
    
    if (failedUpdate) {
      // Revert optimistic change
      setData(prev => {
        switch (failedUpdate.type) {
          case 'create':
            return prev.filter(item => item.id !== failedUpdate.data.id)
          case 'delete':
            return [...prev, failedUpdate.data]
          case 'update':
            // Would need original data to revert properly
            return prev
          default:
            return prev
        }
      })
    }

    setPendingUpdates(prev => 
      prev.map(update => 
        update.id === updateId 
          ? { ...update, status: 'failed' as const }
          : update
      )
    )
  }, [pendingUpdates])

  return {
    data,
    pendingUpdates,
    applyOptimisticUpdate,
    confirmUpdate,
    rejectUpdate
  }
}

export default {
  WebSocketStreamManager,
  SSEStreamManager,
  useRealTimeStream,
  useOptimisticUpdates
}