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
  const [loading, setLoading] = useState(true)

  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log('auth session', session)

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
      }

      setLoading(false)
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event)
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
        setUserData(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  console.log(user)

  return (
    <AuthContext.Provider value={{ user, userData, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
