import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UserState } from "../../../Store/redux/UserAuth";
import rootReducer from "../../../Store/redux/RootReducer";
function NavBar() {
  const navigate = useNavigate();
  const userLogin: boolean = useSelector((state: any): boolean => {
    return state.user.loggedIn;
  });

  return (
    <div className="navBar  bg-white w-screen h-20 flex flex-row items-center border-2">
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
            <button className="w-36 h-6 bg-green-500 text-white rounded-full text-xs">
              <img className="w-20 rounded-full" src="" alt="" />
              GetMembership
            </button>
          </div>
          {!userLogin ? (
            <button
              className="w-14 h-6 bg-gray-400 text-white rounded-full text-xs"
              onClick={() => navigate("/userLogin")}
            >
              Login
            </button>
          ) : (
            
            <div className="bg-red-400 w-10 h-10 rounded-full">

            </div>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
