import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/User/Home";
import UserLogin from "../pages/User/UserLoing";
import UserSignup from "../pages/User/userSignup";
import ForgetPass from "../pages/User/ForgetPass";
import Subscription from "../pages/User/Subscription";

import Authentication from "../Middleware/AuthMiddleware";

import CheckOut from "../components/User/SubscribePayment/CheckOut";
import PaymentSuccess from "../components/User/SubscribePayment/PaymentSuccess/PaymentSuccess";
import UserProfile from "../pages/User/UserProfile";

import Communities from "../pages/User/Communities";
import UserChangeContext from "../Store/Context/UserChangecontext";
import AddUserVehicle from "../pages/User/AddUserVehicle";
import CompletedEvent from "../components/User/CompletedSinglePage/CompletedEvent";
import Error404 from "../components/Error/Error404";
import Activities from "../pages/User/Activities";
import About from "../pages/User/About";
import PaymentCancel from "../components/User/SubscribePayment/PaymentCancel/PaymentCancel";

function User() {
  const userData = useSelector((state: any) => state.user.email);
  const isPrime = useSelector((state: any) => state?.user?.is_prime);

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
        <Route path="/activities" element={<Activities />} />
        <Route
          path="/userSignup"
          element={userData ? <Navigate to={"/"} /> : <UserSignup />}
        />
        <Route path="/about" element={<About/>}/>
        <Route path="/llll" element={ <PaymentCancel />}/>
      </Routes>
      <Authentication CookieName="jwtToken" Type="user">
        <UserChangeContext>
          <Routes>
            <Route
              path="/subscribe"
              element={!isPrime ? <Subscription /> : <Navigate to={"/"} />}
            />
            <Route path="/subscribe/payment" element={<CheckOut />} />
            <Route
              path="/subscribe/success"
              element={isPrime ? <Navigate to={"/"} /> : <PaymentSuccess />}
            />
            <Route
              path="/subscribe/cancel"
              element={isPrime ? <Navigate to={"/"} /> : <PaymentCancel />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/eventSinglePage/:id" element={<CompletedEvent />} />
            <Route
              path="/communities"
              element={
                isPrime ? <Communities /> : <Navigate to={"/subscribe"} />
              }
            />
            <Route path="/addVehicle" element={<AddUserVehicle />} />
          </Routes>
        </UserChangeContext>
      </Authentication>
      {/* <Routes>
            <Route path="/*" element={<Error404/>}/>
      </Routes> */}
    </div>
  );
}

export default User;
