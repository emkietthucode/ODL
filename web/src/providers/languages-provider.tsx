import { NgonNgu } from '@/types/types'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

function LanguagesProvider({ children }: { children: React.ReactNode }) {
  const [languages, setLanguages] = useState<NgonNgu[]>([])
  const [locale, setLocale] = useState<string | undefined>('')

  useEffect(() => {
    const storedLanguages = localStorage.getItem('languages')

    if (storedLanguages) {
      setLanguages(JSON.parse(storedLanguages))
    } else {
      const handleFetchLanguages = async () => {
        const supabase = await createClient()
        const { data, error } = await supabase.rpc('get_languages')

        if (data) {
          const languages = JSON.parse(data.languages_record)
          setLanguages(languages)
          localStorage.setItem('languages', JSON.stringify(languages))
        }
      }

      handleFetchLanguages()
    }
  }, [])

  return <>{children}</>
}

export default LanguagesProvider
