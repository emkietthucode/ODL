import { getRequestConfig } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const supabase = await createClient() // Use the server client
  let locale = (await cookies()).get('locale')?.value || ''
  const {
    data: { session },
  } = await supabase.auth.getSession()
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  if (locale === '') {
    if (session?.user) {
      try {
        const { data, error } = await supabase.rpc('get_ngon_ngu_nguoi_dung', {
          user_id: 'b3ba76c0-1b00-4737-8395-682b8d31c039',
        })

        locale = data?.language_record.ky_hieu || 'en'
      } catch (error) {
        console.error('Error fetching user language:', error)
        locale = 'en'
      }
    } else {
      locale = 'en'
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
