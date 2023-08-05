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
import BannerManagement from "../pages/Admin/BannerManagement";
import AddBanner from "../pages/Admin/AddBanner";
import EditBanner from "../pages/Admin/EditBanner";
import Accounts from "../pages/Admin/Accounts";
import CompleteEvent from "../pages/Admin/CompleteEvent";


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
          <Route path="/bannerManagement" element={<BannerManagement/>}/>
          <Route path="/bannerManagement/addBanner" element={<AddBanner/>}/>
          <Route path="/bannerManagement/editBanner/:id" element={<EditBanner/>}/>
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/createCommunity" element={<CreateCommunity />} />
          <Route path="/community/edit-community/:id" element={<EditCommunity />} />
          <Route path="/eventManagement" element={<EventManagement/>}/>
          <Route path="/addEvent" element={<AddEvent/>}/>
          <Route path="/editEvent/:id" element={<EditEvents/>}/>
          <Route path="/completeEvent/:id" element={<CompleteEvent/>} />
          <Route  path="/accounts" element={<Accounts/>}/>
        </Routes>
      </Authentication>
    </div>
  );
}

export default Admin;
