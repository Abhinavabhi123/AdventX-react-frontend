import React from "react";
import { useSelector } from "react-redux";
import Profile from "../../components/User/Profile/Profile";
import NavBar from "../../components/User/NavBar/Navbar";
import HomeBtn from "../../components/User/Button/HomeBtn";
import UserIdContext from "../../Store/Context/UserContext";

function UserProfile() {
  const id: string = useSelector((state: any) => state.user._id);
  
  return (
    <div className="w-screen h-[100vh]">
      <div className=" w-full h-20">
        <NavBar />
      </div>
      <div className="w-screen h-[50rem] bg-white flex flex-col items-center">
        <div className="w-[90%] h-16  flex justify-end items-center">
          <HomeBtn />
        </div>
        <div className="w-[95%] h-[49rem] flex justify-center items-center">
          <UserIdContext.Provider value={{ id }}>
            <Profile />
          </UserIdContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
