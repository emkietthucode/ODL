import SideBar from "@/components/sidebar";
import ModalProvider from "../../../providers/modal-provider";
import ToasterProvider from "../../../providers/toaster-provider";

const AdminDashboard = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (  
        <div className="flex min-h-screen">
          <ModalProvider/>            
          <SideBar />
          <div className="grow border-l-2 border-light-purple">
            {children}
          </div>
          <ToasterProvider/>
        </div>
    );
}
 
export default AdminDashboard;