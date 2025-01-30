import { ProjectInfoSchema } from '@/lib/zod'
import { z } from 'zod'

export type Project = {
  id: string
  name: string
  description: string | null
  accounting_number: string | null
  project_number: string | null
  created_at: Date
  company: {
    id: string
    name: string
  }
  completed: boolean
}

export type CreateProjectType = {
  name: string | null
  company_id: string | null
  description: string | null
  accounting_number: string | null
  project_number: string | null
  employees_id: string[]
}

export type ProjectMaterialsBody = {
  projectId: string
  file: any
}

export type ProjectType = {
  id: string
  name: string
  company: {
    id: string
    name: string
  }
  description: string
  accounting_number: string | null
  project_number: string | null
  created_at: Date
  completed: boolean
}

export type updateProjectType = z.infer<typeof ProjectInfoSchema>

export type ProjectMaterialType = {
  id: string
  name: string
  bezeichnung: string
  quantity: string
  lvPosition: string
  project: {
    id: string
    name: string
    company: {
      id: string
      name: string
    }
    description: string
    accounting_number: string
    project_number: string
    created_at: Date
    completed: boolean
  }
  picture_url: string[]
  unitPrice: number
  unit: string
}

// export type taskMaterialType = {
//   material: {
//     id: string
//     name: string
//     bezeichnung: string
//     quantity: string
//     lvPosition: string
//     project: {
//       id: string
//       name: string
//       company: {
//         id: string
//         name: string
//       }
//       description: string
//       accounting_number: string
//       project_number: string
//       created_at: Date
//       completed: boolean
//     }
//     picture_url: string[]
//     unitPrice: number
//     unit: string
//   }
//   expected_quantity: number
//   required_quantity: number
// }

// export type materialTableType = {
//   id: string
//   lv_position: string
//   name: string
//   quantity: number
//   unit: string
// }
