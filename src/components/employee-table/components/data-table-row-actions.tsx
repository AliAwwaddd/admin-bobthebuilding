'use client'

import { Row } from '@tanstack/react-table'
import { Copy, Delete, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { deleteEmployeeApi } from '@/actions/employee'
import React from 'react'
import { EmployeeResponseSchema } from '../data/schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  removeEmployee: (eId: string) => void
}

export function DataTableRowActions<TData>({
  row,
  // removeEmployee,
}: DataTableRowActionsProps<TData>) {
  const employee = EmployeeResponseSchema.parse(row.original)
  const [deleting, setDelete] = React.useState<boolean>(false)

  const handleDeleteEmployee = async () => {
    setDelete(true)
    await deleteEmployeeApi(employee.id)
    setDelete(false)
  }
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(employee.id) // Copy the ID to clipboard
    } catch (error) {
      console.error('Failed to copy ID:', error)
      alert('Failed to copy ID. Please try again.')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={handleCopyId}>
          <div className='flex flex-1 items-center justify-between'>
            Copy ID
            <Copy />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteEmployee}>
          {
            <div className='flex flex-1 items-center justify-between'>
              {deleting ? 'Deleting...' : 'Delete'}
              <Delete className='text-red-500' />
            </div>
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
