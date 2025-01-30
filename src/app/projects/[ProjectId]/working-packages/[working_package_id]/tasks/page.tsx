import { getProjectEmployees } from '@/api/employee'
import { getProjectMaterials } from '@/api/project'
import { getWorkingPackageTasks } from '@/api/workingPackage'
import ErrorComponent from '@/app/projects/ErrorComponent'
import NavigationCrumb from '@/components/NavigationCrumb'
import { SkeletonButton } from '@/components/SkeletonButton'
import TaskClient from '@/components/TaskClient'
import { workingPackageTaskType } from '@/types/task'
import { Suspense } from 'react'

type Props = {
  params: Promise<{
    ProjectId: string
    working_package_id: string
  }>
}

async function page({ params }: Props) {
  const { working_package_id, ProjectId } = await params

  const { data: tasks }: { data: workingPackageTaskType[]; error: any } =
    await getWorkingPackageTasks({ working_package_id })

  if (!working_package_id) return <ErrorComponent />

  return (
    <main className='p-8 pt-0'>
      <NavigationCrumb current='Tasks' prev='Working packages' />

      <h1 className='mb-8 text-center text-4xl font-bold text-gray-700'>
        Project Tasks
      </h1>

      <Suspense fallback={<SkeletonButton />}>
        <AddTaskFromApi ProjectId={ProjectId} tasks={tasks} />
      </Suspense>
    </main>
  )
}

const AddTaskFromApi = async ({ ProjectId, tasks }: any) => {
  const [workersResult, projectMaterialsResult] = await Promise.all([
    getProjectEmployees(ProjectId),
    getProjectMaterials({ ProjectId }),
  ])

  const { data: workers, error: workersError } = workersResult
  const { data: projectMaterials, error: projectMaterialsError } =
    projectMaterialsResult

  if (workersError || projectMaterialsError) {
    console.error('Error fetching data:', {
      workersError,
      projectMaterialsError,
    })
  }

  return (
    <TaskClient
      workers={workers}
      projectMaterials={projectMaterials}
      tasks={tasks}
      ProjectId={ProjectId}
    />
  )
}

export default page
