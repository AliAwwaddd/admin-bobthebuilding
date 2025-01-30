import { MaterialType } from '@/types/material'
import { updateProjectType } from '@/types/Project'
import api, { apiRequest } from './api'

type props = {
  ProjectId: string
  updatedProject: updateProjectType
}
export const updateProjectInfo = async ({
  ProjectId,
  updatedProject,
}: props) => {
  const { data, error } = await apiRequest(() =>
    api.put(`/projects/${ProjectId}`, updatedProject),
  )
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000)
  // })
  return { data, error }
}

type props2 = {
  ProjectId: string
}

export const getProjectMaterials = async ({ ProjectId }: props2) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/projects/${ProjectId}/materials`),
  )
  return { data, error }
}

type props3 = {
  material: MaterialType
  ProjectId: string
  token: string
}

export const CreateMaterial = async ({ material, ProjectId }: props3) => {
  // console.log('Submitting material:', {
  //   ...material,
  //   project_id: ProjectId,
  //   picture_url: [],
  // })
  const { data, error } = await apiRequest(() =>
    api.post('/materials', {
      ...material,
      quantity: parseFloat(material.quantity),
      unitPrice: parseFloat(material.unitPrice),
      project_id: ProjectId,
      picture_url: [],
    }),
  )
  return { data, error }
}

type props4 = {
  employeeIds: string[]
  ProjectId: string
}

export const AssignProjectEmployees = async ({
  ProjectId,
  employeeIds,
}: props4) => {
  const { data, error } = await apiRequest(() =>
    api.post(`/projects/${ProjectId}/employees`, employeeIds),
  )
  return { data, error }
}

type props5 = {
  ProjectId: string
}

export const getProjectPackages = async ({ ProjectId }: props5) => {
  const { data, error } = await apiRequest(() =>
    api.get(`/projects/${ProjectId}/working-packages`),
  )
  return { data, error }
}
