'use client'

import useSigninFormService from '@/services/useSigninFormService useSigninFormService'
import CodeFormComponent from './CodeFormComponent'
import EmailFormComponent from './EmailFormComponent'

export default function SigninForm() {
  const {
    EmailForm,
    CodeForm,
    nonce,
    globalError,
    onSubmitCode,
    onSubmitEmail,
    redirecting,
  } = useSigninFormService()

  return (
    <>
      {nonce ? (
        <CodeFormComponent
          CodeForm={CodeForm}
          onSubmitCode={onSubmitCode}
          globalError={globalError}
          redirecting={redirecting}
        />
      ) : (
        <EmailFormComponent
          EmailForm={EmailForm}
          onSubmitEmail={onSubmitEmail}
          globalError={globalError}
        />
      )}
    </>
  )
}
