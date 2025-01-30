import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-3 rounded-xl border p-4 shadow-md'>
      <Skeleton className='h-[125px] w-full rounded-lg' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </div>
    </div>
  )
}
