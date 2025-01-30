import { SkeletonCard } from './SkeletonCard'

export function LoadingProjectSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}
