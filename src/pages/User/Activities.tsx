import React from "react";
import NavBar from "../../components/User/NavBar/Navbar";
import HomeBtn from "../../components/User/Button/HomeBtn";
import AllActivities from "../../components/User/AllActivities/AllActivities";

function Activities() {
  return (
    <div className=" w-screen h-[100vh] bg-white">
      <div className=" w-full h-20">
        <NavBar />
      </div>
      <div className="w-screen ">
        <div className="w-full h-20  flex justify-end items-center pe-6 border-b border-gray-300">
            <HomeBtn/>
        </div>
        <div className="w-full h-96">
            <AllActivities/>
        </div>
      </div>
    </div>
  );
}

export default Activities;
