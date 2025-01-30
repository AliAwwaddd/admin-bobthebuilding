'use client'

import { createEmployeeApi } from '@/actions/employee'
import { CreateEmployeeDefaultValues, createEmployeeSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateEmployeeFormField } from './CreateEmployeeFormField'
import LoadingButton from './LoadingButton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import ErrorComponent from '@/app/projects/ErrorComponent'

export default function CreateEmployeeModal({
  setDialogOpen,
  addEmployee,
}: any) {
  const [globalError, setGlobalError] = React.useState<string>('')
  const session = useSession()
  const company_id = session.data?.user.company.id

  const projectInfoForm = useForm<z.infer<typeof createEmployeeSchema>>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: CreateEmployeeDefaultValues,
  })

  if (!company_id) return <ErrorComponent />

  const { control, handleSubmit, watch, setError } = projectInfoForm

  const role = watch('role')
  const email = watch('email')

  const onSubmit = async (data: z.infer<typeof createEmployeeSchema>) => {
    try {
      setGlobalError('')
      if (role === 'manager' && (!email || !email.includes('@'))) {
        setError('email', { message: 'A valid email is required for managers' })
        return
      }
      const employee = await createEmployeeApi({ ...data, company_id })
      addEmployee(employee)
      setDialogOpen(false)
    } catch (error) {
      console.error('Error creating employee:', error)
      setGlobalError('Failed to create employee. Please try again.')
    }
  }

  return (
    <div className='flex flex-1 flex-col justify-between'>
      <div className='mt-6 max-h-[455px] flex-grow items-center justify-center overflow-y-auto p-1'>
        <Form {...projectInfoForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4 flex flex-1 gap-6 space-y-4'>
              <div className='flex-1 space-y-4'>
                <CreateEmployeeFormField
                  name='name'
                  label='Name'
                  placeholder='name'
                  formControl={projectInfoForm.control}
                />

                {/* Role Field (Select Dropdown) */}
                <FormField
                  control={control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='worker'>Worker</SelectItem>
                            <SelectItem value='manager'>Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {role === 'manager' && (
                  <CreateEmployeeFormField
                    name='email'
                    label='Email'
                    placeholder='email'
                    formControl={projectInfoForm.control}
                  />
                )}

                <LoadingButton
                  pending={projectInfoForm.formState.isSubmitting}
                  text='Create'
                />
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className='mt-8 flex flex-shrink-0 justify-between'>
        {globalError && <p className='mt-4 text-red-500'>{globalError}</p>}
      </div>
    </div>
  )
}
