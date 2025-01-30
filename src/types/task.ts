import { EmployeeResponse } from './employee'
import { ProjectType } from './Project'
import { WorkingPackageType } from './workingPackage'

export type createQuickTaskType = {
  working_package_id: string
  name: string
  location: string | null
  description: string | null
  pictureUrls: string[]
}

export enum TaskStatus {
  Draft = 'draft',
  InProgress = 'in progress',
  Todo = 'todo',
  Done = 'done',
  Error = 'error',
  Planned = 'planned',
  Private = 'private',
}

type MaterialResponse = {
  id: string
  name: string
  bezeichnung: string
  quantity: string
  lvPosition: string
  project: ProjectType
  picture_url: string[]
  unitPrice: number
  unit: string
}

export type TaskMaterialType = {
  material: MaterialResponse
  expected_quantity: number
  required_quantity: number
}

type WorkerMaterial = {
  name: string
  id: string | null
  quantity: number
}

export type workingPackageTaskType = {
  id: string
  name: string
  workerPictureUrls: string[] | null
  pictureUrls: string[]
  description: string | null
  employeeDescription: string | null
  location: string | null
  materials: WorkerMaterial[] | null
  status: TaskStatus
  start: string | null
  deadline: string | null
  report: string | null
  workingPackage: WorkingPackageType
  material_notes: string | null
  order: number
  assigned_employees: EmployeeResponse[]
  assigned_materials: TaskMaterialType[]
  created_at: string
  completed_at: string | null
}

type TaskMaterialRequest = {
  material_id: string
  expected_quantity: number
  required_quantity: number
}

export type updateTaskRequest = {
  name: string
  workerPictureUrls: string[] | null
  pictureUrls: string[]
  description: string | null
  employeeDescription: string | null
  location: string | null
  materials: WorkerMaterial[] | null
  status: TaskStatus
  start: string | null
  deadline: string | null
  report: string | null
  material_notes: string | null
  assigned_employees: string[]
  assigned_materials: TaskMaterialRequest[]
}
