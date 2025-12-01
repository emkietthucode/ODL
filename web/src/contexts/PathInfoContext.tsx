'use client'

import { LoTrinh } from '@/types/types'
import { createContext } from 'react'

interface PathInfoContextType {
  learningPath: LoTrinh | null
}

export const PathInfoContext = createContext<PathInfoContextType | null>(null)
