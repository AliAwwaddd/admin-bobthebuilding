'use client'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { projectAddMaterialSchema } from '@/lib/zod'

// Props type for the SignupFormField component
type ProjectMaterialFormFieldProps = {
  name: FieldPath<z.infer<typeof projectAddMaterialSchema>>
  label: string
  placeholder: string
  description?: string
  inputType?: string
  formControl: Control<z.infer<typeof projectAddMaterialSchema>, any>
}

export function ProjectMaterialFormField({
  name,
  label,
  placeholder,
  description,
  inputType = 'text',
  formControl,
}: ProjectMaterialFormFieldProps) {
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
              className='bg-neutral-100'
              value={field.value ?? ''} //+
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
