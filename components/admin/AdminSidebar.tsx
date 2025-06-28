'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Crown,
  TrendingUp,
  Eye
} from 'lucide-react'
import { GlowingText } from '../ultra-dimensional/GlowingText'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'ダッシュボード', href: '/admin', icon: LayoutDashboard },
  { name: '商品管理', href: '/admin/products', icon: Package },
  { name: '注文管理', href: '/admin/orders', icon: ShoppingCart },
  { name: 'ユーザー管理', href: '/admin/users', icon: Users },
  { name: '売上分析', href: '/admin/analytics', icon: TrendingUp },
  { name: '設定', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900/50 to-black/80 backdrop-blur-md border-r-2 border-purple-500">
      <div className="p-6">
        {/* Admin Header */}
        <div className="mb-8">
          <GlowingText className="text-2xl font-bold bg-gradient-to-r from-red-400 via-purple-500 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
            <Crown className="text-yellow-400" />
            異次元管理画面
          </GlowingText>
          <p className="text-gray-400 text-sm mt-2">
            管理者: {session?.user?.name}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group',
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
                )}
              >
                <item.icon 
                  size={20} 
                  className={cn(
                    'transition-all duration-300',
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-400'
                  )} 
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/30">
          <h3 className="text-blue-400 font-semibold mb-3 text-sm">クイックアクション</h3>
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Eye size={14} />
              サイトを表示
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors w-full text-left"
            >
              <LogOut size={14} />
              ログアウト
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
          <h3 className="text-green-400 font-semibold mb-3 text-sm">システム状態</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">異次元サーバー</span>
              <span className="text-green-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                正常
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">龍神システム</span>
              <span className="text-green-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                稼働中
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">宇宙接続</span>
              <span className="text-green-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                安定
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}