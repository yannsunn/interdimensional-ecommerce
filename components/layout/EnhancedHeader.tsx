'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Zap,
  Home,
  Package,
  Heart,
  Settings
} from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { EnhancedButton } from '../ui/EnhancedButton'
import { MysteryLevelBadge } from '../ui/MysteryLevelBadge'

interface EnhancedHeaderProps {
  className?: string
}

export function EnhancedHeader({ className = '' }: EnhancedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const { items, getTotalQuantity, getTotalMysteryLevel } = useCartStore()
  const router = useRouter()

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { href: '/', label: 'ホーム', icon: Home },
    { href: '/products', label: '商品一覧', icon: Package },
    { href: '/favorites', label: 'お気に入り', icon: Heart },
    { href: '/account', label: 'アカウント', icon: Settings }
  ]

  const totalQuantity = getTotalQuantity()
  const totalMysteryLevel = getTotalMysteryLevel()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchFocused(false)
    }
  }

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-black/90 backdrop-blur-xl shadow-2xl shadow-purple-500/20 border-b border-purple-500/30' 
            : 'bg-transparent'
          }
          ${className}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                {/* Dimensional portal logo */}
                <motion.div
                  className="relative w-10 h-10 lg:w-12 lg:h-12"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-pulse" />
                  <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
                  </div>
                </motion.div>
                
                {/* Brand text */}
                <div className="hidden sm:block">
                  <motion.h1 
                    className="text-xl lg:text-2xl font-bold"
                    animate={{
                      background: [
                        'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4)',
                        'linear-gradient(135deg, #ec4899, #06b6d4, #a855f7)',
                        'linear-gradient(225deg, #06b6d4, #a855f7, #ec4899)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                      異次元通販
                    </span>
                  </motion.h1>
                  <p className="text-xs text-gray-400">Interdimensional Shop</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={18} />
                    {item.label}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100"
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              className={`
                hidden md:flex items-center relative transition-all duration-300
                ${isSearchFocused ? 'flex-1 max-w-md mx-8' : 'w-64'}
              `}
              layout
            >
              <motion.div
                className={`
                  relative w-full rounded-full border transition-all duration-300
                  ${isSearchFocused 
                    ? 'border-purple-400 shadow-lg shadow-purple-500/20' 
                    : 'border-gray-600 hover:border-gray-500'
                  }
                `}
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="異次元アイテムを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full px-4 py-2 pl-10 pr-12 bg-black/50 backdrop-blur-sm rounded-full text-white placeholder-gray-400 focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                
                {/* Search suggestions */}
                <AnimatePresence>
                  {isSearchFocused && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-xl"
                    >
                      <div className="p-2">
                        <div className="text-sm text-gray-400 px-3 py-2">検索候補</div>
                        {/* Quick search suggestions would go here */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.form>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              
              {/* User Account */}
              <motion.button
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors hidden sm:flex"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} />
              </motion.button>

              {/* Shopping Cart */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <Link href="/cart">
                  <EnhancedButton
                    variant="ghost"
                    size="sm"
                    className="relative p-2"
                    mysteryLevel={Math.min(totalMysteryLevel, 10)}
                  >
                    <ShoppingCart size={20} />
                    
                    {/* Cart badge */}
                    <AnimatePresence>
                      {totalQuantity > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          {totalQuantity > 99 ? '99+' : totalQuantity}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </EnhancedButton>
                </Link>
                
                {/* Mystery level indicator for cart */}
                {totalMysteryLevel > 0 && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <MysteryLevelBadge 
                      level={totalMysteryLevel} 
                      variant="compact"
                      showAnimation={false}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Dimensional energy bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-purple-900 via-black to-pink-900 border-l border-purple-500/30 z-50 lg:hidden"
            >
              <div className="p-6 pt-20">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="異次元アイテムを検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-black/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 focus:outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </form>

                {/* Navigation Items */}
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors group"
                      >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100"
                          whileHover={{ x: 5 }}
                        >
                          <Zap size={16} className="text-cyan-400" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Cart summary in mobile menu */}
                {totalQuantity > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">カート内</span>
                      <span className="text-white font-bold">{totalQuantity}点</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">神秘度</span>
                      <MysteryLevelBadge level={totalMysteryLevel} variant="compact" />
                    </div>
                  </motion.div>
                )}

                {/* Dimensional effects */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  animate={{
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}