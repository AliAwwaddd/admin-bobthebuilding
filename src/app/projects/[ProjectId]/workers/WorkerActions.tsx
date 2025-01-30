'use client'
import { removeEmployeeFromProjectAction } from '@/actions/project'
import { Button } from '@/components/ui/button'
import { useProjectWorkersContext } from '@/services/ProjectWorkersContext'
import { MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'

type WorkerActionsProps = {
  worker: any
}

const WorkerActions = ({ worker }: WorkerActionsProps) => {
  const [showDelete, setShowDelete] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { ProjectId, deleteProjectWorker } = useProjectWorkersContext()

  const handleRemoveWorker = () => {
    setLoading(true)
    try {
      removeEmployeeFromProjectAction({
        EmployeeId: worker.id,
        ProjectId,
      })
      deleteProjectWorker(worker.id)
    } catch (error) {
      console.error('Failed to remove employee:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-row items-center justify-center'>
      {!loading ? (
        showDelete && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleRemoveWorker}
            className='text-red-600 hover:text-red-800'
          >
            <Trash className='h-5 w-5' />
          </Button>
        )
      ) : (
        <div>
          <svg
            className='mr-2 h-5 w-5 animate-spin text-black'
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
      )}
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setShowDelete(!showDelete)}
        className='text-gray-500 hover:text-gray-800'
      >
        <MoreHorizontal className='h-5 w-5' />
      </Button>
    </div>
  )
}

export default WorkerActions
