import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const AdminDashboard = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (  
        <div className="flex min-h-screen">            
          <SideBar />
          <div className="grow border-l-2 border-light-purple">
            {children}
          </div>
        </div>
    );
}
 
export default AdminDashboard;