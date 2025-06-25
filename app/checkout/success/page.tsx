import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

// Dynamic import to avoid SSR issues
const CheckoutSuccessContent = dynamic(
  () => import('./checkout-success-content'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
)

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}