'use client'

import { CreateProjectAction } from '@/actions/CreateProjectAction'
import AnimatedStepper from '@/components/AnimatedStepper'
import { Button } from '@/components/ui2/button'
import { ProjectInfoSchema } from '@/lib/zod'
import { EmployeeResponse } from '@/types/employee'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import MaterialUploadComp from './MaterialUploadComp'
import ProjectInfoFormComp from './ProjectInfoFormComp'
import { Input } from './ui/input'

interface Step {
  number: number
  label: string
}

const steps: Step[] = [
  { number: 1, label: 'Project info' },
  { number: 2, label: 'Workers' },
  { number: 3, label: 'Materials' },
]

type props = {
  workers: EmployeeResponse[]
  CompanyId: string
  onCloseDialog: any
}

export default function CreateProjectStepper({
  workers,
  CompanyId,
  onCloseDialog,
}: props) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [globalError, setGlobalError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)

  // add workers services

  const [searchTerm, setSearchTerm] = React.useState('')
  const [filteredWorkers, setFilteredWorkers] =
    React.useState<EmployeeResponse[]>(workers)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const notSelectedWorkers = workers.filter(
      (worker) => !(worker.id in selectedWorkers),
    )
    if (term == '') return setFilteredWorkers(notSelectedWorkers)
    setFilteredWorkers(
      notSelectedWorkers.filter(
        (worker) =>
          worker.name.toLowerCase().includes(term.toLowerCase()) ||
          worker.role.toLowerCase().includes(term.toLowerCase()) ||
          Object.keys(selectedWorkers).includes(worker.id),
      ),
    )
  }

  const handleAddWorker = (worker: EmployeeResponse) => {
    setSelectedWorkers((prev: any) => {
      const updatedWorkers = { ...prev }

      if (worker.id in updatedWorkers) {
        // Remove the worker if already selected
        delete updatedWorkers[worker.id]
        // console.log('filtered workers', filteredWorkers)
        setFilteredWorkers([...filteredWorkers, worker])
      } else {
        // Add the worker if not selected
        setFilteredWorkers(filteredWorkers.filter((w) => w.id != worker.id))
        updatedWorkers[worker.id] = worker
      }

      return updatedWorkers
    })
  }

  // add workers services
  const [selectedWorkers, setSelectedWorkers] = React.useState<
    Record<string, EmployeeResponse>
  >({})

  const [projectInfo, setProjectInfo] = React.useState({
    name: '',
    description: '',
    accounting_number: '',
    project_number: '',
  })

  // Form instances for each step
  const projectInfoForm = useForm<z.infer<typeof ProjectInfoSchema>>({
    resolver: zodResolver(ProjectInfoSchema),
    defaultValues: {
      name: '',
      description: '',
      accounting_number: '',
      project_number: '',
    },
  })

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  // const uploadMaterialsFile = async ({
  //   projectId,
  //   file,
  // }: ProjectMaterialsBody) => {
  //   // 1. Build FormData
  //   const formData = new FormData()
  //   formData.append('file', file)

  //   try {
  //     const response = await fetch(
  //       `/project-materials-gaeb?projectId=${projectId}`,
  //       {
  //         method: 'POST',
  //         body: formData,
  //       },
  //     )

  //     if (!response.ok) {
  //       const errorText = await response.text()
  //       throw new Error(errorText)
  //     }

  //     const data = await response.json()
  //     return { data, error: null }
  //   } catch (error) {
  //     console.error('uploadMaterialsFile error:', error)
  //     return { data: null, error }
  //   }
  // }

  const handleSubmit = async () => {
    try {
      const projectInfoValues = await projectInfoForm.trigger()

      if (!projectInfoValues) {
        setGlobalError('Please complete all fields before submitting.')
        return
      }

      setLoading(true)
      // console.log('selected workers', selectedWorkers)
      // Collect all data
      const data = {
        projectInfo: projectInfoForm.getValues(),
        selectedWorkers: selectedWorkers,
        materialsFile: file,
      }

      if (globalError) setGlobalError('')

      await CreateProjectAction({
        ...data.projectInfo,
        company_id: CompanyId,
        employees_id: Object.keys(selectedWorkers),
      })
      // const { data: newProject } = await CreateProjectAction({
      //   ...data.projectInfo,
      //   company_id: CompanyId,
      //   employees_id: Object.keys(selectedWorkers),
      // })

      // if (file) {
      //   // uploadMaterialsFile({ file, projectId })
      //   const formData = new FormData()
      //   formData.append('file', file)

      //   const token =
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjcuMC4wLjE6ODA4MCIsImlzcyI6IjEyNy4wLjAuMTo4MDgwIiwiZXhwIjoxNzM3NjI5MjQwLCJpZCI6IjRjNmFiZWIwLWFmNTUtNGRmOC1hOWZiLTI5ZmEyMzRkM2M3MiIsImVtYWlsIjoiYWxpYXd3YWQubWVAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJjb21wYW55SWQiOiJmZGMxNmU3Yy1hZDI0LTQ0MzgtYmYyMS04NGFlNjZhOTljOWQiLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIn0.rq2MHi8o_vOmf2BY941PtfO6ZA9yGtP1fE0NQphrn1c'
      //   const response = await axios.post(
      //     `http://localhost:8080/project-materials-gaeb?projectId=${projectId}`,
      //     {
      //       method: 'POST',
      //       headers: {
      //         // Attach token as 'Bearer token_value'
      //         Authorization: `Bearer ${token}`,
      //         'Content-Type': 'multipart/form-data',
      //       },
      //       body: formData,
      //     },
      //   )
      //   console.log(
      //     '################response################################',
      //     response,
      //   )
      // }

      onCloseDialog()
    } catch (error) {
      console.error('Error creating project:', error)
      setGlobalError('An error occurred while submitting. ' + error)
    } finally {
      setLoading(false)
    }
  }

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
          <ProjectInfoFormComp
            projectInfoForm={projectInfoForm}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
          />
        )}

        {currentStep === 2 && (
          <div>
            <Input
              placeholder='Search workers'
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full rounded-md border-0 border-gray-300 px-4 py-2'
            />
            <div className='h-70 mt-4 grid grid-cols-1 gap-4 rounded-md border bg-gray-50 p-4 sm:grid-cols-2'>
              {filteredWorkers.length > 0 ||
              Object.keys(selectedWorkers).length > 0 ? (
                <>
                  {Object.values(selectedWorkers).map(
                    (worker: EmployeeResponse) => (
                      <div
                        key={worker.id}
                        className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md hover:bg-red-100'
                      >
                        <div>
                          <p className='w-[190px] truncate text-sm font-medium text-gray-800'>
                            {worker.name}
                          </p>
                          <p className='text-xs text-gray-500'>{worker.role}</p>
                        </div>
                        <Button
                          size='sm'
                          onClick={() => handleAddWorker(worker)}
                          className='bg-red-500 hover:bg-red-600'
                        >
                          remove
                        </Button>
                      </div>
                    ),
                  )}
                  {filteredWorkers?.map((worker: EmployeeResponse) => (
                    <div
                      key={worker.id}
                      className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md hover:bg-gray-100'
                    >
                      <div>
                        <p className='flex w-[190px] truncate text-sm font-medium text-gray-800'>
                          {worker.name}
                        </p>

                        <p className='text-xs text-gray-500'>{worker.role}</p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleAddWorker(worker)}
                        className='bg-gray-600 hover:bg-gray-700'
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </>
              ) : (
                <p className='text-center text-sm text-gray-500'>
                  No workers found.
                </p>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <MaterialUploadComp
            handleFileChange={handleFileChange}
            isDragging={isDragging}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleRemoveFile={handleRemoveFile}
            file={file}
          />
        )}
      </div>

      <div className='mt-8 flex flex-shrink-0 justify-between'>
        <Button
          onClick={handlePrev}
          variant='secondary'
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext} disabled={currentStep === 3}>
            Next
          </Button>
        ) : (
          <div>
            <Button
              className='w-full'
              type='submit'
              onClick={handleSubmit}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <svg
                    className='mr-2 h-5 w-5 animate-spin text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                </div>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        )}
      </div>

      {globalError && <p className='mt-4 text-red-500'>{globalError}</p>}
    </div>
  )
}
