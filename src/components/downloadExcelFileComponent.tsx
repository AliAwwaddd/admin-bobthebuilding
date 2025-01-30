'use client'

import { handleDownloadExcel } from '@/api/downloadExcelFile'
import { FileText } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function DownloadExcelFileComponent({ wpId }: { wpId: string }) {
  const [loading, setLoading] = useState(false)

  const session = useSession()

  const handleDownload = async () => {
    setLoading(true)
    try {
      await handleDownloadExcel({
        wpId,
        token: session.data?.user.access_token,
      })
    } catch (error) {
      console.error('�� Download failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className='flex items-center gap-1 rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500'
      disabled={loading}
    >
      <FileText />
      {loading ? (
        <div className='flex items-center justify-center'>
          <svg
            className='mr-2 h-5 w-5 animate-spin text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      ) : (
        'Download Excel'
      )}
    </button>
  )
}
