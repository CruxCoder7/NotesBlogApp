import './globals.css'
import { Inter } from 'next/font/google'
import NextSessionProvider from '@/components/Providers/NestSessionProvider'
import { CacheProv, ChakraProv } from '@/components/Providers/Chakra'
import Navbar from '@/components/Navbar/Nav'
import Footer from '@/components/Footer/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSessionProvider>
          <CacheProv>
            <ChakraProv>
              <Navbar auth={session?.user ? true : false} />
              <main className="min-h-screen w-full bg-[#1e272e] items-center p-4">
                {children}
              </main>
              <Footer />
            </ChakraProv>
          </CacheProv>
        </NextSessionProvider>
      </body>
    </html>
  )
}
