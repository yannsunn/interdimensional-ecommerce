'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
import { GlowingText } from '../../components/ultra-dimensional/GlowingText'
import { CartDrawer } from '../../components/shop/CartDrawer'
import { useCartStore } from '../../store/cartStore'
import { useState, useEffect } from 'react'

export function Header() {
  const { data: session } = useSession()
  const { getComputedValues, toggleCart } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { totalItems } = getComputedValues()

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-purple-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GlowingText className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              異次元通販
            </GlowingText>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/products" 
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              商品一覧
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              異次元について
            </Link>
            <Link 
              href="/contact" 
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart Button - Enhanced for mobile */}
            <button 
              onClick={toggleCart}
              className="relative p-2 sm:p-3 text-white hover:text-purple-400 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="ショッピングカートを開く"
            >
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsUserMenuOpen(!isUserMenuOpen)
                  }}
                  className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors p-2 min-w-[44px] min-h-[44px]"
                  aria-label="ユーザーメニューを開く"
                >
                  <User size={20} className="sm:w-6 sm:h-6" />
                  <span className="hidden lg:block text-sm font-medium truncate max-w-24">
                    {session.user.name}
                  </span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md border border-purple-500 rounded-lg shadow-lg">
                    <div className="py-2">
                      <div className="px-4 py-2 text-purple-400 text-sm font-medium border-b border-purple-500/30">
                        {session.user.name}
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-white hover:bg-purple-500/20 transition-colors text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        プロフィール
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-3 text-white hover:bg-purple-500/20 transition-colors text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        注文履歴
                      </Link>
                      {session.user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-3 text-white hover:bg-purple-500/20 transition-colors border-t border-purple-500/30 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          管理画面
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          signOut()
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-left text-white hover:bg-purple-500/20 transition-colors border-t border-purple-500/30 text-sm"
                      >
                        <LogOut size={16} />
                        <span>ログアウト</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium min-h-[44px] flex items-center"
              >
                ログイン
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="メニューを開く"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-black/95 backdrop-blur-md border-l border-purple-500 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
                  <GlowingText className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                    メニュー
                  </GlowingText>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white p-2 hover:text-purple-400 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-4">
                  <Link 
                    href="/products" 
                    className="block py-3 px-4 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🛍️ 商品一覧
                  </Link>
                  <Link 
                    href="/about" 
                    className="block py-3 px-4 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🌌 異次元について
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block py-3 px-4 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📞 お問い合わせ
                  </Link>
                  
                  {/* User Section for Mobile */}
                  {session && (
                    <div className="border-t border-purple-500/30 pt-4 mt-6">
                      <div className="text-purple-400 text-sm font-medium mb-3 px-4">
                        アカウント
                      </div>
                      <Link
                        href="/profile"
                        className="block py-3 px-4 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        👤 プロフィール
                      </Link>
                      <Link
                        href="/orders"
                        className="block py-3 px-4 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        📦 注文履歴
                      </Link>
                      {session.user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block py-3 px-4 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          ⚙️ 管理画面
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          signOut()
                        }}
                        className="flex items-center space-x-2 w-full py-3 px-4 text-left text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all font-medium"
                      >
                        <LogOut size={16} />
                        <span>ログアウト</span>
                      </button>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}