'use client'

import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'
import { AuthProvider } from '@/contexts/AuthContext'

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-row flex-1 relative ">
        <ModalProvider />
        <SideBar />
        <ToasterProvider />
        <div className="grow relative z-0">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
