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
  const [learningPath, setLearningPath] = useState<LoTrinh | null>(null)

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
