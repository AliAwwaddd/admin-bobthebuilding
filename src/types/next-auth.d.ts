// types/next-auth.d.ts

import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  export interface User {
    access_token
    id
    name
    email
    company: {
      id
      name
    }
    role
  }
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
  }
}
