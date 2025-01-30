// import { createClient } from '@supabase/supabase-js'

// const url = process.env.NEXT_PUBLIC_SUPABASE_URL!!
// const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!!

// export const supabase = createClient(url, key, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true,
//   },
// })

// export const ensureBucket = async (companyId: string) => {
//   const { data: bucketList, error } =
//     await supabase.storage.getBucket(companyId)
//   if (error) {
//     const { error: createError } =
//       await supabase.storage.createBucket(companyId)
//     if (createError) throw createError
//   }
// }

// export const uploadImageToBucket = async ({
//   companyId,
//   fileName,
//   formData,
// }: any) => {
//   //   await ensureBucket(companyId)
//   const { data, error } = await supabase.storage
//     .from(companyId)
//     .upload(fileName, formData, {
//       cacheControl: '86400', // Cache for 24 hours
//       upsert: false,
//     })
//   return { data, error }
// }
