import React, { useEffect } from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import { useSelector } from "react-redux";

import Authentication from "../Middleware/AuthMiddleware";

import Home from "../pages/User/Home";
import UserLogin from "../pages/User/UserLoing";
import UserSignup from "../pages/User/userSignup";
import ForgetPass from "../pages/User/ForgetPass";
import Subscription from "../pages/User/Subscription";
import CheckOut from "../components/User/SubscribePayment/CheckOut";
import PaymentSuccess from "../components/User/SubscribePayment/PaymentSuccess/PaymentSuccess";
import UserProfile from "../pages/User/UserProfile";
import Communities from "../pages/User/Communities";
import AddUserVehicle from "../pages/User/AddUserVehicle";
import CompletedEvent from "../components/User/CompletedSinglePage/CompletedEvent";
import Activities from "../pages/User/Activities";
import About from "../pages/User/About";
import PaymentCancel from "../components/User/SubscribePayment/PaymentCancel/PaymentCancel";
import EventPaymentSuccess from "../components/User/EventPayment/EventPaymentSuccess";
import EventPaymentCancel from "../components/User/EventPayment/EventPaymentCancel";
import Error404 from "../components/Error/Error404";
import Error500 from "../components/Error/Error500";

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
        <Route path="/about" element={<About />} />
      </Routes>
      <Authentication CookieName="jwtToken" Type="user">
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
              !isPrime ? <Navigate to={"/subscribe"} /> : <Communities />
            }
          />
          <Route path="/addVehicle" element={<AddUserVehicle />} />
          <Route
            path={"/eventPayment/success"}
            element={<EventPaymentSuccess />}
          />
          <Route
            path={"/eventPayment/cancel"}
            element={<EventPaymentCancel />}
          />
        </Routes>
      <Routes>
            {/* <Route path="/*" element={<Error404/>}/> */}
            <Route path="/error500"  element={<Error500 />}/>
      </Routes>
      </Authentication>
    </div>
  );
}

export default User;
