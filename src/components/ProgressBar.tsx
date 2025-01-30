import React from 'react'
import { cn } from '@/lib/utils'

type ProgressBarProps = {
  progress: number // Percentage of completion (0-100)
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='relative h-4 w-full overflow-hidden rounded-full bg-gray-200'>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-300',
          progress === 100 ? 'bg-green-500' : 'bg-blue-500',
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
