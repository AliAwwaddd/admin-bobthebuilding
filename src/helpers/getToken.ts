import { auth } from '@/auth'

export const getToken = async (): Promise<string | null> => {
  const session = await auth()
  return session?.user.access_token || null
}
