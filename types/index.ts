import { Product, User, Order, OrderItem } from '@prisma/client'

export type ProductWithDetails = Product

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product
  })[]
  user: User
}

export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  mysteryLevel: number
}