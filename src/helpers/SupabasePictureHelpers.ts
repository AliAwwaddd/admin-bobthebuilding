'use client'

import { createClient } from '@/utils/supabase/client'
type props = {
  companyId: string
  workerPictureUrls: string[]
}
export const createSignedUrls = async ({
  companyId,
  workerPictureUrls,
}: props) => {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(companyId)
    .createSignedUrls(workerPictureUrls, 60 * 60 * 24)

  if (error) throw error
  return data
}

type props2 = {
  companyId: string
  imgPath: string
}
export const removePictureFromBucket = async ({
  companyId,
  imgPath,
}: props2) => {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(companyId)
    .remove([imgPath])

  if (error) throw error
  return data
}
