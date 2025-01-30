import { CreateEmployeeRequest } from '@/types/employee'
import { CreateProjectType, ProjectMaterialsBody } from '@/types/Project'
import api, { apiRequest } from './api'

export const getEmployeeProjects = async ({
  employeeId,
}: {
  employeeId: string
}) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/employees/${employeeId}/projects`),
  )
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000)
  // })
  return { data, error }
}

type prop = { ProjectId: string }
export const getProject = async ({ ProjectId }: prop) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/projects/${ProjectId}`),
  )
  return { data, error }
}

export const getCompanyEmployees = async (CompanyId: string) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/companies/${CompanyId}/employees`),
  )
  return { data, error }
}

export const getProjectEmployees = async (ProjectId: string) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/projects/${ProjectId}/employees`),
  )
  return { data, error }
}

// export const getProjectEmployeesFromClient = async ({
//   ProjectId,
//   token,
// }: any) => {
//   'use cache'
//   const { data, error } = await apiRequest(() =>
//     api.get(`/projects/${ProjectId}/employees`, {
//       skipAuth: true,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),
//   )
//   return { data, error }
// }

export const CreateProject = async (body: CreateProjectType) => {
  // console.log('BODY########1', body)
  const { data, error } = await apiRequest(() =>
    api.post('/projects-v2', { ...body }),
  )
  return { data, error }
}

// export const uploadMaterialsFile = async ({ projectId, file }: ProjectMaterialsBody) => {
//   const { data, error } = await apiRequest(() =>
//     api.post(`/project-materials-gaeb?projectId=${projectId}`, file, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }),
//   )
//   return { data, error }
// }

export const uploadMaterialsFile = async ({
  projectId,
  file,
}: ProjectMaterialsBody) => {
  // Create a FormData instance
  // const formData = new FormData()
  // formData.append('file', file)

  try {
    // Perform the POST request with multipart/form-data
    const { data } = await api.post(
      `/project-materials-gaeb?projectId=${projectId}`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    // Return the server response
    return { data, error: null }
  } catch (error) {
    // In case of an error, log it or handle it as needed
    console.error('uploadMaterialsFile error:', error)
    return { data: null, error }
  }
}

type prop2 = {
  ProjectId: string
  EmployeeId: string
}
export const removeEmployeeFromProject = async ({
  ProjectId,
  EmployeeId,
}: prop2) => {
  try {
    const { data } = await apiRequest(() =>
      api.delete(`/projects/${ProjectId}/employees/${EmployeeId}`),
    )

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const createEmployee = async (
  EmployeeRequest: CreateEmployeeRequest,
) => {
  try {
    // console.log('data from api endpoint', EmployeeRequest)
    const { data } = await apiRequest(() =>
      api.post('/employees', EmployeeRequest),
    )

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
export const deleteEmployee = async (employeeId: string) => {
  try {
    // console.log('data from api endpoint', employeeId)
    const { data } = await apiRequest(() =>
      api.delete(`/employees/${employeeId}`),
    )

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
