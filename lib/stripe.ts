import Stripe from 'stripe'

// 環境変数の安全な検証
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!stripeSecretKey) {
  console.warn('⚠️ STRIPE_SECRET_KEY is not set - using placeholder for build')
}

if (!stripeWebhookSecret) {
  console.warn('⚠️ STRIPE_WEBHOOK_SECRET is not set - using placeholder for build')
}

// Stripe インスタンスの作成（安全なフォールバック付き）
export const stripe = new Stripe(
  stripeSecretKey || 'sk_test_placeholder_for_build_only', 
  {
    apiVersion: '2023-10-16',
    typescript: true,
  }
)

// Webhook署名の検証用（安全なフォールバック付き）
export const webhookSecret = stripeWebhookSecret || 'whsec_placeholder_for_build_only'