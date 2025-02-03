'use client'

import { generateShortName } from '@/utils/helperFunctions'
import { createClient } from '@/utils/supabase/client'

type props = {
  CompanyId: string
  managerId: string
  taskId: string
  images: File[] | []
}
export const uploadTaskImageClient = async ({
  managerId,
  taskId,
  CompanyId,
  images,
}: props) => {
  const pictures_path: string[] | any[] = []

  await Promise.all(
    images.map(async (image) => {
      try {
        const fileType = image.name.split('/').pop()?.split('.').pop()
        const fileName = `m/${managerId}/t/${taskId}/${generateShortName()}.${fileType}`

        const { data: uploadedImageData, error: uploadedImageError } =
          await uploadImageToBucketClient({
            CompanyId,
            fileName,
            image: image,
          })

        if (uploadedImageError) {
          throw new Error(
            "One of the images couldn't be uploaded",
            uploadedImageError,
          )
        }
        if (uploadedImageData) pictures_path.push(uploadedImageData.path)
      } catch (error) {
        console.error(`Unexpected error uploading ${image}:`, error)
        throw error
      }
    }),
  )

  return pictures_path
}

export const uploadImageToBucketClient = async ({
  CompanyId,
  fileName,
  image,
}: any) => {
  const supabase = createClient()
  const { data, error } = await supabase.storage
    .from(CompanyId)
    .upload(fileName, image, {
      cacheControl: '86400',
      upsert: false,
    })
  console.log(
    '########################################################################',
    error,
  )
  return { data, error }
}
