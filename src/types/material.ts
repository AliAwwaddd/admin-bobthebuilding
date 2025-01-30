import { projectAddMaterialSchema } from '@/lib/zod'
import { z } from 'zod'

export type MaterialType = z.infer<typeof projectAddMaterialSchema>

export type materialTableType = {
  id: string
  lv_position: string
  name: string
  quantity: number
  unit: string
}
