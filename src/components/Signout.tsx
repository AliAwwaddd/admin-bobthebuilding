import { signOut } from '@/auth'
import { createClient } from '@/utils/supabase/server'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
function Signout() {
  return (
    <form
      className='m z-10 flex items-center gap-4'
      action={async () => {
        'use server'
        await signOut({ redirect: false })
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/auth/signin')
      }}
    >
      {/* <Image height="60" width="60" src="/logo.png" alt="The Wild Oasis logo" /> */}
      {/* <span className='text-primary-100 text-xl font-semibold'>BoB the building</span> */}

      <Button type='submit'>Signout</Button>
    </form>
  )
}

export default Signout
