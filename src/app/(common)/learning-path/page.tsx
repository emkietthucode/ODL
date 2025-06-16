'use client'

import ScrollToTopButton from '@/components/scroll-to-top-button'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'
import supabase from '@/utils/supabase/supabase'
import CountrySelection from '@/components/select-country'

const TestsCategoryPage = () => {
  const t = useTranslations('VietnamTestPage')
  const router = useRouter()
  const pathname = usePathname()

  const { user, loading } = useAuth()

  useEffect(() => {
    const getUserDetails = async () => {
      if (!user) {
        return
      }

      const { data, error } = await supabase.rpc('get_nguoi_dung_by_id', {
        user_id: user?.id,
      })

      if (data.user_record?.ma_khu_vuc) {
        const { data: regionData, error: regionError } = await supabase.rpc(
          'fetch_region_info',
          {
            region_id: data.user_record?.ma_khu_vuc,
          }
        )

        if (regionData) {
          router.push(`learning-path/${regionData.slug}`)
        } else if (localStorage.getItem('selectedCountry')) {
          const selectedCountry = localStorage.getItem('selectedCountry')
          router.push(`learning-path/${selectedCountry}`)
        }
      }
    }

    getUserDetails()
  }, [user])

  return (
    <main className="max-w-[80%] bg-white mx-auto h-full">
      <CountrySelection />
      <ScrollToTopButton />
    </main>
  )
}

export default TestsCategoryPage
