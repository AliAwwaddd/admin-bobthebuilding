'use client'

import { EmployeeResponse } from '@/types/employee'
import React from 'react'
import AddEmployeeForm from './AddEmployeeForm'
import { Columns } from './employee-table/components/columns'
import { DataTable } from './employee-table/components/data-table'

function EmployeesClient({ employees }: { employees: EmployeeResponse[] }) {
  const [localEmployees, setLocalEmployees] =
    React.useState<EmployeeResponse[]>(employees)

  const addEmployee = (e: EmployeeResponse) => {
    console.log('e', e)
    setLocalEmployees([...localEmployees, e])
  }

  const removeEmployee = (eId: string) => {
    setLocalEmployees(localEmployees.filter((employee) => employee.id !== eId))
  }
  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 pt-0 md:flex'>
        <DataTable data={localEmployees} columns={Columns(removeEmployee)} />
      </div>
      <AddEmployeeForm addEmployee={addEmployee} />
    </>
  )
}

export default EmployeesClient
