import { getCompanyEmployees } from '@/api/employee'
import { auth } from '@/auth'
import EmployeesClient from '@/components/EmployeesClient'
import { SkeletonButton } from '@/components/SkeletonButton'
import { Suspense } from 'react'
import { NavigationButton } from '../projects/[ProjectId]/info/components/NavigationButton'
import ErrorComponent from '../projects/ErrorComponent'

const AddEmployeeFormApi = async ({ employees }: any) => {
  return <EmployeesClient employees={employees} />
}

async function page() {
  const session = await auth()
  const CompanyId = session?.user.company.id
  const { data, error } = await getCompanyEmployees(CompanyId)

  if (error) return <ErrorComponent message={error} />

  return (
    <main className='p-8 pt-0'>
      <div className='flex items-center'>
        <NavigationButton label='Goto Projects' href='/projects' />
      </div>

      <h1 className='mb-8 text-center text-4xl font-bold text-gray-700'>
        Company Employees
      </h1>

      <Suspense fallback={<SkeletonButton />}>
        <AddEmployeeFormApi employees={data} />
      </Suspense>
    </main>
  )
}

export default page
