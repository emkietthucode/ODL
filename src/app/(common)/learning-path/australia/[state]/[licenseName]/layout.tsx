'use client'

import { LoTrinh } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PathInfoContext } from '@/contexts/PathInfoContext'

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
          await supabase.rpc('fetch_australia_path_info', {
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

  console.log(learningPath)

  return (
    <PathInfoContext.Provider value={{ learningPath }}>
      {children}
    </PathInfoContext.Provider>
  )
}
