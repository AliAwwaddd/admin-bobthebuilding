import { updateTaskOrderAction } from '@/actions/workingPackage'
import { EmployeeResponse } from '@/types/employee'
import { ProjectMaterialType } from '@/types/Project'
import {
  TaskMaterialType,
  TaskStatus,
  workingPackageTaskType,
} from '@/types/task'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface taskState {
  tasks: workingPackageTaskType[]
  selectedTask: workingPackageTaskType | null
  dialogOpen: boolean
  CompanyId: string
  managerId: string
  ProjectId: string
  workers: EmployeeResponse[]
  selectedWorkers: Record<string, EmployeeResponse>
  filteredWorkers: EmployeeResponse[]
  selectedMaterials: TaskMaterialType[]
  projectMaterials: TaskMaterialType[]
  filteredMaterials: TaskMaterialType[]
  isTaskOrderOpen: boolean
  materialSearchQuery: string
}

const initialState: taskState = {
  tasks: [],
  selectedTask: null,
  dialogOpen: false,
  CompanyId: '',
  managerId: '',
  ProjectId: '',
  workers: [],
  selectedWorkers: {},
  filteredWorkers: [],
  filteredMaterials: [],
  projectMaterials: [],
  selectedMaterials: [],
  isTaskOrderOpen: false,
  materialSearchQuery: '',
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<workingPackageTaskType[]>) {
      state.tasks = action.payload
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ taskId: string; newStatus: TaskStatus }>,
    ) {
      const { taskId, newStatus } = action.payload
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      )
    },
    openDialog(
      state,
      action: PayloadAction<workingPackageTaskType | undefined>,
    ) {
      state.dialogOpen = true
      state.selectedTask = action.payload || null

      if (action.payload) {
        // aka we are editing a task
        state.selectedWorkers = action.payload.assigned_employees.reduce(
          (acc, employee) => {
            acc[employee.id] = employee
            return acc
          },
          {} as Record<string, EmployeeResponse>,
        )
        state.selectedMaterials = action.payload.assigned_materials
        const taskAssignedEmployeesIds = action.payload.assigned_employees.map(
          (employee) => employee.id,
        )
        state.filteredWorkers = state.workers.filter(
          (worker) => !taskAssignedEmployeesIds.includes(worker.id),
        )
        const assigned_materialsIds = action.payload.assigned_materials.map(
          (material) => material.material.id,
        )
        state.filteredMaterials = state.projectMaterials.filter(
          (projectMaterial) =>
            !assigned_materialsIds.includes(projectMaterial.material.id),
        )
      }
    },
    closeDialog(state) {
      state.dialogOpen = false
      state.selectedTask = null
      state.selectedWorkers = {}
      state.selectedMaterials = []
      state.filteredWorkers = state.workers
      state.filteredMaterials = state.projectMaterials
    },
    setCompanyId(state, action: PayloadAction<string>) {
      state.CompanyId = action.payload
    },
    setManagerId(state, action: PayloadAction<string>) {
      state.managerId = action.payload
    },
    setProjectId(state, action: PayloadAction<string>) {
      state.ProjectId = action.payload
    },
    setWorkers(state, action: PayloadAction<EmployeeResponse[]>) {
      state.workers = action.payload
      state.filteredWorkers = action.payload // Initialize filteredWorkers with all workers
    },
    toggleWorkerSelection(state, action: PayloadAction<EmployeeResponse>) {
      const worker = action.payload
      if (worker.id in state.selectedWorkers) {
        // Remove worker
        delete state.selectedWorkers[worker.id]
        state.filteredWorkers.push(worker)
      } else {
        // Add worker
        state.selectedWorkers[worker.id] = worker
        state.filteredWorkers = state.filteredWorkers.filter(
          (w) => w.id !== worker.id,
        )
      }
    },
    searchWorkers(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase()
      const notSelectedWorkers = state.workers.filter(
        (worker) => !(worker.id in state.selectedWorkers),
      )
      state.filteredWorkers = notSelectedWorkers.filter(
        (worker) =>
          worker.name.toLowerCase().includes(searchTerm) ||
          worker.role.toLowerCase().includes(searchTerm),
      )
    },

    setSelectedMaterials(state, action: PayloadAction<TaskMaterialType[]>) {
      state.selectedMaterials = action.payload // Replace the entire materials array
    },
    updateOrAddMaterial(
      state,
      action: PayloadAction<{
        index: number | null
        material: TaskMaterialType
      }>,
    ) {
      const { index, material } = action.payload

      if (index !== null) {
        // Update an existing material
        state.selectedMaterials[index] = material
      } else {
        // Add a new material
        state.selectedMaterials.push(material)
      }
      state.filteredMaterials = state.filteredMaterials.filter(
        (projectMaterial) =>
          projectMaterial.material.id != material.material.id,
      )
    },

    removeMaterialByIndex(state, action: PayloadAction<number>) {
      state.selectedMaterials = state.selectedMaterials.filter(
        (_, i) => i !== action.payload,
      )
    },
    removeEditedTaskPictures(state, action: PayloadAction<string>) {
      if (state.selectedTask && state.selectedTask.pictureUrls) {
        state.selectedTask.pictureUrls = state.selectedTask.pictureUrls.filter(
          (url) => url !== action.payload,
        )
      }
    },
    AddTask(state, action: PayloadAction<workingPackageTaskType>) {
      state.tasks.push(action.payload)
    },
    UpdateTask(state, action: PayloadAction<workingPackageTaskType>) {
      const updatedTask = action.payload
      const existingTaskIndex = state.tasks.findIndex(
        (task) => task.id === updatedTask.id,
      )
      if (existingTaskIndex !== -1) {
        state.tasks[existingTaskIndex] = updatedTask
      }
    },
    openTaskOrderList(state) {
      state.isTaskOrderOpen = true
    },
    saveTaskOrderList(state, action: PayloadAction<string>) {
      // 🔹 Update Redux state immediately
      state.tasks = state.tasks.map((task, index) => ({
        ...task,
        order: index + 1, // Assign new order based on index
      }))

      state.isTaskOrderOpen = false

      // 🔹 Prepare API request payload
      const taskOrderUpdateRequest = state.tasks.map((task) => ({
        task_id: task.id,
        order_number: task.order,
      }))

      // 🔹 Fire & forget API call (no waiting)
      updateTaskOrderAction({
        taskOrderUpdateRequest,
        wpId: action.payload,
      }).catch((error) => {
        console.error('❌ Failed to update task order in DB:', error)
      })
    },

    setProjectMaterials(state, action: PayloadAction<ProjectMaterialType[]>) {
      const materials = action.payload.map((material) => ({
        material: material,
        expected_quantity: 0,
        required_quantity: 0,
      }))
      state.projectMaterials = materials
      state.filteredMaterials = materials
    },
    setMaterialSearchQuery(state, action: PayloadAction<string>) {
      state.materialSearchQuery = action.payload

      state.filteredMaterials = state.projectMaterials.filter(
        (material) =>
          material.material.name
            .toLowerCase()
            .includes(state.materialSearchQuery.toLowerCase()) &&
          !state.selectedMaterials.some(
            (selectedMaterial) =>
              selectedMaterial.material.id === material.material.id,
          ),
      )
    },
    clearMaterialSearchQuery(state) {
      state.materialSearchQuery = ''
      // state.filteredMaterials = state.projectMaterials.map(
      //   (material) =>
      //     !state.selectedMaterials.some(
      //       (selectedMaterial) =>
      //         selectedMaterial.material.id === material.material.id,
      //     ),
      // )
    },
  },
})

export const {
  setTasks,
  updateTaskStatus,
  openDialog,
  closeDialog,
  setCompanyId,
  setManagerId,
  setWorkers,
  toggleWorkerSelection,
  searchWorkers,
  updateOrAddMaterial,
  removeMaterialByIndex,
  removeEditedTaskPictures,
  AddTask,
  UpdateTask,
  setProjectId,
  openTaskOrderList,
  saveTaskOrderList,
  setProjectMaterials,
  setMaterialSearchQuery,
  clearMaterialSearchQuery
} = taskSlice.actions
export default taskSlice.reducer
