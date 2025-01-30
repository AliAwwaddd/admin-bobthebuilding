'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { RootState } from '@/redux/TaskStore'
import { setTasks } from '@/redux/slices/taskSlice'
import { Reorder, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

export default function TaskList() {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.task.tasks)

  return (
    <div className='mx-auto w-full max-w-xl space-y-4 rounded-lg bg-muted p-6'>
      {/* Button inside TaskList to toggle ordering */}
      {/* <Button
        variant='default' // Red button for high visibility
        size='lg' // Larger size
        className='flex items-center gap-2 bg-gray-600 px-4 py-2 font-semibold shadow-md transition-transform hover:scale-105 hover:bg-gray-700'
        onClick={() => dispatch(toggleTaskOrder())}
      >
        Save
      </Button> */}

      {/* Reorderable Task List */}
      <Reorder.Group
        axis='y'
        values={tasks}
        onReorder={(newOrder) => dispatch(setTasks(newOrder))}
        className='space-y-4'
      >
        {tasks.map((task) => (
          <Reorder.Item
            key={task.id}
            value={task}
            className='cursor-grab active:cursor-grabbing'
            whileDrag={{ scale: 1.05 }}
          >
            <Card className='flex items-center justify-between p-4 shadow-lg transition-all'>
              <motion.span className='font-sm text-sm'>{task.name}</motion.span>
              <Badge className='bg-gray-500'>{task.status}</Badge>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

// import { Badge } from '@/components/ui/badge'
// import { Card } from '@/components/ui/card'
// import { workingPackageTaskType } from '@/types/task'
// import { Reorder, motion } from 'framer-motion'
// import { useState } from 'react'

// export default function TaskList({
//   initialTasks,
// }: {
//   initialTasks: workingPackageTaskType[]
// }) {
//   const [tasks, setTasks] = useState(initialTasks)

//   return (
//     <Reorder.Group
//       axis='y'
//       values={tasks}
//       onReorder={setTasks}
//       className='mx-auto w-full max-w-xl space-y-4 rounded-lg bg-muted p-6'
//     >
//       {tasks.map((task) => (
//         <Reorder.Item
//           key={task.id}
//           value={task}
//           className='cursor-grab active:cursor-grabbing'
//           whileDrag={{ scale: 1.05 }}
//         >
//           <Card className='flex items-center justify-between p-4 shadow-lg transition-all'>
//             <motion.span className='text-lg font-semibold'>
//               {task.name}
//             </motion.span>
//             <Badge>{task.status}</Badge>
//           </Card>
//         </Reorder.Item>
//       ))}
//     </Reorder.Group>
//   )
// }
