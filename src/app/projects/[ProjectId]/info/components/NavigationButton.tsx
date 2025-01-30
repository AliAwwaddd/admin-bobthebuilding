// components/NavigationButton.tsx
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type NavigationButtonProps = {
  label: string
  href: string
}

export const NavigationButton = ({ label, href }: NavigationButtonProps) => (
  <Button
    variant='ghost'
    className='flex items-center space-x-2 text-lg hover:bg-gray-300'
    asChild
  >
    <Link href={href} prefetch={true}>
      <ArrowLeft className='h-5 w-5' />
      <span>{label}</span>
    </Link>
  </Button>
)
