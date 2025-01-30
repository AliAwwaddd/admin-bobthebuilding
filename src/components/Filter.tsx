'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface props {
  filterName: string
  defaultFilter: string
  options: string[]
}
function Filter({ filterName, defaultFilter, options }: props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const activeFilter = searchParams.get(filterName) ?? defaultFilter

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams)
    params.set(filterName, filter)
    router.replace(`${pathName}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='mb-2 flex gap-1'>
      <button
        className={`h-7 rounded-2xl px-5 hover:bg-accent-200 ${activeFilter == options[0] ? 'bg-accent-300' : ''}`}
        onClick={() => handleFilter(options[0])}
      >
        {options[0]}
      </button>
      <button
        className={`h-7 rounded-2xl px-5 hover:bg-accent-200 ${activeFilter == options[1] ? 'bg-accent-300' : ''}`}
        onClick={() => handleFilter(options[1])}
      >
        {options[1]}
      </button>
      <button
        className={`h-7 rounded-2xl px-5 hover:bg-accent-200 ${activeFilter == options[2] ? 'bg-accent-300' : ''}`}
        onClick={() => handleFilter(options[2])}
      >
        {options[2]}
      </button>
    </div>
  )
}

export default Filter
