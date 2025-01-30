import SigninForm from '@/components/SigninForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Page() {
  return (
    <main
      className='flex min-h-[500px] flex-col items-center justify-center px-4 sm:px-6 lg:px-8'
      style={{ marginTop: 100 }}
    >
      <Card className='w-full max-w-md'>
        <CardHeader className='mb-8 flex flex-col gap-4'>
          <CardTitle className='text-center text-3xl font-bold'>
            Sign in
          </CardTitle>
          <SigninForm />
          <CardContent className='text-center text-sm text-neutral-500'>
            Don&apos;t have an account?{' '}
            <Link
              href='signup'
              className='underline underline-offset-4 hover:text-neutral-700'
            >
              Signup
            </Link>
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  )
}
