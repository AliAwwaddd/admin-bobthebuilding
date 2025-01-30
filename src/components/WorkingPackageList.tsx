import { Project } from '@/types/Project'
import QuickTaskModal from './QuickTaskModal'
import { WorkingPackageCard } from './WorkingPackageCard'
import DownloadExcelFileComponent from './downloadExcelFileComponent'
function WorkingPackageList({
  filter,
  ProjectId,
  workingPackages,
}: {
  filter: string
  ProjectId: string
  workingPackages: any
}) {
  let displayedWPs: Project[] = []

  if (filter === 'all') {
    displayedWPs = workingPackages
  } else if (filter === 'completed') {
    displayedWPs = workingPackages.filter(
      (wp: any) => wp.percentageOfDoneTasks == 100,
    )
  } else if (filter === 'inprogress') {
    displayedWPs = workingPackages.filter(
      (wp: any) => wp.percentageOfDoneTasks != 100,
    )
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {displayedWPs?.map((wp: any) => (
        <WorkingPackageCard
          key={wp.id}
          id={wp.id}
          name={wp.name}
          description={wp.description}
          completed={wp.completed}
          progress={wp.percentageOfDoneTasks}
          ProjectId={ProjectId}
        >
          <div className='mt-4 flex justify-between'>
            <DownloadExcelFileComponent wpId={wp.id} />
            <QuickTaskModal packageId={wp.id} />
          </div>
        </WorkingPackageCard>
      ))}
    </div>
  )
}

export default WorkingPackageList
