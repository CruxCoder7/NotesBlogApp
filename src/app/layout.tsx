"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import Navbar from '@/components/Navbar/Nav'
import Footer from '@/components/Footer/Footer'
import NextSessionProvider from '@/components/Providers/NestSessionProvider'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSessionProvider>
          <CacheProvider>
            <ChakraProvider>
              <Navbar />
              <main className="min-h-screen w-full bg-[#1e272e] items-center p-4">
                {children}
              </main>
              <Footer />
            </ChakraProvider>
          </CacheProvider>
        </NextSessionProvider>
      </body>
    </html>
  )
}
