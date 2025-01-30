'use server'
// import { supabase } from '@/lib/supabase'
import { SignupType } from '@/types/SignupType'
import api, { apiRequest } from './api'

import { signOut } from '@/auth'
import { createClient } from '@/utils/supabase/server'
// Login API request
// export const login = async (workerId) => {
//   return apiRequest(() => api.post('/login-mobile', { id: workerId }))
// }

export const getMe = async ({ token }: { token: string | null }) => {
  {
    if (token != null) {
      return apiRequest(() =>
        api.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      )
    } else {
      return apiRequest(() => api.get('/me'))
    }
  }
}

export const getMee = async () => apiRequest(() => api.get('/me'))

export const getEmailCode = async ({
  email,
}: {
  email: string
}): Promise<{ data: any; error: string | null }> => {
  return apiRequest(() => api.get(`/email-code?email=${email}`))
}

export const login = async ({
  nonce,
  code,
}: {
  nonce: string
  code: string
}): Promise<{ data: any; error: string | null }> => {
  return apiRequest(() => api.post('/login', { nonce, code }))
}

export const signup = async (
  body: SignupType,
): Promise<{ data: any; error: string | null }> => {
  return apiRequest(() => api.post('/register', { ...body }))
}

export const uploadImageToBucket = async ({
  companyId,
  fileName,
  image,
}: any) => {
  const supabase = await createClient()
  // await ensureBucket(companyId)
  const { data, error } = await supabase.storage
    .from(companyId)
    .upload(fileName, image, {
      cacheControl: '86400', // Cache for 24 hours
      upsert: false,
    })
  return { data, error }
}

export const ensureBucket = async (companyId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.storage.getBucket(companyId)
  if (error) {
    const { error: createError } =
      await supabase.storage.createBucket(companyId)
    if (createError) throw createError
  }
}

export const SignInToSupabase = async (user: any) => {
  const supabase = await createClient()

  try {
    // Attempt to log in the user
    const { data: authUser, error: loginError }: any =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.id,
      })

    if (authUser.session && authUser.user) {
      // console.log('User successfully logged in to supabase.')
      return // Exit if login is successful
    }

    console.warn('Login failed, proceeding to sign-up:', loginError.message)

    // If login fails, sign up the user
    const fallbackEmail = `no-email-${user.id}@nothing.com`
    const { data: authData, error: signupError }: any =
      await supabase.auth.signUp({
        email: user.email || fallbackEmail,
        password: user.id, // Ensure strong passwords
      })

    if (signupError) {
      throw new Error(`Error signing up user: ${signupError.message}`)
    }

    // Insert user details into the `users` table
    const { error: insertError }: any = await supabase.from('users').insert({
      id: user.id,
      auth_uuid: authData.user.id,
      name: user.name,
      email: user.email || null,
      company_id: user.company.id,
      company_name: user.company.name,
    })

    await ensureBucket(user.company.id)

    if (insertError) {
      throw new Error(
        `Error inserting user into database: ${insertError.message}`,
      )
    }

    // console.log('User successfully inserted into supabase:', userFromDB)
  } catch (error: any) {
    console.error(
      'Error during authentication flow:',
      error?.message || 'please try again.',
    )
    throw new Error(
      'An error occurred during authentication. Please try again.',
    )
  }
}

export const handleSignout = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  await signOut()

  // redirect('/')xp
}
