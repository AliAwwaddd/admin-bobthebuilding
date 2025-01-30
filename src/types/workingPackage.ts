import { ProjectType } from './Project'

export type WorkingPackageType = {
  id: string
  name: string
  project: ProjectType
  invoiceReference: number
  percentageOfDoneTasks: number
  created_at: string
}

export type WorkingPackageRequest = {
  name: string
  project_id: string
  invoiceReference: number
}

export type TaskOrderUpdateRequest = {
  task_id: string
  order_number: number
}
