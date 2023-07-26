import React, { useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
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
import CheckOut from "../components/User/SubscribePayment/CheckOut";
import PaymentSuccess from "../components/User/SubscribePayment/PaymentSuccess/PaymentSuccess";
import UserProfile from "../pages/User/UserProfile";
import UserIdContext from "../Store/Context/UserContext";
import Communities from "../pages/User/Communities";
import UserChangeContext from "../Store/Context/UserChangecontext";

interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  is_prime: boolean;
  status: boolean;
  token: string;
}

function User() {
  // const dispatch = useDispatch();
  // const cookie = Cookies.get("jwtToken");

  // useEffect(() => {
  //   console.log(cookie, "Cookie");

  //   let cookieData: DecodedToken;
  //   if (cookie) {
  //     cookieData = jwtDecode(cookie) as DecodedToken;
  //     console.log(cookieData);

  //     dispatch(
  //       userActions.userAddDetails({
  //         userName: cookieData?.name,
  //         email: cookieData?.email,
  //         _id: cookieData?._id,
  //         is_prime: cookieData?.is_prime,
  //         status: cookieData?.status,
  //       })
  //     );
  //   }
  // }, [cookie, dispatch]);
  const userData = useSelector((state: any) => state.user.email);
  const isPrime = useSelector((state: any) => state?.user?.is_prime);
  // const token:string|undefined= Cookies.get("jwtToken")
  // console.log(token,"token");
  
  // if(token){
  //   const decoded = jwtDecode(token)
  //   console.log(decoded,"kkkk");
  // }
  
  // console.log(isPrime,"gsgsghgsugs");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/userLogin"
          element={userData ? <Navigate to={"/"} /> : <UserLogin />}
        />
        <Route
          path="/forgetPass"
          element={userData ? <Navigate to={"/"} /> : <ForgetPass />}
        />
      </Routes>
      <Authentication CookieName="jwtToken" Type="user">
        <UserChangeContext>
          <Routes>
            <Route
              path="/userSignup"
              element={userData ? <Navigate to={"/"} /> : <UserSignup />}
            />
            <Route path="/subscribe" element={!isPrime ?<Subscription />:<Navigate to={"/"}/> } />
            <Route path="/subscribe/payment" element={<CheckOut />} />
            <Route path="/subscribe/success" element={<PaymentSuccess />} />
            <Route path="/profile" element={<UserProfile />} />

            <Route
              path="/communities"
              element={
                isPrime ? <Communities /> : <Navigate to={"/subscribe"} />
              }
            />
          </Routes>
        </UserChangeContext>
      </Authentication>
    </div>
  );
}

export default User;
