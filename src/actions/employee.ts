'use server'

import {
  createEmployee,
  deleteEmployee,
  // getProjectEmployeesFromClient,
} from '@/api/employee'
import { CreateEmployeeRequest } from '@/types/employee'

export const createEmployeeApi = async (
  EmployeeRequest: CreateEmployeeRequest,
) => {
  try {
    const { data, error } = await createEmployee(EmployeeRequest)
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

export const deleteEmployeeApi = async (employeeId: string) => {
  try {
    const { data, error } = await deleteEmployee(employeeId)
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}
// export const getProjectEmployeesFromClientApi = async ({
//   ProjectId,
//   token,
// }: any) => {
//   'use cache'
//   try {
//     const { data, error } = await getProjectEmployeesFromClient({
//       ProjectId,
//       token,
//     })
//     if (error) throw error
//     if (data) return data
//   } catch (error) {
//     console.error('Something went wrong', error)
//     throw error
//   }
// }
