'use client'

import ErrorMessage from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectWorkersContext } from '@/services/ProjectWorkersContext'
import { EmployeeResponse } from '@/types/employee'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export default function AddWorkerModal() {
  const {
    loading,
    globalError,
    handleSearch,
    handleAddWorker,
    submitWorkers,
    dialogOpen,
    setDialogOpen,
    searchTerm,
    filteredWorkers,
    selectedWorkers
  } = useProjectWorkersContext()

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className='bg-gray-600 focus:bg-gray-700'>Add Worker</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-10 bg-black/70' />
        <Dialog.Content
          className='fixed left-1/2 top-1/2 max-h-[600px] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-200 p-6 shadow-lg'
          style={{ zIndex: 11 }}
        >
          <Dialog.Title className='text-xl font-bold text-gray-700'>
            Projekt Erstellen
          </Dialog.Title>
          <Dialog.Description className='mt-2 text-sm text-gray-600'>
            Add workers to your project by searching or selecting from the list.
          </Dialog.Description>
          <div className='mt-6'>
            <Input
              placeholder='Search for name or role'
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full rounded-md border-0 border-gray-300 px-4 py-2'
            />
            <div className='mt-4 grid max-h-[350px] grid-cols-1 gap-4 overflow-y-auto rounded-md border bg-gray-50 p-4 sm:grid-cols-2'>
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
                          <p className='w-[170px] truncate text-sm font-medium text-gray-800'>
                            {worker.name}
                          </p>
                          <p className='text-xs text-gray-500'>{worker.role}</p>
                        </div>
                        <Button
                          size='sm'
                          onClick={() => handleAddWorker(worker)}
                          className='bg-red-500 hover:bg-red-600'
                          disabled={loading}
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
                        <p className='w-[190px] truncate text-sm font-medium text-gray-800'>
                          {worker.name}
                        </p>
                        <p className='text-xs text-gray-500'>{worker.role}</p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleAddWorker(worker)}
                        className='bg-gray-700 hover:bg-gray-800'
                        disabled={loading}
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
          <div className='mt-6 flex justify-between gap-1'>
            <Dialog.Close asChild>
              <Button
                variant='outline'
                disabled={loading}
                // onClick={() => setSelectedWorkers({})}
              >
                Cancel
              </Button>
            </Dialog.Close>
            {globalError && <ErrorMessage error={globalError} />}
            <Button
              className='bg-blue-600 text-white hover:bg-blue-700'
              onClick={submitWorkers}
              disabled={loading}
            >
              {loading ? (
                <>
                  Adding...
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
                </>
              ) : (
                'Add'
              )}
            </Button>
          </div>
          <Dialog.Close asChild>
            <button
              className='absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:text-gray-600'
              disabled={loading}
              // onClick={() => setSelectedWorkers({})}
            >
              <X className='h-5 w-5' />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
