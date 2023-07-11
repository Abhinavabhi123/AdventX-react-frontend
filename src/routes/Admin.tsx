import {Routes,Route} from "react-router-dom"
import Cookies from "js-cookie"
import { useDispatch,useSelector } from "react-redux"

import AdminLogin from "../pages/Admin/AdminLogin"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import Community from "../pages/Admin/Community"
import UserManagement from "../pages/Admin/UserManagement"
import CreateCommunity from "../pages/Admin/CreateCommunity"

function Admin() {
  const dispatch = useDispatch()
 const cookie = Cookies.get("AdminJwt")
  console.log(cookie,"this is the cookie");
  
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLogin/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/userManagement" element={<UserManagement/>}/>
            <Route path="/createCommunity" element={<CreateCommunity/>}/>
        </Routes>
      
    </div>
  )
}

export default Admin
