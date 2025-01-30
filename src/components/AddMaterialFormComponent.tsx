'use client'
import LoadingButton from '@/components/LoadingButton'
import { ProjectMaterialFormField } from '@/components/ProjectMaterialFormField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useAddMaterialService from '@/services/useAddMaterialService'
import ErrorMessage from './ErrorMessage'

type prop = {
  ProjectId: string
}
function AddMaterialFormComponent({ ProjectId }: prop) {
  const {
    globalError,
    handleAddMaterialClick,
    onSubmit,
    isFormOpen,
    formRef,
    ProjectMaterialForm,
  } = useAddMaterialService(ProjectId)
  return (
    <>
      <div className='flex justify-end'>
        <Button onClick={handleAddMaterialClick} className='bg-gray-700'>
          {isFormOpen ? 'Cancel' : 'Add New Material'}
        </Button>
      </div>

      {isFormOpen && (
        <div
          ref={formRef}
          className='rounded-md border border-gray-200 bg-white p-6 shadow-md'
        >
          <Form {...ProjectMaterialForm}>
            <form
              onSubmit={ProjectMaterialForm.handleSubmit(onSubmit)}
              className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
            >
              <ProjectMaterialFormField
                name='lvPosition'
                label='Position number'
                placeholder='Position number'
                formControl={ProjectMaterialForm.control}
              />
              <ProjectMaterialFormField
                name='name'
                label='Name'
                placeholder='Name'
                formControl={ProjectMaterialForm.control}
              />
              <ProjectMaterialFormField
                name='bezeichnung'
                label='Technical name'
                placeholder='Technical name'
                formControl={ProjectMaterialForm.control}
              />
              <ProjectMaterialFormField
                name='quantity'
                label='Quantity'
                placeholder='Quantity'
                formControl={ProjectMaterialForm.control}
              />
              <ProjectMaterialFormField
                name='unit'
                label='Unit'
                placeholder='Unit'
                formControl={ProjectMaterialForm.control}
              />
              <ProjectMaterialFormField
                name='unitPrice'
                label='Price'
                placeholder='Price'
                formControl={ProjectMaterialForm.control}
              />
              <LoadingButton
                pending={ProjectMaterialForm.formState.isSubmitting}
                text='Add'
                cn='bg-gray-700 flex-1 w-full'
              />
            </form>
          </Form>
          {globalError && <ErrorMessage error={globalError} />}
        </div>
      )}
    </>
  )
}

export default AddMaterialFormComponent
