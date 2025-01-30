'use server'
import { getEmailCode } from '@/api/auth'

export async function handleEmailCode({ email }: { email: string }) {
  try {
    // Call the signIn function with credentials
    const { data, error } = await getEmailCode({ email })
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}
