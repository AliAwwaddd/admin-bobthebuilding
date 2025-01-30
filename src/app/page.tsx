import Link from 'next/link'

export default function Page() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-main'>
      <div className='space-y-4 text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Welcome!</h1>
        <p className='text-gray-700'>Navigate to a section of your choice:</p>
        <div className='flex justify-center space-x-4'>
          <Link
            href='/projects'
            prefetch={true}
            className='rounded-lg bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700'
          >
            Go to Projects
          </Link>
          <Link
            href='/employees'
            prefetch={true}
            className='rounded-lg bg-green-600 px-6 py-2 text-white shadow transition hover:bg-green-700'
          >
            Go to Employees
          </Link>
        </div>
      </div>
    </main>
  )
}
