'use client'
import { updateProjectInfoAction } from '@/actions/project'
import { ProjectInfoSchema } from '@/lib/zod'
import { updateProjectType } from '@/types/Project'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { createContext, ReactNode, useContext } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

type Project = z.infer<typeof ProjectInfoSchema>

interface InfoContextType {
  isEditing: boolean
  closeForm: () => void
  openForm: () => void
  globalError: string
  dynamicProject: updateProjectType
  isSubmitting: boolean
  handleSave: (updatedProject: updateProjectType) => Promise<void>
  form: UseFormReturn<Project>
}

const InfoContext = createContext<InfoContextType | undefined>(undefined)

interface InfoContextProviderProps {
  children: ReactNode
  ProjectId: string
  project: updateProjectType
}

export const InfoContextProvider = ({
  children,
  ProjectId,
  project,
}: InfoContextProviderProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const [globalError, setGlobalError] = React.useState<string>('')
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [dynamicProject, setDynamicProject] =
    React.useState<updateProjectType>(project)

  const closeForm = () => {
    setIsEditing(false)
  }

  const openForm = () => {
    setIsEditing(true)
  }

  const form = useForm<Project>({
    resolver: zodResolver(ProjectInfoSchema),
    defaultValues: project,
  })

  const handleSave = async (updatedProject: updateProjectType) => {
    setIsSubmitting(true)
    try {
      if (globalError) setGlobalError('')

      const res = await updateProjectInfoAction({
        ProjectId: ProjectId,
        updatedProject,
      })
      setDynamicProject(res)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving project:', error)
      setGlobalError('Failed to save project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <InfoContext.Provider
      value={{
        isEditing,
        closeForm,
        openForm,
        globalError,
        dynamicProject,
        isSubmitting,
        handleSave,
        form,
      }}
    >
      {children}
    </InfoContext.Provider>
  )
}

export const useInfoContext = (): InfoContextType => {
  const context = useContext(InfoContext)
  if (!context) {
    throw new Error('useInfoContext must be used within an InfoContextProvider')
  }
  return context
}
