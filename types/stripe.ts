// Stripe関連の型定義 - 型安全性向上
export interface AddressData {
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
  [key: string]: string | null | undefined
}

export interface ShippingData {
  name?: string | null
  address?: AddressData | null
  [key: string]: string | AddressData | null | undefined
}

export interface BillingData {
  name?: string | null
  email?: string | null
  address?: AddressData | null
  [key: string]: string | AddressData | null | undefined
}

// Prisma JSON型用のユーティリティ型
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray
export type JsonObject = { [key: string]: JsonValue }
export type JsonArray = JsonValue[]

// Stripe関連のJSON型定義
export type StripeShippingAddress = JsonValue | ShippingData
export type StripeBillingAddress = JsonValue | BillingData