'use client'

import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import UnauthorizedNotification from '@/components/unauthorized-notification'

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userData) {
      setIsLoading(false)
    }
  }, [userData])

  if (isLoading) {
    return null
  }

  if (!userData || userData.vai_tro !== 'admin') {
    return <UnauthorizedNotification />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-row flex-1 relative ">
        <ModalProvider />
        <SideBar />
        <ToasterProvider />
        <div className="grow relative z-0">{children}</div>
      </div>
    </div>
  )
}

export default AdminDashboard
