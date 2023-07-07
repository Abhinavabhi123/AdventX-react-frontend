import {Routes,Route} from "react-router-dom"
import AdminLogin from "../pages/Admin/AdminLogin"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import Community from "../pages/Admin/Community"
import UserManagement from "../pages/Admin/UserManagement"

// import {useCookies} from "react-cookie"
function Admin() {
  // const [cookies, setcookies] = useCookies(['AdminJwt'])
  // console.log(cookies);

  
  const cookie = document.cookie.match(/AdminJwt=([^;]+)/);
  console.log(cookie);
  
  if (cookie) {
    const token = cookie[1];
    // Do something with the token
  }
  
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
