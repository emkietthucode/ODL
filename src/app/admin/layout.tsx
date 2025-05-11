'use client'

import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'
import useAuth from '@/hooks/useAuth'
import { AuthProvider } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth()

  if (!userData || userData?.vai_tro !== 'admin') {
    return redirect('/')
  }
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
