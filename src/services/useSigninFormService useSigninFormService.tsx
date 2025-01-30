import { handleSignin } from '@/actions/authActions'
import { handleEmailCode } from '@/actions/emailCodeAction'
import { signinCodeSchema, signinEmailSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function useSigninFormService() {
  const [nonce, setNonce] = useState<string>('')
  const [globalError, setGlobalError] = useState<string>('')
  const [redirecting, setRedirecting] = useState<boolean>(false)

  const EmailForm = useForm<z.infer<typeof signinEmailSchema>>({
    resolver: zodResolver(signinEmailSchema),
    defaultValues: {
      email: '',
    },
  })

  const CodeForm = useForm<z.infer<typeof signinCodeSchema>>({
    resolver: zodResolver(signinCodeSchema),
    defaultValues: {
      code: '',
    },
  })

  const onSubmitEmail = async (values: z.infer<typeof signinEmailSchema>) => {
    try {
      setGlobalError('')

      const { nonce } = await handleEmailCode({ email: values.email })

      setNonce(nonce)
    } catch (error: any) {
      setGlobalError(error.message)
      // console.log('an unexpected error occurred. Please try again')
    }
  }

  const onSubmitCode = async (values: z.infer<typeof signinCodeSchema>) => {
    try {
      setGlobalError('')
      const redirectTo = await handleSignin({ nonce: nonce, code: values.code })
      setRedirecting(true)
      window.location.href = redirectTo
    } catch (error: any) {
      setGlobalError(error.message)
    }
  }

  return {
    EmailForm,
    CodeForm,
    nonce,
    globalError,
    onSubmitCode,
    onSubmitEmail,
    redirecting,
  }
}

export default useSigninFormService
