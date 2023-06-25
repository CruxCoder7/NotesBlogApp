"use client"
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'

const ChakraProv = ({ children }: { children: React.ReactNode }) => {
    return <ChakraProvider>{children}</ChakraProvider>
}

const CacheProv = ({ children }: { children: React.ReactNode }) => {
    return <CacheProvider>{children}</CacheProvider>
}

export { CacheProv, ChakraProv }