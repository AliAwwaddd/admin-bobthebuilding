import LoadingButton from '@/components/LoadingButton'
import { ProjectInfoFormField } from '@/components/ProjectInfoFormField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useInfoContext } from './InfoContext'

export const ProjectInfoForm = () => {
  const { handleSave, isSubmitting, form, closeForm } = useInfoContext()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className='grid gap-4'>
        <ProjectInfoFormField
          name='name'
          label='Project Name'
          placeholder='Enter project name'
          formControl={form.control}
        />
        <ProjectInfoFormField
          name='description'
          label='Description'
          placeholder='Enter description'
          formControl={form.control}
        />
        <ProjectInfoFormField
          name='accounting_number'
          label='Accounting Number'
          placeholder='Enter accounting number'
          formControl={form.control}
        />
        <ProjectInfoFormField
          name='project_number'
          label='Project Number'
          placeholder='Enter project number'
          formControl={form.control}
        />
        <div className='flex justify-end space-x-4'>
          <Button variant='secondary' type='button' onClick={closeForm}>
            Cancel
          </Button>
          <div>
            <LoadingButton pending={isSubmitting} text='Save' />
          </div>
        </div>
      </form>
    </Form>
  )
}
