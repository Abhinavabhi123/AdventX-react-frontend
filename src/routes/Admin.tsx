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
import Authentication from "../Middleware/AuthMiddleware";
import EditCommunity from "../pages/Admin/EditCommunity";
import EventManagement from "../pages/Admin/EventManagement";
import AddEvent from "../pages/Admin/AddEvent";
import EditEvents from "../pages/Admin/EditEventDetails";

interface Admin {
  email: string;
}

function Admin() {
  // const dispatch = useDispatch();
  // const cookie = Cookies.get("adminJwt");
  // let adminData: string | Admin = "";
  // useEffect(() => {
  //   if (cookie) {
  //     adminData = jwtDecode(cookie) as Admin;

  //     dispatch(AdminAction.AdminLogin({ email: adminData.email }));
  //   }
  // }, []);

  // const adminAuth = useSelector((state: any) => state.admin.AdminEmail);
  // console.log(adminData, "Admin is here");

  return (
    <div>
      <Authentication CookieName="adminJwt" Type="Admin">
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/createCommunity" element={<CreateCommunity />} />
          <Route path="/community/edit-community/:id" element={<EditCommunity />} />
          <Route path="/eventManagement" element={<EventManagement/>}/>
          <Route path="/addEvent" element={<AddEvent/>}/>
          <Route path="/editEvent/:id" element={<EditEvents/>}/>
        </Routes>
      </Authentication>
    </div>
  );
}

export default Admin;
