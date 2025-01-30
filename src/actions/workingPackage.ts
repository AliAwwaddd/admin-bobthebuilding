'use server'
import { createWorkingPackage, updateTaskOrder } from '@/api/workingPackage'
import { WorkingPackageSchema } from '@/lib/zod'
import { TaskOrderUpdateRequest } from '@/types/workingPackage'
import { revalidatePath } from 'next/cache'

export async function createWorkingPackageApi(
  _prevState: any,
  formData: FormData,
) {
  try {
    const workingPackageRequest = {
      name: formData.get('name'),
      project_id: formData.get('project_id'),
      invoiceReference: 0,
    }

    const pp = WorkingPackageSchema.safeParse(workingPackageRequest)

    if (pp.success) {
      const { data, error } = await createWorkingPackage(pp.data)
      if (error) throw error
      if (data) {
        revalidatePath(
          `/projects/${workingPackageRequest.project_id}/working-packages`,
        )
        return data
      }
      // redirect(
      //   `/projects/${workingPackageRequest.project_id}/working-packages`,
      // )
    } else {
      throw new Error(pp.error?.message)
    }
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

type prop1 = {
  taskOrderUpdateRequest: TaskOrderUpdateRequest[]
  wpId: string
}

export async function updateTaskOrderAction({
  taskOrderUpdateRequest,
  wpId,
}: prop1) {
  try {
    const { data, error } = await updateTaskOrder({
      taskOrderUpdateRequest,
      wpId,
    })
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

// export async function DownloadExcelFileAction(wpId: string) {
//   try {
//     if (!wpId) throw new Error('Missing wpId')

//     const fileBlob = await DownloadExcelFile(wpId) // 🔹 Get the actual Blob
//     return fileBlob
//   } catch (error) {
//     console.error('❌ Something went wrong:', error)
//     throw error
//   }
// }
