import { CreateMaterialAction } from '@/actions/project'
import { projectAddMaterialSchema } from '@/lib/zod'
import { MaterialType } from '@/types/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const defaultMaterial = {
  lv_position: '',
  name: '',
  quantity: '0',
  unit: '',
  price: '0',
  bezeichnung: '',
}

export default function useAddMaterialService(ProjectId: string) {
  const router = useRouter()
  const [isFormOpen, setShowForm] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string>('')
  const formRef = React.useRef<HTMLDivElement>(null)

  const ProjectMaterialForm = useForm<MaterialType>({
    resolver: zodResolver(projectAddMaterialSchema),
    defaultValues: defaultMaterial,
  })

  const onSubmit = async (material: MaterialType) => {
    try {
      setGlobalError('')
      await CreateMaterialAction({ material, ProjectId })
      setShowForm(false)
      router.refresh()
    } catch (error) {
      setGlobalError('Failed to save project. Please try again.')
      console.log('error', error)
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
  return {
    globalError,
    handleAddMaterialClick,
    onSubmit,
    isFormOpen,
    formRef,
    ProjectMaterialForm,
  }
}
