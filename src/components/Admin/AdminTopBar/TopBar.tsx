import React from "react";
import "./TopBar.css"
interface TopBarProps {
  value: "Community"|"Dashboard"|"Users"
}

function TopBar(props:TopBarProps) {
  
  return (
    <div className="topBarAdmin">
      <div className="topBarAdmin_main flex justify-end">
        <div className="topBarAdmin_main_top">
          <img
            className="w-4 h-4 "
            src="/icons/nofity-bell.png"
            alt="notify bell"
          />
        </div>
      </div>
      <div className="topBarAdmin_second">
        <div className=" w-full flex justify-between">
          <div className="ml-5 ">
            <h1 className="text-white text-2xl">{props.value} </h1>
          </div>
          <div className="">
            <div className="mr-5 w-20 h-7 bg-white flex justify-center items-center rounded-md cursor-pointer">
              <button  className="flex text-sm">
                <img className="w-5 h-5" src="/icons/logout.png" alt="Logout" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
