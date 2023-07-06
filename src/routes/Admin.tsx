import {Routes,Route} from "react-router-dom"
import AdminLogin from "../pages/Admin/AdminLogin"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import Community from "../pages/Admin/Community"
import UserManagement from "../pages/Admin/UserManagement"
function Admin() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLogin/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/userManagement" element={<UserManagement/>}/>

        </Routes>
      
    </div>
  )
}

export default Admin
