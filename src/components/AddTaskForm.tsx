'use client'
import { closeDialog, openDialog } from '@/redux/slices/taskSlice'
import { RootState } from '@/redux/TaskStore'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import CreateTaskStepper from './CreateTaskStepper'
import { Button } from './ui/button'

function AddTaskForm() {
  const dialogOpen = useSelector((state: RootState) => state.task.dialogOpen)
  const dispatch = useDispatch()

  return (
    <div className='mt-2'>
      <Dialog.Root
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            dispatch(openDialog())
          }
        }}
      >
        <Dialog.Trigger asChild>
          <section className='fixed bottom-8 left-1/2 -translate-x-1/2 transform'>
            <Button className='bg-gray-700 focus:bg-gray-800'>
              Add New Task
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
              Add task
            </Dialog.Title>

            <CreateTaskStepper />

            <Dialog.Close asChild>
              <button
                onClick={() => dispatch(closeDialog())}
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

export default AddTaskForm
