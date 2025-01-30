'use client'

import { Button } from '@/components/ui/button'
import { openTaskOrderList } from '@/redux/slices/taskSlice'
import { List } from 'lucide-react'
import { useDispatch } from 'react-redux'

export default function TaskToggleButton() {
  const dispatch = useDispatch()
  return (
    <Button
      variant='outline'
      size='sm'
      className='flex h-8 items-center gap-2 border-dashed'
      onClick={() => dispatch(openTaskOrderList())}
    >
      <List size={18} />
      update order
    </Button>
  )
}
