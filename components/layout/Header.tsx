'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, LogOut, Menu } from 'lucide-react'
import { GlowingText } from '@/components/ultra-dimensional/GlowingText'
import { CartDrawer } from '@/components/shop/CartDrawer'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const { getTotalItems, toggleCart } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-purple-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GlowingText className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              異次元通販
            </GlowingText>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/products" 
              className="text-white hover:text-purple-400 transition-colors"
            >
              商品一覧
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-purple-400 transition-colors"
            >
              異次元について
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-purple-400 transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                >
                  <User size={24} />
                  <span className="hidden md:block">{session.user.name}</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-purple-500 rounded-lg shadow-lg">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-white hover:bg-purple-500/20 transition-colors"
                    >
                      プロフィール
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-white hover:bg-purple-500/20 transition-colors"
                    >
                      注文履歴
                    </Link>
                    {session.user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-white hover:bg-purple-500/20 transition-colors border-t border-purple-500"
                      >
                        管理画面
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-purple-500/20 transition-colors border-t border-purple-500"
                    >
                      <LogOut size={16} />
                      <span>ログアウト</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                ログイン
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-purple-500">
            <Link 
              href="/products" 
              className="block py-2 text-white hover:text-purple-400 transition-colors"
            >
              商品一覧
            </Link>
            <Link 
              href="/about" 
              className="block py-2 text-white hover:text-purple-400 transition-colors"
            >
              異次元について
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}