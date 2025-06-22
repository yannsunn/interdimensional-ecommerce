import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'カートが空です' }, { status: 400 })
    }

    // 商品データを取得して価格を検証
    const productIds = items.map((item: any) => item.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    })

    // 在庫チェック
    for (const item of items) {
      const product = products.find(p => p.id === item.productId)
      if (!product) {
        return NextResponse.json({ error: `商品が見つかりません: ${item.productId}` }, { status: 400 })
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ 
          error: `在庫が不足しています: ${product.name} (在庫: ${product.stock}, 要求: ${item.quantity})` 
        }, { status: 400 })
      }
    }

    // Stripe line items を作成
    const lineItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId)!
      return {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: product.name,
            description: `${product.description.slice(0, 100)}...`,
            images: product.images,
            metadata: {
              productId: product.id,
              mysteryLevel: product.mysteryLevel.toString(),
            },
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      }
    })

    // 注文を事前作成
    const subtotal = items.reduce((sum: number, item: any) => {
      const product = products.find(p => p.id === item.productId)!
      return sum + (product.price * item.quantity)
    }, 0)
    
    const tax = Math.floor(subtotal * 0.1) // 10%税
    const shipping = subtotal >= 10000 ? 0 : 500 // 1万円以上送料無料
    const total = subtotal + tax + shipping

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        subtotal,
        tax,
        shipping,
        total,
        status: 'PENDING',
        items: {
          create: items.map((item: any) => {
            const product = products.find(p => p.id === item.productId)!
            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price,
            }
          }),
        },
      },
    })

    // Stripe Checkout Session作成
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      metadata: {
        userId: session.user.id,
        orderId: order.id,
      },
      payment_intent_data: {
        metadata: {
          userId: session.user.id,
          orderId: order.id,
        },
      },
      // 日本の設定
      locale: 'ja',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      // 異次元的なカスタマイゼーション
      custom_text: {
        submit: {
          message: '🌟 異次元への扉が開かれます... 🌟',
        },
      },
    })

    // 注文にStripe情報を追加
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: checkoutSession.id,
      },
    })

    return NextResponse.json({ 
      url: checkoutSession.url,
      orderId: order.id,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: '決済処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}