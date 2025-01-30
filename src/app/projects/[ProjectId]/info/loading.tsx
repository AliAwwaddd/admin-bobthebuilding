import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='text-center'>
        {/* Spinner Icon */}
        <Loader className='mx-auto h-12 w-12 animate-spin text-blue-500' />

        {/* Loading Text */}
        <p className='mt-4 text-lg font-medium text-gray-700'>Loading...</p>
      </div>
    </div>
  )
}
