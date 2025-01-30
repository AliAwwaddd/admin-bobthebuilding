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
import { signinEmailSchema } from '@/lib/zod'

// Props type for the SignupFormField component
type SigninFormFieldProps = {
  name: FieldPath<z.infer<typeof signinEmailSchema>>
  label: string
  placeholder: string
  description?: string
  inputType?: string
  formControl: Control<z.infer<typeof signinEmailSchema>, any>
}

export function SigninFormField({
  name,
  label,
  placeholder,
  description,
  inputType = 'text',
  formControl,
}: SigninFormFieldProps) {
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
