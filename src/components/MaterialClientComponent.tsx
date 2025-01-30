'use client'
import { CreateMaterialAction } from '@/actions/project'
import { MaterialsTable } from '@/app/projects/[ProjectId]/materials/table'
import LoadingButton from '@/components/LoadingButton'
import { ProjectMaterialFormField } from '@/components/ProjectMaterialFormField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { projectAddMaterialSchema } from '@/lib/zod'
import { materialTableType, MaterialType } from '@/types/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

const defaultMaterial = {
  lv_position: '',
  name: '',
  quantity: '0',
  unit: '',
  price: '0',
  bezeichnung: '',
}

type prop = {
  materials: materialTableType[]
  ProjectId: string
}
export function MaterialClientComponent({ materials, ProjectId }: prop) {
  const router = useRouter()
  const [showForm, setShowForm] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string>('')
  const formRef = React.useRef<HTMLDivElement>(null)

  const ProjectMaterialForm = useForm<MaterialType>({
    resolver: zodResolver(projectAddMaterialSchema),
    defaultValues: defaultMaterial,
  })

  const onSubmit = async (material: MaterialType) => {
    try {
      setGlobalError('')
      // const res = await CreateMaterialAction({ material, ProjectId })
      await CreateMaterialAction({ material, ProjectId })
      router.refresh()
      setShowForm(false)
    } catch (error) {
      setGlobalError('Failed to save project. Please try again.')
      console.log('################error########', error)
    }
  }

  const handleAddMaterialClick = () => {
    ProjectMaterialForm.reset(defaultMaterial)
    setShowForm((prev) => !prev)
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
  return (
    <>
      {/* Materials table */}
      <MaterialsTable materials={materials} />

      {/* Add Material Button */}
      <div className='flex justify-end'>
        <Button onClick={handleAddMaterialClick} className='bg-gray-700'>
          {showForm ? 'Cancel' : 'Add New Material'}
        </Button>
      </div>

      {/* Add Material Form */}
      {showForm && (
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
              {globalError && <ErrorMessage error={globalError} />}
            </form>
          </Form>
        </div>
      )}
    </>
  )
}
