import { TaskStatus } from '@/types/task'
import { z } from 'zod'

const TaskStatusSchema = z.nativeEnum(TaskStatus)

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
  description: z.string(),
  accounting_number: z.string().nullable(),
  project_number: z.string().nullable(),
  created_at: z.string(),
  completed: z.boolean(),
})

const workingPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  project: projectSchema,
  invoiceReference: z.number(),
  percentageOfDoneTasks: z.number(),
  created_at: z.string(),
})

const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
  role: z.string(),
})

const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  bezeichnung: z.string(),
  quantity: z.number(),
  lvPosition: z.string(),
  project: projectSchema,
  picture_url: z.array(z.string()),
  unitPrice: z.number(),
  unit: z.string(),
})

const taskMaterialSchema = z.object({
  material: materialSchema,
  expected_quantity: z.number(),
  required_quantity: z.number(),
})

const workerMaterialSchema = z.object({
  name: z.string(),
  id: z.string().nullable(),
  quantity: z.number(),
})

export const taskSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  workerPictureUrls: z.array(z.string()).nullable(),
  pictureUrls: z.array(z.string()).nullable(),
  description: z.string().nullable(),
  employeeDescription: z.string().nullable(),
  location: z.string().nullable(),
  materials: z.array(workerMaterialSchema).nullable(),
  status: TaskStatusSchema,
  start: z.string().nullable(),
  deadline: z.string().nullable(),
  report: z.string().nullable(),
  workingPackage: workingPackageSchema,
  material_notes: z.string().nullable(),
  order: z.number(),
  assigned_employees: z.array(employeeSchema).nullable(),
  assigned_materials: z.array(taskMaterialSchema).nullable(),
  created_at: z.string(),
  completed_at: z.string().nullable(),
})

export type Task = z.infer<typeof taskSchema>

export const EmployeeResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(), // `email` can be null
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
  role: z.string(),
})
