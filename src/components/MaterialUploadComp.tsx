import { Upload, X } from 'lucide-react'
import Image from 'next/image'

function MaterialUploadComp({
  handleFileChange,
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleRemoveFile,
  file,
}: any) {
  return (
    <div
      className={`min-h-300 relative flex h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed ${
        isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-400'
      } p-6`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Background Image */}
      <Image
        src='/default-material.webp'
        fill
        alt='Materials Background'
        className='rounded-lg object-cover opacity-70'
      />

      {/* Content Overlay */}
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white'>
        {!file ? (
          <>
            <label
              htmlFor='fileUpload'
              className='flex cursor-pointer flex-col items-center justify-center gap-2 hover:text-gray-300'
            >
              <Upload size={40} />
              <p className='font-semibold'>
                {isDragging ? 'Drop the file here' : 'Material hochladen'}
              </p>
              <p className='text-sm'>(Click to upload or drag & drop)</p>
            </label>
            <input
              accept='.pdf,.x83'
              id='fileUpload'
              type='file'
              onChange={handleFileChange}
              className='hidden'
            />
          </>
        ) : (
          <div className='flex items-center gap-4 text-white'>
            <div className='flex flex-col items-start'>
              <p className='font-medium'>{file.name}</p>
              <p className='text-sm'>{Math.round(file.size / 1024)} KB</p>
            </div>
            <button
              onClick={handleRemoveFile}
              className='text-white hover:text-red-500'
              aria-label='Remove file'
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MaterialUploadComp
