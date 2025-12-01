import { PathInfoContext } from '@/contexts/PathInfoContext'
import { useContext } from 'react'

export default function usePathInfo() {
  const pathInfo = useContext(PathInfoContext)

  return pathInfo
}
