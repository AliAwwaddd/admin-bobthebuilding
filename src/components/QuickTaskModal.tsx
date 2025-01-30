'use client'

import { Button } from '@/components/ui/button'
import useQuickTaskService from '@/services/useQuickTaskService'
import * as Dialog from '@radix-ui/react-dialog'
import { PlusCircle, X } from 'lucide-react'
import LoadingButton from './LoadingButton'
import QuickTaskForm from './QuickTaskForm'
import { Form } from './ui/form'

type QuickTaskModalProps = {
  packageId: string
}

export default function QuickTaskModal({ packageId }: QuickTaskModalProps) {
  const {
    dialogOpen,
    setDialogOpen,
    handleSubmit,
    globalError,
    projectInfoForm,
    images,
    setImages,
    isUnauthorized,
  } = useQuickTaskService({ packageId })

  if (isUnauthorized || !projectInfoForm) {
    return null
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className='flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600'>
          <PlusCircle className='h-5 w-5' /> Quick Task
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-10 bg-black/70' />
        <Dialog.Content className='fixed left-1/2 top-1/2 z-20 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none'>
          <Dialog.Title className='text-lg font-bold text-gray-800'>
            Create Quick Task
          </Dialog.Title>
          <Dialog.Description className='mt-2 text-sm text-gray-600'>
            Provide details for the task and upload pictures if needed.
          </Dialog.Description>
          <Form {...projectInfoForm}>
            <form onSubmit={projectInfoForm.handleSubmit(handleSubmit)}>
              <QuickTaskForm
                projectInfoForm={projectInfoForm}
                images={images}
                setImages={setImages}
              />

              <div className='mt-6 flex items-center justify-end gap-2'>
                <div className='flex flex-1 items-center justify-start'>
                  {globalError && <p className='text-red-500'>{globalError}</p>}
                </div>
                <Dialog.Close asChild>
                  <button
                    className='rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300'
                    disabled={projectInfoForm.formState.isSubmitting}
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <div>
                  <LoadingButton
                    text='Create'
                    pending={projectInfoForm.formState.isSubmitting}
                  />
                </div>
              </div>
            </form>
          </Form>
          <Dialog.Close asChild>
            <button
              className='absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:text-gray-600'
              disabled={projectInfoForm.formState.isSubmitting}
            >
              <X className='h-5 w-5' />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
