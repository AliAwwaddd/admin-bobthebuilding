'use client'

import { Info } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type ProjectCardProps = {
  name: string
  description: string | null
  completed: boolean
  id: string
}

export function ProjectCard({
  name,
  description,
  completed,
  id,
}: ProjectCardProps) {
  return (
    <Card className={cn('relative w-[380px]')}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <Link
            href={`projects/${id}/working-packages`}
            aria-label='Project Info'
            prefetch={true}
          >
            <div>
              <CardTitle className='w-[270px] truncate'>{name}</CardTitle>
              <CardDescription className='line-clamp-3 max-w-[260px] overflow-hidden text-ellipsis'>
                {description}
              </CardDescription>
            </div>
          </Link>
          <Link
            className='rounded-full bg-gray-100 p-2 hover:bg-gray-200'
            href={`projects/${id}/info`}
            aria-label='Project Info'
            prefetch={true}
          >
            <Info className='h-5 w-5 text-gray-600' />
          </Link>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <span
          className={cn(
            'rounded-full px-2 py-1 text-sm font-medium',
            completed
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-500',
          )}
        >
          {completed ? 'Completed' : 'in progress'}
        </span>
      </CardContent>
    </Card>
  )
}
