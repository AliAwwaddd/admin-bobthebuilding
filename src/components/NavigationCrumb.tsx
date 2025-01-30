'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useRouter } from 'next/navigation'
function NavigationCrumb({ current, prev }: any) {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  const handleGoToProjects = () => {
    router.push('/projects')
  }

  return (
    <div className='cursor-pointer'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='hidden md:block'>
            <BreadcrumbLink onClick={handleGoToProjects}>
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='hidden md:block' />
          <BreadcrumbItem className='hidden md:block'>
            <BreadcrumbLink onClick={handleBackClick}>{prev}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='hidden md:block' />
          <BreadcrumbItem>
            <BreadcrumbPage>{current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default NavigationCrumb
