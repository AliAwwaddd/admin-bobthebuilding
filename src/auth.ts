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
    // async authorized({ auth, request }) {
    //   // this will be called for each request sent to the server
    //   // console.log('🔄 Fetching auth session...')

    //   const publicRoutes = ['/auth/signup', '/auth/signin']
    //   const isLoggedIn = auth?.user
    //   const { pathname } = request.nextUrl

    //   await updateSession(request)
    //   if (
    //     (pathname.startsWith('/auth/signin') ||
    //       pathname.startsWith('/auth/signup')) &&
    //     isLoggedIn
    //   ) {
    //     return Response.redirect(new URL('/', request.nextUrl))
    //   }

    //   if (publicRoutes.includes(pathname)) return true

    //   return !!auth?.user
    // },

    async authorized({ auth, request }) {
      const publicRoutes = ['/auth/signup', '/auth/signin']

      // * case 1: user is accessing a public route.
      const { pathname } = request.nextUrl
      if (publicRoutes.includes(pathname)) return true

      // * case 2: user is logged in but trying to access signin or signup pages.
      const accessToken = auth?.user.access_token
      if (
        (pathname.startsWith('/auth/signin') ||
          pathname.startsWith('/auth/signup')) &&
        accessToken
      ) {
        return Response.redirect(new URL('/', request.nextUrl))
      }

      if (accessToken) {
        await updateSession(request)
      }

      // * default: if he's logged in, let him pass.
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

// #################################################################################################################################################################

// import NextAuth from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'
// import { getMe, login, SignInToSupabase } from './api/auth'
// import { signinSchema } from './lib/zod'
// import { updateSession } from './utils/supabase/middleware'

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   trustHost: true,
//   providers: [
//     Credentials({
//       credentials: {},
//       async authorize(credentials) {
//         let user = null

//         const parsedCredentials = signinSchema.safeParse(credentials)
//         if (!parsedCredentials.success) {
//           console.error('Invalid credentials', parsedCredentials.error.errors)
//           return null
//         }

//         const { nonce, code } = parsedCredentials.data

//         const { data, error } = await login({ nonce, code })

//         const { data: userInfo, error: meError } = await getMe({
//           token: data.access_token,
//         })

//         await SignInToSupabase(userInfo)

//         if (error || meError) {
//           throw [error, meError]
//         }

//         user = { access_token: data.access_token, ...userInfo }

//         return user
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt', // Use JWT for sessions
//     maxAge: 60 * 60 * 24 * 10, // Session expiration in seconds (7 days here)
//   },
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24 * 10, // Cookie expiration in seconds (7 days here)
//       },
//     },
//   },

//   callbacks: {
//     async authorized({ auth, request }) {
//       // this will be called for each request sent to the server

//       const publicRoutes = ['/auth/signup', '/auth/signin']
//       const { pathname } = request.nextUrl

//       // Get access token from cookies (instead of `auth`)
//       // const accessToken = request.cookies.get('access_token')?.value
//       const accessToken = auth?.user.access_token

//       // if (accessToken) {
//       //   request.headers.set('Authorization', `Bearer ${accessToken}`)
//       // }

//       if (accessToken) {
//         await updateSession(request)
//       }

//       if (
//         (pathname.startsWith('/auth/signin') ||
//           pathname.startsWith('/auth/signup')) &&
//         accessToken
//       ) {
//         return Response.redirect(new URL('/', request.nextUrl))
//       }

//       if (publicRoutes.includes(pathname)) return true

//       return !!auth?.user
//     },

//     jwt({ token, user }) {
//       if (user) {
//         token.user = user
//       }

//       // const cookie = await cookies()
//       // cookie.set('access_token', user.access_token, {
//       //   httpOnly: true,
//       //   secure: process.env.NODE_ENV === 'production',
//       //   path: '/',
//       //   maxAge: 60 * 60 * 24 * 10,
//       // })

//       return token
//     },
//     session({ session, token }) {
//       if (token.user.access_token) {
//         session.user = token.user
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: 'auth//signin',
//   },
// })
