// import { auth } from '@/auth'
// import { NextRequest, NextResponse } from 'next/server'

// export default async function middleware(request: NextRequest) {
//   const publicRoutes = ['/auth/signup', '/auth/signin']

//   const session = await auth()
//   console.log('####### session #########', session)

//   const isLoggedIn = session?.user
//   const { pathname } = request.nextUrl

//   const isAuthRoute =
//     pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup')

//   if (!isAuthRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL('/auth/signin', request.nextUrl))
//   }

//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL('/', request.nextUrl))
//   }

//   if (isAuthRoute && !isLoggedIn) {
//     return NextResponse.next()
//   }

//   request.headers.set('Authorization', `Bearer ${session?.user?.access_token}`)
//   return NextResponse.next()
// }

export { auth as middleware } from '@/auth'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/auth/signup',
  ],
}
