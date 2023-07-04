import {Routes,Route} from "react-router-dom"
import AdminLogin from "../pages/Admin/AdminLogin"
import AdminDashboard from "../pages/Admin/AdminDashboard"
function Admin() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLogin/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>

        </Routes>
      
    </div>
  )
}

export default Admin
