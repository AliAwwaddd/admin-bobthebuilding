'use client'

import { createQuickTaskSchema } from '@/lib/zod'
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

// Props type for the SignupFormField component
type CreateQuickTaskFormFieldProps = {
  name: FieldPath<z.infer<typeof createQuickTaskSchema>>
  label: string
  placeholder: string
  description?: string
  inputType?: string
  formControl: Control<z.infer<typeof createQuickTaskSchema>, any>
}

export function CreateQuickTaskFormField({
  name,
  label,
  placeholder,
  description,
  inputType = 'text',
  formControl,
}: CreateQuickTaskFormFieldProps) {
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
              value={field.value || ''}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
