"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Nav'
import Footer from '@/components/Footer/Footer'
import { SessionProvider } from 'next-auth/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Session } from 'next-auth'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <CacheProvider>
            <ChakraProvider>
              <Navbar />
              <main className="min-h-screen w-full bg-[#1e272e] items-center p-4">
                {children}
              </main>
              <Footer />
            </ChakraProvider>
          </CacheProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
