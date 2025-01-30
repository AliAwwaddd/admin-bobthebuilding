import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonButton() {
  return (
    <section className='fixed bottom-8 left-1/2 -translate-x-1/2 transform'>
      <Skeleton className='h-10 w-36 rounded-lg bg-gray-300' />
    </section>
  )
}
