'use server'
import { removeEmployeeFromProject } from '@/api/employee'
import {
  AssignProjectEmployees,
  CreateMaterial,
  updateProjectInfo,
} from '@/api/project'
import { getToken } from '@/helpers/getToken'
import { MaterialType } from '@/types/material'
import { updateProjectType } from '@/types/Project'

export async function updateProjectInfoAction({
  ProjectId,
  updatedProject,
}: {
  ProjectId: string
  updatedProject: updateProjectType
}) {
  try {
    const { data, error } = await updateProjectInfo({
      ProjectId,
      updatedProject,
    })
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

type props = {
  material: MaterialType
  ProjectId: string
}

export async function CreateMaterialAction({ material, ProjectId }: props) {
  try {
    const token = await getToken()
    if (token) {
      const { data, error } = await CreateMaterial({
        material,
        ProjectId,
        token,
      })
      if (error) throw error
      if (data) return data
    } else {
      throw new Error('No access token')
    }
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

type props4 = {
  employeeIds: string[]
  ProjectId: string
}

export async function AssignProjectEmployeesAction({
  ProjectId,
  employeeIds,
}: props4) {
  try {
    const { data, error } = await AssignProjectEmployees({
      ProjectId,
      employeeIds,
    })
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

type prop5 = {
  ProjectId: string
  EmployeeId: string
}
export async function removeEmployeeFromProjectAction({
  ProjectId,
  EmployeeId,
}: prop5) {
  try {
    const { data, error } = await removeEmployeeFromProject({
      ProjectId,
      EmployeeId,
    })
    if (error) throw error
    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}
