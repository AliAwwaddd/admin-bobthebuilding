import { Form } from './ui/form'
import { SigninFormField } from './SigninFormField'
import LoadingButton from './LoadingButton'
import ErrorMessage from './ErrorMessage'

export default function EmailFormComponent({
  EmailForm,
  onSubmitEmail,
  globalError,
}: {
  EmailForm: any // Replace `any` with the specific type if available
  onSubmitEmail: (values: any) => Promise<void> // Replace `any` with the appropriate type
  globalError: string
}) {
  return (
    <Form {...EmailForm}>
      <form
        onSubmit={EmailForm.handleSubmit(onSubmitEmail)}
        className='space-y-6'
      >
        <SigninFormField
          name='email'
          label='Email'
          placeholder='email'
          inputType='email'
          formControl={EmailForm.control}
        />
        <LoadingButton
          pending={EmailForm.formState.isSubmitting}
          text='Continue'
        />
        {globalError && <ErrorMessage error={globalError} />}
      </form>
    </Form>
  )
}
