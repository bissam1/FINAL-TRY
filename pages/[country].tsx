import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import AnimatedNav from '@/components/AnimatedNav'
import CountryHero from '@/components/CountryHero'
import FeaturedProperties from '@/components/FeaturedProperties'
import CountryInfo from '@/components/CountryInfo'
import Footer from '@/components/Footer'
import FloatingTools from '@/components/FloatingTools'

// Country data mapping
const COUNTRIES = {
  uae: {
    name: 'United Arab Emirates',
    videoSrc: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5',
    currency: 'AED',
    language: 'ar'
  },
  uk: {
    name: 'United Kingdom',
    videoSrc: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd',
    currency: 'GBP',
    language: 'en'
  },
  russia: {
    name: 'Russia',
    videoSrc: 'https://images.unsplash.com/photo-1513326738677-b964603b136d',
    currency: 'RUB',
    language: 'ru'
  }
}

export default function CountryPage() {
  const router = useRouter()
  const { country } = router.query
  const [uiVisible, setUiVisible] = useState(false)
  
  const countryData = COUNTRIES[country as keyof typeof COUNTRIES] || COUNTRIES.uae

  useEffect(() => {
    const timer = setTimeout(() => {
      setUiVisible(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!country) return null

  return (
    <>
      <Head>
        <title>NOOD Properties | {countryData.name}</title>
      </Head>

      <AnimatedNav isVisible={uiVisible} />
      
      <main>
        <CountryHero 
          country={countryData.name} 
          videoSrc={countryData.videoSrc}
          isVisible={uiVisible} 
        />
        <CountryInfo country={country as string} />
        <FeaturedProperties country={country as string} />
      </main>
      
      <FloatingTools />
      <Footer />
    </>
  )
}
