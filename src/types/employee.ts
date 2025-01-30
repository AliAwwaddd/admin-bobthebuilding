// export type CompanyEmployeesResponse = {
//   id: string
//   name: string
//   email: string
//   company: {
//     id: string
//     name: string
//   }
//   role: string
// }

export type EmployeeResponse = {
  id: string
  name: string
  email: string | null
  company: {
    id: string
    name: string
  }
  role: string
}

export enum employeeType {
  Worker = 'worker',
  Manager = 'manager',
}

export type CreateEmployeeRequest = {
  name: string
  email: string | null
  role: string
  company_id: string
}
