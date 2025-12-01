'use client'
import ConfirmSubmitTestModal from '@/components/confirm-submit-test-modal'
import ToasterProvider from '@/providers/toaster-provider'
import { useEffect, useState } from 'react'

function TestLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <ToasterProvider />
      <ConfirmSubmitTestModal />
      {children}
    </div>
  )
}

export default TestLayout
