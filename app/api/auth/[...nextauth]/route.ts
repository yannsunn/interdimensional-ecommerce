import NextAuth from 'next-auth'
import { authOptions } from '../../../../lib/auth'

// Create NextAuth handler
const handler = NextAuth(authOptions)

// Export named HTTP methods for App Router
export { handler as GET, handler as POST }