import React, { useState } from "react";

import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";
// import { UserState } from "../../../Store/redux/UserAuth";
// import rootReducer from "../../../Store/redux/RootReducer";
function NavBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookies.get("jwtToken");
  const userLogin: boolean = useSelector((state: any): boolean => {
    return state.user.loggedIn;
  });

  return (
    <div className="navBar absolute  bg-white w-screen h-20 flex flex-row items-center border-2">
      <div className="navInnerContaine bg-white w-full  h-max flex flex-row items-center justify-evenly">
        <div className="flex flex-row bg-white w-full">
          <div className="  w-96 flex  justify-around items-center bg-white">
            <img
              src="/An Off-road community (1).png"
              className="w-20 ml-5  cursor-pointer"
              alt="Logo"
              onClick={() => navigate("/")}
            />
            <ul className="flex flex-row bg-white space-x-6">
              <li className="bg-white cursor-pointer">Community</li>
              <li className="bg-white cursor-pointer">Activities</li>
              <li className="bg-white cursor-pointer">About</li>
            </ul>
          </div>
        </div>
        <div className="mr-3 flex items-center justify-between w-18">
          <div className=" flex w-40 justify-between">
            <button
              className="w-36 h-6 bg-green-500 text-white rounded-full text-xs flex justify-evenly items-center"
              onClick={() => navigate("/subscribe")}
            >
              <img
                className="crownImage rounded-full "
                src="/icons/crown.png"
                alt="prime"
              />
              GetMembership
            </button>
          </div>
          {!cookie ? (
            <button
              className="w-14 h-6 bg-gray-400 text-white rounded-full text-xs"
              onClick={() => navigate("/userLogin")}
            >
              Login
            </button>
          ) : (
            <div
              style={{
                backgroundSize: "2rem 2rem",
                backgroundImage:
                  "url('/icons/person.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
              className=" w-10 h-10 rounded-full cursor-pointer flex items-center"
              onClick={() => navigate("/profile")}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
