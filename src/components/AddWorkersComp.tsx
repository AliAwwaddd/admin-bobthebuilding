'use client'
import { EmployeeResponse } from '@/types/employee'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui2/button'

type props = {
  workers: EmployeeResponse[]
  // selectedWorkers: Record<string, EmployeeResponse>
  // setSelectedWorkers: any
}
function AddWorkersComp({ workers }: props) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filteredWorkers, setFilteredWorkers] =
    React.useState<EmployeeResponse[]>(workers)
  const [selectedWorkers, setSelectedWorkers] = React.useState<
    Record<string, EmployeeResponse>
  >({})

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
                  <p className='text-sm font-medium text-gray-800'>
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
          <p className='text-center text-sm text-gray-500'>No workers found.</p>
        )}
      </div>
    </div>
  )
}

export default AddWorkersComp
