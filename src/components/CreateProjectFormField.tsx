'use client'

import { ProjectInfoSchema } from '@/lib/zod'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from './ui/form'
import { Input } from './ui/input'

// Props type for the SignupFormField component
type CreateProjectFormFieldProps = {
  name: FieldPath<z.infer<typeof ProjectInfoSchema>>
  label: string
  placeholder: string
  description?: string
  inputType?: string
  formControl: Control<z.infer<typeof ProjectInfoSchema>, any>
}

export function CreateProjectFormField({
  name,
  label,
  placeholder,
  description,
  inputType = 'text',
  formControl,
}: CreateProjectFormFieldProps) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={inputType}
              placeholder={placeholder}
              className='border-0 bg-neutral-100'
              value={field.value ?? ''}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  )
}

type CreateProjectTextAreaFieldProps = {
  name: FieldPath<z.infer<typeof ProjectInfoSchema>>
  label: string
  placeholder: string
  description?: string
  formControl: Control<z.infer<typeof ProjectInfoSchema>, any>
  rows?: number
}

export function CreateProjectTextAreaField({
  name,
  label,
  placeholder,
  description,
  formControl,
  rows = 4,
}: CreateProjectTextAreaFieldProps) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <textarea
              {...field}
              placeholder={placeholder}
              rows={rows}
              className='w-full resize-none rounded-md border-0 bg-neutral-100 p-2 focus:ring-2 focus:ring-blue-500'
              value={field.value ?? ''}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  )
}

// type CreateProjectDateFieldProps = {
//   name: FieldPath<z.infer<typeof ProjectInfoSchema>>
//   label: string
//   placeholder?: string
//   description?: string
//   formControl: Control<z.infer<typeof ProjectInfoSchema>, any>
// }

// export function CreateProjectDateField({
//   name,
//   label,
//   placeholder,
//   description,
//   formControl,
// }: CreateProjectDateFieldProps) {
//   return (
//     <FormField
//       control={formControl}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <input
//               {...field}
//               type='date'
//               placeholder={placeholder}
//               className='w-full rounded-md border-0 bg-neutral-100 p-2 focus:ring-2 focus:ring-blue-500'
//             />
//           </FormControl>
//           {description && <FormDescription>{description}</FormDescription>}
//           {/* <FormMessage /> */}
//         </FormItem>
//       )}
//     />
//   )
// }
