'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  href: string
  icon: React.ElementType
  label: string
  badge?: number
  isActive?: boolean
}

export function BottomNavigation() {
  const pathname = usePathname()
  const { getComputedValues } = useCartStore()
  const { totalItems } = getComputedValues()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems: NavItem[] = [
    {
      href: '/',
      icon: Home,
      label: 'ホーム',
      isActive: pathname === '/'
    },
    {
      href: '/products',
      icon: Search,
      label: '商品',
      isActive: pathname.startsWith('/products')
    },
    {
      href: '/cart',
      icon: ShoppingCart,
      label: 'カート',
      badge: totalItems,
      isActive: pathname === '/cart'
    },
    {
      href: '/favorites',
      icon: Heart,
      label: 'お気に入り',
      isActive: pathname === '/favorites'
    },
    {
      href: '/profile',
      icon: User,
      label: 'マイページ',
      isActive: pathname.startsWith('/profile') || pathname.startsWith('/login')
    }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Background with backdrop blur */}
          <div className="bg-black/95 backdrop-blur-md border-t border-purple-500/50">
            {/* Safe area padding for devices with home indicator */}
            <div className="px-4 py-2 pb-safe">
              <div className="flex items-center justify-around">
                {navItems.map((item, index) => (
                  <NavButton
                    key={item.href}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Floating glow effect */}
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

interface NavButtonProps {
  item: NavItem
  index: number
}

function NavButton({ item, index }: NavButtonProps) {
  const { href, icon: Icon, label, badge, isActive } = item

  return (
    <Link href={href} className="group">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`
          relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[52px]
          ${isActive 
            ? 'text-purple-400 bg-purple-500/20' 
            : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
          }
        `}
      >
        {/* Icon with badge */}
        <div className="relative">
          <Icon 
            size={20} 
            className={`transition-all duration-300 ${
              isActive ? 'scale-110' : 'group-hover:scale-105'
            }`}
          />
          
          {/* Badge */}
          {badge && badge > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
            >
              {badge > 99 ? '99+' : badge}
            </motion.div>
          )}
        </div>
        
        {/* Label */}
        <span className={`
          text-xs mt-1 font-medium transition-all duration-300
          ${isActive ? 'text-purple-300' : 'text-gray-500 group-hover:text-gray-400'}
        `}>
          {label}
        </span>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          />
        )}
        
        {/* Ripple effect on tap */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-purple-500/10 scale-0 group-active:scale-100 transition-transform duration-150 rounded-lg" />
        </div>
      </motion.div>
    </Link>
  )
}

// Hook to get safe area insets
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  useEffect(() => {
    const updateSafeArea = () => {
      const style = getComputedStyle(document.documentElement)
      setSafeArea({
        top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
        bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
        left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0'),
        right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0')
      })
    }

    updateSafeArea()
    window.addEventListener('resize', updateSafeArea)
    return () => window.removeEventListener('resize', updateSafeArea)
  }, [])

  return safeArea
}