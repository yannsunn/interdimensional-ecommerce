import { NextAuthOptions, getServerSession } from 'next-auth'
import type { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: process.env.DATABASE_URL ? PrismaAdapter(prisma) as any : undefined,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, _req): Promise<User | null> {
        // Build-time or missing database handling
        if (!process.env.DATABASE_URL) {
          console.warn('⚠️ NextAuth: DATABASE_URL not set - authentication disabled')
          return null
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードを入力してください')
        }
        
        try {
          // Prevent timing attacks
          const start = Date.now()

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user || !user.password) {
            throw new Error('メールアドレスまたはパスワードが正しくありません')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('メールアドレスまたはパスワードが正しくありません')
          }

          // Ensure minimum response time to prevent timing attacks
          const elapsed = Date.now() - start
          const minTime = 200 // minimum 200ms
          if (elapsed < minTime) {
            await new Promise(resolve => setTimeout(resolve, minTime - elapsed))
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          } as User
        } catch (error) {
          console.error('NextAuth authorize error:', error)
          if (error instanceof Error) {
            throw error
          }
          throw new Error('認証中にエラーが発生しました')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // roleは直接userから取得できないため、データベースから取得する必要がある
        if (process.env.DATABASE_URL && user.email) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email },
              select: { role: true }
            })
            token.role = dbUser?.role || 'USER'
          } catch (error) {
            console.error('Error fetching user role:', error)
            token.role = 'USER'
          }
        } else {
          token.role = 'USER'
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

export async function getSession() {
  return await getServerSession(authOptions)
}