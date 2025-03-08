import useAuth from '@/hooks/useAuth'
import { getRequestConfig } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'

export default getRequestConfig(async () => {
  const supabase = await createClient() // Use the server client
  const {
    data: { session },
  } = await supabase.auth.getSession()
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  let locale = 'en'

  console.log('user::', session?.user.id)

  if (session?.user) {
    const { data, error } = await supabase.rpc('get_ngon_ngu_nguoi_dung', {
      user_id: 'b3ba76c0-1b00-4737-8395-682b8d31c039',
    })

    if (error) {
      console.error('Error fetching user language:', error)
    } else {
      locale = data?.language_record.ky_hieu || 'en'
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
