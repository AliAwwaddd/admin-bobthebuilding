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
import { signupFormSchema } from '@/lib/zod'

// Props type for the SignupFormField component
type SignupFormFieldProps = {
  name: FieldPath<z.infer<typeof signupFormSchema>>
  label: string
  placeholder: string
  description?: string
  inputType?: string
  formControl: Control<z.infer<typeof signupFormSchema>, any>
}

export function SignupFormField({
  name,
  label,
  placeholder,
  description,
  inputType = 'text',
  formControl,
}: SignupFormFieldProps) {
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
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
