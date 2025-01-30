'use client'

import ErrorComponent from '@/app/projects/ErrorComponent'
import AnimatedStepper from '@/components/AnimatedStepper'
import { Button } from '@/components/ui2/button'
import useCreateTaskService from '@/services/useCreateTaskService'
import MaterialSelector from './addMaterial'
import AddTaskWorkersComponent from './AddTaskWorkersComponent'
import CreateTaskSubmitButton from './CreateTaskSubmitButton'
import TaskForm from './TaskForm'

interface Step {
  number: number
  label: string
}

const steps: Step[] = [
  { number: 1, label: 'Project info' },
  { number: 2, label: 'Workers' },
  { number: 3, label: 'Materials' },
]

export default function CreateTaskStepper() {
  const taskService = useCreateTaskService()

  if (taskService.unauthorized) {
    return <ErrorComponent message='You are not authorized to create a task.' />
  }

  const {
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
  } = taskService

  return (
    <div className='flex min-h-[510px] flex-1 flex-col justify-between'>
      {/* Animated Stepper */}
      <div className='flex-shrink-0'>
        <AnimatedStepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      <div className='mt-6 max-h-[455px] flex-grow items-center justify-center overflow-y-auto p-1'>
        {currentStep === 1 && (
          <TaskForm
            projectInfoForm={projectInfoForm}
            images={images}
            setImages={setImages}
          />
        )}

        {currentStep === 2 && (
          <AddTaskWorkersComponent
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
        )}

        {currentStep === 3 && (
          <MaterialSelector />
        )}
      </div>

      {/* navigation buttons */}
      <div className='mt-8 flex flex-shrink-0 justify-between'>
        <Button
          onClick={handlePrev}
          variant='secondary'
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext} disabled={currentStep === 3 || loading}>
            Next
          </Button>
        ) : (
          <CreateTaskSubmitButton
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>

      {globalError && <p className='mt-4 text-red-500'>{globalError}</p>}
    </div>
  )
}
