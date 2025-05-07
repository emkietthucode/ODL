import { PathInfoContext } from '@/app/(common)/learning-path/[licenseName]/layout'
import { useContext } from 'react'

export default function usePathInfo() {
  const pathInfo = useContext(PathInfoContext)

  return pathInfo
}
