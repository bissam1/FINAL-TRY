import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import CustomCursor from '@/components/CustomCursor'
import Preloader from '@/components/Preloader'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  if (!isMounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
        {!isLoading && (
          <>
            <CustomCursor />
            <Component {...pageProps} />
          </>
        )}
      </main>
    </ThemeProvider>
  )
}