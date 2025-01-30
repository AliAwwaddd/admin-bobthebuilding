import { getCompanyEmployees } from '@/api/employee'
import { auth } from '@/auth'
import AddProjectForm from '@/components/AddProjectForm'
import Filter from '@/components/Filter'
import { LoadingProjectSkeleton } from '@/components/LoadingProjectSkeleton'
import PageTitle from '@/components/PageTitle'
import ProjectList from '@/components/ProjectList'
import { SkeletonButton } from '@/components/SkeletonButton'
import { Suspense } from 'react'
import ErrorComponent from './ErrorComponent'

type projectsPageType = {
  searchParams: Promise<{
    status?: string
  }>
}

async function page({ searchParams }: projectsPageType) {
  const filter = (await searchParams)?.status ?? 'all'
  const session = await auth()
  const CompanyId = session?.user?.company.id
  const token = session?.user.access_token

  if (!CompanyId) return <ErrorComponent />

  return (
    <main className='p-8 pt-0'>
      <PageTitle title='Projects' />

      <Filter
        filterName='status'
        defaultFilter='all'
        options={['all', 'completed', 'inprogress']}
      />

      <Suspense fallback={<LoadingProjectSkeleton />} key={filter}>
        <ProjectList filter={filter} CompanyId={CompanyId} token={token} />
      </Suspense>

      <Suspense fallback={<SkeletonButton />} key={CompanyId}>
        <AddProjectFormApi CompanyId={CompanyId} />
      </Suspense>
    </main>
  )
}

type prop = { CompanyId: string }
const AddProjectFormApi = async ({ CompanyId }: prop) => {
  const { data: workers, error } = await getCompanyEmployees(CompanyId)
  if (error) return <ErrorComponent message={error} />
  return <AddProjectForm workers={workers} CompanyId={CompanyId} />
}

export default page
