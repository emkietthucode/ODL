'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'
import { NguoiDung } from '@/types/types'

interface AuthContextType {
  user: User | null
  userData: NguoiDung | null
  loading: boolean
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<NguoiDung | null>(null)
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

        if (session?.user) {
          const { data, error } = await supabase
            .from('nguoi_dung')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (!error && data) {
            setUserData(data)
          }
        } else {
          setLoading(false)
        }
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
      setUser(session?.user || null)

      if (session?.user) {
        console.log('into')
        try {
          const { data, error } = await supabase
            .from('nguoi_dung')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (!error && data) {
            setUserData(data)
          }
        } catch (error) {
        } finally {
          setLoading(false)
          console.log('disabled loadding 2::', loading)
        }
      } else {
        setLoading(false)
      }
    })

    return () => {
      setLoading(false)
      subscription?.unsubscribe()
    }
  }, [supabase])

  console.log(loading)

  return (
    <AuthContext.Provider value={{ user, userData, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
