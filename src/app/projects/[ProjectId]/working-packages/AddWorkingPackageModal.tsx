'use client'

import { createWorkingPackageApi } from '@/actions/workingPackage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React, { useActionState } from 'react'

type Props = {
  ProjectId: string
}

function AddWorkingPackageModal({ ProjectId }: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [, formAction, pending] = useActionState(
    createWorkingPackageApi,
    undefined,
  )
  return (
    <div>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <section className='fixed bottom-8 left-1/2 -translate-x-1/2 transform'>
            <Button className='bg-gray-700 hover:bg-gray-800'>
              Add Working Package
            </Button>
          </section>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 z-10 bg-black/70' />
          <Dialog.Content
            className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg'
            style={{ zIndex: 11 }}
          >
            <Dialog.Title className='text-xl font-bold text-gray-700'>
              Create Working Package
            </Dialog.Title>
            <Dialog.Description className='mt-2 text-sm text-gray-500'>
              Enter the name for your new working package below.
            </Dialog.Description>

            {/* Form for creating a working package */}
            <form action={formAction} className='mt-4'>
              <input type='hidden' name='project_id' value={ProjectId} />
              {/* <input type='hidden' name='invoice_reference' value={0} /> */}
              <Input
                name='name'
                placeholder='Working Package Name'
                className='border-gray-300'
                required
              />

              <div className='mt-6 flex justify-end space-x-2'>
                <Button
                  variant='ghost'
                  onClick={() => setDialogOpen(false)}
                  className='text-gray-600 hover:text-gray-800'
                  type='button'
                >
                  Cancel
                </Button>
                <Button
                  className='bg-blue-600 hover:bg-blue-700'
                  type='submit'
                  disabled={pending}
                >
                  {pending ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </form>

            <Dialog.Close asChild>
              <button
                className='absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:text-gray-600'
                onClick={() => setDialogOpen(false)}
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

export default AddWorkingPackageModal
