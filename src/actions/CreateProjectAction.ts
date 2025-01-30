'use server'
import { CreateProject, uploadMaterialsFile } from '@/api/employee'
import { CreateProjectType, ProjectMaterialsBody } from '@/types/Project'
import { revalidatePath } from 'next/cache'
export async function CreateProjectAction(body: CreateProjectType) {
  try {
    // Call the signIn function with credentials
    // console.log('body', body)
    const { data, error } = await CreateProject(body)
    if (error) throw error

    // revalidateTag('projects')
    revalidatePath('/projects')
    return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

export async function AddProjectMaterials(body: ProjectMaterialsBody) {
  try {
    // Call the signIn function with credentials
    // console.log('##########################################', body)
    const { data, error } = await uploadMaterialsFile(body)
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}
