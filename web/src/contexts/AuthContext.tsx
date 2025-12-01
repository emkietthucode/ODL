'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        setUser(session?.user || null)
      } catch (error) {
      } finally {
        setLoading(false)
        console.log('disabled loadding 1::', loading)
      }
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event)
      setUser(session?.user || null)

      if (session?.user) {
        const loginDate = new Date().toLocaleDateString('en-CA', {
          timeZone: 'UTC',
        }) // YYYY-MM-DD in UTC

        // Check for existing login today
        const { data: existing } = await supabase
          .from('user_logins')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('login_date', loginDate)
          .single()

        if (!existing) {
          const { error } = await supabase
            .from('user_logins')
            .insert([{ user_id: session.user.id, login_date: loginDate }])

          if (error) {
            console.error('Error logging login:', error.message)
          }
        }
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
