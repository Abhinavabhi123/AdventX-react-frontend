import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Community from "../pages/Admin/Community";
import UserManagement from "../pages/Admin/UserManagement";
import CreateCommunity from "../pages/Admin/CreateCommunity";
import { useEffect } from "react";
import { AdminAction } from "../Store/redux/AdminAuth";

interface Admin {
  email: string;
}

function Admin() {
  const dispatch = useDispatch();
  const cookie = Cookies.get("adminJwt");

  useEffect(() => {
    if (cookie) {
      const adminData = jwtDecode(cookie) as Admin;

      dispatch(AdminAction.AdminLogin({ email: adminData.email }));
    }
  }, [cookie, dispatch]);

  const adminAuth = useSelector((state:any)=>state.admin.AdminEmail)

  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={adminAuth ?<AdminDashboard /> : <AdminLogin /> } />
        <Route path="/community" element={adminAuth ?<Community /> : <AdminLogin />} />
        <Route path="/userManagement" element={ adminAuth ? <UserManagement />: <AdminLogin />} />
        <Route path="/createCommunity" element={ adminAuth ? <CreateCommunity /> : <AdminLogin />} />
      </Routes>
    </div>
  );
}

export default Admin;
