import React from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css"
import NavBar from "../../components/User/NavBar/Navbar";

function Subscription() {
  const navigate =useNavigate()
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="subImage w-screen h-screen">
        <div className="w-[50%] h-full  flex justify-center items-center">
          <div className="w-[80%] h-96 bg-white rounded-md bg-opacity-30 mt-[5rem]">
          <div className="w-full h-24 flex justify-center items-center">
            <img className="w-20 h-20" src="/An Off-road logo bw4 .png" alt="logo" />
          </div>
          <div className="w-full h-40  flex flex-col justify-evenly items-center">
           <h1 className="text-xl">Then only $24.38 for Membership</h1>
           <button className="w-36 h-8 bg-green-500 rounded-lg text-xs" onClick={()=>navigate("/subscribe/payment")}>Get Membership</button>
          </div>
          </div>
        </div>
        <div className="w-[50%] h-full  flex justify-center items-center ">
          <div className="h-[60%] w-80 bg-white rounded-md">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
