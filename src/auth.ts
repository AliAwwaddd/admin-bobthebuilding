import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getMe, login, SignInToSupabase } from './api/auth'
import { signinSchema } from './lib/zod'
import { updateSession } from './utils/supabase/middleware'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        let user = null

        const parsedCredentials = signinSchema.safeParse(credentials)
        if (!parsedCredentials.success) {
          console.error('Invalid credentials', parsedCredentials.error.errors)
          return null
        }

        const { nonce, code } = parsedCredentials.data

        const { data, error } = await login({ nonce, code })

        const { data: userInfo, error: meError } = await getMe({
          token: data.access_token,
        })

        await SignInToSupabase(userInfo)

        if (error || meError) {
          throw [error, meError]
        }

        user = { access_token: data.access_token, ...userInfo }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for sessions
    maxAge: 60 * 60 * 24 * 10, // Session expiration in seconds (7 days here)
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 10, // Cookie expiration in seconds (7 days here)
      },
    },
  },

  callbacks: {
    async authorized({ auth, request }) {
      // this will be called for each request sent to the server
      // console.log('🔄 Fetching auth session...')

      const publicRoutes = ['/auth/signup', '/auth/signin']
      const isLoggedIn = auth?.user
      const { pathname } = request.nextUrl

      // console.log('####### auth #########', auth)
      await updateSession(request)
      if (
        (pathname.startsWith('/auth/signin') ||
          pathname.startsWith('/auth/signup')) &&
        isLoggedIn
      ) {
        return Response.redirect(new URL('/', request.nextUrl))
      }

      if (publicRoutes.includes(pathname)) return true

      return !!auth?.user
    },

    jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    session({ session, token }) {
      if (token.user.access_token) {
        session.user = token.user
      }
      return session
    },
  },
  pages: {
    signIn: 'auth//signin',
  },
})
