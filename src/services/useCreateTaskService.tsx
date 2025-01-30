import { createTaskAction, updateTaskAction } from '@/actions/task'
import { uploadTaskImageClient } from '@/helpers/uploadTaskImage'
import { createQuickTaskSchema, QuickTaskDefaultValues } from '@/lib/zod'
import {
  AddTask,
  closeDialog,
  searchWorkers,
  UpdateTask,
} from '@/redux/slices/taskSlice'
import { RootState } from '@/redux/TaskStore'
import { workingPackageTaskType } from '@/types/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

interface CreateTaskServiceAuthorized {
  unauthorized: false
  currentStep: number
  handleStepClick: (num: number) => void
  projectInfoForm: any // Adjust type
  setImages: (images: File[]) => void
  images: File[]
  searchTerm: string
  handleSearch: (term: string) => void
  handleNext: () => void
  handlePrev: () => void
  handleSubmit: () => void
  loading: boolean
  globalError: string
}

interface CreateTaskServiceUnauthorized {
  unauthorized: true
}

type CreateTaskServiceReturn =
  | CreateTaskServiceAuthorized
  | CreateTaskServiceUnauthorized

export default function useCreateTaskService(): CreateTaskServiceReturn {
  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const [globalError, setGlobalError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const dispatch = useDispatch()
  const [images, setImages] = React.useState<File[]>([])

  const selectedTaskOnEdit = useSelector(
    (state: RootState) => state.task.selectedTask,
  )

  const projectWorkers = useSelector(
    (state: RootState) => state.task.selectedWorkers,
  )

  const [searchTerm, setSearchTerm] = React.useState('')

  const CompanyId = useSelector((state: RootState) => state.task.CompanyId)
  const managerId = useSelector((state: RootState) => state.task.managerId)

  const onCloseDialog = () => dispatch(closeDialog())
  const selectedMaterials = useSelector(
    (state: RootState) => state.task.selectedMaterials,
  )

  // Form instances for each step
  const projectInfoForm = useForm<z.infer<typeof createQuickTaskSchema>>({
    resolver: zodResolver(createQuickTaskSchema),
    defaultValues: selectedTaskOnEdit?.name
      ? {
          name: selectedTaskOnEdit.name,
          location: selectedTaskOnEdit.location || '',
          description: selectedTaskOnEdit.description || '',
        }
      : QuickTaskDefaultValues,
  })

  const selectedWorkers =
    projectWorkers || // on edit it will get the assigned materials of the edited task
    selectedTaskOnEdit?.assigned_employees

  const { working_package_id } = useParams()

  if (!working_package_id) {
    return { unauthorized: true } as CreateTaskServiceUnauthorized
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => Math.max(prev - 1, 1))
    }
  }

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let flag = 0
      const isFormValid = await projectInfoForm.trigger()

      if (!isFormValid) {
        setGlobalError('Please complete all fields before submitting.')
        return
      }

      let createdTask: workingPackageTaskType
      if (selectedTaskOnEdit == null)
        createdTask = await createTaskAction({
          working_package_id: working_package_id.toString(),
        })
      else {
        flag = 1
        createdTask = selectedTaskOnEdit
      }

      let pictureUrls: string[] = []
      if (images.length) {
        pictureUrls = await uploadTaskImageClient({
          CompanyId,
          managerId,
          taskId: createdTask.id,
          images,
        })
      }

      const projectInfoValues = projectInfoForm.getValues()

      const taskCreated = {
        name: projectInfoValues.name,
        location: projectInfoValues.location,
        description: projectInfoValues.description || '',
        workerPictureUrls: createdTask.workerPictureUrls || [],
        pictureUrls: [
          ...pictureUrls,
          ...(selectedTaskOnEdit?.pictureUrls
            ? selectedTaskOnEdit?.pictureUrls
            : []),
        ],
        employeeDescription: createdTask.employeeDescription || '',
        status: createdTask.status || '',
        start: createdTask.start,
        deadline: createdTask.deadline,
        materials: createdTask.materials,
        report: createdTask.report || '',
        // order: createdTask.order,
        material_notes: createdTask.material_notes || '',
        assigned_employees: Object.keys(selectedWorkers) || [],
        assigned_materials: selectedMaterials.map((material) => ({
          material_id: material.material.id,
          expected_quantity: material.expected_quantity,
          required_quantity: material.required_quantity,
        })),
      }

      const data = await updateTaskAction({
        taskId: createdTask.id,
        task: taskCreated,
      })

      if (flag) {
        dispatch(UpdateTask(data))
      } else {
        dispatch(AddTask(data))
      }

      // Collect all data

      onCloseDialog()
    } catch (error) {
      console.error('Error creating project:', error)
      setGlobalError('An error occurred while submitting. ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    dispatch(searchWorkers(term))
  }

  return {
    unauthorized: false,
    currentStep,
    handleStepClick,
    projectInfoForm,
    setImages,
    images,
    searchTerm,
    handleSearch,
    handleNext,
    handlePrev,
    handleSubmit,
    loading,
    globalError,
  }
}
