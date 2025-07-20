'use client'

import ScrollToTopButton from '@/components/scroll-to-top-button'
import CountrySelection from '@/components/select-country'
import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const TestPage = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const getUserDetails = async () => {
      if (!user) {
        const selectedCountry = localStorage.getItem('selectedCountry')
        if (selectedCountry === 'vietnam') {
          router.push('tests/vietnam')
        } else {
          router.push('tests/australia/new-south-wales')
        }
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

        if (regionData?.slug === 'vietnam') {
          router.push('tests/vietnam')
        } else {
          router.push('tests/australia/new-south-wales')
        }
      } else {
        // fallback if no region info
        router.push('tests/australia/new-south-wales')
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

export default TestPage
