'use server'

import { signup } from '@/api/auth'
import { signIn } from '@/auth'
import { SignupType } from '@/types/SignupType'

export async function handleSignin({
  nonce,
  code,
}: {
  nonce: string
  code: string
}) {
  const redirectTo = await signIn('credentials', {
    redirect: false,
    nonce,
    code,
    redirectTo: '/',
  })

  return redirectTo
}
// after(() => setTimeout(() => console.log('#########testing after########', 10000)))

export async function handleSignupAction(body: SignupType) {
  // Call the signIn function with credentials
  const { data, error } = await signup({ ...body })

  // after(() => setTimeout(() => console.log('testing after', 10000)))

  if (error) throw error
  if (data) return data
}

// wrapping this auth function in a try catch will catch the Next_Redirect as an error.
export const testSignin = async ({
  nonce,
  code,
}: {
  nonce: string
  code: string
}) => {
  try {
    await signIn('credentials', { nonce, code })
  } catch (e) {
    console.log('error: ' + e)
  }
}
