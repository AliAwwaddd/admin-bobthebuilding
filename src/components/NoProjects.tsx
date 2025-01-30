'use client'

import { motion } from 'framer-motion'
import { FileX } from 'lucide-react'

export default function NoProjects({ filter }: { filter: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex h-full items-center justify-center'
    >
      <div className='w-full max-w-md p-6 text-center'>
        <div className='flex flex-col items-center gap-3'>
          <FileX className='h-10 w-10 text-gray-500' />
          <h3 className='text-lg font-semibold text-gray-700'>
            No {filter} projects
          </h3>
        </div>
      </div>
    </motion.div>
  )
}
