'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUser(session?.user || null)
      setLoading(false)
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
      setUser(session?.user || null)
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
