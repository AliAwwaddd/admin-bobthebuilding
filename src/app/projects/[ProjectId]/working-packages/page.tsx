import { getProjectPackages } from '@/api/project'
import Filter from '@/components/Filter'
import { LoadingProjectSkeleton } from '@/components/LoadingProjectSkeleton'
import WorkingPackageList from '@/components/WorkingPackageList'
import { Suspense } from 'react'
import { NavigationButton } from '../info/components/NavigationButton'
import AddWorkingPackageModal from './AddWorkingPackageModal'
type Props = {
  params: Promise<{
    ProjectId: string
  }>
  searchParams: Promise<{
    status?: string
  }>
}

async function page({ params, searchParams }: Props) {
  const filter = (await searchParams)?.status ?? 'all'
  const { ProjectId } = await params
  const { data } = await getProjectPackages({ ProjectId })

  // if (!ProjectId) return <ErrorComponent />

  return (
    <main className='mt-0 p-8 pt-0'>
      {/* Back Navigation */}
      <div className='mb-4 flex items-center'>
        <NavigationButton label='Back to Projects' href='/projects' />
      </div>

      <h1 className='mb-6 text-center text-4xl font-bold text-gray-700'>
        Working Packages
      </h1>

      {data.length > 0 && (
        <Filter
          filterName='status'
          defaultFilter='all'
          options={['all', 'completed', 'inprogress']}
        />
      )}

      <Suspense fallback={<LoadingProjectSkeleton />} key={filter}>
        <WorkingPackageList
          filter={filter}
          ProjectId={ProjectId}
          workingPackages={data}
        />
      </Suspense>
      <AddWorkingPackageModal ProjectId={ProjectId} />
    </main>
  )
}

export default page
