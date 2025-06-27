import { prisma } from '../../lib/db'
import { GlowingText } from '../../components/ultra-dimensional/GlowingText'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign,
  Eye,
  AlertTriangle,
  Crown
} from 'lucide-react'
import { formatPrice } from '../../lib/utils'

async function getDashboardData() {
  const [
    totalProducts,
    totalOrders,
    totalUsers,
    recentOrders,
    lowStockProducts,
    totalRevenue,
    todayOrders
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: { select: { name: true } } } }
      }
    }),
    prisma.product.findMany({
      where: { stock: { lt: 10 } },
      orderBy: { stock: 'asc' },
      take: 5
    }),
    prisma.order.aggregate({
      where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] } },
      _sum: { total: true }
    }),
    prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    })
  ])

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    recentOrders,
    lowStockProducts,
    totalRevenue: totalRevenue._sum.total || 0,
    todayOrders
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData()

  const stats = [
    {
      name: '総商品数',
      value: data.totalProducts,
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400'
    },
    {
      name: '総注文数',
      value: data.totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400'
    },
    {
      name: '総ユーザー数',
      value: data.totalUsers,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-400'
    },
    {
      name: '総売上',
      value: formatPrice(data.totalRevenue),
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <GlowingText className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
          <Crown className="text-yellow-400" />
          異次元管理ダッシュボード
        </GlowingText>
        <p className="text-gray-400 text-lg">
          宇宙の商売を統括する神聖なる場所
        </p>
      </div>

      {/* Today's Stats */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 mb-8 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-blue-400" />
          <h2 className="text-xl font-bold text-blue-400">本日の状況</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{data.todayOrders}</div>
            <div className="text-gray-400">本日の注文</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">
              {data.lowStockProducts.length}
            </div>
            <div className="text-gray-400">在庫警告商品</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <Eye className="text-gray-500 group-hover:text-purple-400 transition-colors" size={20} />
            </div>
            <div className="space-y-2">
              <div className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/30">
          <h2 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
            <ShoppingCart />
            最近の注文
          </h2>
          <div className="space-y-4">
            {data.recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-black/30 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-white">
                      {order.user.name || order.user.email}
                    </div>
                    <div className="text-sm text-gray-400">
                      注文ID: {order.id.slice(0, 8)}...
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-400">
                      {formatPrice(order.total)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'PAID' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {order.items.length}点の商品 • {new Date(order.createdAt).toLocaleDateString('ja-JP')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-md rounded-2xl p-6 border-2 border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <AlertTriangle />
            在庫警告
          </h2>
          <div className="space-y-4">
            {data.lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Package size={48} className="mx-auto mb-4 opacity-50" />
                <p>在庫警告はありません</p>
                <p className="text-sm">すべての商品が十分な在庫を保持しています</p>
              </div>
            ) : (
              data.lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-black/30 rounded-lg p-4 border border-red-500/20 hover:border-red-400/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        カテゴリ: {product.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        product.stock === 0 ? 'text-red-400' :
                        product.stock < 5 ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {product.stock}
                      </div>
                      <div className="text-xs text-gray-400">在庫</div>
                    </div>
                  </div>
                  {product.stock === 0 && (
                    <div className="mt-2 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                      売切れ - 緊急補充が必要
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mystical Footer */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400 rounded-lg p-4">
          <p className="text-yellow-400 animate-pulse">
            🔮 龍神が売上の増加を予言しています 🔮
          </p>
        </div>
      </div>
    </div>
  )
}