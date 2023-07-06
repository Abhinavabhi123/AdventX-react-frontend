import React from "react";

interface TopBarProps {
  value: "Community"|"Dashboard"|"Users"
}

function TopBar(props:TopBarProps) {
  
  return (
    <div className="w-[76rem] h-40 bg-transparent">
      <div className="w-full h-10 bg-transparent flex justify-end items-center border-b-2 border-gray-600">
        <div className="w-8 h-8 rounded-full bg-gray-600 bg-opacity-25 flex justify-center items-center mr-3 shadow-md cursor-pointer">
          <img
            className="w-4 h-4 "
            src="/icons/nofity-bell.png"
            alt="notify bell"
          />
        </div>
      </div>
      <div className="w-full h-full bg-gray-700 flex justify-center items-center">
        <div className=" w-full flex justify-between">
          <div className="ml-5">
            <h1 className="text-white text-2xl">{props.value} </h1>
          </div>
          <div>
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
