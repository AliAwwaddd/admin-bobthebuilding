'use client'

import { AssignProjectEmployeesAction } from '@/actions/project'
import { EmployeeResponse } from '@/types/employee'
import { useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ProjectWorkersContextType {
  projectWorkers: EmployeeResponse[]
  availableCompanyEmployees: EmployeeResponse[]
  addProjectWorkers: (employees: EmployeeResponse[]) => void
  deleteProjectWorker: (employeeId: string) => void
  showDelete: boolean
  setShowDelete: (value: boolean) => void
  loading: boolean
  globalError: string
  setGlobalError: (error: string) => void
  handleSearch: (term: string) => void
  handleAddWorker: (worker: EmployeeResponse) => void
  submitWorkers: () => Promise<void>
  dialogOpen: boolean
  setDialogOpen: (value: boolean) => void
  searchTerm: string
  ProjectId: string
  filteredWorkers: EmployeeResponse[]
  selectedWorkers: Record<string, EmployeeResponse>
}

const ProjectWorkersContext = createContext<
  ProjectWorkersContextType | undefined
>(undefined)

interface ProjectWorkersProviderProps {
  children: ReactNode
  ProjectId: string
  CompanyEmployees: EmployeeResponse[]
  ProjectWorkers: EmployeeResponse[]
}

export const ProjectWorkersProvider = ({
  children,
  ProjectId,
  CompanyEmployees,
  ProjectWorkers,
}: ProjectWorkersProviderProps) => {
  const router = useRouter()

  const [projectWorkers, setProjectWorkers] = useState<EmployeeResponse[]>(
    ProjectWorkers || [],
  )
  const [availableCompanyEmployees, setAvailableCompanyEmployees] = useState<
    EmployeeResponse[]
  >([])
  const [showDelete, setShowDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredWorkers, setFilteredWorkers] = useState<EmployeeResponse[]>([])
  const [selectedWorkers, setSelectedWorkers] = useState<
    Record<string, EmployeeResponse>
  >({})

  // 🔥 Update available employees dynamically when projectWorkers change
  useEffect(() => {
    const projectEmployeeIds = new Set(
      projectWorkers.map((worker) => worker.id),
    )
    const availableWorkersToSelect = CompanyEmployees.filter(
      (employee) => !projectEmployeeIds.has(employee.id),
    )
    setAvailableCompanyEmployees(availableWorkersToSelect)
    setFilteredWorkers(availableWorkersToSelect)
  }, [projectWorkers, CompanyEmployees]) // ✅ Dependency array ensures recalculation

  // ✅ Delete a project worker safely
  const deleteProjectWorker = (employeeId: string) => {
    setProjectWorkers((prevWorkers) =>
      prevWorkers.filter((worker) => worker.id !== employeeId),
    )

    // 🔥 No need to find the removed worker manually, use functional updates
    setAvailableCompanyEmployees((prevEmployees) => [
      ...prevEmployees,
      ...CompanyEmployees.filter((employee) => employee.id === employeeId), // 🔥 Ensure we add back the correct employee
    ])
  }

  // ✅ Add project workers safely
  const addProjectWorkers = (employees: EmployeeResponse[]) => {
    setProjectWorkers((prevWorkers) => [...prevWorkers, ...employees])

    // Remove the added employees from available employees
    setAvailableCompanyEmployees((prevEmployees) =>
      prevEmployees.filter(
        (emp) => !employees.some((worker) => worker.id === emp.id),
      ),
    )
  }

  // ✅ Handle search to filter workers dynamically
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const termLowerCase = term.toLowerCase()

    setFilteredWorkers(
      availableCompanyEmployees.filter(
        (worker) =>
          !(worker.id in selectedWorkers) &&
          (worker.name.toLowerCase().includes(termLowerCase) ||
            worker.role.toLowerCase().includes(termLowerCase)),
      ),
    )
  }

  // ✅ Handle adding/removing workers from selection
  const handleAddWorker = (worker: EmployeeResponse) => {
    setSelectedWorkers((prev) => {
      const updatedWorkers = { ...prev }

      if (worker.id in updatedWorkers) {
        // 🔥 Remove the worker if already selected
        delete updatedWorkers[worker.id]
        setFilteredWorkers([...filteredWorkers, worker])
      } else {
        // 🔥 Add the worker if not selected
        setFilteredWorkers(filteredWorkers.filter((w) => w.id !== worker.id))
        updatedWorkers[worker.id] = worker
      }

      return updatedWorkers
    })
  }

  // ✅ Submit selected workers to the project
  const submitWorkers = async () => {
    if (Object.keys(selectedWorkers).length === 0) {
      setGlobalError('Please select at least one worker.')
      return
    }

    setLoading(true)

    try {
      await AssignProjectEmployeesAction({
        ProjectId,
        employeeIds: Object.keys(selectedWorkers),
      })

      // 🔥 Add workers to the project & refresh
      addProjectWorkers(Object.values(selectedWorkers))
      setSelectedWorkers({})
      setDialogOpen(false)
      router.refresh()
    } catch (error) {
      setGlobalError('An error occurred while assigning workers: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProjectWorkersContext.Provider
      value={{
        projectWorkers,
        availableCompanyEmployees,
        addProjectWorkers,
        deleteProjectWorker,
        showDelete,
        setShowDelete,
        loading,
        globalError,
        setGlobalError,
        handleSearch,
        handleAddWorker,
        submitWorkers,
        dialogOpen,
        setDialogOpen,
        searchTerm,
        ProjectId,
        filteredWorkers,
        selectedWorkers,
      }}
    >
      {children}
    </ProjectWorkersContext.Provider>
  )
}

export const useProjectWorkersContext = (): ProjectWorkersContextType => {
  const context = useContext(ProjectWorkersContext)
  if (!context) {
    throw new Error(
      'useProjectWorkersContext must be used within a ProjectWorkersProvider',
    )
  }
  return context
}
