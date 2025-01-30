import { getProject } from '@/api/employee'
import images from '@/constants/images'
import { Suspense } from 'react'
import ErrorComponent from '../../ErrorComponent'
import { ImageCard } from './components/ImageCard'
import { InfoContextProvider } from './components/InfoContext'
import { NavigationButton } from './components/NavigationButton'
import { ProjectInfoCard } from './components/ProjectInfoCard'
import { ProjectInfoCardSkeleton } from './components/ProjectInfoCardSkeleton'

type Props = {
  params: Promise<{
    ProjectId: string
  }>
}

async function Info({ params }: Props) {
  const { ProjectId } = await params

  if(!ProjectId) return <ErrorComponent />

  return (
    <div className='mt-0 space-y-6 p-8 pt-0'>
      <div className='flex items-center'>
        <NavigationButton label='Back to Projects' href='/projects' />
      </div>

      {/* Page Title */}
      <h1 className='mb-8 text-center text-4xl font-bold text-gray-800'>
        Project Details
      </h1>

      {/* Project Info Card */}
      <Suspense fallback={<ProjectInfoCardSkeleton />}>
        <ProjectInfoCardServer ProjectId={ProjectId || ''} />
      </Suspense>

      {/* Materials and Workers Section */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <ImageCard
          href={`/projects/${ProjectId}/materials`}
          imageSrc={images.materials}
          alt='Materials'
          title='Materials'
        />
        <ImageCard
          href={`/projects/${ProjectId}/workers`}
          imageSrc={images.workers}
          alt='Workers'
          title='Workers'
        />
      </div>
    </div>
  )
}

type prop = {
  ProjectId: string
}
async function ProjectInfoCardServer({ ProjectId }: prop) {
  const { data: project, error } = await getProject({ ProjectId })

  if (error) return <ErrorComponent message='failed to get project' />

  return (
    <InfoContextProvider ProjectId={ProjectId} project={project}>
      <ProjectInfoCard />
    </InfoContextProvider>
  )
}
export default Info
