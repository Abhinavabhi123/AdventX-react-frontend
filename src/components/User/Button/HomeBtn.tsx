import React from "react";
import { useNavigate } from "react-router-dom";

function HomeBtn() {
  const navigate = useNavigate();
  return (
    <button
      className=" bg-gray-300 w-20 h-7 text-sm hover:bg-gray-400 text-center rounded-md  flex justify-center items-center "
      onClick={() => navigate("/")}
    >
        <img className="w-4 mr-1 mb-1" src="/icons/home.png" alt="home" />
      Home
    </button>
  );
}

export default HomeBtn;
