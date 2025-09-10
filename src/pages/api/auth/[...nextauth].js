import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';

// Check if we're in local mode or if Prisma is available
const isLocalMode = process.env.NODE_ENV === 'development' && !process.env.GOOGLE_CLIENT_ID;
const isPrismaAvailable = prisma !== null;

const authOptions = {
  // Only use PrismaAdapter if Prisma is available and not in local mode
  ...(isPrismaAvailable && !isLocalMode && { adapter: PrismaAdapter(prisma) }),
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
  ],
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client
      if (user) {
        session.user.id = user.id;
        session.user.theme = user.theme;
        session.user.darkMode = user.darkMode;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Don't allow sign in if in local mode
      if (isLocalMode) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: isPrismaAvailable && !isLocalMode ? 'database' : 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
export { authOptions };
