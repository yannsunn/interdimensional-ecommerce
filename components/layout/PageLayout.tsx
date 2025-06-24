import { ReactNode } from 'react'
import { Portal } from '@/components/effects/Portal'
import { OptimizedFloatingElements } from '@/components/effects/OptimizedFloatingElements'
import { Header } from '@/components/layout/Header'
import Image from 'next/image'

interface PageLayoutProps {
  children: ReactNode
  showEffects?: boolean
  showHeader?: boolean
  showPortalBackground?: boolean
  className?: string
}

export function PageLayout({ 
  children, 
  showEffects = true, 
  showHeader = true,
  showPortalBackground = false,
  className = "" 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${className}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      
      {/* Interdimensional Portal Background */}
      {showPortalBackground && (
        <div className="fixed inset-0 z-0 opacity-30">
          <Image
            src="/images/portal-bg.jpg"
            alt="Interdimensional Portal Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}
      
      {/* Effects */}
      {showEffects && (
        <>
          <Portal />
          <OptimizedFloatingElements />
        </>
      )}
      
      {/* Header */}
      {showHeader && <Header />}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}