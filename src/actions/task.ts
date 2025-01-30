'use server'
import {
  createQuickTask,
  createTask,
  updateTask,
  updateTaskStatus,
} from '@/api/task'
import {
  createQuickTaskType,
  TaskStatus,
  updateTaskRequest,
} from '@/types/task'
import { z } from 'zod'

const createQuickTaskSchema = z.object({
  working_package_id: z.string(),
  name: z.string(),
  location: z.string().nullable(),
  description: z.string().nullable(),
  pictureUrls: z.array(z.string()),
})

export async function createQuickTaskAction(task: createQuickTaskType) {
  try {
    const parsedProps = createQuickTaskSchema.safeParse(task)

    if (!task.name) throw new Error('Invalid props provided')

    if (!parsedProps.success) {
      // Handle validation error
      console.error('Validation error:', parsedProps.error.errors)
      throw new Error('Invalid props provided')
    }

    const { data, error } = await createQuickTask(parsedProps.data)

    console.log('okay so we created a task', data)
    if (error) throw error

    if (data) return data
  } catch (error) {
    console.error('Something went wrong', error)
    throw error
  }
}

type prop2 = {
  taskId: string
  status: TaskStatus
}

export const updateTaskStatusAction = async (props: prop2) => {
  // Call the signIn function with credentials
  const { data, error } = await updateTaskStatus(props)

  if (error) throw error
  if (data) return data
}

type props2 = {
  working_package_id: string
}

export const createTaskAction = async ({ working_package_id }: props2) => {
  const { data, error } = await createTask({ working_package_id })

  if (error) throw error
  if (data) return data
}

type props3 = {
  taskId: string
  task: updateTaskRequest
}

export const updateTaskAction = async ({ taskId, task }: props3) => {
  if (task.name && task.name != undefined) {
    const { data, error } = await updateTask({ taskId, task })
    if (error) throw error
    if (data) return data
  } else {
    throw new Error('task not valid')
  }
}
