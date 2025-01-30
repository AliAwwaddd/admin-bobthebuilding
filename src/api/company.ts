import { Project } from '@/types/Project'
import api, { apiRequest } from './api'

type prop = {
  CompanyId: string
  token: string
}

interface props2 {
  data: Project[] | null
  error: string | null
}

export const getCompanyProjects = async ({ CompanyId, token }: prop) => {
  // 'use cache'
  const { data, error }: props2 = await apiRequest(() =>
    api.get(`/companies/${CompanyId}/projects`, {
      skipAuth: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  )

  // console.log(
  //   '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
  //   data,
  // )

  return { data, error }
}
