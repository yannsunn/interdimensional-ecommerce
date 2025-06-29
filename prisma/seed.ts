import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { newProducts } from '../data/newProducts'

const prisma = new PrismaClient()

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  console.log('🌌 異次元通販のシードデータを投入中...')

  // Delete existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@interdimensional.shop',
      password: hashedPassword,
      name: '異次元管理者',
      role: 'ADMIN',
    },
  })

  console.log('👑 管理者アカウントを作成しました:', adminUser.email)

  // Create test user
  const testUserPassword = await bcrypt.hash('test123', 10)
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: testUserPassword,
      name: 'テストユーザー',
      role: 'USER',
    },
  })

  console.log('👤 テストユーザーを作成しました:', testUser.email)

  // Create products
  for (const product of newProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        story: '',
        effects: product.effects || [],
        warnings: [],
        testimonials: product.testimonials || [],
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        stock: product.stock,
        category: product.category,
        mysteryLevel: product.mysteryLevel,
        slug: product.slug,
        images: product.images,
        featured: product.featured || false,
      },
    })
    console.log(`✨ 商品を作成しました: ${createdProduct.name}`)
  }

  // Create sample order
  const products = await prisma.product.findMany({ take: 3 })
  const sampleOrder = await prisma.order.create({
    data: {
      userId: testUser.id,
      subtotal: products.reduce((sum, p) => sum + p.price, 0),
      tax: Math.floor(products.reduce((sum, p) => sum + p.price, 0) * 0.1),
      shipping: 500,
      total: Math.floor(products.reduce((sum, p) => sum + p.price, 0) * 1.1) + 500,
      status: 'DELIVERED',
      items: {
        create: products.map(product => ({
          productId: product.id,
          quantity: 1,
          price: product.price,
        })),
      },
      shippingAddress: {
        name: 'テストユーザー',
        postalCode: '150-0001',
        prefecture: '東京都',
        city: '渋谷区',
        address: '神南1-1-1',
        phone: '090-1234-5678',
      },
    },
  })

  console.log('📦 サンプル注文を作成しました:', sampleOrder.id)

  console.log('🎉 異次元通販のシードデータ投入が完了しました！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('エラーが発生しました:', e)
    await prisma.$disconnect()
    process.exit(1)
  })