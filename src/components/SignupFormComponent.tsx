import ErrorMessage from './ErrorMessage'
import LoadingButton from './LoadingButton'
import { SignupFormField } from './SignupFormField'
import { Form } from './ui/form'

function SignupFormComponent({
  signupForm,
  onSubmitSignup,
  globalError,
}: {
  signupForm: any
  onSubmitSignup: (values: any) => Promise<void>
  globalError: string
}) {
  return (
    <Form {...signupForm}>
      <form
        onSubmit={signupForm.handleSubmit(onSubmitSignup)}
        className='space-y-6'
      >
        <SignupFormField
          name='company_name'
          label='Company Name'
          placeholder='company'
          formControl={signupForm.control}
        />
        <SignupFormField
          name='employee_name'
          label='Name'
          placeholder='name'
          formControl={signupForm.control}
        />
        <SignupFormField
          name='email'
          label='Email'
          placeholder='email'
          inputType='email'
          formControl={signupForm.control}
        />

        {globalError && <ErrorMessage error={globalError} />}
        <LoadingButton
          pending={signupForm.formState.isSubmitting}
          text='Continue'
        />
      </form>
    </Form>
  )
}

export default SignupFormComponent
