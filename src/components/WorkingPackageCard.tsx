import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import CircularProgressBar from './CircularProgressBar'

type WorkingPackageCardProps = {
  id: string
  name: string
  description: string | null
  completed: boolean
  progress: number // Percentage of completed tasks (0-100)
  ProjectId: string
  children: React.ReactNode
}

export function WorkingPackageCard({
  id,
  name,
  // description,
  completed,
  progress,
  ProjectId,
  children,
}: WorkingPackageCardProps) {
  return (
    <Card
      className={cn(
        'relative w-[400px] rounded-lg border border-gray-200 bg-white shadow-md transition-transform hover:scale-105 hover:shadow-xl',
      )}
    >
      <div className='absolute right-4 top-4'>
        <CircularProgressBar progress={progress} size={50} />
      </div>
      <Link
        href={`/projects/${ProjectId}/working-packages/${id}/tasks`}
        aria-label='Working Package Info'
        prefetch={true}
      >
        <CardHeader className='p-4'>
          <div className='flex items-start justify-between'>
            <CardTitle className='text-xl font-bold text-gray-800'>
              {name}
            </CardTitle>
          </div>
        </CardHeader>
      </Link>
      <CardContent className='p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium',
              completed
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-600',
            )}
          >
            {completed ? 'Completed' : 'In Progress'}
          </span>
        </div>
        {/* <ProgressBar progress={progress} /> */}
        {children}
      </CardContent>
    </Card>
  )
}
