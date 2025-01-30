'use client'
import ErrorComponent from '@/app/projects/ErrorComponent'
import {
  saveTaskOrderList,
  setCompanyId,
  setManagerId,
  setProjectId,
  setProjectMaterials,
  setTasks,
  setWorkers,
} from '@/redux/slices/taskSlice'
import { RootState, store } from '@/redux/TaskStore'
import { EmployeeResponse } from '@/types/employee'
import { ProjectMaterialType } from '@/types/Project'
import { workingPackageTaskType } from '@/types/task'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import AddTaskForm from './AddTaskForm'
import TaskTable from './task-table/taskTable'
import TaskList from './TaskList'
import { Button } from './ui2/button'

const NoTasksView = () => (
  <div className='mt-10 flex h-96 flex-col items-center justify-center'>
    <p className='mt-2 text-gray-500'>
      This working package has no tasks yet. You can start by adding new tasks.
    </p>
    <AddTaskForm />
  </div>
)

function TaskClient({
  workers,
  projectMaterials,
  tasks,
  ProjectId,
}: {
  workers: EmployeeResponse[]
  projectMaterials: ProjectMaterialType[]
  ProjectId: string
  tasks: workingPackageTaskType[]
}) {
  const session = useSession().data
  const CompanyId = session?.user.company.id
  const managerId = session?.user.id
  if (!managerId)
    return <ErrorComponent message='your are not authorized. please login.' />
  return (
    <>
      <Provider store={store}>
        <Child
          workers={workers}
          CompanyId={CompanyId}
          projectMaterials={projectMaterials}
          managerId={managerId}
          tasks={tasks}
          ProjectId={ProjectId}
        />
      </Provider>
    </>
  )
}

function Child({
  workers,
  CompanyId,
  projectMaterials,
  managerId,
  tasks,
  ProjectId,
}: {
  workers: EmployeeResponse[]
  CompanyId: string
  projectMaterials: ProjectMaterialType[]
  managerId: string
  tasks: workingPackageTaskType[]
  ProjectId: string
}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTasks(tasks))
    dispatch(setWorkers(workers))
    dispatch(setCompanyId(CompanyId))
    dispatch(setProjectId(ProjectId))
    dispatch(setManagerId(managerId))
    dispatch(setProjectMaterials(projectMaterials))
  }, [
    tasks,
    workers,
    CompanyId,
    ProjectId,
    managerId,
    projectMaterials,
    dispatch,
  ])

  const isTaskOrderOpen = useSelector(
    (state: RootState) => state.task.isTaskOrderOpen,
  )

  const { working_package_id } = useParams()

  if (!tasks || tasks.length === 0) {
    return <NoTasksView />
  }

  const updateTasksOrder = () => {
    dispatch(saveTaskOrderList(working_package_id as string))
  }

  return (
    <>
      {!isTaskOrderOpen ? (
        <>
          <TaskTable />
          <AddTaskForm />
        </>
      ) : (
        <>
          <section className='fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform'>
            <Button
              variant='default'
              size='lg'
              className='flex items-center gap-2 bg-blue-600 px-4 py-2 font-semibold shadow-md transition-transform hover:scale-105 hover:bg-blue-700'
              onClick={updateTasksOrder}
            >
              Save
            </Button>
          </section>
          <TaskList />
        </>
      )}
    </>
  )
}

export default TaskClient
