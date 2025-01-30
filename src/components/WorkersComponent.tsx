'use client'
import * as Dialog from '@radix-ui/react-dialog'

import AddWorkerModal from '@/app/projects/[ProjectId]/workers/AddWorkerModal'
import WorkerActions from '@/app/projects/[ProjectId]/workers/WorkerActions'
import { useProjectWorkersContext } from '@/services/ProjectWorkersContext'

function WorkersComponent() {
  const { projectWorkers } = useProjectWorkersContext()

  return (
    <>
      <div className='mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {projectWorkers?.map((worker) => (
          <div
            key={worker.id}
            className='relative rounded-xl border bg-gray-100 p-4 shadow-md transition-all hover:shadow-lg'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='h-16 w-16 flex-shrink-0 rounded-full bg-gray-200'>
                  {/* {worker.photoUrl ? (
                    <Image
                      src={worker.photoUrl}
                      alt={worker.name}
                      className='h-full w-full rounded-full object-cover'
                    />
                  ) : ( */}
                  <div className='flex h-full w-full items-center justify-center text-gray-500'>
                    {worker.name[0]}
                  </div>
                </div>
                <div>
                  <p className='w-[250px] truncate text-lg font-semibold'>
                    {worker.name}
                  </p>
                  <p className='text-sm text-gray-500'>{worker.role}</p>
                </div>
              </div>
              {/* More Icon with Delete Button */}
              <WorkerActions worker={worker} />
            </div>
          </div>
        ))}
      </div>
      <Dialog.Root>
        <AddWorkerModal key={Math.random()} />
      </Dialog.Root>
    </>
  )
}

export default WorkersComponent
