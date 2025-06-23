import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import type { AddressData, ShippingData, BillingData } from '@/types/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('🎉 異次元決済完了:', session.id)
        
        if (session.metadata?.orderId) {
          // 配送先住所データの準備（型安全性向上）
          const shippingData: ShippingData | null = session.shipping_details ? {
            name: session.shipping_details.name || null,
            address: session.shipping_details.address ? {
              line1: session.shipping_details.address.line1 || null,
              line2: session.shipping_details.address.line2 || null,
              city: session.shipping_details.address.city || null,
              state: session.shipping_details.address.state || null,
              postal_code: session.shipping_details.address.postal_code || null,
              country: session.shipping_details.address.country || null,
            } : null
          } : null

          // 請求先住所データの準備（型安全性向上）
          const billingData: BillingData | null = session.customer_details ? {
            name: session.customer_details.name || null,
            email: session.customer_details.email || null,
            address: session.customer_details.address ? {
              line1: session.customer_details.address.line1 || null,
              line2: session.customer_details.address.line2 || null,
              city: session.customer_details.address.city || null,
              state: session.customer_details.address.state || null,
              postal_code: session.customer_details.address.postal_code || null,
              country: session.customer_details.address.country || null,
            } : null
          } : null

          // 注文ステータスを更新
          await prisma.order.update({
            where: { id: session.metadata.orderId },
            data: {
              status: 'PAID',
              stripePaymentIntentId: session.payment_intent as string,
              // JSON形式で住所データを保存（型安全性確保）
              ...(shippingData && { shippingAddress: shippingData }),
              ...(billingData && { billingAddress: billingData }),
            },
          })

          // 在庫を減らす
          const order = await prisma.order.findUnique({
            where: { id: session.metadata.orderId },
            include: { items: true },
          })

          if (order) {
            for (const item of order.items) {
              await prisma.product.update({
                where: { id: item.productId },
                data: {
                  stock: {
                    decrement: item.quantity,
                  },
                },
              })
            }
          }

          console.log('✅ 注文処理完了:', session.metadata.orderId)
        }
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('💰 異次元支払い成功:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('❌ 異次元支払い失敗:', paymentIntent.id, paymentIntent.last_payment_error?.message)
        
        // 失敗した注文をキャンセル状態に
        if (paymentIntent.metadata?.orderId) {
          await prisma.order.update({
            where: { id: paymentIntent.metadata.orderId },
            data: { status: 'CANCELLED' },
          })
        }
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('⏰ セッション期限切れ:', session.id)
        
        // 期限切れの注文をキャンセル
        if (session.metadata?.orderId) {
          await prisma.order.update({
            where: { id: session.metadata.orderId },
            data: { status: 'CANCELLED' },
          })
        }
        break
      }

      default:
        console.log(`🔮 未処理のイベント: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook処理エラー:', error)
    return NextResponse.json(
      { error: 'Webhook処理に失敗しました' },
      { status: 500 }
    )
  }
}