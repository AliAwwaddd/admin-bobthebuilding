import { getCompanyEmployees, getProjectEmployees } from '@/api/employee'
import { auth } from '@/auth'
import NavigationCrumb from '@/components/NavigationCrumb'
import WorkersComponent from '@/components/WorkersComponent'
import { ProjectWorkersProvider } from '@/services/ProjectWorkersContext'
import { EmployeeResponse } from '@/types/employee'
import { Suspense } from 'react'
import ErrorComponent from '../../ErrorComponent'

type Props = {
  params: Promise<{
    ProjectId: string
  }>
}

async function WorkersPage({ params }: Props) {
  const { ProjectId } = await params
  const session = await auth()
  const CompanyId = session?.user.company.id

  return (
    <main className='flex flex-col p-8'>
      <NavigationCrumb current='Workers' prev='Info' />

      <h1 className='mb-8 text-center text-4xl font-bold text-gray-800'>
        Project Workers
      </h1>

      {/* Grid Layout for Workers */}
      <Suspense fallback='Loading...'>
        <WorkersComponentApi ProjectId={ProjectId} CompanyId={CompanyId} />
      </Suspense>
    </main>
  )
}

const WorkersComponentApi = async ({ ProjectId, CompanyId }: any) => {
  const [
    { data: ProjectWorkers, error: error1 },
    { data: companyEmployees, error: error2 },
  ]: [
    { data: EmployeeResponse[]; error: any },
    { data: EmployeeResponse[]; error: any },
  ] = await Promise.all([
    getProjectEmployees(ProjectId),
    getCompanyEmployees(CompanyId),
  ])

  if (error1 || error2) {
    console.error('Error fetching employees:', error1 || error2)
    return <ErrorComponent message={error1 + error2} />
  }

  return (
    <ProjectWorkersProvider
      ProjectId={ProjectId}
      CompanyEmployees={companyEmployees}
      ProjectWorkers={ProjectWorkers}
    >
      <WorkersComponent
      />
    </ProjectWorkersProvider>
  )
}

export default WorkersPage
