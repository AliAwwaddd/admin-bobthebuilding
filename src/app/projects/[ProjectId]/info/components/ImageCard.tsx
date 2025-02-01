// components/ImageCard.tsx
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
type ImageCardProps = {
  href: string
  imageSrc: any
  alt: string
  title: string
}

export const ImageCard = ({ href, imageSrc, alt, title }: ImageCardProps) => {
  console.log('imageSrc', imageSrc)
  return (
    <Link href={href} className='flex flex-1' prefetch={true}>
      <Card className='relative h-80 w-full cursor-pointer rounded-lg p-[2px] hover:shadow-lg'>
        <CardContent className='relative flex h-full flex-1 rounded-lg'>
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className='rounded-lg object-cover'
            priority={false} // ✅ Avoids eager loading
            placeholder='blur'
            blurDataURL={imageSrc}
            loading='lazy'
          />
          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50'>
            <CardTitle className='text-xl font-bold text-white'>
              {title}
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
