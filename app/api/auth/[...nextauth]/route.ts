import NextAuth from 'next-auth'
import { authOptions } from '../../../../lib/auth'

// Create NextAuth handler for App Router
const handler = NextAuth(authOptions)

// Export named HTTP methods for App Router compatibility
export { handler as GET, handler as POST }
export default handler