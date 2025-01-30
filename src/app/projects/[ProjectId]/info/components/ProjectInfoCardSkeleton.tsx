import { Skeleton } from '@/components/ui/skeleton'

export function ProjectInfoCardSkeleton() {
  return (
    <div className='w-full rounded-xl border bg-white p-4 shadow-md'>
      {/* Header */}
      <div className='mb-4'>
        <Skeleton className='h-6 w-1/3' />
        <Skeleton className='mt-2 h-4 w-1/2' />
      </div>

      <div className='mb-4 space-y-2'>
        <Skeleton className='h-4 w-1/4' />
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/4' />
        <Skeleton className='h-4 w-3/4' />
      </div>

      <div className='mt-6 flex justify-center'>
        <Skeleton className='h-10 w-1/4 rounded-lg' />
      </div>
    </div>
  )
}
