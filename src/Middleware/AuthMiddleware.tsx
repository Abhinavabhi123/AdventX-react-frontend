import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode"

import { userActions } from "../Store/redux/UserAuth";
import { AdminAction } from "../Store/redux/AdminAuth";

interface AuthenticationProps {
  CookieName: string;
  children: React.ReactNode;
  Type: string;
}

interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  is_prime: boolean;
  status: boolean;
  token: string;
}

interface Admin {
  email: string;
}

const Authentication = ({
  CookieName,
  children,
  Type,
}: AuthenticationProps) => {
  const cookie:string|undefined= Cookies.get(CookieName);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cookie) {
      if (Type === "user") {
      navigate("/userLogin")
      return
    }
    navigate("/admin/login");
    return
  }
    if(Type ==="user"){
      const cookieData = jwtDecode(cookie) as DecodedToken 
      console.log(cookieData ,"user Cookie");
      dispatch(
        userActions.userAddDetails({
          userName: cookieData?.name,
          email: cookieData?.email,
          _id: cookieData?._id,
          is_prime: cookieData?.is_prime,
          status: cookieData?.status,
        })
      );
    }else{
      const adminData = jwtDecode(cookie) as Admin
      console.log(adminData,"Admin cookie");
      
      dispatch(AdminAction.AdminLogin({ email: adminData.email }));
    }

  },[cookie,navigate]);

  return <>{children}</>;
};

export default Authentication;
