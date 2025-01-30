import { createQuickTaskType, TaskStatus } from '@/types/task'
import api, { apiRequest } from './api'

export const createQuickTask = async (props: createQuickTaskType) => {
  const { data, error } = await apiRequest(() =>
    api.post(`/tasks/quick-task`, props),
  )
  return { data, error }
}
type prop = {
  taskId: string
  status: TaskStatus
}
export const updateTaskStatus = async ({ taskId, status }: prop) => {
  // console.log('status', status)
  const { data, error } = await apiRequest(() =>
    api.put(`/tasks/${taskId}/update-status-admin`, { status: status }),
  )
  return { data, error }
}

type props2 = {
  working_package_id: string
}
export const createTask = async ({ working_package_id }: props2) => {
  const { data, error } = await apiRequest(() =>
    api.post('/tasks', { working_package_id }),
  )

  return { data, error }
}

// type props3 = {
//   taskId: string
//   task: updateTaskRequest
// }

export const updateTask = async ({ taskId, task }: any) => {
  const { data, error } = await apiRequest(() =>
    api.put(`/tasks/${taskId}`, task),
  )

  return { data, error }
}
