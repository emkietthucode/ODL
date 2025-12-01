'use client'
import ConfirmSubmitTestModal from '@/components/confirm-submit-test-modal'
import ToasterProvider from '@/providers/toaster-provider'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

function MissedQuestionsLayout({ children }: { children: React.ReactNode }) {
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
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  )
}

export default MissedQuestionsLayout
