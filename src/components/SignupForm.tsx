'use client'

import { handleSignin, handleSignupAction } from '@/actions/authActions'
import { signinCodeSchema, signupFormSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CodeFormComponent from './CodeFormComponent'
import SignupFormComponent from './SignupFormComponent'

export default function SignupForm() {
  const [nonce, setNonce] = useState<string>('')
  const [redirecting, setRedirecting] = useState<boolean>(false)

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      employee_name: '',
      company_name: '',
    },
  })

  const CodeForm = useForm<z.infer<typeof signinCodeSchema>>({
    resolver: zodResolver(signinCodeSchema),
    defaultValues: {
      code: '',
    },
  })

  const [globalError, setGlobalError] = useState<string>('')

  const onSubmitSignup = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      setGlobalError('')

      await handleSignupAction({ ...values })
      // const { nonce, companyId } = await handleSignupAction({ ...values })

      // console.log('companyId', companyId)
      setNonce(nonce)
    } catch (error: any) {
      setGlobalError(error.message)
      // console.log('an unexpected error occurred. Please try again')
    }
  }

  const onSubmitCode = async (values: z.infer<typeof signinCodeSchema>) => {
    try {
      setGlobalError('')

      await handleSignin({ nonce: nonce, code: values.code })
      setRedirecting(true)
    } catch (error: any) {
      setGlobalError(error.message)
    }
  }

  return (
    <>
      {!nonce ? (
        <SignupFormComponent
          signupForm={signupForm}
          onSubmitSignup={onSubmitSignup}
          globalError={globalError}
        />
      ) : (
        <CodeFormComponent
          CodeForm={CodeForm}
          onSubmitCode={onSubmitCode}
          globalError={globalError}
          redirecting={redirecting}
        />
      )}
    </>
  )
}
