import { ProductId, UserId, CartId } from './core'
import { ProductWithRelations } from './product'

// カートアイテム
export interface CartItem {
  id: string
  productId: ProductId
  product?: ProductWithRelations
  quantity: number
  price: number
  addedAt: Date
}

// カート
export interface Cart {
  id: CartId
  userId?: UserId
  items: CartItem[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

// カートアクション
export type CartAction = 
  | { type: 'ADD_ITEM'; payload: { productId: ProductId; quantity: number; price: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: ProductId } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: ProductId; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: Cart }

// カート状態
export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
  error?: string
}

// カート計算ユーティリティ型
export interface CartTotals {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
}

// チェックアウトデータ
export interface CheckoutData {
  cart: Cart
  totals: CartTotals
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: string
  shippingMethod: string
}

// 住所
export interface Address {
  id?: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}