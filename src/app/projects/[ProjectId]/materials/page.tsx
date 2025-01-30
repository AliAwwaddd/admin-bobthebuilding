import { getProjectMaterials } from '@/api/project'
import AddMaterialFormComponent from '@/components/AddMaterialFormComponent'
import NavigationCrumb from '@/components/NavigationCrumb'
import { MaterialsTable } from './table'

type Props = {
  params: Promise<{
    ProjectId: string
  }>
}

async function Page({ params }: Props) {
  const { ProjectId } = await params

  const { data: materials } = await getProjectMaterials({ ProjectId })

  return (
    <main className='p-8 pt-0'>
      <NavigationCrumb current='Materials' prev='Info' />

      <h1 className='mb-8 text-center text-4xl font-bold text-gray-700'>
        Project Materials
      </h1>
      <MaterialsTable materials={materials} />
      <AddMaterialFormComponent ProjectId={ProjectId} />
    </main>
  )
}

export default Page
