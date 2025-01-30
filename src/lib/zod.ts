import { employeeType } from '@/types/employee'
import { z } from 'zod'

export const signupFormSchema = z.object({
  email: z.string().email(),
  employee_name: z.string().min(3).max(50),
  company_name: z.string().min(3),
})

export const signinEmailSchema = z.object({
  email: z.string().email(),
})

export const signinCodeSchema = z.object({
  code: z
    .string()
    .length(6, { message: 'The code must be exactly 6 digits long.' }),
})

export const signinSchema = z.object({
  nonce: z.string(),
  code: z.string(),
  callbackUrl: z.string(),
})

export const projectAddMaterialSchema = z.object({
  lvPosition: z.string().min(1, 'Name is required'),
  name: z.string().nullable(),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().nullable(),
  unitPrice: z.string().min(1, 'Price is required'),
  bezeichnung: z.string().nullable(),
})

export const ProjectInfoSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().nullable(),
  accounting_number: z.string().nullable(),
  project_number: z.string().nullable(),
})

export const createQuickTaskSchema = z.object({
  name: z
    .string()
    .min(1, 'Task name is required')
    .max(100, 'Task name is too long'),
  location: z.string().nullable(),
  description: z.string().nullable(),
  // task_pictures: z
  //   .instanceof(File, { message: 'A valid file is required' })
  //   .refine((file) => file?.size > 0, 'File cannot be empty')
  //   .nullable(),
})

const employeeTypeValues = Object.values(employeeType)

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, 'Employee name is required')
    .max(100, 'Employee name is too long'),
  email: z.string().nullable(),
  role: z.enum(employeeTypeValues as [string, ...string[]]),
})

export const QuickTaskDefaultValues = {
  name: '',
  location: '',
  description: '',
  task_pictures: [],
}
export const CreateEmployeeDefaultValues = {
  name: '',
  email: '',
  role: employeeType.Worker,
}

// const workersSchema = z.object({
//   selectedWorkers: z
//     .array(z.string())
//     .min(1, 'At least one worker must be selected'),
// })

// const materialsSchema = z.object({
//   materialsFile: z
//     .instanceof(File, { message: 'A valid file is required' })
//     .refine((file) => file?.size > 0, 'File cannot be empty'),
// })

export const WorkingPackageSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must not exceed 255 characters' }),
  project_id: z.string().min(1, { message: 'Project ID is required' }),
  invoiceReference: z
    .number()
    .nonnegative({
      message: 'Invoice Reference must be a non-negative integer',
    })
    .int({ message: 'Invoice Reference must be an integer' }),
})
