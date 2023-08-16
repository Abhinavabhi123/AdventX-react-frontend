import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch,useSelector} from "react-redux";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

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

const  Authentication = ({
  CookieName,
  children,
  Type,
}: AuthenticationProps) => {
  const cookie: string | undefined = Cookies.get(CookieName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const userData = useSelector((state:any)=>state.user)// this also


  

  useEffect(() => {
    if (!cookie) {
    
      if (Type === "user") {
        if(location.pathname ==="/"){
          navigate("/")
          return
        }
        if(location.pathname ==="/forgetPass" && userData._id ===""){
          navigate("/forgetPass")
          return
        }
        if(location.pathname ==="/userSignup" && userData._id ===""){
          navigate("/userSignup")
          return
        }
        if(location.pathname ==="/about" && userData._id ===""){
          navigate("/about")
          return
        }
        navigate("/userLogin");
        return;
      }
      if (Type === "Admin") {
        navigate("/admin/login");
        return;
      }
      return
    }
    if (Type === "user") {
      const cookieData = jwtDecode(cookie) as DecodedToken;
      dispatch(
        userActions.userAddDetails({
          userName: cookieData?.name,
          email: cookieData?.email,
          _id: cookieData?._id,
          is_prime: cookieData?.is_prime,
          status: cookieData?.status,
        })
      );
    } else {
      const adminData = jwtDecode(cookie) as Admin;
      dispatch(AdminAction.AdminLogin({ email: adminData.email }));
      if(location.pathname ==="/admin/login"){
        navigate("/admin/dashboard")
      }
    }
  }, [cookie, navigate,Type,dispatch,location.pathname,userData._id]);

  return <>{children}</>;
};

export default Authentication;
