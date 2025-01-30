// 'use cache'
import { getCompanyProjects } from '@/api/company'
import ErrorComponent from '@/app/projects/ErrorComponent'
import { Project } from '@/types/Project'
import NoProjects from './NoProjects'
import { ProjectCard } from './ProjectCard'
interface props {
  filter: string
  CompanyId: string
  token: string
}

async function ProjectList({ filter, CompanyId, token }: props) {
  // cacheTag('projects')
  const { data: projects } = await getCompanyProjects({
    CompanyId,
    token,
  })

  if (!projects) return <ErrorComponent message='could not load projects' />
  // error && console.log('error:', error)

  const displayedProjects =
    filter === 'all'
      ? projects
      : filter === 'completed'
        ? projects.filter((project) => project.completed)
        : projects.filter((project) => !project.completed)

  if (!displayedProjects.length) return <NoProjects filter={filter} />

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {displayedProjects.map((project: Project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          completed={project.completed}
          id={project.id}
        />
      ))}
    </div>
  )
}

export default ProjectList
