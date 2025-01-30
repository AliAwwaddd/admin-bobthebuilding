import {
  TaskOrderUpdateRequest,
  WorkingPackageRequest,
} from '@/types/workingPackage'
import api, { apiRequest } from './api'

type prop = {
  working_package_id: string
}

export const getWorkingPackageTasks = async ({ working_package_id }: prop) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/working-packages/${working_package_id}/tasks`),
  )
  return { data, error }
}

export const createWorkingPackage = async (
  workingPackageRequest: WorkingPackageRequest,
) => {
  const { data, error } = await apiRequest(() =>
    api.post('/working-packages', workingPackageRequest),
  )

  return { data, error }
}

type prop2 = {
  taskOrderUpdateRequest: TaskOrderUpdateRequest[]
  wpId: string
}
export const updateTaskOrder = async ({
  taskOrderUpdateRequest,
  wpId,
}: prop2) => {
  const { data, error } = await apiRequest(() =>
    api.put(`/working-packages/${wpId}/tasks/order`, taskOrderUpdateRequest),
  )

  return { data, error }
}

// export const DownloadExcelFile = async (wpId: string) => {
//   try {
//     const response = await api.get(`/working-packages/${wpId}/gen-aufmass`, {
//       responseType: 'blob', // 🔹 Ensures response is a Blob (binary data)
//     })

//     return response.data // 🔹 Return the Blob directly, no object wrapping!
//   } catch (error) {
//     console.error('❌ Error fetching Excel file:', error)
//     throw error
//   }
// }
