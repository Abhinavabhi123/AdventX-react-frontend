import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import Home from "../pages/User/Home";
import UserLogin from "../pages/User/UserLoing";
import UserSignup from "../pages/User/userSignup";
import ForgetPass from "../pages/User/ForgetPass";
import Subscription from "../pages/User/Subscription";
import Cookies from "js-cookie";
import Authentication from "../Middleware/AuthMiddleware";

import { userActions } from "../Store/redux/UserAuth";

interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  is_prime: boolean;
  status: boolean;
  token: string;
}

function User() {
  const dispatch = useDispatch();
  const cookie = Cookies.get("jwtToken");

  useEffect(() => {
    console.log(cookie, "Cookie");

    let cookieData: DecodedToken;
    if (cookie) {
      cookieData = jwtDecode(cookie) as DecodedToken;
      console.log(cookieData);

      dispatch(
        userActions.userAddDetails({
          userName: cookieData?.name,
          email: cookieData?.email,
          _id: cookieData?._id,
          is_prime: cookieData?.is_prime,
          status: cookieData?.status,
        })
      );
    }
  }, [cookie, dispatch]);
  // const userToken = useSelector((state: any) => state.User.userToken);
  return (
    <div>
      <Authentication CookieName="jwtToken" Type="user">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSignup" element={<UserSignup />} />
          <Route path="/forgetPass" element={<ForgetPass />} />
          <Route path="/subscribe" element={<Subscription />} />

          {/* <Route path="/OTP" element={<UserOPT />} /> */}
        </Routes>
      </Authentication>
    </div>
  );
}

export default User;
