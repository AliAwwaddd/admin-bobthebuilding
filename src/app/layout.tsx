import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import '@/styles/globals.css'
import { Children } from '@/types/Children'
import { SessionProvider } from 'next-auth/react'
import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s | The admin page',
    default: 'Welcome | The admin page',
  },
  description: 'The admin page',
}

export default function RootLayout({ children }: Children) {
  return (
    <SessionProvider>
      <html lang='en'>
        <body className={`${josefin.className} bg-neutral-100 antialiased`}>
          <SidebarProvider>
            <AppSidebar />
            <main className='w-full bg-main'>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
