import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createSelectors, withPerformanceMonitoring } from '../lib/zustand-utils'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  mysteryLevel: number
  maxQuantity?: number
  discountPercentage?: number
}

// 計算値の型定義
interface CartComputedValues {
  totalItems: number
  totalPrice: number
  totalOriginalPrice: number
  totalSavings: number
  itemsCount: number
  uniqueProductsCount: number
  averageItemPrice: number
  isCartEmpty: boolean
  hasDiscountedItems: boolean
}

interface CartStore {
  // 基本状態
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  lastUpdated: number
  
  // 基本アクション
  addItem: (product: Omit<CartItem, 'quantity'>) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  
  // UI制御
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  // バッチ操作
  addMultipleItems: (products: Array<Omit<CartItem, 'quantity'> & { quantity: number }>) => Promise<void>
  removeMultipleItems: (productIds: string[]) => Promise<void>
  
  // 高度な機能
  moveToWishlist: (productId: string) => Promise<void>
  applyDiscount: (productId: string, discountPercentage: number) => void
  validateStock: () => Promise<boolean>
  
  // 計算値アクセサー（最適化されたセレクター）
  getComputedValues: () => CartComputedValues
  
  // デバッグ用
  _resetToInitialState: () => void
}

// 初期状態定義
const initialState = {
  items: [],
  isOpen: false,
  isLoading: false,
  lastUpdated: Date.now(),
}

// 計算値の計算関数（最適化済み）
const calculateCartValues = (items: CartItem[]): CartComputedValues => {
  if (items.length === 0) {
    return {
      totalItems: 0,
      totalPrice: 0,
      totalOriginalPrice: 0,
      totalSavings: 0,
      itemsCount: 0,
      uniqueProductsCount: 0,
      averageItemPrice: 0,
      isCartEmpty: true,
      hasDiscountedItems: false,
    }
  }

  let totalItems = 0
  let totalPrice = 0
  let totalOriginalPrice = 0
  let hasDiscountedItems = false

  for (const item of items) {
    totalItems += item.quantity
    const itemOriginalPrice = item.price * item.quantity
    const itemDiscountedPrice = item.discountPercentage 
      ? itemOriginalPrice * (1 - item.discountPercentage / 100)
      : itemOriginalPrice
    
    totalPrice += itemDiscountedPrice
    totalOriginalPrice += itemOriginalPrice
    
    if (item.discountPercentage && item.discountPercentage > 0) {
      hasDiscountedItems = true
    }
  }

  return {
    totalItems,
    totalPrice: Math.round(totalPrice * 100) / 100, // 小数点以下2桁で丸める
    totalOriginalPrice: Math.round(totalOriginalPrice * 100) / 100,
    totalSavings: Math.round((totalOriginalPrice - totalPrice) * 100) / 100,
    itemsCount: items.length,
    uniqueProductsCount: items.length,
    averageItemPrice: items.length > 0 ? Math.round((totalPrice / items.length) * 100) / 100 : 0,
    isCartEmpty: false,
    hasDiscountedItems,
  }
}

// ストア作成（パフォーマンス監視付き）
const useCartStoreBase = create<CartStore>()(
  persist(
    withPerformanceMonitoring(
      (set, get) => ({
        ...initialState,
        
        // 基本アクション（最適化版）
        addItem: async (product: Omit<CartItem, "quantity">) => {
          set({ isLoading: true })
          
          try {
            set((state) => {
              const existingItemIndex = state.items.findIndex(item => item.productId === product.productId)
              
              if (existingItemIndex !== -1) {
                // 既存アイテムの数量を増加
                const newItems = [...state.items]
                const existingItem = newItems[existingItemIndex]!
                const newQuantity = existingItem.quantity + 1
                
                // 最大数量チェック
                if (existingItem.maxQuantity && newQuantity > existingItem.maxQuantity) {
                  throw new Error(`最大${existingItem.maxQuantity}個まで追加できます`)
                }
                
                newItems[existingItemIndex] = { ...existingItem, quantity: newQuantity }
                
                return {
                  items: newItems,
                  isOpen: true,
                  lastUpdated: Date.now(),
                  isLoading: false,
                }
              }
              
              // 新規アイテム追加
              return {
                items: [...state.items, { ...product, quantity: 1 }],
                isOpen: true,
                lastUpdated: Date.now(),
                isLoading: false,
              }
            })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },
        
        removeItem: async (productId) => {
          set({ isLoading: true })
          
          try {
            set((state) => ({
              items: state.items.filter(item => item.productId !== productId),
              lastUpdated: Date.now(),
              isLoading: false,
            }))
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },
        
        updateQuantity: async (productId, quantity) => {
          if (quantity <= 0) {
            await get().removeItem(productId)
            return
          }
          
          set({ isLoading: true })
          
          try {
            set((state) => {
              const itemIndex = state.items.findIndex(item => item.productId === productId)
              if (itemIndex === -1) return state
              
              const item = state.items[itemIndex]!
              
              // 最大数量チェック
              if (item.maxQuantity && quantity > item.maxQuantity) {
                throw new Error(`最大${item.maxQuantity}個まで設定できます`)
              }
              
              const newItems = [...state.items]
              newItems[itemIndex] = { ...item, quantity }
              
              return {
                items: newItems,
                lastUpdated: Date.now(),
                isLoading: false,
              }
            })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },
        
        clearCart: async () => {
          set({ isLoading: true })
          
          try {
            set({
              items: [],
              isOpen: false,
              lastUpdated: Date.now(),
              isLoading: false,
            })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },
        
        // UI制御
        openCart: () => set({ isOpen: true }),
        closeCart: () => set({ isOpen: false }),
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        
        // バッチ操作
        addMultipleItems: async (products) => {
          set({ isLoading: true })
          
          try {
            set((state) => {
              const newItems = [...state.items]
              
              for (const product of products) {
                const existingIndex = newItems.findIndex(item => item.productId === product.productId)
                
                if (existingIndex !== -1) {
                  const existingItem = newItems[existingIndex]!
                  newItems[existingIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + product.quantity
                  }
                } else {
                  newItems.push({ ...product })
                }
              }
              
              return {
                items: newItems,
                lastUpdated: Date.now(),
                isLoading: false,
              }
            })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },
        
        removeMultipleItems: async (productIds) => {
          set({ isLoading: true })
          
          try {
            set((state) => ({
              items: state.items.filter(item => !productIds.includes(item.productId)),
              lastUpdated: Date.now(),
              isLoading: false,
            }))
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },
        
        // 高度な機能
        moveToWishlist: async (productId) => {
          // ウィッシュリストへの移動ロジック（実装は後で追加）
          await get().removeItem(productId)
        },
        
        applyDiscount: (productId, discountPercentage) => {
          set((state) => ({
            items: state.items.map(item =>
              item.productId === productId
                ? { ...item, discountPercentage }
                : item
            ),
            lastUpdated: Date.now(),
          }))
        },
        
        validateStock: async () => {
          // 在庫確認ロジック（実装は後で追加）
          return true
        },
        
        // 最適化された計算値アクセサー
        getComputedValues: () => {
          return calculateCartValues(get().items)
        },
        
        // デバッグ用
        _resetToInitialState: () => {
          set(initialState)
        },
      }),
      'CartStore'
    ),
    {
      name: 'interdimensional-cart',
      version: 2,
      partialize: (state) => ({ 
        items: state.items,
        lastUpdated: state.lastUpdated 
      }),
      // マイグレーション関数
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          // v1からv2への移行
          return {
            ...persistedState,
            isLoading: false,
            lastUpdated: Date.now(),
          }
        }
        return persistedState
      },
    }
  )
)

// セレクター付きストアをエクスポート
export const useCartStore = createSelectors(useCartStoreBase)