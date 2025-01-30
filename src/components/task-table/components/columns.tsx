'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
// import { Checkbox } from '@/components/ui/checkbox'
import { updateTaskStatusAction } from '@/actions/task'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { openDialog, updateTaskStatus } from '@/redux/slices/taskSlice'
import { TaskStatus, workingPackageTaskType } from '@/types/task'
import { Edit } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { labels, statuses } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

export const Columns: () => ColumnDef<workingPackageTaskType>[] = () => {
  const dispatch = useDispatch()

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    // Dispatch the Redux action to update the task status
    dispatch(updateTaskStatus({ taskId, newStatus }))
    // Perform additional API call, if needed
    await updateTaskStatusAction({ taskId, status: newStatus })
  }

  const handleEditTask = (task: workingPackageTaskType) => {
    dispatch(openDialog(task))
  }

  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label='Select all'
    //       className='translate-y-[2px]'
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label='Select row'
    //       className='translate-y-[2px]'
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
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
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Description' />
      ),
      cell: ({ row }) => {
        const label = labels.find(
          (label) => label.value === row.original.status,
        )

        return (
          <div className='flex space-x-2'>
            {label && <Badge variant='outline'>{label.label}</Badge>}
            <span className='max-w-[500px] truncate font-medium'>
              {row.getValue('description')}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue('status'),
        )

        if (!status) {
          return null
        }

        const currentStatus = row.getValue('status') as string
        const taskId = row.original.id

        return (
          <div className='flex items-center'>
            <Select
              value={currentStatus}
              onValueChange={(newStatus: TaskStatus) =>
                handleStatusChange(taskId, newStatus)
              }
            >
              <SelectTrigger className='w-[120px]'>
                <SelectValue placeholder={status.label} />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className='flex items-center'>
                      {option.icon && (
                        <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                      )}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'order',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Order' />
      ),
      cell: ({ row }) => (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('order')}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        // <DataTableRowActions
        //   row={row}
        //   onEditTask={() => handleEditTask(row.original)}
        // />
        <div onClick={() => handleEditTask(row.original)}>
          <Edit />
        </div>
      ),
    },
  ]
}
