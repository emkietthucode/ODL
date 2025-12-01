'use client'

import { NgonNgu } from '@/types/types'
import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface LanguageContextType {
  languages: NgonNgu[]
  locale: string | undefined
  setLocale: (locale: string) => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

const getClientCookie = (name: string) => {
  if (typeof document === 'undefined') return ''

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1]
}

const setClientCookie = (name: string, value: string, days = 30) => {
  if (typeof document === 'undefined') return // Ensure it's client-side

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000) // Expiration in days

  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
}

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [languages, setLanguages] = useState<NgonNgu[]>([])

  const [locale, setLocaleState] = useState<string | undefined>('')

  useEffect(() => {
    const storedLanguages = localStorage.getItem('languages')
    if (storedLanguages) {
      setLanguages(JSON.parse(storedLanguages))
    }

    setLocaleState(getClientCookie('locale') || 'en')
  }, [])

  useLayoutEffect(() => {
    const handleFetchLanguages = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.rpc('get_languages')

      if (data) {
        const languages = data.languages_record
        setLanguages(languages)
        localStorage.setItem('languages', JSON.stringify(languages))
      }
    }

    if (!languages.length) {
      handleFetchLanguages()
    }
  }, [])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    setClientCookie('locale', newLocale, 30) // Store in a cookie
  }

  return (
    <LanguageContext.Provider value={{ languages, locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}
