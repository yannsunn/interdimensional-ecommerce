import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeJs = async () => {
  const { loadStripe } = await import('@stripe/stripe-js')
  
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set')
  }
  
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
}