'use client'
import { EmployeeResponse } from '@/types/employee'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'
import CreateProjectStepper from './CreateProjectStepper'
import { Button } from './ui/button'

function AddProjectForm({
  workers,
  CompanyId,
}: {
  workers: EmployeeResponse[]
  CompanyId: string
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <div className='mt-2'>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <section className='fixed bottom-8 left-1/2 -translate-x-1/2 transform'>
            <Button className='bg-gray-700 focus:bg-gray-800'>
              Add New Project
            </Button>
          </section>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 z-10 bg-black/70' />
          <Dialog.Content
            className='fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-200 p-6 shadow-lg'
            style={{ zIndex: 11 }}
          >
            <Dialog.Title className='text-xl font-bold text-gray-700'>
              PROJEKT ERSTELLEN
            </Dialog.Title>

            <CreateProjectStepper
              workers={workers}
              CompanyId={CompanyId}
              onCloseDialog={() => {
                setDialogOpen(false)
              }}
            />

            <Dialog.Close asChild>
              <button
                onClick={() => setDialogOpen(false)}
                className='absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:text-gray-600'
              >
                <X className='h-5 w-5' />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default AddProjectForm
