import { toggleWorkerSelection } from '@/redux/slices/taskSlice'
import { RootState } from '@/redux/TaskStore'
import { EmployeeResponse } from '@/types/employee'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Button } from './ui2/button'

export default function AddTaskWorkersComponent({
  searchTerm,
  handleSearch,
}: any) {
  const dispatch = useDispatch()

  const filteredWorkers = useSelector(
    (state: RootState) => state.task.filteredWorkers,
  )

  const projectWorkers = useSelector(
    (state: RootState) => state.task.selectedWorkers,
  )

  const selectedTaskOnEdit = useSelector(
    (state: RootState) => state.task.selectedTask,
  )

  const selectedWorkers =
    projectWorkers || // on edit it will get the assigned materials of the edited task
    selectedTaskOnEdit?.assigned_employees

  const handleAddWorker = (worker: EmployeeResponse) => {
    dispatch(toggleWorkerSelection(worker))
  }

  return (
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
            {Object.values(selectedWorkers).map((worker: EmployeeResponse) => (
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
                >
                  remove
                </Button>
              </div>
            ))}
            {filteredWorkers?.map((worker: EmployeeResponse) => (
              <div
                key={worker.id}
                className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md hover:bg-gray-100'
              >
                <div>
                  <p className='flex w-[180px] truncate text-sm font-medium text-gray-800'>
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
          <p className='text-center text-sm text-gray-500'>No workers found.</p>
        )}
      </div>
    </div>
  )
}
