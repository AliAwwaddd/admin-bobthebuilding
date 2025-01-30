import { Controller } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import LoadingButton from './LoadingButton'
import { CardDescription } from './ui/card'
import { Form } from './ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './ui/input-otp'

export default function CodeFormComponent({
  CodeForm,
  onSubmitCode,
  globalError,
  redirecting,
}: {
  CodeForm: any
  onSubmitCode: (values: any) => Promise<void>
  globalError: string
  redirecting: boolean
}) {
  return (
    <Form {...CodeForm}>
      <form
        onSubmit={CodeForm.handleSubmit(onSubmitCode)}
        // action={testSignin}
        // onSubmit={CodeForm.handleSubmit(testSignin)}
        // action={CodeForm.handleSubmit(
        //   async (values: z.infer<typeof signinCodeSchema>) =>
        //     await testSignin({ nonce: '11111', code: values.code }),
        // )}
        className='flex flex-col items-center justify-center space-y-6'
      >
        <CardDescription className='text-medium m-0 p-0 text-center'>
          a verification code was sent to your email
        </CardDescription>
        <Controller
          name='code'
          control={CodeForm.control}
          render={({ field }) => (
            <>
              <InputOTP {...field} maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {CodeForm.formState.errors.code && (
                <p className='mt-1 text-sm text-red-500'>
                  {CodeForm.formState.errors.code.message}
                </p>
              )}
            </>
          )}
        />
        <LoadingButton
          pending={CodeForm.formState.isSubmitting}
          redirecting={redirecting}
          text='Sign in'
        />
        {globalError && <ErrorMessage error={globalError} />}
      </form>
    </Form>
  )
}
