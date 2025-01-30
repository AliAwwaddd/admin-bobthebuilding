'use client'

import { Upload } from 'lucide-react'
import React from 'react'
import { CreateQuickTaskFormField } from './CreateQuickTaskFormField'

type props = {
  projectInfoForm: any
  images: File[]
  setImages: any
}
function QuickTaskForm({ projectInfoForm, images, setImages }: props) {
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

  return (
    <div className='mt-4 flex flex-1 gap-6 space-y-4'>
      {/* Left Section */}
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
        className={`flex flex-1 flex-col items-center justify-center rounded-md border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} bg-gray-100 p-4`}
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
      </div>
    </div>
  )
}

export default QuickTaskForm
