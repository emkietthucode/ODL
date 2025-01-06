import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import ModalProvider from '../../../providers/modal-provider'

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <ModalProvider />
      <SideBar />
      <div className="grow border-l-2 border-light-purple">{children}</div>
    </div>
  )
}

export default AdminDashboard
