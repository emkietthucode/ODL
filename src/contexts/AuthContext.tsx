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
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, userData, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
