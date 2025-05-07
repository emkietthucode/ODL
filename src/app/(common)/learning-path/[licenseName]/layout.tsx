'use client'

import { LoTrinh } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { createContext, useState, useEffect } from 'react'

export default function LearningPathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { licenseName } = useParams<{ licenseName: string }>()
  const [learningPath, setLearningPath] = useState<LoTrinh | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!licenseName) return

      try {
        setLoading(true)
        const { data: learningPathData, error: learningPathError } =
          await supabase.rpc('fetch_learning_path_info', {
            path_name: licenseName,
          })
        setLearningPath(learningPathData)
      } catch (error: any) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [licenseName, supabase])
  if (loading) return <div>Loading...</div>

  return (
    <PathInfoContext.Provider value={{ learningPath }}>
      {children}
    </PathInfoContext.Provider>
  )
}

interface PathInfoContextType {
  learningPath: LoTrinh | null
}

export const PathInfoContext = createContext<PathInfoContextType | null>(null)
