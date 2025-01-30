import { createTaskAction, updateTaskAction } from '@/actions/task'
import { uploadTaskImageClient } from '@/helpers/uploadTaskImage'
import { createQuickTaskSchema, QuickTaskDefaultValues } from '@/lib/zod'
import { updateTaskRequest } from '@/types/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type QuickTaskModalProps = {
  packageId: string
}

export default function useQuickTaskService({
  packageId,
}: QuickTaskModalProps) {
  const [images, setImages] = useState<File[]>([])
  const [globalError, setGlobalError] = useState<string>('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data: session, status } = useSession()

  const projectInfoForm = useForm<z.infer<typeof createQuickTaskSchema>>({
    resolver: zodResolver(createQuickTaskSchema),
    defaultValues: QuickTaskDefaultValues,
  })

  // 🔥 Ensure session is authenticated before proceeding
  if (status !== 'authenticated') {
    return { isUnauthorized: true } // Return an indicator instead of JSX
  }

  const handleSubmit = async (data: z.infer<typeof createQuickTaskSchema>) => {
    try {
      setGlobalError('')

      // 🔥 Ensure `session.data` exists before accessing properties
      if (!session?.user?.id || !session?.user?.company?.id) {
        setGlobalError('Invalid session data.')
        return
      }

      const createdTask = await createTaskAction({
        working_package_id: packageId,
      })

      let pictureUrls: string[] = []
      if (images.length) {
        pictureUrls = await uploadTaskImageClient({
          CompanyId: session.user.company.id,
          managerId: session.user.id,
          taskId: createdTask.id,
          images,
        })
      }

      const task: updateTaskRequest = {
        name: data.name,
        location: data.location,
        description: data.description || '',
        workerPictureUrls: [],
        pictureUrls: [...pictureUrls],
        employeeDescription: createdTask.employeeDescription || '',
        status: createdTask.status || '',
        start: createdTask.start,
        deadline: createdTask.deadline,
        materials: createdTask.materials,
        report: createdTask.report || '',
        material_notes: createdTask.material_notes || '',
        assigned_employees: [],
        assigned_materials: [],
      }

      await updateTaskAction({ task, taskId: createdTask.id })
      setImages([])
      projectInfoForm.reset()
      setDialogOpen(false)
    } catch (error: any) {
      setGlobalError(
        error.message || 'An error occurred while creating the task.',
      )
      console.error('Error creating task:', error)
    }
  }

  return {
    dialogOpen,
    setDialogOpen,
    handleSubmit,
    globalError,
    projectInfoForm,
    images,
    setImages,
    isUnauthorized: false,
  }
}
