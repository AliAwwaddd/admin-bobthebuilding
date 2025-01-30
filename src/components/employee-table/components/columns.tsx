'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { EmployeeResponse } from '@/types/employee'
import { labels } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const Columns = (
  removeEmployee: (eId: string) => void,
): ColumnDef<EmployeeResponse>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'role',
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title='Role' />
    // ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.getValue('role'))

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('role')}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'ID',
  //   // header: ({ column }) => (
  //   //   <DataTableColumnHeader column={column} title='ID' />
  //   // ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-[500px] truncate font-medium'>
  //         {row.original.id}
  //       </span>
  //     </div>
  //   ),
  // },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => (
      <DataTableRowActions row={row} removeEmployee={removeEmployee} />
    ),
  },
]
