import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-row flex-1">
        <ModalProvider />
        <SideBar />
        <ToasterProvider />
        <div className="grow border-l-2 border-light-purple">{children}</div>
      </div>
    </div>
  )
}

export default AdminDashboard
