'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Portal } from '@/components/effects/Portal'
import { GlowingText } from '@/components/effects/GlowingText'
import { EmailFormField, PasswordFormField } from '@/components/forms/FormField'
import { LoadingButton } from '@/components/ui/LoadingSpinner'
import { Alert } from '@/components/ui/Alert'
import { useFormValidation, createEmailField, createPasswordField } from '@/hooks/useFormValidation'
import { validateEmail } from '@/lib/type-utils'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  
  // Form validation setup
  const form = useFormValidation<LoginFormData>([
    createEmailField('email', true),
    createPasswordField('password', true)
  ], {
    validateOnChange: true,
    validateOnBlur: true
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate form
    if (!form.validateForm()) {
      form.setTouchedAll()
      return
    }
    
    form.setSubmitting(true)
    
    try {
      const result = await signIn('credentials', {
        email: form.values.email,
        password: form.values.password,
        redirect: false,
      })

      if (result?.error) {
        form.setError('email', 'メールアドレスまたはパスワードが正しくありません')
      } else {
        // ログイン成功後、セッションを取得してリダイレクト
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      form.setError('email', 'ログイン中にエラーが発生しました')
    } finally {
      form.setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-gradient-shift" />
      <Portal />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-500 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <GlowingText className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                異次元通販
              </GlowingText>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">
              異次元へのログイン
            </h1>
            <p className="text-gray-400">
              あなたの魂の周波数で認証します
            </p>
          </div>

          {/* Test Account Info */}
          <div className="bg-blue-500/20 border border-blue-400 rounded-lg p-4 mb-6">
            <h3 className="text-blue-300 font-semibold mb-2">テストアカウント</h3>
            <div className="text-sm text-blue-200">
              <p>管理者: admin@interdimensional.shop / admin123</p>
              <p>ユーザー: test@example.com / test123</p>
            </div>
          </div>

          {/* Error Message */}
          {(form.errors.email || form.errors.password) && (
            <Alert
              type="error"
              variant="mystical"
              message={form.errors.email?.[0] || form.errors.password?.[0] || 'エラーが発生しました'}
              className="mb-6"
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <EmailFormField
              {...form.getFieldProps('email')}
              label="異次元メールアドレス"
              placeholder="your@email.com"
              variant="mystical"
              required
            />

            {/* Password Field */}
            <PasswordFormField
              {...form.getFieldProps('password')}
              label="秘密の呪文"
              placeholder="••••••••"
              variant="mystical"
              required
            />

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              isLoading={form.isSubmitting}
              loadingText="異次元接続中..."
              disabled={!form.isValid && form.isDirty}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              <span className="relative z-10">✨ 異次元にログイン ✨</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            </LoadingButton>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              まだ異次元のアカウントをお持ちでない方は
            </p>
            <Link
              href="/register"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              新規登録で魂を異次元に登録
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
            >
              ← 異次元通販トップに戻る
            </Link>
          </div>
        </div>

        {/* Mystery Message */}
        <div className="mt-6 text-center">
          <Alert
            type="info"
            variant="mystical"
            message="🔮 龍神があなたのログインを見守っています 🔮"
            className="animate-pulse"
          />
        </div>
      </div>
    </div>
  )
}