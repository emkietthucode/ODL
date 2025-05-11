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
        console.log('disabled loading 1::', loading)
      }
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      setLoading(false)
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
