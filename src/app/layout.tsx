"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import Navbar from '@/components/Nav'
import Footer from '@/components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Notes-Blog App',
  description: 'Application made for a fellow university student, for him to upload academic notes and share blogs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheProvider>
          <ChakraProvider>
            <Navbar />
            <main className="min-h-screen w-full bg-[#1e272e] items-center p-4">
              {children}
            </main>
            <Footer />
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
