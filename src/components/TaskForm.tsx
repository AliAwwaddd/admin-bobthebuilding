'use client'

import {
  createSignedUrls,
  removePictureFromBucket,
} from '@/helpers/SupabasePictureHelpers'
import { removeEditedTaskPictures } from '@/redux/slices/taskSlice'
import { RootState } from '@/redux/TaskStore'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateQuickTaskFormField } from './CreateQuickTaskFormField'
import { Form } from './ui/form'
import { Skeleton } from './ui/skeleton'

type props = {
  projectInfoForm: any
  images: File[]
  setImages: any
}
function TaskForm({ projectInfoForm, images, setImages }: props) {
  const editedImages = useSelector(
    (state: RootState) => state.task.selectedTask?.pictureUrls,
  )

  const dispatch = useDispatch()
  const companyId = useSelector((state: RootState) => state.task.CompanyId)

  const [editedImagesUrls, setEditedImagesUrls] = React.useState<string[]>([])
  const [loading, setIsLoading] = React.useState<boolean>(false)

  const handleRemoveEditedImage = async (index: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      if (editedImages?.at(index) != undefined)
        await removePictureFromBucket({
          companyId,
          imgPath: editedImages.at(index) || '',
        })
      setEditedImagesUrls((prev) => prev.filter((_, i) => i !== index))
      // console.log()
      dispatch(removeEditedTaskPictures(editedImages?.at(index) || ''))
    }
  }

  useEffect(() => {
    const getSignedUrls = async () => {
      if (editedImages != undefined && editedImages.length != 0) {
        setIsLoading(true)
        const data = await createSignedUrls({
          companyId,
          workerPictureUrls: editedImages,
        })
        // console.log(
        //   '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
        //   data,
        // )
        setIsLoading(false)
        setEditedImagesUrls(data.map((image) => image.signedUrl))
      }
    }
    getSignedUrls()
  }, [companyId, editedImages])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const [isDragging, setIsDragging] = React.useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files) {
      setImages([...images, ...Array.from(files)])
    }
  }

  // const selectedTask = useSelector(
  //   (state: RootState) => state.task.selectedTask,
  // )

  return (
    <Form {...projectInfoForm}>
      <form
      // onSubmit={projectInfoForm.handleSubmit((data: any) =>
      //   console.log(data),
      // )}
      >
        {/* Left Section */}
        <div className='mt-4 flex flex-1 gap-6 space-y-4'>
          <div className='flex-1 space-y-4'>
            <CreateQuickTaskFormField
              name='name'
              label='Name'
              placeholder='name'
              formControl={projectInfoForm.control}
            />

            <CreateQuickTaskFormField
              name='location'
              label='Location'
              placeholder='Location'
              formControl={projectInfoForm.control}
            />

            <CreateQuickTaskFormField
              name='description'
              label='Description'
              placeholder='Description'
              formControl={projectInfoForm.control}
            />
          </div>

          {/* Right Section */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex flex-1 flex-col items-center justify-center rounded-md border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} max-w-[330px] bg-gray-100 p-4`}
          >
            <p className='flex flex-col items-center text-sm text-gray-500'>
              <Upload size={40} />
              {isDragging
                ? 'Drop the image(s) here'
                : '(Click to upload or drag & drop)'}
            </p>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageUpload}
              className='hidden'
              id='file-upload'
            />
            <label
              htmlFor='file-upload'
              className='mt-2 cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow hover:bg-blue-600'
            >
              Browse Files
            </label>

            {/* Display Newly Uploaded Images */}
            {images.length > 0 && (
              <ul className='mt-4 w-full space-y-2'>
                {images.map((image, index) => (
                  <li
                    key={index}
                    className='flex items-center justify-between rounded-md border p-2 text-sm'
                  >
                    <span className='truncate'>{image.name}</span>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className='ml-2 text-red-500 hover:text-red-700'
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Display Edited Images */}
            {loading && (
              <div className='mt-4 max-h-64 w-full overflow-hidden overflow-x-auto rounded-md border bg-gray-50 p-4'>
                <div className='flex gap-4'>
                  {Array(2)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className='relative w-[150px] flex-shrink-0 rounded-md border bg-white p-2 shadow'
                      >
                        <Skeleton className='h-32 w-full rounded-md' />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {editedImagesUrls.length > 0 && (
              <div className='mt-4 max-h-64 w-full overflow-hidden overflow-x-auto rounded-md border bg-gray-50 p-4'>
                <div className='flex gap-4'>
                  {editedImagesUrls.map((url, index) => (
                    <div
                      key={`edited-${index}`}
                      className='relative w-[150px] flex-shrink-0 rounded-md border bg-white p-2 shadow'
                    >
                      {url && (
                        <Image
                          src={url}
                          alt={`Edited Image ${index + 1}`}
                          width={150}
                          height={150}
                          quality={10}
                          className='h-32 w-full rounded-md object-cover'
                        />
                      )}
                      <button
                        onClick={() => handleRemoveEditedImage(index)}
                        className='absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
                        title='Remove'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default TaskForm
