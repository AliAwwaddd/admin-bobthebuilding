'use client'

import { AlertTriangle } from 'lucide-react'

export default function ErrorComponent({
  message = 'Something went wrong...',
}) {
  return (
    <div className='mt-20 flex items-center justify-center'>
      <div className='text-center'>
        {/* Error Icon */}
        <AlertTriangle className='mx-auto h-12 w-12 text-red-500' />

        {/* Error Text */}
        <h1 className='mt-4 text-2xl font-semibold text-gray-800'>Oops!</h1>
        <p className='mt-2 text-lg text-gray-600'>{message}</p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className='mt-6 rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600'
        >
          Retry
        </button>
      </div>
    </div>
  )
}
