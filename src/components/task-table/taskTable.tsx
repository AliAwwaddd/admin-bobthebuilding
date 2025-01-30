'use client'
import { Metadata } from 'next'

import { RootState } from '@/redux/TaskStore'
import { useSelector } from 'react-redux'
import { Columns } from './components/columns'
import { DataTable } from './components/data-table'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// type props = {
//   // tasks: workingPackageTaskType[]
//   onEditTask: any
// }

export default function TaskTable() {
  const data = useSelector((state: RootState) => state.task.tasks)
  const columnDefinitions = Columns()

  return (
    <>
      {/* <div className='md:hidden'> */}
      {/* <Image
          src="/examples/tasks-light.png"
          width={1280}npm
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        /> */}
      {/* </div> */}
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        {/* <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div> */}
        <DataTable data={data} columns={columnDefinitions} />
      </div>
    </>
  )
}
